/**
 * Central site configuration.
 *
 * Update the business's public-facing details here — nowhere else.
 * Values fall back to NEXT_PUBLIC_* environment variables where relevant,
 * so production values can be set in Vercel without touching code.
 * See `.env.example` and the README for details.
 */

const digitsOnly = (value: string) => value.replace(/[^\d]/g, "");

export const siteConfig = {
  name: "Vaiga Sweets & Snacks",
  shortName: "Vaiga",
  tagline: "Traditional Taste. Made with Love.",
  since: 2020,
  description:
    "Vaiga Sweets & Snacks — traditional Kerala sweets, snacks and festive favourites made with care since 2020. Order fresh sweets and snacks for your celebrations.",
  url: "https://www.vaigasweets.com",

  // Phone number shown to customers (any readable format is fine here).
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 82818 96001",

  // WhatsApp number used to build wa.me links. Digits only, with country code,
  // no "+" or spaces (e.g. 919000000000 for an Indian number).
  whatsappNumber: digitsOnly(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918281896001"
  ),

  email: process.env.NEXT_PUBLIC_EMAIL || "hello@vaigasweets.com",

  address: {
    line1: "Lekshmi Nivas",
    line2: "T D Nagar 1",
    city: "Kollam",
    state: "Kerala",
    postalCode: "691001",
    country: "India",
    // Replace with a real embed URL from Google Maps → Share → Embed a map.
    mapEmbedUrl:
      "https://www.google.com/maps?q=T+D+Nagar,+Kollam,+Kerala&output=embed",
  },

  hours: [
    { day: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { day: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
