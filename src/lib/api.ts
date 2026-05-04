// TomTom Search API Wrapper
export interface TomTomLead {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  categories: string[];
  score: number;
  distance: number;
}

export async function searchLeads(city: string, niche: string, radius: number = 50000): Promise<TomTomLead[]> {
  const apiKey = process.env.TOMTOM_API_KEY;
  if (!apiKey) throw new Error("TOMTOM_API_KEY is not defined");

  // 1. Geocode the city to get lat/lon
  const geoUrl = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(city)}.json?key=${apiKey}&limit=1`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City not found: ${city}`);
  }

  const { lat, lon } = geoData.results[0].position;

  // 2. Search for POIs (leads)
  const searchUrl = `https://api.tomtom.com/search/2/poiSearch/${encodeURIComponent(niche)}.json?key=${apiKey}&lat=${lat}&lon=${lon}&radius=${radius}&limit=100&idxSet=POI`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  return searchData.results.map((r: any) => ({
    id: r.id,
    name: r.poi.name,
    address: r.address.freeformAddress,
    phone: r.poi.phone,
    website: r.poi.url,
    categories: r.poi.categories,
    score: r.score,
    distance: r.dist,
  }));
}

// Paystack Verification Wrapper
export async function verifyPaystackPayment(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not defined");

  const url = `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data.status && data.data.status === "success";
}
