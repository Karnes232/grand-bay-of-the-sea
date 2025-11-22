import BlogCategory from "@/components/BlogComponents/BlogCategory"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getBlogPageLayout } from "@/sanity/queries/Blog/BlogPageLayout"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getBlogCategory } from "@/sanity/queries/Blog/BlogCategory"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Blog")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/blog"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es/blog"
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
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
    alternates: getHreflangAlternates("blog", locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData] = await Promise.all([getStructuredData("Blog")])
  // const pageLayout = await searchEntries("pageLayout", {
  //   "fields.page": "Blog",
  //   locale: locale || "en",
  // })
  const blogPageLayout = await getBlogPageLayout()
  const blogCategories = await getBlogCategory()

  // const blogPosts = await getAllEntries("blogCategory", locale)
  return (
    <main>
      {structuredData?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData.seo.structuredData[locale],
          }}
        />
      )}
      <HeroComponent
        heroImage={blogPageLayout.heroImage.asset.url}
        alt={blogPageLayout.heroImage.alt}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center lg:flex-row mx-5 lg:mx-auto">
        {/* <RichText context={pageLayout.items[0].fields.paragraph1} /> */}
        <BlockContent
          content={blogPageLayout.paragraph as any}
          locale={locale}
        />
      </div>
      <div className="flex flex-col xl:my-5 md:flex-row md:flex-wrap md:justify-evenly  max-w-5xl xl:max-w-6xl mx-auto md:gap-5">
        {blogCategories.map((category, index) => (
          <BlogCategory key={index} category={category} locale={locale} />
        ))}
      </div>
    </main>
  )
}
