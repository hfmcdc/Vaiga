import { CalendarHeart } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import MysteryBox from "@/components/ui/MysteryBox";
import { getLiveSite } from "@/lib/siteStore";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/** Festival banner — edit all the text from /admin → Website. */
export default async function FestiveBanner() {
  const site = await getLiveSite();
  const c = site.content;
  if (!c.festiveOn) return null;
  return (
    <section className="diwali-bg gold-frame relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[1fr_320px]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            <CalendarHeart size={14} aria-hidden="true" />
            {c.bannerBadge}
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-gold sm:text-4xl md:text-5xl">{c.bannerTitle}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-soft/85 sm:text-lg">{c.bannerText}</p>
          {c.bannerButton && (
            <a
              href={buildWhatsAppLink(c.bannerMessage, site)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-brown shadow-[0_8px_30px_-6px_rgba(232,182,76,0.6)] transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
            >
              {c.bannerButton}
            </a>
          )}
        </Reveal>
        <MysteryBox className="mx-auto w-full max-w-[260px] md:max-w-none" />
      </div>
    </section>
  );
}
