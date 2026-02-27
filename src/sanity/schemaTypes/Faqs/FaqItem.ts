import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
  ],
})
