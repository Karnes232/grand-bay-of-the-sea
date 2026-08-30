#!/usr/bin/env node
/**
 * Post-build metadata verification.
 *
 * Default (static) mode — run after `next build`:
 *   node scripts/verify-metadata.mjs
 *   Scans .next/server/app for prerendered *.html files and asserts each one
 *   contains a non-empty <meta name="description"> AND a <link rel="canonical">.
 *   Exits 1 (failing the Netlify build) if any page shipped a blank <head>.
 *
 * Live mode — verify a deployed site via its sitemap:
 *   node scripts/verify-metadata.mjs --url https://example.netlify.app
 *   Fetches <base>/sitemap.xml (following a <sitemapindex> to child sitemaps),
 *   rewrites every <loc> onto the given base host (the dev site's sitemap
 *   lists production URLs — only the pathname is kept), fetches each page with
 *   concurrency 5, and runs the same two assertions.
 *
 * Zero dependencies. Node 18+.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs"
import { join } from "node:path"

const SKIP_SEGMENTS = ["_not-found", "opengraph-image", "icon", "apple-icon"]

// ---------------------------------------------------------------------------
// Assertions (shared by both modes)
// ---------------------------------------------------------------------------

/**
 * True when the HTML contains <meta name="description" content="..."> with a
 * non-empty content value. Attribute order varies between Next versions, so
 * both orders are accepted.
 */
function hasMetaDescription(html) {
  const nameFirst =
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i.exec(html)
  const contentFirst =
    /<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i.exec(html)
  const content = (nameFirst ?? contentFirst)?.[1]?.trim()
  return Boolean(content)
}

/** True when the HTML contains a <link rel="canonical"> tag. */
function hasCanonical(html) {
  return /<link\s[^>]*rel=["']canonical["']/i.test(html)
}

/**
 * True when Next prerendered this route as something other than a 200.
 *
 * A route that calls notFound() or redirect() still emits an .html file, but it
 * is the not-found page or an empty redirect shell — legitimately without a
 * canonical or description. Next records the real status in a sibling .meta
 * sidecar, so use that rather than pattern-matching the body.
 *
 * Covers 404 and 3xx alike: untranslated German blog posts redirect to their
 * English equivalent, and without this every one of them would read as
 * "shipped broken metadata" and fail the build.
 */
function isNonOkPage(htmlPath) {
  const metaPath = htmlPath.replace(/\.html$/, ".meta")
  if (!existsSync(metaPath)) return false
  try {
    const status = JSON.parse(readFileSync(metaPath, "utf8")).status
    return typeof status === "number" && status !== 200
  } catch {
    return false
  }
}

/** Returns a list of failure reasons for one HTML document (empty = pass). */
function checkHtml(html) {
  const failures = []
  if (!hasMetaDescription(html)) failures.push("missing/empty meta description")
  if (!hasCanonical(html)) failures.push("missing canonical link")
  return failures
}

/**
 * Google truncates the SERP snippet at roughly these lengths, so anything past
 * them is written but never read — the reason to click gets cut mid-sentence.
 *
 * These are WARNINGS, not build failures. A large backlog of over-length
 * snippets predates this check (the German locale is the only one that was
 * authored under the limit, because scripts/i18n-fill.mjs enforces it), and
 * failing the build on them would block every deploy. Tighten to a failure once
 * the backlog is cleared.
 */
const TITLE_MAX = 60
const DESCRIPTION_MAX = 160

function snippetWarnings(html) {
  const warnings = []
  const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]?.trim()
  if (title && title.length > TITLE_MAX) {
    warnings.push(`title ${title.length}>${TITLE_MAX}`)
  }
  const nameFirst =
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i.exec(html)
  const contentFirst =
    /<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i.exec(html)
  const description = (nameFirst ?? contentFirst)?.[1]?.trim()
  if (description && description.length > DESCRIPTION_MAX) {
    warnings.push(`description ${description.length}>${DESCRIPTION_MAX}`)
  }
  return warnings
}

// ---------------------------------------------------------------------------
// Static mode: scan .next/server/app
// ---------------------------------------------------------------------------

function collectHtmlFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (
      SKIP_SEGMENTS.some(seg => entry === seg || entry.startsWith(`${seg}.`))
    ) {
      continue
    }
    const stats = statSync(full)
    if (stats.isDirectory()) {
      out.push(...collectHtmlFiles(full))
    } else if (entry.endsWith(".html")) {
      out.push(full)
    }
  }
  return out
}

