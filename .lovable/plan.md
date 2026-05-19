# Plan: Professional README for FS Montsant Reus

Replace the current `README.md` with a polished, GitHub-ready presentation of the project. Remove the "git clone / npm install" collaboration section entirely. Focus on what the project is, what it does, and how it's built.

## Proposed README structure

1. **Header**
   - Project title: *FS Montsant Reus — Official Club Website*
   - One-line tagline (grassroots futsal club in Reus, community-driven).
   - Badge row: status, PWA-ready, React, Vite, TypeScript, Tailwind, built with Lovable.
   - Live links: Published site (`https://futsalreus.lovable.app`) and Preview.

2. **About the Project**
   - Short paragraph: digital hub for FS Montsant Reus — a local grassroots futsal club. Bilingual (Catalan / Spanish), mobile-first, PWA-ready, built around community values.

3. **Key Features**
   - Bilingual interface (CA / ES) with global language state.
   - Mobile-first responsive design, PWA installable on iOS / Android.
   - Hero, Match Center, Qui Som, Merchandising and Footer sections.
   - Dedicated pages: Metodologia, Competicions (with team categories: Infantil, Cadet, Juvenil, Sènior, Femení), Activitats.
   - Animated, energetic UI aligned with club identity (maroon / white palette).
   - Social integration: Instagram, TikTok, Twitch.
   - SEO basics and semantic HTML.

4. **Tech Stack**
   - **Framework:** React 18 + TypeScript
   - **Build:** Vite 7
   - **Styling:** Tailwind CSS 3, semantic design tokens, `tailwindcss-animate`
   - **UI primitives:** shadcn/ui on Radix UI
   - **Icons:** lucide-react
   - **Routing:** react-router-dom v6
   - **State / Data:** TanStack Query
   - **Forms / Validation:** react-hook-form + zod
   - **PWA:** `public/manifest.json` + icon set
   - **Tooling:** ESLint, TypeScript, SWC
   - **Platform:** Built and maintained with Lovable

5. **Project Structure** (concise tree of `src/` highlighting `pages/`, `components/`, `components/ui/`, `hooks/`, `lib/`)

6. **Design System**
   - HSL-based semantic tokens in `index.css` and `tailwind.config.ts`.
   - Maroon / white identity, grassroots imagery guidelines, energetic motion.

7. **Internationalization**
   - Catalan (primary) / Spanish (secondary), managed globally via `App.tsx` and propagated to pages.

8. **PWA**
   - Manifest at `public/manifest.json`, icons under `public/icons/`, installable on mobile.

9. **Roadmap**
   - Lovable Cloud (auth, database) for member registration.
   - Payments integration for membership fees.
   - Admin dashboard for match results.

10. **Credits**
    - Club: FS Montsant Reus.
    - Contact: `+34 683 386 660`, `futsalmontsant@gmail.com`.
    - Built with [Lovable](https://lovable.dev).

11. **License** (placeholder line, e.g. "All rights reserved © FS Montsant Reus" — user can adjust).

## Explicit exclusions
- No "Clone / install / npm run dev" / contributor setup section.
- No internal Lovable workflow instructions.

## File to change
- `README.md` (full rewrite).
