import React from "react"

const BackgroundVideo = ({
  className,
  video,
}: {
  className: string
  video: string
}) => {
  return (
    <div
      className={`relative min-h-[40vh] lg:min-h-[60vh] xl:min-h-[80vh] ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-50 overflow-hidden brightness-90">
        <video
          className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover object-center -z-10"
          autoPlay
          muted
          loop
          playsInline
          src={video}
        >
          <source src={video} type="video/mp4" />
         {`Your device does not support playing 'video/mp4' videos`}
        </video>
      </div>
    </div>
  )
}

export default BackgroundVideo
