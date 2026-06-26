import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import JsonLd from "@/components/StructuredData/JsonLd"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCancellationPolicy } from "@/sanity/queries/Cancellation-Policy/CancellationPolicy"
import BlockContent from "@/components/BlockContent/BlockContent"
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Cancellation Policy")

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates("terms-and-conditions", locale)

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
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
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
  const [structuredData, cancellationPolicy] = await Promise.all([
    getStructuredData("Cancellation Policy"),
    getCancellationPolicy(),
  ])

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <HeroStaticComponent
        heroImage={cancellationPolicy.heroImage.asset.url}
        alt={cancellationPolicy.heroImage.alt}
        blurDataURL={cancellationPolicy.heroImage.asset.metadata.lqip}
      />
      <div className="mt-[45vh] md:mt-[40vh] lg:mt-[65vh]" />
      <BlockContent content={cancellationPolicy.content} locale={locale} />
      <div className="mb-10"></div>
    </main>
  )
}
