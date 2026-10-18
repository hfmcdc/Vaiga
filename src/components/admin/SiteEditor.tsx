"use client";

import { useState } from "react";
import type { SiteContent } from "@/data/siteContent";

const box = "mt-1 w-full rounded-xl border border-ink/20 bg-night px-3 py-2.5";

export default function SiteEditor({ initial }: { initial: SiteContent }) {
  const [c, setC] = useState<SiteContent>(initial);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => setC((p) => ({ ...p, [k]: v }));

  function field(label: string, k: keyof SiteContent, opts: { area?: boolean; hint?: string } = {}) {
    const props = {
      value: c[k] as string,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(k, e.target.value as never),
      className: box,
    };
    return (
      <label className="block text-sm font-medium">
        {label}
        {opts.area ? <textarea rows={3} {...props} /> : <input {...props} />}
        {opts.hint && <span className="mt-1 block text-xs font-normal text-ink/60">{opts.hint}</span>}
      </label>
    );
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const r = await fetch("/api/admin/site", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(c) });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    setMsg(r.ok ? "Saved ✓ — the website is updated" : `Could not save: ${d.error || r.status}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const card = "space-y-4 rounded-3xl bg-night-soft p-6 shadow-sm";

  return (
    <form onSubmit={save} className="mt-8 grid gap-6 lg:grid-cols-2">
      {msg && <p role="status" className="lg:col-span-2 rounded-xl bg-gold/30 px-4 py-2 text-sm font-medium">{msg}</p>}

      <section className={card}>
        <h2 className="font-display text-xl font-semibold">🪔 Festival (Diwali) banner</h2>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={c.festiveOn} onChange={(e) => set("festiveOn", e.target.checked)} />
          Show the festival strip and banner
        </label>
        {field("Top strip text", "stripText")}
        {field("Top strip link text", "stripLink", { hint: "Leave empty to hide the link" })}
        {field("Banner small label", "bannerBadge")}
        {field("Banner heading", "bannerTitle")}
        {field("Banner text", "bannerText", { area: true })}
        {field("Banner button text", "bannerButton", { hint: "Leave empty to hide the button" })}
        {field("WhatsApp message the button sends", "bannerMessage", { area: true })}
      </section>

      <section className={card}>
        <h2 className="font-display text-xl font-semibold">Home page top</h2>
        {field("Small label", "heroEyebrow")}
        {field("Tagline", "tagline")}
        {field("Intro text", "heroText", { area: true })}
        <h2 className="pt-2 font-display text-xl font-semibold">Contact details</h2>
        {field("Phone (shown to customers)", "phone")}
        {field("WhatsApp number", "whatsapp", { hint: "Digits only with country code, e.g. 918281896001" })}
        {field("Email", "email")}
        {field("Instagram link", "instagram", { hint: "Must start with https://" })}
        {field("Facebook link", "facebook", { hint: "Must start with https://" })}
      </section>

      <section className={card}>
        <h2 className="font-display text-xl font-semibold">Address &amp; opening hours</h2>
        {field("Address line 1", "line1")}
        {field("Address line 2", "line2")}
        {field("City", "city")}
        {field("State", "state")}
        {field("Pincode", "postalCode")}
        {field("Google Map link", "mapEmbedUrl", { hint: "Google Maps → Share → Embed a map → copy only the src=\"…\" link" })}
        <div className="space-y-2">
          <p className="text-sm font-medium">Opening hours</p>
          {c.hours.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input aria-label="Days" placeholder="Monday – Saturday" value={h.day} className={box} onChange={(e) => set("hours", c.hours.map((x, j) => (j === i ? { ...x, day: e.target.value } : x)))} />
              <input aria-label="Time" placeholder="9:00 AM – 8:00 PM" value={h.time} className={box} onChange={(e) => set("hours", c.hours.map((x, j) => (j === i ? { ...x, time: e.target.value } : x)))} />
              <button type="button" onClick={() => set("hours", c.hours.filter((_, j) => j !== i))} className="mt-1 rounded-xl px-3 text-rose-300" aria-label="Remove row">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => set("hours", [...c.hours, { day: "", time: "" }])} className="text-sm font-semibold text-gold underline">+ Add row</button>
        </div>
      </section>

      <section className={card}>
        <h2 className="font-display text-xl font-semibold">Customer reviews</h2>
        <p className="text-xs text-ink/60">Only add real feedback from your customers. Remove all to hide the section.</p>
        {c.testimonials.map((t, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-ink/10 p-3">
            <textarea aria-label="Review" rows={2} maxLength={300} placeholder="What the customer said" value={t.quote} className={box} onChange={(e) => set("testimonials", c.testimonials.map((x, j) => (j === i ? { ...x, quote: e.target.value } : x)))} />
            <div className="flex gap-2">
              <input aria-label="Name" placeholder="Name" value={t.name} className={box} onChange={(e) => set("testimonials", c.testimonials.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
              <button type="button" onClick={() => set("testimonials", c.testimonials.filter((_, j) => j !== i))} className="mt-1 rounded-xl px-3 text-sm font-semibold text-rose-300">Remove</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => set("testimonials", [...c.testimonials, { quote: "", name: "" }])} className="text-sm font-semibold text-gold underline">+ Add review</button>
      </section>

      <div className="lg:col-span-2">
        <button disabled={busy} className="rounded-full bg-maroon px-8 py-3 font-semibold text-cream-soft hover:bg-maroon-dark disabled:opacity-60">
          {busy ? "Saving…" : "Save website changes"}
        </button>
      </div>
    </form>
  );
}
