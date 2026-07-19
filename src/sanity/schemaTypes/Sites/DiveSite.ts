import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "diveSite",
  title: "Dive Site",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment for the individual dive-site page (/sites/…).",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
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
      name: "meters",
      title: "Meters",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "feet",
      title: "Feet",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Difficulty Level",
      description:
        "Shown as the coloured level badge on the dive-sites grid card. The label is translated per-locale on the site.",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "Beginner" },
          { title: "Intermediate", value: "Intermediate" },
          { title: "Advanced", value: "Advanced" },
          { title: "All levels", value: "All levels" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      description:
        "Where the dive site is reached from. Shown as a label on the dive-sites grid card.",
      type: "string",
      options: {
        list: [
          { title: "Catalina", value: "Catalina" },
          { title: "Bayahibe", value: "Bayahibe" },
          { title: "Local", value: "Local" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "cardDescription",
      title: "Card Description",
      description:
        "Short blurb shown on the dive-sites grid card and as the hero subtitle on the individual dive-site page.",
      type: "localizedText",
    }),
    defineField({
      name: "nearbySites",
      title: "Nearby Dive Sites",
      description:
        "Other dive sites to feature in the “Nearby dive sites” row at the bottom of this site's page. Pick up to 3. If left empty, other sites are shown automatically.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "diveSite" }] }],
      validation: Rule => Rule.max(3).unique(),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
})
