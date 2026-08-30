import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { buildProductWhatsAppLink } from "@/lib/whatsapp";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-soft shadow-[0_10px_30px_-14px_rgba(58,35,23,0.25)] transition-transform duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 22vw"
        />
        {!product.available && (
          <span className="absolute top-3 left-3 rounded-full bg-brown/85 px-3 py-1 text-xs font-semibold text-cream-soft">
            Currently unavailable
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-brown">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-brown/70 flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-maroon">
            {product.price}
          </span>
          <a
            href={buildProductWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-cream-soft transition-colors hover:bg-maroon-dark"
          >
            <MessageCircle size={14} aria-hidden="true" />
            Order Now
          </a>
        </div>
      </div>
    </article>
  );
}
