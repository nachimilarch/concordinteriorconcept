/**
 * Batch 7 — 4 entries sourced from CIC Canva portfolio presentation.
 * Adds: Dharmika CAD plan, Dharmika 3D render, Challan Babu duplex, multi-unit third floor options.
 * Safe to re-run — skips any slug that already exists.
 * Run: node seeds/seedPortfolioBatch7.js
 */
import pool from "../models/db.js";

const PROJECTS = [

  {
    title: "Dharmika Health Project — Ayurveda Block CAD Plan",
    slug: "dharmika-ayurveda-block-cad-plan",
    category_slug: "layouts",
    location: "Hyderabad, Telangana",
    area: "15 acres",
    year_completed: 2020,
    cover_image: "/images/portfolio/dharmika-ayurveda-block-cad-plan.jpg",
    featured: false,
    short_desc: "Detailed CAD floor plan of the 15-acre Dharmika Health Project Ayurveda Block — a circular layout with 24 labelled zones including panchakarma, therapy, yoga hall, meditation deck and water court.",
    full_desc: `This digital CAD floor plan documents the full room-by-room layout of the Dharmika Health Project's Ayurveda Block, spread across a 15-acre campus. The plan is organised around a central Water Court and Lobby that serves as the circulation hub for all treatment wings radiating outward in a concentric arrangement. The 24 numbered zones cover the complete Ayurveda care spectrum — Entry Courtyard, Reception & Waiting, dual Consultation Rooms, Panchakarma Unit, two Therapy Rooms, Massage Room (M/F), Steam Room, Yoga/Meditation Hall, Dispensary/Pharmacy, Doctors Room, Record Room, Store Room, Pantry/Staff Area, male and female and staff Toilets, Service/Utility corridor, Verandah/Corridor, Meditation Deck, Water Tank/Pond, Open Deck, and Car Parking at two cardinal points. The circular massing is noted in the general remarks as providing natural light to all rooms and Ramp-UP accessibility at the northern service entry. This CAD plan is the technical sibling of the hand-drawn campus plan, offering precise room dimensions and adjacency logic for construction documentation.`,
  },

  {
    title: "Dharmika Health Project — Ayurveda Block 3D Aerial Render",
    slug: "dharmika-health-3d-aerial-render",
    category_slug: "layouts",
    location: "Hyderabad, Telangana",
    area: "15 acres",
    year_completed: 2020,
    cover_image: "/images/portfolio/dharmika-health-3d-aerial-render.jpg",
    featured: true,
    short_desc: "3D aerial render of the Dharmika Ayurveda Block — a circular wellness campus with central Water Pond & Lounge, radiating treatment wings, flanking water ponds and a dedicated Mud Bath & Open Deck.",
    full_desc: `This 3D aerial render translates the Dharmika Ayurveda Block's circular floor plan into a fully realised built form — one of the most architecturally ambitious projects in the Concord portfolio. The building's concentric geometry is immediately legible from above: a central Water Pond & Lounge sits at the heart of the plan, ringed by the primary treatment and administrative zones. The render labels the key programme areas — Murthing Space, Administration clusters, Basthi Morena & Akash Chhitla treatment suite, Gym/Lecture Hall — as well as the external amenities: twin Water Ponds to the east, a Car Parking forecourt with individual bay markings, a Mud Bath & Open Deck at the south-east satellite volume, and a Reception/Entry sequence from the west. The surrounding natural landscape with mature trees frames the building as a wellness retreat embedded in greenery rather than imposed upon it. The render demonstrates Concord's ability to communicate complex institutional and wellness briefs through 3D visualisation that bridges the gap between architectural drawing and client decision-making.`,
  },

  {
    title: "Challan Babu Residence — Duplex Floor Plans, Piler",
    slug: "challan-babu-duplex-piler",
    category_slug: "layouts",
    location: "Piler, Andhra Pradesh",
    area: "1,800 sq ft",
    year_completed: 2013,
    cover_image: "/images/portfolio/challan-babu-duplex-piler-plan.jpg",
    featured: false,
    short_desc: "Second and two third-floor option plans for a proposed duplex residence at Piler — compact layout with master bedroom, home theatre option, sit-out terrace and duplex connectivity.",
    full_desc: `The Challan Babu residence at Piler is a proposed duplex designed across three floors, with two third-floor options presented to allow the client to choose between a home theatre configuration and a conventional bedroom arrangement. The second floor plan establishes the key programme — a master bedroom, dining, kitchen, puja room and lift — with the staircase positioned to serve both the residential duplex above and the lower floor below. Third Floor Option 1 introduces a Home Theatre as the primary living space, with Sit Out terrace access and a Lift Head Room at the top of the staircase — a configuration suited to a client who values media and entertainment as a primary domestic activity. Third Floor Option 2 swaps the home theatre for a conventional bedroom with toilet, retaining the Sit Out terrace and reconfiguring the staircase landing to suit the alternative programme. Presenting both options within a single drawing set is a hallmark of Concord's early residential design process — it allows cost and programme decisions to be made collaboratively with the client before construction documentation begins.`,
  },

  {
    title: "Multi-Unit Residential — Third Floor Plan Options",
    slug: "multi-unit-residential-third-floor-options",
    category_slug: "layouts",
    location: "Hyderabad, Telangana",
    area: "2,400 sq ft per floor",
    year_completed: 2015,
    cover_image: "/images/portfolio/residential-third-floor-options-plan.jpg",
    featured: false,
    short_desc: "Three alternative third-floor configurations for a mid-scale residential building — each option rearranges bedroom, living, kitchen and prayer room zones to suit different household types.",
    full_desc: `This set of three alternative third-floor plans demonstrates the design flexibility Concord brings to mid-scale residential commissions where client brief or future tenancy is still being defined at the planning stage. All three options share the same structural grid and staircase/duct core position, enabling the client to change floor layout without structural revision. Option 1 stacks a four-bedroom arrangement with two separate living zones and two kitchens — configured for two independent households sharing a floor plate, each with its own entry off the common stair. Option 2 consolidates the programme into a single larger household configuration with a home theatre replacing one of the living rooms, and kitchen adjacency to the dining that improves daily function. Option 3 introduces a Prayer Room as a dedicated zone alongside a more open-plan living and dining arrangement, reflecting a household where religious practice and social life are equally weighted. Presenting three alternatives at this stage — rather than a single scheme — reduces costly late-stage design changes and ensures the final construction document reflects the client's actual lifestyle.`,
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
