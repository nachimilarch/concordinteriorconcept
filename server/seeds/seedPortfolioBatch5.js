/**
 * Batch 5 — 9 residential & commercial entries from Selected Images.
 * Safe to re-run — skips any slug that already exists.
 * Run: node seeds/seedPortfolioBatch5.js
 */
import pool from "../models/db.js";

const PROJECTS = [

  /* ── RESIDENTIAL ──────────────────────────────────────────────── */
  {
    title: "Classical Grey Villa — 3D Elevation",
    slug: "classical-grey-villa-render",
    category_slug: "residential",
    location: "Hyderabad",
    area: "3,200 sq ft",
    year_completed: 2014,
    cover_image: "/images/portfolio/classical-grey-residential-render.jpg",
    featured: false,
    short_desc: "A three-storey classical villa in charcoal grey and white, with arched portico, Corinthian columns and ornate balcony railings.",
    full_desc: `This elevation presents a confident return to classical residential design — a three-storey composition in charcoal grey stone cladding and crisp white trim that draws from neo-classical tradition without pastiche. The central portico features full-height Corinthian columns supporting a heavy entablature, framing the main entrance with a sense of civic formality appropriate to a landmark family home. Rounded arch openings at the upper floors echo the portico's geometry, while the ornate balcony railings in white cast iron provide a delicate counterpoint to the masonry weight below. The symmetrical facade, crowned by a dentil cornice and flat parapet, gives the residence its composed, authoritative character.`,
  },
  {
    title: "Completed Olive Residence — East Facade",
    slug: "completed-olive-residence-facade",
    category_slug: "residential",
    location: "Hyderabad",
    area: "2,800 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/completed-olive-villa-facade.jpg",
    featured: false,
    short_desc: "A completed two-storey home in olive-green render with a teak wood porch ceiling, terracotta-tiled canopy and mature garden setting.",
    full_desc: `Photographed after handover, this two-storey residence demonstrates how a carefully chosen palette transforms a straightforward volume into a warm, character-filled home. The olive-green exterior render — a considered alternative to the ubiquitous white or beige — sits naturally within its garden context, receding rather than demanding attention. A teak-slatted ceiling to the covered porch adds natural warmth at the entry level, while the terracotta-tiled canopy above offers shade and introduces traditional material language at a domestic scale. The mature garden setting, with its established trees framing the facade, reinforces the sense that the house belongs here — a building that has settled into its site rather than imposed upon it.`,
  },
  {
    title: "Multi-Storey Apartment Block — Completed",
    slug: "apartment-block-white-yellow-completed",
    category_slug: "residential",
    location: "Hyderabad",
    area: "18,000 sq ft",
    year_completed: 2016,
    cover_image: "/images/portfolio/completed-apartment-white-yellow.jpg",
    featured: false,
    short_desc: "A five-storey residential apartment block completed in white and yellow render with projecting balconies and a tiled hip roof.",
    full_desc: `This completed five-storey apartment block represents mid-scale residential delivery — a typology that demands both cost efficiency and liveable quality. The white and yellow render palette, with its contrasting horizontal bands, breaks the massing into legible floor layers that prevent the building from reading as a monolithic slab. Projecting balconies with turned balusters provide each unit with outdoor space and animate the facade with rhythmic shadow. The tiled hip roof at the crown signals permanence and craft in a market that often settles for flat concrete. The project demonstrates that multi-family housing can achieve genuine character within standard construction budgets when architectural decisions are made with intention.`,
  },
  {
    title: "White Villa with Graphite Frame — Completed",
    slug: "white-villa-graphite-frame-completed",
    category_slug: "residential",
    location: "Hyderabad",
    area: "4,200 sq ft",
    year_completed: 2017,
    cover_image: "/images/portfolio/completed-white-villa-graphite-frame.jpg",
    featured: true,
    short_desc: "A completed contemporary villa with crisp white volumes, a graphite grey columnar frame and a landscaped front garden.",
    full_desc: `This completed villa is among the cleaner residential statements in the portfolio — a design that achieves its effect through restraint rather than decoration. The primary volume is finished in smooth white render, its geometry kept simple to ensure every material choice reads clearly. The graphite grey concrete frame — expressed as a structural colonnade and balcony soffit — sits as a legible counterpoint to the white body, drawing the eye to the architectural skeleton beneath the skin. The combination creates a building that reads as both solid and light, depending on the angle and quality of light. A landscaped front garden with a clipped hedge and stone-paved forecourt completes the composition, establishing the transition between public street and private home.`,
  },
  {
    title: "Golden Ochre Villa — Completed Facade",
    slug: "golden-ochre-villa-completed",
    category_slug: "residential",
    location: "Hyderabad",
    area: "3,600 sq ft",
    year_completed: 2018,
    cover_image: "/images/portfolio/completed-golden-ochre-villa-facade.jpg",
    featured: false,
    short_desc: "A three-storey completed residence in warm golden ochre render with white trim, terracotta cornice and a grand balustrade staircase.",
    full_desc: `Golden ochre has deep roots in South Indian residential architecture — it is the colour of laterite, of sun-baked earth, of buildings that read warm and generous against a blue sky. This three-storey residence uses the tone with confidence, covering its primary volume in a rich ochre render that shifts from honey in direct sun to deep amber in shadow. White trim at cornices, column capitals and balcony details sharpens the massing and prevents the palette from reading as heavy. The grand open staircase balustrade at the entrance — white painted concrete with turned posts — gives the house its formal character, signalling arrival and welcome. Every material decision here compounds the sense that this home was built to last several generations.`,
  },
  {
    title: "Modern Flat-Roof Villa — Completed",
    slug: "modern-flat-roof-villa-completed",
    category_slug: "residential",
    location: "Hyderabad",
    area: "2,600 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/completed-grey-modern-villa.jpg",
    featured: false,
    short_desc: "A completed contemporary villa with a flat-roof silhouette, grey and white render, recessed porch and clean metal balcony railing.",
    full_desc: `This completed residence represents the contemporary vocabulary at its most direct — a flat-roof silhouette, grey and white render, and a facade that communicates precision and restraint. The recessed porch creates a deep shadow line at ground level, establishing a clear boundary between public and private while providing shade to the entrance. The clean tubular metal balcony railing on the upper floor is a detail that reads as architectural rather than ornamental, reinforcing the building's commitment to a modern language. The freshly completed exterior — stone path newly laid, gate fabric still over the entrance — captures the moment of handover: a building ready to begin its life as a home.`,
  },

  /* ── COMMERCIAL ───────────────────────────────────────────────── */
  {
    title: "Futuristic Commercial Tower — Navy & Yellow",
    slug: "futuristic-commercial-navyyellow-render",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "22,000 sq ft",
    year_completed: 2022,
    cover_image: "/images/portfolio/futuristic-navyyellow-building-render.jpg",
    featured: true,
    short_desc: "A bold avant-garde commercial tower render in dark navy and signal yellow — a landmark facade concept with cantilevered volumes and dramatic massing.",
    full_desc: `Few commercial projects demand the kind of formal ambition on display here. This render — dark navy ACP panels set against signal yellow structural frames — proposes a building that reads as infrastructure-grade sculpture rather than conventional office stock. The cantilevered volumes at upper floors create an asymmetric silhouette that distinguishes the building from any angle of approach, ensuring landmark status within its urban context. The yellow frame, expressed externally as both structure and cladding detail, gives the tower its identity: a bold signature that night-lights as a datum in the skyline. This design reflects Concord's capability at the speculative and architectural end of commercial delivery — projects where the brief is to create a building that changes the reputation of its address.`,
  },
  {
    title: "BKR Towers — Hotel Ambassador, Completed",
    slug: "bkr-towers-hotel-ambassador-completed",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "35,000 sq ft",
    year_completed: 2020,
    cover_image: "/images/portfolio/bkr-towers-completed-commercial.jpg",
    featured: false,
    short_desc: "The completed BKR Towers commercial development, housing Hotel Ambassador — a four-storey glass curtain-wall facade in blue ACP with yellow and brown accent frames.",
    full_desc: `BKR Towers stands as one of the most recognisable commercial completions in the portfolio. The four-storey glazed curtain wall, clad in blue reflective ACP panels and articulated with bold yellow and dark brown accent frames, delivers the kind of corporate visibility that anchor tenants — including Hotel Ambassador at ground floor — require. The blue glass facade reflects the sky and surrounding streetscape, reducing the building's apparent mass while maximising natural light penetration through the office floors above. The ground-floor hospitality tenant is clearly signalled by the scaled hotel entrance canopy, while the retail bays on either side maintain commercial activation of the street edge. This project demonstrates the full delivery cycle: from structural frame and curtain-wall engineering through to branded signage and tenant fit-out coordination.`,
  },
  {
    title: "Drive Inn Restaurant — Aerial 3D Render",
    slug: "drive-inn-restaurant-aerial-render",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "8,500 sq ft",
    year_completed: 2026,
    cover_image: "/images/portfolio/drive-inn-restaurant-aerial-render.jpg",
    featured: true,
    short_desc: "Bird's-eye 3D render of a standalone Drive Inn restaurant with a drive-through loop, covered canopy, landscaped forecourt and generous car-park provision.",
    full_desc: `The Drive Inn Restaurant project offered the rare brief of designing a standalone hospitality building around the car as the primary amenity — a typology that demands careful site planning before architectural form is even considered. The aerial render reveals the logic: a generous drive-through loop wraps the building on three sides, with a covered canopy at the ordering and collection points providing weather protection. The building itself is positioned to maximise visibility from approach roads, with glazing on the primary elevations drawing the eye toward an active, illuminated interior. A landscaped forecourt and organised car park complete the site, ensuring that the pedestrian experience — arrival, entry, dining — is as considered as the drive-through flow. This project exemplifies Concord's approach to commercial site-planning: function first, then architecture built confidently around it.`,
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
