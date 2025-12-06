import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "trips",
  title: "Trips",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "cardInfo",
      title: "Card Info",
    },
    {
      name: "mainContent",
      title: "Main Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "cardInfo",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "cardTitle",
      title: "Card Title",
      type: "localizedString",
      group: "cardInfo",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "cardDescription",
      title: "Card Description",
      type: "localizedText",
      group: "cardInfo",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      group: "cardInfo",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3",
      type: "localizedBlock",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph4",
      title: "Paragraph 4",
      type: "localizedBlock",
      group: "mainContent",
    }),
    defineField({
      name: "photoList",
      title: "Photo List",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
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
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "spectatorSnorkel",
      title: "Spectator Price",
      type: "number",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localizedString",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "depositPrice",
      title: "Deposit Price",
      type: "number",
      group: "mainContent",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "extras",
      title: "Extras",
      type: "array",
      of: [{ type: "localizedString" }],
      group: "mainContent",
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
      title: "page",
      media: "cardImage",
    },
  },
})
