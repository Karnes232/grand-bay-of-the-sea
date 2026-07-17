import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "diveTripsPage",
  title: "Dive Trips Page",
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
            'Path or URL the button links to, e.g. "/contact" or "/trips". Internal paths are automatically prefixed with the current language.',
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
      name: "paragraph2",
      title: "Paragraph 2",
      description:
        "Optional second content section, rendered below the trip cards (logistics, what's included, which trip suits whom).",
      type: "localizedBlock",
    }),
    defineField({
      name: "tripDaySteps",
      title: "Trip Day Steps",
      description:
        'The "What a trip day looks like" itinerary (generic). Uses the Catalina/Saona order (both dives before lunch); note the Bayahibe exception in "Trip Day Note".',
      type: "array",
      of: [
        {
          type: "object",
          name: "tripStep",
          fields: [
            defineField({
              name: "stepTitle",
              title: "Title",
              type: "localizedString",
            }),
            defineField({
              name: "stepBody",
              title: "Body",
              type: "localizedText",
            }),
          ],
          preview: { select: { title: "stepTitle.en" } },
        },
      ],
    }),
    defineField({
      name: "tripDayNote",
      title: "Trip Day Note",
      description: 'Small caveat under the steps, e.g. "Bayahibe excludes lunch."',
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
})
