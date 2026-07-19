import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import type { DiveSites } from "@/sanity/queries/Sites/DiveSites"

/**
 * Dive-site grid card (2026 redesign). White rounded card with a 4:3 image,
 * a depth badge and a coloured difficulty-level badge, the site name, and the
 * short `cardDescription`. Shark Point links through to the shark-dive page.
 */

// Level badge palette (mirrors the mockup): beginner→teal, advanced→coral,
// everything else (intermediate / all levels)→amber.
const levelBadgeClass = (level?: string) => {
  const l = (level || "").toLowerCase()
  if (l.includes("begin")) return "bg-[#2ec696] text-[#04241a]"
  if (l.includes("advanc")) return "bg-accent text-[#2a0d02]"
  return "bg-[#f5a623] text-[#2e1c00]"
}

// Sanity stores the canonical English enum value; the visible label is
// translated per-locale via these i18n keys.
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

const DiveSiteCard = async ({
  diveSite,
  locale,
}: {
  diveSite: DiveSites
  locale: "en" | "es"
}) => {
  const t = await getTranslations("DiveSiteCard")
  const isShark = diveSite.name === "Shark Point"

  const src =
    sanityCropUrl(diveSite.image, 640, 480) || diveSite.image.asset.url
  const position = hotspotPosition(diveSite.image)
  // Guard against legacy/mid-migration data where these may still be objects.
  const level = typeof diveSite.level === "string" ? diveSite.level : undefined
  const levelLabel = level ? (LEVEL_KEY[level] ? t(LEVEL_KEY[level]) : level) : undefined
  const location =
    typeof diveSite.location === "string" ? diveSite.location : undefined
  const locationLabel = location
    ? LOCATION_KEY[location]
      ? t(LOCATION_KEY[location])
      : location
    : undefined
  const blurb = diveSite.cardDescription?.[locale] ?? diveSite.description?.[locale]

  const Card = (
    <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e2e9e9] bg-white transition-all duration-300 ease-smooth hover:-translate-y-[5px] hover:shadow-[0_22px_48px_rgba(11,33,41,0.13)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={diveSite.image.alt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 400px"
          quality={75}
          style={position ? { objectPosition: position } : undefined}
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-ink/80 px-3 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur-sm">
          {diveSite.meters} {t("meters")} / {diveSite.feet} {t("feet")}
        </span>
        {levelLabel && (
          <span
            className={`absolute right-3.5 top-3.5 rounded-full px-2.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.04em] ${levelBadgeClass(
              level,
            )}`}
          >
            {levelLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {locationLabel && (
          <span className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-moss">
            {locationLabel}
          </span>
        )}
        <h3 className="mb-2 font-display text-[1.3rem] font-bold tracking-[-0.02em] text-ink">
          {diveSite.name}
        </h3>
        <p className="flex-1 text-[14.5px] leading-relaxed text-[#4a5f63]">
          {blurb}
        </p>
        {isShark && (
          <span className="mt-3.5 text-sm font-semibold text-accent">
            {t("exploreSharkDive")} →
          </span>
        )}
      </div>
    </div>
  )

  // Shark Point routes to its dedicated page; every other site links to its
  // individual dive-site page. Sites without a slug fall back to no link.
  const href = isShark
    ? "/shark-dive-punta-cana"
    : diveSite.slug
      ? `/sites/${diveSite.slug}`
      : undefined

  return href ? (
    <Link href={href} className="no-underline">
      {Card}
    </Link>
  ) : (
    Card
  )
}

export default DiveSiteCard
