import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Where does the data come from?",
    a: "We integrate directly with TomTom™ Search APIs to pull live Point-of-Interest data. This ensures the addresses, phone numbers, and websites are from official business registries, not outdated scrapers."
  },
  {
    q: "Is there a monthly fee?",
    a: "No. ProspectFlow is built on a 'Pay-per-Search' model. You only pay to unlock a specific list. This is perfect for teams who want to test new markets without committing to a $100/mo subscription."
  },
  {
    q: "How accurate is the 'Ghost' lead status?",
    a: "A 'Ghost' lead is a business that has a verified phone line and address but no website listed in official directories. These are the highest-converting leads for web agencies and SEO specialists."
  },
  {
    q: "Can I export the data?",
    a: "Absolutely. Once unlocked, you can export your leads to high-fidelity PDF intelligence dossiers or CSV spreadsheets for your CRM."
  }
];

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <Hero />
      
      <HowItWorks />
      
      <Benefits />

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <HelpCircle className="h-12 w-12 text-royal-blue mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-royal-blue">Common Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl grid grid-cols-1 gap-8 md:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-royal-blue mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-bright-red rounded-[3rem] p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-heading font-bold">Ready to out-hustle the competition?</h2>
            <p className="mt-4 text-xl opacity-90">Start your first search now and get 3 leads for free.</p>
            <div className="mt-10 flex justify-center">
              <a 
                href="#top" 
                className="bg-white text-bright-red px-12 py-4 rounded-full font-bold text-lg hover:bg-vibrant-yellow hover:text-royal-blue transition-all"
              >
                Back to Search
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
