import React from "react"
import Link from "next/link"
const Copyright = () => {
  return (
    <div className="mx-8 flex flex-col justify-between py-4 md:flex-row md:items-center md:mx-auto">
      <Link href="/">
        <p className="footerSitemap">
          &copy; {new Date().getFullYear()} Grand Bay of the Sea
        </p>
      </Link>
    </div>
  )
}

export default Copyright
