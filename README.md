# FS Montsant Reus — Official Club Website

> The digital home of **FS Montsant Reus**, a grassroots futsal club from Reus.
> Community-first, bilingual, mobile-first, PWA-ready.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![PWA](https://img.shields.io/badge/PWA-ready-5A0F0F)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![Built with Lovable](https://img.shields.io/badge/Built_with-Lovable-FF5C8A)

🌐 **Live site:** [futsalreus.lovable.app](https://futsalreus.lovable.app)

---

## About the Project

FS Montsant Reus is a local futsal club rooted in grassroots values, family,
and community. This website is its central digital hub: a fast, accessible,
and bilingual experience designed to bring the club closer to players,
families, and supporters — on any device.

The site is **mobile-first** and **installable as a PWA**, so visitors can add
it to their home screen and use it like a native app.

---

## Key Features

- 🌍 **Bilingual interface** — Catalan (primary) and Spanish, with a global
  language switcher.
- 📱 **Mobile-first & PWA-ready** — Installable on iOS and Android, optimized
  for small screens first.
- 🏟️ **Match Center** — Latest results and upcoming fixtures presented in
  responsive cards.
- 👥 **Qui Som** — Founders and people behind the club, with a custom desktop
  grid layout.
- 🧠 **Metodologia** — The club's training philosophy and community approach.
- 🏆 **Competicions** — Showcase of the team categories we want to open:
  *Infantil, Cadet, Juvenil, Sènior* and *Femení*, each with its own visual
  identity.
- 🎉 **Activitats** — Events, community moments, and family-oriented
  initiatives.
- 👕 **Merchandising** — Preview of the club's kit and accessories.
- 🎨 **Energetic design system** — Maroon & white palette, animated
  interactions, and a vibrant, community-driven aesthetic.
- 📣 **Social presence** — Direct links to Instagram, TikTok, and Twitch.
- 🔎 **SEO foundations** — Semantic HTML, descriptive metadata, and
  accessibility-friendly markup.

---

## Tech Stack

| Layer            | Technology                                                |
| ---------------- | --------------------------------------------------------- |
| Framework        | [React 18](https://react.dev/) + TypeScript               |
| Build tool       | [Vite 7](https://vitejs.dev/) with SWC                    |
| Styling          | [Tailwind CSS 3](https://tailwindcss.com/) + `tailwindcss-animate` |
| UI primitives    | [shadcn/ui](https://ui.shadcn.com/) on [Radix UI](https://www.radix-ui.com/) |
| Icons            | [lucide-react](https://lucide.dev/)                       |
| Routing          | [react-router-dom v6](https://reactrouter.com/)           |
| Data / state     | [TanStack Query](https://tanstack.com/query)              |
| Forms            | [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) |
| Notifications    | [sonner](https://sonner.emilkowal.ski/)                   |
| PWA              | `public/manifest.json` + icon set                         |
| Tooling          | ESLint, TypeScript                                        |
| Platform         | Designed and maintained with [Lovable](https://lovable.dev/) |

---

## Project Structure

```text
src/
├── App.tsx               # Router + global language state
├── main.tsx              # App entry point
├── index.css             # Design tokens (HSL) and global styles
├── pages/
│   ├── Index.tsx         # Landing page
│   ├── Metodologia.tsx   # Training philosophy
│   ├── Competicions.tsx  # Team categories
│   ├── Activitats.tsx    # Events & community
│   └── NotFound.tsx
├── components/
│   ├── Header.tsx        # Navigation + language switcher
│   ├── Hero.tsx
│   ├── MatchCenter.tsx
│   ├── QuiSom.tsx
│   ├── Merchandising.tsx
│   ├── Footer.tsx        # Socials & contact
│   └── ui/               # shadcn/ui primitives
├── hooks/                # Custom React hooks
└── lib/                  # Utilities
```

---

## Design System

The visual language is defined through **HSL-based semantic tokens** in
`src/index.css` and `tailwind.config.ts`, so the entire UI stays consistent
and themable.

- **Palette:** Maroon / dark red as the primary identity color, paired with
  white surfaces for a clean, energetic feel.
- **Tone:** Community-focused, grassroots, family-friendly. No corporate or
  professional-stadium imagery.
- **Motion:** Subtle hover effects, icon micro-animations, and dynamic
  transitions to reinforce the club's energy.

---

## Internationalization

The app ships in **Catalan (default)** and **Spanish**. Language is held in
global state at `src/App.tsx` and propagated to each page through props, so
the switch is instant and persistent across navigation.

---

## Progressive Web App

The site is configured to behave like a native application on mobile devices:

- Manifest: `public/manifest.json`
- Icons: `public/icons/`
- Mobile-first responsive layouts across every page

Users can install the site to their home screen on iOS and Android.

---

## Roadmap

- [ ] **Lovable Cloud** integration for member registration and authentication
- [ ] **Payments** for online membership fees
- [ ] **Admin dashboard** to update match results without touching the code
- [ ] **News & blog** section for club announcements

---

## Credits

Built with care for **FS Montsant Reus**.

- 📞 +34 683 386 660
- ✉️ futsalmontsant@gmail.com
- 📸 [@fsmontsantreus on Instagram](https://www.instagram.com/fsmontsantreus/)
- 🎵 [TikTok](https://www.tiktok.com/@fsmontsantreus)
- 🎮 [Twitch](https://www.twitch.tv/fsmontsantreus)

Crafted and maintained with [Lovable](https://lovable.dev/).

---

## License

© FS Montsant Reus. All rights reserved.
