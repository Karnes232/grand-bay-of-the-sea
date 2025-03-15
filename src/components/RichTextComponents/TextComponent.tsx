"use client"

import React from "react"
import { motion } from "motion/react"
const TextComponent = ({
  title,
  heading,
  paragraph,
  className,
  pClassName,
}: {
  title?: string
  heading?: string
  paragraph?: string
  className?: string
  pClassName?: string
}) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 3,
          delay: 0.3,
        }}
        className=""
      >
        {heading === "h1" ? (
          <h1
            className={`text-2xl font-semibold mb-5 ${className} md:text-4xl`}
          >
            {title}
          </h1>
        ) : (
          <></>
        )}
        {heading === "h2" ? (
          <h2
            className={`text-2xl font-semibold mb-5 ${className} md:text-3xl`}
          >
            {title}
          </h2>
        ) : (
          <></>
        )}
        {heading === "h3" ? (
          <h3 className={`text-xl font-semibold mb-5 ${className} md:text-2xl`}>
            {title}
          </h3>
        ) : (
          <></>
        )}
        {heading === "h4" ? (
          <h4 className={`text-lg font-semibold mb-5 ${className} md:text-xl`}>
            {title}
          </h4>
        ) : (
          <></>
        )}
        {heading === "h5" ? (
          <h5 className={`text-lg font-semibold mb-5 ${className} md:text-xl`}>
            {title}
          </h5>
        ) : (
          <></>
        )}
        {heading === "h6" ? (
          <h6 className={`text-lg font-semibold mb-5 ${className} md:text-xl`}>
            {title}
          </h6>
        ) : (
          <></>
        )}
        {paragraph ? (
          <p
            className={`md:text-xl lg:mt-5 ${pClassName}`}
            // dangerouslySetInnerHTML={{ __html: paragraph }}
          >
            {paragraph}
          </p>
        ) : (
          <></>
        )}
      </motion.div>
    </div>
  )
}

export default TextComponent
