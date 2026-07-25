/**
 * One-off content fix (2026-07-25): Discover Scuba Diving max depth is 6 m / 20 ft
 * (owner-confirmed operational limit), not 12 m. Fixes OPERATIONAL claims about
 * Grand Bay's own DSD dives on: the discover course doc, the courses hub intro,
 * the courses pageSeo schema, and 3 blog sentences describing our DSD product.
 *
 * Deliberately NOT touched: blog content describing the PADI certification
 * STANDARD (12 m is the correct PADI DSD standard — e.g. the depth-limits guide,
 * DSD-vs-OW comparison), and PADI Scuba Diver's legitimate 12 m certification.
 *
 * Run: npx tsx --env-file=.env.local scripts/fix-discover-depth.ts          (dry)
 *      npx tsx --env-file=.env.local scripts/fix-discover-depth.ts --write
 */
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Doc-scoped replacements: each table applies ONLY to its doc.
const FIXES: Record<string, [string, string][]> = {
  // individualCourse "discover"
  "7178e674-3b1d-4633-813c-fd690671e52e": [
    ["never deeper than 12 meters (40 feet)", "never deeper than 6 meters (20 feet)"],
    ["sin superar nunca los 12 metros (40 pies)", "sin superar nunca los 6 metros (20 pies)"],
    // paragraph3: "dives ranging from [6 m to a maximum of 12 m]" -> "dives to a maximum depth of [6 m]"
    ["takes you into the underwater world, with dives ranging from ", "takes you into the underwater world, with dives to a maximum depth of "],
    ["6 meters (20 feet) to a maximum of 12 meters (40 feet)", "6 meters (20 feet)"],
    ["te lleva al mundo submarino, con inmersiones que van desde ", "te lleva al mundo submarino, con inmersiones hasta una profundidad máxima de "],
    ["6 metros (20 pies) hasta un máximo de 12 metros (40 pies)", "6 metros (20 pies)"],
    // structuredData FAQ answers
    ["The maximum depth for Discover Scuba Diving is 40 feet (12 meters)", "The maximum depth for Discover Scuba Diving is 20 feet (6 meters)"],
    ["La profundidad máxima es de 12 metros (40 pies)", "La profundidad máxima es de 6 metros (20 pies)"],
  ],
  // coursesMainPage — paragraph1 (Discover intro). paragraph2 is PADI Scuba Diver (12 m is correct there).
  coursesMainPage: [
    ["basic skill practice, and an open-water dive to a maximum depth of 40 feet (12 meters)", "basic skill practice, and an open-water dive to a maximum depth of 20 feet (6 meters)"],
    ["práctica de habilidades básicas y una inmersión en el mar hasta una profundidad máxima de 12 metros (40 pies)", "práctica de habilidades básicas y una inmersión en el mar hasta una profundidad máxima de 6 metros (20 pies)"],
  ],
  // pageSeo (Courses) — Discover Scuba Course schema description
  "0866e6b3-11c6-479a-b39b-e9e318b9fd7b": [
    ["an open-water dive to a maximum depth of 12 meters (40 feet)", "an open-water dive to a maximum depth of 6 meters (20 feet)"],
    ["inmersión en aguas abiertas hasta una profundidad máxima de 12 metros (40 pies)", "inmersión en aguas abiertas hasta una profundidad máxima de 6 metros (20 pies)"],
  ],
  // blogPost punta-cana-dive-sites-safety — describes our DSD dives
  "1zexheHxKDYI99qGZvhs73": [
    ["DSD dives happen at shallower depths (12 meters maximum)", "DSD dives happen at shallower depths (6 meters maximum)"],
    ["las inmersiones DSD ocurren a profundidades más someras (máximo 12 metros)", "las inmersiones DSD ocurren a profundidades más someras (máximo 6 metros)"],
  ],
  // blogPost whats-included-punta-cana-dive-package — describes our DSD package
  A9KxU337ELsycETkoo1OLd: [
    ["one guided open-water dive to a maximum of 12 meters", "one guided open-water dive to a maximum of 6 meters"],
    ["una inmersión guiada en aguas abiertas a un máximo de 12 metros", "una inmersión guiada en aguas abiertas a un máximo de 6 metros"],
  ],
  // blogPost how-long-scuba-dive-lasts-punta-cana — describes our DSD dive
  aD45H1NEbb1bqELwlkXeBI: [
    ["DSD depth is limited to 12 meters", "DSD depth is limited to 6 meters"],
    ["la profundidad DSD está limitada a 12 metros", "la profundidad DSD está limitada a 6 metros"],
  ],
}

function collectChanges(node: any, path: string, table: [string, string][], changes: Record<string, string>) {
  if (typeof node === "string") {
    let next = node
    for (const [from, to] of table) next = next.split(from).join(to)
    if (next !== node) changes[path] = next
    return
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      const seg = item && typeof item === "object" && item._key ? `[_key=="${item._key}"]` : `[${i}]`
      collectChanges(item, `${path}${seg}`, table, changes)
    })
    return
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith("_")) continue
      collectChanges(v, path ? `${path}.${k}` : k, table, changes)
    }
  }
}

const write = process.argv.includes("--write")

async function run() {
  if (write && !process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN missing")
  for (const [baseId, table] of Object.entries(FIXES)) {
    for (const id of [baseId, `drafts.${baseId}`]) {
      const doc = await client.fetch(`*[_id == $id][0]`, { id })
      if (!doc) {
        if (!id.startsWith("drafts.")) console.log(`!! ${id}: NOT FOUND`)
        continue
      }
      const changes: Record<string, string> = {}
      collectChanges(doc, "", table, changes)
      const n = Object.keys(changes).length
      console.log(`\n== ${id} (${doc._type}): ${n} field(s)`)
      for (const [p, v] of Object.entries(changes)) {
        console.log(`   ${p}\n     -> ${v.length > 150 ? v.slice(0, 150) + "…" : v}`)
      }
      if (write && n > 0) {
        await client.patch(id).set(changes).commit()
        console.log(`   ✔ patched ${id}`)
      }
    }
  }
  console.log(write ? "\nDone (written)." : "\nDry run — re-run with --write to apply.")
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
