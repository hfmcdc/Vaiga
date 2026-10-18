import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { writeStore } from "@/lib/productStore";
import { getSiteContent } from "@/lib/siteStore";
import { defaultSite, type SiteContent } from "@/data/siteContent";

const err = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s });
const str = (v: unknown, max = 600) => String(v ?? "").trim().slice(0, max);

function clean(b: Record<string, unknown>): SiteContent | string {
  const out = { ...defaultSite } as Record<string, unknown>;
  for (const [k, d] of Object.entries(defaultSite)) {
    if (typeof d === "string") out[k] = str(b[k]);
  }
  out.festiveOn = !!b.festiveOn;
  out.whatsapp = str(b.whatsapp, 20).replace(/\D/g, "");
  if (String(out.whatsapp).length < 10) return "WhatsApp number must be digits with country code, e.g. 918281896001";
  for (const k of ["instagram", "facebook"]) if (!String(out[k]).startsWith("https://")) return `${k} link must start with https://`;
  if (!String(out.mapEmbedUrl).startsWith("https://www.google.com/maps")) return "Map link must start with https://www.google.com/maps";
  const arr = (v: unknown) => (Array.isArray(v) ? v.slice(0, 12) : []);
  out.hours = arr(b.hours).map((h: Record<string, unknown>) => ({ day: str(h?.day, 60), time: str(h?.time, 60) })).filter((h) => h.day);
  out.testimonials = arr(b.testimonials).map((t: Record<string, unknown>) => ({ quote: str(t?.quote, 300), name: str(t?.name, 60) || "Customer" })).filter((t) => t.quote);
  return out as SiteContent;
}

export async function GET() {
  if (!(await isAdmin())) return err("Unauthorized", 401);
  return NextResponse.json(await getSiteContent());
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return err("Unauthorized", 401);
  try {
    const c = clean(await req.json().catch(() => ({})));
    if (typeof c === "string") return err(c);
    await writeStore("site", c);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return err(e instanceof Error ? e.message : "Server error", 500);
  }
}
