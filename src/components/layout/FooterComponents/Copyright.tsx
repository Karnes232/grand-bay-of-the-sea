"use client"

import React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"

const Copyright = () => {
  const t = useTranslations("Footer")

  return (
    <div className="flex flex-col justify-between py-4 md:flex-row md:items-center md:mx-auto w-full">
      <div className="flex-1"></div>
      <Link href="/" className="flex-1 text-center">
        <p className="footerSitemap">
          &copy; {new Date().getFullYear()} Grand Bay of the Sea
        </p>
      </Link>
      <p className="text-sm text-gray-400 flex items-center gap-2 flex-1 justify-center md:justify-end md:mr-8">
        {t("builtBy")}
        <a
          href="https://dr-webstudio.com"
          className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
        >
          <img
            src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
            alt="DR Web Studio"
            className="h-4"
          />
          DR Web Studio
        </a>
      </p>
    </div>
  )
}

export default Copyright
