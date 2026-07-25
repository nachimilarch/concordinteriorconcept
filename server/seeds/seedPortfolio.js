/**
 * Seed 15 curated portfolio projects from CIC's own image library.
 * Each project gets a cover image path served from /images/portfolio/
 * and descriptions focused on the image and the design thinking behind it.
 *
 * Run:  node seeds/seedPortfolio.js
 * Safe to re-run — skips any project whose slug already exists.
 */
import pool from "../models/db.js";

const PROJECTS = [
  /* ── INTERIORS ─────────────────────────────────────── */
  {
    title: "Open Living with Kitchen Vista",
    slug: "open-living-kitchen-vista",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "1,800 sq ft",
    year_completed: 2023,
    cover_image: "/images/portfolio/living-room-full-view.jpg",
    featured: true,
    short_desc: "A seamlessly connected living and kitchen space where texture, light and greenery come together.",
    full_desc: `This shot captures the design philosophy of the project — visual continuity between the living area and the modular kitchen without a hard partition. The textured accent wall in a quilted diamond pattern grounds the TV console, while the hexagonal partition column adds rhythm and breaks the sightline softly. A pop-up false ceiling in blush pink adds warmth overhead. The wet marble flooring reflects natural light, amplifying the sense of space. Plants are placed deliberately at threshold points to bring life into the transition zones. The kitchen in the background carries the same dark-and-white palette, making the entire space read as one cohesive design — not as isolated rooms.`,
  },
  {
    title: "Amber False Ceiling & Curved TV Wall",
    slug: "amber-false-ceiling-tv-wall",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "320 sq ft",
    year_completed: 2023,
    cover_image: "/images/portfolio/false-ceiling-tv-unit.jpg",
    featured: true,
    short_desc: "A bold curved false ceiling in amber and white frames an architectural TV unit with marble wall cladding.",
    full_desc: `The design intent here was to make the ceiling the hero of the room. A sweeping curved drop ceiling in amber yellow — backlit with warm LEDs — creates a dramatic canopy effect that feels both contemporary and luxurious. The circular medallion at its centre anchors the fan and ties the composition. Below, the TV wall is clad in a geometric marble-patterned panel, and the shelving unit steps outward in a staircase profile — a motif that echoes the staircase form of classical architecture. The contrast between the organic curve of the ceiling and the sharp angular shelving keeps the space visually alive and layered.`,
  },
  {
    title: "Purple Mood Lighting & Zigzag Shelf",
    slug: "purple-mood-lighting-zigzag-shelf",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "280 sq ft",
    year_completed: 2023,
    cover_image: "/images/portfolio/purple-mood-ceiling.jpg",
    featured: false,
    short_desc: "Dramatic purple cove lighting transforms a child's bedroom into an immersive, playful environment.",
    full_desc: `This bedroom was designed for a child who loves colour, imagination and character. The false ceiling uses concentric arcs — standard in form but transformed entirely by the purple LED cove wash, which turns the ceiling into a theatrical centrepiece. The feature wall carries a bold angular shelving unit in a zigzag profile — almost like a lightning bolt — giving the child a playful, tactile surface to display books, trophies and small collections. The world map wallpaper on the adjacent wall was chosen deliberately to spark curiosity. Every design choice here reinforces the idea that a child's room should feel like a world of its own.`,
  },
  {
    title: "Carved Teak Door & Lounge Living",
    slug: "carved-teak-door-lounge-living",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "2,400 sq ft",
    year_completed: 2019,
    cover_image: "/images/portfolio/spacious-living-carved-door.jpg",
    featured: true,
    short_desc: "A gracious living room anchored by a hand-carved teak pooja door and a wooden louvred partition with floating shelves.",
    full_desc: `The moment you enter this home, the eye is drawn to two things — the intricately hand-carved teak frame around the pooja unit on the right, and the louvred wooden partition with illuminated floating shelves that separates the entrance from the drawing room. The sofa set in steel blue anchors the central living zone, while the circular false ceiling above provides a crown-like focal point. Floor-length floral curtains soften the perimeter and let in diffused light. The design bridges traditional craftsmanship — the carved teak door frame is a family heirloom element integrated by the designer — with clean contemporary furnishing, creating a home that feels both rooted and refined.`,
  },
  {
    title: "Wooden Arch Open Plan Residence",
    slug: "wooden-arch-open-plan-residence",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "2,200 sq ft",
    year_completed: 2019,
    cover_image: "/images/portfolio/open-plan-wooden-arch.jpg",
    featured: false,
    short_desc: "A wide-angle view through a bold wooden portal arch connecting the dining, kitchen and living zones.",
    full_desc: `This image tells the story of an entire home in a single frame. The dark walnut-finish portal arch with louvred dividers acts as a visual gateway between the dining area and the rear kitchen and bedroom zones. On the right, a floor-to-ceiling TV wall in wood veneer houses a crockery display unit with glass shutters. The kitchen in the background is visible through the arch — a deliberate choice to create depth and connection rather than compartmentalisation. The multi-panel false ceiling changes level across zones, quietly marking transitions from kitchen to living to dining without walls. This is a masterclass in open-plan residential design achieved through furniture and architectural millwork rather than construction.`,
  },
  {
    title: "Teak & White Plant Partition",
    slug: "teak-white-plant-partition",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "180 sq ft",
    year_completed: 2020,
    cover_image: "/images/portfolio/wooden-plant-partition.jpg",
    featured: false,
    short_desc: "A vertical teak louvre partition with white shelves and live plants acts as a living room divider and statement piece.",
    full_desc: `The brief was simple — separate the dining area from the entry without closing it off. The solution was a full-height louvred partition in dark teak with white horizontal shelf inserts, styled with live potted plants. The vertical rhythm of the teak slats draws the eye upward, making the room feel taller, while the greenery brings warmth and biological texture into an otherwise structured composition. The dining table in natural teak below mirrors the material palette of the partition, reinforcing the connection. The concept draws from traditional Indian jali screens but reinterprets them in a contemporary linear language — open, airy and elegant.`,
  },
  {
    title: "Glass Sliding Wardrobe with Study Desk",
    slug: "glass-sliding-wardrobe-study-desk",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "160 sq ft",
    year_completed: 2021,
    cover_image: "/images/portfolio/glass-wardrobe-teak-floor.jpg",
    featured: false,
    short_desc: "A floor-to-ceiling frosted glass sliding wardrobe with a floating teak study desk — understated luxury.",
    full_desc: `In a compact bedroom, every surface matters. Here, the entire rear wall is given over to a fitted wardrobe in frosted aqua glass panels framed in dark teak — a combination that is both functional and strikingly beautiful. The frosted glass diffuses light, making the room feel less enclosed than a solid wardrobe would. A floating teak-top study desk runs alongside, with under-desk storage drawers integrated seamlessly into the wardrobe base. The warm teak hardwood floor grounds the cool, airy palette of the glass above. The recessed ceiling spotlights are positioned to wash light down the wardrobe face without glare. The restraint of the design is its strength — nothing competes with the wardrobe, and the room breathes.`,
  },
  {
    title: "Premium White Cross-Hatch Wardrobe",
    slug: "premium-white-crosshatch-wardrobe",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "140 sq ft",
    year_completed: 2018,
    cover_image: "/images/portfolio/white-crosshatch-wardrobe.jpg",
    featured: false,
    short_desc: "A four-panel white wardrobe with a cross-hatch lacquered finish framed in gunmetal — high-end finish in a bedroom.",
    full_desc: `Sometimes the most luxurious design choice is the most restrained one. This four-panel sliding wardrobe in high-gloss white lacquer features a precision-routed cross-hatch pattern across every panel face — a texture that catches light differently throughout the day. The gunmetal aluminium frame and track system add a masculine edge. Built-in spotlights at the top-frame wash the wardrobe face in warm downlight, creating depth in the groove pattern. The result is a wardrobe that functions as a feature wall — so considered in its detailing that it needs no other decoration on that side of the room. A design-forward choice for clients who believe storage can be beautiful.`,
  },
  {
    title: "TV Unit with Floral CNC Panel",
    slug: "tv-unit-floral-cnc-panel",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "200 sq ft",
    year_completed: 2020,
    cover_image: "/images/portfolio/tv-unit-floral-panel.jpg",
    featured: false,
    short_desc: "A TV unit combining CNC-cut floral motifs on a white panel with dark wood vertical slats and backlit shelving.",
    full_desc: `This TV unit is a study in contrast and craft. The central white panel features a precision CNC-cut floral pattern — a nod to traditional block-printing art translated into architectural millwork. Flanking this, vertical dark wood slats create a rhythm that frames the composition and provides visual depth. The floating console below runs the full width in dark veneer, and backlit horizontal shelves on the left add an asymmetric balance. The unit is designed to be the room's single focal point — generous in scale, detailed in execution, and confident in its commitment to pattern. The warm recessed spotlights above complete the picture.`,
  },

  /* ── ARCHITECTURE & ELEVATIONS ─────────────────── */
  {
    title: "Contemporary Villa with Palm Landscape",
    slug: "contemporary-villa-palm-landscape",
    category_slug: "residential",
    location: "Hyderabad",
    area: "3,600 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/white-villa-palm-facade.jpg",
    featured: true,
    short_desc: "A finished two-storey villa in white with bold graphite trim, colonnaded entrance portico and mature palm landscaping.",
    full_desc: `This completed villa is an example of CIC's ability to carry a design from concept to fully realised built form. The facade combines a modern rectilinear profile — flat roof, deep overhangs, full-height glazing — with a classically influenced entrance portico supported by white columns. The graphite grey window frames and parapet border give the building a grounded, authoritative character. The landscaping is integral to the design: mature palms and tropical plantings at the boundary soften the street elevation and create a layered approach sequence. The wrought iron gate in an arched motif transitions from the public street to the private garden. This is architecture where inside and outside were designed together.`,
  },
  {
    title: "Traditional Villa — 3D Elevation Render",
    slug: "traditional-villa-3d-render",
    category_slug: "residential",
    location: "Hyderabad",
    area: "4,200 sq ft",
    year_completed: 2016,
    cover_image: "/images/portfolio/villa-render-traditional.jpg",
    featured: false,
    short_desc: "A photorealistic 3D elevation render of a double-storey traditional villa with Mangalore tile roofing and arched verandah.",
    full_desc: `This render was produced as part of the client presentation for a traditional double-storey villa with a strong Kerala-influenced architectural language. The design features Mangalore clay tiles on sloped roof sections, white stucco walls accented with brick-red detailing, and a curved arched verandah at the entrance. The upper floor wraps around a generous balcony with turned wooden balusters — a detail drawn from colonial bungalow heritage. The 3D render at this level of detail allows the client to validate every material, colour and proportion before a single brick is laid. The lush landscaping in the render — tropical trees, flowering borders and a gated approach — communicates the relationship between the structure and its natural environment.`,
  },
  {
    title: "Completed Commercial Building",
    slug: "completed-commercial-building-blue",
    category_slug: "commercial",
    location: "Andhra Pradesh",
    area: "12,000 sq ft",
    year_completed: 2014,
    cover_image: "/images/portfolio/commercial-building-blue.jpg",
    featured: false,
    short_desc: "A four-storey commercial building in blue and white with curved corner balconies — delivered to completion.",
    full_desc: `This commercial project represents CIC's full-cycle delivery capability — from architectural planning through to the inauguration-ready handover, as evidenced by the marigold garland decorations visible at the entrance. The building's design uses a bold blue and white palette to stand out at street level, with the front elevation featuring a rhythm of horizontal windows and ornamental relief bands. The cylindrical bay window tower on the right introduces a curved counter-element that prevents the facade from feeling flat or institutional. The deep overhang above the ground-floor entrance creates a sheltered arrival zone. The building was designed to function across multiple commercial tenancies while maintaining a coherent identity from the street.`,
  },
  {
    title: "Slatted TV Wall with False Ceiling Feature",
    slug: "slatted-tv-wall-false-ceiling",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "260 sq ft",
    year_completed: 2013,
    cover_image: "/images/portfolio/slatted-tv-unit-ceiling.jpg",
    featured: false,
    short_desc: "A bamboo slatted TV wall with a curved arc panel, floating shelves and a sculpted false ceiling in amber and white.",
    full_desc: `One of CIC's early residential projects, this living room demonstrates a material language that was ahead of its time for Hyderabad. The TV wall is clad entirely in natural bamboo slats — horizontal and tightly spaced — creating a warm, organic texture as the backdrop. A quarter-circle arc panel in white interrupts the slats, providing a display shelf for decorative objects and defining the asymmetric composition. The false ceiling above picks up the amber-and-white palette with a sculpted step-down form framed in dark wood box elements, mirroring the wall's geometry overhead. The total effect is a room that feels crafted rather than fitted out — each surface connected to the next through a shared design vocabulary.`,
  },

  /* ── LAYOUTS & PLANNING ─────────────────────────── */
  {
    title: "Dharmika Institutional Campus Layout",
    slug: "dharmika-institutional-campus-layout",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "10 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-institutional-layout.jpg",
    featured: true,
    short_desc: "A hand-drawn, colour-rendered master plan for a 10-acre dual-campus institutional project — high school and junior college.",
    full_desc: `This master layout plan for the Dharmika Institutional Project covers two integrated campuses — a High School (4 acres) and a Junior College (6 acres) — connected through a shared central spine. The plan was hand-drafted and colour-rendered, a technique CIC uses for client presentations where digital precision is accompanied by the communicative warmth of hand work. The butterfly form of the twin campus layout is immediately legible: each wing has its own circulation corridors, classrooms, staff rooms, libraries and laboratories arranged symmetrically. The central connection point houses shared facilities and an open-air amphitheatre. Lush tree planting is embedded throughout the plan, communicating the campus's commitment to a green, shaded learning environment from day one of design.`,
  },

  /* ── CONSTRUCTION ───────────────────────────────── */
  {
    title: "Kitchen Installation in Progress",
    slug: "kitchen-installation-in-progress",
    category_slug: "construction",
    location: "Hyderabad",
    area: "120 sq ft",
    year_completed: 2025,
    cover_image: "/images/portfolio/kitchen-installation-progress.jpg",
    featured: false,
    short_desc: "A mid-installation kitchen showing the carcase structure, black granite top and marble wall tile — raw to finish.",
    full_desc: `This image intentionally shows a kitchen mid-installation — not to display an incomplete project, but to reveal the rigour of construction that lies beneath every finished CIC interior. The lower cabinet carcases are set and aligned; the black granite counter is cut and placed; the marble-effect large-format wall tiles are up. A team member is seen fitting the internal drawer runners — the kind of precision detail that determines whether a drawer lasts two years or twenty. CIC includes construction documentation shots like this in its portfolio because we believe the quality of a finish is only as good as the quality of the process that produced it. This is our promise to every client: what you see in the final reveal is built on a foundation of craft.`,
  },
];

async function run() {
  let created = 0, skipped = 0;

  /* Fetch category name → id map */
  const [cats] = await pool.query("SELECT id, slug FROM categories");
  const catMap = Object.fromEntries(cats.map(c => [c.slug, c.id]));

  for (const p of PROJECTS) {
    /* Skip if slug already exists */
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
