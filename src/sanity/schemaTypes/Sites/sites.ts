import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "sites",
  title: "Sites",
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
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "packageTitle",
      title: "Package Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "twoTankDive",
      title: "Two Tank Dive Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "fourTankPackage",
      title: "Four Tank Dive Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "depositPrice",
      title: "Deposit Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "Dive Sites",
    },
  },
})
