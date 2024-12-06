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
import useWindowWidth from "../../hooks/useWindowWidth"
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
      />
    </div>
  )
}

const PhotoGallery = ({ photos }: { photos: [] }) => {
  const [index, setIndex] = useState(-1)
  let photoList = []
  photos.forEach((image: any) => {
    const photoObject = {
      src: `https:${image.fields.file.url}`,
      alt: image.fields.title,
      width: image.fields.file.details.image.width,
      height: image.fields.file.details.image.height,
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
