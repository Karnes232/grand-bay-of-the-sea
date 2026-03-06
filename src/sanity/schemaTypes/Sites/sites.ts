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
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
    defineField({
      name: "structuredData",
      title: "Structured Data",
      type: "object",
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
      title: "Dive Sites",
    },
  },
})
