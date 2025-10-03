import { getAllEntries, getAllEntrySlugs, getAllEntrySlugsWithCategory, searchEntries } from "@/lib/contentful"
import type { MetadataRoute } from "next"

const blogCategories = await getAllEntrySlugs("blogCategory")

const blogPosts = await getAllEntrySlugsWithCategory("blogPost")

const blogPostsEnglish = blogPosts.map(post => {
  return {
    url: `https://www.grandbay-puntacana.com/blog/${post.category.fields.slug}/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})

const blogPostsSpanish = blogPosts.map(post => {

  return {
    url: `https://www.grandbay-puntacana.com/es/blog/${post.category.fields.slug}/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})

const blogCategoriesEnglish = blogCategories.map(page => {
  return {
    url: `https://www.grandbay-puntacana.com/blog/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})
const blogCategoriesSpanish = blogCategories.map(page => {
  return {
    url: `https://www.grandbay-puntacana.com/es/blog/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }
})


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.grandbay-puntacana.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/shark-dive-punta-cana",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/shark-dive-punta-cana",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/scuba-diving-punta-cana",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/scuba-diving-punta-cana",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/fishing-punta-cana",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/fishing-punta-cana",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/photo-gallery",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/photo-gallery",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.grandbay-puntacana.com/courses",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/courses",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/courses/discover",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/courses/discover",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/courses/scubadiver",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/courses/scubadiver",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/courses/openwater",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/courses/openwater",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/courses/advanced",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/courses/advanced",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/trips",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/trips",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/trips/catalina",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/trips/catalina",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/trips/saona",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/trips/saona",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/trips/bayahibe",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/trips/bayahibe",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/sites",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/sites",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/species",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/species",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/photo-gallery",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/photo-gallery",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/liveaboard-dominican-republic",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/liveaboard-dominican-republic/silverbank-expedition",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic/silverbank-expedition",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/liveaboard-dominican-republic/whale-watching-adventure",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic/whale-watching-adventure",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.grandbay-puntacana.com/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/thankyou",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/thankyou",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/terms-and-conditions",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/terms-and-conditions",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/customPayment",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/customPayment",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/blog",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.grandbay-puntacana.com/es/blog",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...blogCategoriesEnglish,
    ...blogCategoriesSpanish,
    ...blogPostsEnglish,
    ...blogPostsSpanish,
  ]
}
