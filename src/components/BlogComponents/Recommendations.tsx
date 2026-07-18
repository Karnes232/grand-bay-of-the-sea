import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

/**
 * "Keep exploring" related-posts section (2026 redesign). Static grid of up to
 * three sibling posts (image + title) plus a link back to the whole category.
 */
const Recommendations = ({
  relatedPosts,
  title,
  locale,
  categorySlug,
  backLabel,
}: {
  relatedPosts: any[]
  title: string
  locale: string
  categoryName: string
  categorySlug: string
  backLabel: string
}) => {
  const posts = relatedPosts.slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section className="border-t border-[#e2e9e9] bg-white">
      <div className="mx-auto max-w-[1080px] px-6 py-16">
        <h2 className="mb-7 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold tracking-[-0.03em] text-ink">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const img = post.backgroundImages
            const src = sanityCropUrl(img, 640, 400) || img?.asset?.url
            const position = hotspotPosition(img)
            const lqip = img?.asset?.metadata?.lqip
            const name = post.title[locale]
            return (
              <Link
                key={index}
                href={`/blog/${post.blogCategory.slug.current ?? categorySlug}/${post.slug.current}`}
                aria-label={name}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-[#e2e9e9] bg-white no-underline transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(11,33,41,0.12)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#dce6e6]">
                  {src && (
                    <Image
                      src={src}
                      alt={img?.alt ?? name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                      quality={75}
                      placeholder={lqip ? "blur" : "empty"}
                      blurDataURL={lqip}
                      style={position ? { objectPosition: position } : undefined}
                      className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="px-[22px] py-5">
                  <h3 className="font-display text-[1.1rem] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
                    {name}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
        <Link
          href={`/blog/${categorySlug}`}
          className="mt-8 inline-block border-b-2 border-accent pb-0.5 text-[15.5px] font-semibold text-ink no-underline"
        >
          {backLabel}
        </Link>
      </div>
    </section>
  )
}

export default Recommendations
