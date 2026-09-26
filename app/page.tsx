import { ArrowRight, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { fragrances, packSizes } from "@/lib/catalog";

export default function Home() {
  const featured = fragrances.slice(0, 6);
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Shiv Prem Agencies home">
          <span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span>
        </a>
        <nav><a href="#catalogue">Catalogue</a><a href="#about">Why us</a><a href="#contact">Contact</a><button className="button button-dark">Sign in</button></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><Leaf size={15}/> Fragrance, thoughtfully supplied</p><h1>Make every candle feel like <i>home.</i></h1><p className="hero-text">Discover a considered collection of candle fragrances and aroma oils, supplied in flexible quantities for makers and growing businesses.</p><div className="hero-actions"><a className="button button-primary" href="#catalogue">Explore fragrances <ArrowRight size={17}/></a><a className="text-link" href="#contact">Talk to our team</a></div></div>
        <div className="hero-art" aria-label="Botanical candle illustration"><div className="sun"></div><div className="leaf leaf-one"></div><div className="leaf leaf-two"></div><div className="jar"><div className="flame"></div></div><div className="hero-note">Small batches<br/><strong>big atmosphere</strong></div></div>
      </section>

      <section className="trust-row"><div><ShieldCheck/> Quality-led sourcing</div><div><Sparkles/> Fragrance that lasts</div><div><Truck/> Flexible fulfilment</div></section>

      <section className="section" id="catalogue"><div className="section-heading"><div><p className="eyebrow">The collection</p><h2>Find your signature scent</h2></div><span className="muted">{fragrances.length} curated fragrances</span></div><div className="product-grid">{featured.map((item) => <article className="product-card" key={item.slug}><div className="product-art" style={{ background: item.color }}><span>{item.category === "Aroma Oil" ? "Aroma" : "Candle"}</span></div><div className="product-info"><div><p className="category">{item.category}</p><h3>{item.name}</h3></div><p className="notes">{item.notes}</p><div className="card-footer"><span>From ₹{item.price.toLocaleString("en-IN")}</span><button aria-label={`View ${item.name}`}>View <ArrowRight size={15}/></button></div></div></article>)}</div></section>

      <section className="quantity-banner"><div><p className="eyebrow">Made for your scale</p><h2>From 500 ml to 10 kg.<br/><i>Exactly what you need.</i></h2></div><div className="quantity-pills">{packSizes.slice(0, 6).map((size) => <span key={size}>{size}</span>)}<span>Custom</span></div></section>

      <section className="about section" id="about"><div className="about-card"><p className="eyebrow">The Shiv Prem difference</p><h2>A warmer way to source fragrance.</h2><p>We bring dependable fragrance supply and a personal, responsive approach together—so you can focus on creating products people want to live with.</p><a className="text-link" href="#contact">Work with us <ArrowRight size={16}/></a></div><div className="about-stat"><strong>10+</strong><span>standard pack sizes</span><strong>100%</strong><span>made for makers</span></div></section>

      <footer id="contact"><div className="brand"><span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span></div><p>Premium candle fragrances & aroma oils.</p><span className="muted">© 2026 Shiv Prem Agencies</span></footer>
    </main>
  );
}
