import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"
export default defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      options: {
        list: [
          { title: "Index", value: "Index" },
          { title: "Courses", value: "Courses" },
          { title: "Trips", value: "Trips" },
          { title: "Scuba Diving Punta Cana", value: "Scuba Diving Punta Cana" },
          { title: "Fishing Punta Cana", value: "Fishing Punta Cana" },
          { title: "Contact", value: "Contact" },
          { title: "Photo Gallery", value: "Photo Gallery" },
          { title: "Blog", value: "Blog" },
          { title: "Sites", value: "Sites" },
          { title: "Species", value: "Species" },
          { title: "Custom Payment", value: "Custom Payment" },
          { title: "Cancellation Policy", value: "Cancellation Policy" },
          { title: "Liveaboard", value: "Liveaboard" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "pageName",
    },
  },
})
