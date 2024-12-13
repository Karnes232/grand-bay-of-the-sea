import Image from "next/image"
import React from "react"

const BackgroundImage = ({ image }: { image: string }) => {
  return (
    <div className="w-full h-[30vh] lg:h-[50vh] my-5">
      <div className="relative h-[45vh] lg:h-[65vh] [clip-path:polygon(0%_5vh,100%_0%,100%_40vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_60vh,0%_100%)]">
        <Image
          src={image}
          alt="Background"
          fill
          className="object-cover object-[50%_70%]"
          loading="lazy"
          quality={75}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  )
}

export default BackgroundImage
