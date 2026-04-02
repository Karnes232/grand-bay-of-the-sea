import React from "react"
import { getCachedGrandBayLogoLayout } from "@/lib/contentful"
import Image from "next/image"
import Link from "next/link"

const Logo = async () => {
  const data = await getCachedGrandBayLogoLayout()

  if (!data?.src) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex p-2 md:p-6 items-center w-20 h-20 cursor-pointer md:w-40 md:h-40" />
      </div>
    )
  }

  const { src, intrinsicWidth: iw, intrinsicHeight: ih } = data

  // Header slot: w-20 + p-2 → ~64px inner; md:w-40 + md:p-6 → ~112px inner.
  // width/height are max requested size (2× largest slot) for retina; sizes drives srcset.
  const maxSlotPx = 112
  const outW = Math.min(iw, maxSlotPx * 2)
  const outH = Math.max(1, Math.round((outW * ih) / iw))

  return (
    <div className="flex justify-center items-center">
      <Link href="/" className="no-underline" aria-label="Home">
        <div className="flex p-2 md:p-6 items-center w-20 h-20 cursor-pointer md:w-40 md:h-40">
          <Image
            src={src}
            alt="Logo"
            width={outW}
            height={outH}
            sizes="(max-width: 768px) 64px, 112px"
            quality={75}
            className="h-full w-full object-contain"
          />{" "}
        </div>
      </Link>
    </div>
  )
}

export default Logo
