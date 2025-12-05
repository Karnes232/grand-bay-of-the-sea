import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "fishing",
  title: "Fishing",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "photoList",
      title: "Photo List",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
              validation: Rule => Rule.required(),
            }),
          ],
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "spectatorPrice",
      title: "Spectator Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "privateCharter",
      title: "Private Charter",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "depositPrice",
      title: "Deposit Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "Fishing",
    },
  },
})
