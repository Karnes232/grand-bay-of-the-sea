import { defineField, defineType } from "sanity"
import { LockIcon } from "@sanity/icons"

export default defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  icon: LockIcon,
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
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({
      name: "content",
      title: "Content",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "contactPrompt", title: "Contact CTA Prompt", type: "localizedText" }),
  ],
  preview: {
    select: {
      title: "Privacy Policy",
      media: "heroImage",
    },
  },
})
