import React from "react"

const HeroComponent = ({ heroImage }: { heroImage: any }) => {
  const HeroStyles = {
    backgroundPosition: "40% 50%",
    backgroundImage:
      "linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 0.73)), url(" +
      heroImage +
      ")",
  }

  return (
    <div className="absolute top-0 w-full h-[55vh] lg:h-[80vh]">
      <div
        className={`h-[55vh] lg:h-[80vh] bg-center bg-no-repeat bg-cover relative [clip-path:polygon(0%_0%,100%_0%,100%_50vh,0%_100%)] lg:[clip-path:polygon(0%_0%,100%_0%,100%_75vh,0%_100%)]`}
        style={HeroStyles}
      ></div>
    </div>
  )
}

export default HeroComponent
