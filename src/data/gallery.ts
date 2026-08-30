export type GalleryImage = {
  src: string;
  alt: string;
  category: "Sweets" | "Snacks" | "Banana Chips" | "Festive" | "Packaging" | "Orders" | "Brand";
};

/**
 * Centralised gallery list. Add or remove entries here — the gallery
 * page and its lightbox read directly from this array.
 */
export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/gallery-01.svg", alt: "Assorted traditional sweets", category: "Sweets" },
  { src: "/images/gallery/gallery-02.svg", alt: "Freshly fried banana chips", category: "Banana Chips" },
  { src: "/images/gallery/gallery-03.svg", alt: "Crunchy Kerala snacks", category: "Snacks" },
  { src: "/images/gallery/gallery-04.svg", alt: "Festive sweets for Onam", category: "Festive" },
  { src: "/images/gallery/gallery-05.svg", alt: "Snack packaging", category: "Packaging" },
  { src: "/images/gallery/gallery-06.svg", alt: "Order ready for pickup", category: "Orders" },
  { src: "/images/gallery/gallery-07.svg", alt: "Vaiga Sweets & Snacks brand photo", category: "Brand" },
  { src: "/images/gallery/gallery-08.svg", alt: "Sweets tray for celebrations", category: "Sweets" },
  { src: "/images/gallery/gallery-09.svg", alt: "Gift box of snacks", category: "Packaging" },
];
