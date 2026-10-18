import fs from "fs/promises";
import path from "path";
import type { Product } from "@/data/products";

// Jugaad storage: one JSON file. Works on your PC / a VPS, NOT on Vercel (read-only disk).
export const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "products.json");

export async function getProducts(): Promise<Product[]> {
  return JSON.parse(await fs.readFile(FILE, "utf8"));
}

export async function saveProducts(list: Product[]) {
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(list, null, 2));
  await fs.rename(tmp, FILE);
}

export async function getFeaturedProducts() {
  return (await getProducts()).filter((p) => p.featured);
}
