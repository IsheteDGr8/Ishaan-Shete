# Ishaan Shete · Portfolio

My personal site: who I am, what I've built and how to reach me. Every page is statically prerendered with Next.js and deployed on Vercel.

## Stack

Next.js 16 (App Router, Turbopack, React Compiler), React 19, TypeScript strict, Tailwind CSS v4, lucide icons. Tests use Playwright with axe-core. No animation library: motion is CSS, IntersectionObserver and `requestIdleCallback`.

## Running it

```bash
npm install
npm run dev          # local development on :3000
npm run verify       # typecheck, lint and production build
npm test             # builds, starts on :3200 and runs the Playwright suite
```

`npm test` needs the Playwright browser once: `npx playwright install chromium`.

## Where things live

- `src/content/` holds every word on the site behind types: `site.ts` (identity, links, page copy), `projects.ts`, `experience.ts`, `capabilities.ts`, `commands.ts`. Pages read from here; there is no professional copy in JSX.
- `src/app/` has the routes: home, `/work`, `/work/[slug]`, `/experience`, `/capabilities`, `/about`, `/contact`, plus the 404 page, sitemap and robots.
- `src/components/` has the UI. The waterfall scene (`waterfall-scene.tsx`) is plain SVG generated from seeded, deterministic geometry.
- `tests/` has the suite: accessibility, responsive, journeys and SEO. Expected values come from `src/content/`.

## Updating content

To add a project, add an entry to `src/content/projects.ts`. The work index, case-study route, sitemap, command palette and tests pick it up automatically. Set `featured: true` to show it on the home page.

To replace the résumé, overwrite `public/Ishaan-Shete-Resume.pdf`.

## Environment

- `NEXT_PUBLIC_SITE_URL`: the production origin, used for canonical URLs, the sitemap and JSON-LD. Set it in Vercel.

See `docs/DESIGN_SYSTEM.md`, `docs/DEPLOYMENT.md` and `docs/QA_REPORT.md` for more.
