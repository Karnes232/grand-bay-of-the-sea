import React from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"

const HeroStaticComponent = ({
  heroImage,
  title,
  subtitle,
  cta,
  blurDataURL,
  alt = "Scuba diving punta cana",
}: {
  heroImage: string
  title?: string
  subtitle?: string
  cta?: { label: string; href: string }
  /** Sanity `metadata.lqip` base64 blur placeholder. Optional. */
  blurDataURL?: string
  alt?: string
}) => {
  return (
    <div className="absolute top-0 w-full h-[55vh] lg:h-[80vh]">
      <div className="relative h-[55vh] lg:h-[80vh] [clip-path:polygon(0%_0%,100%_0%,100%_50vh,0%_100%)] lg:[clip-path:polygon(0%_0%,100%_0%,100%_75vh,0%_100%)]">
        <Image
          src={heroImage}
          alt={alt}
          width={1920}
          height={1080}
          className="object-cover object-[40%_50%] z-0 w-full h-full"
          priority={true}
          quality={75}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(245,246,252,0.52),rgba(0,0,0,0.73))]" />
        {(title || subtitle || cta) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
            {/* Contained dark scrim keeps the white text legible (WCAG AA)
                regardless of how bright the underlying hero image is. */}
            <div className="flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-black/45 px-6 py-8 text-center shadow-xl backdrop-blur-[2px] sm:px-10">
              {title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] font-crimson">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="max-w-2xl text-base md:text-lg lg:text-xl text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]">
                  {subtitle}
                </p>
              )}
              {cta && (
                <Link
                  href={cta.href}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-sky-700 px-7 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroStaticComponent
