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
            ]),
        ),
    ])
