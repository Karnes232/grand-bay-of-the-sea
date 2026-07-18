import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "liveaboards",
  title: "Liveaboards",
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
      name: "paragraph1",
      title: "Paragraph 1",
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
    defineField({
      name: "silverBankExpeditionImage",
      title: "Silver Bank Expedition Image",
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
      name: "silverBankExpeditionParagraph",
      title: "Silver Bank Expedition Paragraph",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "whaleWatchingAdventureImage",
      title: "Whale Watching Adventure Image",
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
      name: "whaleWatchingAdventureParagraph",
      title: "Whale Watching Adventure Paragraph",
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

    // ── 2026 redesign sections ────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Small trust chip shown above the hero H1.",
      type: "localizedString",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      description: "Intro sentence shown under the hero H1.",
      type: "localizedText",
    }),
    defineField({
      name: "stats",
      title: "Stats Bar",
      description: "Four short facts shown as cards below the intro.",
      type: "array",
      of: [
        defineField({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              description: 'Short value, e.g. "3–7 nights".',
              type: "localizedString",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "localizedString",
            }),
          ],
          preview: {
            select: { title: "value.en", subtitle: "label.en" },
          },
        }),
      ],
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "localizedString",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "localizedText",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "localizedString",
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
      title: "page",
    },
  },
})
