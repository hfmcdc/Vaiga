import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductFilter from "@/components/products/ProductFilter";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse traditional Kerala sweets, snacks, banana specials and festive specials from Vaiga Sweets & Snacks.",
};

export default function ProductsPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pt-14 pb-6 text-center">
        <SectionHeading
          eyebrow="Our menu"
          title="All Products"
          description="Every sweet and snack is prepared fresh. Prices are shared directly — reach out on WhatsApp or by phone and we'll help with your order."
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20 sm:pb-28">
        <Suspense fallback={null}>
          <ProductFilter />
        </Suspense>
      </section>
    </div>
  );
}
