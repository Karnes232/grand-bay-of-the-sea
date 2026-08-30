//import createMiddleware from "next-intl/middleware"
//import { routing } from "./i18n/routing"

//export default createMiddleware(routing)

//export const config = {
// Match all pathnames except for
// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
// - … the ones containing a dot (e.g. `favicon.ico`)
// - … the ones starting with `/tui` (admin interface)
// matcher: [
// Match all pathnames except for
// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
// - … the ones containing a dot (e.g. `favicon.ico`)
// - … the ones starting with `/tui` (admin interface)
//  "/((?!api|trpc|_next|tui|studio|_vercel|.*\\..*).*)",
// Also match pathnames that start with a locale
// "/(en|es)/:path*",
// ],
//}

import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routing } from "./i18n/routing"
import {
  DEFAULT_LOCALE,
  LOCALE_PREFIX_PATTERN,
  stripLocalePrefix,
} from "./i18n/locales"

const intlMiddleware = createMiddleware(routing)

/**
 * Retired URLs, keyed by their locale-stripped path.
 *
 * These 301s have to happen HERE rather than in `netlify.toml` or
 * `next.config.mjs`, and that is not a style preference. `@netlify/plugin-nextjs`
 * deploys this middleware as a Netlify edge function, and edge functions run
 * *before* redirect rules. Under `localePrefix: "as-needed"` next-intl rewrites
 * the unprefixed default-locale path to `/en/…` and serves it straight from the
 * edge — a terminal response — so neither redirect layer is ever consulted.
 *
 * That is exactly how the DR Web Studio rule failed silently from 11 July to
 * 30 August: `/es/…` was not rewritten and its Netlify rule fired (301), while
 * the English URL kept serving a self-canonical 200 of a thin duplicate post.
 * `force = true` could not save it; nothing at the Netlify layer can.
 */
const LEGACY_PATHS: Readonly<Record<string, string>> = {
  "/blog/local-businesses/dr-web-studio-punta-cana-web-design":
    "/blog/local-businesses/dr-web-studio-punta-cana-website-design",
}

export default function middleware(req: NextRequest) {
  // Deliberately outside the try/catch below: a plain object lookup cannot
  // throw, and the fail-open path must never swallow a redirect.
  const { pathname } = req.nextUrl
  const target = LEGACY_PATHS[stripLocalePrefix(pathname)]
  if (target) {
    const prefix = pathname.match(LOCALE_PREFIX_PATTERN)?.[1]
    // clone() carries the query string through the redirect.
    const url = req.nextUrl.clone()
    // The default locale is unprefixed under `as-needed`, so emitting `/en/…`
    // would only cost a second hop as next-intl redirects the prefix back off.
    url.pathname =
      prefix && prefix !== DEFAULT_LOCALE ? `/${prefix}${target}` : target
    return NextResponse.redirect(url, 301)
  }

  try {
    return intlMiddleware(req)
  } catch (err) {
    console.error("next-intl middleware crashed:", err)
    // Fail open so the site still loads
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|tui|studio|_vercel|.*\\..*).*)",
    // Keep in sync with LOCALES in src/i18n/locales.ts by hand — Next.js
    // statically analyses this value at build time, so it cannot be derived.
    "/(en|es|de)/:path*",
  ],
}
