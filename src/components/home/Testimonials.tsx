import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-cream-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Kind words"
            title="What Our Customers Say"
            description="Placeholder testimonials shown for illustration — ready to be swapped for real customer feedback."
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delayMs={i * 80}>
              <figure className="h-full rounded-3xl bg-cream p-6 shadow-[0_10px_30px_-16px_rgba(58,35,23,0.2)] flex flex-col">
                <Quote className="text-gold" size={26} aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brown/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-maroon">
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
