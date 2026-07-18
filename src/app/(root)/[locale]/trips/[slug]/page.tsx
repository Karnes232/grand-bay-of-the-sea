import { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"

import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import {
  getIndividualTrip,
  getTripSeo,
  getTripStructuredData,
} from "@/sanity/queries/DiveTrips/Trips"

import BlockContent from "@/components/BlockContent/BlockContent"
import JsonLd from "@/components/StructuredData/JsonLd"
import FaqAccordion from "@/components/home/FaqAccordion"
import CourseDetailHero from "@/components/courses/CourseDetailHero"
import CourseGallery from "@/components/courses/CourseGallery"
import CourseStats from "@/components/courses/CourseStats"
import SanityTripOverview from "@/components/TourOverviews/SanityTripOverview"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug, locale } = await params
  const pageSeo = await getTripSeo(slug)

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates(`trips/${slug}`, locale)

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
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params

  const [trip, structuredData, tTrips, tCourses, tNav] = await Promise.all([
    getIndividualTrip(slug),
    getTripStructuredData(slug),
    getTranslations("Trips"),
    getTranslations("Courses"),
    getTranslations("Navbar"),
  ])

  const h1 = trip.title?.[locale] || trip.page
  const tripSteps = trip.tripDaySteps ?? []

  // Extended prose paragraphs (2–4), rendered in a single long-form column.
  const proseParas = [trip.paragraph2, trip.paragraph3, trip.paragraph4].filter(
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
              { name: "Dive Trips", path: "/trips" },
              { name: h1, path: `/trips/${slug}` },
            ],
            locale,
          ),
        }}
      />

      <CourseDetailHero
        videoId={trip.videoId}
        title={h1}
        subtitle={trip.cardDescription?.[locale]}
        chips={[tTrips("tripEyebrow")]}
        courseName={h1}
        homeLabel={tNav("home")}
        coursesLabel={tNav("diveTrips")}
        parentHref="/trips"
      />

      {/* Booking section */}
      <section
        id="book"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-10 pt-20"
      >
        <div className="grid grid-cols-1 items-start gap-[52px] lg:grid-cols-[1.7fr_1fr]">
          <div>
            <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
              {tTrips("excursionEyebrow")}
            </span>
            <BlockContent
              content={trip.paragraph1}
              locale={locale}
              variant="prose"
              demoteH1
            />
            <CourseStats
              stats={[
                { label: tTrips("factDuration"), value: trip.duration?.[locale] },
                { label: tTrips("factDives"), value: tTrips("factDivesValue") },
              ]}
            />
          </div>
          <SanityTripOverview tour={trip} locale={locale} />
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
              />
            ))}
          </div>
        </section>
      )}

      {/* Your day timeline (per-trip itinerary from the trip doc) */}
      {tripSteps.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 py-10">
          <h2 className="mb-9 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
            {tTrips("tripDayHeading")}
          </h2>
          <div className="ml-2 flex flex-col">
            {tripSteps.map((step, i) => (
              <div
                key={i}
                className={`relative grid grid-cols-[64px_1fr] gap-5 border-l-2 border-[#e2e9e9] pl-7 ${
                  i === tripSteps.length - 1
                    ? "border-transparent pb-0"
                    : "pb-7"
                }`}
              >
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-[3px] border-surface bg-accent" />
                <span className="font-display text-[1.05rem] font-bold tracking-tight text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="mb-1 text-[16.5px] font-semibold text-[#12303a]">
                    {step.stepTitle?.[locale]}
                  </h4>
                  <p className="text-[15px] leading-relaxed text-[#4a5f63]">
                    {step.stepBody?.[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {trip.tripDayNote?.[locale] && (
            <p className="mt-5 text-sm italic text-[#7c8f93]">
              {trip.tripDayNote[locale]}
            </p>
          )}
        </section>
      )}

      {/* Photo gallery */}
      <CourseGallery
        photoList={trip.photoList}
        heading={tCourses("detail.galleryHeading")}
        viewAllLabel={tCourses("detail.viewGallery")}
      />

      {/* CTA band → booking */}
      <section className="mt-14 bg-ink text-white">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-[46ch]">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {tTrips("ctaHeading")}
            </h2>
            <p className="text-[16.5px] leading-relaxed text-white/80">
              {tTrips("ctaBody")}
            </p>
          </div>
          <a
            href="#book"
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {tTrips("ctaLabel")} →
          </a>
        </div>
      </section>

      {trip.faqs?.length ? (
        <FaqAccordion
          faqs={trip.faqs}
          structuredData={{ en: "", es: "" }}
          locale={locale}
          heading={tCourses("faqHeading")}
        />
      ) : null}
    </main>
  )
}
