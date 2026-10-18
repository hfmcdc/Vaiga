import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { put, list } from "@vercel/blob";
import seed from "../../data/products.json";
import type { Product } from "@/data/products";

// Storage: Vercel Blob when BLOB_READ_WRITE_TOKEN exists (production),
// otherwise a local JSON file (your own PC).
export const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "products.json");
const BLOB_KEY = "data/products.json";
const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

export async function getProducts(): Promise<Product[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: BLOB_KEY, limit: 5 });
    const hit = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!hit) return seed as unknown as Product[]; // first run: start from the built-in list
    const r = await fetch(`${hit.url}?v=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) throw new Error("Could not read products from Blob");
    return r.json();
  }
  return JSON.parse(await fs.readFile(FILE, "utf8"));
}

export async function saveProducts(list: Product[]) {
  const json = JSON.stringify(list, null, 2);
  if (useBlob()) {
    await put(BLOB_KEY, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });
    return;
  }
  if (process.env.VERCEL)
    throw new Error("Blob storage is not connected. In Vercel: Storage → Create Blob → Connect to this project, then Redeploy.");
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, json);
  await fs.rename(tmp, FILE);
}

export async function saveImage(buf: Buffer, ext: string, contentType: string) {
  const name = `${crypto.randomBytes(8).toString("hex")}.${ext}`;
  if (useBlob()) {
    const b = await put(`uploads/${name}`, buf, { access: "public", contentType, addRandomSuffix: false });
    return b.url;
  }
  if (process.env.VERCEL)
    throw new Error("Blob storage is not connected. In Vercel: Storage → Create Blob → Connect to this project, then Redeploy.");
  await fs.mkdir(path.join(DATA_DIR, "uploads"), { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, "uploads", name), buf);
  return `/api/img/${name}`;
}

export async function getFeaturedProducts() {
  return (await getProducts()).filter((p) => p.featured);
}
