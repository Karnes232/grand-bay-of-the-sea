import { getTranslations } from "next-intl/server"

import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getFishing } from "@/sanity/queries/Fishing/fishing"

import JsonLd from "@/components/StructuredData/JsonLd"
import BlockContent from "@/components/BlockContent/BlockContent"
import CourseDetailHero from "@/components/courses/CourseDetailHero"
import CourseGallery from "@/components/courses/CourseGallery"
import CourseStats from "@/components/courses/CourseStats"
import FishingOverview from "@/components/TourOverviews/FishingOverview"
import { Link } from "@/i18n/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Fishing Punta Cana")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /fishing-punta-cana. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates("fishing-punta-cana", locale)

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
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, fishing, tCourses, tNav] = await Promise.all([
    getStructuredData("Fishing Punta Cana"),
    getFishing(),
    getTranslations("Courses"),
    getTranslations("Navbar"),
  ])

  const proseParas = [fishing.paragraph2, fishing.paragraph3].filter(
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
              { name: "Fishing Punta Cana", path: "/fishing-punta-cana" },
            ],
            locale,
          ),
        }}
      />

      <CourseDetailHero
        videoId="fishing_jivxvr"
        title={fishing.heroTitle?.[locale] ?? ""}
        subtitle={fishing.heroSubtitle?.[locale]}
        chips={
          fishing.heroEyebrow?.[locale] ? [fishing.heroEyebrow[locale]] : []
        }
        courseName={tNav("deepSeaFishing")}
        homeLabel={tNav("home")}
      />

      {/* Booking section */}
      <section
        id="book"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-10 pt-20"
      >
        <div className="grid grid-cols-1 items-start gap-[52px] lg:grid-cols-[1.7fr_1fr]">
          <div>
            <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
              {fishing.bookEyebrow?.[locale]}
            </span>
            <BlockContent
              content={fishing.paragraph1}
              locale={locale}
              variant="prose"
              demoteH1
            />
            <CourseStats
              stats={[
                {
                  label: fishing.factDuration?.[locale] ?? "",
                  value: fishing.duration,
                },
              ]}
            />
          </div>
          <FishingOverview tour={fishing} />
        </div>
      </section>

      {/* Extended long-form prose */}
      {proseParas.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 py-6">
          <div className="flex flex-col gap-6">
            {proseParas.map((para, i) => (
              <BlockContent
                key={i}
                content={para}
                locale={locale}
                variant="prose"
                demoteH1
              />
            ))}
          </div>
        </section>
      )}

      {/* Photo gallery */}
      <CourseGallery
        photoList={fishing.photoList}
        heading={fishing.galleryHeading?.[locale] ?? ""}
        viewAllLabel={tCourses("detail.viewGallery")}
      />

      {/* CTA band → booking */}
      <section className="mt-14 bg-ink text-white">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-[46ch]">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {fishing.ctaHeading?.[locale]}
            </h2>
            <p className="text-[16.5px] leading-relaxed text-white/80">
              {fishing.ctaBody?.[locale]}
            </p>
          </div>
          <a
            href="#book"
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {fishing.ctaLabel?.[locale]} →
          </a>
        </div>
      </section>
    </main>
  )
}
