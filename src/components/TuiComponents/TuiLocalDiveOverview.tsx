import Link from "next/link"
import React from "react"

const TuiLocalDiveOverview = () => {
  return (
    <div className="my-5">
      {" "}
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>Dive Packages</strong>
        </h4>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          2 Tank Dive: $120 per person
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          Duration: 2.5 Hours
        </p>

        <p className="my-1 text-sm md:text-base xl:text-lg">
          <Link href="/shark-dive-punta-cana" className="no-underline">
            Shark Dive: $199
          </Link>
        </p>

        <p className="my-1 text-sm md:text-base xl:text-lg">
          Other packages available upon request
        </p>
      </div>
    </div>
  )
}

export default TuiLocalDiveOverview
