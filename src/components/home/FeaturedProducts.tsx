import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/productStore";

export default async function FeaturedProducts() {
  const featured = await getFeaturedProducts();

  return (
    <section className="bg-night-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Customer favourites"
            title="Featured Products"
            description="A few of the sweets and snacks our customers keep coming back for."
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delayMs={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-brown"
          >
            View All Products
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
