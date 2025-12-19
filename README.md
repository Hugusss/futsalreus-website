# Club Futsal Reus Website

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-React_Vite_Tailwind-blue)

A modern, responsive, and performance-optimized website designed for **Club Futsal Reus**, a local football club. This project is built to provide fans, players, and families with real-time match information, club news, and digital services.

## 🚀 Project Overview

This application focuses on a **mobile-first experience** (PWA ready), allowing users to install the website on their devices as a native-like app. It serves as the central digital hub for the club.

### Key Features
- **Match Dashboard:** Real-time display of latest results and upcoming fixtures using responsive cards.
- **Squad Roster:** Dynamic grid layout displaying player and staff information ("Qui som").
- **Merchandising:** Preview section for club kit and accessories.
- **Contact & Socials:** Integrated contact options and social media links.
- **PWA Support:** Configured with `manifest.json` for home screen installation on iOS and Android.

## 🛠 Tech Stack

This project is built using a modern frontend ecosystem to ensure speed and scalability:

- **Core:** [React](https://reactjs.org/) (TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI Development:** Powered & Scaffolded by [Lovable](https://lovable.dev/)

## 💻 Development Workflow

This project utilizes a bi-directional sync between **Lovable** and **GitHub**.

### Local Development (Standard)
If you prefer manual coding using VS Code or your preferred IDE:

1. **Clone the repository:**
```sh
git clone https://github.com/Hugusss/futsalreus.git

```

2. **Install dependencies:**
```sh
cd futsalreus-website
npm install

```


3. **Start the development server:**
```sh
npm run dev

```

## 📱 PWA & Mobile Configuration

This project is configured to work as a Progressive Web App.

* **Manifest:** Located in `public/manifest.json`.
* **Assets:** Icons for different screen sizes are stored in `public/icons`.

## 🔮 Future Roadmap

* [ ] **Supabase Integration:** Backend implementation for user registration.
* [ ] **Payments:** Stripe integration for online membership fees.
* [ ] **Admin Panel:** Internal dashboard for updating match scores without code.

```
