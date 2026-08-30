/**
 * Rewrite seo.meta titles/descriptions, with the length limits enforced.
 *
 * Google truncates titles near 60 chars and descriptions near 160. The German
 * locale is the only one that was ever written under that constraint (i18n-fill
 * enforces it), which is why every German snippet fits and most EN/ES ones do
 * not. This applies the same discipline to the pages that actually earn US
 * impressions, and refuses to write anything that would itself be truncated.
 *
 * Run: node --env-file=.env.local scripts/set-seo-meta.mjs [--write]
 */
import { createClient } from "next-sanity"
const write = process.argv.includes("--write")
const c = createClient({projectId:"33b6wn5r",dataset:"production",apiVersion:"2025-11-13",
  token:process.env.SANITY_API_WRITE_TOKEN,useCdn:false,perspective:"raw"})

const T_MAX = 60, D_MAX = 160

// Keyed by "<type>/<slug>" or "<type>" for singletons.
const EDITS = {
  "individualCourse/advanced": {
    en: ["PADI Advanced Open Water Punta Cana | $449, 2–3 Days",
         "Get PADI Advanced Open Water certified in Punta Cana in 2–3 days. Deep diving to 30m, navigation and specialty dives. $449, small groups."],
    es: ["PADI Advanced Open Water Punta Cana | $449, 2–3 Días",
         "Certifícate en PADI Advanced Open Water en Punta Cana en 2–3 días. Buceo profundo a 30 m, navegación y especialidades. $449, grupos pequeños."],
  },
  "individualCourse/openwater": {
    en: ["PADI Open Water Punta Cana | $499, Certified in 3–4 Days",
         "Earn your PADI Open Water certification in Punta Cana in 3–4 days. Warm Caribbean reefs, small groups, multilingual instructors. $499."],
    es: ["PADI Open Water Punta Cana | $499, Certifícate en 3–4 Días",
         "Obtén tu certificación PADI Open Water en Punta Cana en 3–4 días. Arrecifes cálidos, grupos pequeños e instructores multilingües. $499."],
  },
  "individualCourse/scubadiver": {
    en: ["PADI Scuba Diver Punta Cana | $399, Certified in 2 Days",
         "Get PADI Scuba Diver certified in Punta Cana in just 2 days. The shorter certification for travellers with limited time. $399, small groups."],
    es: ["PADI Scuba Diver Punta Cana | $399, Certifícate en 2 Días",
         "Obtén tu certificación PADI Scuba Diver en Punta Cana en solo 2 días. La opción corta si tienes poco tiempo. $399, grupos pequeños."],
  },
  "individualCourse/discover": {
    en: ["Discover Scuba Diving Punta Cana | $100, No Experience",
         "Try scuba diving in Punta Cana for $100. One guided open-water dive with a PADI instructor, no certification needed. Gear and pickup included."],
    es: ["Discover Scuba Diving Punta Cana | $100, Sin Experiencia",
         "Prueba el buceo en Punta Cana por $100. Una inmersión guiada con instructor PADI, sin certificación previa. Equipo y traslado incluidos."],
  },
  "individualCourse/enriched-air": {
    en: ["PADI Nitrox Course Punta Cana | $350, Dive Longer",
         "Get PADI Enriched Air Nitrox certified in Punta Cana for $350. Longer bottom times and shorter surface intervals, usually done in one day."],
    es: ["Curso PADI Nitrox Punta Cana | $350, Bucea Más Tiempo",
         "Certifícate en PADI Nitrox (aire enriquecido) en Punta Cana por $350. Más tiempo de fondo e intervalos más cortos, normalmente en un día."],
  },
  "individualCourse/peak-performance-buoyancy": {
    en: ["PADI Peak Performance Buoyancy Punta Cana | $300",
         "Master your buoyancy in Punta Cana with the PADI Peak Performance Buoyancy course. $300, two dives, better air consumption and reef-safe trim."],
    es: ["PADI Control de Flotabilidad Punta Cana | $300",
         "Domina tu flotabilidad en Punta Cana con el curso PADI Peak Performance Buoyancy. $300, dos inmersiones y mejor consumo de aire."],
  },
  "individualCourse/wreck": {
    en: ["PADI Wreck Diver Punta Cana | $400, Dive the St. George",
         "Get PADI Wreck Diver certified in Punta Cana for $400. Learn safe wreck penetration and dive the St. George and Atlantic Princess."],
    es: ["PADI Wreck Diver Punta Cana | $400, Bucea el St. George",
         "Certifícate en PADI Wreck Diver en Punta Cana por $400. Aprende penetración segura y bucea el St. George y el Atlantic Princess."],
  },
  "trips/catalina": {
    en: ["Catalina Island Diving from Punta Cana | $220, Full Day",
         "Full-day Catalina Island dive trip from Punta Cana. Two dives at The Wall and The Aquarium, lunch and drinks included. $220 diving, $100 snorkeling."],
    es: ["Buceo en Isla Catalina desde Punta Cana | $220, Día Completo",
         "Excursión de día completo a Isla Catalina desde Punta Cana. Dos inmersiones en La Pared y el Acuario, almuerzo y bebidas. $220 buceo."],
  },
  "trips/bayahibe": {
    en: ["Bayahibe Diving from Punta Cana | $180, Half Day",
         "Half-day Bayahibe dive trip from Punta Cana. Two dives including the St. George wreck. $180 per diver, gear, guide and transport included."],
    es: ["Buceo en Bayahibe desde Punta Cana | $180, Medio Día",
         "Excursión de medio día a Bayahibe desde Punta Cana. Dos inmersiones, incluido el pecio St. George. $180 por buzo, equipo y traslado."],
  },
  "trips/saona": {
    en: ["Private Saona Island Dive Charter | Punta Cana | $250",
         "Private Saona Island diving and snorkeling charter from Punta Cana. Your own boat and guide for the day. $250 per diver. Book direct."],
    es: ["Chárter Privado de Buceo a Isla Saona | Punta Cana | $250",
         "Chárter privado de buceo y snorkel a Isla Saona desde Punta Cana. Barco y guía solo para tu grupo. $250 por buzo. Reserva directa."],
  },
  "blogPost/sargassum-seaweed-punta-cana": {
    en: ["Sargassum in Punta Cana: 2026 Season, Beach by Beach",
         "Sargassum peaks May–August. Bávaro and Cabeza de Toro are hit hardest; Cap Cana and Bayahibe stay cleaner. Diving is unaffected — here's why."],
    es: ["Sargazo en Punta Cana: Temporada 2026, Playa por Playa",
         "El sargazo es peor de mayo a agosto. Bávaro y Cabeza de Toro reciben lo peor; Cap Cana y Bayahibe siguen limpias. El buceo no se afecta."],
  },
  "blogPost/dominican-republic-e-ticket-guide": {
    en: ["Dominican Republic E-Ticket: Free Official Guide (2026)",
         "The DR E-Ticket is free at eticket.migracion.gob.do. Two forms per round trip, one covers up to 7 family members, and how to spot the paid fakes."],
    es: ["E-Ticket República Dominicana: Guía Oficial Gratuita 2026",
         "El E-Ticket dominicano es gratis en eticket.migracion.gob.do. Dos formularios por viaje, uno cubre hasta 7 familiares, y cómo evitar los falsos."],
  },
  "blogPost/how-deep-can-beginner-scuba-dive": {
    en: ["How Deep Is Your First Scuba Dive? Depth Limits Explained",
         "Discover Scuba 12m, Open Water 18m, Advanced 30m, Deep 40m — the depth limit at each level, what it feels like, and Punta Cana sites for each."],
    es: ["¿A Qué Profundidad Es tu Primera Inmersión? Guía 2026",
         "Discover Scuba a 12m, Open Water a 18m, Advanced a 30m, Deep a 40m — los límites de cada certificación y los sitios de Punta Cana a cada nivel."],
  },
}

