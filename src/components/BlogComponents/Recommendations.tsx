import React from "react"
import YouMayLikeSwiper from "./YouMayLikeSwiper"

const Recommendations = ({
  relatedPosts,
  title,
}: {
  relatedPosts: any[]
  title: string
}) => {
  return (
    <div className="max-w-6xl my-5 mx-5 md:mx-10 xl:mx-auto xl:min-w-[65rem]">
      <h5 className="font-bold text-lg">{title}</h5>
      <YouMayLikeSwiper relatedPosts={relatedPosts} />
    </div>
  )
}

export default Recommendations
