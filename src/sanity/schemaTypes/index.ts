import { type SchemaTypeDefinition } from "sanity"

//Localization
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized"
//SEO
import seo from "./SEO/seo"
import PageSeo from "./SEO/PageSeo"

//Species
import SpeciesPageContent from "./Page-Species/SpeciesPageContent"
import Fishes from "./Page-Species/Fishes"

//Blog
import BlogPost from "./Blog/BlogPost"
import BlogCategory from "./Blog/BlogCategory"
import BlogPageLayout from "./Blog/BlogPageLayout"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Localized
    localizedString,
    localizedText,
    localizedBlock,

    //SEO
    seo,
    PageSeo,

    //Page-Species
    SpeciesPageContent,
    Fishes,

    //Blog
    BlogPageLayout,
    BlogCategory,
    BlogPost,
  ],
}
