import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FestiveBanner from "@/components/home/FestiveBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import LeafDivider from "@/components/ui/LeafDivider";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LeafDivider toColor="var(--color-cream-soft)" />
      <BrandIntro />
      <LeafDivider toColor="var(--color-cream)" flip />
      <Categories />
      <FeaturedProducts />
      <LeafDivider toColor="var(--color-maroon)" flip />
      <FestiveBanner />
      <LeafDivider toColor="var(--color-cream)" />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
    </>
  );
}
