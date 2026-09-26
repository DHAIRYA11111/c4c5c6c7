"use client";

import { useEffect, useState } from "react";
import { ArrowRight, LogOut, MapPin, Package, UserRound } from "lucide-react";
import { clearDemoUser, DemoUser, getDemoUser } from "@/lib/auth";

export default function AccountPage() {
  const [user, setUser] = useState<DemoUser | null>(null);
  useEffect(() => setUser(getDemoUser()), []);
  if (!user) return <main className="account-page"><section className="account-empty"><UserRound size={30}/><h1>Your account is waiting.</h1><p>Sign in to manage saved addresses and orders.</p><a className="button button-primary" href="/sign-in">Sign in <ArrowRight size={16}/></a></section></main>;
  return <main className="account-page"><header className="site-header"><a className="brand" href="/"><span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span></a><button className="button button-dark" onClick={() => { clearDemoUser(); setUser(null); }}> <LogOut size={16}/> Sign out</button></header><section className="account-wrap"><p className="eyebrow"><UserRound size={15}/> Your fragrance desk</p><h1>Hello, <i>{user.name}.</i></h1><p className="account-lead">Manage your profile, delivery details, and orders from one calm place.</p><div className="account-grid"><article className="account-panel"><MapPin/><h2>Saved addresses</h2><p>No saved addresses yet. Add one during checkout.</p><a className="text-link" href="/catalogue">Start shopping <ArrowRight size={15}/></a></article><article className="account-panel"><Package/><h2>Order history</h2><p>Your completed orders will appear here after checkout.</p><a className="text-link" href="/catalogue">Browse catalogue <ArrowRight size={15}/></a></article><article className="account-panel"><UserRound/><h2>Profile</h2><p>{user.email}</p><span className="muted">Profile editing arrives with backend persistence.</span></article></div></section></main>;
}
