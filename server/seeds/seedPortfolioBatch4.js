/**
 * Batch 4 — 15 interior & commercial portfolio entries from CIC's own image library.
 * Safe to re-run — skips any slug that already exists.
 * Run: node seeds/seedPortfolioBatch4.js
 */
import pool from "../models/db.js";

const PROJECTS = [

  /* ── INTERIORS ─────────────────────────────────────────────── */
  {
    title: "Stone Feature TV Wall & Step Ceiling",
    slug: "living-room-stone-tv-wall",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "380 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/living-room-stone-tv-wall.jpg",
    featured: false,
    short_desc: "A living room where a textured grey stone TV wall meets a maroon step ceiling and dark wood cabinetry.",
    full_desc: `The anchor point of this living room is a full-height TV wall clad in large-format grey stone panels — a material choice that brings an exterior gravitas indoors. The stone runs unbroken from floor to ceiling, making the wall read as a geological feature rather than fitted furniture. Against this cool, textured backdrop, the step ceiling in deep maroon provides a warm, saturated counterpoint — the two-toned drop ceiling with its defined cornice line adds architectural weight overhead. Dark wood cabinetry flanks the stone wall, providing storage and framing while staying subordinate to the hero material. The design philosophy here is simple: one strong material, used with confidence, defines the entire room.`,
  },
  {
    title: "Walnut Ceiling Panels & Crystal Chandelier",
    slug: "living-dark-ceiling-crystal-chandelier",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "420 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/living-dark-ceiling-crystal-chandelier.jpg",
    featured: true,
    short_desc: "A formal living room with dark walnut ceiling panels, a multi-tier crystal chandelier and white leather sofas.",
    full_desc: `This drawing room was designed to make a statement from the moment you enter. The ceiling is the defining element — dark walnut veneer panels laid in a coffered grid pattern that runs the full width of the room, creating a rich, dramatic canopy that grounds the space. Suspended at the centre, a multi-tier crystal chandelier catches the downlight and scatters brilliance across the pale marble floor. The sofa arrangement in white leather and cream fabric pulls light back into the room, creating a luminous zone at the centre that contrasts with the dark overhead. Together, the dark ceiling and white sofas frame the chandelier as a jewel at the heart of the design — a conscious use of contrast to create maximum visual impact in a formal entertaining space.`,
  },
  {
    title: "Geometric Teak Ceiling & Jali Partition",
    slug: "completed-living-geometric-teak-ceiling",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "460 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/completed-living-geometric-teak-ceiling.jpg",
    featured: true,
    short_desc: "A completed living room featuring a geometric dark teak panel ceiling, jali screen divider and grey sectional.",
    full_desc: `This is a completed project photograph — what you see here is built, not rendered. The ceiling is the centrepiece: dark teak panels arranged in a bold geometric interlocking pattern, with LED strips recessed between the panel edges to wash the grain in warm light. The effect is architectural rather than decorative — the pattern reads as a serious structural composition from below. A carved jali partition screens the dining zone from the living area without closing it off, continuing the theme of material craft through the space. The grey sectional sofa grounds the room with understated comfort, and the composition as a whole demonstrates what CIC achieves in executed work: the precision and ambition of the render, fully realised on site.`,
  },
  {
    title: "Checkerboard TV Wall with Hexagonal Mirror Shelf",
    slug: "living-checkerboard-tv-hexagonal-shelf",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "340 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/living-checkerboard-tv-hexagonal-shelf.jpg",
    featured: false,
    short_desc: "A bold black-and-white checkerboard TV wall paired with a hexagonal mirror shelf and an art glass chandelier.",
    full_desc: `Pattern and personality define this living room. The TV wall is clad in an oversized black-and-white checkerboard tile — a fearless choice that in lesser hands would dominate the room, but here is anchored by the dark TV console below and framed by the ceiling's neutral white. To the left of the TV wall, a hexagonal mirror shelf unit creates a geometric counterpoint — its faceted, honeycomb form housing a bronze Buddha figure and decorative objects. The pendant chandelier above is a sculptural glass piece, its amber warm light softening the graphic boldness of the pattern wall below. The design proves that strong graphic choices can work in residential interiors when every other element is calibrated to support — not compete with — the hero surface.`,
  },
  {
    title: "White LED Cove Living — Completed",
    slug: "completed-minimalist-living-led-cove",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "400 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/completed-minimalist-living-led-cove.jpg",
    featured: false,
    short_desc: "A completed minimalist living room with clean white LED cove ceiling, grey sofa and black leather chairs.",
    full_desc: `Restraint is its own form of design confidence, and this completed living room exemplifies it. The ceiling is a clean drop-cove design with white LED strip lighting — the light source invisible, the glow diffused and even across the entire perimeter. Below, the furniture is a master class in tonal pairing: a full grey sectional sofa faces a pair of black leather chairs across a glass coffee table, the two tones anchoring the room in a masculine, considered palette. Framed artwork on the walls adds the only points of colour — a deliberate choice to let the space breathe and the architecture speak. This is a project where CIC's ability to deliver understated, high-quality residential interiors is as evident as in any more elaborately decorated space.`,
  },
  {
    title: "Home Theatre with Orange Leather Sectional",
    slug: "home-theatre-orange-leather",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "300 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/home-theatre-orange-leather.jpg",
    featured: true,
    short_desc: "A dedicated home theatre room with a bold orange leather sectional, butterfly rug and ceiling-mounted projector.",
    full_desc: `A home theatre is an invitation to commit to a mood, and this room commits fully. The orange leather sectional — a sweeping curved sectional that wraps around the viewing axis — is the design centrepiece: a statement piece that fills the room with warmth and personality in a single material choice. Beneath it, a butterfly-motif area rug adds a graphic contrast at floor level. The projector is ceiling-mounted flush with the white drop ceiling, keeping the sightline clean. The dark walls absorb ambient light to maximise projection quality, while the orange leather throws back warmth in all directions. This room was designed to feel like a personal cinema — not a living room with a screen, but a dedicated space where the experience of watching is elevated to an event.`,
  },
  {
    title: "Black Leather & Gold Sideboard Lounge",
    slug: "completed-living-gold-sideboard",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "380 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/completed-living-gold-sideboard.jpg",
    featured: false,
    short_desc: "A sophisticated completed lounge with black leather chairs, a gold-finish sideboard and bold striped Roman blinds.",
    full_desc: `Elegance in this completed living room comes from a carefully curated set of materials rather than an elaborate design. The black leather chairs — with their clean, contemporary profile — establish a formal tone, while the gold sideboard unit behind them introduces warmth and a touch of glamour without overwhelming the room. The striped Roman blinds in cream and charcoal are the third strong element: their vertical pattern draws the eye upward and gives the window wall a tailored, considered finish. The three elements together — leather, gold, and stripe — create a room that feels styled like a luxury hotel lounge while remaining entirely residential in scale and comfort. CIC delivered this as a turnkey interior, furniture and window treatments included.`,
  },
  {
    title: "Terracotta Wall & CNC Leaf Ceiling Tray",
    slug: "living-terracotta-cnc-leaf-ceiling",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "350 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/living-terracotta-cnc-leaf-ceiling.jpg",
    featured: false,
    short_desc: "A terracotta accent wall with a CNC-cut leaf-pattern ceiling tray and a frosted glass art display alcove.",
    full_desc: `This living room brings together craft and colour in a combination that feels rooted in Indian design heritage while remaining entirely contemporary. The terracotta accent wall — a warm burnt-orange wash that nods to traditional mineral pigment finishes — sets the mood for the room before anything else is considered. Against this, the ceiling tray above the TV wall features a CNC-cut leaf-pattern screen: the geometric organic form filters light and casts dappled shadow patterns across the surface below. To the right, a frosted glass alcove houses art and objects — the translucent panel diffusing backlight and creating a gallery-like display within the domestic context. The design is a study in how indigenous colour and craft motifs can be reinterpreted for a twenty-first century home.`,
  },
  {
    title: "Carved Teak Pillars & Stained Glass Vista",
    slug: "carved-teak-pillar-stainedglass-kitchen",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "2,600 sq ft",
    year_completed: 2019,
    cover_image: "/images/portfolio/carved-teak-pillar-stainedglass-kitchen.jpg",
    featured: true,
    short_desc: "A grand interior framed by hand-carved rosewood pillars with arabesque motifs and an artist-painted stained glass panel.",
    full_desc: `This is among the most ambitious interior commissions in CIC's portfolio. The living-to-kitchen transition zone is defined by four hand-carved rosewood pillars, each covered in a dense arabesque floral relief carved by traditional craftsmen — the scale and intricacy of the carving communicating a commitment to craft that few contemporary residential projects dare to attempt. Between the pillars, a stained glass panel in vivid greens, ambers and blues depicts a naturalistic scene — artist-painted and framed within the dark rosewood surround. Beyond the pillars, the modular kitchen is visible: a dark walnut-fronted kitchen with a curved granite island beneath a green LED cove ceiling. The marble floor carries a geometric inlay border that references the carved ornament overhead. This home was designed as a single integrated composition from floor to ceiling, bringing together teak, stone, glass art and modern cabinetry in one cohesive vision.`,
  },
  {
    title: "Mahogany Sliding Wardrobe — Completed",
    slug: "mahogany-sliding-wardrobe-bedroom",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "160 sq ft",
    year_completed: 2018,
    cover_image: "/images/portfolio/mahogany-sliding-wardrobe-bedroom.jpg",
    featured: false,
    short_desc: "A full-height mahogany sliding wardrobe with aluminium inset stripe handles, integrated window bay and loft storage.",
    full_desc: `This completed wardrobe installation demonstrates CIC's approach to bedroom joinery: every wall surface that can be made functional, is. The wardrobe runs the full width of the bedroom wall, floor to ceiling and corner to corner, in deep mahogany veneer with horizontal aluminium inset stripe handles — a detail that is both modern and refined. The sliding door mechanism allows the wardrobe face to remain uninterrupted when closed — no visible hinges, no breaks in the panel rhythm. A window bay is integrated directly into the wardrobe composition, with a storage cabinet built either side of the reveal, so the window becomes part of the furniture rather than an obstacle to it. The loft cabinet above carries the mahogany up to the ceiling, maximising every centimetre of vertical space. Built-in wardrobes at this level are not storage — they are architecture.`,
  },
  {
    title: "Teal Damask Bedroom with Stone-Effect Wardrobe",
    slug: "teal-damask-bedroom-stone-wardrobe",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "180 sq ft",
    year_completed: 2019,
    cover_image: "/images/portfolio/teal-damask-bedroom-stone-wardrobe.jpg",
    featured: false,
    short_desc: "A completed master bedroom with a dramatic teal baroque wallpaper, stone-effect grey wardrobe and integrated mirror.",
    full_desc: `Wallpaper and fitted furniture rarely get equal billing, but in this completed bedroom both deserve it. The feature wall behind the headboard is draped in a richly coloured teal damask wallpaper — the baroque floral and paisley pattern in teal, gold and cream drawing the eye immediately and establishing a theatrical, heritage atmosphere. Against this statement wall, the fitted wardrobe on the adjacent wall is deliberately restrained: high-gloss grey stone-effect laminate panels with flush chrome pulls, a material that is cool and textural without competing with the warmth of the wallpaper. An integrated full-length mirror in a rosewood surround reflects light from the window and amplifies the sense of space. The room is a master class in pairing a bold decorative surface with a considered, quiet architectural one.`,
  },
  {
    title: "Bamboo Slatted TV Wall with Arched Niche",
    slug: "bamboo-slatted-tv-wall-arched-niche",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "300 sq ft",
    year_completed: 2013,
    cover_image: "/images/portfolio/bamboo-slatted-tv-wall-arched-niche.jpg",
    featured: false,
    short_desc: "An early CIC completed living room with a bamboo slatted TV wall, semi-circular arched niche and orange cove ceiling.",
    full_desc: `CIC's roots in craft-led residential design are clearly visible in this early completed project. The TV wall is clad entirely in horizontal bamboo slats — a natural material with a warm, tactile grain that was innovative at the time of execution. Into this slatted surface, a semi-circular arched cut-out is formed, creating a display niche with floating shelves for decorative objects — a traditional arch form expressed in a thoroughly modern material context. The false ceiling above carries an orange-yellow cove panel with stepped dark wood box elements, a geometry that echoes the wall's composition overhead. The amber glow of the cove light warms the natural tones of the bamboo below. This project, nearly a decade old, still demonstrates the enduring quality of material-first interior design.`,
  },
  {
    title: "Teak & Glass Staircase Partition",
    slug: "staircase-teak-glass-crystal-partition",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "2,000 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/staircase-teak-glass-crystal-partition.jpg",
    featured: false,
    short_desc: "A completed staircase partition combining teak post frames, full-height glass panels and hanging crystal bead chains.",
    full_desc: `Staircases are transition spaces — but they are also some of the most visible architectural moments in a home. This completed staircase partition uses a combination of materials to create something genuinely distinctive: dark teak post frames hold full-height glass panels between them, and suspended within each glass bay is a vertical chain of crystal and coloured bead elements. When sunlight or artificial light plays through the glass, the beads catch it and scatter small points of colour through the staircase volume. The teak balustrade with turned balusters below connects the partition to the rest of the staircase language, keeping the composition unified. The net effect is a staircase that feels curated — a considered piece of interior architecture that you pass through rather than simply climb.`,
  },
  {
    title: "Walnut Porthole Partition & Slatted Screen",
    slug: "walnut-porthole-partition-screen",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "1,800 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/walnut-porthole-partition-screen.jpg",
    featured: false,
    short_desc: "A completed foyer partition unit in dark walnut with a circular porthole glass display and a stepped horizontal slatted screen.",
    full_desc: `The foyer is the first interior experience of any home, and this completed partition unit sets an immediate tone of considered design. The main element is a tall dark walnut cabinet with a large circular porthole cut-out — the circular glass window framing the staircase behind it and creating a theatrical layering of planes. The porthole's curved geometry is a deliberate departure from the orthogonal grid of the rest of the unit, creating a moment of visual softness in an otherwise rigorous composition. To the right, a stepped horizontal slatted screen in the same dark walnut provides a rhythm of light and shadow — the gaps between slats revealing the staircase without fully exposing it. The pair of elements together creates a filtered boundary between the entrance and the home — not a wall, but an orchestrated reveal.`,
  },

  /* ── COMMERCIAL ─────────────────────────────────────────────── */
  {
    title: "Corporate Reception with Curved Aluminium Desk",
    slug: "commercial-reception-curved-desk",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "280 sq ft",
    year_completed: 2013,
    cover_image: "/images/portfolio/commercial-reception-curved-desk.jpg",
    featured: false,
    short_desc: "A completed corporate reception area with a curved aluminium-and-glass desk, brand wall and colourful art panels.",
    full_desc: `This completed corporate reception demonstrates CIC's capacity for commercial interior delivery. The reception desk is the centrepiece: a curved, sculptural form with a brushed aluminium base structure and a glass top — the curvilinear profile immediately distinguishing it from standard rectangular desk formats and communicating a brand identity that is forward-thinking and design-aware. Behind the desk, a frosted glass wall carries the company logo in cut lettering, functioning as both brand statement and visual privacy screen. To the right of the desk, a vertical array of square art panels in green, amber and charcoal provides colour, rhythm and visual interest — a low-cost but high-impact feature wall treatment. The overall space communicates professionalism and visual intelligence, which is precisely the first impression a corporate reception needs to make.`,
  },
];

async function run() {
  let created = 0, skipped = 0;

  const [cats] = await pool.query("SELECT id, slug FROM categories");
  const catMap = Object.fromEntries(cats.map(c => [c.slug, c.id]));

  for (const p of PROJECTS) {
    const [exists] = await pool.query("SELECT id FROM projects WHERE slug = ?", [p.slug]);
    if (exists.length) { console.log(`  skip  ${p.slug}`); skipped++; continue; }

    const catId = catMap[p.category_slug] ?? null;
    await pool.query(
      `INSERT INTO projects
         (title, slug, category_id, location, area, year_completed,
          short_desc, full_desc, cover_image, status, featured)
       VALUES (?,?,?,?,?,?,?,?,?,'published',?)`,
      [p.title, p.slug, catId, p.location, p.area, p.year_completed,
       p.short_desc, p.full_desc, p.cover_image, p.featured ? 1 : 0]
    );
    console.log(`  ✓ created  ${p.slug}`);
    created++;
  }

  console.log(`\nDone — ${created} created, ${skipped} skipped.`);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
