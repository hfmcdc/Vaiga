const stars: [number, number, number, string][] = [
  [70, 90, 1, "0s"], [335, 70, 1.3, "0.7s"], [360, 200, 0.8, "1.2s"],
  [48, 230, 0.9, "0.4s"], [300, 30, 0.7, "1.6s"], [120, 40, 0.8, "2s"],
];

/** Decorative "gift box with a ? on it" — the Diwali Sweet Box 2026 teaser. */
export default function MysteryBox({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Diwali Sweet Box 2026, revealing soon" className={className}>
      <defs>
        <radialGradient id="mb-glow">
          <stop offset="0" stopColor="#f5d88a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f5d88a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mb-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8e2a0" />
          <stop offset="0.5" stopColor="#e8b64c" />
          <stop offset="1" stopColor="#b9801f" />
        </linearGradient>
        <linearGradient id="mb-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a1b32" />
          <stop offset="1" stopColor="#5a0b16" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="195" fill="url(#mb-glow)" />
      <g className="float-slow">
        <rect x="80" y="192" width="240" height="150" rx="10" fill="url(#mb-box)" stroke="url(#mb-gold)" strokeWidth="3" />
        <rect x="66" y="150" width="268" height="52" rx="10" fill="url(#mb-box)" stroke="url(#mb-gold)" strokeWidth="3" />
        <rect x="184" y="150" width="32" height="192" fill="url(#mb-gold)" />
        <rect x="66" y="169" width="268" height="12" fill="url(#mb-gold)" opacity="0.9" />
        <path d="M200 150 C 140 80, 100 125, 164 154 Z" fill="url(#mb-gold)" />
        <path d="M200 150 C 260 80, 300 125, 236 154 Z" fill="url(#mb-gold)" />
        <circle cx="200" cy="150" r="14" fill="url(#mb-gold)" stroke="#8a5a12" />
        <text x="132" y="296" textAnchor="middle" fontSize="64" fontWeight="700" fill="url(#mb-gold)" fontFamily="Georgia, serif">?</text>
        <g transform="translate(268 262)" fill="url(#mb-gold)">
          <circle r="22" fill="none" stroke="url(#mb-gold)" strokeWidth="2" />
          <path d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4 Z" />
        </g>
        <path d="M100 322 H300" stroke="url(#mb-gold)" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      </g>
      {stars.map(([x, y, k, d], i) => (
        <path key={i} className="twinkle" style={{ animationDelay: d }} fill="#f5d88a"
          transform={`translate(${x} ${y}) scale(${k})`} d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3 Z" />
      ))}
    </svg>
  );
}
