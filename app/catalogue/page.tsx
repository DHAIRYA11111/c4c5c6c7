"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { fragrances } from "@/lib/catalog";
import { calculatePrice, formatPrice, quantityOptions } from "@/lib/pricing";

export default function CataloguePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [quantity, setQuantity] = useState(quantityOptions[0].label);
  const [custom, setCustom] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filtered = useMemo(() => fragrances.filter((item) => {
    const matchesQuery = `${item.name} ${item.notes}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesQuery && matchesCategory;
  }), [category, query]);

  function addToCart(slug: string) {
    const selected = custom ? `custom:${custom}:kg` : quantity;
    const current = JSON.parse(localStorage.getItem("spa-cart") || "[]") as string[];
    localStorage.setItem("spa-cart", JSON.stringify([...current, `${slug}|${selected}`]));
    setCartCount((count) => count + 1);
  }

  return <main className="catalogue-page">
    <header className="site-header"><a className="brand" href="/"><span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span></a><a className="button button-dark" href="/cart"><ShoppingBag size={17}/> Cart {cartCount > 0 && `(${cartCount})`}</a></header>
    <section className="catalogue-intro"><p className="eyebrow">The full collection</p><h1>Find a fragrance<br/><i>to remember.</i></h1><p>Explore candle fragrances and aroma oils, supplied in quantities that fit your production.</p></section>
    <section className="shop-layout"><aside className="filters"><div className="filter-title"><SlidersHorizontal size={17}/> Refine</div><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option><option>Candle Fragrance</option><option>Aroma Oil</option></select></label><label>Pack size<select value={quantity} onChange={(event) => { setQuantity(event.target.value); setCustom(""); }}><option value="">Select pack size</option>{quantityOptions.map((option) => <option key={option.label}>{option.label}</option>)}</select></label><label>Custom kg<input type="number" min="0.1" step="0.1" placeholder="Optional" value={custom} onChange={(event) => setCustom(event.target.value)}/></label></aside><div className="shop-results"><div className="search-box"><Search size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search vanilla, floral, woody..." aria-label="Search fragrances"/></div><p className="result-count">{filtered.length} fragrances</p><div className="product-grid">{filtered.map((item) => <article className="product-card" key={item.slug}><div className="product-art" style={{ background: item.color }}><span>{item.category === "Aroma Oil" ? "Aroma" : "Candle"}</span></div><div className="product-info"><p className="category">{item.category}</p><h2>{item.name}</h2><p className="notes">{item.notes}</p><div className="card-footer"><span>{formatPrice(calculatePrice(item.price, quantityOptions.find((option) => option.label === quantity) || quantityOptions[0]))}</span><button onClick={() => addToCart(item.slug)}>Add <ArrowRight size={15}/></button></div></div></article>)}</div>{filtered.length === 0 && <div className="empty-state">No fragrances match your search. Try another note or category.</div>}</div></section>
  </main>;
}
