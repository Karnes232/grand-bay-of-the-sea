import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "Contact",
    },
  },
})
