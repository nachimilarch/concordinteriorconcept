/**
 * Portfolio Batch 3 — Elevations → Residential & Commercial; Layouts & Planning
 * Also removes Construction category projects (sets to draft).
 *
 * Run:  node seeds/seedPortfolioBatch3.js
 * Safe to re-run — skips existing slugs.
 */
import pool from "../models/db.js";

const PROJECTS = [
  /* ── RESIDENTIAL ────────────────────────────────────── */
  {
    title: "Ravi Villa — Traditional Hillside Render",
    slug: "ravi-villa-traditional-hillside",
    category_slug: "residential",
    location: "Hyderabad",
    area: "3,800 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/ravi-villa-traditional-render.jpg",
    featured: false,
    short_desc: "A bird's eye 3D render of a traditional Indian villa on a slope — terracotta roof, stone columns, arched portico and lush green surroundings.",
    full_desc: `This aerial perspective render communicates something that a straight elevation drawing cannot — the relationship between the building and its landscape. The villa is set on a sloped site, with the ground floor accessed from below and an open upper terrace at garden level. The architecture draws from a classical Indian residential vocabulary: stone pillar columns flanking the entrance verandah, terracotta Mangalore roof tiles on the sloped section, and an arched window set into an accent tower at the rear. The landscaping is dense — mango trees, palms and flowering shrubs wrap the structure — making the building feel rooted in its site rather than placed upon it. The outdoor metal staircase connecting the levels adds a practical informality that the client specifically requested. This render was the key tool in gaining planning approval and client sign-off simultaneously.`,
  },
  {
    title: "WP11 Modern Residence — Orange Accent Render",
    slug: "wp11-modern-residence-orange-accent",
    category_slug: "residential",
    location: "Hyderabad",
    area: "2,800 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/wp11-modern-residential-render.jpg",
    featured: false,
    short_desc: "A two-storey modern residence render with a bold orange accent band, rooftop terrace and horizontal louvred cladding — clean contemporary design.",
    full_desc: `This residential design demonstrates CIC's capability in delivering contemporary houses that are bold in character without being complex in form. The facade uses a simple but effective device — a continuous horizontal orange band at first-floor level that wraps the building's primary face and the flanking return wall. This single colour decision lifts the entire composition and gives the house an identity that reads clearly from the street. The rooftop terrace with steel railings adds a usable outdoor level, while the overhanging flat slab with its shadow gap detail provides shade to the floor-length windows below. The ground floor entrance is framed by a low white compound wall with slatted steel gates. The design prioritises proportions and material contrast over ornamentation — every element earns its place on the facade.`,
  },
  {
    title: "Contemporary Villa at Dusk — Premium Render",
    slug: "contemporary-villa-dusk-premium-render",
    category_slug: "residential",
    location: "Hyderabad",
    area: "5,500 sq ft",
    year_completed: 2021,
    cover_image: "/images/portfolio/muni-contemporary-villa-dusk.jpg",
    featured: true,
    short_desc: "A photorealistic dusk render of a premium two-storey contemporary villa with dark wood, natural stone, deep overhangs and warm interior glow.",
    full_desc: `This dusk-hour render represents CIC's highest level of architectural visualisation — a photorealistic scene that captures how a building actually feels at its most beautiful moment. The villa uses a rich material palette of dark walnut-toned cladding, natural stone panels in a sand-beige tone, and white rendered plaster in a three-way composition that creates depth and texture across the facade. The first floor pushes forward under a deep overhanging slab supported on slim steel columns — a classic contemporary device that creates a sheltered ground-floor zone. Glass balustrades on the terrace allow uninterrupted views while maintaining the horizontal reading of the building. The warm amber light from the interiors glows through the floor-to-ceiling glazing, and the garden wall lighting casts soft pools on the driveway. This render was instrumental in the client choosing CIC for the project.`,
  },
  {
    title: "AVKS Residence — Completed Zigzag Facade",
    slug: "avks-residence-completed-facade",
    category_slug: "residential",
    location: "Hyderabad",
    area: "3,200 sq ft",
    year_completed: 2019,
    cover_image: "/images/portfolio/avks-completed-residential.jpg",
    featured: true,
    short_desc: "A completed three-storey residence with a dramatic zigzag grey-and-white facade, cantilevered glass balcony slabs and a gold CNC-cut name panel.",
    full_desc: `The AVKS residence was delivered to completion in 2019 and photographed on handover day. The facade is immediately distinctive: a bold zigzag composition in dark graphite grey and white, with each floor stepping and receding in a different direction — an architectural language that creates strong shadow lines throughout the day and gives the building a three-dimensional quality rarely seen in residential construction. The cantilevered floor slabs are expressed with glass balustrades at each level, creating transparent balconies that float. A gold CNC-cut panel with a floral star motif is set into the top-floor parapet — a personalised decorative element the client requested. The gate and compound wall are in matching grey with horizontal white banding. This photograph is proof of what CIC designs and builds: not just rendered visions, but delivered buildings.`,
  },

  /* ── COMMERCIAL ─────────────────────────────────────── */
  {
    title: "JNR Building — Completed Sculptural Facade",
    slug: "jnr-building-completed-sculptural",
    category_slug: "commercial",
    location: "Andhra Pradesh",
    area: "5,800 sq ft",
    year_completed: 2016,
    cover_image: "/images/portfolio/jnr-completed-commercial-building.jpg",
    featured: true,
    short_desc: "A completed commercial building with a bold sculptural facade — curved parapet, blue glass panel tower, decorative yellow accents and circular porthole elements.",
    full_desc: `The JNR Building is one of CIC's most expressive completed commercial projects — a building that announces itself on the street with no ambiguity about its ambition. The facade is a bold departure from the box-and-window conventions of commercial construction: a cream base is punctuated by a vertical stack of red rectangular projection frames on the left face, a full-height blue glass panel column on the right, and a curved parapet crown with a geometric crescent element at the top. Circular porthole openings and yellow dot accents add a playful rhythm to the ground and upper floors. The gate and boundary are in the same graphite grey with steel detailing. This photograph was taken on completion and shows the building exactly as designed — every colour, material and detail confirmed in the built form. It is the kind of commercial project that generates enquiries for CIC simply by existing on the road.`,
  },
  {
    title: "VSR Commercial Complex — Gold & Glass Render",
    slug: "vsr-commercial-complex-render",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "7,200 sq ft",
    year_completed: 2016,
    cover_image: "/images/portfolio/km-vsr-commercial-render.jpg",
    featured: false,
    short_desc: "A 3D elevation render of the VSR commercial complex in cream and gold — three storeys with a glazed commercial frontage, louvred accents and palm-lined approach.",
    full_desc: `The VSR Commercial Complex was designed to project professionalism and permanence from its street elevation. The render shows a three-storey building in cream stucco with gold-toned architectural detailing — horizontal bands, louvred accent screens, and a projecting cornice line above the commercial ground floor. The central section features a full-height glazed frontage that opens up the commercial tenancy to the street, while the flanking return walls are more solid, anchoring the composition. The upper floors step back slightly and are crowned with a white parapet with profile mouldings. Palm trees flank the approach, set into the paved forecourt. The design is deliberate in its restraint — a commercial building that commands presence through proportion and material quality rather than through novelty. The render was the final stage of a design process that went through multiple elevation options before this balanced composition was agreed.`,
  },
  {
    title: "BKR Avenue — Commercial Complex Render",
    slug: "bkr-avenue-commercial-complex",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "9,000 sq ft",
    year_completed: 2014,
    cover_image: "/images/portfolio/lic-bkr-avenue-commercial.jpg",
    featured: false,
    short_desc: "A bold commercial complex render for BKR Avenue — chequered mosaic parapet, orange accent bands, glass curtain wall and a distinctive curved crown.",
    full_desc: `BKR Avenue was a brief for a commercial building that would become a landmark on its street — a building that tenants and customers would recognise and associate with quality. The design response was distinctive: a curved white parapet crown carries the name "BKR AVENUE" in bold gold lettering, and beneath it a chequered mosaic panel in blue, grey and gold tiles creates an immediate visual identity that no signage could achieve alone. Orange horizontal bands at floor levels and an orange-framed curtain wall section provide a colour language that reads at street speed. The flanking side walls are clad in natural stone to ground the composition. The ground floor is designed to accommodate multiple shopfront configurations. The render includes the LIC signage at ground level — a detail the client specifically requested to show potential tenants the quality of anchor occupancy the building was targeting.`,
  },
  {
    title: "M1 Apartment Tower — Avant-Garde Render",
    slug: "m1-apartment-tower-avant-garde",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "18,000 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/m1-avant-garde-apartment-render.jpg",
    featured: false,
    short_desc: "An avant-garde multi-storey apartment tower render with dramatic swooping orange arcs, stone cladding, circular balcony cutouts and a blue glass ellipse tower.",
    full_desc: `The M1 Apartment Tower is the most formally adventurous elevation in CIC's portfolio — a design that deliberately breaks every convention of apartment block architecture. The primary facade element is a series of large swooping orange curved arcs in raised relief that cut diagonally across the building's face, creating a sinuous movement that reads from a distance. Between the arcs, natural stone cladding panels with circular porthole openings add texture and depth. On the right, a full-height blue glass ellipse tower provides a vertical counterpoint — smooth, reflective, and dramatically different in character from the sculpted stone face beside it. The entrance at ground level is framed by a dark arch, and the boundary treatment continues the curved language. This render represents the exploration of what is formally possible in residential design when the brief invites boldness and the architect has the confidence to commit.`,
  },

  /* ── LAYOUTS & PLANNING ──────────────────────────────── */
  {
    title: "Dharmika Health Project — Ayurveda Block Plan",
    slug: "dharmika-ayurveda-block-radial-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "15 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-ayurveda-block-plan.jpg",
    featured: true,
    short_desc: "A hand-rendered radial campus plan for the Dharmika Ayurveda Block — concentric treatment zones, a central water pond, and detailed programme annotations.",
    full_desc: `The Dharmika Health Project Ayurveda Block is planned as a 15-acre radial campus centred on a water pond — a form drawn from the mandala planning traditions of ancient Indian architecture and applied to a contemporary wellness facility. The plan is organised in concentric rings: the innermost ring contains the lounge and core therapeutic spaces; the second ring holds treatment rooms and waiting areas; the outer segments house specialist treatment zones including Panchakarma, Basthi, and Dhanyamladhara facilities. The form is not merely symbolic — the radial organisation means that every treatment room has equal access to the central water feature, and no patient is ever more than one zone from the therapeutic core. This plan was hand-drafted and colour-rendered by CIC as part of the master plan presentation for the full Dharmika campus. The level of detail communicates both the planning rigour and the design confidence that CIC brings to complex institutional briefs.`,
  },
  {
    title: "Dharmika Health Project — Allopathy Block Plan",
    slug: "dharmika-allopathy-block-radial-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "15 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-allopathy-block-plan.jpg",
    featured: false,
    short_desc: "A hand-rendered radial campus plan for the Dharmika Allopathy Block — multi-speciality clinical zones arranged concentrically with integrated nursing institute and car parking.",
    full_desc: `The Allopathy Block of the Dharmika Health Project is planned as a companion campus to the Ayurveda Block — another 15-acre radial form, but with a programme that reflects the different operational requirements of a multi-speciality hospital. The concentric rings are organised by clinical function: the inner zone contains the core diagnostic and emergency spaces; the second ring houses specialist outpatient departments and waiting areas; and the outer ring is divided into zones for in-patient floors, with separate entrances for each department. The Nursing Institute is placed as a linear building on the western perimeter, providing housing and training facilities adjacent to the main clinical block without disrupting the radial composition. The Allopathy Block and the Ayurveda Block share a central spine of landscaping and parking — a campus-scale planning decision that makes the two institutions feel complementary rather than competing. The colour rendering communicates how green and open the campus is intended to feel despite its large clinical programme.`,
  },
  {
    title: "Engineering College — Axial Campus Plan",
    slug: "engineering-college-axial-campus-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "12 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/engineering-college-campus-plan.jpg",
    featured: false,
    short_desc: "A hand-rendered axial campus plan for an engineering college — a linear academic spine flanked by circular garden courts and a formal water body entry axis.",
    full_desc: `This campus plan for an engineering college uses a classical axial planning strategy — a long, straight academic spine that runs east-west, flanked on each end by circular courtyard gardens that provide relief, greenery and informal gathering spaces between lectures. The academic buildings line both sides of the central corridor, with classrooms, laboratories and faculty rooms arranged for efficient circulation. The approach sequence from the south is through a formal processional axis — a long water channel lined with trees that culminates in a circular arrival court at the main entrance. On the ends of the east-west spine, circular courtyards with radial tree planting provide the identity elements that are visible from the approach road. This is a plan that manages a complex educational programme with clarity and order — legible at the first glance, fully functional in detail. The hand-colour rendering technique makes the greenery and spatial quality immediately tangible.`,
  },
  {
    title: "Dharmika Educational Project — Primary School Plan",
    slug: "dharmika-primary-school-hexagonal-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "1.5 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-primary-school-plan.jpg",
    featured: false,
    short_desc: "A hand-rendered primary school layout for Dharmika Educational Project — hexagonal classroom modules around a central playground, with hostel block and activity rooms.",
    full_desc: `The Dharmika Primary School plan is a design that puts the child at its centre — literally and philosophically. The central space is a generous open playground, oriented north-south to maximise shade from the flanking buildings throughout the day. Around it, classrooms are arranged in pairs of hexagonal modules — a form chosen not for novelty but because the hexagon creates classroom spaces that have no conventional "front" — the teacher can stand anywhere and every child has an equivalent relationship to the space. Pairs of corridors run east and west, linking the modules with covered walkways. The Hostel Block is placed at the north end, separated from the teaching zone by the entrance forecourt. Activity rooms for dance, music, yoga and meditation are placed at the south end, close to the playground. Toilet blocks are sited between zones. The entire layout fits on 1.5 acres — a compact campus that manages a complete school programme without sacrificing space or natural light.`,
  },
  {
    title: "Dharmika Project — 70-Acre Master Campus Plan",
    slug: "dharmika-master-campus-70-acres",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "70 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-master-campus-plan.jpg",
    featured: true,
    short_desc: "A breathtaking 70-acre master campus plan for the Dharmika Project — a lotus mandala composition integrating health, education and spiritual programmes.",
    full_desc: `This is CIC's most ambitious planning project — a 70-acre master campus for the Dharmika Project that integrates an Ayurveda health centre, an allopathy hospital, an educational institute, a meditation retreat and a residential component into a single unified campus plan. The plan form is derived from the lotus flower — a sacred form in Indian architectural tradition — with eight petal-shaped zones radiating from a central temple and pool. Each petal contains a distinct programme cluster: health facilities to the east, education to the north, residential to the west, and spiritual retreat to the south, with transitional landscaped zones between each petal that provide visual separation without hard barriers. The overall form is bounded by a continuous tree-lined perimeter road with four formal entry points. The central sacred space — a small temple with a reflecting pool — is the compositional anchor and the spiritual heart from which all movement radiates. This plan was hand-drafted and colour-rendered at full size by CIC and presented as the founding document for the Dharmika campus development.`,
  },
];

async function run() {
  let created = 0, skipped = 0, removed = 0;

  const [cats] = await pool.query("SELECT id, slug FROM categories");
  const catMap = Object.fromEntries(cats.map(c => [c.slug, c.id]));

  /* ── Remove Construction projects ─────────────────────── */
  const constructionId = catMap["construction"] ?? null;
  if (constructionId) {
    const [res] = await pool.query(
      "UPDATE projects SET status='draft' WHERE category_id = ?",
      [constructionId]
    );
    removed = res.affectedRows;
    console.log(`  ✗ drafted ${removed} construction project(s)`);
  }

  /* ── Insert new projects ────────────────────────────── */
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

  console.log(`\nDone — ${created} created, ${skipped} skipped, ${removed} construction drafted.`);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
