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
      name: "heroTitle",
      title: "Hero Title (H1)",
      description:
        "Main headline shown over the hero image. Becomes the page's H1.",
      type: "localizedString",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      description: "Short supporting sentence shown under the hero title.",
      type: "localizedText",
    }),
    defineField({
      name: "heroTrustLine",
      title: "Hero Trust Line",
      description: "Small pill above the hero title. Use {price} to insert the 2-tank dive price.",
      type: "localizedString",
    }),
    defineField({
      name: "gridHeading",
      title: "Dive Sites Grid Heading",
      type: "localizedString",
    }),
    defineField({
      name: "gridIntro",
      title: "Dive Sites Grid Intro",
      type: "localizedText",
    }),
    defineField({
      name: "heroCta",
      title: "Hero Booking CTA",
      description: "Primary call-to-action button shown in the hero.",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "localizedString",
        }),
        defineField({
          name: "link",
          title: "Link",
          description:
            'Path or URL the button links to, e.g. "/contact" or "/sites". Internal paths are automatically prefixed with the current language.',
          type: "string",
        }),
      ],
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
