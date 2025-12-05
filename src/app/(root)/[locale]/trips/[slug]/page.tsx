import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import RichText from "@/components/RichTextComponents/RichText"
import TripOverview from "@/components/TourOverviews/TripOverview"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getIndividualTrip } from "@/sanity/queries/DiveTrips/Trips"
import BlockContent from "@/components/BlockContent/BlockContent"
import SanitySwiperCarousel from "@/components/BackgroundCarouselComponents/SanitySwiperCarousel"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug, locale } = await params
  const seoSearchResults = await searchEntries(
    "tours",
    {
      "fields.slug": slug,
      locale: locale || "en",
    },
    [
      "fields.seoTitle",
      "fields.seoDescription",
      "fields.seoKeywords",
      "fields.seoImage",
    ],
    ["fishing-punta-cana", "shark-dive-punta-cana"],
  )

  return {
    title: String(seoSearchResults.items[0].fields.seoTitle),
    description: String(seoSearchResults.items[0].fields.seoDescription),
    keywords: seoSearchResults.items[0].fields.seoKeywords as string[],
    openGraph: {
      url:
        locale === "es"
          ? `https://www.grandbay-puntacana.com/es/trips/${slug}`
          : `https://www.grandbay-puntacana.com/trips/${slug}`,
      type: "website",
      title: String(seoSearchResults.items[0].fields.seoTitle),
      description: String(seoSearchResults.items[0].fields.seoDescription),
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.seoImage.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.seoImage.fields.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(seoSearchResults.items[0].fields.seoTitle),
      description: String(seoSearchResults.items[0].fields.seoDescription),
      creator: "@grandbay",
      site: "@grandbay",
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.seoImage.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.seoImage.fields.title,
        },
      ],
    },
    alternates: getHreflangAlternates(`trips/${slug}`, locale),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params

  const [trip] = await Promise.all([
    getIndividualTrip(slug),
  ])

  const tour = await searchEntries(
    "tours",
    {
      "fields.slug": slug,
      locale: locale,
    },
    undefined,
    [
      "fishing-punta-cana",
      "shark-dive-punta-cana",
      "silverbank-expedition",
      "whale-watching-adventure",
    ],
  )

console.log(trip);
  
  return (
    <main>
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
            <TripOverview tour={tour.items[0].fields} />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={trip.paragraph3} locale={locale} />
          </div>
        </div>
      </div>
    </main>
  )
}