function runStatic() {
  const appDir = join(process.cwd(), ".next", "server", "app")
  if (!existsSync(appDir)) {
    console.error(
      `[verify-metadata] ${appDir} does not exist — run \`next build\` first.`,
    )
    process.exit(1)
  }

  const htmlFiles = collectHtmlFiles(appDir)
  let skipped = 0
  if (htmlFiles.length === 0) {
    console.error(
      "[verify-metadata] No prerendered HTML found under .next/server/app — " +
        "nothing to verify. Did the build produce static pages?",
    )
    process.exit(1)
  }

  const failed = []
  const warned = []
  for (const file of htmlFiles) {
    if (isNonOkPage(file)) {
      skipped++
      continue
    }
    const html = readFileSync(file, "utf8")
    const route = file.slice(appDir.length).replace(/\.html$/, "") || "/"
    const failures = checkHtml(html)
    if (failures.length) failed.push({ route, failures })
    const warnings = snippetWarnings(html)
    if (warnings.length) warned.push({ route, warnings })
  }

  report(failed, htmlFiles.length - skipped, skipped, warned)
}

// ---------------------------------------------------------------------------
// Live mode: --url <base>
// ---------------------------------------------------------------------------

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s][^<]*?)\s*<\/loc>/g)].map(m => m[1])
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

async function collectSitemapUrls(base) {
  const sitemapUrl = new URL("/sitemap.xml", base).href
  const xml = await fetchText(sitemapUrl)

  // A <sitemapindex> lists child sitemaps; fetch each and collect their <loc>s.
  if (/<sitemapindex[\s>]/i.test(xml)) {
    const children = extractLocs(xml)
    const urls = []
    for (const child of children) {
      // Child sitemap URLs may also point at the production host.
      const childOnBase = new URL(new URL(child).pathname, base).href
      try {
        urls.push(...extractLocs(await fetchText(childOnBase)))
      } catch (error) {
        console.error(
          `[verify-metadata] Failed to fetch child sitemap ${childOnBase}: ${error.message}`,
        )
        process.exitCode = 1
      }
    }
    return urls
  }
  return extractLocs(xml)
}

async function runLive(base) {
  let locs
  try {
    locs = await collectSitemapUrls(base)
  } catch (error) {
    console.error(
      `[verify-metadata] Could not load ${new URL("/sitemap.xml", base).href}: ${error.message}`,
    )
    process.exit(1)
  }

  // The sitemap lists production URLs — keep only the pathname and check the
  // given host instead.
  const urls = [
    ...new Set(locs.map(loc => new URL(new URL(loc).pathname, base).href)),
  ]

  if (urls.length === 0) {
    console.error("[verify-metadata] Sitemap contained no URLs.")
    process.exit(1)
  }

  const failed = []
  const queue = [...urls]
  const warned = []
  const CONCURRENCY = 5

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift()
      const route = new URL(url).pathname
      try {
        const html = await fetchText(url)
        const failures = checkHtml(html)
        if (failures.length) failed.push({ route, failures })
        const warnings = snippetWarnings(html)
        if (warnings.length) warned.push({ route, warnings })
      } catch (error) {
        failed.push({ route, failures: [`fetch failed: ${error.message}`] })
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  report(failed, urls.length, 0, warned)
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function report(failed, total, skipped = 0, warned = []) {
  if (failed.length) {
    console.error(
      `\n[verify-metadata] ${failed.length} of ${total} page(s) shipped broken metadata:\n`,
    )
    for (const { route, failures } of failed.sort((a, b) =>
      a.route.localeCompare(b.route),
    )) {
      console.error(`  ✗ ${route} — ${failures.join(", ")}`)
    }
    console.error(
      "\n[verify-metadata] Failing the build so a blank <head> is never deployed.",
    )
    process.exit(1)
  }
  console.log(
    `[verify-metadata] OK — ${total} page(s) verified: description + canonical present on all.` +
      (skipped ? ` (${skipped} intentional 404/redirect(s) skipped.)` : ""),
  )

  if (warned.length) {
    console.log(
      `\n[verify-metadata] ${warned.length} page(s) will be truncated in search ` +
        `results (title >${TITLE_MAX} or description >${DESCRIPTION_MAX} chars). ` +
        `Not failing the build — this is a pre-existing backlog.`,
    )
    for (const { route, warnings } of warned
      .sort((a, b) => a.route.localeCompare(b.route))
      .slice(0, 15)) {
      console.log(`  · ${route} — ${warnings.join(", ")}`)
    }
    if (warned.length > 15) {
      console.log(`  … and ${warned.length - 15} more`)
    }
  }
}

// ---------------------------------------------------------------------------

const urlFlagIndex = process.argv.indexOf("--url")
if (urlFlagIndex !== -1) {
  const base = process.argv[urlFlagIndex + 1]
  if (!base) {
    console.error("[verify-metadata] --url requires a base URL argument.")
    process.exit(1)
  }
  await runLive(base)
} else {
  runStatic()
}
