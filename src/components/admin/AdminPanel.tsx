"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import type { Product } from "@/data/products";
import type { SiteContent } from "@/data/siteContent";
import SiteEditor from "@/components/admin/SiteEditor";

const blank: Product = {
  slug: "", name: "", description: "", image: "", category: "sweets",
  price: "Contact us", available: true, featured: false,
};

export default function AdminPanel({ initial, site }: { initial: Product[]; site: SiteContent }) {
  const [tab, setTab] = useState<"products" | "site">("products");
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState<Product>(blank);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof Product>(k: K, v: Product[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function reload() {
    const r = await fetch("/api/admin/products");
    if (r.status === 401) return router.push("/admin/login");
    setItems(await r.json());
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const r = await fetch("/api/admin/products", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setMsg(d.error || "Could not save");
    setMsg(editing ? "Updated ✓" : "Added ✓");
    setForm(blank);
    setEditing(false);
    reload();
  }

  async function del(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const r = await fetch(`/api/admin/products?slug=${encodeURIComponent(p.slug)}`, { method: "DELETE" });
    const d = await r.json().catch(() => ({}));
    setMsg(r.ok ? "Deleted ✓" : `Could not delete: ${d.error || r.status}`);
    reload();
  }

  async function upload(file?: File) {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return setMsg(d.error || "Upload failed");
    set("image", d.path);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const input = "mt-1 w-full rounded-xl border border-ink/20 bg-night px-3 py-2.5";

  return (
    <div className="bg-night">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-semibold">Manage Products</h1>
          <button onClick={logout} className="rounded-full border-2 border-ink px-5 py-2 text-sm font-semibold hover:bg-ink hover:text-night">
            Log out
          </button>
        </div>
        <div className="mt-6 flex gap-2">
          {(["products", "site"] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); setMsg(""); }}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${tab === t ? "bg-maroon text-cream-soft" : "bg-night-soft text-ink/75"}`}>
              {t === "products" ? "Products" : "Website (text, contact, Diwali…)"}
            </button>
          ))}
        </div>
        {tab === "site" && <SiteEditor initial={site} />}
        {msg && tab === "products" && <p role="status" className="mt-4 rounded-xl bg-gold/30 px-4 py-2 text-sm font-medium">{msg}</p>}

        {tab === "products" && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          <form onSubmit={save} className="h-fit space-y-4 rounded-3xl bg-night-soft p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold">{editing ? `Edit: ${form.name}` : "Add new product"}</h2>
            <label className="block text-sm font-medium">Name
              <input required maxLength={80} value={form.name} onChange={(e) => set("name", e.target.value)} className={input} />
            </label>
            <label className="block text-sm font-medium">Description
              <textarea rows={3} maxLength={300} value={form.description} onChange={(e) => set("description", e.target.value)} className={input} />
            </label>
            <label className="block text-sm font-medium">Category
              <select value={form.category} onChange={(e) => set("category", e.target.value as Product["category"])} className={input}>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">Price (e.g. ₹120 / 250g)
              <input maxLength={40} value={form.price} onChange={(e) => set("price", e.target.value)} className={input} />
            </label>
            <div className="text-sm font-medium">
              Photo (JPG/PNG/WebP, max 4 MB)
              {form.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image} alt="Preview" className="mt-2 h-28 w-28 rounded-xl object-cover" />
              )}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => upload(e.target.files?.[0])} className="mt-2 block w-full text-sm" />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={form.available} onChange={(e) => set("available", e.target.checked)} /> Available
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> Show on homepage (featured)
            </label>
            <div className="flex gap-3">
              <button disabled={busy} className="flex-1 rounded-full bg-maroon px-5 py-3 font-semibold text-cream-soft hover:bg-maroon-dark disabled:opacity-60">
                {busy ? "Saving…" : editing ? "Save changes" : "Add product"}
              </button>
              {editing && (
                <button type="button" onClick={() => { setForm(blank); setEditing(false); }} className="rounded-full border-2 border-ink/30 px-5 py-3 font-semibold">
                  Cancel
                </button>
              )}
            </div>
          </form>

          <ul className="space-y-3">
            {items.map((p) => (
              <li key={p.slug} className="flex items-center gap-4 rounded-2xl bg-night-soft p-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.name}</p>
                  <p className="truncate text-sm text-ink/65">
                    {categories.find((c) => c.slug === p.category)?.name} · {p.price}
                    {p.featured && " · ★ featured"}{!p.available && " · unavailable"}
                  </p>
                </div>
                <button onClick={() => { setForm(p); setEditing(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-brown">Edit</button>
                <button onClick={() => del(p)} className="rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream-soft">Delete</button>
              </li>
            ))}
            {items.length === 0 && <li className="text-ink/60">No products yet.</li>}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
}
