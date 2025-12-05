import Image from "next/image"
import Link from "next/link"
import React from "react"

const SanityIndividualTrip = ({
  name,
  url,
  description,
  image,
}: {
  name: string
  url: string
  description: string
  image: any
}) => {
  return (
    <Link
      href={url}
      className="no-underline flex flex-col justify-between items-center cursor-pointer text-center selection-links lg:h-80 md:justify-start md:w-1/3"
    >
      <div className="flex flex-col justify-center items-center lg:h-64 lg:justify-around">
        <h2
          className={`text-lg text-black dark:text-white font-semibold md:text-2xl lg:text-3xl`}
        >
          {name}
        </h2>
        <Image
          src={image.asset.url}
          alt={image.alt}
          className="h-24 w-24 md:h-36 md:w-36 object-cover my-2 rounded-full"
          width={image.asset.metadata.dimensions.width}
          height={image.asset.metadata.dimensions.height}
          quality={75}
        />
      </div>

      <p
        className={`text-sm text-black dark:text-white mx-16 md:mx-2 md:text-lg md:mt-5 md:min-h-36`}
      >
        {description}
      </p>
    </Link>
  )
}

export default SanityIndividualTrip
