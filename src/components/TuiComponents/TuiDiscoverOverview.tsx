import React from "react"

const TuiDiscoverOverview = () => {
  return (
    <div className="my-5">
      {" "}
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>Course Overview</strong>
        </h4>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          Course Level: Beginner
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          Price: $110 per person
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          Duration: 2.5 Hours
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          Includes: Transport
        </p>
      </div>
    </div>
  )
}

export default TuiDiscoverOverview
