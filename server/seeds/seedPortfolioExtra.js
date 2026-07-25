/**
 * Seed 15 additional portfolio projects — Batch 2.
 * Images from Selected Images folder, served from /images/portfolio/
 *
 * Run:  node seeds/seedPortfolioExtra.js
 * Safe to re-run — skips existing slugs.
 */
import pool from "../models/db.js";

const PROJECTS = [
  /* ── INTERIORS ─────────────────────────────────────── */
  {
    title: "Open-Plan Living with Geometric Box Shelf",
    slug: "open-plan-living-box-shelf",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "2,600 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/open-plan-box-shelf-living.jpg",
    featured: true,
    short_desc: "A wide, completed open-plan space with a geometric white box-frame divider, dark wood ceiling panels and copper pendant lights.",
    full_desc: `This completed interior is an exercise in designing with light and structure rather than walls. The centrepiece is a bespoke geometric shelving divider — white rectangular frames in a stacked, asymmetric composition — that partitions the dining area from the deeper living zone without blocking sight or air. The ceiling overhead is clad in dark teak panels with a stepped false ceiling inset and warm LED strips running along a gold frame border — a treatment that lowers the perceived ceiling height and makes the room feel intimate despite its generous footprint. Three copper cone pendants draw the eye to the dining zone, providing focused task light that doubles as sculptural elements. The white marble floor reflects all of this back, creating a luminous quality that photographs cannot fully capture.`,
  },
  {
    title: "Walnut Wardrobe with Built-in Study Desk",
    slug: "walnut-wardrobe-built-in-study",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "150 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/walnut-wardrobe-study-bedroom.jpg",
    featured: false,
    short_desc: "A full-height walnut wardrobe with an integrated floating study desk — a single millwork composition that makes a compact bedroom feel complete.",
    full_desc: `The challenge in this bedroom was to fit a wardrobe, study desk, overhead storage and door without any element feeling like an afterthought. The solution was to design the entire rear wall as a single millwork piece in walnut veneer — the sliding wardrobe doors, the overhead cabinet bridge, the study desk console and even the door surround are all part of one integrated composition in the same material. The floating desk is set at the intersection between the wardrobe and the door unit, maximising the wall without breaking the continuity of the wood surface. Recessed ceiling downlights are positioned to serve both the wardrobe face and the desk surface, so no additional task lighting is needed. The warm walnut finish brings natural texture into the room and gives it a grounded, liveable quality.`,
  },
  {
    title: "Charcoal TV Wall with Backlit Wood Mosaic Cove",
    slug: "charcoal-tv-wall-wood-mosaic-cove",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "200 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/charcoal-tv-wall-wood-mosaic.jpg",
    featured: false,
    short_desc: "A completed charcoal grey TV wall with a backlit teak mosaic cove and a floating grey console — restrained luxury in a completed bedroom.",
    full_desc: `This completed TV wall demonstrates that restraint is its own form of luxury. The wall is finished in a deep charcoal grey — a bold choice in a bedroom — which creates a moody, cinema-like quality at night. At the top, a horizontal cove running the full width of the wall contains a backlit teak mosaic panel: small-format teak parquet tiles in a random brick pattern, warm lit from behind with amber LEDs that create a rich textural glow. The floating console below is a clean grey box with a white-edged drawer. The matching walnut door and full-height door frame to the right extend the material palette, making the entire wall read as a considered composition rather than a furniture placement. The photograph confirms this was built and delivered, not just rendered.`,
  },
  {
    title: "Minimalist Bedroom — Scandinavian Render",
    slug: "minimalist-bedroom-scandinavian-render",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "180 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/minimalist-white-bedroom-render.jpg",
    featured: false,
    short_desc: "A photorealistic bedroom render in a Scandinavian palette — warm white, teak, and a globe pendant — built around a platform bed with integrated side tables.",
    full_desc: `This render was produced for a client who wanted a bedroom that felt like a retreat — calm, ordered and free of visual noise. The design is built around a continuous teak platform frame that unifies the bed base and side table surfaces into one seamless horizontal element. The wardrobe on the left runs floor to soffit in pure white with no visible hardware — a panel door system with concealed push-to-open catches. A single LED cove washes warm light down the wardrobe face without any visible fitting. The globe pendant on the right provides both task light and sculptural warmth. A roman blind at the window manages daylight while maintaining the clean geometry of the room. The entire design is a study in removing the unnecessary until only the essential remains.`,
  },
  {
    title: "Walnut Bedroom with Mirror Vanity Module",
    slug: "walnut-bedroom-mirror-vanity-module",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "190 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/walnut-bedroom-mirror-vanity.jpg",
    featured: false,
    short_desc: "A bedroom render combining a full-height walnut wardrobe, floating TV console and integrated mirror vanity in a cohesive teak composition.",
    full_desc: `The brief for this bedroom was to combine a wardrobe, a dressing area, and a TV console into a single wall composition — three functions, one material language. The walnut sliding wardrobe dominates the rear wall and features a white accent glass panel at mid-height, breaking the solid wood surface and giving the wardrobe a contemporary edge. To the right, a floating console in teak serves as both the TV unit and dressing table base, topped with a full-height vanity mirror with warm strip lighting at its top edge. The bed platform is in teak to match, with the entire room unified by the same walnut-and-white palette. This is a design where every square metre is working — nothing is left without a considered purpose.`,
  },
  {
    title: "Luxury Lounge with Mocha Coffer Ceiling",
    slug: "luxury-lounge-mocha-coffer-ceiling",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "420 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/luxury-lounge-mocha-coffer-ceiling.jpg",
    featured: true,
    short_desc: "A high-end lounge render with a mocha-toned coffer grid ceiling, backlit display niches and rich layered furniture in chocolate and cream.",
    full_desc: `This is one of CIC's most opulent lounge designs — a room where the ceiling is as richly designed as the floor. The false ceiling is a deep mocha brown with a grid of recessed coffer panels, each outlined in a narrow LED cove that gives the ceiling a jewel-like quality. Display niches are recessed into the perimeter walls and backlit with warm amber light, framing art and sculptural objects at eye level. The furniture is a layered arrangement of deep-cushioned sofas in chocolate and cream with contrast scatter cushions, arranged to serve both intimate conversation and large-group entertaining. The floor is a natural veined marble that anchors the warmth of the ceiling above. This design speaks to a client who understands that luxury is not about excess but about depth — materials and surfaces that reward close attention.`,
  },
  {
    title: "Dark Master Bedroom with Crystal Chandelier",
    slug: "dark-master-bedroom-crystal-chandelier",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "320 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/dark-master-bedroom-chandelier.jpg",
    featured: true,
    short_desc: "A dramatic dark master bedroom with arabesque wallpaper, a crystal ball chandelier, flanking display niches and luxurious upholstered bedding.",
    full_desc: `This master bedroom was designed for maximum drama — a space that makes arriving home feel like entering a boutique hotel suite. The dominant design choice is the depth of tone: the rear wall is clad in a rich arabesque-pattern dark wallpaper, and the flanking display niches on either side are recessed and backlit in warm amber, creating a glowing frame around the bed head. Above, a crystal ball chandelier drops from a decorative ceiling medallion set into a stepped oval false ceiling — the chandelier becomes the room's jewel. The bedding is deeply upholstered in cream satin with contrast cushions, providing the only light relief in an otherwise moody palette. This is a design that understands nighttime — when the lights are low, this room becomes theatre.`,
  },
  {
    title: "Completed Bedroom with Bamboo Headboard Display",
    slug: "completed-bedroom-bamboo-headboard",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "200 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/bamboo-headboard-mirror-wardrobe.jpg",
    featured: false,
    short_desc: "A completed dark bedroom with a full-height bamboo stalk headboard display panel, sliding mirror wardrobe and layered bed composition.",
    full_desc: `This photograph shows a completed bedroom — not a render — which is its own testament to the quality of CIC's execution. The headboard wall is clad in vertical bamboo stalks arranged tight in a full-height panel that runs from floor to near-ceiling. The natural texture and green-brown tonal variation of the bamboo brings a biophilic warmth to what is otherwise a very dark palette. To the left, the full-height sliding wardrobe is faced in mirror panels — a classic choice that doubles the perceived width of the room and reflects the bamboo wall back, amplifying its visual impact. The bed is dressed in deep charcoal bedding with embossed cushions. The photograph confirms the high standard of material finish and joinery quality that CIC delivers on site.`,
  },
  {
    title: "Dark-White Wardrobe with Golden Cove Ceiling",
    slug: "dark-white-wardrobe-golden-cove-ceiling",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "220 sq ft",
    year_completed: 2018,
    cover_image: "/images/portfolio/dark-white-wardrobe-cove-bedroom.jpg",
    featured: false,
    short_desc: "A completed bedroom featuring a dark-and-white wardrobe with mirror module, warm golden false ceiling coves and dark veneer door surrounds.",
    full_desc: `This completed bedroom photo documents a design where material contrast does all the work. The wardrobe is a four-door sliding unit with alternating dark walnut and white lacquer panels — a high-contrast composition that reads as a graphic element across the room. To its left, a floor-to-ceiling mirror module provides a dressing area. Above, the false ceiling steps down with a warm golden LED cove that wraps the perimeter, casting a wash of amber light across the ceiling plane and softening the strong contrasts below. The door surrounds and bedroom frame are in a matching dark veneer, tying all the dark elements of the room into a coherent language. This is a photograph from the handover, documenting the built standard of work.`,
  },
  {
    title: "Teak Slat Partition with Floating Shelves",
    slug: "teak-slat-partition-floating-shelves",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "130 sq ft",
    year_completed: 2023,
    cover_image: "/images/portfolio/teak-slat-partition-shelves.jpg",
    featured: true,
    short_desc: "A full-height teak vertical slat partition with integrated white floating shelves — a striking completed feature wall that defines and connects zones.",
    full_desc: `This is one of CIC's most photographed completed pieces — a full-height vertical teak slat partition that doubles as a display wall and a spatial divider. The slats are square-section solid teak, spaced to allow light and sightlines through while creating a clear visual boundary between entry and living zones. At two heights, white floating shelves pierce through the slat rhythm, supported invisibly from behind, creating a staggered display surface that gives the partition human scale and use. A large-format mirror panel is integrated into the composition at one level, bouncing light back into the entry. The bottom of the partition rests on the marble floor without a base rail — a detail that makes the structure read as lighter than it is. This is a piece of craftsmanship that anchors an entire home.`,
  },
  {
    title: "Modular L-Shaped Kitchen in Grey & Granite",
    slug: "modular-l-kitchen-grey-granite",
    category_slug: "interiors",
    location: "Hyderabad",
    area: "110 sq ft",
    year_completed: 2018,
    cover_image: "/images/portfolio/modular-grey-kitchen-granite.jpg",
    featured: false,
    short_desc: "A completed L-shaped modular kitchen in grey and white with black granite countertop, frosted glass upper cabinets and stainless steel hardware.",
    full_desc: `This completed kitchen demonstrates CIC's ability to deliver a premium modular kitchen that is elegant in both design and execution. The layout is an efficient L-shape with a continuous black granite worktop wrapping the corner. The lower cabinets are in a grey-taupe laminate with a clean handleless profile, while the upper cabinets alternate between matte white and frosted glass-fronted units — the frosted panels give a sense of lightness to the upper zone while concealing the contents. Full-height white tile cladding on the splash zone provides a hygienic and clean backdrop. The steel sink and hardware maintain the chrome-and-grey palette consistently. Two large windows flood the kitchen with natural light. This is a kitchen designed to be used and enjoyed — practical in plan, beautiful in finish.`,
  },

  /* ── ARCHITECTURE & ELEVATIONS ─────────────────────── */
  {
    title: "Three-Storey Residential Building — Grey Render",
    slug: "three-storey-residential-grey-render",
    category_slug: "residential",
    location: "Hyderabad",
    area: "5,200 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/grey-residential-elevation-render.jpg",
    featured: false,
    short_desc: "A detailed 3D elevation render of a three-storey residential building in grey with arched windows, decorative parapets and a mature landscape setting.",
    full_desc: `This elevation render was prepared for a multi-storey residential building where the client wanted a classical contemporary facade — structured, dignified and well-proportioned. The design uses a grey two-tone palette with white quoins and cornices to define the floor transitions. Arched window heads on the upper floors give the facade a classical rhythm, while the straight lintels on the ground floor provide a contrasting base. The entrance uses a raised portico with columns and a decorative arch above the door — a feature that signals arrival without being overscaled. The flat parapet with ornamental caps maintains the contemporary character above the roofline. The render includes mature trees and human-scale figures — standard practice at CIC to communicate the building's relationship with its landscape and the street from the very first design presentation.`,
  },
  {
    title: "Chalambabu Commercial Complex — 3D Render",
    slug: "chalambabu-commercial-complex-render",
    category_slug: "commercial",
    location: "Andhra Pradesh",
    area: "8,000 sq ft",
    year_completed: 2014,
    cover_image: "/images/portfolio/chalambabu-commercial-render.jpg",
    featured: true,
    short_desc: "A bold contemporary commercial building render with dark stone cladding, a full-height glass curtain wall and geometric golden frame elements.",
    full_desc: `The Chalambabu Commercial Project was a brief to design a building that would stand out on its high-street location and communicate ambition. The design response was unambiguous: a contrasting composition of dark natural stone cladding on the solid sections and a full-height structural glass curtain wall on the commercial floor. A vertical stack of geometric blue-framed square windows punctuates the stone face, providing rhythm and scale on the approach. The roofline is capped with an arced form and a circular oculus — an architectural crown that distinguishes this building from its neighbours on the skyline. The golden square overlay elements on the glass facade are three-dimensional structural frames, not graphics — they project from the facade and cast shadows throughout the day. The render was the design presentation that won the client's confidence before construction began.`,
  },
  {
    title: "DVR Building — Completed Geometric Facade",
    slug: "dvr-building-completed-facade",
    category_slug: "commercial",
    location: "Andhra Pradesh",
    area: "6,500 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/dvr-building-completed-facade.jpg",
    featured: true,
    short_desc: "A completed multi-storey commercial building with a striking geometric facade in grey, orange and blue — photographed as delivered.",
    full_desc: `This photograph documents the DVR Building as delivered — fully complete, handed over, and ready for occupation. The facade is one of the most distinctive buildings CIC has produced: a bold geometric composition in grey ACP cladding with a vertical cascade of orange rectangular projections on the left face, and a blue curtain wall section with geometric grid elements on the right. A large circular window element at the parapet level and a cylindrical form at the entrance corner introduce curved counterpoints to the otherwise angular design. The gate and boundary treatment in the same grey and steel palette continue the design language to the street edge. This photograph is proof of concept — everything that was resolved in the elevation render was built, precisely. It is the kind of project that announces a firm's ambition in built form.`,
  },
  {
    title: "Jaya Apartment Complex — Classical 3D Render",
    slug: "jaya-apartment-complex-render",
    category_slug: "residential",
    location: "Hyderabad",
    area: "28,000 sq ft",
    year_completed: 2016,
    cover_image: "/images/portfolio/jaya-apartment-complex-render.jpg",
    featured: false,
    short_desc: "A large multi-storey apartment complex rendered in deep purple and white with arched windows, lotus-motif balcony railings and a generously landscaped approach.",
    full_desc: `The Jaya Apartment Complex was a large-scale residential commission requiring a design that could serve multiple apartment owners while presenting a cohesive, prestigious identity from the street. The facade design uses a deep magenta-purple as its primary colour — an unusual and bold choice for a multi-unit building that gives Jaya an immediate identity distinguishable from every other building on the road. The floors are defined by continuous white cornice bands and ornamental column pilasters. The arched window heads on the upper floors are a classical motif that softens the regularity of the repeated bay. The ground floor features a covered podium with a colonnade, providing shelter at the entrance and parking. The landscaped frontage with flowering borders and a paved pedestrian walk completes the arrival experience. The render was presented as part of the architectural approval process.`,
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
