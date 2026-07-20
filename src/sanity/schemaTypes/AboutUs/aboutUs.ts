import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

const imageWithAlt = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "image",
    fields: [
      defineField({
        name: "alt",
        title: "Alt",
        type: "string",
      }),
    ],
    options: {
      hotspot: true,
    },
    ...(required ? { validation: (Rule: any) => Rule.required() } : {}),
  })

export default defineType({
  name: "aboutUs",
  title: "About Us",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Story" },
    { name: "team", title: "Team" },
    { name: "values", title: "Values" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    // Hero
    { ...imageWithAlt("heroImage", "Hero Image", true), group: "hero" },
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title (H1)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localizedText",
      group: "hero",
    }),
    defineField({
      name: "stats",
      title: "Stats Bar",
      description:
        "Short stats shown in the dark bar under the hero (e.g. rating, PADI number).",
      type: "array",
      group: "hero",
      of: [
        defineField({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
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
    // Story
    defineField({
      name: "storyEyebrow",
      title: "Story Eyebrow",
      type: "localizedString",
      group: "story",
    }),
    defineField({
      name: "storyHeading",
      title: "Story Heading",
      type: "localizedString",
      group: "story",
    }),
    defineField({
      name: "storyBody",
      title: "Story Body",
      type: "localizedBlock",
      group: "story",
    }),
    { ...imageWithAlt("storyImage", "Story Image"), group: "story" },
    // Team
    defineField({
      name: "teamEyebrow",
      title: "Team Eyebrow",
      type: "localizedString",
      group: "team",
    }),
    defineField({
      name: "teamHeading",
      title: "Team Heading",
      type: "localizedString",
      group: "team",
    }),
    defineField({
      name: "teamIntro",
      title: "Team Intro",
      type: "localizedText",
      group: "team",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      description:
        "The crew cards. The whole section is hidden on the page when this list is empty.",
      type: "array",
      group: "team",
      of: [
        defineField({
          name: "teamMember",
          title: "Team Member",
          type: "object",
          fields: [
            imageWithAlt("photo", "Photo"),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "localizedString",
            }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "localizedText",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role.en", media: "photo" },
          },
        }),
      ],
    }),
    // Values
    defineField({
      name: "valuesEyebrow",
      title: "Values Eyebrow",
      type: "localizedString",
      group: "values",
    }),
    defineField({
      name: "valuesHeading",
      title: "Values Heading",
      type: "localizedString",
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      group: "values",
      of: [
        defineField({
          name: "value",
          title: "Value",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Shield (safety)", value: "shield" },
                  { title: "People (small groups)", value: "users" },
                  { title: "Globe (reef respect)", value: "globe" },
                  { title: "Tools (expertise)", value: "wrench" },
                ],
              },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "localizedString",
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "localizedText",
            }),
          ],
          preview: {
            select: { title: "title.en", subtitle: "icon" },
          },
        }),
      ],
    }),
    // CTA band
    { ...imageWithAlt("ctaImage", "CTA Background Image"), group: "cta" },
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "localizedText",
      group: "cta",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label (links to /contact)",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "cta2Label",
      title: "Second CTA Button Label (links to /courses)",
      type: "localizedString",
      group: "cta",
    }),
  ],
  preview: {
    select: {
      title: "About Us",
    },
  },
})
