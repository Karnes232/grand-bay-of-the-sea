/**
 * One-off content fix (2026-07-25): align the shark species list everywhere to the
 * owner-confirmed canonical list — nurse sharks, blacktip reef sharks, Caribbean
 * reef sharks (no hammerheads). Walks every string field of the affected docs
 * (visible copy + structuredData JSON strings + meta) and patches published docs
 * and any existing drafts.
 *
 * Run: npx tsx --env-file=.env.local scripts/fix-shark-species.ts        (dry run)
 *      npx tsx --env-file=.env.local scripts/fix-shark-species.ts --write
 */
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const DOC_IDS = [
  "homePage",
  "sharkDive",
  "7b05d327-a771-4437-b61d-16412e3ab174", // pageSeo (home org description)
  "bda28d9f-561c-4a4c-9e91-371eb8ddd32d", // pageSeo (sites)
  "c276c5e9-1182-4c31-914c-2648d41d2038", // pageSeo (shark dive)
]

// Ordered: most-specific first so broader patterns never mangle already-fixed text.
const REPLACEMENTS: [string, string][] = [
  // EN — remove hammerhead claim, add the full canonical trio
  [
    "nurse sharks, blacktip sharks, and occasionally even rare hammerhead sharks",
    "nurse sharks, blacktip reef sharks, and Caribbean reef sharks",
  ],
  ["parrotfish, and nurse sharks, along with", "parrotfish, nurse sharks, blacktip reef sharks, and Caribbean reef sharks, along with"],
  ["Encounter blacktip reef sharks", "Encounter nurse sharks, blacktip reef sharks, and Caribbean reef sharks"],
  ["nurse, blacktip, and reef sharks", "nurse, blacktip reef, and Caribbean reef sharks"],
  ["Nurse sharks and Caribbean reef sharks", "Nurse sharks, blacktip reef sharks, and Caribbean reef sharks"],
  ["nurse sharks and Caribbean reef sharks", "nurse sharks, blacktip reef sharks, and Caribbean reef sharks"],
  ["Nurse sharks, Caribbean reef sharks", "Nurse sharks, blacktip reef sharks, Caribbean reef sharks"],
  // ES — canonical blacktip term: "tiburones de puntas negras"
  [
    "tiburones nodriza, tiburones de arrecife de punta negra y, en ocasiones, hasta tiburones martillo",
    "tiburones nodriza, tiburones de puntas negras y tiburones de arrecife del Caribe",
  ],
  ["peces loro y tiburones nodriza, junto con", "peces loro, tiburones nodriza, tiburones de puntas negras y tiburones de arrecife del Caribe, junto con"],
  ["Encuentra tiburones de arrecife de puntas negras", "Encuentra tiburones nodriza, tiburones de puntas negras y tiburones de arrecife del Caribe"],
  ["tiburones nodriza, de puntas negras y de arrecife en su hábitat", "tiburones nodriza, de puntas negras y de arrecife del Caribe en su hábitat"],
  ["Los tiburones nodriza y los tiburones de arrecife del Caribe", "Los tiburones nodriza, los tiburones de puntas negras y los tiburones de arrecife del Caribe"],
  ["tiburones nodriza y tiburones de arrecife del Caribe", "tiburones nodriza, tiburones de puntas negras y tiburones de arrecife del Caribe"],
  ["Tiburones nodriza, tiburones de arrecife del Caribe", "Tiburones nodriza, tiburones de puntas negras, tiburones de arrecife del Caribe"],
]

const applyReplacements = (s: string): string => {
  let out = s
  for (const [from, to] of REPLACEMENTS) out = out.split(from).join(to)
  return out
}

/** Walk the doc; collect {sanityPath: newValue} for every changed string leaf. */
function collectChanges(node: any, path: string, changes: Record<string, string>) {
  if (typeof node === "string") {
    const next = applyReplacements(node)
    if (next !== node) changes[path] = next
    return
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      const seg = item && typeof item === "object" && item._key ? `[_key=="${item._key}"]` : `[${i}]`
      collectChanges(item, `${path}${seg}`, changes)
    })
    return
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith("_")) continue // skip _id/_rev/_type/_system etc.
      collectChanges(v, path ? `${path}.${k}` : k, changes)
    }
  }
}

const write = process.argv.includes("--write")

async function run() {
  if (write && !process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN missing")
  const allIds = DOC_IDS.flatMap(id => [id, `drafts.${id}`])
  for (const id of allIds) {
    const doc = await client.fetch(`*[_id == $id][0]`, { id })
    if (!doc) {
      if (id.startsWith("drafts.")) console.log(`— ${id}: no draft (ok)`)
      else console.log(`!! ${id}: NOT FOUND`)
      continue
    }
    const changes: Record<string, string> = {}
    collectChanges(doc, "", changes)
    const n = Object.keys(changes).length
    console.log(`\n== ${id} (${doc._type}): ${n} field(s) to change`)
    for (const [p, v] of Object.entries(changes)) {
      console.log(`   ${p}\n     -> ${v.length > 160 ? v.slice(0, 160) + "…" : v}`)
    }
    if (write && n > 0) {
      await client.patch(id).set(changes).commit()
      console.log(`   ✔ patched ${id}`)
    }
  }
  // Post-check: no hammerhead/martillo left anywhere in these docs
  if (write) {
    for (const id of allIds) {
      const doc = await client.fetch(`*[_id == $id][0]`, { id })
      if (!doc) continue
      const s = JSON.stringify(doc)
      for (const bad of ["hammerhead", "martillo"]) {
        if (s.toLowerCase().includes(bad)) console.log(`!! WARNING: "${bad}" still present in ${id}`)
      }
    }
    console.log("\nPost-check complete.")
  }
  console.log(write ? "\nDone (written)." : "\nDry run only — re-run with --write to apply.")
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
