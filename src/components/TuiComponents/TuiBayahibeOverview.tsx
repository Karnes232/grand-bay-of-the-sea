import React from "react"

const TuiBayahibeOverview = () => {
  return (
    <div className="my-5">
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>Trip Overview</strong>
        </h4>
        <p className="my-1 text-center text-sm xl:text-base">
          Price: $175 per person
        </p>
        <p className="my-1 text-center text-sm xl:text-base">(2 tank dive)</p>

        <p className="my-1 text-center text-sm xl:text-base">
          Duration: 7:30 - 16:00
        </p>
        <p className="my-1 text-center text-sm xl:text-base">Lunch optional</p>
        <p className="my-1 text-center text-sm xl:text-base">
          Drinks : Alcoholic optional
        </p>
      </div>
    </div>
  )
}

export default TuiBayahibeOverview
