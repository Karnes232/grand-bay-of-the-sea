#!/usr/bin/env node
/**
 * Verify the UI message catalogues in messages/*.json.
 *
 * This exists because nothing checked them. `messages/de.json` shipped as a
 * verbatim copy of `messages/en.json` — all 265 strings English — and the German
 * site ran for two days with an English interface wrapped around German page
 * copy. The translation pipeline (scripts/i18n-export.ts) reads Sanity, and
 * scripts/verify-de-content.mjs checks Sanity, so the work and the check had the
 * same blind spot.
 *
 * Three assertions per locale:
 *
 *   1. Key parity      — no key in en.json missing elsewhere, and none extra.
 *   2. Placeholder parity — the same ICU placeholders ({name}, {count}, …) in
 *      every locale. A dropped placeholder is a runtime MISSING_MESSAGE crash,
 *      not a cosmetic bug, so this FAILS.
 *   3. Untranslated strings — any value identical to its English counterpart,
 *      excluding ALLOW_IDENTICAL. This WARNS rather than fails: some strings are
 *      legitimately the same in every language, and the allow-list should be
 *      curated deliberately rather than guessed at by a script.
 *
 * Run: node scripts/verify-messages.mjs
 */

import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { ACTIVE_LOCALES } from "../src/i18n/locales.ts"

const DIR = join(process.cwd(), "messages")
const BASE = "en"

/**
 * Strings that are correctly identical to English in every locale — brand names,
 * proper nouns, and words German and Spanish borrow unchanged. Anything not
 * listed here that matches English is almost certainly untranslated.
 */
const ALLOW_IDENTICAL = new Set([
  "Navbar.blog",
  "ContactForm.hotel",
  "FloatingContact.whatsapp",
  "PaymentPopupFishing.hotel",
  "PaymentPopupTrip.hotel",
  "PaymentPopupLocalDives.hotel",
  "PaymentPopupCourses.hotel",
  "DiveSiteCard.locCatalina",
  "DiveSiteCard.locBayahibe",
  "DiveSiteCard.locLocal",
  "Blog.author",
  "Breadcrumb.blog",
  "Liveaboard.silverbankTitle",
  // French/English cognates — spelled identically and correct as they are.
  // Spanish and German both differ here, so nothing is masked for them.
  "PaymentPopupFishing.excursion",
  "PaymentPopupTrip.excursion",
  "PaymentPopupCourses.excursion",
  "TourSelect.excursion",
  "CourseOverview.transport",
  "Home.booking.date",
  "Breadcrumb.contact",
])

function flatten(node, prefix = "", out = {}) {
  if (typeof node === "string") {
    out[prefix] = node
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out)
    }
  }
  return out
}

const placeholders = value =>
  [...value.matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort()

const locales = readdirSync(DIR)
  .filter(f => f.endsWith(".json"))
  .map(f => f.replace(/\.json$/, ""))

const catalogues = Object.fromEntries(
  locales.map(loc => [
    loc,
    flatten(JSON.parse(readFileSync(join(DIR, `${loc}.json`), "utf8"))),
  ]),
)

/**
 * A locale that is routed but has no catalogue crashes every page it serves,
 * because next-intl imports `messages/<locale>.json` at request time. Catch it
 * here — the gate and the catalogue are set in different places (netlify.toml
 * and this directory), so they can be flipped out of step.
 */
for (const locale of ACTIVE_LOCALES) {
  if (!(locale in catalogues)) {
    console.error(
      `[verify-messages] ${locale} is active (ACTIVE_LOCALES) but ` +
        `messages/${locale}.json does not exist. Every /${locale} page would ` +
        `fail at runtime. Add the catalogue or switch the locale's gate off.`,
    )
    process.exit(1)
  }
}

const base = catalogues[BASE]
if (!base) {
  console.error(
    `[verify-messages] No ${BASE}.json — nothing to compare against.`,
  )
  process.exit(1)
}

const failures = []
const warnings = []

for (const loc of locales) {
  if (loc === BASE) continue
  const cat = catalogues[loc]

  for (const key of Object.keys(base)) {
    if (!(key in cat)) failures.push(`${loc}: missing key ${key}`)
  }
  for (const key of Object.keys(cat)) {
    if (!(key in base))
      failures.push(`${loc}: unknown key ${key} (not in ${BASE}.json)`)
  }

  for (const [key, value] of Object.entries(base)) {
    if (!(key in cat)) continue
    const want = placeholders(value)
    const got = placeholders(cat[key])
    if (want.join(",") !== got.join(",")) {
      failures.push(
        `${loc}: placeholder mismatch in ${key} — ${BASE} has {${want.join("}, {")}}, ${loc} has {${got.join("}, {")}}`,
      )
    }
    if (cat[key] === value && !ALLOW_IDENTICAL.has(key)) {
      warnings.push(
        `${loc}: ${key} is identical to ${BASE} — "${value.slice(0, 60)}"`,
      )
    }
  }
}

const checked = Object.keys(base).length
console.log(
  `[verify-messages] ${locales.length} locale(s), ${checked} keys each: ` +
    `${failures.length} failure(s), ${warnings.length} untranslated.`,
)

if (warnings.length) {
  console.log("")
  for (const w of warnings.slice(0, 25)) console.log(`  · ${w}`)
  if (warnings.length > 25) console.log(`  … and ${warnings.length - 25} more`)
  console.log(
    "\n  Untranslated strings are a warning, not a build failure. If one is " +
      "correct as-is, add its key to ALLOW_IDENTICAL in this script.",
  )
}

if (failures.length) {
  console.error("\n[verify-messages] FAILURES:\n")
  for (const f of failures) console.error(`  ✗ ${f}`)
  console.error(
    "\n[verify-messages] Key and placeholder mismatches break the site at " +
      "runtime (MISSING_MESSAGE), so this fails the build.",
  )
  process.exit(1)
}
