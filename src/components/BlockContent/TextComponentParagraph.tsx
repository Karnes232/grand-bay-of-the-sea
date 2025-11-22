import React from "react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const TextComponentParagraph = ({
  paragraph,
  ParagraphClassName,
}: {
  paragraph: string
  ParagraphClassName: string
}) => {
  return (
    <p
      className={`md:text-xl lg:mt-5 ${ParagraphClassName}`}
      // dangerouslySetInnerHTML={{ __html: paragraph }}
    >
      {paragraph}
    </p>
  )
}

export default TextComponentParagraph
