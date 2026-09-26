"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { saveDemoUser } from "@/lib/auth";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Please enter your full name.");
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    saveDemoUser({ name: name.trim(), email });
    window.location.href = "/account";
  }

  return <main className="auth-page"><div className="auth-brand"><a className="brand" href="/"><span className="brand-mark">✦</span><span>Shiv Prem <em>Agencies</em></span></a></div><section className="auth-card"><p className="eyebrow"><Leaf size={15}/> Join our community</p><h1>Set up your<br/><i>fragrance desk.</i></h1><p className="auth-copy">Save your delivery details and reorder your best-loved scents faster.</p><form onSubmit={submit}><label>Full name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name"/></label><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email"/></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" autoComplete="new-password"/></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit">Create account <ArrowRight size={16}/></button></form><p className="auth-switch">Already registered? <a href="/sign-in">Sign in</a></p></section></main>;
}
