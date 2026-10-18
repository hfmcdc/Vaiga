import type { Category } from "@/data/categories";

export type Product = {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: Category["slug"];
  price: string; // Kept as a friendly placeholder — see README before adding real prices.
  available: boolean;
  featured: boolean;
};
