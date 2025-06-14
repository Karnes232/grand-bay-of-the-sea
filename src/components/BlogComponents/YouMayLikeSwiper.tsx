"use client"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay } from "swiper/modules"
import BlogPostCard from "./BlogPostCard"
const YouMayLikeSwiper = ({ relatedPosts }) => {
  const [windowWidth, setWindowWidth] = useState(0)
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize, false)
  }, [])
  let slidesPerView = 1
  if (windowWidth < 680) {
    slidesPerView = 1
  }
  if (windowWidth > 680) {
    slidesPerView = 2
  }
  if (windowWidth > 1100) {
    slidesPerView = 3
  }
  return (
    <>
      <Swiper
        effect={"fade"}
        loop={true}
        slidesPerView={slidesPerView}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className={`w-full max-w-7xl 2xl:max-w-6xl mx-0`}
      >
        {relatedPosts.map((blog, index) => {
          return (
            <SwiperSlide className="relative m-5" key={index}>
              <BlogPostCard blog={blog} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default YouMayLikeSwiper
