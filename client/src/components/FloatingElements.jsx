import { useLocation } from "react-router-dom";

const AMBER  = "#FBB316";
const FOREST = "#2C4A3B";

/* ── SVG icon shapes (48×48 viewBox, stroke-based blueprint style) ── */
const Icon = {
  compass: (
    <>
      <circle cx="24" cy="24" r="21" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="3.5" strokeWidth="0.6" />
      <line x1="24" y1="3" x2="24" y2="45" strokeWidth="0.4" />
      <line x1="3" y1="24" x2="45" y2="24" strokeWidth="0.4" />
      <polygon points="24,5 21.5,21.5 24,19 26.5,21.5" fill="currentColor" opacity="0.7" />
      <polygon points="24,43 21.5,26.5 24,29 26.5,26.5" fill="currentColor" opacity="0.35" />
    </>
  ),
  arch: (
    <path d="M6 44 L6 22 Q6 4 24 4 Q42 4 42 22 L42 44 M12 44 L12 24 Q12 12 24 12 Q36 12 36 24 L36 44" strokeWidth="0.8" />
  ),
  floorplan: (
    <>
      <rect x="3" y="3" width="42" height="30" strokeWidth="0.8" />
      <line x1="24" y1="3" x2="24" y2="33" strokeWidth="0.4" strokeDasharray="2 2" />
      <line x1="3" y1="19" x2="45" y2="19" strokeWidth="0.4" strokeDasharray="2 2" />
      <rect x="6" y="6" width="15" height="10" strokeWidth="0.5" />
      <rect x="27" y="6" width="15" height="10" strokeWidth="0.5" />
    </>
  ),
  column: (
    <>
      <rect x="14" y="2" width="20" height="5" strokeWidth="0.8" />
      <rect x="18" y="7" width="12" height="34" strokeWidth="0.8" />
      <rect x="12" y="41" width="24" height="5" strokeWidth="0.8" />
      <line x1="18" y1="14" x2="30" y2="14" strokeWidth="0.3" />
      <line x1="18" y1="21" x2="30" y2="21" strokeWidth="0.3" />
      <line x1="18" y1="28" x2="30" y2="28" strokeWidth="0.3" />
      <line x1="18" y1="35" x2="30" y2="35" strokeWidth="0.3" />
    </>
  ),
  setsquare: (
    <>
      <polygon points="3,45 45,45 3,3" strokeWidth="0.8" />
      <line x1="3" y1="37" x2="11" y2="37" strokeWidth="0.4" />
      <line x1="3" y1="29" x2="11" y2="29" strokeWidth="0.4" />
      <line x1="3" y1="21" x2="11" y2="21" strokeWidth="0.4" />
      <line x1="3" y1="13" x2="11" y2="13" strokeWidth="0.4" />
      <path d="M3 37 L11 37 L11 45" strokeWidth="0.5" fill="none" />
    </>
  ),
  circleplan: (
    <>
      <circle cx="24" cy="24" r="21" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="14" strokeWidth="0.5" />
      <circle cx="24" cy="24" r="7" strokeWidth="0.5" />
      <line x1="3" y1="24" x2="45" y2="24" strokeWidth="0.3" />
      <line x1="24" y1="3" x2="24" y2="45" strokeWidth="0.3" />
      <line x1="9" y1="9" x2="39" y2="39" strokeWidth="0.25" strokeDasharray="1.5 2" />
      <line x1="39" y1="9" x2="9" y2="39" strokeWidth="0.25" strokeDasharray="1.5 2" />
    </>
  ),
  facade: (
    <>
      <rect x="3" y="5" width="42" height="38" strokeWidth="0.8" />
      <rect x="7" y="10" width="12" height="14" strokeWidth="0.6" />
      <rect x="29" y="10" width="12" height="14" strokeWidth="0.6" />
      <rect x="15" y="28" width="18" height="15" strokeWidth="0.6" />
      <line x1="24" y1="28" x2="24" y2="43" strokeWidth="0.3" />
      <line x1="3" y1="5" x2="24" y2="0" strokeWidth="0.4" />
      <line x1="45" y1="5" x2="24" y2="0" strokeWidth="0.4" />
    </>
  ),
  staircase: (
    <path d="M4 44 L4 36 L12 36 L12 28 L20 28 L20 20 L28 20 L28 12 L36 12 L36 4 L44 4 M4 44 L44 44 L44 4" strokeWidth="0.8" />
  ),
  chair: (
    <>
      <path d="M10 22 Q10 10 24 10 Q38 10 38 22" strokeWidth="0.8" fill="none" />
      <rect x="10" y="22" width="28" height="16" rx="2" strokeWidth="0.8" />
      <line x1="12" y1="38" x2="10" y2="46" strokeWidth="0.8" />
      <line x1="36" y1="38" x2="38" y2="46" strokeWidth="0.8" />
      <line x1="10" y1="30" x2="38" y2="30" strokeWidth="0.4" />
    </>
  ),
  leaf: (
    <>
      <path d="M24 46 C24 46 2 32 6 14 C10 0 38 0 42 14 C46 32 24 46 24 46 Z" strokeWidth="0.8" />
      <line x1="24" y1="46" x2="24" y2="10" strokeWidth="0.5" />
      <path d="M24 38 Q14 30 12 20" strokeWidth="0.4" strokeDasharray="1.5 2" />
      <path d="M24 38 Q34 30 36 20" strokeWidth="0.4" strokeDasharray="1.5 2" />
      <path d="M24 28 Q16 22 16 14" strokeWidth="0.4" strokeDasharray="1.5 2" />
      <path d="M24 28 Q32 22 32 14" strokeWidth="0.4" strokeDasharray="1.5 2" />
    </>
  ),
  ruler: (
    <>
      <rect x="3" y="18" width="42" height="12" strokeWidth="0.8" />
      {[9, 13, 17, 21, 25, 29, 33, 37, 41].map(x => (
        <line key={x} x1={x} y1="18" x2={x} y2={x % 8 === 1 ? "13" : "15"} strokeWidth="0.5" />
      ))}
    </>
  ),
  doorswing: (
    <>
      <rect x="8" y="4" width="20" height="40" strokeWidth="0.8" />
      <path d="M8 4 Q28 4 28 24" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
      <line x1="28" y1="4" x2="8" y2="24" strokeWidth="0.3" strokeDasharray="1.5 2" />
    </>
  ),
  spiral: (
    <path
      d="M24 24 Q24 18 30 18 Q36 18 36 24 Q36 32 26 32 Q14 32 14 20 Q14 8 28 8 Q42 8 42 24"
      strokeWidth="0.8" fill="none"
    />
  ),
  grid: (
    <>
      {[8, 16, 24, 32, 40].map(x => <line key={`v${x}`} x1={x} y1="4" x2={x} y2="44" strokeWidth="0.35" />)}
      {[8, 16, 24, 32, 40].map(y => <line key={`h${y}`} x1="4" y1={y} x2="44" y2={y} strokeWidth="0.35" />)}
      <rect x="4" y="4" width="40" height="40" strokeWidth="0.6" />
    </>
  ),
  lightbulb: (
    <>
      <circle cx="24" cy="18" r="12" strokeWidth="0.8" />
      <line x1="24" y1="6" x2="24" y2="2" strokeWidth="0.7" />
      <line x1="36" y1="10" x2="39" y2="7" strokeWidth="0.7" />
      <line x1="12" y1="10" x2="9" y2="7" strokeWidth="0.7" />
      <path d="M17 26 Q17 32 24 32 Q31 32 31 26" strokeWidth="0.7" fill="none" />
      <rect x="19" y="32" width="10" height="4" rx="1" strokeWidth="0.6" />
      <rect x="19" y="36" width="10" height="4" rx="1" strokeWidth="0.6" />
      <line x1="19" y1="40" x2="21" y2="44" strokeWidth="0.6" />
      <line x1="29" y1="40" x2="27" y2="44" strokeWidth="0.6" />
    </>
  ),
};

