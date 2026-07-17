import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "coursesMainPage",
  title: "Courses Main Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
        }),
      ],
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
            'Path or URL the button links to, e.g. "/contact" or "/courses". Internal paths are automatically prefixed with the current language.',
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3",
      type: "localizedBlock",
    }),

    // ── 2026 redesign sections ────────────────────────────────────────────
    defineField({
      name: "introHeading",
      title: "Intro Heading",
      description: "Heading above Paragraph 1.",
      type: "localizedString",
      group: "sections",
    }),
    defineField({
      name: "beginnerEyebrow",
      title: "Beginner Eyebrow",
      description: 'Small label above the beginner heading, e.g. "Start here".',
      type: "localizedString",
      group: "sections",
    }),
    defineField({
      name: "beginnerHeading",
      title: "Beginner Heading",
      description: "Heading for the beginner courses section (above Paragraph 2).",
      type: "localizedString",
      group: "sections",
    }),
    defineField({
      name: "advancedHeading",
      title: "Advanced Heading",
      description: "Heading above Paragraph 3 (already-certified section).",
      type: "localizedString",
      group: "sections",
    }),
    defineField({
      name: "specialtyEyebrow",
      title: "Specialty Eyebrow",
      description: 'Small label above the advanced/specialty cards, e.g. "Specialty courses".',
      type: "localizedString",
      group: "sections",
    }),
    defineField({
      name: "courseCta",
      title: "Course CTA Band",
      type: "object",
      group: "sections",
      fields: [
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
          description: 'Path, e.g. "/contact".',
          type: "string",
        }),
      ],
    }),
  ],
  groups: [
    { name: "sections", title: "Sections (Redesign)" },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
})
