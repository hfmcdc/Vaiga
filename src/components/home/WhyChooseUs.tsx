import { HeartHandshake, Leaf, Home as HomeIcon, Flame, PartyPopper, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

const features = [
  {
    icon: HeartHandshake,
    title: "Made with Care",
    description: "Prepared with attention to taste and quality in every batch.",
  },
  {
    icon: Leaf,
    title: "Quality Ingredients",
    description: "Carefully selected ingredients, chosen the way home cooks would.",
  },
  {
    icon: HomeIcon,
    title: "Traditional Taste",
    description: "Authentic recipes inspired by Kerala traditions.",
  },
  {
    icon: Flame,
    title: "Freshly Prepared",
    description: "Freshness and flavour you can taste in every bite.",
  },
  {
    icon: PartyPopper,
    title: "Perfect for Celebrations",
    description: "Ideal for festivals, functions and thoughtful gifting.",
  },
  {
    icon: Star,
    title: `Since ${siteConfig.since}`,
    description: "Serving customers with love and consistency, year after year.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-night">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow="Why Vaiga" title="Why Choose Vaiga?" />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delayMs={i * 70}>
              <div className="h-full rounded-3xl bg-night-soft p-7 shadow-[0_10px_30px_-16px_rgba(58,35,23,0.2)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-maroon/10 text-gold">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
