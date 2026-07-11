import {
  getAllEntries,
  getAllEntrySlugs,
  getAllEntrySlugsWithCategory,
  searchEntries,
} from "@/lib/contentful"
import { getBlogCategory } from "@/sanity/queries/Blog/BlogCategory"
import { getBlogPosts } from "@/sanity/queries/Blog/BlogPosts"
import { getCourseSlugs } from "@/sanity/queries/Courses/IndividualCourses"
import { getTripSlugs } from "@/sanity/queries/DiveTrips/Trips"
import type { MetadataRoute } from "next"

// const blogCategories = await getAllEntrySlugs("blogCategory")
const blogCategoriesSanity = await getBlogCategory()
const blogPostsSanity = await getBlogPosts()
const courseSlugsSanity = await getCourseSlugs()
const tripSlugsSanity = await getTripSlugs()

// const blogPosts = await getAllEntrySlugsWithCategory("blogPost")

/**
 * Stable lastmod for static/service routes that aren't threaded to a Sanity
 * `_updatedAt`. Using a fixed date (rather than `new Date()` at build) avoids
 * falsely signalling that every page changed on each rebuild. Bump on releases
 * that materially change these pages. Blog posts/categories use their real
 * per-document `_updatedAt` below.
 */
const SITE_LASTMOD = new Date("2026-07-05")

const blogPostsEnglish = blogPostsSanity.map(post => {
  return {
    url: `https://www.grandbay-puntacana.com/blog/${post.blogCategory.slug.current}/${post.slug.current}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : SITE_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})

const blogPostsSpanish = blogPostsSanity.map(post => {
  return {
    url: `https://www.grandbay-puntacana.com/es/blog/${post.blogCategory.slug.current}/${post.slug.current}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : SITE_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})

const blogCategoriesEnglish = blogCategoriesSanity.map(page => {
  return {
    url: `https://www.grandbay-puntacana.com/blog/${page.slug.current}`,
    lastModified: page._updatedAt ? new Date(page._updatedAt) : SITE_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})
const blogCategoriesSpanish = blogCategoriesSanity.map(page => {
  return {
    url: `https://www.grandbay-puntacana.com/es/blog/${page.slug.current}`,
    lastModified: page._updatedAt ? new Date(page._updatedAt) : SITE_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})

// Course and trip detail pages are Sanity-driven ([slug] routes): sourcing the
// sitemap from the same documents means new content can never be silently
// missing here (4 of 8 courses had already drifted out of the hardcoded list).
const courseEntries = courseSlugsSanity.flatMap(course =>
  ["", "/es"].map(prefix => ({
    url: `https://www.grandbay-puntacana.com${prefix}/courses/${course.slug}`,
    lastModified: course._updatedAt ? new Date(course._updatedAt) : SITE_LASTMOD,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  })),
)

const tripEntries = tripSlugsSanity.flatMap(trip =>
  ["", "/es"].map(prefix => ({
    url: `https://www.grandbay-puntacana.com${prefix}/trips/${trip.slug}`,
    lastModified: trip._updatedAt ? new Date(trip._updatedAt) : SITE_LASTMOD,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  })),
)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.grandbay-puntacana.com",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/shark-dive-punta-cana",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/shark-dive-punta-cana",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    // {
    //   url: "https://www.grandbay-puntacana.com/scuba-diving-punta-cana",
    //   lastModified: SITE_LASTMOD,
    //   changeFrequency: "daily",
    //   priority: 1,
    // },
    // {
    //   url: "https://www.grandbay-puntacana.com/es/scuba-diving-punta-cana",
    //   lastModified: SITE_LASTMOD,
    //   changeFrequency: "daily",
    //   priority: 1,
    // },
    {
      url: "https://www.grandbay-puntacana.com/fishing-punta-cana",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/fishing-punta-cana",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/photo-gallery",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/photo-gallery",
      lastModified: SITE_LASTMOD,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/courses",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/courses",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...courseEntries,
    {
      url: "https://www.grandbay-puntacana.com/trips",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/trips",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...tripEntries,
    {
      url: "https://www.grandbay-puntacana.com/sites",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/sites",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/species",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/species",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/liveaboard-dominican-republic",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/liveaboard-dominican-republic/silverbank-expedition",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic/silverbank-expedition",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/liveaboard-dominican-republic/whale-watching-adventure",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic/whale-watching-adventure",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/contact",
      lastModified: SITE_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/contact",
      lastModified: SITE_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/terms-and-conditions",
      lastModified: SITE_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/terms-and-conditions",
      lastModified: SITE_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/blog",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/blog",
      lastModified: SITE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...blogCategoriesEnglish,
    ...blogCategoriesSpanish,
    ...blogPostsEnglish,
    ...blogPostsSpanish,
  ]
}
