import Image from "next/image"
import { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"

import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSharkDive } from "@/sanity/queries/Shark-Dive/sharkDive"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"

import BlockContent from "@/components/BlockContent/BlockContent"
import JsonLd from "@/components/StructuredData/JsonLd"
import FaqAccordion from "@/components/home/FaqAccordion"
import CourseDetailHero from "@/components/courses/CourseDetailHero"
import CourseGallery from "@/components/courses/CourseGallery"
import CourseStats from "@/components/courses/CourseStats"
import SanityTripOverview from "@/components/TourOverviews/SanityTripOverview"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import { Link } from "@/i18n/navigation"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const pageSeo = await getPageSeo("Shark Dive Punta Cana")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /shark-dive-punta-cana. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates("shark-dive-punta-cana", locale)

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, sharkDive, tCourses, tNav] = await Promise.all([
    getStructuredData("Shark Dive Punta Cana"),
    getSharkDive(),
    getTranslations("Courses"),
    getTranslations("Navbar"),
  ])

  const s = sharkDive
  const h1 = s.title?.[locale] || s.page

  const chips = [s.level?.[locale], s.maxDepth?.[locale]].filter(
    Boolean,
  ) as string[]

  // "Not ready yet?" split image (crop/hotspot-aware) — a photo from the list.
  const splitImg = s.photoList?.[s.photoList.length - 1]
  const splitSrc = splitImg
    ? sanityCropUrl(splitImg, 1100, 1400) || splitImg.asset?.url
    : ""
  const splitPos = hotspotPosition(splitImg)

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              {
                name: "Shark Diving Punta Cana",
                path: "/shark-dive-punta-cana",
              },
            ],
            locale,
          ),
        }}
      />
      {/* VideoObject JSON-LD — Listín Diario feature (preserved) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "El buceo de dientes (con tiburones), una experiencia turística en auge en RD",
            description:
              "Listín Diario news feature on shark diving as a booming tourism experience in the Dominican Republic, featuring Grand Bay of the Sea's shark dive at Shark Point, Punta Cana.",
            thumbnailUrl: "https://i.ytimg.com/vi/KT_fnLkw_bc/hqdefault.jpg",
            uploadDate: "2026-01-06",
            contentUrl: "https://www.youtube.com/watch?v=KT_fnLkw_bc",
            embedUrl: "https://www.youtube.com/embed/KT_fnLkw_bc",
            publisher: {
              "@type": "Organization",
              name: "Listín Diario",
              url: "https://listindiario.com/",
            },
            about: { "@id": "https://www.grandbay-puntacana.com/#business" },
          }),
        }}
      />

      <CourseDetailHero
        videoId="greyshark_aowggg"
        title={h1}
        subtitle={s.heroSubtitle?.[locale]}
        chips={chips}
        courseName={tNav("sharkDive")}
        homeLabel={tNav("home")}
        coursesLabel={tNav("divePackages")}
        parentHref="/sites"
      />

      {/* Booking section */}
      <section
        id="book"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-10 pt-20"
      >
        <div className="grid grid-cols-1 items-start gap-[52px] lg:grid-cols-[1.7fr_1fr]">
          <div>
            <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
              {s.experienceEyebrow?.[locale]}
            </span>
            <BlockContent
              content={s.paragraph1}
              locale={locale}
              variant="prose"
              demoteH1
            />
            <BlockContent content={s.paragraph2} locale={locale} variant="prose" />
            <CourseStats
              stats={[
                {
                  label: s.factFormat?.[locale] ?? "",
                  value: s.factFormatValue?.[locale],
                },
                {
                  label: s.factDuration?.[locale] ?? "",
                  value: s.duration?.[locale],
                },
                {
                  label: s.factMaxDepth?.[locale] ?? "",
                  value: s.maxDepth?.[locale],
                },
                { label: s.factLevel?.[locale] ?? "", value: s.level?.[locale] },
              ]}
            />
          </div>
          <SanityTripOverview tour={s} locale={locale} />
        </div>
      </section>

      {/* Photo gallery */}
      <CourseGallery
        photoList={s.photoList}
        heading={s.galleryHeading?.[locale] ?? ""}
        viewAllLabel={tCourses("detail.viewGallery")}
      />

      {/* Listín Diario feature credit (preserved) */}
      <div className="flex justify-center px-6 py-4">
        <a
          href="https://www.youtube.com/watch?v=KT_fnLkw_bc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm text-muted underline underline-offset-2 hover:text-fg"
        >
          {s.featuredIn?.[locale]}
        </a>
      </div>

      {/* "Not ready yet?" split */}
      <section className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-line bg-card md:grid-cols-2">
          {splitSrc && (
            <div className="relative min-h-[340px]">
              <Image
                src={splitSrc}
                alt={splitImg?.alt || s.page}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                quality={75}
                className="object-cover"
                style={splitPos ? { objectPosition: splitPos } : undefined}
              />
            </div>
          )}
          <div className="flex flex-col justify-center p-[clamp(32px,4vw,56px)]">
            <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
              {s.notReadyEyebrow?.[locale]}
            </span>
            <BlockContent content={s.paragraph3} locale={locale} variant="prose" />
            <BlockContent content={s.paragraph4} locale={locale} variant="prose" />
            <Link
              href="/courses/advanced"
              className="mt-2 inline-block self-start rounded-full bg-ink px-[26px] py-3.5 text-[15.5px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {s.exploreAdvanced?.[locale]} →
            </Link>
          </div>
        </div>
      </section>

      {s.faqs?.length ? (
        <FaqAccordion
          faqs={s.faqs}
          structuredData={{ en: "", es: "" }}
          locale={locale}
          heading={tCourses("faqHeading")}
        />
      ) : null}

      {/* Full-bleed video CTA band (shark_hzrsvc) */}
      <section className="relative isolate overflow-hidden text-white">
        <CloudinaryBackgroundVideo
          className="!absolute inset-0 -z-20 !min-h-full"
          videoId="shark_hzrsvc"
          videoBrightness="brightness-90"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg,rgba(4,18,24,.9) 0%,rgba(4,18,24,.6) 55%,rgba(4,18,24,.35) 100%)",
          }}
        />
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="max-w-[540px]">
            <h2 className="mb-[18px] font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.03] tracking-[-0.03em] text-balance">
              {s.ctaHeading?.[locale]}
            </h2>
            <p className="mb-[30px] text-[17px] leading-relaxed text-white/85">
              {s.ctaBody?.[locale]}
            </p>
            <a
              href="#book"
              className="inline-block rounded-full bg-accent px-[30px] py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
            >
              {s.ctaLabel?.[locale]} →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
