import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { NextResponse, NextRequest } from "next/server"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)
  
  // Add caching headers for better performance
  if (response instanceof NextResponse) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60')
  }
  
  return response
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … the ones starting with `/tui` (admin interface)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … the ones starting with `/tui` (admin interface)
    "/((?!api|trpc|_next|tui|_vercel|.*\\..*).*)",
    // Also match pathnames that start with a locale
    "/(en|es)/:path*"
  ]
}
