import { defineField, defineType } from "sanity"
import { CogIcon } from "@sanity/icons"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: "padiLogo",
      title: "PADI Logo (light mode)",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "padiLogoDark",
      title: "PADI Logo (dark mode)",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "Site Settings",
    },
  },
})
