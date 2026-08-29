/**
 * Shared logic for the translation export/import pair.
 *
 * A "localized object" here is any object carrying an `en` key — the shape
 * produced by localizedString / localizedText / localizedBlock and by the
 * hand-rolled en/es blocks in seo, IndividualCourse, Faqs and sites.
 *
 * The awkward case is localizedBlock: its value is a Portable Text array, not
 * a string. Translators need flat text, but the block structure (style,
 * listItem, level, markDefs, and which runs are bold/linked) has to survive the
 * round trip. The approach below exports one segment per block, with inline
 * `<g id="N">…</g>` tags marking the runs that carry marks, and rebuilds the
 * block array on import from the English block as a template.
 */

export type SegmentKind = "string" | "text" | "block"

export interface Segment {
  /** `docId::fieldPath` or `docId::fieldPath::blockKey` */
  id: string
  docId: string
  docType: string
  docLabel: string
  /** Dotted path to the localized object, e.g. `seo.meta` or `faqs[0].answer` */
  path: string
  kind: SegmentKind
  /** Portable Text block key, for `kind === "block"` */
  blockKey?: string
  /**
   * Leaf key inside an object-valued locale wrapper — e.g. `title` for
   * `seo.meta = { en: { title, description, keywords } }`.
   */
  leafKey?: string
  /** Block style (normal, h2, blockquote…) — context for the translator */
  style?: string
  /** The English source text */
  source: string
}

/**
 * The blog is deliberately en/es only (see BLOG_LOCALES in
 * src/i18n/locales.ts), so its documents are never exported for translation.
 */
export const EXCLUDED_TYPES = new Set([
  "blogPost",
  "blogCategory",
  "blogPageLayout",
  "sanity.fileAsset",
  "sanity.imageAsset",
])

/**
 * Fields excluded from translation by design:
 *  - slug     German URLs keep the English slugs; translating them would buy
 *             nothing and cost a redirect map.
 *  - structuredData  JSON-LD blobs. Their human-readable values matter but a
 *             translator editing raw JSON is a corruption risk; handle these
 *             separately if they ever need localizing.
 */
const EXCLUDED_PATH_SEGMENTS = new Set(["slug", "structuredData"])

export function isLocalizedObject(node: any): boolean {
  return (
    node !== null &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    "en" in node
  )
}

function isPlainObject(value: any): boolean {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0
  return false
}

export function docLabel(doc: any): string {
  for (const candidate of [doc.title, doc.pageName, doc.name, doc.course]) {
    const value =
      candidate && typeof candidate === "object" ? candidate.en : candidate
    if (typeof value === "string" && value.trim()) return value
  }
  return doc._id
}

function pathIsExcluded(path: string): boolean {
  return path
    .split(".")
    .some(part => EXCLUDED_PATH_SEGMENTS.has(part.replace(/\[\d+\]$/, "")))
}

// ---------------------------------------------------------------------------
// Portable Text <-> flat text
// ---------------------------------------------------------------------------

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function unescapeText(s: string): string {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
}

/** Flatten one Portable Text block to translator-facing text. */
export function blockToText(block: any): string {
  const spans = (block.children ?? []).filter((c: any) => c._type === "span")
  if (spans.length === 0) return ""
  if (spans.length === 1 && !spans[0].marks?.length) {
    return escapeText(spans[0].text ?? "")
  }
  return spans
    .map((span: any, i: number) =>
      span.marks?.length
        ? `<g id="${i}">${escapeText(span.text ?? "")}</g>`
        : escapeText(span.text ?? ""),
    )
    .join("")
}

let keyCounter = 0
function newKey(prefix: string): string {
  keyCounter += 1
  return `${prefix}${keyCounter.toString(36)}${Math.abs(
    // deterministic-ish but unique within a run
    (keyCounter * 2654435761) % 0xffffff,
  ).toString(36)}`
}

/**
 * Rebuild a Portable Text block from the English block plus translated text.
 *
 * The English block is the template: style, listItem, level and markDefs are
 * carried over untouched, and `<g id="N">` runs inherit the marks of English
 * span N. Anything outside a `<g>` becomes an unmarked span.
 */
