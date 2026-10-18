import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink, buildTelLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full pookalam-accent opacity-40" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up order-2 lg:order-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-maroon/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-maroon">
            🪔 Happy Diwali 2026
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] text-brown">
            Vaiga Sweets
            <br />
            <span className="text-maroon">&amp; Snacks</span>
          </h1>
          <p className="mt-4 font-display italic text-xl sm:text-2xl text-gold">
            {siteConfig.tagline}
          </p>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-brown/75">
            Light up this Diwali with fresh, traditional sweets and snacks —
            made with love in Kollam since {siteConfig.since}. Diwali Sweet Box 2026 is revealing soon!
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-cream-soft transition-all hover:bg-maroon-dark hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(107,30,46,0.55)]"
            >
              Explore Our Products
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-brown transition-all hover:bg-gold-soft hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(201,154,61,0.5)]"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Order Now
            </a>
            <a
              href={buildTelLink()}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brown px-6 py-3.5 text-sm font-semibold text-brown transition-all hover:bg-brown hover:text-cream-soft"
            >
              <Phone size={16} aria-hidden="true" />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative animate-fade-in">
          <div
            className="relative mx-auto aspect-[4/3.5] w-full max-w-md lg:max-w-none overflow-hidden bg-gold shadow-[0_30px_60px_-20px_rgba(58,35,23,0.4)]"
            style={{
              borderRadius: "62% 38% 55% 45% / 48% 45% 55% 52%",
            }}
          >
            <Image src="/images/logo.png" alt="Vaiga Sweets & Snacks logo" fill priority className="object-contain p-6" sizes="(max-width: 1024px) 90vw, 45vw" />
          </div>
          <div className="absolute -bottom-4 -left-4 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gold/90 pookalam-accent opacity-70" />
        </div>
      </div>
    </section>
  );
}
