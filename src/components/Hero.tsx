"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, SlidersHorizontal, Ghost } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [radius, setRadius] = useState("10000"); // Default 10km
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [ghostOnly, setGhostOnly] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && niche) {
      let url = `/search?city=${encodeURIComponent(city)}&niche=${encodeURIComponent(niche)}&radius=${radius}`;
      if (ghostOnly) url += `&ghostOnly=true`;
      router.push(url);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-royal-blue sm:text-6xl">
            Stop Scraping. <br />
            <span className="text-bright-red">Start Closing.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Instant Verified Leads. No account required. Just search, unlock, and close.
          </p>
          
          <div className="mt-10">
            <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:bg-white sm:p-2 sm:shadow-xl sm:ring-1 sm:ring-gray-900/10 sm:rounded-full">
              <div className="flex flex-1 items-center gap-2 px-4 py-2 bg-gray-50 rounded-full sm:bg-transparent">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City (e.g. Austin, TX)"
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="hidden sm:block h-8 w-px bg-gray-200" />
              <div className="flex flex-1 items-center gap-2 px-4 py-2 bg-gray-50 rounded-full sm:bg-transparent">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Niche (e.g. Dental Clinic)"
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-royal-blue px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-blue"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </form>
            
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-royal-blue mx-auto hover:opacity-80"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showAdvanced ? "Hide Advanced Filters" : "Advanced Targeting Filters"}
            </button>

            {showAdvanced && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Search Radius</label>
                  <select 
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full rounded-lg border-gray-200 text-sm focus:ring-royal-blue focus:border-royal-blue"
                  >
                    <option value="5000">5 km (Hyper-Local)</option>
                    <option value="10000">10 km (City Wide)</option>
                    <option value="25000">25 km (Regional)</option>
                    <option value="50000">50 km (Metropolitan)</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => setGhostOnly(!ghostOnly)}
                    className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-semibold ${ghostOnly ? 'bg-royal-blue text-white border-royal-blue shadow-lg' : 'bg-white text-gray-600 border-gray-200'}`}
                  >
                    <Ghost className="h-4 w-4" />
                    {ghostOnly ? "Ghost Leads Only (Active)" : "Filter Ghost Leads"}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-x-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Real-time TomTom™ Data
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-vibrant-yellow" />
              Verified Outreach Tools
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
