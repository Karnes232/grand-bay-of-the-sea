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
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "localizedString" }),
    defineField({ name: "heroTitle", title: "Hero Title (H1)", type: "localizedString" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localizedText" }),
    defineField({ name: "visitHeading", title: "Visit Card Heading", type: "localizedString" }),
    defineField({ name: "hoursEyebrow", title: "Opening Hours Eyebrow", type: "localizedString" }),
    defineField({ name: "hoursValue", title: "Opening Hours Value", type: "localizedString" }),
    defineField({ name: "hoursDesc", title: "Opening Hours Description", type: "localizedText" }),
  ],
  preview: {
    select: {
      title: "Contact",
    },
  },
})
