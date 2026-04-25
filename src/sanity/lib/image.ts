import createImageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { dataset, projectId } from "../env"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
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
