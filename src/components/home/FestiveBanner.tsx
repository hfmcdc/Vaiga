import Image from "next/image";
import { CalendarHeart } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Diwali 2026 banner. Swap the copy here for the next festival.
 */
export default function FestiveBanner() {
  return (
    <section className="relative overflow-hidden bg-maroon">
      <div className="absolute inset-0">
        <Image
          src="/images/categories/festive-specials.svg"
          alt=""
          fill
          className="object-cover opacity-25"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full pookalam-accent opacity-20" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-24 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-cream-soft/15 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-gold-soft">
            <CalendarHeart size={14} aria-hidden="true" />
            🪔 Revealing Soon
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream-soft leading-tight">
            Diwali Sweet Box 2026
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-cream-soft/85 leading-relaxed">
            A beautifully packed box of our finest Diwali sweets and snacks —
            perfect for gifting family and friends. We're putting the final
            touches on it. Message us to be the first to know!
          </p>
          <a
            href={buildWhatsAppLink(
              "Hi Vaiga Sweets & Snacks! Please notify me when the Diwali Sweet Box 2026 is revealed."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-brown transition-all hover:bg-gold-soft hover:-translate-y-0.5"
          >
            Notify Me on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
