import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "photoGallery",
  title: "Photo Gallery",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "localizedString" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localizedText" }),
    defineField({
      name: "mainImage",
      title: "Main Image",
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
            defineField({
              name: "categories",
              title: "Categories",
              description:
                "Tag this photo so it shows under the gallery filter. A photo can belong to several.",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "Marine Life", value: "Marine Life" },
                  { title: "Sharks", value: "Sharks" },
                  { title: "Wrecks", value: "Wrecks" },
                  { title: "Divers", value: "Divers" },
                ],
                layout: "grid",
              },
            }),
          ],
          validation: Rule => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "mainImage",
    },
  },
})
