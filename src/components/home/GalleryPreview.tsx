import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { galleryImages } from "@/data/gallery";

export default function GalleryPreview() {
  const preview = galleryImages.slice(0, 6);

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow="A closer look" title="From Our Kitchen" />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {preview.map((img, i) => (
            <Reveal key={img.src} delayMs={i * 60}>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 45vw, 16vw"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border-2 border-maroon px-6 py-3 text-sm font-semibold text-maroon transition-all hover:bg-maroon hover:text-cream-soft"
          >
            View Full Gallery
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
