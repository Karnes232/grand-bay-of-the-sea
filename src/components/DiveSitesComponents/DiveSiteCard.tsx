"use client"
import React, { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface DiveSite {
  name: string
  meters: number
  feet: number
  description: {
    en: any[]
    es: any[]
  }
  image: any
}

const DiveSiteCard = ({
  diveSite,
  locale,
}: {
  diveSite: DiveSite
  locale: string
}) => {
  const t = useTranslations("DiveSiteCard")
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
        {diveSite.name === "Shark Point" ? (
          <>
            <Link href="/shark-dive-punta-cana" className="no-underline">
              <Image
                src={diveSite.image.asset.url}
                alt={diveSite.image.alt}
                width={diveSite.image.asset.metadata.dimensions.width}
                height={diveSite.image.asset.metadata.dimensions.height}
                className="rounded-t-lg h-64 w-80 object-cover object-center"
              />
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Image
              src={diveSite.image.asset.url}
              alt={diveSite.image.alt}
              width={diveSite.image.asset.metadata.dimensions.width}
              height={diveSite.image.asset.metadata.dimensions.height}
              className="rounded-t-lg h-64 w-80 object-cover object-center"
              quality={75}
            />
          </>
        )}

        <div className="p-6">
          {diveSite.name === "Shark Point" ? (
            <>
              <Link href="/shark-dive-punta-cana" className="no-underline">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {diveSite.name}
                </h5>
              </Link>
            </>
          ) : (
            <>
              <h5 className="text-gray-900 dark:text-white text-xl font-medium mb-2">
                {diveSite.name}
              </h5>
            </>
          )}
          <p className="text-lg text-gray-700 dark:text-white mb-2">
            {diveSite.meters} {t("meters")} / {diveSite.feet} {t("feet")}
          </p>
          <p className="text-gray-700 dark:text-white text-base mb-4 min-h-[160px] flex flex-col items-start justify-between">
            {readMore
              ? diveSite.description[locale]
              : `${diveSite.description[locale].substring(0, 150)}...`}
            <br />
            <button
              className="text-blue-700"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? t("showLess") : t("readMore")}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default DiveSiteCard
