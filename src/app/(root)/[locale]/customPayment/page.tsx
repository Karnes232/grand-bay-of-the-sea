import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import JsonLd from "@/components/StructuredData/JsonLd"
import CustomPagePayPal from "@/components/PayPalComponents/CustomPagePayPal"

import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCustomPayment } from "@/sanity/queries/CustomPayment/CustomPayment"
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

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <HeroStaticComponent
        heroImage={customPayment.heroImage.asset.url}
        alt={customPayment.heroImage.alt}
        blurDataURL={customPayment.heroImage.asset.metadata.lqip}
      />
      <div className="mt-[45vh] md:mt-[40vh] lg:mt-[65vh]" />
      <div className="py-20 lg:pt-12">
        <BlockContent content={customPayment.paragraph1} locale={locale} />
        <CustomPagePayPal />
      </div>
    </main>
  )
}
