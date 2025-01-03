"use client"
import React, { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

interface DiveSite {
  diveSite: string
  meters: number
  feet: number
  description: string
  image: any
}

const DiveSiteCard = ({ diveSite }) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 3,
        delay: 0.3,
      }}
      className="flex justify-center m-4 w-80"
    >
      <div className="rounded-lg shadow-lg bg-white dark:bg-neutral-900 max-w-sm">
        {diveSite.diveSite === "Shark Point" ? (
          <>
            <Link href="/shark-dive-punta-cana" className="no-underline">
              <Image
                src={`https:${diveSite.image.fields.file?.url ?? ""}`}
                alt="Logo"
                width={diveSite.image.fields?.file.details.image.width}
                height={diveSite.image.fields?.file.details.image.height}
                className="rounded-t-lg h-64 w-80 object-cover object-center"
              />
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Image
              src={`https:${diveSite.image.fields.file?.url ?? ""}`}
              alt="Logo"
              width={diveSite.image.fields?.file.details.image.width}
              height={diveSite.image.fields?.file.details.image.height}
              className="rounded-t-lg h-64 w-80 object-cover object-center"
              quality={75}
            />
          </>
        )}

        <div className="p-6">
          {diveSite.diveSite === "Shark Point" ? (
            <>
              <Link href="/shark-dive-punta-cana" className="no-underline">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {diveSite.diveSite}
                </h5>
              </Link>
            </>
          ) : (
            <>
              <h5 className="text-gray-900 dark:text-white text-xl font-medium mb-2">
                {diveSite.diveSite}
              </h5>
            </>
          )}
          <p className="text-lg text-gray-700 dark:text-white mb-2">
            {diveSite.meters} meters / {diveSite.feet} feet
          </p>
          <p className="text-gray-700 dark:text-white text-base mb-4">
            {readMore
              ? diveSite.description
              : `${diveSite.description.substring(0, 150)}...`}
            <br />
            <button
              className="text-blue-700"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "show less" : "read more"}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default DiveSiteCard
