import HeroComponent from "@/components/HeroComponent/HeroComponent"
import CustomPagePayPal from "@/components/PayPalComponents/CustomPagePayPal"

import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCustomPayment } from "@/sanity/queries/CustomPayment/CustomPayment"
import BlockContent from "@/components/BlockContent/BlockContent"

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
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/customPayment"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es/customPayment"
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
    alternates: getHreflangAlternates("customPayment", locale),
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
        heroImage={customPayment.heroImage.asset.url}
        alt={customPayment.heroImage.alt}
      />
      <div className="mt-[45vh] md:mt-[40vh] lg:mt-[65vh]" />
      <div className="py-20 lg:pt-12">
        <BlockContent content={customPayment.paragraph1} locale={locale} />
        <CustomPagePayPal />
      </div>
    </main>
  )
}
