/**
 * AnimatedAccents.jsx — 19 unique colorful animated decorative elements.
 * Each export is assigned to exactly ONE section across the entire site — never repeat.
 * All animations respect prefers-reduced-motion.
 */
import { useRef } from "react";
import { useInView } from "framer-motion";

const AMBER = "#FBB316"; const CORAL = "#E05A2B"; const BLUE  = "#4A9CD4";
const FOREST= "#2C4A3B"; const JADE  = "#2D8C5A"; const TERRA = "#C4703D";
const LAV   = "#7B68B0"; const SAGE  = "#7DA08C"; const NAVY  = "#181815";

const R_PREF = `@media(prefers-reduced-motion:reduce)`;

/* ─────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────── */
function arc(cx, cy, r, a1deg, a2deg) {
  const a1 = a1deg * Math.PI / 180, a2 = a2deg * Math.PI / 180;
  const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
  const lg = Math.abs(a2deg - a1deg) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2}`;
}
function sector(cx, cy, r, a1deg, a2deg) {
  const a1 = a1deg * Math.PI / 180, a2 = a2deg * Math.PI / 180;
  const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
  const lg = Math.abs(a2deg - a1deg) > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2} Z`;
}
function hexPoints(cx, cy, r) {
  return Array.from({length:6}, (_,i) => {
    const a = (60*i) * Math.PI / 180;
    return `${cx + r*Math.cos(a)},${cy + r*Math.sin(a)}`;
  }).join(" ");
}

