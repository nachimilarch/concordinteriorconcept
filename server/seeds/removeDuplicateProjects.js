/**
 * Removes portfolio entries whose cover_image is identical to a better-named sibling.
 * Safe to re-run — only deletes the listed slugs.
 * Run: node seeds/removeDuplicateProjects.js
 */
import pool from "../models/db.js";

const DELETE_SLUGS = [
  // same file as dharmika-health-allopathy-block
  "dharmika-allopathy-block-radial-plan",
  // same file as dharmika-master-mandala-layout
  "dharmika-master-campus-70-acres",
  // same file as bamboo-slatted-tv-wall-arched-niche
  "slatted-tv-wall-false-ceiling",
  // same file as dharmika-engineering-college-plan
  "engineering-college-axial-campus-plan",
  // same file as classical-grey-villa-render
  "three-storey-residential-grey-render",
  // same file as dharmika-highschool-jrcollege-layout
  "dharmika-institutional-campus-layout",
  // same file as dharmika-health-ayurveda-block
  "dharmika-ayurveda-block-radial-plan",
  // same file as white-villa-graphite-frame-completed
  "contemporary-villa-palm-landscape",
  // same file as dharmika-primary-school-layout
  "dharmika-primary-school-hexagonal-plan",
];

async function run() {
  let removed = 0, missing = 0;
  for (const slug of DELETE_SLUGS) {
    const [r] = await pool.query("DELETE FROM projects WHERE slug = ?", [slug]);
    if (r.affectedRows > 0) { console.log(`  ✓ removed  ${slug}`); removed++; }
    else { console.log(`  –  absent  ${slug}`); missing++; }
  }
  console.log(`\nDone — ${removed} removed, ${missing} already absent.`);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
