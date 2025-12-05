import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "liveaboards",
  title: "Liveaboards",
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
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "silverBankExpeditionImage",
      title: "Silver Bank Expedition Image",
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "silverBankExpeditionParagraph",
      title: "Silver Bank Expedition Paragraph",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "whaleWatchingAdventureImage",
      title: "Whale Watching Adventure Image",
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "whaleWatchingAdventureParagraph",
      title: "Whale Watching Adventure Paragraph",
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
  ],
  preview: {
    select: {
      title: "page",
    },
  },
})
