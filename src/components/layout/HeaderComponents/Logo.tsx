import React from "react"
import { getCachedGrandBayLogoLayout } from "@/lib/contentful"
import Image from "next/image"
import { Link } from "@/i18n/navigation"

const Logo = async () => {
  const data = await getCachedGrandBayLogoLayout()

  if (!data?.src) {
    return (
      <div className="flex items-center">
        <div className="h-14 w-32 md:h-[72px]" />
      </div>
    )
  }

  const { src, intrinsicWidth: iw, intrinsicHeight: ih } = data

  // Redesign header bar is 80/96px tall — display the logo at ~56–72px height,
  // width auto. width/height keep the intrinsic ratio (2× the 80px slot for retina).
  const maxSlotPx = 80
  const outH = Math.min(ih, maxSlotPx * 2)
  const outW = Math.max(1, Math.round((outH * iw) / ih))

  return (
    <Link href="/" className="flex items-center no-underline" aria-label="Home">
      <Image
        src={src}
        alt="Logo"
        width={outW}
        height={outH}
        sizes="(max-width: 768px) 120px, 160px"
        quality={75}
        priority
        className="h-14 w-auto object-contain md:h-[72px]"
      />
    </Link>
  )
}

export default Logo
