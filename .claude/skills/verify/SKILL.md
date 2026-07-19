---
name: verify
description: Build, launch, and drive this Next.js site to verify page changes end-to-end
---

# Verifying changes in this repo

Surface: HTTP — server-rendered pages. Drive with curl and inspect the HTML.

## Recipe

```bash
npm run build                 # must pass; generateMetadata throws loudly if a page's Sanity SEO doc is missing
PORT=3001 npm run start &     # port 3000 is often held by the user's own dev/prod server — don't kill it, use 3001
curl -s "http://localhost:3001/<path>" -o page.html          # en (no /en/ prefix — localePrefix "as-needed")
curl -s "http://localhost:3001/es/<path>" -o page-es.html    # es
```

Then grep the HTML for the expected markup (headings, classes, cdn.sanity.io image URLs, mailto links, etc.).

## Gotchas

- **The owner usually runs their own server on :3000, sharing this repo's `.next`.** Running `npm run build` (let alone `rm -rf .next`) breaks that running process (500s, `Cannot find module './vendor-chunks/...'`) until they restart it. Prefer verifying via `npx tsc --noEmit` + curling the owner's live :3000 (their `next dev` picks up edits via HMR). Only do a full build+start when a production build check is truly needed — and warn the user their server will need a restart.
- Never assume :3000 is yours; if you must serve, start on another port.
- **`border-gray-300` etc. matches in page HTML are usually the inlined global stylesheet** (experimental `inlineCss` inlines the whole CSS bundle into every page), not rendered elements. Grep for `<[^>]*class="[^"]*token` to check actual markup.
- Pages are ISR/SSG — content comes from published Sanity docs at build time. Seed + publish Sanity content **before** `npm run build` or metadata guards throw.
- `?name=` style query params: pages are `●` SSG but searchParams-driven parts still render — verify with the query string attached.
