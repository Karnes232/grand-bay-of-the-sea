import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "silverbank-expedition",
  title: "Silverbank Expedition",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "images",
      title: "Images",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      group: "content",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      group: "content",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3",
      type: "localizedBlock",
      group: "content",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph4",
      title: "Paragraph 4",
      type: "localizedBlock",
      group: "content",
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
      group: "images",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "Silverbank Expedition",
    },
  },
})
