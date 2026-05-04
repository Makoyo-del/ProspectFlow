"use client";

import { ShieldCheck, Zap, Globe, BarChart3, Clock, Rocket } from "lucide-react";

const BENEFITS = [
  {
    title: "Zero Scraper Fatigue",
    desc: "Stop wrestling with proxies and LinkedIn bans. We handle the heavy lifting and deliver clean data.",
    icon: Zap,
  },
  {
    title: "Instant Verification",
    desc: "Every lead is checked for active phone lines and website existence. No dead ends.",
    icon: ShieldCheck,
  },
  {
    title: "Global Reach",
    desc: "Powered by TomTom Intelligence, access business leads across every major continent.",
    icon: Globe,
  },
  {
    title: "Lead Scoring",
    desc: "Our proprietary health score shows you who to call first based on business authority.",
    icon: BarChart3,
  },
  {
    title: "No Subscriptions",
    desc: "Only pay for the data you need. No recurring fees or complex credits. Simple and fair.",
    icon: Clock,
  },
  {
    title: "Sales-First Tools",
    desc: "Direct WhatsApp and AI pitch generation means your team starts pitching the moment they download.",
    icon: Rocket,
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-royal-blue text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-bold uppercase tracking-widest text-vibrant-yellow">Why ProspectFlow?</h2>
          <p className="mt-2 text-4xl font-heading font-bold tracking-tight text-white sm:text-5xl">
            Built for <span className="text-bright-red">High-Velocity</span> Sales Teams
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-bold leading-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vibrant-yellow text-royal-blue">
                    <benefit.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {benefit.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-white/70">
                  <p className="flex-auto">{benefit.desc}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
