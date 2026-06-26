import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
// Update the import path if HeroStaticComponent is in a different location
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import RichText from "@/components/RichTextComponents/RichText"
import TripCards from "@/components/TourOverviews/TripCards"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPlaiceholder } from "plaiceholder" // Import getPlaiceholder
import { sanityCdnUrlWithParams } from "@/sanity/lib/image"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getDiveTripsPage } from "@/sanity/queries/DiveTrips/DiveTripsPage"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getTripCards } from "@/sanity/queries/DiveTrips/Trips"
import SanityTripCards from "@/components/TourOverviews/SanityTripCards"
import JsonLd from "@/components/StructuredData/JsonLd"

// Add this line to explicitly force static rendering
export const dynamic = "force-static"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Trips")

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates("trips", locale)

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
  const [structuredData, diveTripsPage, tripCards] = await Promise.all([
    getStructuredData("Trips"),
    getDiveTripsPage(),
    getTripCards(),
  ])

  // Get the hero image URL from Contentful
  const heroImageUrl = diveTripsPage.heroImage.asset.url

  // Generate blurDataURL from a tiny CDN proxy — fetching the full-res image
  // here blows the call stack while piping the response ("failed to pipe response").
  let heroImageBlurDataURL: string | undefined
  try {
    const buffer = await fetch(
      sanityCdnUrlWithParams(heroImageUrl, { w: 64, h: 64, fit: "max" }),
    ).then(async res => Buffer.from(await res.arrayBuffer()))
    heroImageBlurDataURL = (await getPlaiceholder(buffer)).base64
  } catch (e) {
    console.error("Error generating plaiceholder for image:", heroImageUrl, e)
  }

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <HeroStaticComponent // Use HeroStaticComponent
        heroImage={heroImageUrl}
        blurDataURL={heroImageBlurDataURL} // Pass the generated blurDataURL
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <BlockContent content={diveTripsPage.paragraph1} locale={locale} />
      <CloudinaryBackgroundVideo
        className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        videoId={"scubaHero_wzvqdg"}
      />
      <SanityTripCards locale={locale} tripCards={tripCards} />
    </main>
  )
}
