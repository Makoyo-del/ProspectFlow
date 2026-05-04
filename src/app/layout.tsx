import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import Link from "next/link";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "ProspectFlow | Instant Verified Leads",
  description: "Stop Scraping. Start Closing. Instant Verified Leads for local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="text-xl font-heading font-bold text-royal-blue">
                Prospect<span className="text-bright-red">Flow</span>
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-royal-blue">Search</Link>
                <Link href="/privacy" className="text-sm font-semibold text-gray-400 hover:text-royal-blue">Legal</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>

        <Footer />
        <WhatsAppSupport />
      </body>
    </html>
  );
}
