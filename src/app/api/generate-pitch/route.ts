import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, niche, city, status } = await request.json();

  if (!name || !niche) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // In a real app, you would call Gemini or OpenAI here.
  // For now, we use high-conversion templates based on lead status.
  
  let pitch = "";

  if (status === "ghost") {
    pitch = `Hi ${name} Team! 👋 I was looking for ${niche} services in ${city} and noticed your business doesn't have a professional website yet. 

As a result, you're likely losing 60% of your local search traffic to competitors. I specialize in building high-performance sites for ${niche}s. 

Would you be open to a 5-minute chat about how we can get you online and capturing those leads?`;
  } else {
    pitch = `Hello ${name}! 👋 I came across your ${niche} business in ${city}. Your setup looks great, but I noticed some gaps in your social media presence that could be costing you reach.

I've helped other ${niche}s in this area double their booking rate through targeted local ads. 

Are you currently looking to scale your client acquisition? I'd love to share some quick wins with you.`;
  }

  return NextResponse.json({ pitch });
}
