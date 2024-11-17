import React from "react"

const TrustBadges = () => {
  return (
    <div className="border-b border-gray-500">
      <div className="mx-8 flex flex-col justify-between py-4 md:mx-auto md:max-w-2xl md:items-center">
        <a
          href="https://www.kayak.de/Punta-Cana.23052.guide"
          rel="noreferrer"
          target="_blank"
        >
          <img
            width="500"
            height="200"
            src="https://www.kayak.com/news/badge/kk/tg010.png"
            alt="Kayak Featured Tour"
          />
        </a>
      </div>
      <iframe
        src="https://widgets.sociablekit.com/google-reviews/iframe/167263"
        className="border-0"
        width="100%"
        height="420"
        title="google reviews"
      ></iframe>
    </div>
  )
}

export default TrustBadges