/* ═══════════════════════════════════════════════════════════════════
   1. SPINNING COMPASS  ·  Home → ConcordApproach (bottom-left)
═══════════════════════════════════════════════════════════════════ */
export function SpinningCompass({ size = 220, style }) {
  const cx = size/2, cy = size/2, R = size * 0.45;
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <style>{`
          @keyframes sc-a { to{transform:rotate(360deg)}  }
          @keyframes sc-b { to{transform:rotate(-360deg)} }
          @keyframes sc-p { 0%,100%{r:9} 50%{r:12} }
          ${R_PREF}{ .sc-out,.sc-inn,.sc-mid{animation:none!important} }
          .sc-out { animation:sc-a 30s linear infinite; transform-origin:${cx}px ${cy}px }
          .sc-mid { animation:sc-b 18s linear infinite; transform-origin:${cx}px ${cy}px }
          .sc-inn { animation:sc-a 12s linear infinite; transform-origin:${cx}px ${cy}px }
        `}</style>
        <g className="sc-out">
          <circle cx={cx} cy={cy} r={R} stroke={AMBER} strokeWidth="2.5" opacity="0.92"/>
          {Array.from({length:32},(_,i)=>{
            const a=i*11.25*Math.PI/180, maj=i%8===0, med=i%4===0;
            const len=maj?18:med?10:5, col=maj?AMBER:med?CORAL:SAGE;
            return <line key={i} x1={cx+R*Math.sin(a)} y1={cy-R*Math.cos(a)}
              x2={cx+(R-len)*Math.sin(a)} y2={cy-(R-len)*Math.cos(a)}
              stroke={col} strokeWidth={maj?3:1.2}/>;
          })}
        </g>
        <g className="sc-mid">
          <circle cx={cx} cy={cy} r={R*0.65} stroke={BLUE} strokeWidth="1.5" strokeDasharray="7 5" opacity="0.8"/>
          <circle cx={cx} cy={cy} r={R*0.38} stroke={JADE} strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
        </g>
        <g className="sc-inn">
          {/* N */ }<polygon points={`${cx},${cy-R*0.88} ${cx+5},${cy-6} ${cx},${cy} ${cx-5},${cy-6}`} fill={AMBER}/>
          {/* S */ }<polygon points={`${cx},${cy+R*0.88} ${cx+5},${cy+6} ${cx},${cy} ${cx-5},${cy+6}`} fill={AMBER} opacity="0.4"/>
          {/* W */ }<polygon points={`${cx-R*0.88},${cy} ${cx-6},${cy-5} ${cx},${cy} ${cx-6},${cy+5}`} fill={BLUE}/>
          {/* E */ }<polygon points={`${cx+R*0.88},${cy} ${cx+6},${cy-5} ${cx},${cy} ${cx+6},${cy+5}`} fill={BLUE} opacity="0.4"/>
          <polygon points={`${cx-R*0.6},${cy-R*0.6} ${cx-4},${cy-2} ${cx},${cy} ${cx-2},${cy+4}`} fill={CORAL} opacity="0.85"/>
          <polygon points={`${cx+R*0.6},${cy+R*0.6} ${cx+4},${cy+2} ${cx},${cy} ${cx+2},${cy-4}`} fill={CORAL} opacity="0.4"/>
          <polygon points={`${cx+R*0.6},${cy-R*0.6} ${cx+4},${cy-2} ${cx},${cy} ${cx-2},${cy+4}`} fill={JADE} opacity="0.85"/>
          <polygon points={`${cx-R*0.6},${cy+R*0.6} ${cx-4},${cy+2} ${cx},${cy} ${cx+2},${cy-4}`} fill={JADE} opacity="0.4"/>
          <circle cx={cx} cy={cy} r="10" fill={AMBER}><animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite"/></circle>
          <circle cx={cx} cy={cy} r="5" fill={NAVY}/>
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. CONSTRUCTION CRANE  ·  Home → BuildingBeyond (left)
═══════════════════════════════════════════════════════════════════ */
export function ConstructionCrane({ style }) {
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="220" height="310" viewBox="0 0 220 310" fill="none">
        <style>{`
          @keyframes cr-boom { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(5deg)} }
          @keyframes cr-hook { 0%,100%{transform:translateY(0)} 50%{transform:translateY(14px)} }
          @keyframes cr-whl  { to{transform:rotate(-360deg)} }
          @keyframes cr-blink { 0%,100%{opacity:1} 49%{opacity:1} 50%{opacity:.1} 99%{opacity:.1} }
          ${R_PREF}{ .cr-boom,.cr-hook,.cr-whl{animation:none!important} }
          .cr-boom { animation:cr-boom 7s ease-in-out infinite; transform-origin:110px 70px }
          .cr-hook { animation:cr-hook 4s ease-in-out infinite }
          .cr-whl  { animation:cr-whl 4s linear infinite; transform-origin:168px 78px }
        `}</style>
        {/* Mast */}
        <rect x="100" y="70" width="18" height="225" fill={AMBER} opacity=".92" rx="1"/>
        {[98,126,154,182,210].map(y=>(
          <g key={y}>
            <line x1="100" y1={y} x2="118" y2={y+24} stroke="#E8A012" strokeWidth="2"/>
            <line x1="118" y1={y} x2="100" y2={y+24} stroke="#E8A012" strokeWidth="2"/>
          </g>
        ))}
        {/* Base */}
        <rect x="76" y="290" width="68" height="12" rx="3" fill={TERRA} opacity=".9"/>
        <rect x="64" y="298" width="92" height="6"  rx="2" fill={TERRA} opacity=".6"/>
        {/* Boom */}
        <g className="cr-boom">
          <rect x="22" y="58" width="172" height="16" rx="3" fill={AMBER} opacity=".95"/>
          <rect x="22" y="54" width="44" height="24" rx="2" fill={CORAL} opacity=".9"/>
          <rect x="28" y="58" width="6" height="16" fill="rgba(0,0,0,.15)"/>
          <rect x="38" y="58" width="6" height="16" fill="rgba(0,0,0,.15)"/>
          {/* Trolley + cable + hook */}
          <g className="cr-hook">
            <rect x="148" y="74" width="18" height="12" rx="1.5" fill="#555" opacity=".85"/>
            <line x1="157" y1="86" x2="157" y2="140" stroke="#A3A098" strokeWidth="2.5" strokeDasharray="6 3"/>
            <path d="M147 140 Q147 162 157 162 Q167 162 167 140" stroke="#778088" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <line x1="147" y1="140" x2="167" y2="140" stroke="#778088" strokeWidth="3" strokeLinecap="round"/>
          </g>
        </g>
        {/* Pulley */}
        <g className="cr-whl">
          <circle cx="168" cy="78" r="13" stroke={BLUE} strokeWidth="2.5" fill="rgba(74,156,212,.15)"/>
          <line x1="168" y1="65" x2="168" y2="91" stroke={BLUE} strokeWidth="2"/>
          <line x1="155" y1="78" x2="181" y2="78" stroke={BLUE} strokeWidth="2"/>
          <circle cx="168" cy="78" r="3.5" fill={BLUE}/>
        </g>
        {/* Cabin */}
        <rect x="100" y="58" width="28" height="24" rx="2" fill={FOREST} opacity=".9"/>
        <rect x="104" y="62" width="11" height="9" rx="1" fill={BLUE} opacity=".8"/>
        <rect x="107" y="71" width="6" height="5" rx="1" fill={AMBER} opacity=".7"/>
        {/* Beacon */}
        <circle cx="194" cy="60" r="5.5" fill={CORAL}>
          <animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. MATERIAL SWATCHES  ·  Home → WhyConcord (right)
═══════════════════════════════════════════════════════════════════ */
export function MaterialSwatches({ style }) {
  const chips = [
    { c:TERRA, w:110, r:-5, dur:5.0, dl:0.0 },
    { c:SAGE,  w:80,  r: 3, dur:4.4, dl:0.4 },
    { c:AMBER, w:124, r:-3, dur:5.8, dl:0.7 },
    { c:BLUE,  w:90,  r: 4, dur:4.8, dl:1.0 },
    { c:LAV,   w:100, r:-2, dur:5.2, dl:1.3 },
    { c:FOREST,w:76,  r: 2, dur:4.6, dl:1.6 },
    { c:JADE,  w:108, r:-4, dur:5.6, dl:1.9 },
    { c:CORAL, w:86,  r: 1, dur:4.2, dl:2.2 },
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", display:"flex", flexDirection:"column", gap:12, ...style }}>
      <style>{`
        @keyframes sw-f { 0%,100%{transform:translateY(0) rotate(var(--r))} 50%{transform:translateY(-14px) rotate(calc(var(--r) + 4deg))} }
        ${R_PREF}{ .sw-c{animation:none!important} }
      `}</style>
      {chips.map((s,i)=>(
        <div key={i} className="sw-c" style={{
          width:s.w, height:44, borderRadius:8, background:s.c, opacity:.88,
          animation:`sw-f ${s.dur}s ease-in-out ${s.dl}s infinite`,
          "--r":`${s.r}deg`, transform:`rotate(${s.r}deg)`,
          boxShadow:`0 8px 24px ${s.c}55`,
        }}/>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. ART CIRCLES  ·  Home → ConcordApproach (top-right)
═══════════════════════════════════════════════════════════════════ */
export function ArtCircles({ size = 240, style }) {
  const cx = size/2, cy = size/2;
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <style>{`
          @keyframes ac-a { 0%{transform:rotate(0deg)   translateX(46px) rotate(0deg)}   100%{transform:rotate(360deg)  translateX(46px) rotate(-360deg)}  }
          @keyframes ac-b { 0%{transform:rotate(120deg) translateX(64px) rotate(-120deg)} 100%{transform:rotate(480deg)  translateX(64px) rotate(-480deg)}  }
          @keyframes ac-c { 0%{transform:rotate(240deg) translateX(32px) rotate(-240deg)} 100%{transform:rotate(600deg)  translateX(32px) rotate(-600deg)}  }
          @keyframes ac-d { 0%{transform:rotate(60deg)  translateX(80px) rotate(-60deg)}  100%{transform:rotate(420deg)  translateX(80px) rotate(-420deg)}  }
          @keyframes ac-p { 0%,100%{transform:scale(1)} 50%{transform:scale(1.14)} }
          @keyframes ac-r { to{stroke-dashoffset:-120} }
          ${R_PREF}{ .ac-a,.ac-b,.ac-c,.ac-d,.ac-core{animation:none!important} }
          .ac-a    { animation:ac-a  13s linear    infinite; transform-origin:${cx}px ${cy}px }
          .ac-b    { animation:ac-b  19s linear    infinite; transform-origin:${cx}px ${cy}px }
          .ac-c    { animation:ac-c   9s linear    infinite; transform-origin:${cx}px ${cy}px }
          .ac-d    { animation:ac-d  23s linear    infinite; transform-origin:${cx}px ${cy}px }
          .ac-core { animation:ac-p   3.5s ease-in-out infinite; transform-origin:${cx}px ${cy}px }
          .ac-ring { stroke-dasharray:200 50; animation:ac-r 6s linear infinite }
        `}</style>
        <circle cx={cx} cy={cy} r={cx*0.88} stroke={AMBER} strokeWidth="1" strokeDasharray="4 8" opacity=".3"/>
        <circle className="ac-ring" cx={cx} cy={cy} r={cx*0.70} stroke={BLUE} strokeWidth="1.2" opacity=".35"/>
        <g className="ac-d"><circle cx={cx} cy={cy} r="11" fill={LAV} opacity=".9"/></g>
        <g className="ac-a"><circle cx={cx} cy={cy} r="20" fill={BLUE} opacity=".92"/></g>
        <g className="ac-b"><circle cx={cx} cy={cy} r="14" fill={JADE} opacity=".88"/></g>
        <g className="ac-c"><circle cx={cx} cy={cy} r="10" fill={CORAL} opacity=".92"/></g>
        <circle className="ac-core" cx={cx} cy={cy} r="32" fill={AMBER} opacity=".92"/>
        <circle cx={cx} cy={cy} r="22" fill={CORAL} opacity=".88"/>
        <circle cx={cx} cy={cy} r="11" fill="#FEE4B0" opacity=".95"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. BLUEPRINT ARCH  ·  Services → Hero (left)
═══════════════════════════════════════════════════════════════════ */
export function BlueprintArch({ size = 280, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:false, margin:"-60px" });
  return (
    <div ref={ref} aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
        <style>{`
          @keyframes ba-arch  { from{stroke-dashoffset:680} to{stroke-dashoffset:0} }
          @keyframes ba-inn   { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
          @keyframes ba-line  { from{stroke-dashoffset:280} to{stroke-dashoffset:0} }
          @keyframes ba-dot   { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
          ${R_PREF}{ .ba-a,.ba-i,.ba-v,.ba-f,.ba-d{animation:none!important;stroke-dashoffset:0;opacity:1} }
          .ba-f { stroke-dasharray:280; animation:ba-line  1.4s ease-out forwards }
          .ba-a { stroke-dasharray:680; animation:ba-arch  2.8s ease-out .2s forwards }
          .ba-i { stroke-dasharray:500; animation:ba-inn   3.2s ease-out .6s forwards }
          .ba-v { stroke-dasharray:280; animation:ba-line  1.8s ease-out 1.4s forwards }
          .ba-d { animation:ba-dot .5s ease-out forwards }
        `}</style>
        {inView && <>
          <line className="ba-f" x1="20" y1="262" x2="260" y2="262" stroke={TERRA} strokeWidth="3.5" strokeLinecap="round" strokeDashoffset="280"/>
          <path className="ba-a" d="M22 262 L22 128 Q22 22 140 22 Q258 22 258 128 L258 262" stroke={AMBER} strokeWidth="3.5" strokeLinecap="round" fill="none" strokeDashoffset="680"/>
          <path className="ba-i" d="M54 262 L54 134 Q54 60 140 60 Q226 60 226 134 L226 262" stroke={BLUE} strokeWidth="2" strokeLinecap="round" fill="none" strokeDashoffset="500"/>
          <line className="ba-v" x1="140" y1="22" x2="140" y2="262" stroke={FOREST} strokeWidth="1.5" strokeDasharray="6 5" strokeDashoffset="280"/>
          <line className="ba-v" x1="10" y1="22"  x2="10" y2="262"  stroke={AMBER} strokeWidth="1.5" style={{animationDelay:"1.6s"}} strokeDashoffset="280"/>
          <line className="ba-v" x1="6"  y1="22"  x2="14" y2="22"   stroke={AMBER} strokeWidth="2.5" style={{animationDelay:"1.8s"}} strokeDashoffset="280"/>
          <line className="ba-v" x1="6"  y1="262" x2="14" y2="262"  stroke={AMBER} strokeWidth="2.5" style={{animationDelay:"1.8s"}} strokeDashoffset="280"/>
          <circle className="ba-d" cx="140" cy="22"  r="6" fill={AMBER} style={{animationDelay:"2.4s",transformOrigin:"140px 22px"}}/>
          <circle className="ba-d" cx="22"  cy="142" r="4" fill={BLUE}  style={{animationDelay:"2.2s",transformOrigin:"22px 142px"}}/>
          <circle className="ba-d" cx="258" cy="142" r="4" fill={BLUE}  style={{animationDelay:"2.2s",transformOrigin:"258px 142px"}}/>
        </>}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. LEAF FRONDS  ·  Home → WhyConcord (left)
═══════════════════════════════════════════════════════════════════ */
export function LeafFronds({ style }) {
  const fronds = [
    { d:"M30 180 C30 130 80 60 110 30 C80 70 52 120 30 180Z",  fill:JADE,   r:-6, dur:6, dl:0   },
    { d:"M50 200 C80 150 140 100 170 60 C130 100 90 145 50 200Z",fill:FOREST,r: 4, dur:7, dl:.6  },
    { d:"M16 160 C26 110 60 50 86 22 C60 56 36 102 16 160Z",   fill:SAGE,   r:-9, dur:5, dl:1.1 },
    { d:"M60 220 C100 170 158 118 188 84 C152 118 112 162 60 220Z",fill:JADE,r: 7, dur:8, dl:1.6 },
    { d:"M8 130  C18 86  44 40  66 18 C44 48 22 88 8 130Z",    fill:FOREST, r:-4, dur:6, dl:2.0 },
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <style>{`
        @keyframes lf-s { 0%,100%{transform:rotate(var(--lr)) translateY(0)} 50%{transform:rotate(calc(var(--lr)+6deg)) translateY(-10px)} }
        ${R_PREF}{ .lf-fr{animation:none!important} }
      `}</style>
      <svg width="220" height="240" viewBox="0 0 220 240" fill="none">
        {fronds.map((f,i)=>(
          <path key={i} className="lf-fr" d={f.d} fill={f.fill}
            style={{ animation:`lf-s ${f.dur}s ease-in-out ${f.dl}s infinite`, transformOrigin:"80px 180px","--lr":`${f.r}deg`, opacity:.85 }}/>
        ))}
        <path d="M80 220 Q88 170 110 100 Q120 60 130 30" stroke={FOREST} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".6"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   7. BUILDING RISE  ·  Home → BuildingBeyond (right)
═══════════════════════════════════════════════════════════════════ */
export function BuildingRise({ style }) {
  const floors = [
    { y:252, h:44, w:180, x:20, fill:TERRA,   winFill:"#FEE4B0", wx:[32,58,88,118,148] },
    { y:208, h:44, w:180, x:20, fill:FOREST,  winFill:SAGE,       wx:[32,58,88,118,148] },
    { y:164, h:44, w:180, x:20, fill:AMBER,   winFill:"#FEE4B0",  wx:[32,58,88,118,148] },
    { y:124, h:40, w:148, x:36, fill:BLUE,    winFill:"#C8E8FA",  wx:[46,74,102,130] },
    { y: 84, h:40, w:120, x:50, fill:CORAL,   winFill:"#F7C4A8",  wx:[60,86,112,134] },
    { y: 48, h:36, w: 88, x:66, fill:LAV,     winFill:"#E0D8F8",  wx:[76,100,126] },
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="220" height="310" viewBox="0 0 220 310" fill="none">
        <style>{`
          @keyframes br-f1{0%,8%{opacity:0}8%,100%{opacity:1}} @keyframes br-f2{0%,22%{opacity:0}22%,100%{opacity:1}}
          @keyframes br-f3{0%,36%{opacity:0}36%,100%{opacity:1}} @keyframes br-f4{0%,50%{opacity:0}50%,100%{opacity:1}}
          @keyframes br-f5{0%,64%{opacity:0}64%,100%{opacity:1}} @keyframes br-f6{0%,80%{opacity:0}80%,100%{opacity:1}}
          @keyframes br-glow{0%,100%{opacity:.55}50%{opacity:1}}
          ${R_PREF}{ .br-fl{animation:none!important;opacity:1} }
          .br-fl0{animation:br-f1 7s ease-out infinite} .br-fl1{animation:br-f2 7s ease-out infinite}
          .br-fl2{animation:br-f3 7s ease-out infinite} .br-fl3{animation:br-f4 7s ease-out infinite}
          .br-fl4{animation:br-f5 7s ease-out infinite} .br-fl5{animation:br-f6 7s ease-out infinite}
        `}</style>
        {floors.map((f,i)=>(
          <g key={i} className={`br-fl br-fl${i}`}>
            <rect x={f.x} y={f.y} width={f.w} height={f.h} fill={f.fill} opacity=".9" rx="1"/>
            <line x1={f.x} y1={f.y} x2={f.x+f.w} y2={f.y} stroke="rgba(0,0,0,.2)" strokeWidth="1.5"/>
            {f.wx.map(wx=>(
              <rect key={wx} x={wx} y={f.y+10} width="18" height={f.h-20} rx="1.5"
                fill={f.winFill} opacity=".92">
                <animate attributeName="opacity" values=".92;.6;.92" dur={`${2+i*.4}s`} repeatCount="indefinite"/>
              </rect>
            ))}
          </g>
        ))}
        {/* Roof peak */}
        <g className="br-fl br-fl5">
          <polygon points="80,40 110,18 140,40" fill={AMBER} opacity=".95"/>
          <circle cx="110" cy="14" r="6" fill={CORAL}>
            <animate attributeName="r" values="6;9;6" dur="1.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/>
          </circle>
        </g>
        <rect x="10" y="296" width="200" height="6" rx="3" fill={TERRA} opacity=".65"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   8. COLOR WHEEL  ·  Home → InteriorsShowcase (corner)
═══════════════════════════════════════════════════════════════════ */
export function ColorWheel({ size = 240, style }) {
  const cx=size/2, cy=size/2, R=size*0.44, R2=R*0.52;
  const outer=[AMBER,CORAL,BLUE,JADE,LAV,TERRA,SAGE,FOREST];
  const inner=[CORAL,JADE,AMBER,LAV];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <style>{`
          @keyframes cw-o{ to{transform:rotate(360deg)}  }
          @keyframes cw-i{ to{transform:rotate(-360deg)} }
          ${R_PREF}{ .cw-ou,.cw-in{animation:none!important} }
          .cw-ou{ animation:cw-o 20s linear infinite; transform-origin:${cx}px ${cy}px }
          .cw-in{ animation:cw-i 14s linear infinite; transform-origin:${cx}px ${cy}px }
        `}</style>
        <g className="cw-ou">
          {outer.map((c,i)=>(
            <path key={i} d={sector(cx,cy,R,i*45-90,(i+1)*45-90)} fill={c} opacity=".88"
              stroke="white" strokeWidth="1.5"/>
          ))}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="white" strokeWidth="2" opacity=".25"/>
        </g>
        <g className="cw-in">
          {inner.map((c,i)=>(
            <path key={i} d={sector(cx,cy,R2,i*90-90,(i+1)*90-90)} fill={c} opacity=".92"
              stroke="white" strokeWidth="1.5"/>
          ))}
        </g>
        <circle cx={cx} cy={cy} r={R*0.14} fill="white" opacity=".95"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   9. GOLDEN SPIRAL  ·  Home → WhatWeCreate (right)
═══════════════════════════════════════════════════════════════════ */
export function GoldenSpiral({ size = 260, style }) {
  const ref=useRef(null);
  const inView=useInView(ref,{once:false,margin:"-60px"});
  // Concentric arcs with golden ratio radii approximation
  const arcs=[
    {r:100,a1:-90,a2:0,   c:AMBER,  w:5 },
    {r: 62,a1:180,a2:-90, c:CORAL,  w:4 },
    {r: 38,a1: 90,a2:180, c:JADE,   w:3.5},
    {r: 24,a1:  0,a2: 90, c:BLUE,   w:3 },
    {r: 15,a1:-90,a2:  0, c:LAV,    w:2.5},
    {r:  9,a1:180,a2:-90, c:TERRA,  w:2 },
  ];
  // Centers shift per arc to approximate spiral tiling
  const centers=[
    {cx:130,cy:130},{cx:130,cy:68},{cx:92,cy:68},
    {cx:92, cy:92 },{cx:107,cy:92},{cx:107,cy:83},
  ];
  return (
    <div ref={ref} aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={size} height={size} viewBox="0 0 260 260" fill="none">
        <style>{`
          @keyframes gs-d{ from{stroke-dashoffset:var(--gsl)} to{stroke-dashoffset:0} }
          ${R_PREF}{ .gs-a{animation:none!important;stroke-dashoffset:0} }
        `}</style>
        {inView && arcs.map((a,i)=>{
          const len = Math.abs(a.a2-a.a1) * Math.PI * a.r / 180;
          const {cx,cy}=centers[i];
          return (
            <path key={i} className="gs-a"
              d={arc(cx,cy,a.r,a.a1,a.a2)}
              stroke={a.c} strokeWidth={a.w} strokeLinecap="round" fill="none"
              strokeDasharray={len+2} strokeDashoffset={len}
              style={{animation:`gs-d 2s ease-out ${i*.3}s forwards`,"--gsl":len+2}}/>
          );
        })}
        {inView && centers.map(({cx,cy},i)=>(
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={arcs[i].c} opacity=".8"
            style={{opacity:0,transition:`opacity .4s ${i*.3+.6}s`,animation:"none"}}
            ref={el=>{if(el && inView) el.style.opacity="1";}}/>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   10. PEN DRAFT  ·  Home → WhatWeCreate (left side header)
═══════════════════════════════════════════════════════════════════ */
export function PenDraft({ style }) {
  // Grid of lines with traveling marker
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
        <style>{`
          @keyframes pd-h{ from{stroke-dashoffset:280} to{stroke-dashoffset:0} }
          @keyframes pd-v{ from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
          @keyframes pd-dot{0%{opacity:0;cx:10px;cy:10px}100%{opacity:1;cx:270px;cy:190px}}
          @keyframes pd-mx{0%{transform:translateX(0)}100%{transform:translateX(260px)}}
          @keyframes pd-my{0%{transform:translateY(0)}100%{transform:translateY(180px)}}
          @keyframes pd-fade{0%,90%{opacity:1}100%{opacity:0}}
          ${R_PREF}{ .pd-h,.pd-v,.pd-pen{animation:none!important;stroke-dashoffset:0} }
          .pd-h1{stroke-dasharray:280;animation:pd-h 1.8s ease-out   0s infinite}
          .pd-h2{stroke-dasharray:280;animation:pd-h 1.8s ease-out  .5s infinite}
          .pd-h3{stroke-dasharray:280;animation:pd-h 1.8s ease-out 1.0s infinite}
          .pd-h4{stroke-dasharray:280;animation:pd-h 1.8s ease-out 1.5s infinite}
          .pd-v1{stroke-dasharray:200;animation:pd-v 1.8s ease-out  .2s infinite}
          .pd-v2{stroke-dasharray:200;animation:pd-v 1.8s ease-out  .7s infinite}
          .pd-v3{stroke-dasharray:200;animation:pd-v 1.8s ease-out 1.2s infinite}
          .pd-v4{stroke-dasharray:200;animation:pd-v 1.8s ease-out 1.7s infinite}
        `}</style>
        {/* Horizontal grid lines */}
        {[30,80,130,170].map((y,i)=>(
          <line key={y} className={`pd-h${i+1}`} x1="10" y1={y} x2="270" y2={y}
            stroke={i===0?AMBER:i===1?BLUE:i===2?SAGE:TERRA} strokeWidth="2"
            strokeDashoffset="280" strokeLinecap="round"/>
        ))}
        {/* Vertical grid lines */}
        {[60,120,180,240].map((x,i)=>(
          <line key={x} className={`pd-v${i+1}`} x1={x} y1="10" x2={x} y2="190"
            stroke={i===0?FOREST:i===1?CORAL:i===2?LAV:JADE} strokeWidth="2"
            strokeDashoffset="200" strokeLinecap="round" strokeDasharray="200"/>
        ))}
        {/* Dimension annotation marks */}
        {[30,80,130,170].map(y=>(
          <g key={y}>
            <line x1="6" y1={y-5} x2="6" y2={y+5} stroke={AMBER} strokeWidth="1.5"/>
            <line x1="274" y1={y-5} x2="274" y2={y+5} stroke={AMBER} strokeWidth="1.5"/>
          </g>
        ))}
        {/* Pen nib (small diamond) drifting */}
        <g style={{animation:"pd-mx 7s linear infinite",transformOrigin:"10px 10px"}}>
          <g style={{animation:"pd-my 7s linear 3.5s infinite",transformOrigin:"10px 10px"}}>
            <polygon points="10,4 14,10 10,16 6,10" fill={AMBER} opacity=".95"/>
            <circle cx="10" cy="18" r="2.5" fill={CORAL}/>
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   11. BRICK PATTERN  ·  Services → accordion section (right corner)
═══════════════════════════════════════════════════════════════════ */
export function BrickPattern({ style }) {
  const rows=[
    { y:200, bricks:[0,52,104,156,204], fill:TERRA   },
    { y:168, bricks:[26,78,130,182],     fill:AMBER   },
    { y:136, bricks:[0,52,104,156,204],  fill:SAGE    },
    { y:104, bricks:[26,78,130,182],     fill:FOREST  },
    { y: 72, bricks:[0,52,104,156,204],  fill:CORAL   },
    { y: 40, bricks:[26,78,130,182],     fill:BLUE    },
    { y:  8, bricks:[0,52,104,156,204],  fill:LAV     },
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="240" height="220" viewBox="0 0 240 220" fill="none">
        <style>{`
          @keyframes bp-r0{0%,5%{opacity:0}5%,100%{opacity:1}} @keyframes bp-r1{0%,18%{opacity:0}18%,100%{opacity:1}}
          @keyframes bp-r2{0%,31%{opacity:0}31%,100%{opacity:1}} @keyframes bp-r3{0%,44%{opacity:0}44%,100%{opacity:1}}
          @keyframes bp-r4{0%,57%{opacity:0}57%,100%{opacity:1}} @keyframes bp-r5{0%,70%{opacity:0}70%,100%{opacity:1}}
          @keyframes bp-r6{0%,83%{opacity:0}83%,100%{opacity:1}}
          ${R_PREF}{ .bp-row{animation:none!important;opacity:1} }
          .bp-row0{animation:bp-r0 8s ease-out infinite}.bp-row1{animation:bp-r1 8s ease-out infinite}
          .bp-row2{animation:bp-r2 8s ease-out infinite}.bp-row3{animation:bp-r3 8s ease-out infinite}
          .bp-row4{animation:bp-r4 8s ease-out infinite}.bp-row5{animation:bp-r5 8s ease-out infinite}
          .bp-row6{animation:bp-r6 8s ease-out infinite}
        `}</style>
        {rows.map((r,i)=>(
          <g key={i} className={`bp-row bp-row${i}`}>
            {r.bricks.map(x=>(
              <rect key={x} x={x+1} y={r.y+1} width="46" height="26" rx="2"
                fill={r.fill} opacity=".88" stroke="rgba(0,0,0,.12)" strokeWidth="1"/>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   12. SMART NODES  ·  Services → Why Sets Us Apart (top-right)
═══════════════════════════════════════════════════════════════════ */
export function SmartNodes({ size = 240, style }) {
  const cx=size/2, cy=size/2;
  const nodes=[
    {x:cx,     y:cy,      r:22, fill:AMBER, delay:0    },
    {x:cx,     y:cy-82,   r:14, fill:BLUE,  delay:.4   },
    {x:cx+71,  y:cy-41,   r:11, fill:JADE,  delay:.8   },
    {x:cx+71,  y:cy+41,   r:14, fill:CORAL, delay:1.2  },
    {x:cx,     y:cy+82,   r:11, fill:LAV,   delay:1.6  },
    {x:cx-71,  y:cy+41,   r:14, fill:SAGE,  delay:2.0  },
    {x:cx-71,  y:cy-41,   r:11, fill:TERRA, delay:2.4  },
  ];
  const edges=[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1]];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <style>{`
          @keyframes sn-p{ 0%,100%{opacity:.45;r:0}50%{opacity:.75;r:4} }
          @keyframes sn-n{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
          @keyframes sn-l{ 0%,100%{stroke-dashoffset:0}50%{stroke-dashoffset:20} }
          ${R_PREF}{ .sn-n,.sn-edge{animation:none!important} }
        `}</style>
        {/* Edges */}
        {edges.map(([a,b],i)=>(
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={nodes[a].fill} strokeWidth="1.5" opacity=".45" strokeDasharray="5 4"
            className="sn-edge"
            style={{animation:`sn-l 3s ease-in-out ${i*.25}s infinite`}}/>
        ))}
        {/* Pulse rings */}
        {nodes.map((n,i)=>(
          <circle key={`p${i}`} cx={n.x} cy={n.y} fill={n.fill}
            style={{animation:`sn-p 2.5s ease-out ${n.delay}s infinite`,transformOrigin:`${n.x}px ${n.y}px`}}>
            <animate attributeName="r" values={`${n.r};${n.r*2.2};${n.r}`} dur="2.5s" begin={`${n.delay}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".7;0;.7" dur="2.5s" begin={`${n.delay}s`} repeatCount="indefinite"/>
          </circle>
        ))}
        {/* Nodes */}
        {nodes.map((n,i)=>(
          <circle key={i} className="sn-n" cx={n.x} cy={n.y} r={n.r} fill={n.fill} opacity=".92"
            style={{animation:`sn-n 2.5s ease-in-out ${n.delay}s infinite`,transformOrigin:`${n.x}px ${n.y}px`}}/>
        ))}
        {nodes.map((n,i)=>(
          <circle key={`c${i}`} cx={n.x} cy={n.y} r={n.r*0.45} fill="white" opacity=".7"/>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   13. WATER RIPPLE  ·  Services → Process strip (corner)
═══════════════════════════════════════════════════════════════════ */
export function WaterRipple({ size = 260, style }) {
  const cx=size/2, cy=size/2;
  const waves=[
    {r:20,  dl:0,   c:BLUE   },
    {r:46,  dl:.6,  c:SAGE   },
    {r:72,  dl:1.2, c:JADE   },
    {r:98,  dl:1.8, c:BLUE   },
    {r:120, dl:2.4, c:SAGE   },
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <style>{`
          @keyframes wr-e{ 0%{transform:scale(0);opacity:.85} 100%{transform:scale(1.8);opacity:0} }
          ${R_PREF}{ .wr-w{animation:none!important;opacity:.5} }
        `}</style>
        {waves.map((w,i)=>(
          <circle key={i} className="wr-w" cx={cx} cy={cy} r={w.r}
            stroke={w.c} strokeWidth="2.5" opacity=".75" fill="none"
            style={{animation:`wr-e 3.6s ease-out ${w.dl}s infinite`,transformOrigin:`${cx}px ${cy}px`}}/>
        ))}
        <circle cx={cx} cy={cy} r="12" fill={BLUE} opacity=".9">
          <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx={cx} cy={cy} r="6" fill={SAGE} opacity=".95"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   14. HEXAGON GRID  ·  Portfolio → Hero section
═══════════════════════════════════════════════════════════════════ */
export function HexagonGrid({ style }) {
  const colors=[AMBER,CORAL,JADE,BLUE,LAV,TERRA,SAGE,FOREST,AMBER,CORAL,JADE,BLUE];
  const R=32, cols=4, rows=3;
  const hexW = R*2, hexH = R*Math.sqrt(3);
  const hexes=[];
  for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
      const cx = col*hexW*0.76 + (row%2===1?hexW*0.38:0) + R + 4;
      const cy = row*hexH*0.88 + R + 4;
      hexes.push({cx,cy,i:row*cols+col});
    }
  }
  const totalW = Math.ceil(hexes[hexes.length-1].cx + R + 4);
  const totalH = Math.ceil(hexes[hexes.length-1].cy + R + 4);
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} fill="none">
        <style>{`
          @keyframes hg-f{0%,100%{opacity:.3}50%{opacity:.92}}
          ${R_PREF}{ .hg-h{animation:none!important;opacity:.75} }
        `}</style>
        {hexes.map(({cx,cy,i})=>(
          <polygon key={i} className="hg-h"
            points={hexPoints(cx,cy,R-2)}
            fill={colors[i%colors.length]} opacity=".8"
            stroke="white" strokeWidth="2"
            style={{animation:`hg-f ${3+i*.22}s ease-in-out ${i*.18}s infinite`}}/>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   15. PAINT BRUSH  ·  About → hero overlay
═══════════════════════════════════════════════════════════════════ */
export function PaintBrush({ style }) {
  const strokes=[
    {x1:10, y1:30,  x2:180,y2:10,  c:AMBER,  w:22, dl:0,    dur:3.8 },
    {x1:20, y1:80,  x2:200,y2:55,  c:CORAL,  w:18, dl:.7,   dur:4.2 },
    {x1:0,  y1:130, x2:170,y2:110, c:BLUE,   w:24, dl:1.4,  dur:3.6 },
    {x1:30, y1:175, x2:210,y2:155, c:JADE,   w:16, dl:2.0,  dur:4.5 },
    {x1:5,  y1:220, x2:190,y2:200, c:LAV,    w:20, dl:2.6,  dur:4.0 },
    {x1:15, y1:260, x2:220,y2:245, c:TERRA,  w:14, dl:3.2,  dur:3.4 },
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="230" height="280" viewBox="0 0 230 280" fill="none">
        <style>{`
          @keyframes pb-s{ from{stroke-dashoffset:var(--pbl)} to{stroke-dashoffset:0} }
          @keyframes pb-fade{ 0%,80%{opacity:.82} 100%{opacity:0} }
          ${R_PREF}{ .pb-str{animation:none!important;stroke-dashoffset:0} }
        `}</style>
        {strokes.map((s,i)=>{
          const len=Math.hypot(s.x2-s.x1,s.y2-s.y1)+4;
          return (
            <line key={i} className="pb-str"
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke={s.c} strokeWidth={s.w} strokeLinecap="round" opacity=".82"
              strokeDasharray={len} strokeDashoffset={len}
              style={{
                animation:`pb-s ${s.dur}s ease-out ${s.dl}s infinite, pb-fade ${s.dur}s ease-out ${s.dl}s infinite`,
                "--pbl":len,
              }}/>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   16. ARCH FRAME  ·  About → Brand Story section (top-right corner)
   Animated corner bracket marks with dimension lines and dot accents.
═══════════════════════════════════════════════════════════════════ */
export function ArchFrame({ style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <div ref={ref} aria-hidden style={{ pointerEvents: "none", ...style }}>
      <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
        <style>{`
          @keyframes af-l { from{stroke-dashoffset:var(--afl)} to{stroke-dashoffset:0} }
          @keyframes af-in{ 0%{opacity:0;transform:scale(0)} 100%{opacity:1;transform:scale(1)} }
          @keyframes af-rot{ to{transform:rotate(360deg)} }
          ${R_PREF}{ .af-line,.af-dot,.af-cir{animation:none!important;stroke-dashoffset:0;opacity:1} }
          .af-line{ animation:af-l 2s ease-out forwards }
          .af-dot { animation:af-in .4s ease-out forwards }
          .af-cir { animation:af-rot 18s linear infinite; transform-origin:130px 130px }
        `}</style>
        {/* Outer decorative rotating ring */}
        <circle className="af-cir" cx="130" cy="130" r="118" stroke={AMBER} strokeWidth="1" strokeDasharray="8 12" opacity=".28"/>
        {/* Top-left corner bracket */}
        {inView && <>
          <path className="af-line" d="M20 80 L20 20 L80 20" stroke={AMBER} strokeWidth="3" strokeLinecap="round" strokeDasharray="160" strokeDashoffset="160" style={{animation:"af-l 1.4s ease-out 0s forwards","--afl":160}}/>
          {/* Bottom-right corner bracket */}
          <path className="af-line" d="M180 240 L240 240 L240 180" stroke={CORAL} strokeWidth="3" strokeLinecap="round" strokeDasharray="160" strokeDashoffset="160" style={{animation:"af-l 1.4s ease-out .3s forwards","--afl":160}}/>
          {/* Top-right corner bracket */}
          <path className="af-line" d="M240 80 L240 20 L180 20" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeDasharray="160" strokeDashoffset="160" style={{animation:"af-l 1.4s ease-out .6s forwards","--afl":160}}/>
          {/* Bottom-left corner bracket */}
          <path className="af-line" d="M20 180 L20 240 L80 240" stroke={JADE} strokeWidth="2" strokeLinecap="round" strokeDasharray="160" strokeDashoffset="160" style={{animation:"af-l 1.4s ease-out .9s forwards","--afl":160}}/>
          {/* Center crosshair */}
          <line className="af-line" x1="130" y1="100" x2="130" y2="160" stroke={AMBER} strokeWidth="1.5" strokeDasharray="60" strokeDashoffset="60" style={{animation:"af-l 1s ease-out 1.2s forwards","--afl":60}}/>
          <line className="af-line" x1="100" y1="130" x2="160" y2="130" stroke={AMBER} strokeWidth="1.5" strokeDasharray="60" strokeDashoffset="60" style={{animation:"af-l 1s ease-out 1.4s forwards","--afl":60}}/>
          {/* Corner dots */}
          {[[20,20],[240,20],[240,240],[20,240]].map(([x,y],i)=>(
            <circle key={i} className="af-dot" cx={x} cy={y} r="5" fill={[AMBER,BLUE,CORAL,JADE][i]}
              style={{animationDelay:`${1.4+i*.12}s`,transformOrigin:`${x}px ${y}px`}}/>
          ))}
          <circle className="af-dot" cx="130" cy="130" r="7" fill={AMBER}
            style={{animationDelay:"1.6s",transformOrigin:"130px 130px"}}>
            <animate attributeName="r" values="7;10;7" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </>}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   17. FLOATING ORBS  ·  About → Stats section (dark navy)
   Glowing gradient bubbles that drift upward in a loop.
═══════════════════════════════════════════════════════════════════ */
export function FloatingOrbs({ style }) {
  const orbs = [
    { cx:60,  cy:200, r:42, c1:AMBER,  c2:"#FEE4B0", dl:0,   dur:7  },
    { cx:160, cy:240, r:30, c1:CORAL,  c2:"#F7C4A8", dl:1.2, dur:6  },
    { cx:250, cy:190, r:36, c1:JADE,   c2:"#B4E4CC", dl:2.0, dur:8  },
    { cx:100, cy:290, r:22, c1:BLUE,   c2:"#C8E8FA", dl:0.8, dur:5.5},
    { cx:200, cy:310, r:26, c1:LAV,    c2:"#E0D8F8", dl:1.8, dur:7.5},
    { cx:290, cy:250, r:18, c1:TERRA,  c2:"#F4C8A0", dl:2.6, dur:6.5},
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
        <defs>
          {orbs.map((o,i)=>(
            <radialGradient key={i} id={`fo-g${i}`} cx="38%" cy="30%" r="65%">
              <stop offset="0%" stopColor={o.c2} stopOpacity="0.95"/>
              <stop offset="100%" stopColor={o.c1} stopOpacity="0.7"/>
            </radialGradient>
          ))}
        </defs>
        <style>{`
          @keyframes fo-rise{ 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-28px) scale(1.06)} }
          ${R_PREF}{ .fo-orb{animation:none!important} }
        `}</style>
        {orbs.map((o,i)=>(
          <circle key={i} className="fo-orb" cx={o.cx} cy={o.cy} r={o.r}
            fill={`url(#fo-g${i})`}
            style={{animation:`fo-rise ${o.dur}s ease-in-out ${o.dl}s infinite`,
              transformOrigin:`${o.cx}px ${o.cy}px`}}>
          </circle>
        ))}
        {/* Soft highlight dot on each orb */}
        {orbs.map((o,i)=>(
          <circle key={`h${i}`} cx={o.cx-o.r*.25} cy={o.cy-o.r*.25} r={o.r*.25}
            fill="white" opacity=".35"/>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   18. TURNING SQUARES  ·  About → Philosophy section (top-right)
   Nested rotating squares in brand colours, each at different speeds.
═══════════════════════════════════════════════════════════════════ */
export function TurningSquares({ style }) {
  const layers = [
    { s:220, c:AMBER,  dur:28, dir:1  },
    { s:170, c:CORAL,  dur:20, dir:-1 },
    { s:122, c:BLUE,   dur:14, dir:1  },
    { s: 78, c:JADE,   dur:10, dir:-1 },
    { s: 40, c:LAV,    dur: 7, dir:1  },
  ];
  return (
    <div aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
        <style>{`
          @keyframes ts-cw  { to{transform:rotate(360deg)}  }
          @keyframes ts-ccw { to{transform:rotate(-360deg)} }
          ${R_PREF}{ .ts-sq{animation:none!important} }
        `}</style>
        {layers.map((l,i)=>{
          const half=l.s/2, cx=120, cy=120;
          return (
            <rect key={i} className="ts-sq"
              x={cx-half} y={cy-half} width={l.s} height={l.s}
              rx={i===0?8:4}
              stroke={l.c} strokeWidth={i===0?2:1.5} fill="none"
              opacity={0.55+i*.08}
              style={{
                animation:`${l.dir>0?"ts-cw":"ts-ccw"} ${l.dur}s linear infinite`,
                transformOrigin:`${cx}px ${cy}px`,
              }}/>
          );
        })}
        {/* Center amber dot */}
        <circle cx="120" cy="120" r="8" fill={AMBER} opacity=".9">
          <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="120" cy="120" r="4" fill="white" opacity=".8"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   19. GROWING VINES  ·  About → Sustainability section (dark green bg)
   Animated stem that grows upward with leaves branching outward.
═══════════════════════════════════════════════════════════════════ */
export function GrowingVines({ style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const branches = [
    { d:"M80 260 Q60 220 40 190", c:JADE,   dl:.8, w:2.5 },
    { d:"M80 230 Q110 200 130 175", c:SAGE,  dl:1.1, w:2  },
    { d:"M80 195 Q50 165 30 140",  c:JADE,   dl:1.4, w:2  },
    { d:"M80 170 Q115 145 140 120",c:AMBER,  dl:1.7, w:2  },
    { d:"M80 140 Q45 115 28 90",   c:SAGE,   dl:2.0, w:1.5},
    { d:"M80 115 Q115 90 138 68",  c:JADE,   dl:2.3, w:1.5},
    { d:"M80 88  Q50 65 35 44",    c:AMBER,  dl:2.6, w:1.5},
  ];
  const leaves = [
    { cx:42, cy:190, rx:18, ry:10, rot:-30, c:JADE   },
    { cx:128, cy:177, rx:16, ry: 9, rot: 25, c:SAGE   },
    { cx:32, cy:140, rx:15, ry: 8, rot:-40, c:JADE   },
    { cx:138, cy:122, rx:14, ry: 8, rot: 35, c:AMBER  },
    { cx:30, cy: 90, rx:13, ry: 7, rot:-25, c:SAGE   },
    { cx:136, cy: 70, rx:12, ry: 7, rot: 20, c:JADE   },
    { cx:37, cy: 44, rx:12, ry: 6, rot:-35, c:AMBER  },
  ];
  return (
    <div ref={ref} aria-hidden style={{ pointerEvents:"none", ...style }}>
      <svg width="180" height="280" viewBox="0 0 180 280" fill="none">
        <style>{`
          @keyframes gv-stem{ from{stroke-dashoffset:240} to{stroke-dashoffset:0} }
          @keyframes gv-br  { from{stroke-dashoffset:130} to{stroke-dashoffset:0} }
          @keyframes gv-leaf{ 0%{opacity:0;transform:scale(0)} 100%{opacity:1;transform:scale(1)} }
          @keyframes gv-sway{ 0%,100%{transform:rotate(var(--gvr))} 50%{transform:rotate(calc(var(--gvr)+8deg))} }
          ${R_PREF}{ .gv-s,.gv-b,.gv-lf{animation:none!important;stroke-dashoffset:0;opacity:1} }
          .gv-s { stroke-dasharray:240; animation:gv-stem 2s ease-out forwards }
          .gv-b { stroke-dasharray:130; animation:gv-br 1.2s ease-out forwards }
        `}</style>
        {/* Main stem */}
        {inView && <>
          <path className="gv-s" d="M80 270 Q78 200 80 20" stroke={JADE} strokeWidth="4" strokeLinecap="round"/>
          {/* Branches */}
          {branches.map((b,i)=>(
            <path key={i} className="gv-b" d={b.d} stroke={b.c} strokeWidth={b.w} strokeLinecap="round"
              strokeDashoffset="130" style={{animation:`gv-br 1.2s ease-out ${b.dl}s forwards`}}/>
          ))}
          {/* Leaves */}
          {leaves.map((l,i)=>(
            <ellipse key={i} className="gv-lf" cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
              fill={l.c} opacity=".82"
              transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
              style={{opacity:0,animation:`gv-leaf .5s ease-out ${.8+i*.28+.6}s forwards, gv-sway ${3+i*.3}s ease-in-out ${1.2+i*.28}s infinite`,"--gvr":`${l.rot}deg`,transformOrigin:`${l.cx}px ${l.cy}px`}}/>
          ))}
          {/* Tip bud */}
          <circle cx="80" cy="18" r="8" fill={AMBER} opacity=".9" style={{opacity:inView?1:0,transition:"opacity .4s 2.8s"}}>
            <animate attributeName="r" values="8;11;8" dur="2s" repeatCount="indefinite"/>
          </circle>
        </>}
      </svg>
    </div>
  );
}
