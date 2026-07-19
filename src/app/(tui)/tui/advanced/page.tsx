import SanitySwiperCarousel from "@/components/BackgroundCarouselComponents/SanitySwiperCarousel"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import BlockContent from "@/components/BlockContent/BlockContent"
import TuiAdvancedOverview from "@/components/TuiComponents/TuiAdvancedOverview"
import {
  getIndividualCourse,
  getIndividualCourseSEO,
} from "@/sanity/queries/Courses/IndividualCourses"
import { cloudinaryVideoUrl } from "@/utils/cloudinaryVideoUrl"
import { Metadata } from "next"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getIndividualCourseSEO("advanced")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /tui/advanced. " +
        "Check the Sanity individualCourse 'advanced' seo fields.",
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
      url: `https://www.grandbay-puntacana.com/tui/advanced`,
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
      canonical: `https://www.grandbay-puntacana.com/tui/advanced/`,
    },
  }
}

export default async function Page() {
  const course = await getIndividualCourse("advanced")
  return (
    <main id="main">
      <BackgroundVideo
        video={cloudinaryVideoUrl(course.videoId)}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[35rem]">
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={course.paragraph1} locale="en" />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-center">
            <TuiAdvancedOverview />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <BlockContent content={course.paragraph2} locale="en" />
          </div>
        </div>
        <SanitySwiperCarousel
          photoList={course.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
          height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
        />
        {(course.paragraph3?.en?.length ?? 0) > 0 && (
          <div className="flex flex-col max-w-6xl mx-auto">
            <div className="lg:flex xl:space-x-4">
              <BlockContent content={course.paragraph3!} locale="en" />
              {course.paragraph4 && (
                <BlockContent content={course.paragraph4} locale="en" />
              )}
            </div>
            <hr className="mt-5 border-2 border-blue-500 w-52 mx-auto" />
            <div className="lg:flex xl:space-x-4 flex-grow">
              {course.paragraph5 && (
                <BlockContent content={course.paragraph5} locale="en" />
              )}
              {course.paragraph6 && (
                <BlockContent content={course.paragraph6} locale="en" />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
