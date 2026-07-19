# FS Montsant Reus — Club Website

Official website of Club Futsal Montsant, a grassroots futsal club in Reus
(Catalonia). Bilingual Catalan/Spanish single-page application with club
information and an online player registration form.

**Live:** https://fsmontsant.reus.workers.dev

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)

## Stack

- React 18 + TypeScript, built with Vite (SWC)
- Tailwind CSS 3, shadcn/ui primitives on Radix UI, lucide-react icons
- react-router-dom v6 client-side routing
- react-hook-form + zod validation; submissions go to [Web3Forms](https://web3forms.com)
- Installable as a home-screen app on iOS and Android via `public/manifest.webmanifest`
  (no service worker needed)
- Hosted on Cloudflare Workers (static assets, SPA fallback)

## Development

Requires [Bun](https://bun.sh).

```sh
bun install
cp .env.example .env    # then fill in the Web3Forms key
bun run dev             # http://localhost:8080
```

Other scripts:

```sh
bun run build           # production build to dist/
bun run preview         # serve the production build locally
bun run lint            # ESLint
```

### Environment

| Variable | Purpose |
| --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the registration form. Public by design (baked into the client bundle); it identifies the destination inbox. Without it the form renders a "not configured" notice and refuses to submit. |

## Project structure

```text
src/
├── App.tsx              # Routes + language state (persisted to localStorage)
├── pages/
│   ├── Index.tsx        # Landing: hero, club presentation, matches link
│   ├── Metodologia.tsx  # Training philosophy
│   ├── Competicions.tsx # Team categories, FCF calendar link
│   ├── Activitats.tsx   # Club activities and events
│   ├── Inscripcio.tsx   # Registration form (Web3Forms) + printable PDF option
│   └── NotFound.tsx
├── components/          # Header, Hero, QuiSom, PartitsLink, Footer, ScrollToTop
│   └── ui/              # shadcn/ui primitives in use
├── hooks/               # use-page-title
├── lib/                 # cn() class-merge utility
└── assets/              # Optimized images (WebP/JPEG)
public/
├── _headers             # Security headers (CSP, HSTS, …)
├── .well-known/security.txt
├── robots.txt, sitemap.xml
└── inscripcio.pdf       # Printable registration form
```

## Internationalization

Catalan (default) and Spanish. The selected language is React state in
`App.tsx`, persisted to `localStorage` and mirrored to `<html lang>`; each
page keeps its copy in a local `texts` record keyed by language.

## Deployment

Pushes to `main` are built and deployed by Cloudflare Workers Builds using
`wrangler.json` (static assets with single-page-app fallback). Response
headers — including the Content-Security-Policy — are defined in
`public/_headers`.

## License

© Club Futsal Montsant Reus. All rights reserved.
