"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Database, ShieldCheck, ChevronRight, Zap, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface CRMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CRMS = [
  { name: "GoHighLevel", icon: "GHL", color: "bg-blue-600", desc: "Sync leads directly to your sub-account." },
  { name: "HubSpot", icon: "HS", color: "bg-orange-500", desc: "Automate deal creation and tracking." },
  { name: "Salesforce", icon: "SF", color: "bg-sky-500", desc: "Enterprise-grade CRM integration." },
];

export default function CRMModal({ isOpen, onClose }: CRMModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleConnect = (crmName: string) => {
    setConnecting(crmName);
    // Simulate API connection
    setTimeout(() => {
      setConnecting(null);
      setSuccess(crmName);
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xl bg-white rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <div className="bg-royal-blue p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/10 p-3 rounded-2xl">
              <Database className="h-6 w-6 text-vibrant-yellow" />
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white text-2xl leading-none">✕</button>
          </div>
          <h2 className="text-3xl font-heading font-bold">Connect Your CRM</h2>
          <p className="mt-2 text-white/70">Sync your verified leads to your sales pipeline instantly.</p>
        </div>

        <div className="p-8 space-y-4">
          {CRMS.map((crm) => (
            <button 
              key={crm.name}
              disabled={!!connecting || !!success}
              onClick={() => handleConnect(crm.name)}
              className="w-full flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-royal-blue hover:bg-gray-50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl ${crm.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                  {crm.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-royal-blue transition-colors">{crm.name}</h4>
                  <p className="text-xs text-gray-500">{crm.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {connecting === crm.name && <Loader2 className="h-5 w-5 text-royal-blue animate-spin" />}
                {success === crm.name && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {!connecting && !success && <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-royal-blue group-hover:translate-x-1 transition-all" />}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 p-6 flex items-center justify-center gap-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            SECURE SYNC ENABLED
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Zap className="h-4 w-4 text-vibrant-yellow" />
            REAL-TIME UPDATES
          </div>
        </div>
      </motion.div>
    </div>
  );
}
