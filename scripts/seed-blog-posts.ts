import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.",
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
})

// _id values of the 5 existing blogCategory documents in the `production` dataset.
// Reference one of these from each seed post's blogCategory._ref.
const CATEGORIES = {
  marineLife: "3c7be8b3-9aa6-438f-922a-c6877c1690c6",
  conservationOceanAwareness: "4968fc1f-2aad-455f-ab27-7b8572964807",
  travelTips: "952488d1-a4c5-4ac3-bc90-1d1d3894114e",
  divingTips: "987ef65e-2c28-41f6-ab58-d5c17fbfb728",
  localBusinesses: "ea82f5b2-4abe-4c36-8684-d2a3aac6e2c4",
} as const

// Add more post objects to this array to seed additional posts in one run.
const posts = [
  {
    _type: "blogPost",

    title: {
      _type: "localizedString",
      en: "Example New Blog Post Title",
      es: "Título de Ejemplo del Nuevo Artículo",
    },

    slug: {
      _type: "slug",
      current: "example-new-post-slug",
    },

    publishDate: "2026-05-28",

    description: {
      _type: "localizedText",
      en: "Short English summary of the blog post that appears on listing cards and meta descriptions.",
      es: "Resumen corto en español del artículo que aparece en las tarjetas de listado y meta descripciones.",
    },

    blogCategory: {
      _type: "reference",
      _ref: CATEGORIES.divingTips,
    },

    // Required by schema. Leave [] for now and add images in Studio,
    // OR fill in with objects of the shape:
    // {
    //   _type: "image",
    //   _key: "bg1",
    //   asset: { _type: "reference", _ref: "image-<assetId>-1920x1080-jpg" },
    //   alt: "Descriptive alt text",
    // }
    backgroundImages: [],

    blogBody: {
      _type: "localizedBlock",
      en: [
        {
          _type: "block",
          _key: "en-b1",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-s1",
              text: "Introduction Heading",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-s2",
              text: "First paragraph of the post in English. Replace this with real body copy.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "es-b1",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-s1",
              text: "Encabezado de Introducción",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-s2",
              text: "Primer párrafo del artículo en español. Reemplazar con el contenido real.",
              marks: [],
            },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "Example New Blog Post Title | Grand Bay of the Sea",
          description:
            "Concise English meta description (150-160 characters) for the search snippet.",
          keywords: ["scuba diving", "punta cana", "example"],
        },
        es: {
          title: "Título de Ejemplo del Nuevo Artículo | Grand Bay of the Sea",
          description:
            "Meta descripción concisa en español (150-160 caracteres) para el resultado de búsqueda.",
          keywords: ["buceo", "punta cana", "ejemplo"],
        },
      },
      openGraph: {
        en: {
          title: "Example New Blog Post Title",
          description: "Short English description for social shares.",
        },
        es: {
          title: "Título de Ejemplo del Nuevo Artículo",
          description: "Descripción corta en español para compartir en redes sociales.",
        },
        // Optional shared OG image. Uncomment and supply an asset _ref to enable:
        // image: {
        //   _type: "image",
        //   asset: { _type: "reference", _ref: "image-<assetId>-1200x630-jpg" },
        // },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Example New Blog Post Title",
          description: "Concise English meta description.",
          datePublished: "2026-05-28",
          inLanguage: "en",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Título de Ejemplo del Nuevo Artículo",
          description: "Meta descripción concisa en español.",
          datePublished: "2026-05-28",
          inLanguage: "es",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
        }),
      },
      noIndex: false,
      noFollow: false,
    },
  },
] as const

async function main() {
  let created = 0
  let skipped = 0

  for (const post of posts) {
    const slug = post.slug.current

    // Check both published (_id === <uuid>) and draft (_id === "drafts.<uuid>") forms.
    const existingId = await client.fetch<string | null>(
      `*[_type == "blogPost" && slug.current == $slug][0]._id`,
      { slug },
    )

    if (existingId) {
      console.log(`[skip] "${slug}" — already exists as ${existingId}`)
      skipped++
      continue
    }

    const result = await client.create(post)
    console.log(`[created] ${result._id} — ${slug}`)
    created++
  }

  console.log(`\nDone. created=${created} skipped=${skipped}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
