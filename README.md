# Mohammed Aintomar — Portfolio

> **AI Engineer · Backend Developer · Automation Architect**  
> Built with Next.js 14, Tailwind CSS, Framer Motion, and Three.js.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build && npm start
```

**Node.js ≥ 18 required.**

---

## Project structure

```
.
├── app/
│   ├── globals.css           # Fonts, scrollbar, custom utilities
│   ├── layout.tsx            # Root layout + SEO metadata
│   ├── page.tsx              # Page root — assembles sections
│   └── not-found.tsx         # Auto-redirect 404
│
├── components/
│   ├── Cursor.tsx            # Custom spring cursor (desktop)
│   ├── LoadingScreen.tsx     # Cinematic boot loader + marquee
│   ├── Navbar.tsx            # Scroll-aware nav + mobile menu
│   ├── SocialRail.tsx        # Fixed vertical social icons
│   ├── NeuralOrb.tsx         # Three.js particle brain (hero)
│   ├── Hero.tsx              # Full-viewport hero section
│   ├── WhatIDo.tsx           # Expandable service accordion
│   ├── AgentArchitecture.tsx # SVG flow diagram + live terminal
│   ├── Projects.tsx          # 3D-tilt project cards
│   ├── Skills.tsx            # Tech stack grouped by category
│   ├── Contact.tsx           # CTA + contact info
│   └── Footer.tsx            # Marquee footer
│
├── hooks/
│   └── useLenis.ts           # Smooth scroll (Lenis)
│
└── lib/
    └── utils.ts              # cn(), Framer variants, easing
```

---

## Customisation

### Your information

Update these files with your real content:

| What to change | File |
|---|---|
| Name, role, tagline | `components/Hero.tsx` |
| Social links + GitHub URL | `components/SocialRail.tsx` |
| Service descriptions | `components/WhatIDo.tsx` → `SERVICES` array |
| Project data | `components/Projects.tsx` → `PROJECTS` array |
| Tech stack items | `components/Skills.tsx` → `STACK_GROUPS` array |
| Contact email + location | `components/Contact.tsx` |
| SEO metadata | `app/layout.tsx` |
| Agent metrics (1.8s, 99.7%) | `components/AgentArchitecture.tsx` → `METRICS` |

### Colours

All design tokens live in `tailwind.config.ts`. The primary accent is `#00dcff` (cyan).  
To change it, find/replace `#00dcff` and `00dcff` project-wide.

### Fonts

Loaded via Google Fonts in `app/globals.css`. Currently:
- **DM Sans** — body & headings
- **Space Mono** — mono labels & tags

To swap fonts, update the `@import` URL and the `--font-*` CSS variables.

---

## Performance notes

- **Three.js** is dynamically imported (`next/dynamic` with `ssr: false`) so it never blocks the server render.
- **Lenis** smooth scroll is also dynamically imported via `import()` inside `useEffect`.
- All section animations use `useInView` with `once: true` — they animate only once.
- The loading screen delays `<main>` render until `isLoaded = true`, so Lighthouse sees the meaningful first paint cleanly.

---

## Deployment

### Railway (recommended — already using it for BookBot)
```bash
# Connect your repo in Railway dashboard
# Set environment: Node.js, build: npm run build, start: npm start
```

### Vercel (zero config)
```bash
npx vercel --prod
```

### Static export (if needed)
```js
// next.config.js
const nextConfig = { output: "export" };
```
Note: Three.js canvas and Framer Motion work fine in static export.

---

## Licence

Personal portfolio — all rights reserved. Feel free to use the structure as inspiration for your own portfolio.
