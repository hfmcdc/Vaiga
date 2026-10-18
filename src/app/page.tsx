import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FestiveBanner from "@/components/home/FestiveBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import { getSiteContent } from "@/lib/siteStore";
import LeafDivider from "@/components/ui/LeafDivider";

export const metadata: Metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { festiveOn } = await getSiteContent();
  return (
    <>
      <Hero />
      <LeafDivider toColor="var(--color-night-soft)" />
      <BrandIntro />
      <LeafDivider toColor="var(--color-night)" flip />
      <Categories />
      <FeaturedProducts />
      {festiveOn && (
        <>
          <LeafDivider toColor="var(--color-maroon-dark)" flip />
          <FestiveBanner />
          <LeafDivider toColor="var(--color-night)" />
        </>
      )}
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
