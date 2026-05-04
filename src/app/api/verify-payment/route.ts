import { NextResponse } from "next/server";
import { verifyPaystackPayment } from "@/lib/api";

export async function POST(request: Request) {
  const { reference } = await request.json();

  if (!reference) {
    return NextResponse.json({ error: "Reference is required" }, { status: 400 });
  }

  try {
    const isValid = await verifyPaystackPayment(reference);
    if (isValid) {
      // In a real app, you might save this reference to a DB or a cookie/session
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid payment" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
