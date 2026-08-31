import { getBlogCategory } from "@/sanity/queries/Blog/BlogCategory"
import { getBlogPosts } from "@/sanity/queries/Blog/BlogPosts"
import { getCourseSlugs } from "@/sanity/queries/Courses/IndividualCourses"
import { getTripSlugs } from "@/sanity/queries/DiveTrips/Trips"
import type { MetadataRoute } from "next"
import {
  ACTIVE_LOCALES,
  BLOG_LOCALES,
  DEFAULT_LOCALE,
  type Locale,
} from "@/i18n/locales"
import { postHasLocale } from "@/utils/blogLocales"

const BASE = "https://www.grandbay-puntacana.com"

const blogCategoriesSanity = await getBlogCategory()
const blogPostsSanity = await getBlogPosts()
const courseSlugsSanity = await getCourseSlugs()
const tripSlugsSanity = await getTripSlugs()

/**
 * Stable lastmod for static/service routes that aren't threaded to a Sanity
 * `_updatedAt`. Using a fixed date (rather than `new Date()` at build) avoids
 * falsely signalling that every page changed on each rebuild. Bump on releases
 * that materially change these pages. Blog posts/categories use their real
 * per-document `_updatedAt` below.
 */
const SITE_LASTMOD = new Date("2026-07-05")

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"]

/**
 * The service site: every non-blog route, declared once, unprefixed.
 *
 * Everything else in this file is generated from this list and from Sanity.
 * It used to be written out per locale — English and Spanish by hand, German
 * derived from the English entries by string-slicing off the base URL — which
 * is how the file grew to 345 lines to describe ~20 routes, and how four
 * courses went missing from a hardcoded list. Deriving German from the finished
 * list also meant it had to *exclude* Spanish by testing for a literal "/es"
 * prefix, so a fourth locale would have mirrored the German URLs too and
 * emitted `/de/fr/...`.
 */
const SERVICE_ROUTES: readonly {
  path: string
  changeFrequency: Freq
  priority: number
}[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/shark-dive-punta-cana", changeFrequency: "daily", priority: 1 },
  { path: "/fishing-punta-cana", changeFrequency: "daily", priority: 1 },
  { path: "/photo-gallery", changeFrequency: "daily", priority: 1 },
  { path: "/courses", changeFrequency: "weekly", priority: 0.7 },
  { path: "/trips", changeFrequency: "weekly", priority: 0.7 },
  { path: "/sites", changeFrequency: "weekly", priority: 0.7 },
  { path: "/species", changeFrequency: "weekly", priority: 0.7 },
  {
    path: "/liveaboard-dominican-republic",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/liveaboard-dominican-republic/silverbank-expedition",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/liveaboard-dominican-republic/whale-watching-adventure",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  { path: "/about-us", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
]

/** Absolute URL for a path in a locale. The default locale has no prefix. */
function urlFor(locale: Locale, path: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`
  return `${BASE}${prefix}${path}`
}

const lastModified = (updatedAt?: string) =>
  updatedAt ? new Date(updatedAt) : SITE_LASTMOD

/**
 * Course and trip detail pages are Sanity-driven (`[slug]` routes): sourcing
 * them from the same documents the pages render means new content can never be
 * silently missing here.
 */
function detailEntries(locale: Locale): MetadataRoute.Sitemap {
  return [
    ...courseSlugsSanity.map(course => ({
      url: urlFor(locale, `/courses/${course.slug}`),
      lastModified: lastModified(course._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...tripSlugsSanity.map(trip => ({
      url: urlFor(locale, `/trips/${trip.slug}`),
      lastModified: lastModified(trip._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]
}

/**
 * Blog entries for one locale.
 *
 * Wholesale locales get every post. Per-post locales get only the posts
 * actually translated into them — the rest redirect to English, and listing a
 * redirect in a sitemap is a wasted crawl. A category hub is emitted only when
 * it holds at least one post in that locale, since the listing renders just
 * those posts and an empty one would be a soft 404. With nothing translated
 * there is no index either.
 */
function blogEntries(locale: Locale): MetadataRoute.Sitemap {
  const wholesale = (BLOG_LOCALES as readonly string[]).includes(locale)
  const posts = wholesale
    ? blogPostsSanity
    : blogPostsSanity.filter(post => postHasLocale(post, locale))

  if (posts.length === 0) return []

  const categorySlugs = new Set(
    posts.map(post => post.blogCategory.slug.current),
  )
  const categories = wholesale
    ? blogCategoriesSanity
    : blogCategoriesSanity.filter(page => categorySlugs.has(page.slug.current))

  return [
    {
      url: urlFor(locale, "/blog"),
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    ...categories.map(page => ({
      url: urlFor(locale, `/blog/${page.slug.current}`),
      lastModified: lastModified(page._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 1,
    })),
    ...posts.map(post => ({
      url: urlFor(
        locale,
        `/blog/${post.blogCategory.slug.current}/${post.slug.current}`,
      ),
      lastModified: lastModified(post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 1,
    })),
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ACTIVE_LOCALES.flatMap(locale => [
    ...SERVICE_ROUTES.map(route => ({
      url: urlFor(locale, route.path),
      lastModified: SITE_LASTMOD,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...detailEntries(locale),
    ...blogEntries(locale),
  ])
}
