/**
 * Colorful animated decorative elements — placed inside specific page sections.
 * Each export is a self-contained SVG with CSS keyframe animations.
 * All animations respect prefers-reduced-motion.
 */

import { useRef } from "react";
import { useInView } from "framer-motion";

/* ── shared colour palette ─────────────────────────── */
const AMBER    = "#FBB316";
const CORAL    = "#E05A2B";
const BLUE     = "#4A9CD4";
const FOREST   = "#2C4A3B";
const JADE     = "#2D8C5A";
const TERRA    = "#C4703D";
const LAVENDER = "#7B68B0";
const SAGE     = "#7DA08C";

/* ══════════════════════════════════════════════════
   1. SPINNING COMPASS — colorful 8-point wind rose
   Use in: planning / design sections
══════════════════════════════════════════════════ */
export function SpinningCompass({ size = 140, style }) {
  return (
    <div aria-hidden style={{ pointerEvents: "none", ...style }}>
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <style>{`
          @keyframes sc-cw   { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
          @keyframes sc-ccw  { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
          @keyframes sc-mid  { from{transform:rotate(0deg)}  to{transform:rotate(180deg)}  }
          @keyframes sc-pulse{ 0%,100%{opacity:.85}          50%{opacity:1}                }
          @media(prefers-reduced-motion:reduce){
            .sc-outer,.sc-inner,.sc-mid,.sc-center{animation:none!important}
          }
          .sc-outer  { animation: sc-cw   26s linear    infinite; transform-origin:70px 70px }
          .sc-mid    { animation: sc-mid  14s linear    infinite; transform-origin:70px 70px }
          .sc-inner  { animation: sc-ccw  10s linear    infinite; transform-origin:70px 70px }
          .sc-center { animation: sc-pulse 3s ease-in-out infinite }
        `}</style>

        {/* Outer ring + tick marks */}
        <g className="sc-outer">
          <circle cx="70" cy="70" r="65" stroke={AMBER} strokeWidth="1.5" opacity="0.9" />
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i * 15) * Math.PI / 180;
            const isMaj = i % 6 === 0, isMed = i % 3 === 0;
            const len   = isMaj ? 14 : isMed ? 8 : 4;
            const col   = isMaj ? AMBER : isMed ? TERRA : SAGE;
            return (
              <line key={i}
                x1={70 + 65 * Math.sin(a)} y1={70 - 65 * Math.cos(a)}
                x2={70 + (65 - len) * Math.sin(a)} y2={70 - (65 - len) * Math.cos(a)}
                stroke={col} strokeWidth={isMaj ? 2 : 1}
              />
            );
          })}
        </g>

        {/* Middle dashed ring */}
        <g className="sc-mid">
          <circle cx="70" cy="70" r="46" stroke={BLUE} strokeWidth="1.2"
            strokeDasharray="5 3" opacity="0.75" />
        </g>

        {/* 8-point rose that counter-spins */}
        <g className="sc-inner">
          {/* N-S major points */}
          <polygon points="70,26 73.5,67 70,70 66.5,67" fill={AMBER} />
          <polygon points="70,114 73.5,73 70,70 66.5,73" fill={AMBER} opacity="0.4" />
          {/* E-W major points */}
          <polygon points="26,70 67,66.5 70,70 67,73.5" fill={BLUE} />
          <polygon points="114,70 73,66.5 70,70 73,73.5" fill={BLUE} opacity="0.4" />
          {/* NE-SW diagonal */}
          <polygon points="41.5,41.5 68.5,68.5 70,70 64.5,72" fill={CORAL} opacity="0.85" />
          <polygon points="98.5,98.5 71.5,71.5 70,70 75.5,68" fill={CORAL} opacity="0.35" />
          {/* NW-SE diagonal */}
          <polygon points="98.5,41.5 71.5,68.5 70,70 68,75.5" fill={JADE} opacity="0.85" />
          <polygon points="41.5,98.5 68.5,71.5 70,70 72,64.5" fill={JADE} opacity="0.35" />
          {/* Center jewel */}
          <circle className="sc-center" cx="70" cy="70" r="7" fill={AMBER} />
          <circle cx="70" cy="70" r="3.5" fill="#181815" />
        </g>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   2. CONSTRUCTION CRANE — animated yellow tower crane
   Use in: architecture / construction sections
