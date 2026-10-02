"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { fragrances } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";

type CartLine = { slug: string; quantity: string; count: number };
type CheckoutMessage = { tone: "success" | "error" | "info"; text: string };
type RazorpayCheckoutResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayCheckoutResponse) => Promise<void>;
  modal: { ondismiss: () => void };
};

type RazorpayFailureEvent = {
  error?: { description?: string };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (event: RazorpayFailureEvent) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [checkoutReady, setCheckoutReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<CheckoutMessage | null>(null);

  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  useEffect(() => { const stored = JSON.parse(localStorage.getItem("spa-cart") || "[]") as string[]; const grouped = stored.reduce<Record<string, CartLine>>((all, value) => { const [slug, quantity] = value.split("|"); const key = `${slug}|${quantity}`; all[key] = all[key] || { slug, quantity, count: 0 }; all[key].count += 1; return all; }, {}); setLines(Object.values(grouped)); }, []);
  useEffect(() => {
    const existing = document.getElementById("razorpay-checkout-script");
    if (existing) {
      setCheckoutReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setCheckoutReady(true);
    script.onerror = () => setMessage({ tone: "error", text: "Unable to load checkout. Please refresh and try again." });
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  const total = lines.reduce((sum, line) => { const product = fragrances.find((item) => item.slug === line.slug); return sum + (product?.price || 0) * line.count; }, 0);
  function save(next: CartLine[]) { setLines(next); localStorage.setItem("spa-cart", JSON.stringify(next.flatMap((line) => Array.from({ length: line.count }, () => `${line.slug}|${line.quantity}`)))); }
  async function startCheckout() {
    setMessage(null);
    if (!checkoutReady || !window.Razorpay) {
      setMessage({ tone: "error", text: "Checkout is still loading. Please try again in a moment." });
      return;
    }
    if (!razorpayKeyId) {
      setMessage({ tone: "error", text: "Razorpay public key is not configured." });
      return;
    }

    const amount = Math.round(total * 100);
    if (!Number.isInteger(amount) || amount < 100) {
      setMessage({ tone: "error", text: "Minimum payable amount is ₹1." });
      return;
    }

    setIsProcessing(true);

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR", receipt: `spa_${Date.now()}` }),
      });

      const orderData = (await orderResponse.json()) as { error?: string; order_id?: string; amount?: number; currency?: string };
      if (!orderResponse.ok || !orderData.order_id || !orderData.amount || !orderData.currency) {
        setMessage({ tone: "error", text: orderData.error || "Unable to create order. Please try again." });
        setIsProcessing(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shiv Prem Agencies",
        description: "Fragrance order",
        order_id: orderData.order_id,
        handler: async (response) => {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = (await verifyResponse.json()) as { error?: string };
          if (!verifyResponse.ok) {
            setMessage({ tone: "error", text: verifyData.error || "Payment verification failed." });
            setIsProcessing(false);
            return;
          }

          save([]);
          setMessage({ tone: "success", text: "Payment verified successfully. Thank you for your order." });
          setIsProcessing(false);
        },
        modal: {
          ondismiss: () => {
            setMessage({ tone: "info", text: "Checkout was dismissed before payment." });
            setIsProcessing(false);
          },
        },
      });

      razorpay.on("payment.failed", (event) => {
        setMessage({ tone: "error", text: event.error?.description || "Payment failed. Please try again." });
        setIsProcessing(false);
      });

      razorpay.open();
    } catch {
      setMessage({ tone: "error", text: "Something went wrong while starting checkout." });
      setIsProcessing(false);
    }
  }

  return <main className="cart-page"><header className="site-header"><a className="brand" href="/"><span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span></a></header><section className="cart-wrap"><a className="text-link" href="/catalogue"><ArrowLeft size={16}/> Continue shopping</a><p className="eyebrow"><ShoppingBag size={15}/> Your selection</p><h1>Your fragrance cart</h1>{lines.length === 0 ? <div className="empty-state">Your cart is waiting for something beautiful. <a className="text-link" href="/catalogue">Browse the collection <ArrowLeft size={15}/></a></div> : <div className="cart-content"><div>{lines.map((line) => { const product = fragrances.find((item) => item.slug === line.slug); if (!product) return null; return <article className="cart-line" key={`${line.slug}-${line.quantity}`}><div className="cart-swatch" style={{ background: product.color }}/><div><h2>{product.name}</h2><p>{line.quantity} · {product.category}</p></div><div className="stepper"><button onClick={() => save(lines.map((item) => item === line ? { ...item, count: Math.max(0, item.count - 1) } : item).filter((item) => item.count > 0))}><Minus size={15}/></button><span>{line.count}</span><button onClick={() => save(lines.map((item) => item === line ? { ...item, count: item.count + 1 } : item))}><Plus size={15}/></button></div><strong>{formatPrice(product.price * line.count)}</strong></article>; })}</div><aside className="summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><div><span>Shipping</span><span>Calculated at checkout</span></div><button className="button button-primary" onClick={startCheckout} disabled={isProcessing}>{isProcessing ? "Processing..." : "Continue to checkout"}</button>{message && <small className={`checkout-message checkout-message-${message.tone}`}>{message.text}</small>}</aside></div>}</section></main>;
}
