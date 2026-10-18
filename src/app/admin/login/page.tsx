"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, password }),
    });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setError(d.error || "Login failed");
    router.push("/admin");
    router.refresh();
  }

  const input =
    "mt-1.5 w-full rounded-xl border border-ink/20 bg-night px-4 py-3 text-ink focus:border-gold";

  return (
    <div className="bg-night px-5 py-16 sm:py-24">
      <form onSubmit={submit} className="mx-auto max-w-sm rounded-3xl bg-night-soft p-8 shadow-[0_20px_50px_-20px_rgba(31,20,9,0.35)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold text-brown">
          <Lock size={22} aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-center font-display text-2xl font-semibold">Admin Login</h1>
        <label className="mt-6 block text-sm font-medium">
          Secret code
          <input type="password" autoComplete="off" required value={code} onChange={(e) => setCode(e.target.value)} className={input} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Password
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        </label>
        {error && <p role="alert" className="mt-4 text-sm font-medium text-rose-300">{error}</p>}
        <button disabled={busy} className="mt-6 w-full rounded-full bg-maroon px-6 py-3 font-semibold text-cream-soft hover:bg-maroon-dark disabled:opacity-60">
          {busy ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
