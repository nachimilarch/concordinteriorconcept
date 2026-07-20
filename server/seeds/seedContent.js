/**
 * Seed the CMS with the brand content architecture (CIC-WEB-CONTENT.md).
 *
 * - Migrates the services table (adds tagline + features columns if missing)
 * - Upserts the five disciplines (A–E) exactly as the content doc defines them
 * - Upserts site_settings brand copy so the admin panel edits the live text
 *
 * Existing keys the admin may have customised (contact details, socials,
 * counters) are only inserted when absent — never overwritten.
 *
 * Run:  node seeds/seedContent.js
 */
import pool from "../models/db.js";

/* ── 1. Migrate services table ─────────────────── */
async function ensureColumn(table, column, ddl) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS n FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column]
  );
  if (rows[0].n === 0) {
    await pool.query(`ALTER TABLE ${table} ADD COLUMN ${ddl}`);
    console.log(`  + added ${table}.${column}`);
  }
}

await ensureColumn("services", "tagline", "tagline VARCHAR(255) AFTER title");
await ensureColumn("services", "features", "features TEXT AFTER description");

/* ── 2. The five disciplines (doc-verbatim) ────── */
const DISCIPLINES = [
  {
    title: "Design & Development",
    tagline: "Land to Lifestyle.",
    description:
      "Planning spaces that are intelligent, functional and future-ready. The success of a project begins long before construction — our consultancy supports landowners, investors, developers and organizations with informed planning and development decisions.",
    features: [
      "Master Planning", "Site Analysis", "Layout Development",
      "Infrastructure Planning", "Land Development Consultancy",
      "Feasibility Studies", "Building Planning",
      "Zoning & Utilization Studies", "Design Strategy", "Development Advisory",
    ],
    icon: "ruler",
    image: "/images/brand/doc-image-5.jpg",
    display_order: 1,
  },
  {
    title: "Architecture & Construction",
    tagline: "Building enduring spaces with precision.",
    description:
      "From empty land to enduring landmarks. Concord provides end-to-end development solutions for residential, commercial, hospitality and institutional projects — integrating planning, engineering, architecture and execution into a seamless delivery process.",
    features: [
      "Residential Construction", "Luxury Villas", "Apartments", "Farm Houses",
      "Commercial Buildings", "Retail Developments",
      "Hospitality Projects & Resorts", "Institutional Buildings",
      "Turnkey Construction", "Project Management",
    ],
    icon: "hardhat",
    image: "/images/brand/doc-image-4.jpg",
    display_order: 2,
  },
  {
    title: "Landscape Architecture",
    tagline: "Where nature and design become one.",
    description:
      "Creating destinations, not just gardens. Landscape architecture is the art of shaping experiences through nature — whether a farmhouse retreat, a resort environment, a recreational destination or a community development, we create outdoor spaces that connect people with their surroundings.",
    features: [
      "Farmhouse Landscapes", "Resort Landscapes", "Garden Design",
      "Outdoor Living Spaces", "Courtyard Design", "Water Features",
      "Sustainable Landscaping", "Recreational Spaces",
      "Green Infrastructure", "Eco-sensitive Development",
    ],
    icon: "trees",
    image: "/images/brand/doc-image-2.jpg",
    display_order: 3,
  },
  {
    title: "Interior Design & Turnkey Execution",
    tagline: "Spaces designed around people.",
    description:
      "Interior design at Concord goes beyond decoration. We create environments that influence emotions, productivity, wellbeing and experiences — every interior tailored to the people who use it.",
    features: [
      "Residential & Luxury Home Interiors", "Commercial Interiors",
      "Corporate Offices", "Retail & Hospitality Interiors", "Space Planning",
      "Custom Furniture", "Modular Kitchens",
      "Lighting & False Ceiling Design", "Material Selection",
      "Complete Turnkey Execution",
    ],
    icon: "sofa",
    image: "/images/brand/doc-image-3.jpg",
    display_order: 4,
  },
  {
    title: "Smart Living & Smart Workspaces",
    tagline: "Technology integrated seamlessly into everyday experiences.",
    description:
      "Technology integrated seamlessly into everyday experiences — smart home and office automation, intelligent lighting, voice-controlled environments, security integration and energy monitoring that quietly anticipate the people who use them.",
    features: [
      "Smart Home Automation", "Smart Office Automation",
      "Intelligent Lighting Systems", "Voice-Controlled Environments",
      "Security & Surveillance Integration", "Energy Monitoring Systems",
      "Smart Climate Control", "Integrated AV Systems", "Workplace Automation",
    ],
    icon: "cpu",
    image: "/images/brand/doc-image-8.jpg",
    display_order: 5,
  },
];

