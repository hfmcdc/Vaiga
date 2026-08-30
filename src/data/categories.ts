export type Category = {
  slug: "sweets" | "kerala-snacks" | "banana-specials" | "festive-specials";
  name: string;
  emoji: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "sweets",
    name: "Sweets",
    emoji: "🍬",
    description: "Traditional and festive sweets, made the way home kitchens have made them for generations.",
    image: "/images/categories/sweets.svg",
  },
  {
    slug: "kerala-snacks",
    name: "Kerala Snacks",
    emoji: "🥥",
    description: "Authentic Kerala-style snacks — crunchy, savoury and full of flavour.",
    image: "/images/categories/kerala-snacks.svg",
  },
  {
    slug: "banana-specials",
    name: "Banana Specials",
    emoji: "🍌",
    description: "Banana chips and traditional banana-based snacks, a Kerala favourite.",
    image: "/images/categories/banana-specials.svg",
  },
  {
    slug: "festive-specials",
    name: "Festive Specials",
    emoji: "🎉",
    description: "Special preparations for Onam, Janmashtami, Vishu and other celebrations.",
    image: "/images/categories/festive-specials.svg",
  },
];
