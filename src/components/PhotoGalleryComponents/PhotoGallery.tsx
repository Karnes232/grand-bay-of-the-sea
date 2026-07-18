"use client"

import Image from "next/image"
import React, { useMemo, useState } from "react"
import {
  MasonryPhotoAlbum,
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album"
import "react-photo-album/masonry.css"
import Lightbox from "yet-another-react-lightbox"
import { useTranslations } from "next-intl"
import NextJsImage from "./NextJsImage"
import type { PhotoGallery } from "@/sanity/queries/Photo-Gallery/PhotoGallery"

// Canonical category values (stored in Sanity) → i18n label key.
const CATEGORIES = [
  { value: "Marine Life", key: "marineLife" },
  { value: "Sharks", key: "sharks" },
  { value: "Wrecks", key: "wrecks" },
  { value: "Divers", key: "divers" },
] as const

/** Uniform Fisher-Yates shuffle on a copy (leaves the original array intact). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      className="group relative overflow-hidden rounded-[16px] bg-[#dce6e6]"
      style={{ width: "100%", aspectRatio: `${width} / ${height}` }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        quality={75}
        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
      />
      {alt && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-left text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {alt}
        </span>
      )}
    </div>
  )
}

const PhotoGallery = ({ photos }: { photos: PhotoGallery["photoList"] }) => {
  const t = useTranslations("PhotoGallery")
  // Shuffle once per mount → a fresh random order on every visit. Safe from
  // hydration mismatch because the masonry grid renders client-side only.
  const [ordered] = useState(() => shuffle(photos))
  const [active, setActive] = useState<string>("All")
  const [index, setIndex] = useState(-1)

  const filtered = useMemo(
    () =>
      active === "All"
        ? ordered
        : ordered.filter(p => p.categories?.includes(active)),
    [ordered, active],
  )

  const slides = useMemo(
    () =>
      filtered.map(image => ({
        src: image.asset.url,
        alt: image.alt,
        width: image.asset.metadata.dimensions.width,
        height: image.asset.metadata.dimensions.height,
      })),
    [filtered],
  )

  const selectCategory = (value: string) => {
    setActive(value)
    setIndex(-1)
  }

  const pill = (value: string, label: string) => {
    const isActive = active === value
    return (
      <button
        key={value}
        type="button"
        onClick={() => selectCategory(value)}
        className={`rounded-full border px-5 py-2.5 text-[14.5px] font-semibold transition-colors ${
          isActive
            ? "border-accent bg-accent text-ink"
            : "border-[#d7e0e0] bg-white text-[#3d5459] hover:border-accent"
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-20">
      <div className="mb-8 flex flex-wrap gap-2.5">
        {pill("All", t("all"))}
        {CATEGORIES.map(c => pill(c.value, t(c.key)))}
      </div>

      <MasonryPhotoAlbum
        photos={slides}
        render={{ image: renderNextImage }}
        onClick={({ index }) => setIndex(index)}
        columns={containerWidth => {
          if (containerWidth < 440) return 1
          if (containerWidth < 760) return 2
          if (containerWidth < 1100) return 3
          return 4
        }}
        spacing={16}
        padding={0}
      />

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

export default PhotoGallery
