import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "../env"

// useCdn MUST be false: this site statically generates pages with ISR.
// With useCdn: true, build-time queries hit Sanity's API CDN, which caches
// results per query string — a stale/null cached result for one page's SEO
// query could ship a blank <head> while the (separately cached) body query
// returned fine. That was the root cause of pages like /trips/catalina and
// /contact rendering with no meta description / canonical / OG tags.
const baseClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Wrap every fetch with 3 attempts + exponential backoff so a transient
// network blip on Netlify's build machines can't silently degrade a page.
// If all attempts fail, the error propagates — generateMetadata throws, and
// the build fails LOUDLY with the route named instead of caching a blank
// <head> for the full ISR revalidate window.
const rawFetch = baseClient.fetch.bind(baseClient)

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchWithRetry(
  query: string,
  params?: Record<string, unknown>,
  options?: unknown,
): Promise<unknown> {
  let lastError: unknown
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await rawFetch(query, params as never, options as never)
    } catch (error) {
      lastError = error
      if (attempt < 3) await sleep(500 * 2 ** (attempt - 1))
    }
  }
  throw lastError
}

// Preserve the public API: every existing `client.fetch(...)` call site in
// src/sanity/queries/** gets retries with zero changes.
;(baseClient as { fetch: typeof fetchWithRetry }).fetch = fetchWithRetry

export const client = baseClient
