import { siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";

export type Hours = { day: string; time: string };
export type Quote = { quote: string; name: string };

/** Everything the admin can edit from /admin → "Website" tab. */
export type SiteContent = {
  phone: string; whatsapp: string; email: string;
  line1: string; line2: string; city: string; state: string; postalCode: string; mapEmbedUrl: string;
  hours: Hours[];
  instagram: string; facebook: string;
  tagline: string; heroEyebrow: string; heroText: string;
  festiveOn: boolean; stripText: string; stripLink: string;
  bannerBadge: string; bannerTitle: string; bannerText: string; bannerButton: string; bannerMessage: string;
  testimonials: Quote[];
};

export const defaultSite: SiteContent = {
  phone: siteConfig.phone, whatsapp: siteConfig.whatsappNumber, email: siteConfig.email,
  line1: siteConfig.address.line1, line2: siteConfig.address.line2, city: siteConfig.address.city,
  state: siteConfig.address.state, postalCode: siteConfig.address.postalCode, mapEmbedUrl: siteConfig.address.mapEmbedUrl,
  hours: siteConfig.hours.map((h) => ({ day: h.day, time: h.time })),
  instagram: siteConfig.social.instagram, facebook: siteConfig.social.facebook,
  tagline: siteConfig.tagline,
  heroEyebrow: "🪔 Happy Diwali 2026",
  heroText: "Light up this Diwali with fresh, traditional sweets and snacks — made with love in Kollam since 2020. Diwali Sweet Box 2026 is revealing soon!",
  festiveOn: true,
  stripText: "🪔 Happy Diwali! Diwali Sweet Box 2026 — revealing soon.",
  stripLink: "Get notified",
  bannerBadge: "🪔 Revealing Soon",
  bannerTitle: "Diwali Sweet Box 2026",
  bannerText: "A beautifully packed box of our finest Diwali sweets and snacks — perfect for gifting family and friends. We're putting the final touches on it. Message us to be the first to know!",
  bannerButton: "Notify Me on WhatsApp",
  bannerMessage: "Hi Vaiga Sweets & Snacks! Please notify me when the Diwali Sweet Box 2026 is revealed.",
  testimonials: testimonials.map((t) => ({ quote: t.quote, name: t.name })),
};

/** Same shape as siteConfig (so components keep using siteConfig.xxx) + the full editable content. */
export type LiveSite = {
  name: string; shortName: string; since: number; description: string; url: string;
  nav: readonly { label: string; href: string }[];
  phone: string; whatsappNumber: string; email: string; tagline: string;
  address: { line1: string; line2: string; city: string; state: string; postalCode: string; country: string; mapEmbedUrl: string };
  hours: Hours[];
  social: { instagram: string; facebook: string };
  content: SiteContent;
};

export function toLive(c: SiteContent): LiveSite {
  return {
    name: siteConfig.name, shortName: siteConfig.shortName, since: siteConfig.since,
    description: siteConfig.description, url: siteConfig.url, nav: siteConfig.nav,
    phone: c.phone, whatsappNumber: c.whatsapp, email: c.email, tagline: c.tagline,
    address: { line1: c.line1, line2: c.line2, city: c.city, state: c.state, postalCode: c.postalCode, country: siteConfig.address.country, mapEmbedUrl: c.mapEmbedUrl },
    hours: c.hours,
    social: { instagram: c.instagram, facebook: c.facebook },
    content: c,
  };
}
