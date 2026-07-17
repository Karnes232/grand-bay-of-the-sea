import Image from "next/image"
import { Link } from "@/i18n/navigation"

/**
 * Courses hero — 70vh full-bleed section in the 2026 redesign style (mirrors
 * HomeHero). Renders the page H1. Optional single CTA from Sanity `heroCta`.
 */
const CoursesHero = ({
  heroImage,
  objectPosition,
  blurDataURL,
  alt,
  title,
  subtitle,
  trustLine,
  cta,
}: {
  heroImage: string
  objectPosition?: string
  blurDataURL?: string
  alt: string
  title?: string
  subtitle?: string
  trustLine?: string
  cta?: { label: string; href: string }
}) => {
  return (
    <section className="relative isolate flex min-h-[70vh] items-end text-white">
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
            "linear-gradient(180deg,rgba(6,26,32,.5) 0%,rgba(6,26,32,.2) 40%,rgba(6,26,32,.78) 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-[66px]">
        <div className="max-w-[760px] animate-rise-in">
          {trustLine && (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13.5px] font-medium backdrop-blur-sm">
              {trustLine}
            </span>
          )}
          {title && (
            <h1 className="mb-5 font-display text-[clamp(2.6rem,5.6vw,4.8rem)] font-extrabold leading-none tracking-[-0.03em] text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.28rem)] text-white/90">
              {subtitle}
            </p>
          )}
          {cta && (
            <div className="mt-[34px]">
              <Link
                href={cta.href}
                className="inline-block rounded-full bg-accent px-[30px] py-4 text-[16.5px] font-semibold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CoursesHero