const docs = await c.fetch(`*[!(_id in path("drafts.**")) && _type in ["individualCourse","trips","blogPost"]]{_id,_type,"slug":slug.current,seo}`)
const byKey = new Map(docs.map(d => [`${d._type}/${d.slug}`, d]))

let bad = 0, n = 0
const tx = c.transaction()
for (const [key, locs] of Object.entries(EDITS)) {
  const d = byKey.get(key)
  if (!d) { console.log(`  ! not found: ${key}`); bad++; continue }
  const seo = JSON.parse(JSON.stringify(d.seo))
  for (const [loc, [title, description]] of Object.entries(locs)) {
    if (title.length > T_MAX || description.length > D_MAX) {
      console.log(`  ! OVER LIMIT ${key} [${loc}] T:${title.length} D:${description.length}`); bad++; continue
    }
    const before = d.seo?.meta?.[loc] ?? {}
    console.log(`  ${key} [${loc}]  T ${String((before.title||"").length).padStart(3)}->${String(title.length).padStart(2)}  D ${String((before.description||"").length).padStart(3)}->${String(description.length).padStart(3)}`)
    seo.meta[loc] = { ...before, title, description }
    n++
  }
  tx.patch(d._id, { set: { seo } })
}
console.log(`\n${n} snippet(s) rewritten, ${bad} rejected`)
if (bad) { console.error("Refusing to write while any entry is over the limit."); process.exit(1) }
if (!write) { console.log("Dry run. Re-run with --write."); process.exit(0) }
await tx.commit()
console.log("Committed.")
