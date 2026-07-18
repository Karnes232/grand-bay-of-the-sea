import { PortableText } from "@portabletext/react"

import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

const bodyText = "text-[17px] leading-[1.8] text-[#3d5459]"

const listClasses = `mb-[22px] ml-[22px] flex flex-col gap-[9px] ${bodyText}`

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
          <div className="overflow-hidden rounded-[20px] border border-[#e2e9e9]">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              width={1000}
              height={1000}
              sizes="(max-width: 1280px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 px-1 text-center text-sm italic leading-relaxed text-[#7c8f93]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        rel="noopener noreferrer"
        className="font-semibold text-moss transition-colors [border-bottom:1.5px_solid_rgba(86,122,47,0.3)] hover:[border-bottom-color:rgb(86,122,47)]"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-[#12303a]">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-[#12303a]">{children}</em>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className={`mb-[22px] text-pretty ${bodyText}`}>{children}</p>
    ),
    // Authored h1 blocks render as <h2>: the page template owns the single
    // <h1> (the post title), so an in-body h1 would create a duplicate.
    h1: ({ children }: any) => (
      <h2 className="mb-4 mt-11 scroll-mt-24 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-ink first:mt-0">
        {children}
      </h2>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-11 scroll-mt-24 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-ink first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-8 scroll-mt-24 font-display text-[1.3rem] font-bold tracking-[-0.02em] text-ink">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-7 scroll-mt-24 font-display text-[1.15rem] font-bold tracking-[-0.02em] text-ink">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="mb-2 mt-6 scroll-mt-24 font-display text-[1.05rem] font-bold tracking-[-0.01em] text-ink">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="mb-2 mt-6 scroll-mt-24 font-display text-base font-bold tracking-[-0.01em] text-ink">
        {children}
      </h6>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 rounded-r-[14px] border-l-4 border-accent bg-white px-[26px] py-5 text-[1.15rem] italic text-[#12303a]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className={`list-disc ${listClasses}`}>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className={`list-decimal ${listClasses}`}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-1 marker:text-moss [&_p]:mb-0 [&_p]:inline">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="pl-1 marker:text-moss [&_p]:mb-0 [&_p]:inline">
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
      className="max-w-[70ch] [&>p:first-of-type]:text-[1.28rem] [&>p:first-of-type]:leading-[1.6] [&>p:first-of-type]:text-[#12303a]"
      lang={locale === "es" ? "es" : "en"}
    >
      <PortableText value={blockContent} components={components} />
    </article>
  )
}

export default SanityBlogBody
