import React from "react"

const BackgroundImage = ({ image }: { image: string }) => {
  const HeroStyles = {
    backgroundPosition: "50% 70%",
    backgroundImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(" +
      image +
      ")",
  }
  return (
    <div className="w-full h-[30vh] lg:h-[50vh] my-5">
      <div
        style={HeroStyles}
        className="h-[45vh] lg:h-[65vh] bg-cover relative [clip-path:polygon(0%_5vh,100%_0%,100%_40vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_60vh,0%_100%)]"
      ></div>
    </div>
  )
}

export default BackgroundImage