/* Replace the stale service list with the five disciplines (upsert by title) */
for (const d of DISCIPLINES) {
  const [existing] = await pool.query("SELECT id FROM services WHERE title = ?", [d.title]);
  const features = JSON.stringify(d.features);
  if (existing.length) {
    await pool.query(
      "UPDATE services SET tagline=?, description=?, features=?, icon=?, image=?, display_order=? WHERE id=?",
      [d.tagline, d.description, features, d.icon, d.image, d.display_order, existing[0].id]
    );
    console.log(`  ~ updated service: ${d.title}`);
  } else {
    await pool.query(
      "INSERT INTO services (title, tagline, description, features, icon, image, display_order) VALUES (?,?,?,?,?,?,?)",
      [d.title, d.tagline, d.description, features, d.icon, d.image, d.display_order]
    );
    console.log(`  + inserted service: ${d.title}`);
  }
}

/* Remove services that are not part of the five-discipline ecosystem */
const titles = DISCIPLINES.map((d) => d.title);
const [removed] = await pool.query(
  `DELETE FROM services WHERE title NOT IN (${titles.map(() => "?").join(",")})`,
  titles
);
if (removed.affectedRows) console.log(`  - removed ${removed.affectedRows} stale service(s)`);

/* ── 3. Brand copy → site_settings ─────────────── */
/* Doc-derived copy: always refreshed so the CMS matches the live site */
const BRAND_SETTINGS = {
  company_name: "Concord Interior Concepts",
  company_tagline: "A Design, Build & Development Consultancy",
  hero_tagline: "We Design. We Build. We Transform.",
  hero_sub_tagline:
    "Architecture, Construction, Interiors, Landscape Development and Strategic Planning — brought together through one integrated vision.",
  brand_statement:
    "At Concord Interior Concepts, we create environments that inspire living, enable business, and enrich communities.",
  footer_message:
    "Designing Spaces. Building Experiences. Creating Sustainable Futures.",
  brand_story_long:
    "Concord Interior Concepts is a multidisciplinary design and development firm dedicated to shaping spaces that balance aesthetics, functionality, sustainability and long-term value. Our work spans architecture, construction, landscape development, luxury interiors, infrastructure planning and consultancy. We collaborate with homeowners, businesses, developers and institutions to transform ideas into environments that inspire everyday life. Every project is approached with one objective — to create spaces that are not only visually exceptional but strategically designed for the future.",
  about_headline: "Designing Experiences. Building Possibilities.",
};

/* Defaults: inserted only if the key does not exist yet */
const DEFAULT_SETTINGS = {
  founding_year: "2020",
};

for (const [key, value] of Object.entries(BRAND_SETTINGS)) {
  await pool.query(
    "INSERT INTO site_settings (`key`,`value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=?",
    [key, value, value]
  );
}
console.log(`  ~ refreshed ${Object.keys(BRAND_SETTINGS).length} brand settings`);

for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
  await pool.query(
    "INSERT IGNORE INTO site_settings (`key`,`value`) VALUES (?,?)",
    [key, value]
  );
}

console.log("✅ CMS content seeded from CIC-WEB-CONTENT.md");
process.exit(0);
