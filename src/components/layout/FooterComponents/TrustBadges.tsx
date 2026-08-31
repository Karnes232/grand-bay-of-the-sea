import Image from "next/image"
import React from "react"
import LazyIframeWhenVisible from "@/components/performance/LazyIframeWhenVisible"
import { BUSINESS } from "@/lib/business"
import { getTranslations } from "next-intl/server"

const TrustBadges = async () => {
  const tA11y = await getTranslations("A11y")
  const tFooter = await getTranslations("Footer")

  return (
    <div className="border-b border-gray-500">
      <div className="mx-8 flex flex-col justify-between py-4 md:mx-auto md:max-w-2xl md:items-center">
        <a
          href="https://www.kayak.de/Punta-Cana.23052.guide"
          rel="noreferrer"
          target="_blank"
        >
          <Image
            src="https://www.kayak.com/news/badge/kk/tg010.png"
            alt="Kayak Featured Tour"
            width={500}
            height={200}
            quality={75}
          />
        </a>
        <a
          href={BUSINESS.padiUrl}
          rel="noopener noreferrer"
          target="_blank"
          className="mt-4 text-sm text-gray-300 hover:text-white underline underline-offset-2"
        >
          {tFooter("padiVerifiedStore", { number: BUSINESS.padiNumber })}
        </a>
      </div>
      <LazyIframeWhenVisible
        src="https://widgets.sociablekit.com/google-reviews/iframe/167263"
        className="h-[420px] w-full border-0"
        width="100%"
        height={420}
        title={tA11y("googleReviews")}
        rootMargin="200px"
      />
    </div>
  )
}

export default TrustBadges
