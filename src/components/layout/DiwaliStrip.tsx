import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function DiwaliStrip() {
  return (
    <div className="bg-brown px-4 py-2 text-center text-xs sm:text-sm font-medium text-gold-soft">
      🪔 Happy Diwali! <strong className="text-gold">Diwali Sweet Box 2026</strong> — revealing soon.{" "}
      <Link
        href={buildWhatsAppLink("Hi Vaiga Sweets & Snacks! Please notify me when the Diwali Sweet Box 2026 is revealed.")}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-cream-soft"
      >
        Get notified
      </Link>
    </div>
  );
}
