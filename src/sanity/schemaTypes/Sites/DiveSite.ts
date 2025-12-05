import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "diveSite",
  title: "Dive Site",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
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
      name: "meters",
      title: "Meters",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "feet",
      title: "Feet",
      type: "number",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
})
