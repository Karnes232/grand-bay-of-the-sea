import Image from "next/image"
import { Link } from "@/i18n/navigation"

/**
 * 2026 redesign hero. A normal-flow full-bleed section (no clip-path / absolute
 * positioning), so the page no longer needs the old `mt-[Xvh]` spacer. Renders
 * the H1 for the page.
 */
const HomeHero = ({
  heroImage,
  objectPosition,
  blurDataURL,
  alt,
  title,
  subtitle,
  trustLine,
  bookLabel,
  secondaryCta,
}: {
  heroImage: string
  /** CSS object-position from the Sanity hotspot (keeps the focal point in view). */
  objectPosition?: string
  blurDataURL?: string
  alt: string
  title?: string
  subtitle?: string
  /** e.g. "★ 4.8 · 151 Google reviews · Verified PADI Center #27147" */
  trustLine?: string
  /** Label for the primary button that scrolls to the on-page booking form. */
  bookLabel: string
  /** Secondary CTA (from Sanity heroCta). */
  secondaryCta?: { label: string; href: string }
}) => {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92vh] items-end text-white"
    >
      <Image
        src={heroImage}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="100vw"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className="-z-20 object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg,rgba(6,26,32,.55) 0%,rgba(6,26,32,.18) 32%,rgba(6,26,32,.62) 74%,rgba(6,26,32,.9) 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-[76px]">
        <div className="max-w-[760px] animate-rise-in">
          {trustLine && (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13.5px] font-medium backdrop-blur-sm">
              {trustLine}
            </span>
          )}
          {title && (
            <h1 className="mb-5 font-display text-[clamp(2.9rem,6.4vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mb-[34px] max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.3rem)] text-white/90">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-[14px]">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-[30px] py-4 text-[16.5px] font-semibold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
            >
              {bookLabel}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-full border-[1.5px] border-white/55 px-[30px] py-4 text-[16.5px] font-semibold text-white transition-colors hover:border-white hover:bg-white/[0.14]"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
