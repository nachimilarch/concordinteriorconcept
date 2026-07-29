/**
 * Batch 8 — PRANAVAM residential project by Vunnamatla's, Kapra, Vampuguda.
 * Source: Canva brochure DAHFsvVqdzw
 * Safe to re-run — skips existing slugs.
 * Run: node seeds/seedPortfolioBatch8.js
 */
import pool from "../models/db.js";

const PROJECTS = [

  {
    title: "Pranavam — Premium 2 BHK Apartments, Kapra",
    slug: "pranavam-vunnamatla-apartments-kapra",
    category_slug: "residential",
    location: "Kapra, Vampuguda, Hyderabad, Telangana",
    area: "1,430 sq ft per unit",
    year_completed: 2025,
    cover_image: "/images/portfolio/pranavam-vunnamatla-apartment-render.jpg",
    featured: true,
    short_desc: "Vunnamatla's PRANAVAM — a GHMC-approved boutique 4-storey residential block at Kapra with only 4 exclusive 2BHK homes, bold yellow S-curve facade and premium smart-living specifications.",
    full_desc: `PRANAVAM is Concord Interior Concepts' response to a client brief that demanded exclusivity above all else — a boutique apartment block where each floor houses just one family, ensuring a level of privacy, quiet and ownership pride that multi-unit developments rarely achieve. Located near ECIL at Kapra, Vampuguda, the project is GHMC approved and benefits from excellent connectivity to Radhika Junction, Nehru ORR, and Sainikpuri.\n\nThe facade is the defining architectural gesture — a bold yellow S-curve element in ACP cladding runs the full height of the building, creating an instantly recognisable silhouette and separating PRANAVAM from the generic residential stock in the surrounding area. Stone cladding panels and teak-toned door frames ground the upper floors in material warmth, while the street-level stilt floor is dedicated entirely to parking, including E-vehicle charging points.\n\nEach 1430 SFT super built-up unit is planned around a single-apartment-per-floor principle: living (12' × 17'11"), master bedroom (11'6" × 11'10") with attached dress and toilet, children's bedroom (12' × 10'6"), kitchen with dining open to the sit-out, a dedicated pooja space, utility area and a 6-person lift. Construction uses river sand throughout, RCC framed structure with Jayaraj/Ultratech steel, double footing foundation, anti-termite treatment, polymerised plaster finish and premium vitrified tile flooring. Plumbing is CPVC with Astral or Ashirvad pipes; electrical provision includes GM/Polycab wiring and Modular Switches. A 10,000-litre sump, perennial ground water source with Manjeera water provision and Asian antifungal paint complete the specification — an uncompromising build standard at every level.`,
  },

  {
    title: "Pranavam — Spacious 2 BHK Floor Plan, 1430 SFT",
    slug: "pranavam-2bhk-floor-plan",
    category_slug: "layouts",
    location: "Kapra, Vampuguda, Hyderabad, Telangana",
    area: "1,430 sq ft",
    year_completed: 2025,
    cover_image: "/images/portfolio/pranavam-2bhk-floor-plan.jpg",
    featured: false,
    short_desc: "3D floor plan of the PRANAVAM 2BHK unit — 1430 SFT with living, master bedroom with dressing, children's bedroom, kitchen-dining, sit-out, pooja, utility and 6-person lift.",
    full_desc: `This 3D floor plan documents the single-apartment-per-floor layout of PRANAVAM's exclusive 2BHK units at Kapra, Vampuguda. At 1430 SFT super built-up area, each floor plate is planned to extract maximum liveable quality from every square foot while keeping the layout immediately legible to the prospective buyer.\n\nThe living room at 12' × 17'11" anchors the plan, opening directly to the 12' × 6'2" sit-out/balcony for natural light and cross ventilation. The kitchen at 12'9" × 7'3" connects to a dining area of 10' × 8'2" — a kitchen-with-dining arrangement that suits modern family patterns without sacrificing kitchen utility. The master bedroom at 11'6" × 11'10" includes an attached dressing room and private toilet, while the children's bedroom at 12' × 10'6" has access to the common toilet. A dedicated pooja room, utility area, and 5' × 5'9" lift shaft are resolved within the plan without compromising any primary room. The plan is oriented with sit-out to the north, ensuring the living spaces benefit from indirect light and ventilation throughout the day — a passive design decision that reduces dependence on mechanical cooling.`,
  },

];

async function seed() {
  const [cats] = await pool.query("SELECT id, slug FROM categories");
  const catMap = {};
  for (const c of cats) catMap[c.slug] = c.id;

  let created = 0, skipped = 0;
  for (const p of PROJECTS) {
    const [existing] = await pool.query("SELECT id FROM projects WHERE slug = ?", [p.slug]);
    if (existing.length > 0) { console.log(`  skip  ${p.slug}`); skipped++; continue; }
    const catId = catMap[p.category_slug];
    if (!catId) { console.error(`  ERROR: unknown category_slug "${p.category_slug}"`); continue; }
    await pool.query(
      `INSERT INTO projects (title, slug, category_id, location, area, year_completed,
        short_desc, full_desc, cover_image, status, featured)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [p.title, p.slug, catId, p.location, p.area, p.year_completed,
       p.short_desc, p.full_desc, p.cover_image, "published", p.featured ? 1 : 0]
    );
    console.log(`  ✓ created  ${p.slug}`);
    created++;
  }
  console.log(`\nDone — ${created} created, ${skipped} skipped.`);
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
