"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { saveDemoUser } from "@/lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) return setError("Enter your email and password to continue.");
    saveDemoUser({ name: email.split("@")[0], email });
    window.location.href = "/account";
  }

  return <main className="auth-page"><div className="auth-brand"><a className="brand" href="/"><span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span></a></div><section className="auth-card"><p className="eyebrow"><Leaf size={15}/> Welcome back</p><h1>Sign in to your<br/><i>fragrance desk.</i></h1><p className="auth-copy">Keep your addresses, orders, and favourite supplies close at hand.</p><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email"/></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" autoComplete="current-password"/></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit">Sign in <ArrowRight size={16}/></button></form><p className="auth-switch">New to Shiv Prem? <a href="/sign-up">Create an account</a></p></section></main>;
}
