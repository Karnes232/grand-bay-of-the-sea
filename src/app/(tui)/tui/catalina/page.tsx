import SanitySwiperCarousel from "@/components/BackgroundCarouselComponents/SanitySwiperCarousel"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import BlockContent from "@/components/BlockContent/BlockContent"
import TuiCatalinaOverview from "@/components/TuiComponents/TuiCatalinaOverview"
import { getIndividualTrip, getTripSeo } from "@/sanity/queries/DiveTrips/Trips"
import { cloudinaryVideoUrl } from "@/utils/cloudinaryVideoUrl"
import { Metadata } from "next"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getTripSeo("catalina")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /tui/catalina. " +
        "Check the Sanity trips 'catalina' seo fields.",
    )
  }

  const image = {
    url: pageSeo.seo.openGraph.image.url,
    width: pageSeo.seo.openGraph.image.width,
    height: pageSeo.seo.openGraph.image.height,
    alt: pageSeo.seo.openGraph.image.alt,
  }

  return {
    title: pageSeo.seo.meta.en.title,
    description: pageSeo.seo.meta.en.description,
    keywords: pageSeo.seo.meta.en.keywords,
    openGraph: {
      url: `https://www.grandbay-puntacana.com/tui/catalina`,
      type: "website",
      title: pageSeo.seo.openGraph.en.title,
      description: pageSeo.seo.openGraph.en.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: pageSeo.seo.openGraph.en.title,
      description: pageSeo.seo.openGraph.en.description,
      creator: "@grandbay",
      site: "@grandbay",
      images: [image],
    },
    alternates: {
      canonical: `https://www.grandbay-puntacana.com/tui/catalina/`,
    },
  }
}

export default async function Page() {
  const tour = await getIndividualTrip("catalina")

  return (
    <main id="main">
      <BackgroundVideo
        video={cloudinaryVideoUrl(tour.videoId)}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />
      <div className="mb-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[20rem] justify-center">
          <div className="my-5 lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={tour.paragraph1} locale="en" />
          </div>
        </div>
        <SanitySwiperCarousel
          photoList={tour.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
          height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
        />
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl lg:h-[35rem]">
          <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={tour.paragraph2} locale="en" />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col lg:justify-center">
            <TuiCatalinaOverview />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={tour.paragraph3} locale="en" />
          </div>
        </div>
      </div>
    </main>
  )
}
