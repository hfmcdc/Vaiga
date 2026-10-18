import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { getProducts, saveProducts } from "@/lib/productStore";
import { categories } from "@/data/categories";
import type { Product } from "@/data/products";

const PLACEHOLDER = "/images/products/traditional-sweets.svg";
const err = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s });
const done = () => revalidatePath("/", "layout");

const safe = (h: (req: Request) => Promise<Response>) => async (req: Request) => {
  try {
    return await h(req);
  } catch (e) {
    console.error(e);
    return err(e instanceof Error ? e.message : "Server error", 500);
  }
};

function clean(b: Record<string, unknown>): Product | string {
  const name = String(b.name ?? "").trim().slice(0, 80);
  const category = String(b.category ?? "");
  const image = String(b.image ?? "").trim() || PLACEHOLDER;
  if (!name) return "Name is required";
  if (!categories.some((c) => c.slug === category)) return "Pick a valid category";
  if (!(image.startsWith("/") || image.startsWith("https://")) || image.length > 300) return "Invalid image path";
  return {
    slug: String(b.slug ?? ""), name,
    description: String(b.description ?? "").trim().slice(0, 300),
    image, category: category as Product["category"],
    price: String(b.price ?? "").trim().slice(0, 40) || "Contact us",
    available: !!b.available, featured: !!b.featured,
  };
}

async function GET_() {
  if (!(await isAdmin())) return err("Unauthorized", 401);
  return NextResponse.json(await getProducts());
}

async function POST_(req: Request) {
  if (!(await isAdmin())) return err("Unauthorized", 401);
  const p = clean(await req.json().catch(() => ({})));
  if (typeof p === "string") return err(p);
  const list = await getProducts();
  const base = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
  let slug = base, i = 2;
  while (list.some((x) => x.slug === slug)) slug = `${base}-${i++}`;
  list.push({ ...p, slug });
  await saveProducts(list); done();
  return NextResponse.json({ ok: true });
}

async function PUT_(req: Request) {
  if (!(await isAdmin())) return err("Unauthorized", 401);
  const body = await req.json().catch(() => ({}));
  const p = clean(body);
  if (typeof p === "string") return err(p);
  const list = await getProducts();
  const idx = list.findIndex((x) => x.slug === body.slug);
  if (idx < 0) return err("Product not found", 404);
  list[idx] = { ...p, slug: list[idx].slug };
  await saveProducts(list); done();
  return NextResponse.json({ ok: true });
}

async function DELETE_(req: Request) {
  if (!(await isAdmin())) return err("Unauthorized", 401);
  const slug = new URL(req.url).searchParams.get("slug");
  const list = await getProducts();
  const next = list.filter((x) => x.slug !== slug);
  if (next.length === list.length) return err("Product not found", 404);
  await saveProducts(next); done();
  return NextResponse.json({ ok: true });
}

export const GET = safe(GET_);
export const POST = safe(POST_);
export const PUT = safe(PUT_);
export const DELETE = safe(DELETE_);
