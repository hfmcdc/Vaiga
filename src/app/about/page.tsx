import type { Metadata } from "next";
import { HeartHandshake, Leaf, Sparkles, PartyPopper } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { siteConfig as staticSite } from "@/data/site";
import { getLiveSite } from "@/lib/siteStore";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Us",
  description: `The story of ${staticSite.name}, a Kerala sweets and snacks brand serving customers with tradition and care since ${staticSite.since}.`,
};

const pillars = [
  { icon: HeartHandshake, label: "Tradition" },
  { icon: Sparkles, label: "Taste" },
  { icon: Leaf, label: "Quality" },
  { icon: PartyPopper, label: "Festive celebrations" },
];

export default async function AboutPage() {
  const siteConfig = await getLiveSite();
  return (
    <div className="bg-night">
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 pb-16 sm:pb-24">
        <div className="max-w-3xl">
        <Reveal>
          <p className="font-display italic text-lg text-gold mb-2">Our story</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-ink">
            Since {siteConfig.since}
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink/75">
            {siteConfig.name} began its journey in {siteConfig.since}, with a
            simple passion: traditional sweets and snacks made the way they
            are meant to be — fresh, honest, and full of flavour.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
            What started as a small effort to share Kerala&apos;s traditional
            recipes has grown into a name customers trust for their everyday
            snacking and their biggest celebrations. Every product we make
            is guided by the same values we started with — tradition, taste,
            quality, and genuine care for the people we serve.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
            From Onam sadya spreads to Vishu and Janmashtami favourites, we
            take pride in being part of our customers&apos; festive tables and
            everyday moments alike.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl bg-night-soft px-4 py-3.5 shadow-[0_8px_20px_-14px_rgba(58,35,23,0.3)]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-maroon/10 text-gold shrink-0">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-ink">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        </div>

      </section>

      <section className="bg-night-soft">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20 text-center">
          <Reveal>
            <SectionHeading
              title="Taste the difference tradition makes"
              description="Ready to order, or have a question about a festive box? We're one message away."
            />
            <a
              href={buildWhatsAppLink(undefined, siteConfig)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-cream-soft transition-all hover:bg-maroon-dark hover:-translate-y-0.5"
            >
              Chat with Us on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
