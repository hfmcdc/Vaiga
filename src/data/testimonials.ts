export type Testimonial = {
  quote: string;
  name: string;
  detail?: string;
};

/**
 * Placeholder testimonials — replace with real customer feedback
 * once collected. Do not present these as verified or Google reviews.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Absolutely loved the banana chips. Fresh, crispy and perfectly seasoned!",
    name: "Customer",
  },
  {
    quote:
      "Ordered a festive box for Onam and it disappeared within a day. Everyone asked where it was from.",
    name: "Customer",
  },
  {
    quote:
      "The sharkara varatti tastes just like my grandmother's — that's the highest compliment I can give.",
    name: "Customer",
  },
  {
    quote:
      "Easy to order on WhatsApp and the snacks arrived fresh and well packed.",
    name: "Customer",
  },
];
