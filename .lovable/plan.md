
# Plan: Theiventhiram Thanus Portfolio + Admin Dashboard

A premium, futuristic 3D portfolio site with a full admin CMS backed by Lovable Cloud. Because the spec is large, I'll build it in clear phases so you can review progress and request adjustments along the way.

## Phase 1 — Foundation & Design System
- Enable **Lovable Cloud** (database, auth, storage) for projects, services, comments, messages, etc.
- Set up the design tokens in `src/styles.css`:
  - Dark + light mode color tokens (navy `#020617`, blue `#38BDF8`, purple `#8B5CF6`, cyan `#22D3EE`)
  - Blue→purple gradient utilities, neon glow shadows, glassmorphism card style
  - Hero radial glow, floating particle background
- Theme toggle (persisted), smooth 0.3–0.5s transitions.
- Install: `framer-motion`, `@react-three/fiber`, `@react-three/drei`, `three`, `react-icons` (already have lucide).
- Create shared layout: sticky glass navbar (logo `THANUS.DEV`, animated underline, scroll blur, mobile hamburger) + footer.

## Phase 2 — Public Pages (TanStack routes)
One route per section, each with its own SEO `head()`:
- `/` Home — hero with 3D floating tech icons (R3F), rotating neon rings behind profile, 5 stat cards, social buttons (LinkedIn, GitHub, X, Instagram, Email, WhatsApp), CTA buttons (Projects, Services, Contact, Download CV).
- `/about` — profile summary, career goal, Achievements & Leadership timeline (Prefect, Council President, AarasTech Co-Founder), Technologies grid by category.
- `/education` — animated timeline (3 entries).
- `/experience` — animated timeline (6 entries).
- `/projects` — filter tabs (All, Web, MERN, WordPress, UI/UX, IoT, Game, AI, Desktop, Data, Event, Portfolio); 30 seeded project cards with all conditional link buttons (GitHub, LinkedIn, Live, Behance, Drive); details modal.
- `/services` — 14 service cards.
- `/comments` — approved comments grid (featured first) + "Leave a Comment" form (status defaults to `pending`).
- `/contact` — contact form + all social links + contact details.

All cards use glassmorphism + 3D tilt hover + neon glow; sections use scroll-reveal stagger via Framer Motion.

## Phase 3 — Backend (Lovable Cloud / Supabase)
Tables (with RLS):
- `projects`, `services`, `education`, `experience`, `achievements`, `technologies`, `about`, `contact_details`
- `comments` (`id, name, role, email, message, rating, status[pending|approved|rejected], featured, created_at`)
- `messages` (contact form submissions)
- `user_roles` (separate roles table with `app_role` enum + `has_role` SECURITY DEFINER function — required pattern)

RLS rules:
- Public: SELECT only where `status='approved'` on comments; SELECT on all content tables; INSERT on comments + messages.
- Admin (via `has_role`): full CRUD on everything.

Seed all content from your prompt (30 projects, 14 services, 3 education, 6 experience, 3 achievements, technologies, contact details).

Server functions (`createServerFn`) for content reads + comment/message inserts with Zod validation.

## Phase 4 — Auth & Admin Dashboard
- Email/password auth (Lovable Cloud). First registered user gets `admin` role via SQL seed (I'll give you instructions).
- `/login` page; `_authenticated` layout guard; admin-only guard via `has_role`.
- `/admin` dashboard with sidebar nav and these pages:
  - Overview (stat cards: totals + pending/approved/featured comments + unread messages)
  - Manage: Home, About, Achievements, Technologies, Education, Experience, Projects, Services, Contact Details
  - Comments moderation table (approve / reject / feature / edit / delete, filter by status & rating, search)
  - Messages inbox (read/delete/reply via mailto)
  - Settings
- Shadcn tables, dialogs, forms with Zod validation; image upload to Cloud storage for projects/services.

## Phase 5 — Polish
- Lazy load images, route preloading, performance pass.
- Accessibility: focus rings, alt text, semantic HTML, single H1 per route.
- SEO metadata + JSON-LD Person schema on `/`.
- Final QA across mobile/tablet/desktop in both themes.

## Technical notes
- Stack: TanStack Start + React 19 + Tailwind v4 + shadcn/ui + Framer Motion + React Three Fiber + Lovable Cloud (Supabase).
- Profile image: I'll use a styled placeholder avatar with neon ring — you can upload your real photo via the admin dashboard after launch (or paste a URL and I'll wire it in).
- CV download: placeholder link until you upload a PDF (can be done via admin storage).
- I'll only ask Lovable AI to generate hero/background visuals; project thumbnails will use category-themed gradient covers (replaceable via admin uploads) to keep the build fast — let me know if you'd rather I generate 30 unique project images upfront (slower + more credits).

## Scope confirmation
This is a large build (~40+ files, DB schema, auth, admin CRUD for 9+ entities). I'll execute Phase 1→5 in sequence in a single implementation, but if you'd prefer I stop after Phase 2 (public site) for review before building the admin, say so when approving.

Ready to implement on approval.
