import { Link } from "@/i18n/navigation"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"

/**
 * Course-detail hero — 78vh with the course's Cloudinary video as background,
 * a visible breadcrumb, chips (from cardHashTags), H1, and subtitle.
 */
const CourseDetailHero = ({
  videoId,
  title,
  subtitle,
  chips = [],
  courseName,
  homeLabel,
  coursesLabel,
  parentHref = "/courses",
}: {
  videoId?: string
  title: string
  subtitle?: string
  chips?: string[]
  courseName: string
  homeLabel: string
  coursesLabel: string
  /** Middle-breadcrumb link target (default the courses index). */
  parentHref?: string
}) => {
  return (
    <section className="relative isolate flex min-h-[78vh] items-end text-white">
      {videoId && (
        <CloudinaryBackgroundVideo
          className="!absolute inset-0 -z-20 !min-h-full"
          videoId={videoId}
        />
      )}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg,rgba(6,26,32,.5) 0%,rgba(6,26,32,.2) 38%,rgba(6,26,32,.82) 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-16">
        <div className="max-w-[820px] animate-rise-in">
          <nav className="mb-5 flex items-center gap-2.5 text-[13.5px] text-white/70">
            <Link href="/" className="hover:text-white">
              {homeLabel}
            </Link>
            <span>/</span>
            <Link href={parentHref} className="hover:text-white">
              {coursesLabel}
            </Link>
            <span>/</span>
            <span className="text-white">{courseName}</span>
          </nav>

          {!!chips.length && (
            <div className="mb-5 flex flex-wrap gap-2.5">
              {chips.map(chip => (
                <span
                  key={chip}
                  className="rounded-full border border-white/20 bg-white/[0.14] px-[13px] py-1.5 text-[12.5px] font-semibold backdrop-blur-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-5 font-display text-[clamp(2.5rem,5.4vw,4.6rem)] font-extrabold leading-none tracking-[-0.03em] text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)]">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.28rem)] text-white/90">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default CourseDetailHero
