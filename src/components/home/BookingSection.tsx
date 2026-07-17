import BookingLeadForm from "./BookingLeadForm"

type Locale = "en" | "es"
type L = { en: string; es: string }

/**
 * Dark "Book direct" section: new Sanity copy + benefits on the left, the
 * inline lead form on the right. Anchor target for the hero/header "Book" CTAs.
 */
const BookingSection = ({
  booking,
  benefits,
  locale,
}: {
  booking?: { eyebrow?: L; heading?: L; body?: L }
  benefits?: L[]
  locale: Locale
}) => {
  return (
    <section id="book" className="scroll-mt-20 bg-ink text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-[60px] px-6 py-[88px] lg:grid-cols-2">
        <div>
          {booking?.eyebrow?.[locale] && (
            <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
              {booking.eyebrow[locale]}
            </span>
          )}
          {booking?.heading?.[locale] && (
            <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance">
              {booking.heading[locale]}
            </h2>
          )}
          {booking?.body?.[locale] && (
            <p className="mb-7 text-[17px] leading-relaxed text-white/80">
              {booking.body[locale]}
            </p>
          )}
          {!!benefits?.length && (
            <ul className="flex flex-col gap-3.5">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[15.5px] text-white/90"
                >
                  <span className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full bg-accent/[0.16] text-sm text-accent">
                    ✓
                  </span>
                  {benefit?.[locale]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <BookingLeadForm />
      </div>
    </section>
  )
}

export default BookingSection
