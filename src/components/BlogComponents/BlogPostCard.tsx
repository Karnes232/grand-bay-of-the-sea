import React from "react"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { sanityCdnUrlWithParams } from "@/sanity/lib/image"

const BlogPostCard = ({ blog, locale }: { blog: any; locale: string }) => {
  const t = useTranslations("Blog")
  const bgUrl = blog.backgroundImages?.asset?.url
  return (
    <Link
      href={`/blog/${blog.blogCategory.slug.current}/${blog.slug.current}`}
      className="no-underline flex justify-center items-center my-5"
      aria-label={blog.title[locale]}
    >
      <div className="bg-white w-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 bg-gray-200">
          {bgUrl && (
            <Image
              src={sanityCdnUrlWithParams(bgUrl, {
                w: 640,
                q: 75,
              })}
              alt={blog.backgroundImages.alt ?? blog.title[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
              priority={false}
            />
          )}
        </div>
        <div className="p-5">
          <p className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
            {blog.title[locale]}
          </p>
          <p className="text-gray-600 text-sm line-clamp-3">
            {blog.description[locale]}
          </p>
          <div className="mt-4 text-sm text-blue-600 font-semibold">
            {t("readMore")} →
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostCard
