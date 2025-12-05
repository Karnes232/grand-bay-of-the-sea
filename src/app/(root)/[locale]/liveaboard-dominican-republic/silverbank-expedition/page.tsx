import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"

import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import {
  getSilverbankExpedition,
  getSilverbankExpeditionSEO,
  getSilverbankExpeditionStructuredData,
} from "@/sanity/queries/Liveaboards/silverbank-expedition/silverbank-expedition"
import BlockContent from "@/components/BlockContent/BlockContent"
import SanitySwiperCarousel from "@/components/BackgroundCarouselComponents/SanitySwiperCarousel"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const pageSeo = await getSilverbankExpeditionSEO()

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl: string
  if (locale === "en") {
    canonicalUrl =
      "https://www.grandbay-puntacana.com/liveaboard-dominican-republic/silverbank-expedition"
  } else {
    canonicalUrl =
      "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic/silverbank-expedition"
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
      "liveaboard-dominican-republic/silverbank-expedition",
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
  const [structuredData, silverbankExpedition] = await Promise.all([
    getSilverbankExpeditionStructuredData(),
    getSilverbankExpedition(),
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
        videoId={"coral-cut_lyykuw"}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />

      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-7xl xl:space-x-10">
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:mt-0">
            <BlockContent
              content={silverbankExpedition.paragraph1}
              locale={locale}
            />
          </div>
          {/* <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-start md:mt-2 lg:mt-7 2xl:mt-14">
            <TripOverview tour={pageLayout.items[0].fields} />
          </div> */}
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:mt-0">
            <BlockContent
              content={silverbankExpedition.paragraph2}
              locale={locale}
            />
          </div>
        </div>
        <SanitySwiperCarousel
          photoList={silverbankExpedition.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
          height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
        />
        <div className="flex flex-col justify-center items-center xl:my-10">
          <div className="flex flex-col max-w-7xl">
            <div className="lg:flex items-start xl:space-x-10">
              <BlockContent
                content={silverbankExpedition.paragraph3}
                locale={locale}
              />

              <BlockContent
                content={silverbankExpedition.paragraph4}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
      <CloudinaryBackgroundVideo
        videoId={"scubaHero_wzvqdg"}
        className={`[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
      />
    </main>
  )
}
