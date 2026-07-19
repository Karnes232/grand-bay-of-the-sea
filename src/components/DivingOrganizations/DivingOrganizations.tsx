import React from "react"
import { getSiteSettings } from "@/sanity/queries/SiteSettings/siteSettings"
import { getImageProps } from "next/image"
const DivingOrganizations = async () => {
  const settings = await getSiteSettings()

  const commonPadi = { alt: "Padi Logo", width: 480, height: 150 }
  const {
    props: { srcSet: darkPadi },
  } = getImageProps({
    ...commonPadi,
    src: settings.padiLogoDark?.asset?.url ?? "",
  })
  const {
    props: { srcSet: lightPadi, ...restPadi },
  } = getImageProps({
    ...commonPadi,
    src: settings.padiLogo?.asset?.url ?? "",
  })

  return (
    <div className="max-w-6xl m-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center space-x-5 lg:space-x-10 mt-8 mx-5 md:mx-0">
        <picture className="mb-8 object-cover">
          <source media="(prefers-color-scheme: dark)" srcSet={darkPadi} />
          <source media="(prefers-color-scheme: light)" srcSet={lightPadi} />
          <img {...restPadi} alt={commonPadi.alt} />
        </picture>
      </div>
    </div>
  )
}

export default DivingOrganizations
