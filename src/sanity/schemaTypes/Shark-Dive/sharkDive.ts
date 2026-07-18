import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "sharkDive",
  title: "Shark Dive",
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
      name: "title",
      title: "Page Title (H1)",
      description:
        "Rendered as the page's visible H1. The first heading inside Paragraph 1 renders as an H2.",
      type: "localizedString",
    }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localizedText" }),
    defineField({ name: "experienceEyebrow", title: "Experience Eyebrow", type: "localizedString" }),
    defineField({ name: "galleryHeading", title: "Gallery Heading", type: "localizedString" }),
    defineField({ name: "featuredIn", title: "Featured-In Credit", type: "localizedString" }),
    defineField({ name: "notReadyEyebrow", title: "Not-Ready Section Eyebrow", type: "localizedString" }),
    defineField({ name: "exploreAdvanced", title: "Not-Ready CTA Label", type: "localizedString" }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "localizedString" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "localizedText" }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "localizedString" }),
    defineField({ name: "factFormat", title: "Stat: Format Label", type: "localizedString" }),
    defineField({ name: "factFormatValue", title: "Stat: Format Value", type: "localizedString" }),
    defineField({ name: "factDuration", title: "Stat: Duration Label", type: "localizedString" }),
    defineField({ name: "factMaxDepth", title: "Stat: Max Depth Label", type: "localizedString" }),
    defineField({ name: "factLevel", title: "Stat: Level Label", type: "localizedString" }),
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
      name: "paragraph4",
      title: "Paragraph 4",
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
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Price",
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
    defineField({
      name: "level",
      title: "Level",
      description: 'e.g. "Advanced".',
      type: "localizedString",
    }),
    defineField({
      name: "maxDepth",
      title: "Max Depth",
      description: 'e.g. "25 m / 82 ft".',
      type: "localizedString",
    }),
    defineField({
      name: "extras",
      title: "Extras",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: {
    select: {
      title: "Shark Dive",
    },
  },
})
