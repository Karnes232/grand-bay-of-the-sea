import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
// Update the import path if HeroStaticComponent is in a different location
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import RichText from "@/components/RichTextComponents/RichText"
import TripCards from "@/components/TourOverviews/TripCards"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPlaiceholder } from "plaiceholder" // Import getPlaiceholder
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getDiveTripsPage } from "@/sanity/queries/DiveTrips/DiveTripsPage"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getTripCards } from "@/sanity/queries/DiveTrips/Trips"
import SanityTripCards from "@/components/TourOverviews/SanityTripCards"

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

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/trips"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es/trips"
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
    alternates: getHreflangAlternates("trips", locale),
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

  // Generate blurDataURL for the hero image at build time
  const buffer = await fetch(heroImageUrl).then(async res => {
    return Buffer.from(await res.arrayBuffer())
  })
  const { base64: heroImageBlurDataURL } = await getPlaiceholder(buffer)

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
