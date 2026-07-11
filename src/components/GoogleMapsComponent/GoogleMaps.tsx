import LazyIframeWhenVisible from "@/components/performance/LazyIframeWhenVisible"

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4686.043239862332!2d-68.36093478510533!3d18.648849387334387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8ed5ae3fc1995%3A0xfaa20e908d9d0359!2sGrand%20Bay%20of%20the%20Sea%20%2C%20Dive%20Center!5e1!3m2!1sen!2sdo!4v1612129278222!5m2!1sen!2sdo"

type MapVariant = "hero" | "flat" | "card"

/**
 * `hero` (default) carries the homepage-specific negative margins / clip-path
 * slants / brightness filter (they overlap the homepage's full-bleed
 * background and would swallow the map top on plain pages). `flat` is a plain
 * full-bleed strip; `card` is an in-column rounded map for grid layouts.
 */
const wrapperClasses: Record<MapVariant, string> = {
  hero: "w-screen -mt-8 lg:-mt-20 google-maps xl:-mt-24",
  flat: "w-screen mt-8 google-maps",
  card: "w-full overflow-hidden rounded-xl shadow-md ring-1 ring-black/[0.06]",
}

const iframeClasses: Record<MapVariant, string> = {
  hero: "relative h-72 w-full border-0 brightness-75 [clip-path:polygon(0%_11vh,100%_6vh,100%_100%,0%_100%)] md:h-96 md:[clip-path:polygon(0%_13vh,100%_8vh,100%_100%,0%_100%)] lg:h-[40rem] lg:[clip-path:polygon(0%_22vh,100%_17vh,100%_100%,0%_100%)]",
  flat: "relative h-72 w-full border-0 md:h-96 lg:h-[40rem]",
  card: "relative h-80 w-full border-0",
}

const GoogleMaps = ({ variant = "hero" }: { variant?: MapVariant }) => {
  return (
    <div className={wrapperClasses[variant]}>
      <LazyIframeWhenVisible
        id={`google-map-${variant}`}
        src={MAP_EMBED}
        title="Grand Bay of the Sea dive center on Google Maps"
        allowFullScreen
        aria-hidden={false}
        rootMargin="480px"
        className={iframeClasses[variant]}
      />
    </div>
  )
}
export default GoogleMaps
