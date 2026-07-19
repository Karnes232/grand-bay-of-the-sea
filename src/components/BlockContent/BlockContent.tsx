import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"

import Image from "next/image"
import TextComponentParagraph from "./TextComponentParagraph"
import TextComponentHeading from "./TextComponentHeading"
import TextComponentList from "./TextComponentList"

interface LocaleBlockContent {
  _type?: string
  en: any[]
  es: any[]
}

interface Props {
  content: LocaleBlockContent
  locale?: "en" | "es"
  /** When true, render `h1` Portable Text blocks as `h2`. Use on pages that
   *  already render an `h1` elsewhere (e.g. the hero) to keep a single H1. */
  demoteH1?: boolean
  /**
   * "default" keeps the historical centered `max-w-3xl` wrapper used across the
   * legacy pages. "prose" drops the baked-in wrapper/centering for the 2026
   * redesign — left-aligned body copy, display-font headings, moss links — so
   * the caller controls width via `wrapperClassName`.
   */
  variant?: "default" | "prose"
  /** Wrapper class override. Only applied in the "prose" variant. */
  wrapperClassName?: string
}

const builder = imageUrlBuilder(client)
const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = builder.image(value).url()

      // Sanity images usually need to be accessed via .asset.url

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={1000}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="w-full rounded-lg"
          />
          {/* <img
            src={imageUrl}
            alt={value.alt || ""}
            loading="lazy"
            className="w-full rounded-lg"
          /> */}
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      return (
        <a
          href={value.href}
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  block: {
    // normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    normal: ({ children }: any) => (
      <TextComponentParagraph
        paragraph={children}
        ParagraphClassName="mb-4 text-center"
      />
    ),
    h1: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h1"
        HeadingClassName="my-5 2xl:mb-2 2xl:mt-10 text-3xl md:text-4xl text-center"
      />
    ),
    h2: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h2"
        HeadingClassName="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
      />
    ),
    h3: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h3"
        HeadingClassName="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
      />
    ),
    h4: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h4"
        HeadingClassName="my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl text-center"
      />
    ),
    h5: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h5"
        HeadingClassName="my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl text-center"
      />
    ),
    h6: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h6"
        HeadingClassName="my-5 2xl:mb-2 2xl:mt-10 text-lg md:text-xl"
      />
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <TextComponentList
        items={children}
        listType="bullet"
        ListClassName="mb-4"
      />
    ),
    number: ({ children }: any) => (
      <TextComponentList
        items={children}
        listType="number"
        ListClassName="mb-4"
      />
    ),
  },
}

/** 2026 redesign renderer: left-aligned, no forced centering, new palette. */
const proseComponents = {
  types: components.types,
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        rel="noopener noreferrer"
        className="font-semibold text-moss underline decoration-moss/30 underline-offset-2 hover:decoration-moss"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-fg">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-5 text-[17px] leading-relaxed text-muted">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
        {children}
      </h2>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-fg md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-3 font-display text-lg font-bold tracking-tight text-fg md:text-xl">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="mb-2 font-display text-base font-bold tracking-tight text-fg md:text-lg">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="mb-2 font-display text-base font-bold tracking-tight text-fg">
        {children}
      </h6>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-[17px] leading-relaxed text-muted">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-[17px] leading-relaxed text-muted">
        {children}
      </ol>
    ),
  },
}

const BlockContent: React.FC<Props> = ({
  content,
  locale = "en",
  demoteH1 = false,
  variant = "default",
  wrapperClassName,
}) => {
  if (!content || !content[locale]) {
    return null
  }
  const blockContent = content[locale]

  if (variant === "prose") {
    return (
      <div className={wrapperClassName ?? ""}>
        <PortableText value={blockContent} components={proseComponents} />
      </div>
    )
  }

  const activeComponents = demoteH1
    ? { ...components, block: { ...components.block, h1: components.block.h2 } }
    : components
  return (
    <>
      <div className="flex flex-col lg:max-w-3xl xl:max-w-4xl mx-5 lg:mx-auto lg:p-2 xl:mx-auto">
        <PortableText value={blockContent} components={activeComponents} />
      </div>
    </>
  )
}

export default BlockContent
