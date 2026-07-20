import Image from "next/image"

import BlockContent from "@/components/BlockContent/BlockContent"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import type { AboutImage } from "@/sanity/queries/AboutUs/AboutUs"

type Locale = "en" | "es"
type L = { en: string; es: string }

/**
 * "Our story" split: eyebrow + heading + prose on the left, tall 4:5 image on
 * the right (WhyUnique's layout, with an image instead of its hardwired video).
 */
const StorySplit = ({
  eyebrow,
  heading,
  body,
  image,
  locale,
}: {
  eyebrow?: L
  heading?: L
  body?: { en: any[]; es: any[] }
  image?: AboutImage
  locale: Locale
}) => {
  if (!heading?.[locale]) return null

  const imgSrc = sanityCropUrl(image, 1000, 1250) || image?.asset?.url || ""

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-10 pt-[88px]">
      <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[1.05fr_1fr] lg:gap-[60px]">
        <div>
          {eyebrow?.[locale] && (
            <span className="mb-3.5 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
              {eyebrow[locale]}
            </span>
          )}
          <h2 className="mb-[22px] font-display text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance text-fg">
            {heading[locale]}
          </h2>
          {body && (
            <BlockContent
              content={body}
              locale={locale}
              variant="prose"
              wrapperClassName=""
            />
          )}
        </div>
        {imgSrc && (
          <div className="relative order-first aspect-[4/5] min-h-[320px] overflow-hidden rounded-[22px] lg:order-none">
            <Image
              src={imgSrc}
              alt={image?.alt || ""}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              quality={75}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={image?.asset?.metadata?.lqip}
              className="object-cover"
              style={
                hotspotPosition(image)
                  ? { objectPosition: hotspotPosition(image) }
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default StorySplit
