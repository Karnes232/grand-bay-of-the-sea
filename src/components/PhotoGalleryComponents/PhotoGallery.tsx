"use client"

import Image from "next/image"
import React, { useState } from "react"
import {
  MasonryPhotoAlbum,
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album"
import "react-photo-album/masonry.css"
import Lightbox from "yet-another-react-lightbox"
import NextJsImage from "./NextJsImage"
import type { PhotoGallery } from "@/sanity/queries/Photo-Gallery/PhotoGallery"

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        quality={75}
      />
    </div>
  )
}

const PhotoGallery = ({ photos }: { photos: PhotoGallery['photoList'] }) => {
  const [index, setIndex] = useState(-1)
  const photoList = []
  photos.forEach((image: any) => {
    const photoObject = {
      src: image.asset.url,
      alt: image.alt,
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
    }
    photoList.push(photoObject)
  })

  return (
    <>
      <div className="w-full my-5 mx-auto px-2 xl:px-0 lg:max-w-6xl">
        <MasonryPhotoAlbum
          photos={photoList}
          render={{ image: renderNextImage }}
          onClick={({ index }) => setIndex(index)}
          columns={containerWidth => {
            if (containerWidth < 400) return 1
            if (containerWidth < 780) return 2
            if (containerWidth < 1024) return 3
            return 3
          }}
          spacing={8}
          padding={0}
        />
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photoList}
        render={{ slide: NextJsImage }}
      />
    </>
  )
}

export default PhotoGallery