/* ── Element definitions: position (%), size, color, opacity, animation ── */
const ELEMENTS = [
  { icon: "compass",    x:  6, y: 12, size: 72, color: AMBER,  opacity: 0.14, anim: "spin",    dur: 42, delay:  0 },
  { icon: "arch",       x: 87, y: 20, size: 58, color: FOREST, opacity: 0.13, anim: "float",   dur: 18, delay:  3 },
  { icon: "floorplan",  x: 14, y: 52, size: 62, color: AMBER,  opacity: 0.11, anim: "drift",   dur: 24, delay:  7 },
  { icon: "column",     x: 74, y: 68, size: 50, color: FOREST, opacity: 0.13, anim: "float",   dur: 20, delay:  1 },
  { icon: "setsquare",  x: 44, y:  8, size: 54, color: AMBER,  opacity: 0.10, anim: "spinRev", dur: 36, delay:  9 },
  { icon: "circleplan", x: 91, y: 48, size: 80, color: AMBER,  opacity: 0.12, anim: "spin",    dur: 32, delay:  4 },
  { icon: "ruler",      x: 28, y: 80, size: 66, color: FOREST, opacity: 0.10, anim: "drift",   dur: 26, delay: 13 },
  { icon: "facade",     x: 58, y: 33, size: 60, color: FOREST, opacity: 0.11, anim: "float",   dur: 16, delay:  2 },
  { icon: "leaf",       x:  4, y: 83, size: 48, color: FOREST, opacity: 0.14, anim: "float",   dur: 14, delay:  8 },
  { icon: "doorswing",  x: 50, y: 58, size: 52, color: AMBER,  opacity: 0.10, anim: "drift",   dur: 29, delay:  5 },
  { icon: "staircase",  x: 77, y: 10, size: 56, color: AMBER,  opacity: 0.11, anim: "drift",   dur: 22, delay: 10 },
  { icon: "spiral",     x: 21, y: 32, size: 64, color: FOREST, opacity: 0.10, anim: "spinRev", dur: 48, delay: 12 },
  { icon: "grid",       x: 67, y: 83, size: 68, color: AMBER,  opacity: 0.09, anim: "drift",   dur: 32, delay:  3 },
  { icon: "chair",      x: 37, y: 22, size: 50, color: FOREST, opacity: 0.12, anim: "float",   dur: 19, delay: 15 },
  { icon: "lightbulb",  x: 83, y: 58, size: 54, color: AMBER,  opacity: 0.11, anim: "float",   dur: 22, delay:  6 },
  { icon: "compass",    x: 52, y: 87, size: 46, color: FOREST, opacity: 0.10, anim: "spinRev", dur: 55, delay: 11 },
  { icon: "arch",       x: 11, y:  8, size: 50, color: AMBER,  opacity: 0.11, anim: "float",   dur: 23, delay: 17 },
  { icon: "floorplan",  x: 32, y: 66, size: 54, color: AMBER,  opacity: 0.10, anim: "drift",   dur: 28, delay:  8 },
  { icon: "setsquare",  x: 95, y: 78, size: 44, color: FOREST, opacity: 0.11, anim: "spin",    dur: 34, delay: 14 },
  { icon: "circleplan", x: 20, y: 58, size: 62, color: AMBER,  opacity: 0.10, anim: "spin",    dur: 40, delay:  6 },
];

const ANIM_MAP = {
  float:   "fe-float",
  drift:   "fe-drift",
  spin:    "fe-spin",
  spinRev: "fe-spin-rev",
};

export default function FloatingElements() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fe-float {
            0%,100% { transform: translateY(0px) rotate(0deg); }
            50%      { transform: translateY(-28px) rotate(5deg); }
          }
          @keyframes fe-drift {
            0%,100% { transform: translate(0px, 0px); }
            25%     { transform: translate(22px, -18px); }
            75%     { transform: translate(-14px, -24px); }
          }
          @keyframes fe-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes fe-spin-rev {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
        }
      `}</style>

      <div aria-hidden style={{
        position: "fixed", inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}>
        {ELEMENTS.map((el, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${el.x}%`,
              top:  `${el.y}%`,
              color: el.color,
              opacity: el.opacity,
              animation: `${ANIM_MAP[el.anim]} ${el.dur}s ease-in-out ${el.delay}s infinite`,
              willChange: "transform",
            }}
          >
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 48 48"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {Icon[el.icon]}
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
