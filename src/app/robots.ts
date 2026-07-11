import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /tui/* and /studio are excluded via meta noindex instead of Disallow:
      // a robots.txt block would stop Google from ever seeing the noindex tag
      // (documented anti-pattern), leaving bare URL listings possible.
    },
    sitemap: "https://www.grandbay-puntacana.com/sitemap.xml",
  }
}
