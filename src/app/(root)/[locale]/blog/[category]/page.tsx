import BlogPostList from "@/components/BlogComponents/BlogPostList"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { notFound } from "next/navigation"
import {
  getIndividualBlogCategory,
  getIndividualBlogCategorySEO,
} from "@/sanity/queries/Blog/BlogCategory"
import BlockContent from "@/components/BlockContent/BlockContent"

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; locale: "en" | "es" }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, locale } = await params
  const pageSeo = await getIndividualBlogCategorySEO(category)

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://www.grandbay-puntacana.com/blog/${category}`
  } else {
    canonicalUrl = `https://www.grandbay-puntacana.com/es/blog/${category}`
  }

  // const seoSearchResults = await searchEntries(
  //   "blogCategory",
  //   {
  //     "fields.slug": category,
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
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: getHreflangAlternates(`blog/${category}`, locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; locale: "en" | "es" }>
}) {
  const { category, locale } = await params

  const blogCategory = await getIndividualBlogCategory(category)

  const blogCategory2 = await searchEntries("blogCategory", {
    "fields.slug": category,
    locale: locale || "en",
  })
  const blogCategoryId = blogCategory2.items[0]?.fields.blogCategory

  const blogPostsByCategory = await searchEntries("blogPost", {
    "fields.blogCategory.sys.contentType.sys.id": "blogCategory",
    "fields.blogCategory.fields.blogCategory": blogCategoryId,
    locale: locale || "en",
  })
  return (
    <main>
      {blogCategory.seo.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: blogCategory.seo.structuredData[locale],
          }}
        />
      )}
      {blogCategory.heroImage.asset.url && (
        <HeroComponent
          heroImage={blogCategory.heroImage.asset.url}
          title={blogCategory.blogCategory[locale]}
          alt={blogCategory.heroImage.alt}
        />
      )}
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center mx-5 lg:mx-auto">
        <BlockContent
          content={blogCategory.description as any}
          locale={locale}
        />
        <BlogPostList blogPosts={blogPostsByCategory?.items} />
      </div>
    </main>
  )
}
