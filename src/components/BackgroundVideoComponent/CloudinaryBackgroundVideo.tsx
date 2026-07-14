"use client"

import React, { useEffect, useRef, useState } from "react"

const CloudinaryBackgroundVideo = ({
  className,
  videoId,
}: {
  className: string
  videoId: string
}) => {
  const cloudName = "di4fbucgh"

  const base = `https://res.cloudinary.com/${cloudName}/video/upload`
  // First frame of the video as a lightweight placeholder image.
  const poster = `${base}/so_0,q_auto,f_auto,w_720/${videoId}.jpg`

  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  // Only download the ~300KB video once the section is near the viewport.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: "400px", threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const mediaClassName =
    "absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover object-center -z-10"

  return (
    <div
      ref={wrapRef}
      className={`relative min-h-[40vh] lg:min-h-[60vh] ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-100 overflow-hidden brightness-50">
        {active ? (
          <video
            className={mediaClassName}
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
          >
            <source
              src={`${base}/q_auto,f_auto,w_1080/${videoId}.mp4`}
              type="video/mp4"
              media="(min-width: 1024px)"
            />
            <source
              src={`${base}/q_auto,f_auto,w_720/${videoId}.mp4`}
              type="video/mp4"
              media="(min-width: 640px)"
            />
            <source
              src={`${base}/q_auto,f_auto,w_480/${videoId}.mp4`}
              type="video/mp4"
            />
            {`Your device does not support video playback.`}
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className={mediaClassName}
          />
        )}
      </div>
    </div>
  )
}

export default CloudinaryBackgroundVideo
