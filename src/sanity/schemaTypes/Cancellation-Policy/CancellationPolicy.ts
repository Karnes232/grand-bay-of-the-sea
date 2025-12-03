import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "cancellationPolicy",
  title: "Cancellation Policy",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "Cancellation Policy",
      media: "heroImage",
    },
  },
})