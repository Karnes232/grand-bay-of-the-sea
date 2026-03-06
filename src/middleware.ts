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

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
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
    "/(en|es)/:path*",
  ],
}
