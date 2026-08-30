import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order via WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-2 rounded-full bg-green px-4 py-3.5 sm:px-5 text-cream-soft shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-semibold">Order on WhatsApp</span>
    </a>
  );
}
