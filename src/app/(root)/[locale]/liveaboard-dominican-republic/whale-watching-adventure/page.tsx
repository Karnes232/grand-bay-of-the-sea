import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import {
  getWhaleWatchingAdventure,
  getWhaleWatchingAdventureSEO,
  getWhaleWatchingAdventureStructuredData,
} from "@/sanity/queries/Liveaboards/whale-watching-adventure/whale-watching-adventure"
import BlockContent from "@/components/BlockContent/BlockContent"
import SanitySwiperCarousel from "@/components/BackgroundCarouselComponents/SanitySwiperCarousel"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params

  const pageSeo = await getWhaleWatchingAdventureSEO()

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl: string
  if (locale === "en") {
    canonicalUrl =
      "https://www.grandbay-puntacana.com/liveaboard-dominican-republic/whale-watching-adventure"
  } else {
    canonicalUrl =
      "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic/whale-watching-adventure"
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    //  url: canonicalUrl,
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
    alternates: getHreflangAlternates(
      "liveaboard-dominican-republic/whale-watching-adventure",
      locale,
    ),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, whaleWatchingAdventure] = await Promise.all([
    getWhaleWatchingAdventureStructuredData(),
    getWhaleWatchingAdventure(),
  ])

  // const pageLayout = await searchEntries("tours", {
  //   "fields.page": "Whale Watching",
  //   locale: locale,
  // })

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
        videoId={"waw32in2jogikyocpnes"}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-7xl xl:space-x-10">
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:mt-0">
            <BlockContent
              content={whaleWatchingAdventure.paragraph1}
              locale={locale}
            />
          </div>

          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:mt-0">
            <BlockContent
              content={whaleWatchingAdventure.paragraph2}
              locale={locale}
            />
          </div>
        </div>
        <SanitySwiperCarousel
          photoList={whaleWatchingAdventure.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
          height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
        />
        <div className="flex flex-col justify-center items-center xl:my-10">
          <div className="flex flex-col max-w-7xl">
            <div className="lg:flex items-start xl:space-x-10">
              <BlockContent
                content={whaleWatchingAdventure.paragraph3}
                locale={locale}
              />

              <BlockContent
                content={whaleWatchingAdventure.paragraph4}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
      <CloudinaryBackgroundVideo
        videoId={"o0hy1gzkfnahyw3eyjl2"}
        className={`[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
      />
    </main>
  )
}
