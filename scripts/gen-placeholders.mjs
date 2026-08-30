// One-off script used to generate placeholder artwork for /public/images.
// Run with: node scripts/gen-placeholders.mjs
// These are stand-ins only — replace with real photography before launch.
import fs from "node:fs";
import path from "node:path";

const PALETTE = {
  maroon: "#6B1E2E",
  maroonDark: "#4A1220",
  cream: "#FAF3E6",
  gold: "#C99A3D",
  goldSoft: "#E3C27C",
  brown: "#3A2317",
  green: "#4F6B3A",
};

function seededRand(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
}

// A ring of small dots/petals — echoes a pookalam (flower rangoli) without being literal.
function pookalamMotif(cx, cy, r, rand, colorA, colorB) {
  const petals = 10 + Math.floor(rand() * 4);
  let out = "";
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    const rr = r * (0.75 + rand() * 0.25);
    const x = cx + Math.cos(angle) * rr;
    const y = cy + Math.sin(angle) * rr;
    const size = r * 0.16 * (0.7 + rand() * 0.6);
    const color = i % 2 === 0 ? colorA : colorB;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size.toFixed(
      1
    )}" fill="${color}" opacity="0.85"/>`;
  }
  out += `<circle cx="${cx}" cy="${cy}" r="${(r * 0.22).toFixed(
    1
  )}" fill="${colorB}" opacity="0.9"/>`;
  return out;
}

function leafVein(x, y, w, h, rand, color) {
  const midY = y + h / 2;
  let path = `M ${x} ${midY} `;
  const segs = 5;
  for (let i = 1; i <= segs; i++) {
    const px = x + (w / segs) * i;
    const py = midY + Math.sin(i * 1.3 + rand() * 2) * (h * 0.12);
    path += `Q ${x + (w / segs) * (i - 0.5)} ${midY + (rand() - 0.5) * h * 0.3}, ${px} ${py} `;
  }
  return `<path d="${path}" stroke="${color}" stroke-width="2" fill="none" opacity="0.35"/>`;
}

function buildSvg({ label, w, h, seed, tone = "maroon" }) {
  const rand = seededRand(hashStr(seed));
  const tones = {
    maroon: [PALETTE.maroon, PALETTE.maroonDark, PALETTE.gold],
    gold: [PALETTE.gold, PALETTE.goldSoft, PALETTE.maroon],
    green: [PALETTE.green, PALETTE.maroonDark, PALETTE.gold],
    cream: [PALETTE.cream, PALETTE.goldSoft, PALETTE.maroon],
  };
  const [base, base2, accent] = tones[tone] || tones.maroon;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.22;

  let veins = "";
  for (let i = 0; i < 3; i++) {
    veins += leafVein(
      w * 0.05,
      h * (0.15 + i * 0.3),
      w * 0.9,
      h * 0.2,
      rand,
      tone === "cream" ? PALETTE.maroon : PALETTE.cream
    );
  }

  const textColor = tone === "cream" ? PALETTE.maroon : PALETTE.cream;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g-${seed.replace(/[^a-zA-Z0-9]/g, "")}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${base}"/>
      <stop offset="100%" stop-color="${base2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g-${seed.replace(/[^a-zA-Z0-9]/g, "")})"/>
  ${veins}
  ${pookalamMotif(cx, cy, r, rand, accent, textColor)}
  <text x="${cx}" y="${h - h * 0.08}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(
    14,
    w * 0.032
  )}" fill="${textColor}" opacity="0.9" letter-spacing="1">${label}</text>
</svg>`;
}

const outDir = (p) => path.join(process.cwd(), "public", "images", p);

const items = [
  // Hero
  { file: "hero/hero-main.svg", label: "Vaiga Sweets & Snacks", w: 1600, h: 1400, tone: "maroon" },
  // Categories
  { file: "categories/sweets.svg", label: "Sweets", w: 800, h: 600, tone: "maroon" },
  { file: "categories/kerala-snacks.svg", label: "Kerala Snacks", w: 800, h: 600, tone: "gold" },
  { file: "categories/banana-specials.svg", label: "Banana Specials", w: 800, h: 600, tone: "green" },
  { file: "categories/festive-specials.svg", label: "Festive Specials", w: 800, h: 600, tone: "cream" },
  // Products
  { file: "products/banana-chips.svg", label: "Banana Chips", w: 800, h: 800, tone: "gold" },
  { file: "products/sharkara-varatti.svg", label: "Sharkara Varatti", w: 800, h: 800, tone: "maroon" },
  { file: "products/banana-halwa.svg", label: "Banana Halwa", w: 800, h: 800, tone: "maroon" },
  { file: "products/mixture.svg", label: "Mixture", w: 800, h: 800, tone: "gold" },
  { file: "products/aval-mixture.svg", label: "Aval Mixture", w: 800, h: 800, tone: "green" },
  { file: "products/unniyappam.svg", label: "Unniyappam", w: 800, h: 800, tone: "maroon" },
  { file: "products/achappam.svg", label: "Achappam", w: 800, h: 800, tone: "gold" },
  { file: "products/murukku.svg", label: "Murukku", w: 800, h: 800, tone: "green" },
  { file: "products/neyyappam.svg", label: "Neyyappam", w: 800, h: 800, tone: "maroon" },
  { file: "products/traditional-sweets.svg", label: "Traditional Kerala Sweets", w: 800, h: 800, tone: "cream" },
  // Gallery
  { file: "gallery/gallery-01.svg", label: "Sweets", w: 900, h: 1100, tone: "maroon" },
  { file: "gallery/gallery-02.svg", label: "Banana Chips", w: 900, h: 700, tone: "gold" },
  { file: "gallery/gallery-03.svg", label: "Snacks", w: 900, h: 900, tone: "green" },
  { file: "gallery/gallery-04.svg", label: "Festive Products", w: 900, h: 1200, tone: "cream" },
  { file: "gallery/gallery-05.svg", label: "Packaging", w: 900, h: 700, tone: "maroon" },
  { file: "gallery/gallery-06.svg", label: "Orders Ready", w: 900, h: 900, tone: "gold" },
  { file: "gallery/gallery-07.svg", label: "Brand", w: 900, h: 1000, tone: "green" },
  { file: "gallery/gallery-08.svg", label: "Sweets Tray", w: 900, h: 700, tone: "maroon" },
  { file: "gallery/gallery-09.svg", label: "Snack Box", w: 900, h: 900, tone: "cream" },
  // About
  { file: "about/about-story.svg", label: "Our Story · Since 2020", w: 1200, h: 1400, tone: "maroon" },
];

for (const item of items) {
  const svg = buildSvg({ label: item.label, w: item.w, h: item.h, seed: item.file, tone: item.tone });
  const full = outDir(item.file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, svg, "utf8");
  console.log("wrote", item.file);
}
