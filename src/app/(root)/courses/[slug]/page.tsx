import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import CourseOverview from "@/components/CourseComponents/CourseOverview"
import RichText from "@/components/RichTextComponents/RichText"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  const seoSearchResults = await searchEntries(
    "course",
    {
      "fields.slug": slug,
    },
    [
      "fields.seoTitle",
      "fields.seoDescription",
      "fields.seoKeywords",
      "fields.seoImage",
    ],
  )
  return {
    title: String(seoSearchResults.items[0].fields.seoTitle),
    description: String(seoSearchResults.items[0].fields.seoDescription),
    keywords: seoSearchResults.items[0].fields.seoKeywords as string[],
    openGraph: {
      url: `https://www.grandbay-puntacana.com/courses/${slug}`,
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
    alternates: {
      canonical: `https://www.grandbay-puntacana.com/courses/${slug}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await searchEntries("course", {
    "fields.slug": slug,
  })
  console.log(course.items[0].fields.videoId)
  return (
    <>
      <main>
        <CloudinaryBackgroundVideo
          videoId={String(course.items[0].fields.videoId)}
          className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
        />
        <div className="my-5">
          <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[35rem]">
            <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
              <RichText context={course.items[0].fields.paragraph1} />
            </div>
            <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-center">
              <CourseOverview course={course.items[0]} />
            </div>
            <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
              <RichText context={course.items[0].fields.paragraph2} />
            </div>
          </div>
          <SwiperCarousel
            photoList={(course.items[0] as any).fields.photoCarousel}
            className={`mt-5 ${course.items[0].fields.slug === "discover" ? "-mb-6 [clip-path:polygon(0_5vh,100%_0,100%_35vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_45vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_55vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_65vh,0%_100%)]" : "[clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]"}`}
            height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
          />
          {course.items[0].fields.moreCourseInfo1 && (
            <div className="flex flex-col max-w-6xl mx-auto">
              <div className="lg:flex xl:space-x-4">
                <RichText
                  context={(course.items[0] as any).fields.moreCourseInfo1}
                />
                <RichText
                  context={(course.items[0] as any).fields.moreCourseInfo2}
                />
              </div>
              <hr className="mt-5 border-2 border-blue-500 w-52 mx-auto" />
              <div className="lg:flex xl:space-x-4 flex-grow">
                <RichText
                  context={(course.items[0] as any).fields.moreCourseInfo3}
                />
                <RichText
                  context={(course.items[0] as any).fields.moreCourseInfo4}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {course.items[0].fields.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(course.items[0].fields.schema),
          }}
        />
      )}
    </>
  )
}
