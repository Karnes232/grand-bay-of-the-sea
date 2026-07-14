import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import AdvancedCourseCards from "@/components/CourseCardsComponents/AdvancedCourseCards"
import CourseCards from "@/components/CourseCardsComponents/CourseCards"
import PadiBanner from "@/components/DivingOrganizations/PadiBanner"

import { getHreflangAlternates } from "@/utils/hreflang"

import { setRequestLocale, getTranslations } from "next-intl/server"
import { BUSINESS } from "@/lib/business"
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import JsonLd from "@/components/StructuredData/JsonLd"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCoursesMainPage } from "@/sanity/queries/Courses/CoursesMainPage"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getIndividualCoursesCards } from "@/sanity/queries/Courses/IndividualCourses"
import { getFaqs } from "@/sanity/queries/Faqs/Faqs"
import Faqs from "@/components/FaqsComponent/Faqs"
export const revalidate = 604800 // ISR 7 days — content refreshes on Netlify redeploy
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

  const alternates = getHreflangAlternates("courses", locale)

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: alternates.canonical,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    alternates,
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
  setRequestLocale(locale)
  const [
    structuredData,
    coursesMainPage,
    individualBeginnerCoursesCards,
    individualAdvancedCoursesCards,
    faqs,
  ] = await Promise.all([
    getStructuredData("Courses"),
    getCoursesMainPage(),
    getIndividualCoursesCards("beginner"),
    getIndividualCoursesCards("advanced"),
    getFaqs("Courses"),
  ])

  if (!coursesMainPage) {
    // Handle case where page layout is not found for Courses
    return (
      <main id="main">
        <p>Content not found for this Courses page. Please check Sanity.</p>
      </main>
    )
  }

  // Blur placeholder from Sanity's built-in `lqip` (no network fetch → page
  // stays ISR-cacheable). A bare fetch() here would force dynamic `no-store`.
  const heroImageDetails = {
    url: coursesMainPage.heroImage.asset.url,
    base64: coursesMainPage.heroImage.asset.metadata?.lqip || "",
  }

  const tTrust = await getTranslations("TrustLine")
  const trustLine = tTrust("line", {
    rating: BUSINESS.rating.value,
    count: BUSINESS.rating.count,
  })

  return (
    <>
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <main id="main">
        {heroImageDetails.url && (
          <HeroStaticComponent
            heroImage={heroImageDetails.url}
            blurDataURL={heroImageDetails.base64}
            alt={
              coursesMainPage.heroImage.asset.alt ||
              "PADI diving courses in Punta Cana"
            }
            title={coursesMainPage.heroTitle?.[locale]}
            subtitle={coursesMainPage.heroSubtitle?.[locale]}
            trustLine={trustLine}
            cta={
              coursesMainPage.heroCta?.label?.[locale] &&
              coursesMainPage.heroCta?.link
                ? {
                    label: coursesMainPage.heroCta.label[locale],
                    href: coursesMainPage.heroCta.link,
                  }
                : undefined
            }
          />
        )}
        <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
        <BlockContent
          content={coursesMainPage.paragraph1}
          locale={locale}
          demoteH1
        />
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
        <Faqs
          faqs={faqs.faqs}
          structuredData={faqs.structuredData}
          locale={locale}
        />
        <PadiBanner />
      </main>
    </>
  )
}
