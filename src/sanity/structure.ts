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
    ])
