import Image from "next/image"

/**
 * Clean full-bleed photo break (redesign replacement for the old clip-path
 * BackgroundImage). Keeps the Sanity `tertiaryHeroImage` in use.
 */
const ImageBand = ({
  image,
  objectPosition,
  alt,
}: {
  image: string
  objectPosition?: string
  alt: string
}) => {
  return (
    <section className="relative h-[38vh] w-full overflow-hidden lg:h-[46vh]">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="100vw"
        quality={75}
        loading="lazy"
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <div className="absolute inset-0 bg-ink/20" />
    </section>
  )
}

export default ImageBand
