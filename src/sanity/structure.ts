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
          S.list()
            .title("Liveaboards")
            .items([
              S.listItem()
                .title("Liveaboards")
                .child(
                  S.document()
                    .schemaType("liveaboards")
                    .title("Liveaboards")
                    .documentId("liveaboards"),
                ),
              S.listItem()
                .title("Silverbank Expedition")
                .child(
                  S.document()
                    .schemaType("silverbank-expedition")
                    .title("Silverbank Expedition")
                    .documentId("silverbank-expedition"),
                ),
              S.listItem()
                .title("Whale Watching Adventure")
                .child(
                  S.document()
                    .schemaType("whale-watching-adventure")
                    .title("Whale Watching Adventure")
                    .documentId("whale-watching-adventure"),
                ),
            ]),
        ),
      S.listItem()
        .title("Dive Sites")
        .child(
          S.list()
            .title("Dive Sites Page")
            .items([
              S.listItem()
                .title("Dive Sites Page Layout")
                .child(
                  S.document()
                    .schemaType("sites")
                    .title("Dive Sites")
                    .documentId("sites"),
                ),
              S.listItem()
                .title("Dive Sites")
                .child(
                  S.documentList()
                    .schemaType("diveSite")
                    .title("Dive Sites")
                    .filter("_type == 'diveSite'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Dive Trips")
        .child(
          S.list()
            .title("Dive Trips Page")
            .items([
              S.listItem()
                .title("Dive Trips Page Layout")
                .child(
                  S.document()
                    .schemaType("diveTripsPage")
                    .title("Dive Trips Page")
                    .documentId("diveTripsPage"),
                ),
              S.listItem()
                .title("Dive Trips")
                .child(
                  S.documentList()
                    .schemaType("trips")
                    .title("Dive Trips")
                    .filter("_type == 'trips'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Courses")
        .child(
          S.list()
            .title("Courses")
            .items([
              S.listItem()
                .title("Courses Main Page")
                .child(
                  S.document()
                    .schemaType("coursesMainPage")
                    .title("Courses Main Page")
                    .documentId("coursesMainPage"),
                ),
              S.listItem()
                .title("Individual Course")
                .child(
                  S.documentList()
                    .schemaType("individualCourse")
                    .title("Individual Course")
                    .filter("_type == 'individualCourse'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Custom Payment")
        .child(
          S.document()
            .schemaType("customPayment")
            .title("Custom Payment")
            .documentId("customPayment"),
        ),
      S.listItem().title("FAQs").child(
        S.documentList()
          .schemaType("faqs")
          .title("FAQs")
          .filter("_type == 'faqs'"),
        // S.listItem()
        //   .title("FAQ Items")
        //   .child(
        //     S.document()
        //       .schemaType("faqItem")
        //       .title("FAQ Items")
        //       .filter("_type == 'faqItem'"),
        //   ),
      ),
    ])
