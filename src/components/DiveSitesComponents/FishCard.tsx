"use client"
import React, { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
const FishCard = ({ fish }: { fish: any }) => {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 3,
        delay: 0.3,
      }}
      id={fish.name.replace(/\s+/g, "")}
      className="flex justify-center items-center m-4 w-80"
    >
      <div className="rounded-lg shadow-lg hover:shadow-xl transition-all bg-white max-w-sm overflow-hidden">
        <Image
          src={`https:${fish.image.fields.file?.url ?? ""}`}
          alt={fish.name}
          width={fish.image.fields?.file.details.image.width}
          height={fish.image.fields?.file.details.image.height}
          className="rounded-t-lg h-64 w-80 object-cover object-center"
          quality={75}
        />
        <div className="p-6">
          {fish.blogReference ? (
            <Link href={`/blog/marine-life/${fish.blogReference.fields.slug}`}>
              <h5 className="text-xl font-medium mb-2 cursor-pointer text-blue-600 truncate">
                {fish.name}
              </h5>
            </Link>
          ) : (
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {fish.name}
            </h5>
          )}
          {fish.blogReference && (
            <DescriptionWithReadMore
              description={fish.blogReference.fields.description}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default FishCard

const DescriptionWithReadMore = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = description.length > 120 // adjust as needed
  const t = useTranslations("FishCard")
  return (
    <div>
      <p
        className={
          expanded
            ? "text-gray-700 text-base mb-4"
            : "text-gray-700 text-base mb-4 line-clamp-2"
        }
        style={
          !expanded
            ? {
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : {}
        }
      >
        {description}
      </p>
      {isLong && (
        <button
          className="text-blue-500 hover:underline text-sm"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? t("readLess") : t("readMore")}
        </button>
      )}
    </div>
  )
}
