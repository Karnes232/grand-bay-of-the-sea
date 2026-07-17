"use client"

import { useState } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import Lightbox from "yet-another-react-lightbox"
import NextJsImage from "@/components/PhotoGalleryComponents/NextJsImage"
import { sanityCropUrl } from "@/sanity/lib/image"

type Photo = {
  asset: {
    url: string
    metadata?: { dimensions?: { width?: number; height?: number } }
  }
  ref?: string
  crop?: unknown
  hotspot?: { x: number; y: number } | null
  alt?: string
}

/**
 * Course photo gallery: shows the first 5 photos in a bento grid; clicking any
 * opens a lightbox with the full photoList. Reuses the project's shared
 * yet-another-react-lightbox setup (NextJsImage imports the lightbox CSS).
 */
const CourseGallery = ({
  photoList,
  heading,
  viewAllLabel,
}: {
  photoList?: Photo[]
  heading: string
  viewAllLabel: string
}) => {
  const [index, setIndex] = useState(-1)
  if (!photoList?.length) return null

  // Full set for the lightbox (uncropped, real dimensions).
  const slides = photoList.map(p => ({
    src: p.asset.url,
    alt: p.alt || "Diving in Punta Cana",
    width: p.asset.metadata?.dimensions?.width,
    height: p.asset.metadata?.dimensions?.height,
  }))

  const visible = photoList.slice(0, 5)
  const remaining = photoList.length - visible.length

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-14">
      <h2 className="mb-[26px] font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
        {heading}
      </h2>
      <div className="grid auto-rows-[200px] grid-cols-2 gap-3.5 md:grid-cols-4">
        {visible.map((photo, i) => {
          const big = i === 0
          const size = big ? 1100 : 600
          const showMore = remaining > 0 && i === visible.length - 1
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo ${i + 1} of ${photoList.length}`}
              className={`group relative overflow-hidden rounded-[18px] ${
                big ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={sanityCropUrl(photo, size, size) || photo.asset.url}
                alt={photo.alt || "Diving in Punta Cana"}
                fill
                sizes={big ? "(max-width: 768px) 100vw, 640px" : "320px"}
                quality={75}
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.07]"
              />
              {showMore && (
                <span className="absolute inset-0 grid place-items-center bg-ink/55 font-display text-2xl font-bold text-white">
                  +{remaining}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-5">
        <Link
          href="/photo-gallery"
          className="text-[14.5px] font-semibold text-moss underline decoration-moss/30 underline-offset-2 hover:decoration-moss"
        >
          {viewAllLabel} →
        </Link>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        render={{ slide: NextJsImage }}
      />
    </section>
  )
}

export default CourseGallery
