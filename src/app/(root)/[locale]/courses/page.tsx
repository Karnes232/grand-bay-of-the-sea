import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import AdvancedCourseCards from "@/components/CourseCardsComponents/AdvancedCourseCards"
import CourseCards from "@/components/CourseCardsComponents/CourseCards"
import PadiBanner from "@/components/DivingOrganizations/PadiBanner"

import { getHreflangAlternates } from "@/utils/hreflang"

// For image placeholders
import { getPlaiceholder } from "plaiceholder"
import { Buffer } from "buffer" // Node.js Buffer for getPlaiceholder
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCoursesMainPage } from "@/sanity/queries/Courses/CoursesMainPage"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getIndividualCoursesCards } from "@/sanity/queries/Courses/IndividualCourses"

// OPTION 1: Explicitly force static rendering for this page
// export const dynamic = "force-static"
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Courses")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/courses"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es/courses"
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
    alternates: getHreflangAlternates("courses", locale),
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
  const [
    structuredData,
    coursesMainPage,
    individualBeginnerCoursesCards,
    individualAdvancedCoursesCards,
  ] = await Promise.all([
    getStructuredData("Courses"),
    getCoursesMainPage(),
    getIndividualCoursesCards("beginner"),
    getIndividualCoursesCards("advanced"),
  ])

  if (!coursesMainPage) {
    // Handle case where page layout is not found for Courses
    return (
      <main>
        <p>Content not found for this Courses page. Please check Sanity.</p>
      </main>
    )
  }

  // Helper function to safely get image URL and details, including blurDataURL
  const getHeroImageDetails = async () => {
    const url = coursesMainPage.heroImage.asset.url
    let base64 = ""
    try {
      const buffer = await fetch(url).then(async res =>
        Buffer.from(await res.arrayBuffer()),
      )
      const { base64: plaiceholderBase64 } = await getPlaiceholder(buffer)
      base64 = plaiceholderBase64
    } catch (e) {
      console.error("Error generating plaiceholder for image:", url, e)
    }

    return {
      url: url,
      // You might also pass width/height if HeroComponent needs them directly.
      // For now, HeroComponent hardcodes them, but it's better to pass them from here.
      base64: base64,
    }
  }

  // Fetch Hero Image details and base64 at build time for the Courses page
  const heroImageDetails = await getHeroImageDetails()

  return (
    <>
      {structuredData?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData.seo.structuredData[locale],
          }}
        />
      )}
      <main>
        {heroImageDetails.url && (
          <HeroStaticComponent
            heroImage={heroImageDetails.url}
            blurDataURL={heroImageDetails.base64} // Pass the generated blurDataURL
          />
        )}
        <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
        <BlockContent content={coursesMainPage.paragraph1} locale={locale} />
        <CloudinaryBackgroundVideo
          className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
          videoId={"scubaHero_wzvqdg"}
        />
        <BlockContent content={coursesMainPage.paragraph2} locale={locale} />
        <CourseCards
          locale={locale}
          individualBeginnerCoursesCards={individualBeginnerCoursesCards}
        />
        <BlockContent content={coursesMainPage.paragraph3} locale={locale} />
        <AdvancedCourseCards
          individualAdvancedCoursesCards={individualAdvancedCoursesCards}
          locale={locale}
        />
        {/* <SSIBanner /> */}
        <PadiBanner />
      </main>
    </>
  )
}
