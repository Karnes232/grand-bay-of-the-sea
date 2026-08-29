# Translation brief — English → German

**Client:** Grand Bay of the Sea, PADI Dive Center #27147, Punta Cana, Dominican Republic
**Site:** https://www.grandbay-puntacana.com
**Target:** German (de) — audience is German, Austrian and Swiss travellers booking diving in the Dominican Republic

---

## 1. The job

| | |
|---|---|
| Segments | **1,047** |
| Documents | **82** |
| Word count | **~23,400** |
| Format | XLIFF 1.2 (`.xlf`) — CSV companion supplied for reference |

The website's blog is **not** in scope. This is the service site only: courses, dive trips, dive sites, shark dive, fishing, liveaboards, and the supporting pages.

Largest sections by volume:

| Section | Segments |
|---|---|
| Course pages (10 PADI courses) | 406 |
| Dive trips (Catalina, Saona, Bayahibe) | 123 |
| Marine species descriptions | 66 |
| About us | 47 |
| FAQs | 46 |
| Shark dive | 42 |
| Home page | 39 |
| Everything else | 278 |

**Partial delivery is fine.** Segment IDs are stable, so batches can be returned and loaded as they are finished. Please deliver whole documents where possible rather than fragments across many.

---

## 2. One decision needed before you start

**Register: *du* or *Sie*?**

Most German-language dive centres address customers informally as *du*, which suits the friendly, small-operator tone of the English copy. But this must be **consistent across all 1,047 segments**, and changing it afterwards means revisiting the entire job.

Please confirm the choice with the client before beginning.

---

## 3. Working with the file

- **Preserve the `<g id="N">…</g>` tags exactly.** They mark text that is bold or hyperlinked in the published page. The tag may move within the sentence to suit German word order, and the text inside it may change — but the tag itself, and its `id`, must survive. Dropping one loses the formatting; changing an `id` puts the formatting on the wrong words.
- **Never edit the `id` attribute of a `trans-unit`.** It is how the translation is written back into the CMS.
- **Leave a target empty rather than copying the source.** An untranslated segment is easy to find and re-send; a copied one silently ships English to German readers.
- Segments are ordered by document, and each carries a `<note>` giving the document type, page name and field, for context.

---

## 4. Terminology

Use real German diving vocabulary, not transliterated English: *tauchen*, *Tauchgang*, *Tauchkurs*, *Tauchbasis*, *Tauchplatz*, *Tauchausrüstung*, *Riff*, *Wrack*.

**PADI course names must use PADI's official German names**, not literal translations. These ten courses appear throughout:

- Discover Scuba Diving
- PADI Scuba Diver
- PADI Open Water Diver — plus two variants: *for eLearners* and *Referral*
- PADI Advanced Open Water
- PADI Deep Diver
- PADI Wreck Diver
- PADI Peak Performance Buoyancy
- PADI Enriched Air Nitrox

Where PADI publishes a German course name, use it verbatim. Where PADI markets the course under its English name in German-speaking markets, keep the English name.

### Do not translate

- The business name **Grand Bay of the Sea**
- Place names: Punta Cana, Bávaro, Cabeza de Toro, Catalina, Saona, Bayahibe, Silver Bank, Dominican Republic → *Dominikanische Republik* is correct, the rest stay as-is
- Wreck and dive-site names: St. George, Monica, Astron, Shark Point, Coral Garden, Cuevitas, El Niño
- Prices and currency (US dollars, shown as `$`)
- Certification agency names and course codes

---

## 5. Facts that must not drift

These are established, verified details about this operator. English phrasing sometimes hides how specific they are, so please translate them precisely and flag anything that looks contradictory rather than smoothing it over.

- **"Confined water training", never "pool".** Use the PADI-standard German term for confined water. Do **not** render it as *Schwimmbad*.
- **Sharks on the shark dive are nurse sharks, blacktip reef sharks and Caribbean reef sharks.** There are no hammerheads. If a segment implies otherwise, flag it.
- **Discover Scuba Diving at this centre goes to a maximum of 6 m.** Where a segment states 12 m it is describing the PADI standard, not this operator's dives — keep whichever depth the source states, and do not harmonise them.
- **Silver Bank is a summer liveaboard diving trip, June–August.** It is not a whale-watching trip, and there is no whale watching at Silver Bank. The whale-watching adventure is a separate product with its own season (January–March).
- **Underwater visibility is 15–25 m.**
- The centre is a **PADI Dive Center, store #27147**.

---

## 6. SEO fields — length limits apply

Segments whose field path begins `seo.meta` are search-engine metadata, and they are **hard-limited**:

| Field | Limit |
|---|---|
| `seo.meta…title` | **60 characters** |
| `seo.meta…description` | **160 characters** |

German typically runs 10–20% longer than English, so these cannot be translated literally — they need to be **rewritten to fit** while keeping the search intent. Prioritise, in order: the core keyword (*Tauchen Punta Cana*, *Tauchkurs*, *PADI*), the location, then the selling point.

Titles and descriptions are what a searcher reads in Google before clicking, so they should read as natural German marketing copy, not as a compressed translation.

---

## 7. Delivery

Return the `.xlf` with targets filled. It is loaded straight into the CMS as unpublished drafts for the client to review before anything goes live, so nothing is lost if a revision pass is needed.

Please flag separately (not in the file):

- Any source segment that reads as wrong, contradictory, or unclear
- Any place where the *du/Sie* choice, or a PADI German course name, needed a judgement call
- Any `seo.meta` segment where the character limit forced a meaningful change of emphasis
