"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LeadTable from "@/components/LeadTable";
import EnterpriseSidebar from "@/components/EnterpriseSidebar";
import { Loader2, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const niche = searchParams.get("niche");
  const radius = searchParams.get("radius") || "10000";
  const ghostOnly = searchParams.get("ghostOnly") === "true";
  
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if the user has already unlocked this session
    const lastRef = localStorage.getItem("last_payment_ref");
    if (lastRef && localStorage.getItem(`unlocked_${lastRef}`) === "true") {
      setIsUnlocked(true);
    }

    if (city && niche) {
      setLoading(true);
      fetch(`/api/search?city=${encodeURIComponent(city)}&niche=${encodeURIComponent(niche)}&radius=${radius}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else {
            const filteredLeads = ghostOnly 
              ? data.filter((lead: any) => !lead.website)
              : data;
            setLeads(filteredLeads);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch leads");
          setLoading(false);
        });
    }
  }, [city, niche, radius, ghostOnly]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-royal-blue" />
        <p className="mt-4 text-lg font-heading text-royal-blue animate-pulse">Searching live intelligence in {city}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <Link href="/" className="mt-6 inline-block text-royal-blue hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-12">
      <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-royal-blue mb-8 transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Global Search
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-bright-red uppercase tracking-widest mb-2">
              <Zap className="h-3 w-3 fill-current" /> Live Prospecting Feed
            </div>
            <h1 className="text-4xl font-heading font-bold text-royal-blue">
              {leads.length} {niche} Leads in {city}
            </h1>
            <p className="mt-2 text-gray-500 text-lg">
              Radius: {parseInt(radius) / 1000}km • {ghostOnly ? "Ghost Filter: ON" : "Verified & Ghost Results"}
            </p>
          </div>

          <LeadTable 
            leads={leads} 
            isUnlocked={isUnlocked} 
            onUnlock={() => setIsUnlocked(true)} 
          />
        </div>

        {/* Enterprise Sidebar */}
        <EnterpriseSidebar />
      </div>
    </div>
  );
}
