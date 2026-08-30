import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look at Vaiga Sweets & Snacks — sweets, banana chips, snacks, festive products and packaging.",
};

export default function GalleryPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pt-14 pb-6 text-center">
        <SectionHeading
          eyebrow="A closer look"
          title="Gallery"
          description="Sweets, snacks, festive specials and everything in between. Tap any photo for a closer look."
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20 sm:pb-28">
        <GalleryGrid />
      </section>
    </div>
  );
}
