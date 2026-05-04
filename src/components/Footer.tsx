import Link from "next/link";
import { Share2, MessageCircle, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-heading font-bold text-royal-blue">
              Prospect<span className="text-bright-red">Flow</span>
            </Link>
            <p className="mt-4 text-gray-500 max-w-sm">
              The world's fastest sales intelligence platform. Zero scrapers, zero login, just high-velocity leads for teams that close.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://www.linkedin.com/in/duncan-makoyo-196ba7307/" target="_blank" className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-royal-blue transition-colors" title="LinkedIn">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-royal-blue transition-colors" title="Twitter">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="mailto:support@prospectflow.com" className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-royal-blue transition-colors" title="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-royal-blue transition-colors" title="Social">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/#how-it-works" className="hover:text-royal-blue">How it Works</Link></li>
              <li><Link href="/#benefits" className="hover:text-royal-blue">Benefits</Link></li>
              <li><Link href="/search" className="hover:text-royal-blue">Search Leads</Link></li>
              <li><span className="text-gray-300">Enterprise (Soon)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-royal-blue">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-royal-blue">Terms of Service</Link></li>
              <li><Link href="/refunds" className="hover:text-royal-blue">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ProspectFlow Intelligence. Built for high-velocity sales.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Powered by TomTom™</span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Payments by Paystack™</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
