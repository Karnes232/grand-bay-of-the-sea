import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import TextComponent from "./TextComponent"
import Image from "next/image"

const RichText = ({ context }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => {
        return <span className="font-bold">{text}</span>
      },
      [MARKS.ITALIC]: (text: string) => {
        return <span className="italic">{text}</span>
      },
      [MARKS.UNDERLINE]: (text: string) => {
        return <span className="underline">{text}</span>
      },
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <TextComponent
          title={children}
          heading="h1"
          className="my-5 2xl:mb-2 2xl:mt-10 text-3xl md:text-4xl text-center"
        />
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <TextComponent
          title={children}
          heading="h2"
          className="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
        />
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <TextComponent
          title={children}
          heading="h3"
          className="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
        />
      ),
      [BLOCKS.HEADING_4]: (node: any, children: any) => (
        <TextComponent
          title={children}
          heading="h4"
          className="my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl text-center"
        />
      ),
      [BLOCKS.HEADING_5]: (node: any, children: any) => (
        <TextComponent
          title={children}
          heading="h5"
          className="my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl text-center"
        />
      ),
      [BLOCKS.HEADING_6]: (node: any, children: any) => (
        <TextComponent
          title={children}
          heading="h6"
          className="my-5 2xl:mb-2 2xl:mt-10 text-lg md:text-xl"
        />
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <TextComponent paragraph={children} pClassName="mb-4 text-center" />
        )
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc ml-5">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-decimal ml-5">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        return (
          <li className="text-sm text-left">
            {children.map((child: any, index: number) => {
              // If the child is a paragraph, render it without text-center and explicitly set text-left
              if (node.nodeType === "list-item") {
                return (
                  <TextComponent
                    key={`list-item-${node.nodeType}-${index}`}
                    paragraph={child.props.paragraph}
                    pClassName="mb-1 text-left"
                  />
                )
              }
              return React.cloneElement(child, { key: `list-item-${index}` })
            })}
          </li>
        )
      },
      [BLOCKS.QUOTE]: (node: any, children: any) => (
        <div className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
          <svg
            className="mb-4 h-6 w-6 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          {children}
        </div>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        return (
          <div className="flex justify-center items-center">
            <Image
              src={`https:${node.data.target.fields.file.url}`}
              alt={node.data.target.fields.title}
              width={300}
              height={300}
              className="object-cover rounded-full h-40 w-40 md:h-60 md:w-60 xl:h-72 xl:w-72"
              priority
              quality={75}
            />
          </div>
        )
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        return (
          <a href={node.data.uri} className="italic underline text-blue-600">
            {children}
          </a>
        )
      },
    },
  }
  const textDocument = documentToReactComponents(context, options)
  return (
    <>
      <div className="flex flex-col lg:max-w-3xl xl:max-w-4xl mx-5 lg:mx-auto lg:p-2 xl:mx-auto ">
        {textDocument}
      </div>
    </>
  )
}

export default RichText
