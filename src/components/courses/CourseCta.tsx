import { Link } from "@/i18n/navigation"

type Locale = "en" | "es"
type L = { en: string; es: string }

/**
 * Dark "Not sure which course?" CTA band. Copy from the new Sanity `courseCta`
 * field; links to /contact by default.
 */
const CourseCta = ({
  cta,
  locale,
}: {
  cta?: { heading?: L; body?: L; ctaLabel?: L; ctaLink?: string }
  locale: Locale
}) => {
  if (!cta?.heading?.[locale]) return null

  return (
    <section className="mt-16 bg-ink text-white">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-16">
        <div className="max-w-[44ch]">
          <h2 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {cta.heading[locale]}
          </h2>
          {cta.body?.[locale] && (
            <p className="text-[16.5px] leading-relaxed text-white/80">
              {cta.body[locale]}
            </p>
          )}
        </div>
        {cta.ctaLabel?.[locale] && (
          <Link
            href={cta.ctaLink || "/contact"}
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {cta.ctaLabel[locale]} →
          </Link>
        )}
      </div>
    </section>
  )
}

export default CourseCta
