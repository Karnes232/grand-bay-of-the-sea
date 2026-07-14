import React from "react"

const TextComponentHeading = ({
  heading,
  headingNumber,
  HeadingClassName,
}: {
  heading: string
  headingNumber: string
  HeadingClassName: string
}) => {
  return (
    <div className="relative">
      {headingNumber === "h1" && (
        <h1 className={`font-semibold ${HeadingClassName}`}>{heading}</h1>
      )}
      {headingNumber === "h2" && (
        <h2 className={`font-semibold ${HeadingClassName}`}>{heading}</h2>
      )}
      {headingNumber === "h3" && (
        <h3 className={`font-semibold ${HeadingClassName}`}>{heading}</h3>
      )}
      {headingNumber === "h4" && (
        <h4 className={`font-semibold ${HeadingClassName}`}>{heading}</h4>
      )}
      {headingNumber === "h5" && (
        <h5 className={`font-semibold ${HeadingClassName}`}>{heading}</h5>
      )}
      {headingNumber === "h6" && (
        <h6 className={`font-semibold ${HeadingClassName}`}>{heading}</h6>
      )}
    </div>
  )
}

export default TextComponentHeading
