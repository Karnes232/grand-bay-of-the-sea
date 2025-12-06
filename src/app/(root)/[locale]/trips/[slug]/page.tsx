import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"

import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import {
  getIndividualTrip,
  getTripSeo,
  getTripStructuredData,
} from "@/sanity/queries/DiveTrips/Trips"
import BlockContent from "@/components/BlockContent/BlockContent"
import SanitySwiperCarousel from "@/components/BackgroundCarouselComponents/SanitySwiperCarousel"
import SanityTripOverview from "@/components/TourOverviews/SanityTripOverview"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug, locale } = await params
  const pageSeo = await getTripSeo(slug)

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://www.grandbay-puntacana.com/trips/${slug}`
  } else {
    canonicalUrl = `https://www.grandbay-puntacana.com/es/trips/${slug}`
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    // url: canonicalUrl,
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
    alternates: getHreflangAlternates(`trips/${slug}`, locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params

  const [trip, structuredData] = await Promise.all([
    getIndividualTrip(slug),
    getTripStructuredData(slug),
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
      <CloudinaryBackgroundVideo
        videoId={trip.videoId}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />
      <div className="mb-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[20rem] justify-center">
          <div className="my-5 lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={trip.paragraph1} locale={locale} />
          </div>
        </div>
        <SanitySwiperCarousel
          photoList={trip.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
          height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
        />
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl lg:h-[50rem]">
          <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={trip.paragraph2} locale={locale} />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col lg:justify-center">
            <SanityTripOverview tour={trip} locale={locale} />
            {/* <TripOverview tour={tour.items[0].fields} /> */}
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={trip.paragraph3} locale={locale} />
          </div>
        </div>
        {trip.paragraph4 && (
          <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl">
            <BlockContent content={trip.paragraph4} locale={locale} />
          </div>
        )}
      </div>
    </main>
  )
}
