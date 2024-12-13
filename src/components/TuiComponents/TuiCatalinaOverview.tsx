import React from "react"

const TuiCatalinaOverview = () => {
  return (
    <div className="my-5">
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>Trip Overview</strong>
        </h4>
        <p className="my-1 text-center text-sm xl:text-base">
          Price: $220 per person
        </p>
        <p className="my-1 text-center text-sm xl:text-base">(2 tank dive)</p>

        <>
          <p className="my-1 text-center text-sm xl:text-base">
            Price: $110 per person
          </p>
          <p className="my-1 text-center text-sm xl:text-base">(companion)</p>{" "}
        </>

        <p className="my-1 text-center text-sm xl:text-base">
          Duration: 7:30 - 18:00
        </p>
        <p className="my-1 text-center text-sm xl:text-base">Lunch included</p>
        <p className="my-1 text-center text-sm xl:text-base">
          Drinks : Alcoholic & Non-Alcoholic included
        </p>
      </div>
    </div>
  )
}

export default TuiCatalinaOverview
