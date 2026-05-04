"use client";

import { useEffect, useState } from "react";
import LeadTable from "@/components/LeadTable";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SearchResultsClient({ city, niche }: { city: string, niche: string }) {
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // 1. Check if we just came back from a redirect (Paystack callback)
    const urlRef = searchParams.get("reference") || searchParams.get("trxref");
    if (urlRef) {
      console.log("Found reference in URL, verifying:", urlRef);
      fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: urlRef }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem(`unlocked_${urlRef}`, "true");
          localStorage.setItem("last_payment_ref", urlRef);
          setIsUnlocked(true);
        }
      })
      .catch(err => console.error("URL verification failed:", err));
    }

    // 2. Check if the user has already unlocked this session from localStorage
    const lastRef = localStorage.getItem("last_payment_ref");
    if (lastRef && localStorage.getItem(`unlocked_${lastRef}`) === "true") {
      setIsUnlocked(true);
    }

    setLoading(true);
    fetch(`/api/search?city=${encodeURIComponent(city)}&niche=${encodeURIComponent(niche)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch leads");
        setLoading(false);
      });
  }, [city, niche]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-royal-blue" />
        <p className="mt-4 text-gray-600">Gathering intelligence...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 py-12 text-center">{error}</div>;
  }

  return (
    <LeadTable 
      leads={leads} 
      isUnlocked={isUnlocked} 
      onUnlock={() => setIsUnlocked(true)} 
    />
  );
}
