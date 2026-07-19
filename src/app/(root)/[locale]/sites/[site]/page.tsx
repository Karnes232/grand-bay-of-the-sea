import { Metadata, ResolvingMetadata } from "next"
import { redirect, notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getDiveSite } from "@/sanity/queries/Sites/DiveSites"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import CoursesHero from "@/components/courses/CoursesHero"
import DiveSiteCard from "@/components/DiveSitesComponents/DiveSiteCard"

export const revalidate = 604800 // ISR 7 days — content refreshes on redeploy

// Sanity stores the canonical English enum; the visible label is translated
// per-locale via the DiveSiteCard i18n keys.
const LEVEL_KEY: Record<string, string> = {
  Beginner: "levelBeginner",
  Intermediate: "levelIntermediate",
  Advanced: "levelAdvanced",
  "All levels": "levelAllLevels",
}
const LOCATION_KEY: Record<string, string> = {
  Catalina: "locCatalina",
  Bayahibe: "locBayahibe",
  Local: "locLocal",
}

export async function generateMetadata(
  { params }: { params: Promise<{ site: string; locale: "en" | "es" }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { site, locale } = await params
  const diveSite = await getDiveSite(site)
  // Unknown slug is a real 404 (the page itself calls notFound()), not a
  // data failure — don't throw, and never ship a blank <head> either.
  if (!diveSite) notFound()

  const alternates = getHreflangAlternates(`sites/${site}`, locale)
  const description =
    diveSite.cardDescription?.[locale] ||
    diveSite.description?.[locale]?.slice(0, 155) ||
    ""

  return {
    title: `${diveSite.name} · Dive Site in Punta Cana`,
    description,
    openGraph: {
      title: `${diveSite.name} · Dive Site in Punta Cana`,
      description,
      images: diveSite.image.asset.url,
      type: "article",
      url: alternates.canonical,
    },
    alternates,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ site: string; locale: "en" | "es" }>
}) {
  const { site, locale } = await params

  // Shark Point has its own dedicated page.
  if (site === "shark-point") {
    redirect("/shark-dive-punta-cana")
  }

  const [diveSite, t, tCard] = await Promise.all([
    getDiveSite(site),
    getTranslations("DiveSite"),
    getTranslations("DiveSiteCard"),
  ])

  if (!diveSite) notFound()

  const heroSrc =
    sanityCropUrl(diveSite.image, 2000, 1200) || diveSite.image.asset.url

  const level =
    typeof diveSite.level === "string" ? diveSite.level : undefined
  const levelLabel = level
    ? LEVEL_KEY[level]
      ? tCard(LEVEL_KEY[level])
      : level
    : undefined
  const location =
    typeof diveSite.location === "string" ? diveSite.location : undefined
  const locationLabel = location
    ? LOCATION_KEY[location]
      ? tCard(LOCATION_KEY[location])
      : location
    : undefined

  const specs = [
    {
      label: t("maxDepth"),
      value: `${diveSite.meters} m / ${diveSite.feet} ft`,
      accent: true,
    },
    { label: t("level"), value: levelLabel },
    { label: t("location"), value: locationLabel },
  ].filter(s => s.value)

  const paragraphs = (diveSite.description?.[locale] || "")
    .split(/\n+/)
    .map(p => p.trim())
    .filter(Boolean)

  // Owner-curated nearby sites (schema reference). Empty → section hidden.
  const nearby = (diveSite.nearbySites ?? []).filter(
    s => s?.slug && s.slug !== site,
  )

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Dive Sites", path: "/sites" },
              { name: diveSite.name, path: `/sites/${site}` },
            ],
            locale,
          ),
        }}
      />

      <CoursesHero
        heroImage={heroSrc}
        objectPosition={hotspotPosition(diveSite.image)}
        blurDataURL={diveSite.image.asset.metadata?.lqip}
        alt={diveSite.image.alt || diveSite.name}
        title={diveSite.name}
        subtitle={diveSite.cardDescription?.[locale]}
        breadcrumb={[
          { label: t("diveSites"), href: "/sites" },
          { label: diveSite.name },
        ]}
      />

      {/* Spec bar */}
      {specs.length > 0 && (
        <div className="bg-ink text-white">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 px-6 sm:grid-cols-3">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="border-white/10 px-5 py-7 [border-bottom-width:1px] last:border-b-0 sm:[border-bottom-width:0] sm:[border-right-width:1px] sm:last:border-r-0"
              >
                <div className="mb-1.5 text-[12.5px] uppercase tracking-[0.1em] text-white/55">
                  {spec.label}
                </div>
                <div
                  className={`font-display text-[1.7rem] font-bold tracking-[-0.02em] ${
                    spec.accent ? "text-accent" : "text-white"
                  }`}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About the site */}
      <section className="mx-auto max-w-[820px] px-6 pb-4 pt-[72px]">
        <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
          {t("aboutEyebrow")}
        </span>
        <div className="flex flex-col gap-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[16.5px] leading-[1.8] text-[#3d5459]">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Nearby dive sites */}
      {nearby.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <h2 className="font-display text-[clamp(1.7rem,3vw,2.3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              {t("nearbyHeading")}
            </h2>
            <Link
              href="/sites"
              className="border-b-2 border-accent pb-0.5 text-[15px] font-semibold text-ink no-underline"
            >
              {t("viewAll")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((s, i) => (
              <DiveSiteCard diveSite={s} key={i} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
