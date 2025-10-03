"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

const PhotoGrid = ({ backgroundImages }: { backgroundImages: any[] }) => {
  const [imageCount, setImageCount] = useState(3)
  const [targetHeight, setTargetHeight] = useState(250)

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth >= 1536) {
        setImageCount(4)
        setTargetHeight(400) // Larger on 2xl screens
      } else if (window.innerWidth >= 1280) {
        setImageCount(4)
        setTargetHeight(320) // Larger on xl screens
      } else if (window.innerWidth >= 1024) {
        setImageCount(4)
        setTargetHeight(280) // Larger on lg screens
      } else if (window.innerWidth >= 768) {
        setImageCount(3)
        setTargetHeight(250) // Base size on md screens
      } else {
        setImageCount(3)
        setTargetHeight(250)
      }
    }

    updateLayout()
    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [])

  const photos = backgroundImages.slice(0, imageCount)

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="flex gap-0"
        style={{
          width: "100%",
          height: `${targetHeight}px`,
        }}
      >
        {photos.map((image, index) => {
          // Calculate width based on original aspect ratio and dynamic height
          const originalWidth = image.fields.file.details.image.width
          const originalHeight = image.fields.file.details.image.height
          const aspectRatio = originalWidth / originalHeight
          const calculatedWidth = targetHeight * aspectRatio // Dynamic height * aspect ratio

          return (
            <div
              key={index}
              className="relative overflow-hidden bg-gray-100"
              style={{
                height: `${targetHeight}px`,
                width: `${calculatedWidth}px`,
                minWidth: `${calculatedWidth}px`, // Prevent shrinking
                borderRadius: "2px",
              }}
            >
              <Image
                fill
                src={`https:${image.fields.file.url}`}
                alt={image.fields.title}
                sizes={`${Math.min(calculatedWidth, 600)}px`}
                quality={75}
                style={{ objectFit: "cover" }}
                className="transition-all duration-300 hover:scale-105"
                // priority={index === 0}
              />
              {/* Gradient overlay: transparent at top, dark at bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PhotoGrid
