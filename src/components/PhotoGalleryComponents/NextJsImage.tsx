import Image from "next/image"
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css";

function isNextJsImage(slide) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  )
}

export default function NextJsImage({ slide, window, offset, rect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps()
  const { currentIndex } = useLightboxState()

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  if (!isNextJsImage(slide)) return undefined

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height

  return (
    <div
      className="relative flex justify-center items-center w-full lg:h-full"
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        alt={slide.alt}
        src={slide}
        loading="eager"
        draggable={false}
        // placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  )
}
