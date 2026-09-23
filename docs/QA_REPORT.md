# QA report

Measured against a local production build (`next build` plus `next start`), September 2026. Re-run Lighthouse against the live URL after each production deploy.

## Automated suite

`npm test`: 152 tests, all passing.

| Area | What it checks |
|---|---|
| Accessibility | axe WCAG 2.2 A/AA on all 11 routes in light and dark, after fonts load. A contrast walker that composites backgrounds through a canvas and fails text under 1.6:1. |
| Responsive | 11 routes at 360, 390, 768, 1024, 1440 and 1920px: no horizontal overflow, console errors, failed requests or broken images. |
| Journeys | Primary nav, mobile menu (focus in, Escape, focus return), command palette (Ctrl K, search, Enter, Escape), work filters, theme persistence, résumé download, 404s, every internal link, keyboard focus reaching the footer with a visible ring, and full render with JavaScript disabled. |
| SEO and copy | Title, description, canonical and a single h1 per route, no skipped heading levels, JSON-LD, sitemap, robots, no em dashes in text, titles or descriptions. |
| Security | CSP, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy and HSTS on every route including 404s; no `X-Powered-By`; no source maps served. |

Expected values (routes, project titles, tags, résumé file name) come from `src/content/`.

## Lighthouse (local, mobile, simulated throttling)

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 92–94 | 100 | 100 | 100 | 2.9–3.0 s | 0 |
| `/work/hr-copilot` | 95 | 100 | 100 | 100 | 2.8 s | 0 |
| `/about` | 94 | 100 | 100 | 100 | 3.2 s | 0 |

The home figure is the range over three runs. The waterfall scene waits for load and idle before animating, which took home from 86 to the 90s.

## Dependencies

`npm audit --omit=dev`: 0 vulnerabilities.

## Known gaps

- Canonical URLs use `NEXT_PUBLIC_SITE_URL`, which must be set in Vercel before the first production deploy.
- Cricky has no public link yet.
