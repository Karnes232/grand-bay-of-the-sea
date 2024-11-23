"use client"
import React from "react"
import { motion } from "motion/react"
import Image from "next/image"
const FishCard = ({ fish }) => {
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
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <Image
          src={`https:${fish.image.fields.file?.url ?? ""}`}
          alt="Logo"
          width={fish.image.fields?.file.details.image.width}
          height={fish.image.fields?.file.details.image.height}
          className="rounded-t-lg h-64 w-80 object-cover object-center"
        />
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {fish.name}
          </h5>
        </div>
      </div>
    </motion.div>
  )
}

export default FishCard
