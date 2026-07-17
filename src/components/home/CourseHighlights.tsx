import dynamicImport from "next/dynamic"
import { Link } from "@/i18n/navigation"
import BlockContent from "@/components/BlockContent/BlockContent"

const DivingOrganizations = dynamicImport(
  () => import("@/components/DivingOrganizations/DivingOrganizations"),
)

type Locale = "en" | "es"
type L = { en: string; es: string }

interface CourseHighlight {
  badge?: L
  title?: L
  blurb?: L
  href?: string
}

/**
 * "PADI courses & guided experiences" — new course cards + the kept PADI banner
 * (DivingOrganizations) + the existing Sanity `paragraph3` as the trailing copy.
 */
const CourseHighlights = ({
  heading,
  courses,
  paragraph3,
  locale,
}: {
  heading: string
  courses?: CourseHighlight[]
  paragraph3: { en: any[]; es: any[] }
  locale: Locale
}) => {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-[88px]">
      <div className="mb-[38px] flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[16ch] font-display text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.03] tracking-[-0.03em] text-balance text-ink">
          {heading}
        </h2>
      </div>

      {!!courses?.length && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <Link
              key={i}
              href={course.href || "/courses"}
              className="block rounded-[18px] border border-[#e2e9e9] bg-white p-[30px] transition-transform duration-200 hover:-translate-y-[5px] hover:shadow-[0_20px_44px_rgba(11,33,41,0.1)]"
            >
              {course.badge?.[locale] && (
                <span className="mb-[14px] inline-block text-[12.5px] font-semibold uppercase tracking-[0.1em] text-accent">
                  {course.badge[locale]}
                </span>
              )}
              <h3 className="mb-2 font-display text-[1.35rem] font-bold tracking-tight text-ink">
                {course.title?.[locale]}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[#4a5f63]">
                {course.blurb?.[locale]}
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <DivingOrganizations />
      </div>

      <div className="mt-8 max-w-[72ch]">
        <BlockContent content={paragraph3} locale={locale} variant="prose" />
      </div>
    </section>
  )
}

export default CourseHighlights
