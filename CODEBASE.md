# Concord Interior Concepts — Codebase Reference

**Client:** Concord Interior Concepts (CIC)  
**Positioning:** "A Design, Build & Development Consultancy" — premium architecture studio, not a contractor site  
**Founded:** 2020  
**Stack:** React + Vite (frontend) · Express + MySQL (backend)

---

## Table of Contents

1. [Repository Layout](#1-repository-layout)
2. [Tech Stack & Versions](#2-tech-stack--versions)
3. [Development Setup](#3-development-setup)
4. [Database Schema](#4-database-schema)
5. [Backend — Express API](#5-backend--express-api)
6. [Frontend — Routing & App Shell](#6-frontend--routing--app-shell)
7. [Public Pages](#7-public-pages)
8. [Shared Components](#8-shared-components)
9. [Admin Panel](#9-admin-panel)
10. [Design System](#10-design-system)
11. [Image Pipeline](#11-image-pipeline)
12. [Content Source of Truth](#12-content-source-of-truth)
13. [CMS & Seed Scripts](#13-cms--seed-scripts)
14. [Deployment](#14-deployment)
15. [Key Patterns & Conventions](#15-key-patterns--conventions)

---

## 1. Repository Layout

```
concorde-web/
├── client/                      # Vite + React SPA
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json              # Vercel routing config (SPA rewrites)
│   ├── .env                     # VITE_API_URL=...
│   └── src/
│       ├── App.jsx              # Router, SmoothScroll, PublicLayout
│       ├── main.jsx             # React DOM entry
│       ├── index.css            # Tailwind v4 theme + global utilities
│       ├── api/
│       │   ├── axios.js         # Axios instance, JWT interceptor
│       │   ├── projects.js
│       │   ├── services.js
│       │   ├── categories.js
│       │   ├── enquiries.js
│       │   └── settings.js
│       ├── components/
│       │   ├── Navbar.jsx       # Glassmorphism floating capsule navbar
│       │   ├── Footer.jsx       # Four-column ink-forest footer
│       │   ├── ScrollJourney.jsx # Cinematic 5-scene GSAP hero
│       │   ├── ConnectCTA.jsx   # Reusable "Let's Connect" closing banner
│       │   ├── WhatsAppButton.jsx
│       │   ├── SEOHead.jsx
│       │   ├── Gallery.jsx
│       │   ├── BeforeAfter.jsx
│       │   ├── ProjectCard.jsx
│       │   ├── ServiceCard.jsx
│       │   ├── TestimonialCard.jsx
│       │   ├── Testimonials.jsx
│       │   ├── HeroSection.jsx
│       │   ├── Counter.jsx
│       │   ├── Loader.jsx
│       │   ├── SkeletonCard.jsx
│       │   ├── ScrollReveal.jsx
│       │   └── SectionHeader.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Services.jsx
│       │   ├── Portfolio.jsx
│       │   ├── ProjectDetail.jsx
│       │   └── Contact.jsx
│       ├── admin/
│       │   ├── AdminLayout.jsx
│       │   ├── AdminRoute.jsx   # Protected route wrapper
│       │   ├── Login.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ManageProjects.jsx
│       │   ├── ManageCategories.jsx
│       │   ├── ManageServices.jsx
│       │   ├── ManageEnquiries.jsx
│       │   └── SiteSettings.jsx
│       ├── context/
│       │   └── AuthContext.jsx  # JWT auth state
│       ├── hooks/
│       │   ├── useFetch.js
│       │   └── useScrollReveal.js
│       ├── assets/
│       │   ├── logo-mark.png    # Circular mark for navbar/footer
│       │   ├── logo-light.png
│       │   ├── logo-nav.png
│       │   └── logo.png
│       └── data/
│           └── imageManifest.json  # Categorised list of all image filenames
│
├── server/                      # Express API
│   ├── server.js                # Entry point, middleware, route mounting
│   ├── .env                     # DB credentials, JWT_SECRET, PORT, CLIENT_URL
│   ├── models/
│   │   ├── db.js                # mysql2 connection pool
│   │   └── schema.sql           # CREATE TABLE statements
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── categoryController.js
│   │   ├── serviceController.js
│   │   ├── settingController.js
│   │   └── enquiryController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── categories.js
│   │   ├── services.js
│   │   ├── settings.js
│   │   ├── enquiries.js
│   │   └── testimonials.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── upload.js            # Multer config → /server/uploads/
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── seeds/
│   │   ├── seedContent.js       # Seeds services + brand settings from content doc
│   │   └── createAdmin.js       # Creates the first admin user
│   └── uploads/                 # Admin-uploaded images (served as static)
│
├── Selected Images/             # Source images (not deployed)
│   ├── interior/   (96 photos)
│   ├── elevations/ (32 drawings)
│   ├── layouts/    (40 plans)
│   └── views/      (6 images)
│
├── CIC-WEB-CONTENT.md           # Source of truth for all copy
├── CIC PORTFOLIO.pdf            # Original brand PDF
└── CODEBASE.md                  # This file
```

---

## 2. Tech Stack & Versions

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Animation | GSAP + ScrollTrigger, Framer Motion, Lenis (smooth scroll) |
| HTTP client | Axios (with JWT interceptor) |
| Backend | Express.js, Node.js (ESM) |
| Database | MySQL (`concorde_db`) via `mysql2` connection pool |
| Auth | JWT (`jsonwebtoken`), bcrypt for password hashing |
| File uploads | Multer → `/server/uploads/` |
| Fonts | Cormorant Garamond (display/serif), Inter (body/UI), Pinyon Script (deprecated) |

---

## 3. Development Setup

```bash
# Frontend (port 5173)
cd client && npm install && npm run dev

# Backend (port 3000)
cd server && npm install && node server.js
```

**Environment variables:**

`server/.env`
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Chintu@Milarch@2500
DB_NAME=concorde_db
PORT=3000
JWT_SECRET=concorde_super_secret_2026
CLIENT_URL=http://localhost:5173
```

`client/.env`
```
VITE_API_URL=/api          # dev: proxied by Vite; prod: absolute backend URL
```

**Seed database (run after schema reset):**
```bash
cd server && node seeds/seedContent.js
node seeds/createAdmin.js
```

---

## 4. Database Schema

### `admin_users`
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| username | VARCHAR(100) UNIQUE | |
| password_hash | VARCHAR(255) | bcrypt |
| created_at | TIMESTAMP | |

### `categories`
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| name | VARCHAR(100) | |
| slug | VARCHAR(100) UNIQUE | |
| icon | VARCHAR(100) | |
| display_order | INT | |

### `projects`
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| title | VARCHAR(255) | |
| slug | VARCHAR(255) UNIQUE | Used in URL `/portfolio/:slug` |
| category_id | INT FK → categories | |
| location | VARCHAR(255) | |
| area | VARCHAR(50) | |
| year_completed | INT | |
| short_desc | TEXT | |
| full_desc | LONGTEXT | Supports HTML |
| cover_image | VARCHAR(500) | Path relative to uploads or absolute |
| status | ENUM('published','draft') | Default: draft |
| featured | TINYINT | 0/1 |

### `project_images`
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| project_id | INT FK → projects (CASCADE DELETE) | |
| image_path | VARCHAR(500) | |
| sort_order | INT | |
| is_before | TINYINT | For BeforeAfter slider |
| is_after | TINYINT | For BeforeAfter slider |

### `services`
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| title | VARCHAR(255) | |
| tagline | VARCHAR(255) | Short discipline tagline |
| description | TEXT | |
| features | TEXT | JSON array of feature strings |
| icon | VARCHAR(100) | |
| image | VARCHAR(500) | |
| display_order | INT | |

### `site_settings`
| Column | Type | Notes |
|---|---|---|
| key | VARCHAR(100) PK | |
| value | LONGTEXT | |

Key names used: `company_name`, `company_tagline`, `company_address`, `company_phone`, `company_email`, `whatsapp_number`, `footer_message`, `hero_tagline`, `brand_story_long`, `brand_statement`, `about_headline`, `vision_statement`, `mission_statement`, `brand_philosophy`, `service_philosophy`, `brand_promise`, `brand_usp`, `core_values` (JSON), `founding_year`, `instagram`, `facebook`, `linkedin`, `youtube`, `twitter`

### `enquiries`
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| name | VARCHAR(255) | |
| email | VARCHAR(255) | |
| phone | VARCHAR(50) | |
| message | TEXT | |
| service | VARCHAR(100) | |
| created_at | TIMESTAMP | |
| read_status | TINYINT | 0 = unread |

### `testimonials`
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| client_name | VARCHAR(255) | |
| designation | VARCHAR(255) | |
| company | VARCHAR(255) | |
| review_text | TEXT | |
| rating | INT | Default 5 |
| photo | VARCHAR(500) | |
| display_order | INT | |
| is_active | TINYINT | |

---

## 5. Backend — Express API

**Base URL:** `http://localhost:3000` (dev) / configured via `CLIENT_URL` env var

**Middleware stack:** `helmet` → `cors` (whitelist from `CLIENT_URL`) → `morgan` → `express.json` → `/uploads` static files → routes → error handler

### Route Summary

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Returns JWT token |
| GET | `/api/projects` | — | All published projects; params: `featured`, `limit`, `category` |
| GET | `/api/projects/stats` | — | `{ totalProjects, yearsExperience, happyClients, awardsWon }` |
| GET | `/api/projects/:slug` | — | Single project + gallery images |
| POST | `/api/projects` | ✓ | Create project |
| PUT | `/api/projects/:id` | ✓ | Update project |
| DELETE | `/api/projects/:id` | ✓ | Delete project |
| GET | `/api/categories` | — | All categories |
| POST | `/api/categories` | ✓ | Create category |
| GET | `/api/services` | — | All services ordered by `display_order` |
| PUT | `/api/services/:id` | ✓ | Update service |
| GET | `/api/settings` | — | All site settings as `{ key: value }` flat object |
| PUT | `/api/settings` | ✓ | Batch upsert settings |
| POST | `/api/enquiries` | — | Submit contact form |
| GET | `/api/enquiries` | ✓ | All enquiries |
| PUT | `/api/enquiries/:id/read` | ✓ | Mark as read |
| GET | `/api/testimonials` | — | Active testimonials |

**JWT auth:** Token stored in `localStorage` as `cc_token`. The Axios instance in `client/src/api/axios.js` automatically attaches it as `Authorization: Bearer <token>`.

**File uploads:** Multer writes to `server/uploads/`. Express serves them at `/uploads/<filename>`. The `imgUrl()` helper in each page converts paths:
```js
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};
```

---

## 6. Frontend — Routing & App Shell

**Entry:** `client/src/App.jsx`

### Routes

| Path | Component | Layout |
|---|---|---|
| `/` | `Home` | `PublicLayout` |
| `/portfolio` | `Portfolio` | `PublicLayout` |
| `/portfolio/:slug` | `ProjectDetail` | `PublicLayout` |
| `/services` | `Services` | `PublicLayout` |
| `/about` | `About` | `PublicLayout` |
| `/contact` | `Contact` | `PublicLayout` |
| `/admin/login` | `AdminLogin` | None |
| `/admin/*` | `AdminLayout` + children | `AdminRoute` (JWT guard) |

**PublicLayout:** wraps pages with `<Navbar />`, `<main>`, `<Footer />`, `<WhatsAppButton />`.

**SmoothScroll:** A `useEffect` component mounts Lenis (lerp 0.09) on non-admin routes, syncs it with GSAP's ScrollTrigger RAF, and scrolls to top + refreshes ScrollTrigger on route change. Skipped for `prefers-reduced-motion` and on mobile (Lenis default).

**Code splitting:** All pages and admin components are `React.lazy`-loaded. The fallback `<Loader />` renders an ivory background with a spinning gold border circle.

---

## 7. Public Pages

### Home (`/`)

Sections in order:

1. **ScrollJourney** — Cinematic GSAP hero (5 scenes pinned over 500vh). See component section below.
2. **Building Beyond Structures** — Ivory editorial section, brand statement copy.
3. **Interior Portraits** — Ink-background horizontal-scroll gallery (GSAP pinned on desktop, native snap-scroll on mobile). 6 curated room photos + a "See every room" portal card → `/portfolio`.
4. **What We Create** — Five disciplines (A–E) as alternating editorial rows (image left/right toggle). CMS-driven: fetches `/api/services`, falls back to `DISCIPLINES` constants.
5. **The Concord Approach** — Ink-background grid of 5 glassmorphism cards (01 Discover → 05 Evolve).
6. **Why Concord** — Ivory-warm background, 6 feature pillars with hairline dividers.
7. **ConnectCTA** — Shared closing banner.

### About (`/about`)

Sections:
1. Hero banner — 60vh photo with layered scrim, "Designing Experiences. Building Possibilities."
2. Brand Story — chapter-style `01 / Who We Are` layout, CMS `brand_story_long`.
3. Stats bar — dark band with CountUp counters (projects, years, clients, awards). Fetches `/api/projects/stats`.
4. Our Philosophy — 4 pillars on white (Design/Build/Deliver/Sustain).
5. Sustainability — Deep-forest band, 8 verbatim sustainability items from content doc.
6. Vision & Mission — Conditional: only renders if CMS keys `vision_statement` / `mission_statement` are set.
7. Core Values — Conditional: renders from `core_values` JSON in settings. Hover glassmorphism cards with icon plates.
8. Brand Philosophy — Pull quote from `brand_philosophy` setting.
9. Service Philosophy — from `service_philosophy` setting.
10. Brand Promise & USP — from `brand_promise` / `brand_usp` settings.
11. ConnectCTA.

### Services (`/services`)

Sections:
1. Hero — 2-col editorial layout with floating stat ("5 Integrated Disciplines").
2. Services Accordion — 5 `ServiceBlock` components; each is an expandable card showing image, description, and features list. First item open by default. CMS-driven via `/api/services`.
3. Why Concord (What Sets Us Apart) — Dark blueprint-grid section, 6 hover cards with line-art icon plates.
4. The Concord Approach — 5-column process strip.
5. FAQ — 6 accordion items (static copy).
6. ConnectCTA.

### Portfolio (`/portfolio`)

- Sticky filter bar (category pills) — CMS-driven via `/api/categories`.
- Bento 12-column grid: pattern repeats every 5 cards (large/medium/small sizing, alternating left/right for the large card).
- Cards link to `/portfolio/:slug`. Hover reveals location/year meta + arrow icon.
- Empty state: text message when no projects match active filter.
- ConnectCTA at bottom.

### ProjectDetail (`/portfolio/:slug`)

- Fetches `/api/projects/:slug`.
- Cover image hero with metadata overlay.
- Full description (`.prose-project` styled HTML).
- Gallery lightbox with keyboard navigation.
- BeforeAfter slider if `is_before`/`is_after` images exist in `project_images`.

### Contact (`/contact`)

- Hero with "Let's Connect" typography (forest `clamp(64px–160px)` headline).
- Two-column layout: form (left) + sticky sidebar (right).
- Form fields: Full Name*, Email*, Phone, Service (select), Message*. Client-side validation + POST to `/api/enquiries`.
- Success state replaces form with thank-you message.
- Sidebar shows contact details from CMS settings + WhatsApp deep-link.
- Office Hours card: Mon–Sat 9 AM–7 PM.

---

## 8. Shared Components

### `ScrollJourney` — Cinematic Hero

Desktop-only (mobile renders `StaticHero`). 500vh GSAP ScrollTrigger timeline pinned on a single viewport, crossfading 4 full-bleed background images:

| Scene | Image | Word |
|---|---|---|
| 1 | `doc-image-3.jpg` (living room) | "We Design." |
| 2 | `doc-image-4.jpg` (construction) | "We Build." |
| 3 | `doc-image-1.jpg` (villa + pool) | "We Transform." |
| 4 | `doc-image-2.jpg` (resort) | Brand statement + counters + CTAs |
| 5 | (overlay panel) | Preview cards → Portfolio / Services / About |

Timeline uses GSAP scrub (1.5) with Ken Burns zoom, crossfade opacity, and content layer y-translations. A right-edge gold progress bar tracks scroll position.

### `Navbar`

Fixed, floating glass-capsule (border-radius 999px). Three visual modes based on route and scroll:
- `transparent` — on home page during the ScrollJourney, dark text/links on translucent dark glass.
- `glass-light` — on all other pages, light frosted glass.
- `solid-dark` — on home page after the ScrollJourney.

Logo: steel-grey circular disc (gradient `#838B93 → #778088`) containing `logo-mark.png`, plus two-line serif wordmark ("Concord / Interior Concepts") and beige strapline ("Constructions | Interiors | Consultants").

Desktop: pill-shaped NavLinks + gold "Get a Quote" CTA button.  
Mobile (≤980px): hamburger → animated dropdown glass card.

Company name is fetched from `/api/settings` on mount and replaces the default if set.

### `Footer`

Four-column dark ink-forest gradient:
1. Brand mark + wordmark + tagline + social links.
2. Quick Links.
3. Services list (six disciplines named).
4. Contact details + WhatsApp button.

All content is CMS-driven via `/api/settings`. Falls back to empty strings if settings are not set.

### `ConnectCTA`

Reusable "Let's Connect" closing banner used on Home, About, Services, Portfolio.  
Forest-deep background, compass arc SVG motif, glassmorphism content box, two CTA buttons ("Book a Consultation" → `/contact`, "Discover Our Work" → `/portfolio`).

### `WhatsAppButton`

Floating fixed WhatsApp button. Number from CMS `whatsapp_number` setting.

---

## 9. Admin Panel

Route: `/admin` (protected by `AdminRoute` → checks `localStorage.cc_token` validity via `AuthContext`).

| Sub-route | Component | Function |
|---|---|---|
| `/admin` (index) | `Dashboard` | Stats overview |
| `/admin/projects` | `ManageProjects` | CRUD projects + image upload |
| `/admin/categories` | `ManageCategories` | CRUD categories |
| `/admin/services` | `ManageServices` | Edit service tagline + features (one per line) |
| `/admin/enquiries` | `ManageEnquiries` | View + mark-read enquiries |
| `/admin/settings` | `SiteSettings` | Edit all `site_settings` keys |

**Login:** `/admin/login` — POST `/api/auth/login` → stores JWT in `localStorage` as `cc_token`.

---

## 10. Design System

### Brand Palette

| Token | Hex | Usage |
|---|---|---|
| INK | `#181815` | Primary text, dark backgrounds |
| INK_SOFT | `#22221E` | Slightly lifted dark (used as `NAVY` in older pages) |
| IVORY | `#F5F0EB` | Page background, light text on dark |
| IVORY_WARM | `#F2EDE5` | `paper-bg` utility |
| BEIGE / GOLD | `#FBB316` | Primary accent — buttons, eyebrows, counters, hairlines |
| BEIGE_DEEP / GOLD_D | `#DE9E08` | Darker hover state for gold |
| FOREST | `#2C4A3B` | Secondary accent — links, forest buttons, chapter numerals |
| FOREST_DEEP | `#1C332A` | ConnectCTA background |
| FOREST_LIGHT | `#7FA08C` | Muted forest (used as `PORTFOLIO_RED_LIGHT` in older pages) |
| STEEL | `#778088` | Logo disc gradient mid-point |

> **Legacy naming convention (per July 2026 rebrand):** Older page files use `NAVY` for `INK_SOFT`, `GOLD` for `BEIGE`, and `PORTFOLIO_RED` for `FOREST`. The variable values are correct; only the names differ.

### Typography

- **Display / headings:** `Cormorant Garamond` — weights 300/400/500/600/700, italic variants used throughout.
- **Body / UI:** `Inter` — weights 300/400/500/600.
- **Script (retired):** `Pinyon Script` — imported but not actively used in the July 2026 rebrand.

### CSS Utility Classes (from `index.css`)

| Class | Description |
|---|---|
| `.glass` | Light frosted card (white 55%, blur 20px) |
| `.glass-dark` | Dark frosted card (ink 45%, blur 20px) |
| `.btn-forest` | Forest pill button (ivory text) |
| `.btn-gold` / `.btn-beige` | Gold pill button (ink text) |
| `.btn-outline` | Outline pill, inverts on hover |
| `.btn-navy` | Ink pill button |
| `.paper-bg` | Ivory warm background with subtle radial gradients |
| `.dashed-frame` | Fine 1px solid forest hairline border (border-radius 24px) |
| `.chapter-num` | Large forest serif numeral (clamp 56–110px) with gold period via `::after` |
| `.chapter-label` | Wide-tracked 11px uppercase forest sans-serif label |
| `.section-title` | 4xl–5xl serif heading |
| `.section-pad` | `py-24 md:py-32` |
| `.container-max` | `max-w-7xl mx-auto px-6 md:px-12` |
| `.gold-line` / `.beige-line` | 1px gold hairline, 3rem wide |
| `.forest-line` | 1px forest hairline |
| `.text-gold` / `.text-beige` | `#FBB316` |
| `.text-forest` | `#2C4A3B` |
| `.text-navy` / `.text-ink` | `#181815` |
| `.prose-project` | Rich-text styles for project full descriptions |

### Animation Pattern

Every content section uses a local `FadeIn` wrapper:
```jsx
function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
```
Staggered children use `delay={index * 0.05–0.09}`.

---

## 11. Image Pipeline

### Static Images (Vite-served)

```
client/public/images/
├── brand/           # 8 doc-extracted images (doc-image-1.jpg … doc-image-8.jpg)
├── interiors/       # ~80 interior photos
├── construction/    # elevation/construction photos
└── layouts/         # floor plan images
```

- **Enhancement script:** `/tmp/enhance_images.py` (Python PIL) — Contrast 1.18, Sharpness 1.30, Color 1.08, Brightness 1.04, JPEG quality 88. Re-run after adding new images.
- **doc-image-6.jpg** has a watermark — avoid using it in prominent positions.
- `client/src/data/imageManifest.json` — categorised filename list.

### Admin-Uploaded Images (Express-served)

- Multer writes to `server/uploads/`.
- Served via Express at `/uploads/<filename>`.
- The `imgUrl()` helper handles both static (`/images/…`) and upload paths.

---

## 12. Content Source of Truth

**File:** `CIC-WEB-CONTENT.md` (repo root) — extracted verbatim from the client's Word document.

### The Five Disciplines (A–E)

| Letter | Title | Tagline |
|---|---|---|
| A | Design & Development | Land to Lifestyle. |
| B | Architecture & Construction | Building enduring spaces with precision. |
| C | Landscape Architecture | Where nature and design become one. |
| D | Interior Design & Turnkey Execution | Spaces designed around people. |
| E | Smart Living & Smart Workspaces | Technology integrated seamlessly into everyday experiences. |

### The Concord Approach

01 Discover → 02 Design → 03 Develop → 04 Deliver → 05 Evolve

### Hero Journey (ScrollJourney scenes)

"We Design." / "We Build." / "We Transform." → brand statement → preview cards

### Sustainability Items (About page)

Climate Responsive Design · Water Conservation · Rainwater Management · Natural Ventilation · Energy Efficiency · Sustainable Materials · Green Landscapes · Long-Life Building Systems

### Footer Tagline

"Designing Spaces. Building Experiences. Creating Sustainable Futures."

---

## 13. CMS & Seed Scripts

### `server/seeds/seedContent.js`

Run with: `node seeds/seedContent.js`

What it does:
1. Migrates `services` table — adds `tagline` and `features` columns if missing.
2. Upserts all 5 disciplines with doc-verbatim copy (matches by `title`).
3. Deletes any services not in the 5-discipline list.
4. Refreshes brand settings (always overwrites): `company_name`, `company_tagline`, `hero_tagline`, `hero_sub_tagline`, `brand_statement`, `footer_message`, `brand_story_long`, `about_headline`.
5. Inserts defaults only if absent: `founding_year`.

**Run this after any schema reset.**

### `server/seeds/createAdmin.js`

Creates the first admin user. Set username/password inside the script before running.

### CMS-Driven Pages

- **Services page + Home "What We Create"** — fetch `/api/services` first; fall back to inline `DISCIPLINES`/`FALLBACK_SERVICES` constants if API is unreachable.
- **About page** — fetches `/api/settings` for `brand_story_long`, `vision_statement`, `mission_statement`, `brand_philosophy`, `service_philosophy`, `brand_promise`, `brand_usp`, `core_values`.
- **Navbar** — fetches `company_name` from `/api/settings`.
- **Footer** — fetches all contact/social/tagline settings.
- **Contact sidebar** — fetches phone, email, address, whatsapp from settings.

---

## 14. Deployment

### Frontend

Deployed on **Vercel** (project linked at `client/.vercel/`).

`client/vercel.json` — redirects all paths to `index.html` for SPA routing.

`client/.env` for production: set `VITE_API_URL` to the backend's public URL.

### Backend

Runs on a separate server. `server/.env` `CLIENT_URL` must include the Vercel deployment URL to pass CORS (comma-separated for multiple origins).

---

## 15. Key Patterns & Conventions

### imgUrl() Helper

Present in every page file that displays images. Pattern:
```js
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};
```

### CMS Fallback Pattern

Every data-driven section has hardcoded fallback constants matching the content doc. The API call fires on mount; on success it replaces the constants; on error the page silently uses fallbacks — no error states shown to the public.

### Brand Token Naming

Pages use inline `const` declarations for brand tokens rather than referencing CSS variables (exception: utilities in `index.css`). The naming diverges between older and newer files:
- `NAVY` = `#22221E` (same as `INK_SOFT`)
- `GOLD` = `#FBB316` (same as `BEIGE`)
- `PORTFOLIO_RED` = `#2C4A3B` (same as `FOREST`)
- `PORTFOLIO_RED_LIGHT` = `#7FA08C` (same as `FOREST_LIGHT`)

### Server-Side Ports

- Frontend dev server: **5173**
- Backend API: **3000** (default) / `PORT` env var
- Do NOT kill either server while developing — verify with `curl` instead.

### Admin Auth Flow

1. `POST /api/auth/login` → returns `{ token }`.
2. Stored in `localStorage` as `cc_token`.
3. `AuthContext` exposes `{ token, setToken, logout }`.
4. `AdminRoute` redirects to `/admin/login` if no valid token.
5. Axios interceptor auto-attaches the token to every request.

### Scroll Behaviour

- Lenis smooth-scroll (lerp 0.09) on all public pages, synced with GSAP ticker.
- Disabled for: admin routes, `prefers-reduced-motion` users.
- `SmoothScroll` component also calls `window.scrollTo(0,0)` and `ScrollTrigger.refresh()` on every route change.
- Portfolio filter bar uses `position: sticky; top: 76px` (navbar scrolled height).
