"use client";

import { useEffect, useState } from "react";
import LeadTable from "@/components/LeadTable";
import { Loader2 } from "lucide-react";

export default function SearchResultsClient({ city, niche }: { city: string, niche: string }) {
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
