import React from "react"
import { getSiteSettings } from "@/sanity/queries/SiteSettings/siteSettings"
import { getImageProps } from "next/image"
const DivingOrganizations = async () => {
  const settings = await getSiteSettings()

  const commonPadi = { alt: "Padi Logo", width: 480, height: 150 }
  const {
    props: { srcSet: darkPadi, ...restDarkPadi },
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
        {/* Class-driven light/dark swap — the site theme is toggled via the
            `.dark` class, so a prefers-color-scheme <picture> would desync. */}
        <img
          {...restPadi}
          srcSet={lightPadi}
          alt={commonPadi.alt}
          className="mb-8 object-cover dark:hidden"
        />
        <img
          {...restDarkPadi}
          srcSet={darkPadi}
          alt={commonPadi.alt}
          className="mb-8 hidden object-cover dark:block"
        />
      </div>
    </div>
  )
}

export default DivingOrganizations
