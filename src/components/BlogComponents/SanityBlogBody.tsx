import { PortableText } from "@portabletext/react"

import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import TextComponentParagraph from "../BlockContent/TextComponentParagraph"
import TextComponentHeading from "../BlockContent/TextComponentHeading"

interface LocaleBlockContent {
  _type?: string
  en: any[]
  es: any[]
}

interface Props {
  content: LocaleBlockContent
  locale?: "en" | "es"
}
const articleBody =
  "text-neutral-800 dark:text-neutral-200 antialiased [font-feature-settings:'kern'_1,'liga'_1]"

const listClasses =
  "my-6 space-y-2.5 pl-5 text-left text-base md:text-lg leading-relaxed marker:text-sky-800 dark:marker:text-sky-400"

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value)
        .width(1200)
        .quality(75)
        .auto("format")
        .url()

      return (
        <figure className="my-10 md:my-12">
          <div className="overflow-hidden rounded-xl shadow-md ring-1 ring-black/[0.06] dark:ring-white/10">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              width={1000}
              height={1000}
              sizes="(max-width: 1280px) 100vw, 768px"
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm italic text-neutral-600 dark:text-neutral-400 leading-relaxed px-1">
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
          className="font-medium text-sky-800 underline decoration-sky-800/40 underline-offset-[3px] transition-colors hover:text-sky-950 hover:decoration-sky-950/60 dark:text-sky-400 dark:decoration-sky-400/50 dark:hover:text-sky-300 dark:hover:decoration-sky-300/60"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }: any) => (
      <strong className="font-semibold text-neutral-950 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-neutral-900 dark:text-neutral-100">
        {children}
      </em>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <TextComponentParagraph
        paragraph={children}
        ParagraphClassName={`mb-5 text-left text-pretty max-w-none ${articleBody}`}
      />
    ),
    // Authored h1 blocks render as <h2>: the page template owns the single
    // <h1> (the post title), so an in-body h1 would create a duplicate.
    h1: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h2"
        HeadingClassName="font-bold font-crimson text-left text-balance !mt-10 mb-4 scroll-mt-24 text-3xl md:text-4xl text-neutral-950 dark:text-white first:mt-0"
      />
    ),
    h2: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h2"
        HeadingClassName="font-bold font-crimson text-left text-balance !mt-12 mb-4 pt-2 border-t border-neutral-200/80 dark:border-neutral-700/80 scroll-mt-24 text-2xl md:text-3xl text-neutral-950 dark:text-white first:mt-0 first:border-0 first:pt-0"
      />
    ),
    h3: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h3"
        HeadingClassName="font-semibold font-crimson text-left text-balance !mt-10 mb-3 scroll-mt-24 text-xl md:text-2xl text-neutral-900 dark:text-neutral-50 first:mt-0"
      />
    ),
    h4: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h4"
        HeadingClassName="font-semibold font-crimson text-left text-balance !mt-8 mb-3 scroll-mt-24 text-lg md:text-xl text-neutral-900 dark:text-neutral-100"
      />
    ),
    h5: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h5"
        HeadingClassName="font-semibold font-crimson text-left text-balance !mt-8 mb-2 scroll-mt-24 text-lg md:text-xl text-neutral-900 dark:text-neutral-100"
      />
    ),
    h6: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h6"
        HeadingClassName="font-semibold font-crimson text-left text-balance !mt-6 mb-2 scroll-mt-24 text-base md:text-lg text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className={`list-disc ${listClasses} mb-6`}>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className={`list-decimal ${listClasses} mb-6`}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-1 marker:font-medium [&_p]:mb-0 [&_p]:inline">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="pl-1 marker:font-medium [&_p]:mb-0 [&_p]:inline">
        {children}
      </li>
    ),
  },
}

const normalizeHeadingText = (s: string) =>
  s.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase()

const blockText = (block: any): string =>
  block?._type === "block" && Array.isArray(block.children)
    ? block.children.map((c: any) => c.text ?? "").join("")
    : ""

const SanityBlogBody = ({
  content,
  locale,
  skipLeadingTitle,
}: {
  content: any
  locale: string
  /**
   * Post title rendered as the page <h1> by the template. Most legacy post
   * bodies start with the title authored as a heading block; when the first
   * block is a heading that exactly matches this title, it's dropped to
   * avoid showing the title twice. Exact match only — a merely similar
   * first heading is real content and must be kept.
   */
  skipLeadingTitle?: string
}) => {
  if (!content || !content[locale]) {
    return null
  }
  let blockContent = content[locale]
  const first = blockContent[0]
  if (
    skipLeadingTitle &&
    /^h[1-4]$/.test(first?.style ?? "") &&
    normalizeHeadingText(blockText(first)) ===
      normalizeHeadingText(skipLeadingTitle)
  ) {
    blockContent = blockContent.slice(1)
  }
  return (
    <article
      className="w-full max-w-[42rem] xl:max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14"
      lang={locale === "es" ? "es" : "en"}
    >
      <PortableText value={blockContent} components={components} />
    </article>
  )
}

export default SanityBlogBody
