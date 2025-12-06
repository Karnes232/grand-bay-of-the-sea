import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import CourseOverview from "@/components/CourseComponents/CourseOverview"
import RichText from "@/components/RichTextComponents/RichText"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import {
  getIndividualCourse,
  getIndividualCourseSEO,
  getIndividualCourseStructuredData,
} from "@/sanity/queries/Courses/IndividualCourses"
import BlockContent from "@/components/BlockContent/BlockContent"
import SanitySwiperCarousel from "@/components/BackgroundCarouselComponents/SanitySwiperCarousel"

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug, locale } = await params
  const pageSeo = await getIndividualCourseSEO(slug)

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://www.grandbay-puntacana.com/courses/${slug}`
  } else {
    canonicalUrl = `https://www.grandbay-puntacana.com/es/courses/${slug}`
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    //url: canonicalUrl,
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
    alternates: getHreflangAlternates(`courses/${slug}`, locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "es"; slug: string }>
}) {
  const { locale, slug } = await params
  const [structuredData, individualCourse] = await Promise.all([
    getIndividualCourseStructuredData(slug),
    getIndividualCourse(slug),
  ])
  console.log(individualCourse)
  const course = await searchEntries("course", {
    "fields.slug": slug,
    locale: locale,
  })

  return (
    <>
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
          videoId={individualCourse.videoId}
          className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
        />
        <div className="my-5">
          <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[35rem]">
            <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
              <BlockContent
                content={individualCourse.paragraph1}
                locale={locale}
              />
            </div>
            <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-center">
              <CourseOverview course={course.items[0]} />
            </div>
            <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
              <BlockContent
                content={individualCourse.paragraph2}
                locale={locale}
              />
            </div>
          </div>
          <SanitySwiperCarousel
            photoList={individualCourse.photoList}
            className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
            height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
          />
          {individualCourse.paragraph3 && (
            <div className="flex flex-col max-w-6xl mx-auto">
              <div className="lg:flex lg:justify-center lg:items-center xl:space-x-4">
                {individualCourse.paragraph3 && (
                  <div className="flex-1">
                    <BlockContent
                      content={individualCourse.paragraph3}
                      locale={locale}
                    />
                  </div>
                )}
                {individualCourse.paragraph4 && (
                  <div className="flex-1">
                    <BlockContent
                      content={individualCourse.paragraph4}
                      locale={locale}
                    />
                  </div>
                )}
              </div>
              <hr className="mt-5 border-2 border-blue-500 w-52 mx-auto" />
              <div className="lg:flex lg:justify-center lg:items-center xl:space-x-4 flex-grow">
                {individualCourse.paragraph5 && (
                  <div className="flex-1">
                    <BlockContent
                      content={individualCourse.paragraph5}
                      locale={locale}
                    />
                  </div>
                )}
                {individualCourse.paragraph6 && (
                  <div className="flex-1">
                    <BlockContent
                      content={individualCourse.paragraph6}
                      locale={locale}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
