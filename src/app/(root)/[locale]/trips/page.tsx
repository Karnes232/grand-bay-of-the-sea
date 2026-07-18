import dynamicImport from "next/dynamic"

import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getDiveTripsPage } from "@/sanity/queries/DiveTrips/DiveTripsPage"
import { getTripCards } from "@/sanity/queries/DiveTrips/Trips"
import { getFaqs } from "@/sanity/queries/Faqs/Faqs"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { getTranslations } from "next-intl/server"
import { BUSINESS } from "@/lib/business"

import BlockContent from "@/components/BlockContent/BlockContent"
import JsonLd from "@/components/StructuredData/JsonLd"
import FaqAccordion from "@/components/home/FaqAccordion"
import CoursesHero from "@/components/courses/CoursesHero"
import TripGrid from "@/components/trips/TripGrid"
import { Link } from "@/i18n/navigation"

const CloudinaryBackgroundVideo = dynamicImport(
  () =>
    import("@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"),
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
  const pageSeo = await getPageSeo("Trips")

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates("trips", locale)

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
  const [structuredData, diveTripsPage, tripCards, faqs, tTrips, tCourses, tTrust] =
    await Promise.all([
      getStructuredData("Trips"),
      getDiveTripsPage(),
      getTripCards(),
      getFaqs("Trips"),
      getTranslations("Trips"),
      getTranslations("Courses"),
      getTranslations("TrustLine"),
    ])

  const heroImg = diveTripsPage.heroImage
  const heroSrc =
    sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)

  const trustLine = tTrust("line", {
    rating: BUSINESS.rating.value,
    count: BUSINESS.rating.count,
  })

  const heroCta =
    diveTripsPage.heroCta?.label?.[locale] && diveTripsPage.heroCta?.link
      ? {
          label: diveTripsPage.heroCta.label[locale],
          href: diveTripsPage.heroCta.link,
        }
      : undefined

  const tripSteps = diveTripsPage.tripDaySteps ?? []

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Dive Trips", path: "/trips" },
            ],
            locale,
          ),
        }}
      />

      {heroSrc && (
        <CoursesHero
          heroImage={heroSrc}
          objectPosition={heroPosition}
          blurDataURL={heroImg?.asset?.metadata?.lqip || ""}
          alt={heroImg?.alt || "Dive trips from Punta Cana"}
          title={diveTripsPage.heroTitle?.[locale]}
          subtitle={diveTripsPage.heroSubtitle?.[locale]}
          trustLine={trustLine}
          cta={heroCta}
        />
      )}

      {/* Intro */}
      <section className="mx-auto max-w-[1080px] px-6 pb-2 pt-[88px]">
        <BlockContent
          content={diveTripsPage.paragraph1}
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

      {/* Trip cards */}
      <section
        id="trips"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-5 pt-14"
      >
        <TripGrid
          tripCards={tripCards}
          locale={locale}
          eyebrow={tTrips("tripEyebrow")}
          viewLabel={tTrips("viewTrip")}
          perDiverLabel={tTrips("perDiver")}
          enquireLabel={tTrips("enquire")}
          privateBadgeLabel={tTrips("privateOnly")}
        />
      </section>

      {/* Optional second paragraph */}
      {diveTripsPage.paragraph2 && (
        <section className="mx-auto max-w-[1080px] px-6 py-8">
          <BlockContent
            content={diveTripsPage.paragraph2}
            locale={locale}
            variant="prose"
          />
        </section>
      )}

      {/* What a trip day looks like */}
      {tripSteps.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-16">
          <div className="mb-10 max-w-[640px]">
            <h2 className="mb-3 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance text-ink">
              {diveTripsPage.tripDayHeading?.[locale]}
            </h2>
            <p className="text-base leading-relaxed text-[#3d5459]">
              {diveTripsPage.tripDayIntro?.[locale]}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {tripSteps.map((step, i) => (
              <div
                key={i}
                className="rounded-[18px] border border-[#e2e9e9] bg-white p-[26px]"
              >
                <span className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-[#dce6e6]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mb-1.5 mt-3 font-display text-[1.15rem] font-bold tracking-tight text-ink">
                  {step.stepTitle?.[locale]}
                </h4>
                <p className="text-sm leading-relaxed text-[#4a5f63]">
                  {step.stepBody?.[locale]}
                </p>
              </div>
            ))}
          </div>
          {diveTripsPage.tripDayNote?.[locale] && (
            <p className="mt-5 text-sm italic text-[#7c8f93]">
              {diveTripsPage.tripDayNote[locale]}
            </p>
          )}
        </section>
      )}

      {/* CTA band */}
      <section className="mt-14 bg-ink text-white">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-[46ch]">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {diveTripsPage.ctaHeading?.[locale]}
            </h2>
            <p className="text-[16.5px] leading-relaxed text-white/80">
              {diveTripsPage.ctaBody?.[locale]}
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {diveTripsPage.ctaLabel?.[locale]} →
          </Link>
        </div>
      </section>

      {faqs?.faqs?.length ? (
        <FaqAccordion
          faqs={faqs.faqs}
          structuredData={faqs.structuredData}
          locale={locale}
          heading={tCourses("faqHeading")}
        />
      ) : null}
    </main>
  )
}
