import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import JsonLd from "@/components/StructuredData/JsonLd"
import CourseDetailHero from "@/components/courses/CourseDetailHero"
import CourseGallery from "@/components/courses/CourseGallery"
import BlockContent from "@/components/BlockContent/BlockContent"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getLiveaboards } from "@/sanity/queries/Liveaboards/Liveaboards"

type Loc = { en: any[]; es: any[] }

interface ExpeditionData {
  titleEn?: string
  titleEs?: string
  paragraph1: Loc
  paragraph2: Loc
  paragraph3: Loc
  paragraph4: Loc
  photoList: {
    asset: {
      url: string
      metadata: { lqip?: string; dimensions?: { width?: number; height?: number } }
    }
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }[]
}

/**
 * Shared layout for the two liveaboard expedition detail pages (2026 redesign):
 * video hero (breadcrumb + lifted H1) → prose → photo gallery → prose →
 * closing video band → enquire CTA. Keeps all content; no prices.
 */
const ExpeditionLayout = async ({
  locale,
  structuredData,
  path,
  expeditionName,
  heroVideoId,
  closingVideoId,
  data,
}: {
  locale: "en" | "es"
  structuredData?: string
  path: string
  expeditionName: string
  heroVideoId: string
  closingVideoId: string
  data: ExpeditionData
}) => {
  const [tNav, t, liveaboards] = await Promise.all([
    getTranslations("Navbar"),
    getTranslations("Liveaboard"),
    getLiveaboards(),
  ])

  const title = (locale === "es" ? data.titleEs : data.titleEn) ?? expeditionName

  // Drop the leading heading (lifted into the hero) from the first prose block.
  const intro = {
    en: data.paragraph1.en.slice(1),
    es: data.paragraph1.es.slice(1),
  }

  return (
    <main id="main">
      <JsonLd raw={structuredData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Liveaboard", path: "/liveaboard-dominican-republic" },
              { name: expeditionName, path },
            ],
            locale,
          ),
        }}
      />

      <CourseDetailHero
        videoId={heroVideoId}
        title={title}
        courseName={expeditionName}
        homeLabel={tNav("home")}
        coursesLabel={tNav("liveAboards")}
        parentHref="/liveaboard-dominican-republic"
      />

      {/* Intro + paragraph 2 */}
      <section className="mx-auto max-w-[820px] px-6 pb-4 pt-[72px]">
        <BlockContent content={intro as any} locale={locale} variant="prose" />
        <BlockContent
          content={data.paragraph2 as any}
          locale={locale}
          variant="prose"
          wrapperClassName="mt-8"
        />
      </section>

      {/* Gallery — first 5 photos in a bento grid, lightbox for the rest */}
      <CourseGallery
        photoList={data.photoList}
        heading={t("galleryHeading")}
        viewAllLabel={t("viewGallery")}
      />

      {/* Paragraphs 3 + 4 */}
      <section className="mx-auto max-w-[820px] px-6 py-4">
        <BlockContent
          content={data.paragraph3 as any}
          locale={locale}
          variant="prose"
        />
        <BlockContent
          content={data.paragraph4 as any}
          locale={locale}
          variant="prose"
          wrapperClassName="mt-8"
        />
      </section>

      {/* Closing video band */}
      <section className="mx-auto max-w-[1280px] px-6 pb-2 pt-6">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[24px]">
          <CloudinaryBackgroundVideo
            className="!absolute inset-0 !min-h-full"
            videoId={closingVideoId}
          />
        </div>
      </section>

      {/* CTA band */}
      <section className="mt-14 bg-ink text-white">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-[46ch]">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {liveaboards.ctaHeading?.[locale]}
            </h2>
            <p className="text-[16.5px] leading-relaxed text-white/80">
              {liveaboards.ctaBody?.[locale]}
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {liveaboards.ctaLabel?.[locale]} →
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ExpeditionLayout
