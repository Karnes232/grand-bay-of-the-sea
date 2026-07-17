import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "images",
      title: "Images",
    },
    {
      name: "content",
      title: "Content",
    },
    {
      name: "sections",
      title: "Sections (Redesign)",
    },
  ],
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "images",
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
      name: "secondaryHeroImage",
      title: "Secondary Hero Image",
      type: "image",
      group: "images",
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
      name: "tertiaryHeroImage",
      title: "Tertiary Hero Image",
      type: "image",
      group: "images",
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
      group: "content",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      description: "Short supporting sentence shown under the hero title.",
      type: "localizedText",
      group: "content",
    }),
    defineField({
      name: "heroCta",
      title: "Hero Booking CTA",
      description: "Primary call-to-action button shown in the hero.",
      type: "object",
      group: "content",
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
            'Path or URL the button links to, e.g. "/courses" or "/contact". Internal paths are automatically prefixed with the current language.',
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      group: "content",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      group: "content",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3",
      type: "localizedBlock",
      group: "content",
      validation: Rule => Rule.required(),
    }),

    // ── 2026 redesign sections ────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Stats Bar",
      description:
        "Four short stats shown in the dark bar under the hero (e.g. water temperature, visibility).",
      type: "array",
      group: "sections",
      of: [
        defineField({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              description: 'Short value, e.g. "26–29°C" or "Small groups".',
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
      name: "whyUniqueHeading",
      title: "“Why Unique” Heading",
      description:
        "Heading for the split section that pairs with Paragraph 2 and the coral video.",
      type: "localizedString",
      group: "sections",
    }),
    defineField({
      name: "sharkBanner",
      title: "Shark Dive Banner",
      type: "object",
      group: "sections",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "localizedString",
        }),
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
        defineField({ name: "body", title: "Body", type: "localizedText" }),
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "localizedString",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Link",
          description:
            'Path, e.g. "/shark-dive-punta-cana". Prefixed with the current language for internal paths.',
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "courseHighlights",
      title: "Course Highlights",
      description: "The three course cards in the “PADI courses” section.",
      type: "array",
      group: "sections",
      of: [
        defineField({
          name: "course",
          title: "Course",
          type: "object",
          fields: [
            defineField({
              name: "badge",
              title: "Badge",
              description: 'Small label, e.g. "Beginner · from $100".',
              type: "localizedString",
            }),
            defineField({ name: "title", title: "Title", type: "localizedString" }),
            defineField({ name: "blurb", title: "Blurb", type: "localizedText" }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title.en", subtitle: "badge.en" },
          },
        }),
      ],
    }),
    defineField({
      name: "bookingSection",
      title: "Booking Section",
      type: "object",
      group: "sections",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "localizedString",
        }),
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
        defineField({ name: "body", title: "Body", type: "localizedText" }),
      ],
    }),
    defineField({
      name: "bookingBenefits",
      title: "Booking Benefits",
      description: "Checklist shown next to the booking form.",
      type: "array",
      group: "sections",
      of: [{ type: "localizedString" }],
    }),
  ],
  preview: {
    select: {
      title: "Home Page",
      media: "heroImage",
    },
  },
})
