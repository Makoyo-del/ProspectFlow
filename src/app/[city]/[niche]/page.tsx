import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SearchResultsClient from "./SearchResultsClient";

type Props = {
  params: Promise<{ city: string; niche: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawCity, niche: rawNiche } = await params;
  const city = decodeURIComponent(rawCity);
  const niche = decodeURIComponent(rawNiche);
  
  return {
    title: `Best ${niche} Leads in ${city} | ProspectFlow`,
    description: `Get verified contact details for ${niche} businesses in ${city}. High-conversion leads with direct outreach tools.`,
  };
}

export default async function dynamicSEOPage({ params }: Props) {
  const { city: rawCity, niche: rawNiche } = await params;
  const city = decodeURIComponent(rawCity);
  const niche = decodeURIComponent(rawNiche);

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-royal-blue mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>
        
        <div className="mb-12">
          <h1 className="text-3xl font-heading font-bold text-royal-blue capitalize">
            {niche} Leads in {city}
          </h1>
          <p className="mt-2 text-gray-600">
            Real-time verified prospect data for {niche} professionals in {city}.
          </p>
        </div>

        <SearchResultsClient city={city} niche={niche} />
      </div>
    </main>
  );
}
