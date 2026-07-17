import { Link } from "@/i18n/navigation"

type Locale = "en" | "es"

interface CourseCard {
  course: string
  slug: { current: string }
  cardDescription: { en: string; es: string }
  cardHashTags?: string[]
  courseLevel?: string
  padiPrice?: number
}

/**
 * Redesigned text-card grid, fed by the existing Sanity individual-course card
 * data. No thumbnail (design choice — the image still shows on the course
 * detail page). One card per Sanity `individualCourse`.
 */
const CourseGrid = ({
  cards,
  locale,
  viewLabel,
}: {
  cards: CourseCard[]
  locale: Locale
  viewLabel: string
}) => {
  if (!cards?.length) return null

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(card => (
        <Link
          key={card.slug.current}
          href={`/courses/${card.slug.current}`}
          className="flex flex-col rounded-[20px] border border-[#e2e9e9] bg-white p-7 transition-all duration-200 hover:-translate-y-[6px] hover:shadow-[0_22px_48px_rgba(11,33,41,0.12)]"
        >
          <div className="mb-4 flex items-baseline justify-between gap-3">
            {card.courseLevel && (
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">
                {card.courseLevel}
              </span>
            )}
            {card.padiPrice != null && (
              <span className="font-display text-[1.4rem] font-bold tracking-tight text-accent">
                ${card.padiPrice}
              </span>
            )}
          </div>
          <h3 className="mb-[9px] font-display text-[1.28rem] font-bold tracking-tight text-ink">
            {card.course}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-[#4a5f63]">
            {card.cardDescription?.[locale]}
          </p>
          {!!card.cardHashTags?.length && (
            <div className="my-4 flex flex-wrap gap-1.5">
              {card.cardHashTags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="rounded-md bg-[#eef3f3] px-[9px] py-1 text-[11.5px] text-[#5f7378]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="mt-auto border-t border-[#eef3f3] pt-3.5 text-[14.5px] font-semibold text-ink">
            {viewLabel} →
          </span>
        </Link>
      ))}
    </div>
  )
}

export default CourseGrid
