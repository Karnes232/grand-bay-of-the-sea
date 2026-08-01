import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /tui/* and /studio are excluded via meta noindex instead of Disallow:
      // a robots.txt block would stop Google from ever seeing the noindex tag
      // (documented anti-pattern), leaving bare URL listings possible.
      // /api/wa is a pure redirect endpoint with nothing to index — Disallow
      // is correct there and stops Google's crawlers "clicking" the WhatsApp
      // links they find in page HTML.
      disallow: "/api/wa",
    },
    sitemap: "https://www.grandbay-puntacana.com/sitemap.xml",
  }
}
