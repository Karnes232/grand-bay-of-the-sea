import Image from "next/image"
import Link from "next/link"
import React from "react"

const IndividualTrip = ({
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
      className="no-underline flex flex-col justify-between items-center cursor-pointer text-center selection-links md:h-52 lg:h-80 md:justify-start md:-mt-8"
    >
      <div className="flex flex-col justify-center items-center lg:h-64 lg:justify-around">
        <h2
          className={`text-lg text-black font-semibold md:text-2xl lg:text-3xl`}
        >
          {name}
        </h2>
        <Image
          src={`https:${image?.file?.url ?? ""}`}
          alt={image.title}
          className="h-24 w-24 md:h-36 md:w-36 object-cover my-2 rounded-full"
          width={image.file.details.image.width}
          height={image.file.details.image.height}
          quality={75}
        />
      </div>

      <p className={`text-sm text-black mx-16 md:mx-2 md:text-lg`}>
        {description}
      </p>
    </Link>
  )
}

export default IndividualTrip
