import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section className="bg-night">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="What we make"
            title="Explore Our Categories"
            description="From everyday tea-time snacks to festive centrepieces — every category is rooted in Kerala tradition."
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delayMs={i * 90}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="group block h-full rounded-3xl bg-night-soft shadow-[0_10px_30px_-14px_rgba(58,35,23,0.25)] overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-2xl" aria-hidden="true">
                    {cat.emoji}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink/70 leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                    Explore
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
