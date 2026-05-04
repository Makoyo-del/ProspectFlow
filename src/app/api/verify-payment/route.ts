import { NextResponse } from "next/server";
import { verifyPaystackPayment } from "@/lib/api";

export async function POST(request: Request) {
  const { reference } = await request.json();

  if (!reference) {
    return NextResponse.json({ error: "Reference is required" }, { status: 400 });
  }

  try {
    console.log(`Verifying payment for reference: ${reference}`);
    const isValid = await verifyPaystackPayment(reference);
    
    if (isValid) {
      console.log(`Payment verified successfully for: ${reference}`);
      return NextResponse.json({ success: true });
    } else {
      console.warn(`Payment verification failed for: ${reference}`);
      return NextResponse.json({ success: false, error: "Invalid payment status from Paystack" }, { status: 400 });
    }
  } catch (error: any) {
    console.error(`Fatal verification error for ${reference}:`, error);
    return NextResponse.json({ error: error.message || "Internal server error during verification" }, { status: 500 });
  }
}
