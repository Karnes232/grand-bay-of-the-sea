import Image from "next/image"
import React from "react"
import signature from "../../../icons/signature.png"
const Signature = () => {
  return (
    <div className="signature hidden">
      <Image
        src={signature}
        alt="James Karnes"
        className="fixed bottom-5 right-10 w-48"
        width={signature.width}
        height={signature.height}
      />
    </div>
  )
}

export default Signature
