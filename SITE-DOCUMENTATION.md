# Concord Interior Concepts — Website Documentation

**Last updated:** July 2026  
**Brand:** Concord Interior Concepts (CIC)  
**Positioning:** *A Design, Build & Development Consultancy* — premium architecture studio  
**Founded:** 2020

---

## Table of Contents

1. [Stack Overview](#stack-overview)
2. [Brand Tokens](#brand-tokens)
3. [Running the Project](#running-the-project)
4. [Project Structure](#project-structure)
5. [Pages](#pages)
6. [Components](#components)
7. [CMS Architecture](#cms-architecture)
8. [Admin Panel](#admin-panel)
9. [API Routes](#api-routes)
10. [Image Pipeline](#image-pipeline)
11. [Design System](#design-system)
12. [Deployment](#deployment)

---

## Stack Overview

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite (port 5173) |
| Styling | TailwindCSS v4 + inline styles |
| Routing | React Router v6 |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| Smooth scroll | Lenis (lerp 0.09, synced with GSAP ticker) |
| Backend | Express.js (port 3000 / 5000) |
| Database | MySQL — database: `concorde_db` |
| Auth | JWT (`concorde_super_secret_2026`) |
| Image upload | Multer → `server/uploads/` |

---

## Brand Tokens

All tokens are defined in `client/src/index.css` inside the `@theme {}` block and used as JS constants in every component.

| Token | Hex | Usage |
|---|---|---|
| `INK` | `#181815` | Primary text, dark backgrounds |
| `IVORY` | `#F5F0EB` | Page background, light text on dark |
| `AMBER / BEIGE` | `#FBB316` | CTA buttons, active links, headings on dark, strapline |
| `AMBER_LIGHT` | `#FCC94E` | Button hover states |
| `AMBER_DEEP` | `#DE9E08` | Pressed state |
| `FOREST` | `#2C4A3B` | Secondary accent, approach steps, forest sections |
| `FOREST_DEEP` | `#1C332A` | ConnectCTA background, darker forest panels |
| `FOREST_LIGHT` | `#7FA08C` | Muted forest accents |
| `STEEL` | `#778088` | Logo circle plate background |

**Fonts:**
- **Cormorant Garamond** — all headings, wordmark, display numerals, italic body pull-quotes
- **Inter** — body text, labels, navigation, buttons, uppercase eyebrows
- *(Pinyon Script retained in CSS but not actively used)*

---

## Running the Project

### Development

```bash
# Terminal 1 — Frontend
cd client
npm run dev          # http://localhost:5173

# Terminal 2 — Backend
cd server
npm run dev          # http://localhost:3000 (or 5000)
```

### Seed the database

Run once after a schema reset or fresh install:

```bash
cd server
node seeds/seedContent.js
```

This seeds the 5 service disciplines with taglines + sub-services, and 8 `site_settings` keys (company name, taglines, brand story, footer message, etc.).

---

## Project Structure

```
concorde-web/
├── client/
│   ├── public/
│   │   └── images/
│   │       ├── brand/          ← doc-image-1..8.jpg (extracted from client doc)
│   │       ├── interiors/      ← interior photography
│   │       └── construction/   ← construction site photos
│   └── src/
│       ├── assets/
│       │   └── logo-mark.png   ← circular iC mark (RGBA, no background)
│       ├── api/                ← Axios wrappers per resource
│       ├── components/         ← Shared UI components
│       ├── context/            ← AuthContext (JWT)
│       ├── hooks/              ← useFetch, useScrollReveal
│       ├── pages/              ← Public page components
│       ├── admin/              ← CMS panel (lazy loaded, JWT-protected)
│       ├── App.jsx             ← Router, Lenis, route tree
│       ├── index.css           ← Tailwind + brand tokens + glass utilities
│       └── main.jsx
├── server/
│   ├── controllers/            ← Business logic per resource
│   ├── middleware/             ← Auth middleware (JWT verify)
│   ├── models/                 ← schema.sql
│   ├── routes/                 ← Express routers per resource
│   ├── seeds/
│   │   └── seedContent.js      ← DB seed for services + site_settings
│   ├── uploads/                ← Admin-uploaded files (served at /uploads/)
│   └── server.js               ← Express entry point
├── CIC-WEB-CONTENT.md          ← Source of truth for all copy (extracted from client doc)
└── SITE-DOCUMENTATION.md       ← This file
```

---

## Pages

### `/` — Home

The site's primary experience. Two major regions:

**1. Cinematic Scroll Journey** (`ScrollJourney` component)
- 5 scenes × 100vh, GSAP ScrollTrigger pinned
- Scene 1: "We Design." / Scene 2: "We Build." / Scene 3: "We Transform." / Scene 4: Brand statement / Scene 5: Preview cards (disciplines)
- Full-bleed imagery, dark overlay, large serif text

**2. Scrollable content sections** (after the journey unpins)
- **Building Beyond Structures** — Ivory section, brand philosophy statement
- **What We Create** — 5 discipline rows (A–E), image left/right alternating, CMS-driven
- **Interiors Showcase** — Horizontal scroll gallery of interior portraits
- **The Concord Approach** — 5 steps (Discover → Design → Develop → Deliver → Evolve), glass-dark cards
- **Why Concord** — 6 reason pillars in grid
- **ConnectCTA** — Shared "Let's Connect" closing banner

CMS integration: `useEffect` fetches `/api/services` and maps to discipline shape; falls back to `DISCIPLINES` constant if API is offline.

---

### `/portfolio` — Portfolio

- Fetches all projects from `/api/projects`
- Category filter chips (pill-shaped, active = forest glass, inactive = white glass)
- Project grid: cards with `borderRadius: 18`, hover lift
- Each card links to `/portfolio/:slug`

---

### `/portfolio/:slug` — Project Detail

- Fetches single project by slug from `/api/projects/:slug`
- Hero image, project metadata (area, year, category, location)
- Before/After slider (`BeforeAfter` component) if images exist
- Gallery grid
- Rich text description (`.prose-project` class)

---

### `/services` — Services

- 5 discipline blocks (A–E), CMS-driven via `/api/services`
- Each block: letter badge, title, tagline, description, feature list, discipline image
- Light glass cards (`rgba(255,255,255,0.55)`, `borderRadius: 24`)
- **What Sets Us Apart** — 6 glass-dark reason cards with SVG icons
- **Hero stats** — glass-dark plate (experience, projects, awards)
- **ConnectCTA** at bottom

---

### `/about` — About

- Hero band with brand statement
- Brand Story — reads `settings.brand_story_long` (CMS) or falls back to doc-verbatim copy
- Values — 4 cards (Innovation, Sustainability, Excellence, Community), glass hover states
- **Sustainability** — deep-forest band, 8 doc-verbatim sustainability commitments
- Team section (placeholder for CMS team members)
- **ConnectCTA** at bottom

---

### `/contact` — Contact

- Enquiry form: name, email, phone, service interest, message
- Form submission to `/api/enquiries` (POST)
- Contact sidebar: address, phone, email cards (glass-dark, `borderRadius: 22`)
- Office hours card (glass-light, `borderRadius: 18`)
- WhatsApp direct link from `settings.whatsapp_number`

---

## Components

| Component | Purpose |
|---|---|
| `Navbar.jsx` | Floating frosted-glass capsule, three modes |
| `Footer.jsx` | Dark ink-forest footer, 4-column layout |
| `ScrollJourney.jsx` | GSAP-pinned cinematic 5-scene entry experience |
| `ConnectCTA.jsx` | Uniform "Let's Connect" closing banner (used on Home, Services, About, Portfolio) |
| `WhatsAppButton.jsx` | Fixed floating WhatsApp pill (bottom-right) |
| `HeroSection.jsx` | Generic hero (used on inner pages) |
| `ProjectCard.jsx` | Portfolio grid card |
| `BeforeAfter.jsx` | Drag-slider for before/after images |
| `Gallery.jsx` | Responsive photo grid |
| `Testimonials.jsx` | Testimonial carousel |
| `TestimonialCard.jsx` | Individual testimonial |
| `Counter.jsx` | Animated count-up number |
| `SEOHead.jsx` | `<title>` + meta description per page |
| `ScrollReveal.jsx` | Intersection Observer fade-in wrapper |
| `ServiceCard.jsx` | Service display card |
| `SkeletonCard.jsx` | Loading placeholder |
| `Loader.jsx` | Full-screen amber spinner (Suspense fallback) |
| `SectionHeader.jsx` | Reusable section eyebrow + heading |

### Navbar — Three Modes

| Mode | When | Appearance |
|---|---|---|
| `transparent` | Home page, scrollY < journey end | Dark frosted glass capsule over hero imagery |
| `solid-dark` | Home page, after journey | Solid dark frosted glass |
| `glass-light` | All other pages | Light frosted glass (white/ivory) |

The circular steel-grey logo plate is always exactly `BAR_H` (84px unscrolled, 68px scrolled). The wordmark is separate HTML text in Cormorant Garamond. The amber strapline "Constructions | Interiors | Consultants" hides on mobile ≤640px.

---

## CMS Architecture

### What is CMS-controlled

| Content | Admin section | Table |
|---|---|---|
| Services / disciplines | Manage Services | `services` |
| Projects + gallery images | Manage Projects | `projects`, `project_images` |
| Project categories | Manage Categories | `categories` |
| Enquiries (read-only view) | Manage Enquiries | `enquiries` |
| Brand settings (name, taglines, social links, addresses) | Site Settings | `site_settings` |
| Testimonials | (via API, no dedicated admin UI yet) | `testimonials` |

### What is design-locked (not CMS-editable)

- Page layouts and section ordering
- The 5 discipline letters (A–E) and their design-doc-verbatim descriptions (used as offline fallback)
- The Concord Approach 5-step methodology copy
- The 6 "Why Concord" pillars
- The 8 sustainability commitments (About page)
- Footer nav links

### Services schema

```sql
CREATE TABLE services (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  tagline       VARCHAR(255),
  description   TEXT,
  features      TEXT,          -- JSON array of sub-service strings
  icon          VARCHAR(100),
  image         VARCHAR(500),
  display_order INT DEFAULT 0
);
```

`features` is stored as a JSON array (e.g. `["Master Planning","Site Analysis"]`). Admin edits it as one sub-service per line in a textarea.

### Site settings keys

| Key | Used by |
|---|---|
| `company_name` | Navbar, Loader |
| `company_tagline` | Footer |
| `hero_tagline` | Home (fallback: "We Design. We Build. We Transform.") |
| `brand_statement` | Home BuildingBeyond section |
| `footer_message` | Footer brand tagline |
| `brand_story_long` | About brand story section |
| `about_headline` | About hero |
| `company_address`, `company_phone`, `company_email` | Footer, Contact |
| `whatsapp_number` | WhatsApp button, Footer |
| `instagram`, `facebook`, `linkedin`, `youtube`, `twitter` | Footer social chips |

---

## Admin Panel

**URL:** `/admin`  
**Login:** `/admin/login`  
**Auth:** JWT stored in localStorage, checked via `AuthContext`

All admin routes are protected by `AdminRoute` (wraps React Router `<Route>`). The `AdminLayout` provides the sidebar nav. All admin pages are lazy-loaded.

| Route | Page | Function |
|---|---|---|
| `/admin` | Dashboard | Overview stats |
| `/admin/projects` | ManageProjects | Create/edit/delete projects, upload images, gallery |
| `/admin/categories` | ManageCategories | Create/edit/delete project categories |
| `/admin/services` | ManageServices | Create/edit/delete service disciplines (title, tagline, sub-services, image) |
| `/admin/enquiries` | ManageEnquiries | View contact form submissions |
| `/admin/settings` | SiteSettings | Edit all `site_settings` key/value pairs |

---

## API Routes

Base URL: `http://localhost:3000/api` (dev) or `https://[server]/api` (prod)

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | — | Admin login, returns JWT |
| GET | `/projects` | — | All projects (params: `featured`, `limit`, `category`) |
| GET | `/projects/:slug` | — | Single project + gallery |
| POST | `/projects` | JWT | Create project |
| PUT | `/projects/:id` | JWT | Update project |
| DELETE | `/projects/:id` | JWT | Delete project |
| GET | `/categories` | — | All categories |
| POST | `/categories` | JWT | Create category |
| PUT | `/categories/:id` | JWT | Update category |
| DELETE | `/categories/:id` | JWT | Delete category |
| GET | `/services` | — | All services in display_order |
| POST | `/services` | JWT | Create service |
| PUT | `/services/:id` | JWT | Update service |
| DELETE | `/services/:id` | JWT | Delete service |
| GET | `/settings` | — | All settings as flat `{key: value}` object |
| PUT | `/settings` | JWT | Upsert a setting key |
| POST | `/enquiries` | — | Submit contact form |
| GET | `/enquiries` | JWT | List all enquiries |
| GET | `/testimonials` | — | All testimonials |

---

## Image Pipeline

### Static images (git-tracked)

Served directly by Vite from `client/public/`:

```
client/public/images/
├── brand/
│   ├── doc-image-1.jpg  ..  doc-image-8.jpg   ← from client's Word doc
│   └── (doc-image-6 has a watermark — avoid for hero use)
├── interiors/     ← interior photography
└── construction/  ← construction site photos
```

### Admin-uploaded images

Uploaded via the admin panel, stored in `server/uploads/`, served at `/uploads/<filename>` by Express static middleware.

### `imgUrl()` helper

Used in Home and any page that shows CMS project images:

```js
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};
```

### Logo

`client/src/assets/logo-mark.png` — the circular iC mark only, cropped from the hi-res source with RGBA transparency. Used inside the steel-grey plate in Navbar and Footer. The wordmark ("Concord Interior Concepts") is rendered as HTML text.

---

## Design System

### Glassmorphism

Two reusable CSS classes defined in `index.css`:

```css
.glass       /* Light frosted — rgba(255,255,255,0.55), blur(20px) saturate(165%) */
.glass-dark  /* Dark frosted  — rgba(24,24,21,0.45),   blur(20px) saturate(155%) */
```

Both have `border-radius: 20px`, a soft border, and a subtle inset highlight.

### Buttons

All buttons use `border-radius: 999px` (pill shape):

| Class | Background | Text |
|---|---|---|
| `.btn-forest` | Forest green `#2C4A3B` | Ivory |
| `.btn-gold` / `.btn-beige` | Amber `#FBB316` | Ink (dark) |
| `.btn-outline` | Translucent white | Ink |
| `.btn-navy` | Ink `#181815` | Ivory |

### Editorial utilities

| Class | Purpose |
|---|---|
| `.paper-bg` | Ivory background with subtle radial tints |
| `.dashed-frame` | Fine single-pixel forest hairline border (`border-radius: 24px`) |
| `.chapter-num` | Large forest serif numeral with amber period |
| `.chapter-label` | Wide-tracked uppercase forest label |
| `.gold-line` / `.beige-line` | Amber horizontal hairline rule |
| `.dotted-connector` | Dashed amber connector line |

### Smooth scroll

`App.jsx` wraps the router in a `SmoothScroll` component that initialises Lenis and syncs it with GSAP's ticker. Skipped on `/admin/*` routes and for `prefers-reduced-motion` users. Each route change calls `window.scrollTo(0, 0)` and `ScrollTrigger.refresh()`.

---

## Deployment

The production server is at **Milarch** (SSH or panel login required).

### Remote git

```
git remote: nachimilarch/concordinteriorconcept.git  (main branch)
```

### Push

```bash
git push origin main
```

### Server setup requirements

- Node.js 18+
- MySQL database `concorde_db` with user `root` / `Chintu@Milarch@2500`
- `server/.env` with:
  ```
  PORT=3000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=Chintu@Milarch@2500
  DB_NAME=concorde_db
  JWT_SECRET=concorde_super_secret_2026
  CLIENT_URL=https://your-production-domain.com
  ```
- `cd server && npm install && node seeds/seedContent.js`
- `cd client && npm install && npm run build` — output goes to `client/dist/`
- Serve `client/dist/` as a static site (Nginx / Apache) with a catch-all redirect to `index.html`
- Proxy `/api/*` and `/uploads/*` to the Express process on port 3000

### Do NOT stop during development

The dev server (port 5173) and API server (port 3000) run in separate terminal tabs. Use `curl http://localhost:5173` / `curl http://localhost:3000/api/settings` to check health — never `kill` or `pkill` node processes mid-session.
