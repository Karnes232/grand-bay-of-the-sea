import React from "react"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

const BlogPostCard = ({ blog, locale }: { blog: any; locale: string }) => {
  const t = useTranslations("Blog")
  const img = blog.backgroundImages
  const src = sanityCropUrl(img, 640, 420) || img?.asset?.url
  const position = hotspotPosition(img)
  const lqip = img?.asset?.metadata?.lqip

  return (
    <Link
      href={`/blog/${blog.blogCategory.slug.current}/${blog.slug.current}`}
      aria-label={blog.title[locale]}
      className="group grid grid-cols-1 overflow-hidden rounded-[20px] border border-[#e2e9e9] bg-white no-underline transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(11,33,41,0.13)] md:grid-cols-[300px_1fr]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#dce6e6] md:aspect-auto">
        {src && (
          <Image
            src={src}
            alt={img?.alt ?? blog.title[locale]}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            quality={75}
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            style={position ? { objectPosition: position } : undefined}
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col justify-center px-[30px] py-[28px]">
        <h2 className="mb-[9px] line-clamp-2 font-display text-[clamp(1.25rem,2vw,1.55rem)] font-bold leading-[1.12] tracking-[-0.02em] text-ink">
          {blog.title[locale]}
        </h2>
        <p className="mb-4 line-clamp-2 text-[15px] leading-relaxed text-[#4a5f63]">
          {blog.description[locale]}
        </p>
        <span className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-ink">
          {t("readMore")} <span className="text-accent">→</span>
        </span>
      </div>
    </Link>
  )
}

export default BlogPostCard
