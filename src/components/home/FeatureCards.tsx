import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

type Locale = "en" | "es"

interface SectionLink {
  title: { en: string; es: string }
  description: { en: string; es: string }
  url: string
  image: {
    asset: { url: string }
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt?: string
  }
}

/**
 * Three tall image cards (redesign of the old clip-path SelectionComponent),
 * fed by the same Sanity `sectionLinks`. The legacy SelectionComponent is left
 * in place for other pages.
 */
const FeatureCards = ({
  sectionLinks,
  locale,
  ctaLabel,
}: {
  sectionLinks: SectionLink[]
  locale: Locale
  ctaLabel: string
}) => {
  if (!sectionLinks?.length) return null

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-10 pt-14">
      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {sectionLinks.map((link, i) => (
          <Link
            key={i}
            href={link.url}
            className="group relative isolate block aspect-[3/4] overflow-hidden rounded-[20px] text-white"
          >
            <Image
              src={sanityCropUrl(link.image, 750, 1000) || link.image.asset.url}
              alt={link.image.alt || link.title?.[locale] || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
              quality={75}
              className="-z-10 object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
              style={
                hotspotPosition(link.image)
                  ? { objectPosition: hotspotPosition(link.image) }
                  : undefined
              }
            />
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(180deg,rgba(6,26,32,0) 30%,rgba(6,26,32,.86) 100%)",
              }}
            />
            <div className="flex h-full flex-col justify-end p-[26px]">
              <h3 className="mb-[9px] font-display text-2xl font-bold leading-[1.1] tracking-tight">
                {link.title?.[locale]}
              </h3>
              <p className="text-sm leading-normal text-white/80">
                {link.description?.[locale]}
              </p>
              <span className="mt-4 inline-flex items-center gap-[7px] text-[14.5px] font-semibold text-accent">
                {ctaLabel} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeatureCards
