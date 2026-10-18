type LeafDividerProps = {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
};

/**
 * A scalloped edge inspired by the folded rim of a banana leaf used for
 * a traditional Kerala sadya — the site's one recurring signature motif,
 * used in place of plain straight section boundaries.
 */
export default function LeafDivider({
  toColor = "var(--color-night)",
  flip = false,
  className = "",
}: LeafDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-[36px] sm:h-[52px]"
      >
        <path
          d="M0,30 
             C 30,0 60,0 90,30 
             C 120,60 150,60 180,30
             C 210,0 240,0 270,30
             C 300,60 330,60 360,30
             C 390,0 420,0 450,30
             C 480,60 510,60 540,30
             C 570,0 600,0 630,30
             C 660,60 690,60 720,30
             C 750,0 780,0 810,30
             C 840,60 870,60 900,30
             C 930,0 960,0 990,30
             C 1020,60 1050,60 1080,30
             C 1110,0 1140,0 1200,30
             L1200,60 L0,60 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
