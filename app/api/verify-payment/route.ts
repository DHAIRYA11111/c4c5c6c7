import crypto from "crypto";
import { NextResponse } from "next/server";

type VerifyPaymentBody = {
  razorpay_payment_id?: unknown;
  razorpay_order_id?: unknown;
  razorpay_signature?: unknown;
};

function safeSignaturesMatch(expected: string, provided: string): boolean {
  const expectedBuffer = Buffer.from(expected, "utf8");
  const providedBuffer = Buffer.from(provided, "utf8");
  if (expectedBuffer.length !== providedBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as VerifyPaymentBody | null;
  if (!body || typeof body.razorpay_payment_id !== "string" || typeof body.razorpay_order_id !== "string" || typeof body.razorpay_signature !== "string" || !body.razorpay_payment_id.trim() || !body.razorpay_order_id.trim() || !body.razorpay_signature.trim()) {
    return NextResponse.json({ error: "Missing required Razorpay payment fields." }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return NextResponse.json({ error: "Razorpay secret is not configured." }, { status: 500 });

  const payload = `${body.razorpay_order_id.trim()}|${body.razorpay_payment_id.trim()}`;
  const expectedSignature = crypto.createHmac("sha256", keySecret).update(payload).digest("hex");
  const isValid = safeSignaturesMatch(expectedSignature, body.razorpay_signature.trim());

  if (!isValid) return NextResponse.json({ error: "Payment signature mismatch." }, { status: 400 });

  return NextResponse.json({ success: true });
}
