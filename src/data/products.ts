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

/**
 * Add a new product by adding an object to this array.
 * `image` should point to a file in /public/images/products —
 * see README "How to replace images" for guidance on sizing.
 */
export const products: Product[] = [
  {
    slug: "banana-chips",
    name: "Banana Chips",
    description: "Thin, crisp banana chips fried in coconut oil with a touch of Kerala salt.",
    image: "/images/products/banana-chips.svg",
    category: "banana-specials",
    price: "Contact us",
    available: true,
    featured: true,
  },
  {
    slug: "sharkara-varatti",
    name: "Sharkara Varatti",
    description: "Jaggery-coated banana slices with a hint of dry ginger and cumin.",
    image: "/images/products/sharkara-varatti.svg",
    category: "sweets",
    price: "Contact us",
    available: true,
    featured: true,
  },
  {
    slug: "banana-halwa",
    name: "Banana Halwa",
    description: "Slow-cooked banana halwa, rich, chewy and lightly spiced.",
    image: "/images/products/banana-halwa.svg",
    category: "sweets",
    price: "Contact us",
    available: true,
    featured: true,
  },
  {
    slug: "mixture",
    name: "Mixture",
    description: "A savoury blend of lentils, peanuts and spices — a Kerala tea-time staple.",
    image: "/images/products/mixture.svg",
    category: "kerala-snacks",
    price: "Contact us",
    available: true,
    featured: true,
  },
  {
    slug: "aval-mixture",
    name: "Aval Mixture",
    description: "Flattened rice mixture, roasted and seasoned for a light, crunchy snack.",
    image: "/images/products/aval-mixture.svg",
    category: "kerala-snacks",
    price: "Contact us",
    available: true,
    featured: false,
  },
  {
    slug: "unniyappam",
    name: "Unniyappam",
    description: "Bite-sized, jaggery-sweetened rice and banana fritters.",
    image: "/images/products/unniyappam.svg",
    category: "festive-specials",
    price: "Contact us",
    available: true,
    featured: true,
  },
  {
    slug: "achappam",
    name: "Achappam",
    description: "Delicate rosette-shaped rice flour cookies, crisp and lightly sweet.",
    image: "/images/products/achappam.svg",
    category: "sweets",
    price: "Contact us",
    available: true,
    featured: false,
  },
  {
    slug: "murukku",
    name: "Murukku",
    description: "Spiral-shaped rice flour snack, crunchy with a mild spice.",
    image: "/images/products/murukku.svg",
    category: "kerala-snacks",
    price: "Contact us",
    available: true,
    featured: true,
  },
  {
    slug: "neyyappam",
    name: "Neyyappam",
    description: "Traditional ghee-fried rice and jaggery cakes, soft in the centre.",
    image: "/images/products/neyyappam.svg",
    category: "festive-specials",
    price: "Contact us",
    available: true,
    featured: false,
  },
  {
    slug: "traditional-sweets",
    name: "Traditional Kerala Sweets",
    description: "An assortment box of classic Kerala sweets, perfect for gifting.",
    image: "/images/products/traditional-sweets.svg",
    category: "sweets",
    price: "Contact us",
    available: true,
    featured: true,
  },
];

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: Category["slug"]) {
  return products.filter((p) => p.category === category);
}
