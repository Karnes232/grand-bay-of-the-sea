import React from "react"
import Image from "next/image"
const HeroComponent = ({ heroImage }: { heroImage: string }) => {
  return (
    <div className="absolute top-0 w-full h-[55vh] lg:h-[80vh]">
      <div className="relative h-[55vh] lg:h-[80vh] [clip-path:polygon(0%_0%,100%_0%,100%_50vh,0%_100%)] lg:[clip-path:polygon(0%_0%,100%_0%,100%_75vh,0%_100%)]">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover object-[40%_50%] z-0"
          priority
          quality={75}
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(245,246,252,0.52),rgba(0,0,0,0.73))]" />
      </div>
    </div>
  )
}

export default HeroComponent
