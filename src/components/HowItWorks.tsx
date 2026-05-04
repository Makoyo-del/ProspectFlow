"use client";

import { Search, Unlock, Send } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    title: "1. Search Intelligence",
    desc: "Enter your target city and niche. Our system scans live POI data to find active businesses in real-time.",
    icon: Search,
    color: "bg-blue-100 text-royal-blue",
  },
  {
    title: "2. Secure Unlock",
    desc: "Review the verified list. Use our one-time Paystack secure wall to unlock contact details for the entire list.",
    icon: Unlock,
    color: "bg-red-100 text-bright-red",
  },
  {
    title: "3. High-Velocity Outreach",
    desc: "Use our built-in WhatsApp, Direct Dial, and AI Pitch tools to start closing deals immediately.",
    icon: Send,
    color: "bg-yellow-100 text-vibrant-yellow",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-bold uppercase tracking-widest text-bright-red">The Workflow</h2>
          <p className="mt-2 text-4xl font-heading font-bold tracking-tight text-royal-blue sm:text-5xl">
            From Search to Sale in <span className="text-vibrant-yellow italic">60 Seconds</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:shadow-xl transition-all group"
            >
              <div className={`mb-6 inline-flex p-4 rounded-2xl ${step.color} group-hover:scale-110 transition-transform`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-royal-blue mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.desc}
              </p>
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 translate-y-[-50%] z-10 text-gray-200">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="rotate-0">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
