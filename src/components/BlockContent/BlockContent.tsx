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

const BlockContent: React.FC<Props> = ({ content, locale = "en" }) => {
  if (!content || !content[locale]) {
    return null
  }
  const blockContent = content[locale]
  return (
    <>
      <div className="flex flex-col lg:max-w-3xl xl:max-w-4xl mx-5 lg:mx-auto lg:p-2 xl:mx-auto">
        <PortableText value={blockContent} components={components} />
      </div>
    </>
  )
}

export default BlockContent
