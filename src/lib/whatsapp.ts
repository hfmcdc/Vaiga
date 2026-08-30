import { siteConfig } from "@/data/site";

/**
 * Build a wa.me link with a pre-filled message.
 * Keeping this in one place means the WhatsApp number only ever
 * needs to be updated in `src/data/site.ts`.
 */
export function buildWhatsAppLink(message?: string) {
  const text =
    message ??
    `Hi ${siteConfig.name}! I would like to place an order.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    text
  )}`;
}

export function buildProductWhatsAppLink(productName: string) {
  return buildWhatsAppLink(
    `Hi ${siteConfig.name}! I'd like to order ${productName}.`
  );
}

export function buildTelLink() {
  return `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
}

export function buildMailLink(subject?: string) {
  return `mailto:${siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
