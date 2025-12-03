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

//Photo-Gallery
import PhotoGallery from "./Photo-Gallery/PhotoGallery"

//Cancellation-Policy
import CancellationPolicy from "./Cancellation-Policy/CancellationPolicy"

//Contact
import Contact from "./Contact/contact"

//Scuba-Diving-Punta-Cana
import ScubaDivingPuntaCana from "./Scuba-Diving-Punta-Cana/ScubaDivingPuntaCana"

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

    //Photo-Gallery
    PhotoGallery,

    //Cancellation-Policy
    CancellationPolicy,

    //Contact
    Contact,

    //Scuba-Diving-Punta-Cana
    ScubaDivingPuntaCana,
  ],
}
