"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Ghost, Share2, Lock, Download, FileText, Phone, Globe, MessageCircle, ExternalLink, Wand2, Copy, Check, Database, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { exportToCSV, exportToPDF } from "@/lib/export";
import { motion, AnimatePresence } from "framer-motion";
import CRMModal from "./CRMModal";

interface Lead {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  categories: string[];
  distance: number;
  score: number;
}

interface LeadTableProps {
  leads: Lead[];
  isUnlocked: boolean;
  onUnlock: () => void;
}

const ensureAbsoluteUrl = (url?: string) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
};

export default function LeadTable({ leads, isUnlocked, onUnlock }: LeadTableProps) {
  const [payConfig, setPayConfig] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dynamic values from env
  const displayAmount = Number(process.env.NEXT_PUBLIC_PAYMENT_AMOUNT) || 1300;
  const currency = process.env.NEXT_PUBLIC_PAYMENT_CURRENCY || "KES";

  useEffect(() => {
    // Generate a fresh reference
    const ref = (new Date()).getTime().toString();
    
    setPayConfig({
      reference: ref,
      email: "prospect@flow.app",
      amount: displayAmount * 100, 
      currency: currency,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      // Add callback_url for redirect flow (e.g. 3D Secure)
      callback_url: window.location.href,
      metadata: {
        custom_fields: [
          {
            display_name: "Page URL",
            variable_name: "page_url",
            value: window.location.href
          }
        ]
      }
    });
  }, [displayAmount, currency]);

  const initializePayment = usePaystackPayment(payConfig || {});

  const onSuccess = (response: any) => {
    setIsVerifying(true);
    
    // Handle both {reference: '...'} and '...' string reference
    const ref = typeof response === 'string' ? response : response.reference;
    
    if (!ref) {
      alert("Payment reference missing. Please contact support.");
      setIsVerifying(false);
      return;
    }

    fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference: ref }),
    })
      .then(async res => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          // Persist the unlock status
          localStorage.setItem(`unlocked_${ref}`, "true");
          localStorage.setItem("last_payment_ref", ref);
          onUnlock();
        } else {
          alert("Payment verification failed: " + (data.error || "Unknown error"));
        }
      })
      .catch(err => {
        console.error("Verification failed:", err);
        alert("Payment verification failed. Please check your connection and try again.");
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  const onClose = () => {
    console.log("Payment modal closed");
  };

  const [isCRMOpen, setIsCRMOpen] = useState(false);
  const [generatingPitch, setGeneratingPitch] = useState<string | null>(null);
  const [pitchContent, setPitchContent] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePitch = async (lead: Lead) => {
    setGeneratingPitch(lead.id);
    try {
      const res = await fetch("/api/generate-pitch", {
        method: "POST",
        body: JSON.stringify({
          name: lead.name,
          niche: lead.categories[0] || "business",
          city: "your area",
          status: !lead.website ? "ghost" : "verified"
        }),
      });
      const data = await res.json();
      setPitchContent(data.pitch);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingPitch(null);
    }
  };

  const copyPitch = () => {
    navigator.clipboard.writeText(pitchContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 flow-root">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold text-royal-blue">Search Results</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsCRMOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-royal-blue rounded hover:bg-blue-900 transition-all shadow-md"
          >
            <Database className="h-3.5 w-3.5 text-vibrant-yellow" />
            Push to CRM
          </button>
          <button 
            onClick={() => {
              const exportLeads = leads.map((l, i) => ({
                ...l,
                distance: `${(l.distance / 1000).toFixed(1)}km`,
                website: l.website,
                phone: l.phone,
              }));
              exportToCSV(exportLeads, "prospectflow_leads");
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            <Download className="h-3.5 w-3.5" />
            CSV
          </button>
          <button 
            onClick={() => {
              const exportLeads = leads.map((l, i) => ({
                ...l,
                distance: `${(l.distance / 1000).toFixed(1)}km`,
                website: l.website,
                phone: l.phone,
              }));
              exportToPDF(exportLeads, "prospectflow_leads");
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            <FileText className="h-3.5 w-3.5" />
            PDF
          </button>
        </div>
      </div>
      
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg border border-gray-200 relative">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-royal-blue text-white">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-heading font-bold sm:pl-6">Business Name</th>
                  <th className="px-3 py-3.5 text-left text-sm font-heading font-bold">Niche</th>
                  <th className="px-3 py-3.5 text-left text-sm font-heading font-bold">Health</th>
                  <th className="px-3 py-3.5 text-left text-sm font-heading font-bold">Status</th>
                  <th className="px-3 py-3.5 text-left text-sm font-heading font-bold">Website</th>
                  <th className="px-3 py-3.5 text-left text-sm font-heading font-bold">Phone</th>
                  <th className="px-3 py-3.5 text-right text-sm font-heading font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {leads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((lead, index) => {
                  const isMasked = false;
                  
                  const whatsappLink = `https://wa.me/${lead.phone?.replace(/\D/g, "")}?text=Hello ${encodeURIComponent(lead.name)}, I found your business on ProspectFlow...`;
                  const callLink = `tel:${lead.phone}`;

                  return (
                    <tr key={lead.id} className={index % 2 === 0 ? "bg-white hover:bg-gray-50 transition-colors" : "bg-gray-50 hover:bg-gray-100 transition-colors"}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm font-bold text-royal-blue sm:pl-6">
                        {lead.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{lead.categories[0] || "General"}</span>
                          <span className="text-[10px] text-gray-400">{(lead.distance / 1000).toFixed(1)} km away</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${lead.score > 7 ? 'bg-green-500' : lead.score > 4 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                              style={{ width: `${lead.score * 10}%` }} 
                            />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400">{lead.score.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex gap-1.5">
                          {lead.phone && (
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              <CheckCircle className="mr-1 h-3 w-3" /> Verified
                            </span>
                          )}
                          {!lead.website && (
                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                              <Ghost className="mr-1 h-3 w-3" /> Ghost
                            </span>
                          )}
                          {!lead.categories.some(c => c.toLowerCase().includes("social")) && (
                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                              <Share2 className="mr-1 h-3 w-3" /> Social Missing
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm text-blue-600 ${isMasked ? "blur-sm select-none" : ""}`}>
                        {isMasked ? "https://example.com" : (
                          <a href={ensureAbsoluteUrl(lead.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {lead.website || "N/A"}
                          </a>
                        )}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${isMasked ? "blur-md select-none opacity-50" : ""}`}>
                        {isMasked ? "+1 234 567 890" : lead.phone || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <a
                            href={isMasked ? "#unlock" : whatsappLink}
                            target={isMasked ? "_self" : "_blank"}
                            className={`p-2 rounded-full transition-all ${isMasked ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                            title="WhatsApp Outreach"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                          <a
                            href={isMasked ? "#unlock" : callLink}
                            className={`p-2 rounded-full transition-all ${isMasked ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                            title="Direct Dial"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                          {lead.website && (
                            <a
                              href={isMasked ? "#unlock" : ensureAbsoluteUrl(lead.website)}
                              target={isMasked ? "_self" : "_blank"}
                              rel="noopener noreferrer"
                              className={`p-2 rounded-full transition-all ${isMasked ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                              title="Visit Website"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <button
                            onClick={isMasked ? () => {} : () => generatePitch(lead)}
                            className={`p-2 rounded-full transition-all ${isMasked ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-purple-100 text-purple-700 hover:bg-purple-200"}`}
                            title="AI Pitch Generator"
                          >
                            <Wand2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {leads.length > itemsPerPage && (
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(leads.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(leads.length / itemsPerPage)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, leads.length)}</span> of{' '}
                      <span className="font-medium">{leads.length}</span> leads
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      
                      {[...Array(Math.ceil(leads.length / itemsPerPage))].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === i + 1
                              ? 'z-10 bg-royal-blue text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-blue'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(leads.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(leads.length / itemsPerPage)}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}

            {/* AI Pitch Modal */}
            <AnimatePresence>
              {pitchContent && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-heading font-bold text-royal-blue flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-purple-600" />
                        AI-Generated Pitch
                      </h3>
                      <button onClick={() => setPitchContent("")} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100 italic">
                      "{pitchContent}"
                    </div>
                    <div className="mt-8 flex gap-4">
                      <button 
                        onClick={copyPitch}
                        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-royal-blue py-4 text-sm font-semibold text-white shadow-lg hover:bg-blue-900 transition-all"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy Pitch"}
                      </button>
                      <button 
                        onClick={() => setPitchContent("")}
                        className="px-8 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <CRMModal isOpen={isCRMOpen} onClose={() => setIsCRMOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
