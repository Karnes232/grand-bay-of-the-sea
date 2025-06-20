import React from "react"
import Image from "next/image"
// Remove dynamic imports that prevent static rendering
// import { headers } from "next/headers"
// import { isMobile } from "@/utils/isMobile"
// import { getPlaiceholder } from "plaiceholder"

const HeroStaticComponent = ({
  heroImage,
  title,
  blurDataURL, // New prop for the blur placeholder
}: {
  heroImage: string
  title?: string
  blurDataURL?: string // Make it optional
}) => {
  // Remove dynamic logic from here
  // const headersList = await headers()
  // const userAgent = headersList.get("user-agent")
  // const mobileCheck = isMobile(userAgent)
  // const buffer = await fetch(heroImage).then(async res => {
  //   return Buffer.from(await res.arrayBuffer())
  // })
  // const { base64 } = await getPlaiceholder(buffer)

  return (
    <div className="absolute top-0 w-full h-[55vh] lg:h-[80vh]">
      <div className="relative h-[55vh] lg:h-[80vh] [clip-path:polygon(0%_0%,100%_0%,100%_50vh,0%_100%)] lg:[clip-path:polygon(0%_0%,100%_0%,100%_75vh,0%_100%)]">
        <Image
          src={heroImage}
          alt="Hero background"
          // Ensure these match your Contentful image dimensions or are appropriately responsive
          width={1920}
          height={1080}
          className="object-cover object-[40%_50%] z-0 w-full h-full"
          priority={true}
          // Use a fixed quality, or derive from build env. Mobile/desktop check cannot be done statically.
          quality={80}
          placeholder={blurDataURL ? "blur" : "empty"} // Use blurDataURL if provided, else empty
          blurDataURL={blurDataURL}
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(245,246,252,0.52),rgba(0,0,0,0.73))]" />
        {title && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center px-4 drop-shadow-lg font-crimson">
              {title}
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroStaticComponent