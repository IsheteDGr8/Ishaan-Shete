# Deployment

The site deploys to Vercel. `vercel.json` pins the framework to Next.js, and `.vercelignore` keeps tests, reports and private files out of uploads.

## Before any deploy

```bash
npm run verify
npm test
npm audit --omit=dev
```

All three must be clean. Never run `npm audit fix --force`.

## First-time setup

1. `npm i -g vercel`, then `vercel login`.
2. `vercel link` from the repo root. It writes `.vercel/` and may write an OIDC token to `.env.local`; both are gitignored. Confirm with `git check-ignore .vercel .env.local`.
3. In the Vercel project settings, set `NEXT_PUBLIC_SITE_URL` to the production origin (for example `https://ishaanshete.com`), for Production and Preview.

## Preview

```bash
vercel deploy
```

Preview URLs sit behind Deployment Protection and return 200 with Vercel's sign-in page, so check them with `vercel curl <url>` and confirm the response carries this site's own security headers.

## Production, in two steps

1. Record the current production deployment URL from `vercel ls --prod` as the rollback target.
2. `vercel deploy --prod --skip-domain` and verify the immutable URL it prints.
3. `vercel promote <immutable-url>`.

To roll back, `vercel promote <previous-url>`.

## After promoting

- Every route returns 200, unknown routes return a real 404.
- Assets return 200 with correct content types, including `/Ishaan-Shete-Resume.pdf`.
- `/sitemap.xml` lists absolute production URLs.
- Security headers are present (`curl -I https://<domain>/`).
- Run Lighthouse against the live URL.
