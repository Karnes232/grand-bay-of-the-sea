import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "fishing",
  title: "Fishing",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "localizedString" }),
    defineField({ name: "heroTitle", title: "Hero Title (H1)", type: "localizedString" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localizedText" }),
    defineField({ name: "bookEyebrow", title: "Booking Section Eyebrow", type: "localizedString" }),
    defineField({ name: "factDuration", title: "Duration Stat Label", type: "localizedString" }),
    defineField({ name: "galleryHeading", title: "Gallery Heading", type: "localizedString" }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "localizedString" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "localizedText" }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "localizedString" }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3",
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
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "spectatorPrice",
      title: "Spectator Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "privateCharter",
      title: "Private Charter",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "depositPrice",
      title: "Deposit Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "Fishing",
    },
  },
})
