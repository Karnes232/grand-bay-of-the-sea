"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image"
const SwiperCarousel = ({
  photoList,
  className,
}: {
  photoList: any
  className: string
}) => {
  const photoListEdited = photoList.map((photo: any) => {
    return {
      image: `https:${photo.fields.file.url}`,
      title: photo.fields.title,
      width: photo.fields.file.details.image.width,
      height: photo.fields.file.details.image.height,
    }
  })
  return (
    <div
      className={`${className} relative h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh] my-2`}
    >
      <Swiper
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className={`mySwiper mt-3 h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
      >
        {photoListEdited.map((photo: any, index: number) => (
          <SwiperSlide className="relative" key={index}>
            <Image
              src={photo.image}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              className="h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh] object-cover w-full brightness-90"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperCarousel
