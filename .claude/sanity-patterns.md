# Sanity Patterns

## Schema ↔ Query Organisation

Each content type has a parallel pair of files:

- `src/sanity/schemaTypes/<Feature>/TypeName.ts` — schema definition (`defineType`, `defineField`)
- `src/sanity/queries/<Feature>/QueryName.ts` — GROQ query string + TypeScript return type + async fetch function

When adding a new content type, create both files and register the schema in `src/sanity/schemaTypes/index.ts`.

## SEO Schema Convention

Every page document has an embedded `seo` object with this shape (defined in `src/sanity/schemaTypes/SEO/`):

```
seo {
  meta { en { title, description, keywords[] }, es { ... } }
  openGraph { en { title, description }, es { ... }, image { asset->{ url, metadata } } }
  noIndex, noFollow
  structuredData { en, es }   // raw JSON-LD strings
}
```

Pages fetch SEO with `getPageSeo(pageName)` and structured data separately with `getStructuredData(pageName)`.

## Localised Content Fields

Fields with bilingual content use an object with `en` and `es` keys directly inside the document (not Sanity's built-in locale field feature). The `locale` param from the route segment is used as an index key: `field[locale]`.

Shared helper type: `src/sanity/schemaTypes/Localized/localized.ts`

## Image Handling

Prefer projecting `image.asset->url` in GROQ (resolves to a `cdn.sanity.io` URL), then pass the URL through `sanityCdnUrlWithParams()` to add size/quality transforms.

Use `urlFor(imageRef)` only when you have the Sanity image reference object rather than the resolved URL.

For LCP hero images, generate a blur placeholder via `getPlaiceholder` on a tiny proxy URL (`?w=64&h=64&fit=max&auto=format`), then pass the `base64` result as `blurDataURL` to `<Image>`. Only do this for the LCP image — not all images.

## Sanity Studio

Accessible at `/studio` (mounted via `src/app/studio/[[...tool]]/page.tsx`). Config is in `sanity.config.ts`. Studio desk structure is defined in `src/sanity/structure.ts`.

Run `npx sanity deploy` to deploy Studio changes. Run `npx sanity schema deploy` when schema changes need to be pushed.

## Client Configuration

The client in `src/sanity/lib/client.ts` uses `useCdn: true`. For pages that need fresh data during preview/draft mode, use the live client from `src/sanity/lib/live.ts`.
