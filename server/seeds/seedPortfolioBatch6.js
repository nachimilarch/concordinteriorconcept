/**
 * Batch 6 — Remove renovation project + add 28 new entries:
 *   Gafoor Farmhouse (layouts), Dharmika masterplan series (6, layouts),
 *   19 CAD floor-plan/elevation projects (layouts), Veerabhadra Mall (commercial)
 * Safe to re-run — skips existing slugs.
 * Run: node seeds/seedPortfolioBatch6.js
 */
import pool from "../models/db.js";

const PROJECTS = [

  /* ── GAFOOR FARMHOUSE ─────────────────────────────────────────── */
  {
    title: "Gafoor Farmhouse — Site Layout & Floor Plans",
    slug: "gafoor-farmhouse-layout-plans",
    category_slug: "layouts",
    location: "Kanigiri, Andhra Pradesh",
    area: "Farmhouse complex",
    year_completed: 2014,
    cover_image: "/images/portfolio/gafoor-farmhouse-site-layout.jpg",
    featured: true,
    short_desc: "Complete layout documentation for a luxury farmhouse — site plan, floor plans, pool section, elevations and centreline drawings.",
    full_desc: `The Gafoor Farmhouse commission is a comprehensive masterplanning and layout exercise for a private luxury farmhouse estate in Kanigiri. The project documentation spans the full breadth of pre-construction drawing: site layout with plot orientation and access, ground-floor plan with room arrangements and service zones, elevation studies, structural centreline plan, pool layout and pool section detail. The pool section drawing is a particular point of craft — it shows the relationship between the pool shell, deck level, filter room and landscape surround, all dimensions coordinated against the site layout. The project demonstrates Concord's ability to deliver a complete set of coordinated architectural drawings for a complex residential estate, from first concept through to construction-ready documentation.`,
  },

  /* ── DHARMIKA PROJECT SERIES — hand-drawn masterplanning ─────── */
  {
    title: "Dharmika Project — Master Mandala Layout",
    slug: "dharmika-master-mandala-layout",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "70 acres (43 acres constructed)",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-master-layout-mandala.jpg",
    featured: true,
    short_desc: "A 70-acre master layout for the Proposed Dharmika Project — a sacred geometry mandala campus with eight functional zones radiating from a central temple precinct.",
    full_desc: `The Proposed Dharmika Project master layout is among the most ambitious planning exercises in the Concord portfolio. Set across 70 acres of ground cover (43 acres constructed), the master plan is organised around a sacred geometry mandala — eight petal-shaped zones radiate from a central temple and water court, each housing a distinct programme: residences, ashram blocks, cultural halls, meditation pavilions, open decks and water features. The symmetry is not merely decorative; it encodes a philosophical intention that the campus serves as a geometrically coherent expression of dharmic principles. Each zone is bounded by a curved access path and separated by landscaped buffers, ensuring that pedestrian movement is always held within a legible spatial hierarchy. The hand-coloured drawing — produced at presentation quality for client approval — demonstrates the level of conceptual rigour that Concord brings to masterplanning commissions of this scale and complexity.`,
  },
  {
    title: "Dharmika Health Project — Ayurveda Block Plan",
    slug: "dharmika-health-ayurveda-block",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "15 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-health-ayurveda-block.jpg",
    featured: false,
    short_desc: "Hand-drawn radial layout for the 15-acre Ayurveda Block of the Dharmika Health Project — treatment rooms, chikitsa halls and panchakarma zones arranged around a central water pond.",
    full_desc: `The Ayurveda Block of the Dharmika Health Project is planned as a circular campus with a water pond at the centre — a traditional typology that places the healing element at the heart of the facility. Treatment rooms, Ayurvedic Dhosham and Baktharmoodam halls, waiting spaces and pharmacy zones fan out from the centre in concentric rings, separated by open corridors. The circular geometry ensures that all treatment areas have equal acoustic and visual access to the central pond, reinforcing the therapeutic intent of the environment. At 15 acres, this block alone constitutes a significant institution; its layout achieves a density that feels intimate through the use of curved pathways and layered landscape buffers. The hand-coloured presentation drawing was produced to brief the client on the spatial logic before CAD documentation commenced.`,
  },
  {
    title: "Dharmika Health Project — Allopathy Block Plan",
    slug: "dharmika-health-allopathy-block",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "15 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-health-allopathy-block.jpg",
    featured: false,
    short_desc: "Circular campus layout for the 15-acre Allopathy Block — OPD, emergency, surgical theatres, nursing institute and allopathy pharmacy arranged in a radial plan with a central courtyard.",
    full_desc: `Companion to the Ayurveda Block, the Allopathy Block of the Dharmika Health Project adopts the same radial campus language to organise a full suite of modern medical facilities. The central courtyard anchors a ring of OPD and consultation spaces, with emergency access integrated at the perimeter to ensure rapid vehicle movement without crossing pedestrian zones. Surgical theatres, nursing institute, pharmacy, and specialist consultation blocks occupy the outer ring, sized to accommodate future phased expansion. The nursing institute is planned as a semi-autonomous cluster with its own entry and amenities — it reads as a distinct plinth area of 1.5 acres within the larger 15-acre block. The circular form unifies what would otherwise be a complex multi-programme institution into a legible, wayfindable campus that patients and staff can understand intuitively.`,
  },
  {
    title: "Dharmika Engineering College — Campus Layout",
    slug: "dharmika-engineering-college-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Campus development",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-engineering-college.jpg",
    featured: false,
    short_desc: "Cross-axial engineering college campus layout with a central academic block, four circular garden courtyards, a clock tower and a linear water feature processional axis.",
    full_desc: `The Engineering College campus layout for the Dharmika project is organised around a bold cross-axial geometry — two primary spines intersect at a central academic block, creating four quadrants each anchored by a circular landscaped garden. The long horizontal academic bar provides a continuous teaching corridor with classrooms flanking both sides; the vertical cross-axis contains the clock tower at its crown and a linear water feature processional approach at its base. Four circular garden courts at the quadrant intersections serve as informal gathering spaces between lectures, each planted with specimen trees to provide shade and visual relief from the academic hardscape. The plan balances the formal institutional character of an engineering faculty with a landscape generosity that makes the campus genuinely pleasant to inhabit over long working days.`,
  },
  {
    title: "Dharmika Educational Project — Primary School Layout",
    slug: "dharmika-primary-school-layout",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "1.5 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-primary-school-plan.jpg",
    featured: false,
    short_desc: "Hexagonal classroom cluster layout for a 1.5-acre primary school — honeycomb plan with central playground, activity rooms, hostel block and dual entrance points.",
    full_desc: `The Dharmika Primary School layout explores an unconventional hexagonal classroom typology — each classroom is a hexagonal unit, and units are arranged in a honeycomb cluster around a central playground ellipse. The hexagonal geometry offers practical advantages: shared walls between adjacent classrooms maximise built area within the site boundary, while the non-rectilinear form naturally breaks up long institutional corridors into shorter, more domestic-scaled connections. Activity rooms for dance/music and yoga/meditation are placed at the extremities of the classroom cluster, minimising acoustic interference with core teaching spaces. A hostel block closes the northern boundary, providing accommodation for residential students. The result is a school plan that is simultaneously rigorous in its spatial economy and genuinely unusual in its architectural ambition — precisely the qualities that the Dharmika Educational project demanded.`,
  },
  {
    title: "Dharmika Institutional — High School & Jr. College",
    slug: "dharmika-highschool-jrcollege-layout",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "High school 4 acres / Eng. college 6 acres",
    year_completed: 2021,
    cover_image: "/images/portfolio/dharmika-highschool-jrcollege.jpg",
    featured: false,
    short_desc: "Butterfly-plan institutional campus combining a 4-acre high school and 6-acre junior college — two symmetric wings sharing a central amphitheatre and science laboratory block.",
    full_desc: `The High School and Junior College block of the Dharmika Institutional Project is planned as a butterfly — two symmetrical circular sports grounds flank a central academic spine, with the high school occupying the left wing and the junior college the right. The central spine contains the shared administration, science laboratories and a tiered outdoor amphitheatre at the southern terminus, serving both institutions while maintaining clear separation between student cohorts during the working day. Each circular sports ground is enclosed by a curved classroom corridor that looks inward onto the field, ensuring passive supervision and a sense of enclosure during recreation. The butterfly plan is an unusual formal move for a school, but its functional logic is clear: it maximises green recreation space, provides natural orientation cues for students navigating between facilities, and presents a memorable silhouette at campus scale.`,
  },

  /* ── CAD FLOOR PLANS & ELEVATIONS ────────────────────────────── */
  {
    title: "Anjaneyulu Residence — Two-Bed Floor Plans, Piler",
    slug: "anjaneyulu-residential-piler",
    category_slug: "layouts",
    location: "Piler, Andhra Pradesh",
    area: "35 × 49 ft plot",
    year_completed: 2013,
    cover_image: "/images/portfolio/anjaneyulu-residential-plan.jpg",
    featured: false,
    short_desc: "Ground and first floor plans for a two-bedroom residential unit at Piler — south-facing, with puja room, covered portico and utility-equipped kitchen.",
    full_desc: `Designed for Mr. Anjaneyulu, this two-bedroom residential unit on a compact 35-foot south-facing plot demonstrates efficient planning within tight parameters. The ground floor organises the portico, puja room, living, dining and kitchen in a linear sequence from public to service; the master bedroom with dressing is placed at the rear for privacy. The first floor mirrors the plan with a bedroom, utility and an additional bathroom option. The drawing set — produced in CAD and colour-coded by function — was developed to provide the client with construction-ready documentation and accurate area calculations before tendering.`,
  },
  {
    title: "Jagan Mohan Duplex — Floor Plans, Piler",
    slug: "jaganmohan-duplex-piler",
    category_slug: "layouts",
    location: "Piler, Andhra Pradesh",
    area: "35 × 49 ft plot",
    year_completed: 2012,
    cover_image: "/images/portfolio/jaganmohan-duplex-plan.jpg",
    featured: false,
    short_desc: "Ground and first floor plans for a duplex residence at Piler — north-facing, with portico, puja room, double bedroom, master suite with sit-out, and generous balcony.",
    full_desc: `The Jagan Mohan duplex at Piler is a north-facing residential unit planned to extract maximum liveable area from its plot without compromising on natural light. The ground floor sequences portico, puja, living and dining in a flowing arrangement that opens to a rear bedroom and kitchen; the staircase is positioned to minimise corridor loss. The first floor provides a master bedroom with attached sit-out — a covered outdoor space that functions as a private veranda — alongside a second bedroom with toilet and a generous balcony overlooking the street. The plan has no wasted circulation and every room has at least one exterior-facing window.`,
  },
  {
    title: "CV Reddy — Commercial Floor Plans & Options, Piler",
    slug: "cv-reddy-commercial-piler",
    category_slug: "layouts",
    location: "Piler, Andhra Pradesh",
    area: "Commercial development",
    year_completed: 2013,
    cover_image: "/images/portfolio/cv-reddy-commercial-plan.jpg",
    featured: false,
    short_desc: "Ground and first floor commercial plans for Mr. CV Reddy — retail shop units, office and strong room at ground, with two first-floor layout options for flexible tenanting.",
    full_desc: `The CV Reddy commercial development at Piler is planned as a mixed retail and office building with a strong room at ground level — a configuration typical of commercial complexes that anchor a retail bank or finance tenant alongside multiple shop units. The ground floor plan shows a strong room and main cabin flanking a central parking area, with corridor access to individual shop units at the perimeter. Two first-floor options are provided: Option 1 and Option 2 both offer shop and office combinations but differ in their corridor arrangement and staircase positioning, allowing the client to choose the configuration that best matches their likely tenant mix. This dual-option approach is part of Concord's standard design process for commercial commissions — flexibility at planning stage reduces costly revisions during construction.`,
  },
  {
    title: "Balakrishna Residence — Elevation Study",
    slug: "balakrishna-residence-elevation",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2013,
    cover_image: "/images/portfolio/balakrishna-elevation.jpg",
    featured: false,
    short_desc: "CAD elevation for a proposed residence — contemporary facade with horizontal render banding, large glazing panels and a covered entry canopy.",
    full_desc: `The Balakrishna residence elevation study presents a residential facade in the contemporary vocabulary — horizontal render banding in contrasting tones breaks the mass into readable floor layers, while large glazing panels maximise light penetration and visually connect the interior to the street. A covered entry canopy at ground level creates a weather-protected arrival sequence, and the upper-floor balcony with its clean metal railing reinforces the modern character. The elevation drawing is produced at construction scale, providing sufficient detail for client approval, contractor pricing and facade material scheduling.`,
  },
  {
    title: "Brick Ramana — Duplex Modified Plan",
    slug: "brick-ramana-duplex-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Duplex residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/brickramana-duplex-plan.jpg",
    featured: false,
    short_desc: "Revised duplex floor plan for Brick Ramana — optimised layout with shifted staircase, enlarged living zone and revised bedroom arrangements over two floors.",
    full_desc: `The Brick Ramana duplex plan represents a revision exercise — a common but important phase of the residential design process. The modified plan shows an optimised staircase position that reclaims corridor area for the living room, larger bedroom dimensions on the first floor, and a revised kitchen orientation that improves the relationship between the dining area and the utility yard. The drawing is annotated with dimensions and room labels sufficient for client sign-off before tendering. This kind of iterative layout refinement — responding to client feedback without fundamentally redesigning the spatial logic — is a core Concord service and reflects the practice's commitment to getting the plan right before construction begins.`,
  },
  {
    title: "Dr. Manoj — Kalyanamandapam Block Plan",
    slug: "drmanoj-kalyanamandapam-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Function hall complex",
    year_completed: 2014,
    cover_image: "/images/portfolio/drmanoj-kalyanamandapam.jpg",
    featured: false,
    short_desc: "Block-level plan for a kalyanamandapam (function hall) complex — mandap hall, ante-rooms, kitchen block and parking, laid out across a multi-building campus.",
    full_desc: `The Dr. Manoj Kalyanamandapam is a function hall complex — a typology specific to South Indian social and ceremonial life, demanding large unobstructed hall spans, efficient kitchen facilities capable of serving hundreds, and generous parking. The block plan shows the mandap hall as the dominant volume with ante-rooms on either side for changing and waiting, a separate kitchen block positioned for service access without crossing guest circulation, and parking bays arranged around the perimeter. The drawing addresses the fundamental planning challenge of this building type: how to make a large, necessarily pragmatic facility feel gracious and unhurried in its spatial organisation.`,
  },
  {
    title: "Govindamma Residence — Revised Elevation",
    slug: "govindamma-residence-elevation",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/govindamma-elevation.jpg",
    featured: false,
    short_desc: "Revised residential elevation for the Govindamma property — traditional proportions with contemporary detailing, arched window heads and a corniced parapet.",
    full_desc: `The Govindamma residence elevation revision demonstrates the practice of refining a building's facade character in response to client feedback. The revised elevation retains the traditional residential proportions the client requested — arched window heads, a corniced parapet and symmetrical composition — while introducing contemporary detailing at the balcony railing, entry canopy and window surrounds. The result is a facade that reads as rooted in South Indian residential tradition while avoiding pastiche. The colour rendering indicates the proposed material palette for client approval before construction documentation is finalised.`,
  },
  {
    title: "Kishore Residence — Elevation Options",
    slug: "kishore-residence-elevation",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/kishore-elevation.jpg",
    featured: false,
    short_desc: "Two elevation options for the Kishore residence — exploring contrasting facade treatments for client selection before construction documentation.",
    full_desc: `The Kishore residence elevation drawing presents two design options side by side — a client-facing comparison that allows informed decision-making before committing to construction documentation. The approach reflects Concord's design process: rather than presenting a single elevation and seeking approval, the practice develops at least two substantively different treatments so the client can evaluate how their brief translates into architectural character. Both options respond to the same plan and budget, but differ in their material palette, window proportions and facade articulation. Presenting options at this stage is far less expensive than making changes after construction has begun.`,
  },
  {
    title: "Lakshmi Narayana — Residential Floor Plan",
    slug: "lakshmi-narayana-residential-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2013,
    cover_image: "/images/portfolio/lakshmi-narayana-plan.jpg",
    featured: false,
    short_desc: "Single-unit residential floor plan for the Lakshmi Narayana property — bedroom, living, dining, kitchen and utilities arranged for efficient family use.",
    full_desc: `The Lakshmi Narayana residential plan is a straightforward but carefully considered single-family layout. Room adjacencies are organised around the logical social sequence — living and dining at the front, kitchen and utility at the rear, bedrooms positioned for acoustic separation from the public areas. The drawing includes all structural and partition walls, sanitary fittings in bathroom zones, and furniture layout to demonstrate liveable room dimensions. This level of detail at the planning stage prevents the common problem of rooms that pass area requirements but feel cramped once furnished.`,
  },
  {
    title: "Madhu — Revised Residential Proposal",
    slug: "madhu-revised-residential-proposal",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/madhu-residential-proposal.jpg",
    featured: false,
    short_desc: "Revised residential proposal for the Madhu property — a considered replanning of the original brief to improve room proportions, natural light and circulation.",
    full_desc: `The Madhu residential proposal is the output of a design revision process — the client's initial brief was translated into a first scheme, reviewed, and then meaningfully revised in response to feedback. The revised proposal addresses three principal changes: improved bedroom proportions on the upper floor, a larger living room created by consolidating previously fragmented service spaces, and a revised staircase position that reduces the corridor footprint. The drawing shows the result of this refinement, demonstrating that good layout work is rarely completed in a single pass and that the value of the design service is precisely in this iterative improvement.`,
  },
  {
    title: "Mahadeva Reddy — Residential Elevation",
    slug: "mahadeva-reddy-elevation",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/mahadeva-reddy-elevation.jpg",
    featured: false,
    short_desc: "CAD elevation for the Mahadeva Reddy residence — a clean contemporary facade with horizontal projections, recessed balcony and stone-cladding base.",
    full_desc: `The Mahadeva Reddy elevation is a clean, resolved contemporary residential facade. The horizontal projecting band at first-floor level creates a strong datum line that unifies the composition, while the recessed balcony above reads as a sheltered outdoor room rather than a projecting appendage. A stone-cladding base at ground level grounds the building's massing and provides a maintenance-practical surface at the pedestrian zone. The facade avoids applied ornamentation, relying instead on proportional discipline and material contrast to achieve its character — a signature of Concord's approach to residential elevations.`,
  },
  {
    title: "Nazeer — Residential Floor Plan",
    slug: "nazeer-residential-floor-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/nazeer-floor-plan.jpg",
    featured: false,
    short_desc: "Residential floor plan for the Nazeer property — family home layout with puja room, master suite and double bedroom arranged for privacy and natural light.",
    full_desc: `The Nazeer residential plan addresses a brief for a family home where privacy, natural light and clear room hierarchy were the primary drivers. The puja room is positioned immediately off the entrance — a spatial decision that reflects the family's cultural priorities and signals the home's values at the threshold. The master suite is placed at the rear of the plan for maximum privacy, with a direct connection to the bathroom and a window to the rear garden. The secondary bedroom and living areas are arranged along the street-facing elevation to capture morning light. These decisions produce a plan that is spatially logical and culturally responsive.`,
  },
  {
    title: "Ramana — Residential Plan, Ramana X Road",
    slug: "ramana-residential-x-road",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2013,
    cover_image: "/images/portfolio/ramana-residential-plan.jpg",
    featured: false,
    short_desc: "CAD floor plan for the Ramana residence at Ramana X Road — a corner-plot house design maximising dual road frontage.",
    full_desc: `The Ramana residence at Ramana X Road benefits from a corner-plot configuration that allows windows on two elevations — an advantage that the plan exploits by placing the living and dining areas at the corner to capture cross-ventilation and dual-aspect light. The entry is arranged on the secondary road for a quieter approach, while the main facade addresses the primary road with a more formal composition. Corner plots typically generate planning complications around set-backs and turning radii; this plan manages both cleanly while maximising the built footprint within the permitted development envelope.`,
  },
  {
    title: "Sadashiva — Lift & Stair Core Layout",
    slug: "sadashiva-lift-stair-layout",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Multi-storey building",
    year_completed: 2014,
    cover_image: "/images/portfolio/sadashiva-stair-layout.jpg",
    featured: false,
    short_desc: "Final stair and lift core layout for the Sadashiva multi-storey building — coordinated staircase geometry, lift shaft and landing dimensions for structural submission.",
    full_desc: `The Sadashiva lift and stair core drawing is a technical submission document — the final coordinated layout of the staircase geometry, lift shaft dimensions, landing widths and floor-to-floor heights for a multi-storey residential building. This type of drawing is required by structural engineers for beam sizing and slab penetration coordination, and must be dimensionally precise to within tight tolerances. The drawing shows the resolved conflict between stair headroom, lift shaft clearances and structural grid, demonstrating the detailed technical coordination that underpins all of Concord's construction-phase documentation.`,
  },
  {
    title: "Subramanyam — Residential Floor Plan",
    slug: "subramanyam-residential-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2013,
    cover_image: "/images/portfolio/subramanyam-floor-plan.jpg",
    featured: false,
    short_desc: "Two-floor residential layout for the Subramanyam property — bedrooms, living, dining and kitchen arranged for efficient family use with clear zoning.",
    full_desc: `The Subramanyam residential plan is a clearly zoned two-floor family home. Public and semi-public spaces — living, dining, entry — occupy the front of the plan; private and service spaces — bedrooms, kitchen, bathrooms — are arranged at the rear, creating a natural gradient from the public face to the private interior. The staircase is positioned at the centre of the plan to minimise circulation area while providing equidistant access to all rooms on both floors. The result is a plan that is intuitive to navigate and wastes very little floor area to corridors.`,
  },
  {
    title: "T. Chandraiah — Residential Elevation",
    slug: "tchandraiah-residential-elevation",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/tchandraiah-elevation.jpg",
    featured: false,
    short_desc: "CAD elevation for the T. Chandraiah residence — a traditional-contemporary hybrid facade with arched window detailing, stone base cladding and a tiled roof canopy.",
    full_desc: `The T. Chandraiah residential elevation bridges traditional South Indian residential character with contemporary detailing. The arched window heads and stone base cladding root the building in the regional residential vernacular, while the clean render finish, minimal cornice detail and contemporary balcony railing bring it into the present. This hybrid approach is frequently requested by clients who want a home that feels culturally familiar while not appearing dated — it requires careful calibration of which traditional elements to retain and which to reinterpret rather than copy.`,
  },
  {
    title: "Vijay Bhasker Reddy — Residential Floor Plan",
    slug: "vijaybhasker-reddy-plan",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2014,
    cover_image: "/images/portfolio/vijaybhasker-floor-plan.jpg",
    featured: false,
    short_desc: "Residential floor plan for Vijay Bhasker Reddy — a well-proportioned family home with puja, master suite, two further bedrooms and a generous living-dining zone.",
    full_desc: `The Vijay Bhasker Reddy residential plan is notable for its generous living-dining zone — a conscious decision to prioritise the household's primary shared space over maximising bedroom count. The puja room is placed at the junction between the entrance and the living area, functioning as both a spiritual anchor and an architectural marker of the transition from public to family space. The master suite has a dedicated dressing area and attached bathroom, while the two secondary bedrooms share a common bathroom with dual-access from the landing. The plan demonstrates that thoughtful room-by-room programming — not just area allocation — is what makes a house genuinely liveable.`,
  },
  {
    title: "Vikky Residence — Contemporary Elevation",
    slug: "vikky-residence-elevation",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Residential",
    year_completed: 2015,
    cover_image: "/images/portfolio/vikky-residence-elevation.jpg",
    featured: false,
    short_desc: "Contemporary residential elevation for the Vikky property — asymmetric facade composition with horizontal teak cladding panels, a recessed upper floor and dramatic double-height glazing.",
    full_desc: `The Vikky residence elevation is one of the more formally ambitious residential drawings in the portfolio. The facade is deliberately asymmetric — a vertical teak-clad column element on the left anchors a composition of receding horizontal planes to the right, creating a dynamic silhouette that resists the blandness of pure symmetry. Double-height glazing at the ground-floor living area animates the street elevation and draws light deep into the plan; the recessed upper floor above reduces the apparent massing of the building when viewed from close range. The result is a residential facade that reads as designed — architecturally confident rather than merely finished.`,
  },
  {
    title: "Amarnath Lodge — Development Layout",
    slug: "amarnath-lodge-layout",
    category_slug: "layouts",
    location: "Hyderabad",
    area: "Lodge / hospitality",
    year_completed: 2014,
    cover_image: "/images/portfolio/amarnath-lodge-plan.jpg",
    featured: false,
    short_desc: "Floor plan layout for Amarnath Lodge — a budget hospitality development with reception, room cluster, restaurant and service areas configured for operational efficiency.",
    full_desc: `The Amarnath Lodge layout is a hospitality planning exercise — a compact budget lodge with the key operational requirement that guest rooms, reception and restaurant function independently without circulation conflicts. The plan achieves this through a clear zoning strategy: reception and restaurant front the main road to maximise street presence and visibility; guest rooms are placed at the rear for acoustic privacy; service and staff areas are connected directly to the kitchen without crossing guest circulation. The room cluster is sized and arranged to maximise the number of units within the plot, with each room having at least one window to an external face. This kind of operational-first planning is essential for hospitality projects at any scale.`,
  },
  {
    title: "Vikky Guntoor — Residential Plan",
    slug: "vikky-guntoor-residential-plan",
    category_slug: "layouts",
    location: "Guntur, Andhra Pradesh",
    area: "Residential",
    year_completed: 2015,
    cover_image: "/images/portfolio/vikky-guntoor-plan.jpg",
    featured: false,
    short_desc: "Residential floor plan for the Vikky property in Guntur — a straightforward family home layout optimised for the client's lifestyle and local construction norms.",
    full_desc: `The Vikky Guntur residence is a family home designed in response to the specific lifestyle requirements and construction norms of Guntur. The plan adopts a direct, unpretentious approach — every square foot is allocated to liveable space rather than architectural gesture, and the room arrangement follows the logic of daily family life rather than a formal compositional scheme. This kind of unglamorous but fundamentally useful planning is the majority of residential architectural practice and represents a significant part of Concord's client offer: thoughtful, well-detailed plans that ordinary families can build confidently within standard budgets.`,
  },

  /* ── COMMERCIAL — VEERABHADRA SHOPPING MALL ──────────────────── */
  {
    title: "Veerabhadra Shopping Mall — Day & Night Renders",
    slug: "veerabhadra-shopping-mall-render",
    category_slug: "commercial",
    location: "Hyderabad",
    area: "12,000 sq ft",
    year_completed: 2015,
    cover_image: "/images/portfolio/veerabhadra-mall-daytime-render.jpg",
    featured: true,
    short_desc: "Day and night 3D renders for the Veerabhadra Shopping Mall — a three-storey commercial development with a textiles, readymades and jewellery tenant mix, green-and-yellow ACP facade.",
    full_desc: `The Veerabhadra Shopping Mall render set demonstrates how a single facade design performs across radically different lighting conditions — a test that few commercial buildings pass as convincingly as this one. By day, the lime-green and yellow-orange ACP panel cladding reads as bold and energetic against a clear sky; the large glazed upper floor puts the retail activity on display to the street, functioning as a live advertisement for the tenant below. By night, the building transforms entirely: the exterior cladding recedes into the dark, and the illuminated glazing, signage halo and threshold lighting create a beacon of commercial energy. The dual-render presentation was used to give the client and branding team confidence that the building would deliver high visibility in both day and evening trading conditions — a critical consideration for a jewellery and textiles retail destination that trades into the evening. The rendered facade also illustrates the staircase and entrance canopy arrangement, allowing the client to walk through the approach experience in the design stage.`,
  },

];

async function seed() {
  // Remove the renovation project
  const [delResult] = await pool.query(
    "DELETE FROM projects WHERE slug = 'contemporary-home-renovation-mysore'"
  );
  if (delResult.affectedRows > 0) {
    console.log("  ✓ removed  contemporary-home-renovation-mysore");
  } else {
    console.log("  skip  renovation (already removed)");
  }

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
  console.log(`\nDone — ${created} created, ${skipped} skipped. Renovation removed.`);
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
