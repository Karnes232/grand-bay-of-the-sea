import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import CustomPagePayPal from "@/components/PayPalComponents/CustomPagePayPal"

import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCustomPayment } from "@/sanity/queries/CustomPayment/CustomPayment"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import BlockContent from "@/components/BlockContent/BlockContent"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Custom Payment")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /customPayment. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates("customPayment", locale)

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: alternates.canonical,
    },
    // PayPal utility page with no organic search value — always noindex.
    robots: {
      index: false,
      follow: false,
    },
    alternates,
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
  const [structuredData, customPayment] = await Promise.all([
    getStructuredData("Custom Payment"),
    getCustomPayment(),
  ])

  const heroImg = customPayment.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />

      {heroSrc && (
        <CoursesHero
          heroImage={heroSrc}
          objectPosition={heroPosition}
          blurDataURL={heroImg?.asset?.metadata?.lqip || ""}
          alt={heroImg?.alt || "Grand Bay of the Sea dive boat"}
          title={customPayment.heroTitle?.[locale] ?? ""}
          subtitle={customPayment.heroSubtitle?.[locale]}
          trustLine={customPayment.heroEyebrow?.[locale]}
        />
      )}

      <section className="mx-auto max-w-[1280px] px-6 pb-24 pt-14">
        <div className="mx-auto max-w-[720px]">
          <BlockContent
            content={customPayment.paragraph1}
            locale={locale}
            variant="prose"
          />
          <div className="mt-10 rounded-[20px] border border-[#e2e9e9] bg-white p-7 md:p-10">
            <CustomPagePayPal />
          </div>
        </div>
      </section>
    </main>
  )
}
