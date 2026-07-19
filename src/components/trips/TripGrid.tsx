import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { sanityCropUrl } from "@/sanity/lib/image"
import type { TripCards } from "@/sanity/queries/DiveTrips/Trips"

type Locale = "en" | "es"

/**
 * Redesigned trip cards for the hub: large horizontal cards with the image on
 * alternating sides. Each card links to its /trips/[slug] detail page. Fed by
 * the same getTripCards data (now also projecting duration + extras + crop).
 */
const TripGrid = ({
  tripCards,
  locale,
  eyebrow,
  viewLabel,
  perDiverLabel,
  enquireLabel,
  privateBadgeLabel,
}: {
  tripCards: TripCards[]
  locale: Locale
  eyebrow: string
  viewLabel: string
  perDiverLabel: string
  enquireLabel: string
  privateBadgeLabel: string
}) => {
  if (!tripCards?.length) return null

  return (
    <div className="flex flex-col gap-8">
      {tripCards.map((trip, i) => {
        const imageFirst = i % 2 === 0
        const isPrivate = !!trip.privateOnly
        const src =
          sanityCropUrl(trip.cardImage, 1200, 1000) || trip.cardImage.asset.url
        return (
          <Link
            key={trip.page}
            href={`/trips/${trip.slug.current}`}
            className="group grid grid-cols-1 overflow-hidden rounded-[24px] border border-line bg-card md:grid-cols-2"
          >
            <div
              className={`relative order-1 min-h-[280px] overflow-hidden md:min-h-[420px] ${
                imageFirst ? "md:order-1" : "md:order-2"
              }`}
            >
              <Image
                src={src}
                alt={trip.cardImage.alt || trip.cardTitle?.[locale] || ""}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                quality={75}
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              />
              {isPrivate && (
                <span className="absolute left-[18px] top-[18px] rounded-full bg-accent px-3.5 py-[7px] text-[12px] font-bold uppercase tracking-[0.06em] text-ink">
                  {privateBadgeLabel}
                </span>
              )}
            </div>

            <div
              className={`order-2 flex flex-col p-[clamp(30px,3.5vw,48px)] ${
                imageFirst ? "md:order-2" : "md:order-1"
              }`}
            >
              <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
                {eyebrow}
              </span>
              <h3 className="mb-3.5 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
                {trip.cardTitle?.[locale]}
              </h3>
              <p className="mb-[22px] text-base leading-relaxed text-muted">
                {trip.cardDescription?.[locale]}
              </p>

              {trip.duration?.[locale] && (
                <div className="mb-[18px] inline-flex w-fit items-center gap-2 rounded-full bg-surface-soft px-3.5 py-1.5 text-[13px] font-semibold text-fg">
                  {trip.duration[locale]}
                </div>
              )}

              {!!trip.extras?.length && (
                <ul className="mb-[26px] flex flex-col gap-2.5">
                  {trip.extras.map((extra, x) => (
                    <li
                      key={x}
                      className="flex items-center gap-2.5 text-[14.5px] text-muted"
                    >
                      <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-moss/[0.14] text-[12px] text-moss">
                        ✓
                      </span>
                      {extra?.[locale]}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-surface-soft pt-5">
                {trip.price != null && (
                  <div>
                    <span className="font-display text-[1.9rem] font-extrabold tracking-[-0.03em] text-fg">
                      ${trip.price}
                    </span>
                    <span className="text-sm text-faint"> {perDiverLabel}</span>
                  </div>
                )}
                <span className="rounded-full bg-accent px-[26px] py-3.5 text-[15.5px] font-semibold text-ink shadow-[0_10px_26px_rgba(255,106,61,0.28)] transition-transform group-hover:-translate-y-0.5">
                  {isPrivate ? enquireLabel : viewLabel} →
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default TripGrid
