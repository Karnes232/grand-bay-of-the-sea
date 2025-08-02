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
      className="no-underline flex flex-col justify-between items-center cursor-pointer text-center selection-links md:h-[26rem] lg:h-[32rem] md:justify-start lg:justify-center md:-mt-8"
    >
      <div className="flex flex-col justify-center items-center lg:h-72 lg:justify-between">
        <h2
          className={`text-lg ${textColor} font-semibold md:text-2xl lg:text-3xl xl:w-72 md:min-h-[120px]`}
        >
          {name}
        </h2>
        <Image
          src={`https:${image?.url}`}
          alt="Logo"
          width={125}
          height={125}
          className="h-24 w-24 md:min-h-36 md:min-w-36 object-cover my-2 rounded-full"
          quality={75}
        />
      </div>

      <p className={`text-sm ${textColor} mx-16 md:mx-2 md:text-lg`}>
        {description}
      </p>
    </Link>
  )
}

export default LinkComponent
