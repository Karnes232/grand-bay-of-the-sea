import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "individualCourse",
  title: "Individual Course",
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
      name: "course",
      title: "Course",
      type: "string",
      group: "cardInfo",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "course",
      },
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
        }),
      ],
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
      name: "cardHashTags",
      title: "Card Hash Tags",
      group: "cardInfo",
      type: "array",
      of: [{ type: "string" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "courseLevel",
      title: "Course Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Advanced", value: "advanced" },
        ],
      },
      group: "cardInfo",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "cardInfo",
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
      title: "course",
    },
  },
})
