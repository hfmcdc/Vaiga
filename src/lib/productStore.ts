import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { put, list } from "@vercel/blob";
import seed from "../../data/products.json";
import type { Product } from "@/data/products";

// Storage: Vercel Blob when BLOB_READ_WRITE_TOKEN exists (production),
// otherwise local JSON files in /data (your own PC).
export const DATA_DIR = path.join(process.cwd(), "data");
const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const NOT_CONNECTED =
  "Blob storage is not connected. In Vercel: Storage → Create Blob (Public) → Connect to this project, then Redeploy.";

export async function readStore<T>(name: string, fallback: () => T): Promise<T> {
  const key = `data/${name}.json`;
  if (useBlob()) {
    const { blobs } = await list({ prefix: key, limit: 5 });
    const hit = blobs.find((b) => b.pathname === key);
    if (!hit) return fallback();
    const r = await fetch(`${hit.url}?v=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) throw new Error(`Could not read ${name} from Blob`);
    return r.json();
  }
  try {
    return JSON.parse(await fs.readFile(path.join(DATA_DIR, `${name}.json`), "utf8"));
  } catch {
    return fallback();
  }
}

export async function writeStore(name: string, data: unknown) {
  const json = JSON.stringify(data, null, 2);
  if (useBlob()) {
    await put(`data/${name}.json`, json, {
      access: "public", contentType: "application/json",
      addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60,
    });
    return;
  }
  if (process.env.VERCEL) throw new Error(NOT_CONNECTED);
  const file = path.join(DATA_DIR, `${name}.json`);
  await fs.writeFile(file + ".tmp", json);
  await fs.rename(file + ".tmp", file);
}

export const getProducts = () => readStore<Product[]>("products", () => seed as unknown as Product[]);
export const saveProducts = (list: Product[]) => writeStore("products", list);

export async function saveImage(buf: Buffer, ext: string, contentType: string) {
  const name = `${crypto.randomBytes(8).toString("hex")}.${ext}`;
  if (useBlob()) {
    const b = await put(`uploads/${name}`, buf, { access: "public", contentType, addRandomSuffix: false });
    return b.url;
  }
  if (process.env.VERCEL) throw new Error(NOT_CONNECTED);
  await fs.mkdir(path.join(DATA_DIR, "uploads"), { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, "uploads", name), buf);
  return `/api/img/${name}`;
}

export async function getFeaturedProducts() {
  return (await getProducts()).filter((p) => p.featured);
}
