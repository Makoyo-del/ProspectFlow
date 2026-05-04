"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Building2, Terminal, TrendingUp, Lock, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const COMING_SOON_FILTERS = [
  { name: "Decision Maker", icon: Users, desc: "CEO, Marketing Head, Owner" },
  { name: "Company Size", icon: Building2, desc: "1-10, 11-50, 51-200, 200+" },
  { name: "Tech Stack", icon: Terminal, desc: "Shopify, WordPress, Salesforce" },
  { name: "Hiring Intent", icon: TrendingUp, desc: "Currently hiring on LinkedIn" },
];

export default function EnterpriseSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-8 space-y-8">
        <div className="bg-gradient-to-br from-royal-blue to-blue-900 rounded-3xl p-6 text-white shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:rotate-12 transition-transform">
            <Sparkles className="h-12 w-12" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-vibrant-yellow mb-2">Pro Plan</h3>
          <h2 className="text-xl font-heading font-bold">Enterprise Intelligence</h2>
          <p className="mt-2 text-xs text-white/70 leading-relaxed">
            Unlock deep B2B insights and decision-maker data with our upcoming Enterprise module.
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-2 text-xs font-bold text-vibrant-yellow hover:opacity-80 transition-all"
          >
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {isExpanded ? "Show Less" : "Explore Coming Soon"}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 overflow-hidden"
            >
              <div className="space-y-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Advanced Filters</h4>
          
          {COMING_SOON_FILTERS.map((filter) => (
            <div 
              key={filter.name}
              className="relative group cursor-not-allowed"
            >
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 opacity-60 grayscale group-hover:grayscale-0 transition-all">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <filter.icon className="h-5 w-5 text-royal-blue" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{filter.name}</span>
                    <span className="text-[10px] font-bold bg-royal-blue text-white px-1.5 py-0.5 rounded uppercase">Soon</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{filter.desc}</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                  <span className="text-[10px] font-bold text-royal-blue flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                </div>
              </div>
            </div>
          ))}
            </div>

            <div className="p-6 rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <p className="text-xs font-medium text-gray-500">Need a custom integration?</p>
              <button className="mt-2 text-xs font-bold text-royal-blue hover:underline">Contact Enterprise Sales</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);
}
