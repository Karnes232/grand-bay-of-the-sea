import Image from "next/image"
import { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"

import { getHreflangAlternates } from "@/utils/hreflang"
import {
  getIndividualCourse,
  getIndividualCourseSEO,
  getIndividualCourseStructuredData,
} from "@/sanity/queries/Courses/IndividualCourses"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"

import BlockContent from "@/components/BlockContent/BlockContent"
import JsonLd from "@/components/StructuredData/JsonLd"
import FaqAccordion from "@/components/home/FaqAccordion"
import SanityCourseOverview from "@/components/CourseComponents/SanityCourseOverview"
import CourseDetailHero from "@/components/courses/CourseDetailHero"
import CourseGallery from "@/components/courses/CourseGallery"
import CourseStats from "@/components/courses/CourseStats"
import { Link } from "@/i18n/navigation"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug, locale } = await params
  const pageSeo = await getIndividualCourseSEO(slug)

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      `[metadata] SEO data came back empty for course ${slug}. ` +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates(`courses/${slug}`, locale)

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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "es"; slug: string }>
}) {
  const { locale, slug } = await params
  const [structuredData, individualCourse, tCourses, tOverview, tNav] =
    await Promise.all([
      getIndividualCourseStructuredData(slug),
      getIndividualCourse(slug),
      getTranslations("Courses"),
      getTranslations("CourseOverview"),
      getTranslations("Navbar"),
    ])

  const c = individualCourse
  const h1 = c.title?.[locale] || c.course

  // "About the course" split image (crop/hotspot-aware). cardImage, else first photo.
  const splitImg = c.cardImage || c.photoList?.[0]
  const splitSrc = splitImg
    ? sanityCropUrl(splitImg, 1200, 900) || splitImg.asset?.url
    : ""
  const splitPos = hotspotPosition(splitImg)

  // Detail paragraphs → numbered steps.
  const steps = [c.paragraph3, c.paragraph4, c.paragraph5, c.paragraph6].filter(
    Boolean,
  ) as { en: any[]; es: any[] }[]

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "PADI Courses", path: "/courses" },
              { name: c.course, path: `/courses/${slug}` },
            ],
            locale,
          ),
        }}
      />

      <CourseDetailHero
        videoId={c.videoId}
        title={h1}
        subtitle={c.cardDescription?.[locale]}
        chips={c.cardHashTags}
        courseName={c.course}
        homeLabel={tNav("home")}
        coursesLabel={tNav("scubaClasses")}
      />

      {/* Booking section */}
      <section
        id="book"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-10 pt-20"
      >
        <div className="grid grid-cols-1 items-start gap-[52px] lg:grid-cols-[1.7fr_1fr]">
          <div>
            <BlockContent
              content={c.paragraph1}
              locale={locale}
              variant="prose"
              demoteH1
            />
            <CourseStats
              stats={[
                { label: tOverview("courseLevel"), value: c.level?.[locale] },
                { label: tOverview("duration"), value: c.duration?.[locale] },
                { label: tOverview("dives"), value: c.dives?.[locale] },
                { label: tOverview("maxDepth"), value: c.maxDepth?.[locale] },
              ]}
            />
          </div>
          <SanityCourseOverview course={c} locale={locale} />
        </div>
      </section>

      {/* About the course split */}
      <section className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#e2e9e9] bg-white md:grid-cols-2">
          <div className="flex flex-col justify-center p-[clamp(32px,4vw,56px)]">
            <BlockContent content={c.paragraph2} locale={locale} variant="prose" />
          </div>
          {splitSrc && (
            <div className="relative min-h-[320px]">
              <Image
                src={splitSrc}
                alt={splitImg?.alt || c.course}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                quality={75}
                className="object-cover"
                style={splitPos ? { objectPosition: splitPos } : undefined}
              />
            </div>
          )}
        </div>
      </section>

      {/* Photo gallery */}
      <CourseGallery
        photoList={c.photoList}
        heading={tCourses("detail.galleryHeading")}
        viewAllLabel={tCourses("detail.viewGallery")}
      />

      {/* Numbered steps */}
      {!!steps.length && (
        <section className="mx-auto max-w-[1080px] px-6 py-16">
          <div className="flex flex-col gap-[52px]">
            {steps.map((step, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr] items-start gap-[26px]"
              >
                <span className="font-display text-[3rem] font-extrabold leading-none tracking-[-0.03em] text-[#dce6e6]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <BlockContent content={step} locale={locale} variant="prose" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA band → booking card */}
      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-[60px]">
          <div className="max-w-[44ch]">
            <h2 className="mb-2.5 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {tCourses("detail.ctaHeading")}
            </h2>
            <p className="text-base leading-relaxed text-white/80">
              {tCourses("detail.ctaBody")}
            </p>
          </div>
          <Link
            href={`/courses/${slug}#book`}
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {tCourses("detail.ctaLabel")} →
          </Link>
        </div>
      </section>

      {c.faqs?.length ? (
        <FaqAccordion
          faqs={c.faqs}
          structuredData={c.structuredData ?? { en: "", es: "" }}
          locale={locale}
          heading={tCourses("faqHeading")}
        />
      ) : null}
    </main>
  )
}
