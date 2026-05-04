import { NextResponse } from "next/server";
import { searchLeads } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const niche = searchParams.get("niche");
  const radius = searchParams.get("radius") ? parseInt(searchParams.get("radius")!) : 50000;

  if (!city || !niche) {
    return NextResponse.json({ error: "City and Niche are required" }, { status: 400 });
  }

  try {
    const leads = await searchLeads(city, niche, radius);
    return NextResponse.json(leads);
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
