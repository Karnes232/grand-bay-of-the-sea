import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import RichText from "@/components/RichTextComponents/RichText"
import TripOverview from "@/components/TourOverviews/TripOverview"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const seoSearchResults = await searchEntries(
    "tours",
    {
      "fields.slug": "shark-dive-punta-cana",
      locale: locale || "en",
    },
    [
      "fields.seoTitle",
      "fields.seoDescription",
      "fields.seoKeywords",
      "fields.seoImage",
    ],
    ["fishing-punta-cana"],
  )

  return {
    title: String(seoSearchResults.items[0].fields.seoTitle),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.seoKeywords as string[],
    openGraph: {
      url:
        locale === "es"
          ? "https://www.grandbay-puntacana.com/es/shark-dive-punta-cana"
          : "https://www.grandbay-puntacana.com/shark-dive-punta-cana",
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
    alternates: getHreflangAlternates("shark-dive-punta-cana", locale),
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const pageLayout = await searchEntries("tours", {
    "fields.page": "Shark Dive Punta Cana",
    locale: locale || "en",
  })
  return (
    <main>
      <CloudinaryBackgroundVideo
        videoId={"greyshark_aowggg"}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[35rem]">
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={pageLayout.items[0].fields.paragraph1} />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-start md:mt-2 lg:mt-7 2xl:mt-14">
            <TripOverview tour={pageLayout.items[0].fields} />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={pageLayout.items[0].fields.paragraph2} />
          </div>
        </div>
        <SwiperCarousel
          photoList={(pageLayout.items[0] as any).fields.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
          height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
        />
        <div className="flex flex-col justify-center items-center xl:my-10">
          <div className="flex flex-col max-w-6xl">
            <div className="lg:flex items-center xl:space-x-4">
              <RichText context={pageLayout.items[0].fields.paragraph3} />

              <RichText context={pageLayout.items[0].fields.paragraph4} />
            </div>
          </div>
        </div>
      </div>
      <CloudinaryBackgroundVideo
        videoId={"shark_hzrsvc"}
        className={`[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
      />
    </main>
  )
}
