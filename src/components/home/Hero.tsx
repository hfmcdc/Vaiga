import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import MysteryBox from "@/components/ui/MysteryBox";
import { getLiveSite } from "@/lib/siteStore";
import { buildWhatsAppLink, buildTelLink } from "@/lib/whatsapp";

const bokeh = [
  ["8%", "18%", 22, "0s"], ["22%", "70%", 14, "0.8s"], ["48%", "10%", 18, "1.4s"],
  ["62%", "82%", 26, "0.4s"], ["88%", "22%", 16, "2s"], ["92%", "68%", 20, "1.1s"], ["36%", "46%", 10, "2.4s"],
] as const;

export default async function Hero() {
  const site = await getLiveSite();
  const c = site.content;
  return (
    <section className="diwali-bg gold-frame relative overflow-hidden text-cream-soft">
      {bokeh.map(([left, top, size, delay], i) => (
        <span key={i} aria-hidden="true" className="bokeh" style={{ left, top, width: size, height: size, animationDelay: delay }} />
      ))}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-10 items-center">
        <div className="animate-fade-up order-2 lg:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-gold-soft">
            {c.heroEyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]">
            Vaiga Sweets
            <br />
            <span className="text-gold">&amp; Snacks</span>
          </h1>
          <p className="mt-4 font-display italic text-xl sm:text-2xl text-gold-soft">{site.tagline}</p>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-cream-soft/85">{c.heroText}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-brown shadow-[0_8px_30px_-6px_rgba(232,182,76,0.6)] transition-all hover:bg-gold-soft hover:-translate-y-0.5"
            >
              Explore Our Products
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={buildWhatsAppLink(undefined, site)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-6 py-3.5 text-sm font-semibold text-gold-soft transition-all hover:bg-gold hover:text-brown hover:-translate-y-0.5"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Order Now
            </a>
            <a
              href={buildTelLink(site)}
              className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-cream-soft/90 underline-offset-4 hover:underline"
            >
              <Phone size={16} aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative animate-fade-in text-center">
          <MysteryBox className="mx-auto w-full max-w-[320px] sm:max-w-sm lg:max-w-md" />
          <p className="mx-auto -mt-2 inline-block rounded-full bg-gold px-6 py-2 font-display text-sm sm:text-base font-semibold tracking-wide text-brown shadow-[0_8px_30px_-6px_rgba(232,182,76,0.7)]">
            {c.bannerTitle} · {c.bannerBadge}
          </p>
        </div>
      </div>
    </section>
  );
}
