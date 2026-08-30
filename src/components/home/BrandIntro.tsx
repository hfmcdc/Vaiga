import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

export default function BrandIntro() {
  return (
    <section className="bg-cream-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="font-display italic text-lg text-gold mb-2">Our story</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-brown">
            A Taste of Tradition Since {siteConfig.since}
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-brown/75">
            {siteConfig.name} was started in {siteConfig.since} with a simple
            focus: traditional taste, honest ingredients and sweets and
            snacks made fresh, the way they would be in a Kerala home
            kitchen. Every batch is prepared with care, so it reaches you
            tasting the way it should.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-brown/75">
            From festive favourites to everyday snacking, we hold on to
            recipes and methods that have been trusted for generations.
          </p>
          <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3">
            <span className="font-display text-2xl font-semibold text-maroon">
              {siteConfig.since}
            </span>
            <span className="text-sm text-brown/70 leading-tight">
              The year Vaiga
              <br />
              Sweets &amp; Snacks began
            </span>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-[2rem] shadow-[0_24px_50px_-16px_rgba(58,35,23,0.35)]">
              <Image
                src="/images/about/about-story.svg"
                alt="Traditional Kerala sweets and snacks prepared by Vaiga"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
            <div className="absolute -top-5 -right-5 h-16 w-16 rounded-full bg-maroon/90 pookalam-accent opacity-60 hidden sm:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
