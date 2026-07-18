import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { formatDate } from "@/utils/formatDate"

/**
 * Cinematic overlay hero for an individual blog post (2026 redesign). Renders
 * the page <h1>, a breadcrumb, an accent category pill, and the author/date
 * meta row over the post's first background image.
 */
const BlogPostHero = ({
  image,
  breadcrumb,
  categoryLabel,
  title,
  author,
  publishDate,
  updatedAt,
  locale,
  labels,
}: {
  image: { url: string; lqip?: string; alt?: string }
  breadcrumb: { label: string; href?: string }[]
  categoryLabel: string
  title: string
  author: string
  publishDate?: string
  updatedAt?: string
  locale: string
  labels: { by: string; published: string; updated: string }
}) => {
  const published = formatDate(publishDate, locale)
  const updated = formatDate(updatedAt, locale)
  const showUpdated = updated && updated !== published

  return (
    <section className="relative isolate flex min-h-[66vh] items-end text-white">
      <Image
        src={image.url}
        alt={image.alt || title}
        fill
        priority
        fetchPriority="high"
        quality={80}
        sizes="100vw"
        placeholder={image.lqip ? "blur" : "empty"}
        blurDataURL={image.lqip}
        className="-z-20 object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg,rgba(6,26,32,.5) 0%,rgba(6,26,32,.25) 38%,rgba(6,26,32,.88) 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[820px] px-6 pb-14">
        <div className="animate-rise-in">
          <nav
            aria-label="Breadcrumb"
            className="mb-[18px] flex flex-wrap items-center gap-x-[9px] gap-y-1 text-[13.5px] text-white/70"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-x-[9px]">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>

          <span className="mb-[18px] inline-block rounded-full bg-accent px-[13px] py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
            {categoryLabel}
          </span>

          <h1 className="mb-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)]">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-[14px] gap-y-1 text-[14.5px] text-white/85">
            <span className="flex items-center gap-[9px]">
              <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-accent text-[14px] font-bold text-ink">
                GB
              </span>
              <span>
                {labels.by} {author}
              </span>
            </span>
            {published && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {labels.published}{" "}
                  <time dateTime={publishDate}>{published}</time>
                </span>
              </>
            )}
            {showUpdated && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {labels.updated}{" "}
                  <time dateTime={updatedAt}>{updated}</time>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPostHero
