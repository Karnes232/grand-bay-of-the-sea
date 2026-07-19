import dynamicImport from "next/dynamic"

import { getHreflangAlternates } from "@/utils/hreflang"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { BUSINESS } from "@/lib/business"
import JsonLd from "@/components/StructuredData/JsonLd"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCoursesMainPage } from "@/sanity/queries/Courses/CoursesMainPage"
import { getIndividualCoursesCards } from "@/sanity/queries/Courses/IndividualCourses"
import { getFaqs } from "@/sanity/queries/Faqs/Faqs"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

import BlockContent from "@/components/BlockContent/BlockContent"
import FaqAccordion from "@/components/home/FaqAccordion"
import CoursesHero from "@/components/courses/CoursesHero"
import CourseGrid from "@/components/courses/CourseGrid"
import CourseCta from "@/components/courses/CourseCta"

const CloudinaryBackgroundVideo = dynamicImport(
  () =>
    import("@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"),
)
const PadiBanner = dynamicImport(
  () => import("@/components/DivingOrganizations/PadiBanner"),
)

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
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /courses. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
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
  }
}

// Section eyebrow (moss, uppercase) used above headings.
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
    {children}
  </span>
)

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
    beginnerCards,
    advancedCards,
    faqs,
    tCourses,
    tTrust,
  ] = await Promise.all([
    getStructuredData("Courses"),
    getCoursesMainPage(),
    getIndividualCoursesCards("beginner"),
    getIndividualCoursesCards("advanced"),
    getFaqs("Courses"),
    getTranslations("Courses"),
    getTranslations("TrustLine"),
  ])

  if (!coursesMainPage) {
    return (
      <main id="main">
        <p>Content not found for this Courses page. Please check Sanity.</p>
      </main>
    )
  }

  const heroImg = coursesMainPage.heroImage
  const heroSrc =
    sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)
  const heroAlt =
    heroImg?.alt || heroImg?.asset?.alt || "PADI diving courses in Punta Cana"

  const trustLine = tTrust("line", {
    rating: BUSINESS.rating.value,
    count: BUSINESS.rating.count,
  })

  const heroCta =
    coursesMainPage.heroCta?.label?.[locale] && coursesMainPage.heroCta?.link
      ? {
          label: coursesMainPage.heroCta.label[locale],
          href: coursesMainPage.heroCta.link,
        }
      : undefined

  return (
    <>
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <main id="main">
        {heroSrc && (
          <CoursesHero
            heroImage={heroSrc}
            objectPosition={heroPosition}
            blurDataURL={heroImg?.asset?.metadata?.lqip || ""}
            alt={heroAlt}
            title={coursesMainPage.heroTitle?.[locale]}
            subtitle={coursesMainPage.heroSubtitle?.[locale]}
            trustLine={trustLine}
            cta={heroCta}
          />
        )}

        {/* Intro split */}
        <section className="mx-auto max-w-[1080px] px-6 pb-2 pt-[88px]">
          {coursesMainPage.introHeading?.[locale] && (
            <h2 className="mb-[22px] font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance text-ink">
              {coursesMainPage.introHeading[locale]}
            </h2>
          )}
          <BlockContent
            content={coursesMainPage.paragraph1}
            locale={locale}
            variant="prose"
            wrapperClassName="md:columns-2 md:gap-14 [&_p]:break-inside-avoid"
          />
        </section>

        {/* Scuba video band */}
        <section className="mx-auto max-w-[1280px] px-6 pb-2 pt-10">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[24px]">
            <CloudinaryBackgroundVideo
              className="!absolute inset-0 !min-h-full"
              videoId="scubaHero_wzvqdg"
            />
          </div>
        </section>

        {/* Beginner courses */}
        <section className="mx-auto max-w-[1280px] px-6 pb-5 pt-[72px]">
          <div className="mb-10 max-w-[1280px]">
            {coursesMainPage.beginnerEyebrow?.[locale] && (
              <Eyebrow>{coursesMainPage.beginnerEyebrow[locale]}</Eyebrow>
            )}
            {coursesMainPage.beginnerHeading?.[locale] && (
              <h2 className="mb-4 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance text-ink">
                {coursesMainPage.beginnerHeading[locale]}
              </h2>
            )}
            <BlockContent
              content={coursesMainPage.paragraph2}
              locale={locale}
              variant="prose"
            />
          </div>
          <CourseGrid
            cards={beginnerCards}
            locale={locale}
            viewLabel={tCourses("viewCourse")}
          />
        </section>

        {/* Already certified? split */}
        <section className="mx-auto max-w-[1080px] px-6 pb-2 pt-[72px]">
          {coursesMainPage.advancedHeading?.[locale] && (
            <h2 className="mb-[22px] font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance text-ink">
              {coursesMainPage.advancedHeading[locale]}
            </h2>
          )}
          <BlockContent
            content={coursesMainPage.paragraph3}
            locale={locale}
            variant="prose"
            wrapperClassName="md:columns-2 md:gap-14 [&_p]:break-inside-avoid"
          />
        </section>

        {/* Specialty / advanced cards */}
        <section className="mx-auto max-w-[1280px] px-6 pb-5 pt-10">
          {coursesMainPage.specialtyEyebrow?.[locale] && (
            <Eyebrow>{coursesMainPage.specialtyEyebrow[locale]}</Eyebrow>
          )}
          <div className="mt-2">
            <CourseGrid
              cards={advancedCards}
              locale={locale}
              viewLabel={tCourses("viewCourse")}
            />
          </div>
        </section>

        {/* PADI banner (kept — includes the PADI booking widget) */}
        <div className="pt-14">
          <PadiBanner />
        </div>

        <CourseCta cta={coursesMainPage.courseCta} locale={locale} />

        <FaqAccordion
          faqs={faqs.faqs}
          structuredData={faqs.structuredData}
          locale={locale}
          heading={tCourses("faqHeading")}
        />
      </main>
    </>
  )
}
