# Cycles Studios — Marketing Site

Portfolio / marketing site for Cycles Studios, a creative agency operating at the intersection of music and technology. Showcases three products: Cycles (iOS playlist-sharing app), MiDiMe (music pattern analyzer), and Elucia (AI-assisted instrument learning).

## Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12, GSAP 3 |
| Runtime | React 19 |
| Package manager | npm 11 |

## Project structure

```text
app/
  layout.tsx        Root layout — font, metadata
  page.tsx          Single-page composition (Nav → Hero → About → Work → Footer)
  globals.css       Tailwind theme tokens, base styles

components/
  Nav.tsx           Sticky navigation
  Hero.tsx          Full-screen hero section
  About.tsx         Agency bio with animated walking figures
  Work.tsx          Project showcase grid — Cycles, MiDiMe, Elucia
  Footer.tsx        Footer

  # Mockup frames
  IPhoneFrame.tsx   iPhone 15 Pro shell (SVG)
  IMacFrame.tsx     iMac-style display shell
  BrowserChrome.tsx Minimal macOS browser bar overlay

  # Visual effects
  Carousel.tsx      Full-screen slide carousel (Framer Motion)
  WalkingFigures.tsx Canvas — scanline-rendered human silhouettes
  CharacterHeatmap.tsx Canvas — ambient character particle field
  WireframeGrid.tsx Canvas — perspective wireframe grid
  PaintDrip.tsx     SVG paint-drip accent

lib/
  projects.ts       Project data — slugs, colors, slide content

public/
  applelogo.png     App Store badge
  product/          Product screenshot PNGs (cycles1-3, midime, elucia)
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # development server (Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Design tokens

Defined in `app/globals.css` via Tailwind `@theme`:

| Token | Value |
| ----- | ----- |
| `--color-background` | `#080808` |
| `--color-surface` | `#111111` |
| `--color-orange` | `#FF5C00` |
| `--color-yellow` | `#FFD600` |
| `--color-cyan` | `#00E5FF` |
| `--font-sans` | `Futura, "Futura PT", "Arial Rounded MT Bold", sans-serif` |

## Adding a project

1. Add an entry to `lib/projects.ts` with a unique `slug`, `color`, and `slides` array.
2. Drop a product screenshot at `public/product/<slug>.png`.
3. The `Work` component renders all projects automatically.
