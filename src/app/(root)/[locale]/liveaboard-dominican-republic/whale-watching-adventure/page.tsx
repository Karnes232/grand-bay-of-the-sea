import { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"
import { getHreflangAlternates } from "@/utils/hreflang"
import {
  getWhaleWatchingAdventure,
  getWhaleWatchingAdventureSEO,
  getWhaleWatchingAdventureStructuredData,
} from "@/sanity/queries/Liveaboards/whale-watching-adventure/whale-watching-adventure"
import ExpeditionLayout from "@/components/liveaboard/ExpeditionLayout"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params

  const pageSeo = await getWhaleWatchingAdventureSEO()

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates(
    "liveaboard-dominican-republic/whale-watching-adventure",
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
  const [structuredData, whaleWatchingAdventure, tLiveaboard] =
    await Promise.all([
      getWhaleWatchingAdventureStructuredData(),
      getWhaleWatchingAdventure(),
      getTranslations("Liveaboard"),
    ])

  return (
    <ExpeditionLayout
      locale={locale}
      structuredData={structuredData?.seo?.structuredData[locale]}
      path="/liveaboard-dominican-republic/whale-watching-adventure"
      expeditionName={tLiveaboard("whaleTitle")}
      heroVideoId="waw32in2jogikyocpnes"
      closingVideoId="o0hy1gzkfnahyw3eyjl2"
      data={whaleWatchingAdventure}
    />
  )
}
