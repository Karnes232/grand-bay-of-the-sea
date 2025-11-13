import { type SchemaTypeDefinition } from 'sanity'

//Localization
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized"
//SEO
import seo from "./SEO/seo"
import PageSeo from "./SEO/PageSeo"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
//Localized
localizedString,
localizedText,
localizedBlock,

//SEO
seo,
PageSeo,

  ],
}
