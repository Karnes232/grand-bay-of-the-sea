import BlogBody from "@/components/BlogComponents/BlogBody"
import HeroImages from "@/components/BlogComponents/HeroImages"
import Recommendations from "@/components/BlogComponents/Recommendations"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import {
  getBlogPostsCards,
  getIndividualBlogPost,
  getIndividualBlogPostSEO,
} from "@/sanity/queries/Blog/BlogPosts"
import SanityBlogBody from "@/components/BlogComponents/SanityBlogBody"

export async function generateMetadata(
  {
    params,
  }: { params: Promise<{ category: string; slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, slug, locale } = await params
  const pageSeo = await getIndividualBlogPostSEO(slug)
  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://www.grandbay-puntacana.com/blog/${category}/${slug}`
  } else {
    canonicalUrl = `https://www.grandbay-puntacana.com/es/blog/${category}/${slug}`
  }

  // const seoSearchResults = await searchEntries(
  //   "blogPost",
  //   {
  //     "fields.slug": slug,
  //     locale: locale || "en",
  //   },
  //   [
  //     "fields.seoTitle",
  //     "fields.seoDescription",
  //     "fields.seoKeywords",
  //     "fields.seoImage",
  //   ],
  // )

  // if (!seoSearchResults?.items?.[0]) {
  //   notFound()
  // }

  return {
    title: pageSeo.seo.meta[locale].title || "",
    description: pageSeo.seo.meta[locale].description || "",
    keywords: pageSeo.seo.meta[locale].keywords.join(", ") || "",
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title || "",
      description: pageSeo.seo.openGraph[locale].description || "",
      images: pageSeo.seo.openGraph.image.url || "",
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: getHreflangAlternates(`blog/${category}/${slug}`, locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string; locale: string }>
}) {
  const { category, slug, locale } = await params
  const t = await getTranslations("Blog")

  const individualBlogPost = await getIndividualBlogPost(slug)
  const related = await getBlogPostsCards(category)

  const relatedPosts = related.filter((post: any) => post.slug.current !== slug)

  // const blogPost = await searchEntries("blogPost", {
  //   "fields.slug": slug,
  //   locale: locale || "en",
  // })

  // const blogCategory = (blogPost.items[0].fields.blogCategory as any)?.fields
  //   ?.blogCategory

  // const blogPostsByCategory = await searchEntries("blogPost", {
  //   "fields.blogCategory.sys.contentType.sys.id": "blogCategory",
  //   "fields.blogCategory.fields.blogCategory": blogCategory,
  //   locale: locale || "en",
  // })

  // // Filter out the current blog post using the slug
  // const relatedPosts = blogPostsByCategory.items.filter(
  //   post => post.fields.slug !== slug,
  // )

  return (
    <>
      <main>
        {individualBlogPost.seo.structuredData[locale] && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: individualBlogPost.seo.structuredData[locale],
            }}
          />
        )}
        <HeroImages backgroundImages={individualBlogPost.backgroundImages} />
        <SanityBlogBody content={individualBlogPost.blogBody} locale={locale} />
        <Recommendations
          relatedPosts={relatedPosts}
          title={t("youMayAlsoLike")}
          locale={locale}
        />
      </main>
    </>
  )
}
