"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { galleryImages } from "@/data/gallery";

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % galleryImages.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="columns-2 sm:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
        {galleryImages.map((img, i) => (
          <Reveal key={img.src} delayMs={(i % 6) * 50} className="mb-3 sm:mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl"
              aria-label={`View larger image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={900}
                height={900}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 45vw, 30vw"
              />
              <span className="absolute inset-0 bg-brown/0 transition-colors group-hover:bg-brown/10" />
            </button>
          </Reveal>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brown/95 p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-cream-soft/10 p-2.5 text-cream-soft hover:bg-cream-soft/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 rounded-full bg-cream-soft/10 p-2.5 text-cream-soft hover:bg-cream-soft/20"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative max-h-[80vh] max-w-3xl w-full aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 rounded-full bg-cream-soft/10 p-2.5 text-cream-soft hover:bg-cream-soft/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
