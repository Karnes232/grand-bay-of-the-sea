import type { StructureResolver } from "sanity/structure"

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Page SEO")
        .child(
          S.documentList()
            .schemaType("pageSeo")
            .title("Page SEO")
            .filter("_type == 'pageSeo'"),
        ),
      S.listItem()
        .title("Home Page")
        .child(
          S.document()
            .schemaType("homePage")
            .title("Home Page")
            .documentId("homePage"),
        ),
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("Blog Page Layout")
                .child(
                  S.document()
                    .schemaType("blogPageLayout")
                    .title("Blog Page Layout")
                    .documentId("blogPageLayout"),
                ),
              S.listItem()
                .title("Blog Posts")
                .child(
                  S.documentList()
                    .schemaType("blogPost")
                    .title("Blog Posts")
                    .filter("_type == 'blogPost'"),
                ),
              S.listItem()
                .title("Blog Categories")
                .child(
                  S.documentList()
                    .schemaType("blogCategory")
                    .title("Blog Categories")
                    .filter("_type == 'blogCategory'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Photo Gallery")
        .child(
          S.document()
            .schemaType("photoGallery")
            .title("Photo Gallery")
            .documentId("photoGallery"),
        ),
      S.listItem()
        .title("Cancellation Policy")
        .child(
          S.document()
            .schemaType("cancellationPolicy")
            .title("Cancellation Policy")
            .documentId("cancellationPolicy"),
        ),
      S.listItem()
        .title("Contact")
        .child(
          S.document()
            .schemaType("contact")
            .title("Contact")
            .documentId("contact"),
        ),
      S.listItem()
        .title("Species Page Content")
        .child(
          S.list()
            .title("Species Page")
            .items([
              S.listItem()
                .title("Species Page Content")
                .child(
                  S.document()
                    .schemaType("speciesPageContent")
                    .title("Species Page Content")
                    .documentId("speciesPageContent"),
                ),
              S.listItem()
                .title("Fishes")
                .child(
                  S.documentList()
                    .schemaType("fishes")
                    .title("Fishes")
                    .filter("_type == 'fishes'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Scuba Diving Punta Cana")
        .child(
          S.list()
            .title("Scuba Diving Punta Cana")
            .items([
              S.listItem()
                .title("Section Links")
                .child(
                  S.documentList()
                    .schemaType("sectionLinks")
                    .title("Section Links")
                    .filter("_type == 'sectionLinks'"),
                ),
              S.listItem()
                .title("Scuba Diving Punta Cana")
                .child(
                  S.document()
                    .schemaType("scubaDivingPuntaCana")
                    .title("Scuba Diving Punta Cana")
                    .documentId("scubaDivingPuntaCana"),
                ),
            ]),
        ),
      S.listItem()
        .title("Fishing")
        .child(
          S.document()
            .schemaType("fishing")
            .title("Fishing")
            .documentId("fishing"),
        ),
      S.listItem()
        .title("Shark Dive")
        .child(
          S.document()
            .schemaType("sharkDive")
            .title("Shark Dive")
            .documentId("sharkDive"),
        ),
      S.listItem()
        .title("Liveaboards")
        .child(
          S.document()
            .schemaType("liveaboards")
            .title("Liveaboards")
            .documentId("liveaboards"),
        ),
    ])
