import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "faqs",
  title: "FAQs",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [{ title: "Home", value: "Home" }],
      },
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
      title: "page",
    },
  },
})
