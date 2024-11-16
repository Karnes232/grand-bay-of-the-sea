import Image from "next/image"
import Link from "next/link"
import React from "react"

const LinkComponent = ({
  name,
  url,
  description,
  image,
  textColor,
}: {
  name: string
  url: string
  description: string
  image: any
  textColor: string
}) => {
  return (
    <Link
      href={url}
      className="no-underline flex flex-col justify-between items-center cursor-pointer text-center selection-links md:h-52 lg:h-80 md:justify-start md:-mt-8"
    >
      <div className="flex flex-col justify-center items-center lg:h-64 lg:justify-around">
        <h2
          className={`text-lg ${textColor} font-semibold md:text-2xl lg:text-3xl`}
        >
          {name}
        </h2>
        <Image
          src={`https:${image?.url}`}
          alt="Logo"
          width={image.details.image.width}
          height={image.details.image.height}
          className="h-24 w-24 md:h-36 md:w-36 object-cover my-2 rounded-full border-solid border-[1px] border-black"
        />
      </div>

      <p className={`text-sm ${textColor} mx-16 md:mx-2 md:text-lg`}>
        {description}
      </p>
    </Link>
  )
}

export default LinkComponent
