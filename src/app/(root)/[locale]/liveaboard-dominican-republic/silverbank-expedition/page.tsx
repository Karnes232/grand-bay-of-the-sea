import { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"
import { getHreflangAlternates } from "@/utils/hreflang"
import {
  getSilverbankExpedition,
  getSilverbankExpeditionSEO,
  getSilverbankExpeditionStructuredData,
} from "@/sanity/queries/Liveaboards/silverbank-expedition/silverbank-expedition"
import ExpeditionLayout from "@/components/liveaboard/ExpeditionLayout"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const pageSeo = await getSilverbankExpeditionSEO()

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates(
    "liveaboard-dominican-republic/silverbank-expedition",
    locale,
  )

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
  const [structuredData, silverbankExpedition, tLiveaboard] = await Promise.all(
    [
      getSilverbankExpeditionStructuredData(),
      getSilverbankExpedition(),
      getTranslations("Liveaboard"),
    ],
  )

  return (
    <ExpeditionLayout
      locale={locale}
      structuredData={structuredData?.seo?.structuredData[locale]}
      path="/liveaboard-dominican-republic/silverbank-expedition"
      expeditionName={tLiveaboard("silverbankTitle")}
      heroVideoId="coral-cut_lyykuw"
      closingVideoId="scubaHero_wzvqdg"
      data={silverbankExpedition}
    />
  )
}
