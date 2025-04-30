import React from "react"
import Image from "next/image"
import { headers } from "next/headers"
import { isMobile } from "@/utils/isMobile"
import { getPlaiceholder } from "plaiceholder"
const HeroComponent = async ({ heroImage }: { heroImage: string }) => {
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
          width={1920}
          height={1080}
          className="object-cover object-[40%_50%] z-0 w-full h-full"
          priority={true}
          quality={65}
          // quality={mobileCheck ? 65 : 80}
          // placeholder="blur"
          // blurDataURL={base64}
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(245,246,252,0.52),rgba(0,0,0,0.73))]" />
      </div>
    </div>
  )
}

export default HeroComponent
