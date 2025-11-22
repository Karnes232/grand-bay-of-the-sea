import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "basic",
      title: "Basic",
    },
    {
        name: "images",
        title: "Images",
    },
    {
        name: "body",
        title: "Body",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({ 
        name: "title", 
        title: "Title", 
        type: "localizedString",
        group: "basic",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        group: "basic",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: "publishDate",
        title: "Publish Date",
        type: "date",
        group: "basic",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: "backgroundImages",
        title: "Background Images",
        type: "array",
        of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alternative Text",
                  type: "string",
                }),
              ],
            },
          ],
        group: "images",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: "description",
        title: "Description",
        type: "localizedText",
        group: "basic",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: "blogBody",
        title: "Blog Body",
        type: "localizedBlock",
        group: "body",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'seo',
        title: 'SEO',
        type: 'seo',
        group: "seo",
        validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "backgroundImages.0",
    },
  },
})