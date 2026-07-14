import React from "react"

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
