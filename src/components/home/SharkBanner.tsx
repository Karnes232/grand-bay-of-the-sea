import Image from "next/image"
import { Link } from "@/i18n/navigation"

type Locale = "en" | "es"
type L = { en: string; es: string }

/**
 * Full-bleed shark-dive banner. Background reuses the Sanity
 * `secondaryHeroImage`; copy + CTA come from the new `sharkBanner` field.
 */
const SharkBanner = ({
  banner,
  image,
  objectPosition,
  alt,
  locale,
}: {
  banner?: {
    eyebrow?: L
    heading?: L
    body?: L
    ctaLabel?: L
    ctaLink?: string
  }
  image: string
  objectPosition?: string
  alt: string
  locale: Locale
}) => {
  if (!banner?.heading?.[locale]) return null

  return (
    <section className="relative isolate overflow-hidden text-white">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="100vw"
        quality={75}
        className="-z-20 object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg,rgba(6,22,28,.92) 0%,rgba(6,22,28,.72) 50%,rgba(6,22,28,.4) 100%)",
        }}
      />
      <div className="mx-auto max-w-[1280px] px-6 py-[88px]">
        <div className="max-w-[560px]">
          {banner.eyebrow?.[locale] && (
            <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
              {banner.eyebrow[locale]}
            </span>
          )}
          <h2 className="mb-[18px] font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.03] tracking-[-0.03em] text-balance">
            {banner.heading[locale]}
          </h2>
          {banner.body?.[locale] && (
            <p className="mb-[30px] text-[17px] leading-relaxed text-white/85">
              {banner.body[locale]}
            </p>
          )}
          {banner.ctaLabel?.[locale] && banner.ctaLink && (
            <Link
              href={banner.ctaLink}
              className="inline-block rounded-full bg-accent px-7 py-[15px] text-base font-semibold text-ink shadow-[0_12px_30px_rgba(255,106,61,0.3)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(255,106,61,0.45)]"
            >
              {banner.ctaLabel[locale]} →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default SharkBanner
