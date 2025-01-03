import Image from "next/image"
import Link from "next/link"
import React from "react"

const SingleCourseCard = ({
  title,
  description,
  image,
  link,
  hash1,
  hash2,
  hash3,
}: {
  title: string
  description: string
  image: any
  link: string
  hash1: string
  hash2: string
  hash3: string
}) => {
  return (
    <Link href={link} className="no-underline ">
      <div className="max-w-xs w-80 my-4 rounded overflow-hidden shadow-lg dark:bg-neutral-900">
        <Image
          src={`https:${image?.file?.url ?? ""}`}
          alt={image.title}
          className="w-full h-80 object-cover"
          width={image.file.details.image.width}
          height={image.file.details.image.height}
          quality={70}
        />
        <div className="px-6 py-4 h-40 flex flex-col">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 dark:text-white text-base flex justify-center items-center flex-grow">
            {description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 h-24 flex flex-wrap items-end justify-center">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{hash1}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{hash2}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{hash3}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default SingleCourseCard