export function textToBlock(englishBlock: any, translated: string): any {
  const spans = (englishBlock.children ?? []).filter(
    (c: any) => c._type === "span",
  )

  const children: any[] = []
  const pattern = /<g id="(\d+)">([\s\S]*?)<\/g>/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  const pushSpan = (text: string, marks: string[]) => {
    if (text === "") return
    children.push({
      _type: "span",
      _key: newKey("s"),
      text: unescapeText(text),
      marks,
    })
  }

  while ((match = pattern.exec(translated)) !== null) {
    pushSpan(translated.slice(lastIndex, match.index), [])
    const sourceSpan = spans[Number(match[1])]
    pushSpan(match[2], sourceSpan?.marks ?? [])
    lastIndex = pattern.lastIndex
  }
  pushSpan(translated.slice(lastIndex), [])

  if (children.length === 0) {
    pushSpan("", [])
    children.push({ _type: "span", _key: newKey("s"), text: "", marks: [] })
  }

  return {
    ...englishBlock,
    _key: englishBlock._key,
    children,
  }
}

// ---------------------------------------------------------------------------
// Walking documents
// ---------------------------------------------------------------------------

/**
 * Collect every translatable segment in a document: each localized field that
 * has English content. Fields that already have German are included only when
 * `includeTranslated` is set, so a re-export after a partial delivery contains
 * just the outstanding work.
 */
export function collectSegments(
  doc: any,
  { includeTranslated = false }: { includeTranslated?: boolean } = {},
): Segment[] {
  const segments: Segment[] = []
  const label = docLabel(doc)

  const walk = (node: any, path: string) => {
    if (node === null || typeof node !== "object") return

    if (isLocalizedObject(node) && !pathIsExcluded(path)) {
      const needed =
        !isEmpty(node.en) && (includeTranslated || isEmpty(node.de))
      if (needed) {
        if (Array.isArray(node.en)) {
          // localizedBlock: one segment per Portable Text block
          for (const block of node.en) {
            if (block?._type !== "block") continue
            const source = blockToText(block)
            if (!source.trim()) continue
            segments.push({
              id: `${doc._id}::${path}::${block._key}`,
              docId: doc._id,
              docType: doc._type,
              docLabel: label,
              path,
              kind: "block",
              blockKey: block._key,
              style: block.style ?? "normal",
              source,
            })
          }
        } else if (typeof node.en === "string") {
          segments.push({
            id: `${doc._id}::${path}`,
            docId: doc._id,
            docType: doc._type,
            docLabel: label,
            path,
            kind: node.en.includes("\n") ? "text" : "string",
            source: node.en,
          })
        }
      }

      // Object-valued locale wrapper — `seo.meta = { en: { title,
      // description, keywords }, es, de }` and the same for `seo.openGraph`.
      // These carry every page's search-result title and description, so
      // missing them silently omits the most SEO-critical text on the site.
      // Handled outside the `needed` check because completeness is per-leaf:
      // a wrapper can have German for `title` but not `description`.
      if (isPlainObject(node.en)) {
        for (const [leafKey, value] of Object.entries<any>(node.en)) {
          const source =
            typeof value === "string"
              ? value
              : Array.isArray(value) && value.every(v => typeof v === "string")
                ? value.join(", ") // e.g. seo.meta.keywords
                : null
          if (source === null || !source.trim()) continue
          if (!includeTranslated && !isEmpty(node.de?.[leafKey])) continue
          segments.push({
            id: `${doc._id}::${path}::${leafKey}`,
            docId: doc._id,
            docType: doc._type,
            docLabel: label,
            path,
            kind: source.includes("\n") ? "text" : "string",
            leafKey,
            source,
          })
        }
        // Don't descend: the only sibling is a non-translatable asset
        // (`openGraph.image`), and the locale branches hold no `en` key.
        return
      }
    }

    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, `${path}[${i}]`))
      return
    }

    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith("_")) continue
      walk(value, path ? `${path}.${key}` : key)
    }
  }

  walk(doc, "")
  return segments
}

/** Read a dotted/indexed path like `faqs[0].answer` out of a document. */
export function getAtPath(root: any, path: string): any {
  if (!path) return root
  let node = root
  for (const part of path.split(".")) {
    const m = part.match(/^(.*?)((\[\d+\])*)$/)
    if (!m) return undefined
    if (m[1]) node = node?.[m[1]]
    for (const idx of m[2]?.match(/\d+/g) ?? []) {
      node = node?.[Number(idx)]
    }
    if (node === undefined || node === null) return node
  }
  return node
}
