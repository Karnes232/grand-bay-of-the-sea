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
      name: "overview",
      title: "Overview",
    },
    {
      name: "images",
      title: "Images",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "faqs",
      title: "FAQs",
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
    }),
    defineField({
      name: "paragraph4",
      title: "Paragraph 4",
      type: "localizedBlock",
      group: "mainContent",
    }),
    defineField({
      name: "paragraph5",
      title: "Paragraph 5",
      type: "localizedBlock",
      group: "mainContent",
    }),
    defineField({
      name: "paragraph6",
      title: "Paragraph 6",
      type: "localizedBlock",
      group: "mainContent",
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "localizedString",
      group: "overview",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "padiPrice",
      title: "Price",
      type: "number",
      group: "overview",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localizedString",
      group: "overview",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "extraInfo",
      title: "Extra Info",
      type: "localizedString",
      group: "overview",
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
            }),
          ],
        },
      ],
      group: "images",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faqs",
      of: [{ type: "faqItem" }],
    }),
    defineField({
      name: "structuredData",
      title: "Structured Data",
      type: "object",
      group: "faqs",
      description: "JSON-LD structured data for enhanced search results",
      fields: [
        defineField({
          name: "en",
          title: "English Schema",
          type: "text",
          description:
            "Paste your schema.org JSON-LD data for English content here",
          validation: Rule =>
            Rule.custom(text => {
              if (!text) return true
              try {
                JSON.parse(text)
                return true
              } catch (err) {
                return "Must be valid JSON"
              }
            }),
          initialValue: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "",
  "description": "",
  "url": "",
  "logo": "",
  "contactPoint": {
  "@type": "ContactPoint",
  "telephone": "",
  "contactType": "customer service",
  "availableLanguage": [
    "en",
    "es"
    ]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Punta Cana",
    "addressCountry": "DO"
  },
  "sameAs": [
    ""
    ]
  }`,
        }),
        defineField({
          name: "es",
          title: "Spanish Schema",
          type: "text",
          description:
            "Paste your schema.org JSON-LD data for Spanish content here",
          validation: Rule =>
            Rule.custom(text => {
              if (!text) return true
              try {
                JSON.parse(text)
                return true
              } catch (err) {
                return "Must be valid JSON"
              }
            }),
          initialValue: `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "",
    "description": "",
    "url": "",
    "logo": "",
    "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer service",
    "availableLanguage": [
      "en",
      "es"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Punta Cana",
      "addressCountry": "DO"
    },
    "sameAs": [
      ""
      ]
    }`,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "course",
    },
  },
})
