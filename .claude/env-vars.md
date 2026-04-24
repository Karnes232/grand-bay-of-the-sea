# Environment Variables

All variables go in `.env.local` for local development. Production values are set in Netlify.

## Required

| Variable | Used in |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `src/sanity/env.ts` |
| `NEXT_PUBLIC_SANITY_DATASET` | `src/sanity/env.ts` |
| `CONTENTFUL_SPACE_ID` | `src/lib/contentful.ts` |
| `CONTENTFUL_ACCESS_TOKEN` | `src/lib/contentful.ts` |
| `NEXT_PUBLIC_SUPABASE_URL` | `src/lib/supabaseClient.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabaseClient.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | `src/lib/supabaseServer.ts` (server only) |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal components |
| `RESEND_API_KEY` | `src/app/actions/send-confirmation.js` |

## Optional

| Variable | Default | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-11-13` | Sanity API version |

## Notes

- Variables prefixed `NEXT_PUBLIC_` are exposed to the browser bundle.
- `SUPABASE_SERVICE_ROLE_KEY` must **never** be exposed client-side — only used in `supabaseServer.ts` via Server Actions.
- Sanity env vars are validated at startup in `src/sanity/env.ts` — missing values throw immediately.
