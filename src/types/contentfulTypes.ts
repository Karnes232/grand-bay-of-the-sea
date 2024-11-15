import { Entry, EntryFields } from "contentful"

export interface BlogPost {
  title: EntryFields.Text
  slug: EntryFields.Text
  content: EntryFields.RichText
  excerpt: EntryFields.Text
  publishDate: EntryFields.Date
  featuredImage: EntryFields.AssetLink
}
