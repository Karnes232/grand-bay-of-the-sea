"use client"
import React, { useState } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

const FishCard = ({ fish, locale }: { fish: any; locale: string }) => {
  const name = fish.name[locale as "en" | "es"] || fish.name.en
  const src = sanityCropUrl(fish.image, 640, 480) || fish.image.asset.url
  const position = hotspotPosition(fish.image)

  return (
    <div
      id={fish.name.en?.replace(/\s+/g, "")}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-card transition-all duration-300 ease-smooth hover:-translate-y-[5px] hover:shadow-[0_22px_48px_rgba(11,33,41,0.13)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <Image
          src={src}
          alt={fish.image.alt || name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 400px"
          quality={75}
          style={position ? { objectPosition: position } : undefined}
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {fish.blogReference?.slug ? (
          <Link
            href={`/blog/marine-life/${fish.blogReference.slug.current}`}
            className="group/link mb-2 inline-block font-display text-[1.3rem] font-bold tracking-[-0.02em] text-moss underline decoration-moss/40 decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {name}{" "}
            <span
              aria-hidden
              className="inline-block no-underline transition-transform group-hover/link:translate-x-1"
            >
              →
            </span>
          </Link>
        ) : (
          <h3 className="mb-2 font-display text-[1.3rem] font-bold tracking-[-0.02em] text-fg">
            {name}
          </h3>
        )}
        <DescriptionWithReadMore description={fish.description[locale]} />
      </div>
    </div>
  )
}

export default FishCard

const DescriptionWithReadMore = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = description.length > 120
  const t = useTranslations("FishCard")
  return (
    <div className="flex flex-1 flex-col">
      <p
        className="flex-1 text-[14.5px] leading-relaxed text-muted"
        style={
          !expanded
            ? {
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : {}
        }
      >
        {description}
      </p>
      {isLong && (
        <button
          className="mt-2 self-start text-sm font-semibold text-moss hover:underline"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? t("readLess") : t("readMore")}
        </button>
      )}
    </div>
  )
}
