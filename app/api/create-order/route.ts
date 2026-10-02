import Razorpay from "razorpay";
import { NextResponse } from "next/server";

type CreateOrderBody = {
  amount?: unknown;
  currency?: unknown;
  receipt?: unknown;
};

function getRazorpayClient() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

function isAuthFailure(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { statusCode?: number; error?: { description?: string } };
  if (candidate.statusCode === 401) return true;
  return candidate.error?.description?.toLowerCase().includes("authentication") || false;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CreateOrderBody | null;
  if (!body || !Number.isInteger(body.amount) || Number(body.amount) < 100 || typeof body.currency !== "string" || typeof body.receipt !== "string" || !body.currency.trim() || !body.receipt.trim()) {
    return NextResponse.json({ error: "Invalid payload. amount must be an integer >= 100, with currency and receipt." }, { status: 400 });
  }

  const razorpay = getRazorpayClient();
  if (!razorpay) return NextResponse.json({ error: "Razorpay credentials are not configured." }, { status: 500 });

  try {
    const order = await razorpay.orders.create({
      amount: Number(body.amount),
      currency: body.currency.trim().toUpperCase(),
      receipt: body.receipt.trim(),
    });

    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    if (isAuthFailure(error)) return NextResponse.json({ error: "Razorpay authentication failed." }, { status: 401 });
    return NextResponse.json({ error: "Failed to create Razorpay order." }, { status: 500 });
  }
}
