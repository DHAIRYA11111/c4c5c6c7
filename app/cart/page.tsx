"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { fragrances } from "@/lib/catalog";
import { formatPrice } from "@/lib/pricing";

type CartLine = { slug: string; quantity: string; count: number };

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => { const stored = JSON.parse(localStorage.getItem("spa-cart") || "[]") as string[]; const grouped = stored.reduce<Record<string, CartLine>>((all, value) => { const [slug, quantity] = value.split("|"); const key = `${slug}|${quantity}`; all[key] = all[key] || { slug, quantity, count: 0 }; all[key].count += 1; return all; }, {}); setLines(Object.values(grouped)); }, []);
  const total = lines.reduce((sum, line) => { const product = fragrances.find((item) => item.slug === line.slug); return sum + (product?.price || 0) * line.count; }, 0);
  function save(next: CartLine[]) { setLines(next); localStorage.setItem("spa-cart", JSON.stringify(next.flatMap((line) => Array.from({ length: line.count }, () => `${line.slug}|${line.quantity}`)))); }
  return <main className="cart-page"><header className="site-header"><a className="brand" href="/"><span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span></a></header><section className="cart-wrap"><a className="text-link" href="/catalogue"><ArrowLeft size={16}/> Continue shopping</a><p className="eyebrow"><ShoppingBag size={15}/> Your selection</p><h1>Your fragrance cart</h1>{lines.length === 0 ? <div className="empty-state">Your cart is waiting for something beautiful. <a className="text-link" href="/catalogue">Browse the collection <ArrowLeft size={15}/></a></div> : <div className="cart-content"><div>{lines.map((line) => { const product = fragrances.find((item) => item.slug === line.slug); if (!product) return null; return <article className="cart-line" key={`${line.slug}-${line.quantity}`}><div className="cart-swatch" style={{ background: product.color }}/><div><h2>{product.name}</h2><p>{line.quantity} · {product.category}</p></div><div className="stepper"><button onClick={() => save(lines.map((item) => item === line ? { ...item, count: Math.max(0, item.count - 1) } : item).filter((item) => item.count > 0))}><Minus size={15}/></button><span>{line.count}</span><button onClick={() => save(lines.map((item) => item === line ? { ...item, count: item.count + 1 } : item))}><Plus size={15}/></button></div><strong>{formatPrice(product.price * line.count)}</strong></article>; })}</div><aside className="summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><div><span>Shipping</span><span>Calculated at checkout</span></div><button className="button button-primary">Continue to checkout</button><small>Checkout and payment integration will be connected in the next backend phase.</small></aside></div>}</section></main>;
}
