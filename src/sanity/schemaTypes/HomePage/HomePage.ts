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
  ],
  preview: {
    select: {
      title: "Home Page",
      media: "heroImage",
    },
  },
})