══════════════════════════════════════════════════ */
export function ConstructionCrane({ style }) {
  return (
    <div aria-hidden style={{ pointerEvents: "none", ...style }}>
      <svg width="160" height="210" viewBox="0 0 160 210" fill="none">
        <style>{`
          @keyframes crane-boom  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(4deg)}  }
          @keyframes crane-hook  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
          @keyframes crane-wheel { from{transform:rotate(0deg)}     to{transform:rotate(-360deg)} }
          @keyframes crane-cable { 0%,100%{stroke-dashoffset:0}  50%{stroke-dashoffset:6} }
          @media(prefers-reduced-motion:reduce){
            .crane-boom,.crane-hook,.crane-wheel,.crane-cable{animation:none!important}
          }
          .crane-boom  { animation: crane-boom  7s ease-in-out infinite; transform-origin:80px 58px }
          .crane-hook  { animation: crane-hook  3.8s ease-in-out infinite }
          .crane-wheel { animation: crane-wheel 4.2s linear     infinite; transform-origin:120px 62px }
          .crane-cable { stroke-dasharray:8 4; animation: crane-cable 2s linear infinite }
        `}</style>

        {/* Mast / vertical tower */}
        <rect x="73" y="58" width="14" height="148" fill={AMBER} opacity="0.92" rx="1" />
        {/* Mast lattice braces */}
        {[80, 108, 136, 164].map(y => (
          <g key={y}>
            <line x1="73" y1={y} x2="87" y2={y + 22} stroke="#E8A012" strokeWidth="1.5" />
            <line x1="87" y1={y} x2="73" y2={y + 22} stroke="#E8A012" strokeWidth="1.5" />
          </g>
        ))}

        {/* Outrigger base */}
        <rect x="52" y="202" width="56" height="8" rx="3" fill={TERRA} opacity="0.9" />
        <rect x="44" y="206" width="72" height="4" rx="2" fill={TERRA} opacity="0.6" />

        {/* Boom arm assembly — swings from pivot */}
        <g className="crane-boom">
          <rect x="14" y="47" width="128" height="13" rx="3" fill={AMBER} opacity="0.95" />
          {/* Counterweight block */}
          <rect x="14" y="43" width="36" height="21" rx="2" fill={CORAL} opacity="0.9" />
          <rect x="18" y="47" width="4" height="13" fill="rgba(0,0,0,0.12)" />
          <rect x="26" y="47" width="4" height="13" fill="rgba(0,0,0,0.12)" />
          {/* Trolley + cable + hook */}
          <g className="crane-hook">
            <rect x="108" y="60" width="14" height="9" rx="1" fill="#555" opacity="0.8" />
            <line className="crane-cable" x1="115" y1="69" x2="115" y2="110"
              stroke="#A3A098" strokeWidth="2" strokeLinecap="round" />
            {/* Hook shape */}
            <path d="M107 110 Q107 126 115 126 Q123 126 123 110"
              stroke="#778088" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line x1="107" y1="110" x2="123" y2="110"
              stroke="#778088" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* Pulley / sheave wheel */}
        <g className="crane-wheel">
          <circle cx="120" cy="62" r="10" stroke={BLUE} strokeWidth="2"
            fill="rgba(74,156,212,0.12)" />
          <line x1="120" y1="52" x2="120" y2="72" stroke={BLUE} strokeWidth="1.5" />
          <line x1="110" y1="62" x2="130" y2="62" stroke={BLUE} strokeWidth="1.5" />
          <circle cx="120" cy="62" r="2.5" fill={BLUE} />
        </g>

        {/* Operator cabin */}
        <rect x="73" y="46" width="22" height="20" rx="2" fill={FOREST} opacity="0.9" />
        <rect x="76" y="49" width="9" height="7" rx="1" fill={BLUE} opacity="0.75" />
        <rect x="78" y="56" width="5" height="4" rx="0.5" fill="#FCC94E" opacity="0.6" />

        {/* Status beacon on tip */}
        <circle cx="142" cy="47" r="4" fill={CORAL} opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   3. MATERIAL SWATCHES — interior colour & texture palette
   Use in: interior design sections
══════════════════════════════════════════════════ */
export function MaterialSwatches({ style }) {
  const swatches = [
    { color: TERRA,    w: 88,  rot: -4,  dur: 5.0, delay: 0.0, label: "Terracotta" },
    { color: SAGE,     w: 68,  rot:  2,  dur: 4.4, delay: 0.3, label: "Sage"       },
    { color: AMBER,    w: 96,  rot: -2,  dur: 5.8, delay: 0.6, label: "Amber"      },
    { color: BLUE,     w: 72,  rot:  3,  dur: 4.8, delay: 0.9, label: "Sky"        },
    { color: LAVENDER, w: 80,  rot: -3,  dur: 5.2, delay: 1.2, label: "Lavender"   },
    { color: FOREST,   w: 60,  rot:  1,  dur: 4.6, delay: 1.5, label: "Forest"     },
    { color: JADE,     w: 84,  rot: -1,  dur: 5.6, delay: 1.8, label: "Jade"       },
  ];

  return (
    <div aria-hidden style={{ pointerEvents: "none", display: "flex", flexDirection: "column", gap: 10, ...style }}>
      <style>{`
        @keyframes sw-float {
          0%,100% { transform: translateY(0px) rotate(var(--sw-r)); }
          50%      { transform: translateY(-12px) rotate(calc(var(--sw-r) + 3deg)); }
        }
        @media(prefers-reduced-motion:reduce){ .sw-chip{ animation:none!important } }
      `}</style>
      {swatches.map((s) => (
        <div
          key={s.label}
          className="sw-chip"
          style={{
            width: s.w, height: 36,
            borderRadius: 6,
            background: s.color,
            opacity: 0.82,
            animation: `sw-float ${s.dur}s ease-in-out ${s.delay}s infinite`,
            "--sw-r": `${s.rot}deg`,
            transform: `rotate(${s.rot}deg)`,
            boxShadow: `0 6px 20px ${s.color}50`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   4. ART CIRCLES — Kandinsky-inspired orbiting spheres
   Use in: "approach" or "why us" sections
══════════════════════════════════════════════════ */
export function ArtCircles({ size = 180, style }) {
  const cx = size / 2, cy = size / 2;
  return (
    <div aria-hidden style={{ pointerEvents: "none", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <style>{`
          @keyframes ac-orbit-a { 0%{transform:rotate(0deg)   translateX(38px) rotate(0deg)}   100%{transform:rotate(360deg)  translateX(38px) rotate(-360deg)}  }
          @keyframes ac-orbit-b { 0%{transform:rotate(120deg) translateX(54px) rotate(-120deg)} 100%{transform:rotate(480deg)  translateX(54px) rotate(-480deg)}  }
          @keyframes ac-orbit-c { 0%{transform:rotate(240deg) translateX(28px) rotate(-240deg)} 100%{transform:rotate(600deg)  translateX(28px) rotate(-600deg)}  }
          @keyframes ac-pulse   { 0%,100%{transform:scale(1); opacity:.88} 50%{transform:scale(1.1); opacity:1} }
          @keyframes ac-ring    { 0%,100%{stroke-dashoffset:0} 50%{stroke-dashoffset:40} }
          @media(prefers-reduced-motion:reduce){
            .ac-orbit-a,.ac-orbit-b,.ac-orbit-c,.ac-core,.ac-ring{animation:none!important}
          }
          .ac-orbit-a { animation: ac-orbit-a 11s linear    infinite; transform-origin:${cx}px ${cy}px }
          .ac-orbit-b { animation: ac-orbit-b 17s linear    infinite; transform-origin:${cx}px ${cy}px }
          .ac-orbit-c { animation: ac-orbit-c  8s linear    infinite; transform-origin:${cx}px ${cy}px }
          .ac-core    { animation: ac-pulse     4s ease-in-out infinite; transform-origin:${cx}px ${cy}px }
          .ac-ring    { stroke-dasharray:160 40; animation: ac-ring 6s linear infinite }
        `}</style>

        {/* Outer orbit track */}
        <circle cx={cx} cy={cy} r={cx * 0.82} stroke={AMBER} strokeWidth="0.8"
          strokeDasharray="3 6" opacity="0.35" />
        <circle className="ac-ring" cx={cx} cy={cy} r={cx * 0.62}
          stroke={BLUE} strokeWidth="0.8" opacity="0.3" />

        {/* Orbiting spheres */}
        <g className="ac-orbit-a">
          <circle cx={cx} cy={cy} r="16" fill={BLUE} opacity="0.9" />
        </g>
        <g className="ac-orbit-b">
          <circle cx={cx} cy={cy} r="12" fill={JADE} opacity="0.85" />
        </g>
        <g className="ac-orbit-c">
          <circle cx={cx} cy={cy} r="9"  fill={LAVENDER} opacity="0.9" />
        </g>

        {/* Core pulsing sphere */}
        <circle className="ac-core" cx={cx} cy={cy} r="26" fill={AMBER} opacity="0.9" />
        <circle cx={cx} cy={cy} r="18" fill={CORAL} opacity="0.85" />
        <circle cx={cx} cy={cy} r="9"  fill="#FEE4B0" opacity="0.9" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   5. BLUEPRINT ARCH — self-drawing architectural arch
   Draws in when scrolled into view, loops with a fade.
   Use in: architecture / services hero sections
══════════════════════════════════════════════════ */
export function BlueprintArch({ size = 200, style }) {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <div ref={ref} aria-hidden style={{ pointerEvents: "none", ...style }}>
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
        <style>{`
          @keyframes bp-draw-arch  { from{stroke-dashoffset:520} to{stroke-dashoffset:0} }
          @keyframes bp-draw-inner { from{stroke-dashoffset:380} to{stroke-dashoffset:0} }
          @keyframes bp-draw-line  { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
          @keyframes bp-dot-in     { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
          @keyframes bp-dim-in     { from{opacity:0} to{opacity:0.7} }
          @media(prefers-reduced-motion:reduce){
            .bp-arch,.bp-inner,.bp-vline,.bp-fline,.bp-dim,.bp-dot{
              animation:none!important; stroke-dashoffset:0!important; opacity:1!important;
            }
          }
          .bp-arch  { stroke-dasharray:520; animation: bp-draw-arch  2.4s ease-out forwards }
          .bp-inner { stroke-dasharray:380; animation: bp-draw-inner  2.8s ease-out 0.4s forwards }
          .bp-vline { stroke-dasharray:200; animation: bp-draw-line   1.4s ease-out 1.2s forwards }
          .bp-fline { stroke-dasharray:200; animation: bp-draw-line   1.2s ease-out 0.2s forwards }
          .bp-dim   {                       animation: bp-dim-in       1s   ease-out 1.8s forwards; opacity:0 }
          .bp-dot   {                       animation: bp-dot-in       0.5s ease-out forwards }
        `}</style>

        {/* Only render paths when in view so animation replays */}
        {inView && (
          <>
            {/* Floor line */}
            <line className="bp-fline" x1="16" y1="184" x2="184" y2="184"
              stroke={TERRA} strokeWidth="2.5" strokeLinecap="round"
              strokeDashoffset="200" />
            {/* Outer arch */}
            <path className="bp-arch"
              d="M18 184 L18 98 Q18 18 100 18 Q182 18 182 98 L182 184"
              stroke={AMBER} strokeWidth="2.5" strokeLinecap="round"
              strokeDashoffset="520" />
            {/* Inner arch */}
            <path className="bp-inner"
              d="M44 184 L44 102 Q44 44 100 44 Q156 44 156 102 L156 184"
              stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"
              strokeDashoffset="380" />
            {/* Centre axis */}
            <line className="bp-vline" x1="100" y1="18" x2="100" y2="184"
              stroke={FOREST} strokeWidth="1" strokeDasharray="4 4"
              strokeDashoffset="200" />
            {/* Dimension extension line */}
            <g className="bp-dim">
              <line x1="8" y1="18" x2="8" y2="184" stroke={AMBER} strokeWidth="1" />
              <line x1="4" y1="18"  x2="12" y2="18"  stroke={AMBER} strokeWidth="1.5" />
              <line x1="4" y1="184" x2="12" y2="184" stroke={AMBER} strokeWidth="1.5" />
            </g>
            {/* Key nodes */}
            <circle className="bp-dot" cx="100" cy="18" r="4.5" fill={AMBER}
              style={{ animationDelay: "2s", transformOrigin: "100px 18px" }} />
            <circle className="bp-dot" cx="18"  cy="98" r="3"   fill={BLUE}
              style={{ animationDelay: "1.8s", transformOrigin: "18px 98px" }} />
            <circle className="bp-dot" cx="182" cy="98" r="3"   fill={BLUE}
              style={{ animationDelay: "1.8s", transformOrigin: "182px 98px" }} />
          </>
        )}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   6. LEAF FRONDS — botanical animation for landscape sections
══════════════════════════════════════════════════ */
export function LeafFronds({ style }) {
  const fronds = [
    { d: "M20 120 C20 80 60 30 80 20 C60 50 40 80 20 120Z", fill: JADE,    rot: -5,  dur: 6, delay: 0   },
    { d: "M30 130 C50 90 100 50 120 30 C90 60 60 90 30 130Z", fill: FOREST, rot:  3,  dur: 7, delay: 0.5 },
    { d: "M10 100 C20 60 50 20 70 10 C50 40 30 70 10 100Z",   fill: SAGE,   rot: -8,  dur: 5, delay: 1.0 },
    { d: "M40 150 C70 110 120 70 140 50 C110 80 80 110 40 150Z", fill: JADE, rot:  6, dur: 8, delay: 1.5 },
  ];

  return (
    <div aria-hidden style={{ pointerEvents: "none", ...style }}>
      <style>{`
        @keyframes lf-sway {
          0%,100%{ transform: rotate(var(--lf-r)) translateY(0px) }
          50%    { transform: rotate(calc(var(--lf-r) + 5deg)) translateY(-8px) }
        }
        @media(prefers-reduced-motion:reduce){ .lf-frond{animation:none!important} }
      `}</style>
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        {fronds.map((f, i) => (
          <path
            key={i}
            className="lf-frond"
            d={f.d}
            fill={f.fill}
            opacity={0.75 - i * 0.05}
            style={{
              animation: `lf-sway ${f.dur}s ease-in-out ${f.delay}s infinite`,
              transformOrigin: "60px 120px",
              "--lf-r": `${f.rot}deg`,
            }}
          />
        ))}
        {/* Stem */}
        <path d="M60 150 Q65 110 80 60" stroke={FOREST} strokeWidth="2"
          fill="none" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}
