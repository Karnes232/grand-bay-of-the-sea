"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image"
const SanitySwiperCarousel = ({
  photoList,
  className,
  height,
}: {
  photoList: any
  className: string
  height: string
}) => {
  const photoListEdited = photoList.map((photo: any) => {
    return {
      image: photo.asset.url,
      title: photo.alt,
      width: photo.asset.metadata.dimensions.width,
      height: photo.asset.metadata.dimensions.height,
    }
  })
  return (
    <div className={`${className} relative  ${height} my-2`}>
      <Swiper
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className={`mySwiper mt-3 ${height}`}
      >
        {photoListEdited.map((photo: any, index: number) => (
          <SwiperSlide className="relative" key={index}>
            <Image
              src={photo.image}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              className={`${height} object-cover w-full brightness-90`}
              quality={75}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SanitySwiperCarousel
