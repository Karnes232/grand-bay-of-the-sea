import React from "react"

const CloudinaryBackgroundVideo = ({
  className,
  videoId,
}: {
  className: string
  videoId: string
}) => {
    const cloudName = "di4fbucgh"

    const base = `https://res.cloudinary.com/${cloudName}/video/upload`

    return (
      <div className={`relative min-h-[40vh] lg:min-h-[60vh] ${className}`}>
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-75 overflow-hidden brightness-90">
          <video
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover object-center -z-10"
            autoPlay
            muted
            loop
            playsInline
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
        </div>
      </div>
    )
}

export default CloudinaryBackgroundVideo
