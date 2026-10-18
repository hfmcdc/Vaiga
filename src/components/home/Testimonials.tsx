import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getSiteContent } from "@/lib/siteStore";

export default async function Testimonials() {
  const { testimonials } = await getSiteContent();
  if (testimonials.length === 0) return null;
  return (
    <section className="bg-night-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Kind words"
            title="What Our Customers Say"
            description="Kind words from the people we bake and fry for."
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delayMs={i * 80}>
              <figure className="h-full rounded-3xl bg-night p-6 shadow-[0_10px_30px_-16px_rgba(58,35,23,0.2)] flex flex-col">
                <Quote className="text-gold" size={26} aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-gold">
                  — {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
