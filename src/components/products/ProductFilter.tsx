"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import Reveal from "@/components/ui/Reveal";
import type { Product } from "@/data/products";
import { categories } from "@/data/categories";

export default function ProductFilter({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialCategory = searchParams.get("category") || "all";
  const [active, setActive] = useState(initialCategory);

  const filtered = useMemo(() => {
    if (active === "all") return products;
    return products.filter((p) => p.category === active);
  }, [active, products]);

  function selectCategory(slug: string) {
    setActive(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const tabs = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter products by category"
        className="flex flex-wrap justify-center gap-3"
      >
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            role="tab"
            type="button"
            aria-selected={active === tab.slug}
            onClick={() => selectCategory(tab.slug)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active === tab.slug
                ? "bg-maroon text-cream-soft"
                : "bg-night-soft text-ink/75 hover:bg-maroon/10"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink/60">
          No products in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <Reveal key={product.slug} delayMs={(i % 6) * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
