import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import type { BlogCategory as BlogCategoryType } from "@/sanity/queries/Blog/BlogCategory"

const BlogCategory = ({
  category,
  locale,
  browseLabel,
}: {
  category: BlogCategoryType
  locale: "en" | "es"
  browseLabel: string
}) => {
  const name = category.blogCategory[locale]
  const desc = locale === "es" ? category.descEs : category.descEn
  const src = sanityCropUrl(category.cardImage, 800, 500) || category.cardImage.asset.url
  const position = hotspotPosition(category.cardImage)

  return (
    <Link
      href={`/blog/${category.slug.current}`}
      aria-label={name}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e2e9e9] bg-white no-underline transition-all duration-300 ease-smooth hover:-translate-y-[5px] hover:shadow-[0_22px_48px_rgba(11,33,41,0.13)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#dce6e6]">
        <Image
          src={src}
          alt={category.cardImage.alt || name}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 400px"
          quality={75}
          style={position ? { objectPosition: position } : undefined}
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-[26px]">
        <h3
          translate="no"
          className="mb-2 font-display text-[1.3rem] font-bold leading-[1.15] tracking-[-0.02em] text-ink"
        >
          {name}
        </h3>
        {desc && (
          <p className="line-clamp-3 flex-1 text-[14.5px] leading-relaxed text-[#4a5f63]">
            {desc}
          </p>
        )}
        <span className="mt-[18px] inline-flex items-center gap-2 text-[14.5px] font-semibold text-ink">
          {browseLabel} <span className="text-accent">→</span>
        </span>
      </div>
    </Link>
  )
}

export default BlogCategory
