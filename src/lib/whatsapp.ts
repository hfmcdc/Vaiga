import { siteConfig } from "@/data/site";

/** Pass the live site (from getLiveSite()/useSite()) so edits made in /admin are used. */
type S = { name?: string; whatsappNumber?: string; phone?: string; email?: string };

export function buildWhatsAppLink(message?: string, s: S = {}) {
  const name = s.name ?? siteConfig.name;
  const text = message ?? `Hi ${name}! I would like to place an order.`;
  return `https://wa.me/${s.whatsappNumber || siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildProductWhatsAppLink(productName: string, s: S = {}) {
  return buildWhatsAppLink(`Hi ${s.name ?? siteConfig.name}! I'd like to order ${productName}.`, s);
}

export function buildTelLink(s: S = {}) {
  return `tel:${(s.phone || siteConfig.phone).replace(/[^\d+]/g, "")}`;
}

export function buildMailLink(subject?: string, s: S = {}) {
  return `mailto:${s.email || siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
