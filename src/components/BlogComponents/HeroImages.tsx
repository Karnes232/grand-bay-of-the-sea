import React from "react"
import HeroComponent from "../HeroComponent/HeroComponent"
import PhotoGrid from "./PhotoGrid"

const HeroImages = ({ backgroundImages }: { backgroundImages: any[] }) => {
  return (
    <>
      <div className="md:hidden">
        <HeroComponent
          heroImage={backgroundImages[0].asset.url}
          // title={blogCategory.items[0].fields.blogCategory as string}
        />
        <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      </div>
      <div className="absolute top-0 w-full md:h-[30vh]">
        <div className="hidden md:flex">
          <PhotoGrid backgroundImages={backgroundImages} />
        </div>
      </div>
      <div className="md:mt-[15vh] lg:mt-[20vh] xl:mt-[25vh] 2xl:mt-[250px]" />
    </>
  )
}

export default HeroImages
