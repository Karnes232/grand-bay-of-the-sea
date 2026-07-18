import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "speciesPageContent",
  title: "Species Page Content",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "localizedString" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localizedText" }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "localizedString" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "localizedText" }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "localizedString" }),
    defineField({
      name: "content",
      title: "Content",
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
  ],
  preview: {
    select: {
      title: "title.en",
      media: "heroImage",
    },
  },
})
