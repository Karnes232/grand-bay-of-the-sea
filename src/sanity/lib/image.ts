import createImageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { dataset, projectId } from "../env"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

/**
 * A GROQ-projected image that carries the pieces needed to honor Studio's
 * hotspot/crop: the asset `_ref` (projected as `ref`) plus `crop`/`hotspot`.
 * Falls back to the dereferenced `asset.url` when the ref/crop data is absent.
 */
type CroppableImage = {
  ref?: string
  crop?: unknown
  hotspot?: { x: number; y: number } | null
  asset?: { url?: string } | null
} | null | undefined

/**
 * Build a crop + hotspot-aware CDN URL for a fixed WxH slot. Passing both width
 * and height with `fit("crop")` makes @sanity/image-url emit `rect=` (crop) and
 * `fp-x/fp-y` (hotspot), so the framing follows what the editor set in Studio.
 */
export function sanityCropUrl(
  img: CroppableImage,
  w: number,
  h: number,
): string {
  if (img?.ref) {
    return urlFor({
      _type: "image",
      asset: { _ref: img.ref },
      crop: img.crop ?? undefined,
      hotspot: img.hotspot ?? undefined,
    } as SanityImageSource)
      .width(w)
      .height(h)
      .fit("crop")
      .auto("format")
      .quality(75)
      .url()
  }
  return img?.asset?.url || ""
}

/**
 * CSS `object-position` string from the image hotspot, for responsive
 * `object-cover` slots whose aspect differs from the baked crop. Returns
 * `undefined` (browser default of 50% 50%) when no hotspot is set.
 */
export function hotspotPosition(img: CroppableImage): string | undefined {
  if (img?.hotspot && typeof img.hotspot.x === "number") {
    return `${(img.hotspot.x * 100).toFixed(2)}% ${(img.hotspot.y * 100).toFixed(2)}%`
  }
  return undefined
}

/** Append Sanity CDN transforms when `url` is already a resolved cdn.sanity.io URL (e.g. from GROQ). */
export function sanityCdnUrlWithParams(
  url: string | undefined | null,
  options: {
    w?: number
    h?: number
    q?: number
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "min" | "scale"
  },
): string {
  if (!url) return ""
  if (!url.includes("cdn.sanity.io")) return url
  try {
    const u = new URL(url)
    if (options.w != null)
      u.searchParams.set("w", String(Math.round(options.w)))
    if (options.h != null)
      u.searchParams.set("h", String(Math.round(options.h)))
    if (options.q != null) u.searchParams.set("q", String(options.q))
    if (options.fit != null) u.searchParams.set("fit", options.fit)
    u.searchParams.set("auto", "format")
    return u.toString()
  } catch {
    return url
  }
}
