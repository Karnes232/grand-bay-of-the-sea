# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Grand Bay of the Sea — a Next.js 15 website for a scuba dive center in Punta Cana, Dominican Republic. The site handles course listings, dive trip bookings, PayPal payments, a blog, photo gallery, and a Spanish/English bilingual experience.

Live site: https://www.grandbay-puntacana.com  
Deployed on: Netlify via `@netlify/plugin-nextjs`

---

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
npm run format    # Prettier (writes in-place)
```

There are no automated tests in this project.

---

## Architecture

### Route Groups

The app uses two Next.js route groups:

- `src/app/(root)/[locale]/` — Public-facing site with i18n. All public pages live here under a locale segment (`/en/…` or `/es/…`). The locale layout wraps every page with `<Header>`, `<Footer>`, Google Tag Manager, and `NextIntlClientProvider`.
- `src/app/(tui)/tui/` — Private white-label pages for TUI travel agency partners. `robots: noindex/nofollow`. No locale prefix; always loads English messages. Has its own `<TuiHeader>` / `<TuiFooter>`.
- `src/app/studio/` — Sanity Studio mounted at `/studio`.

### Internationalisation (next-intl)

- Supported locales: `en` (default), `es`, configured in `src/i18n/routing.ts`.
- `localePrefix: "as-needed"` — English URLs have no `/en/` prefix in the UI, but the route segment still exists in the filesystem.
- Middleware (`src/middleware.ts`) runs `next-intl`'s middleware for all paths except `/api`, `/tui`, `/studio`, and static files.
- Translation strings live in `messages/en.json` and `messages/es.json`.
- Use `getTranslations()` (server) or `useTranslations()` (client) from `next-intl`.
- All page-level SEO (title, description, OG) is locale-aware and sourced from Sanity (`seo.meta.en` / `seo.meta.es`).

### Content Sources

The project has **two active CMS backends** (migration from Contentful to Sanity is in progress):

| Source         | Used for                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| **Sanity**     | Courses, Trips, Blog posts, Home page, SEO, Sites, Species, Fishing, Liveaboards, Photo Gallery, FAQs |
| **Contentful** | Blog (legacy — some pages still call `searchEntries`), logo from layout entry                         |

Sanity client is at `src/sanity/lib/client.ts`. All GROQ queries live in `src/sanity/queries/` and are organised by feature, mirroring the schema structure in `src/sanity/schemaTypes/`.

Contentful helpers are in `src/lib/contentful.ts`. The logo is still fetched from Contentful via `getCachedGrandBayLogoLayout()` (cached with `unstable_cache`).

### Sanity Image Utilities (`src/sanity/lib/image.ts`)

Two helpers:

- `urlFor(source)` — takes a Sanity image reference object and returns an image URL builder (use `.url()` to resolve).
- `sanityCdnUrlWithParams(url, options)` — appends CDN transform params (`w`, `h`, `q`, `fit`, `auto=format`) to an already-resolved `cdn.sanity.io` URL. Use this when you have the raw URL from a GROQ projection (e.g. `image.asset->url`).

### SEO Pattern

Every page:

1. Exports `generateMetadata` that fetches from Sanity (`getPageSeo`, `getTripSeo`, etc.) and returns locale-aware `title`, `description`, `keywords`, OG, and hreflang `alternates`.
2. Optionally injects a `<script type="application/ld+json">` block from Sanity's `structuredData.en` / `structuredData.es` string fields.
3. Calls `getHreflangAlternates(path, locale)` from `src/utils/hreflang.ts` for canonical + alternate links.

### Revalidation

Pages use `export const revalidate = 3600` (ISR, 1 hour) — **not** `force-static`. This is intentional for Netlify compatibility with language switching.

### Data Fetching in Pages

Server components fetch data at the top of the default export with `Promise.all`. Heavy images use `plaiceholder` to generate a blur hash for the LCP hero only (fetching a tiny 64×64 proxy first).

### Payment & Booking Flow

- PayPal is integrated via `@paypal/react-paypal-js` in `src/components/PayPalComponents/`.
- Booking forms live in `src/components/PaymentComponents/` and TUI-specific versions in `src/components/TuiComponents/`.
- Server actions in `src/app/(root)/actions.ts` handle form submissions: contact (`submitForm`), trip booking (`submitTripForm`), fishing (`submitFishingForm`), generic booking (`submitBookingForm`).
- On booking, actions call `sendConfirmationEmail` variants from `src/app/actions/send-confirmation.js` (Resend/Nodemailer) and write certified diver records to Supabase (`src/lib/supabaseServer.ts`).

### Fonts & Styling

- Body: Geist Sans / Geist Mono (CSS variables `--font-geist-sans`, `--font-geist-mono`).
- Hero H1 and some blog headings: Crimson Pro (`--font-crimson-pro`, Tailwind class `font-crimson`).
- Tailwind config extends with `font-crimson`, `fade-in-up` animation, and includes `@tailwindcss/typography` and `tailwindcss-animate`.
- Clip-path polygons are used heavily for diagonal section cuts (inline Tailwind arbitrary values).

### Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION   # optional, defaults to 2025-11-13
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY        # server-only, used in supabaseServer.ts
RESEND_API_KEY                   # or SMTP credentials for nodemailer
NEXT_PUBLIC_PAYPAL_CLIENT_ID
```
