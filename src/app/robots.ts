import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/tui/*",
    },
    sitemap: "https://www.grandbay-puntacana.com/sitemap.xml",
  }
}
