import React from "react"

const GoogleMaps = () => {
  return (
    <div className="w-screen -mt-8 lg:-mt-20 google-maps xl:-mt-24">
      <iframe
        id="google-map"
        className="w-full h-72 md:h-96 lg:h-[40rem] relative brightness-75 [clip-path:polygon(0%_11vh,100%_6vh,100%_100%,0%_100%)] md:[clip-path:polygon(0%_13vh,100%_8vh,100%_100%,0%_100%)] lg:[clip-path:polygon(0%_22vh,100%_17vh,100%_100%,0%_100%)] border-0 "
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4686.043239862332!2d-68.36093478510533!3d18.648849387334387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8ed5ae3fc1995%3A0xfaa20e908d9d0359!2sGrand%20Bay%20of%20the%20Sea%20%2C%20Dive%20Center!5e1!3m2!1sen!2sdo!4v1612129278222!5m2!1sen!2sdo"
        allowFullScreen={true}
        aria-hidden="false"
        title="google-map"
      ></iframe>
    </div>
  )
}

export default GoogleMaps
