/**
 * Second CTR pass: rating into the commercial titles, plus the remaining
 * truncated snippets on pages that actually rank in the US.
 *
 * Same discipline as scripts/set-seo-meta.mjs — nothing over the limits is
 * written, so this cannot reintroduce the truncation it exists to remove.
 *
 * Handles three shapes:
 *   meta        seo.meta.<locale>.{title,description}   (partial updates OK)
 *   card        cardDescription.<locale>                (dive sites: this is
 *               both the card blurb and the meta description, because
 *               sites/[site]/page.tsx prefers it over the truncated body copy)
 *
 * Run: node --env-file=.env.local scripts/set-seo-meta-2.mjs [--write]
 */
import { createClient } from "next-sanity"
const write = process.argv.includes("--write")
const c = createClient({projectId:"33b6wn5r",dataset:"production",apiVersion:"2025-11-13",
  token:process.env.SANITY_API_WRITE_TOKEN,useCdn:false,perspective:"raw"})
const T_MAX = 60, D_MAX = 160

// Title-only: keep the descriptions written in ba11ede, add the trust signal.
const TITLES = {
  "individualCourse/advanced":  { en:"PADI Advanced Open Water Punta Cana | $449 | 4.8★", es:"PADI Advanced Open Water Punta Cana | $449 | 4.8★" },
  "individualCourse/openwater": { en:"PADI Open Water Punta Cana | $499 | 4.8★ | 3–4 Days", es:"PADI Open Water Punta Cana | $499 | 4.8★ | 3–4 Días" },
  "individualCourse/scubadiver":{ en:"PADI Scuba Diver Punta Cana | $399 | 4.8★ | 2 Days", es:"PADI Scuba Diver Punta Cana | $399 | 4.8★ | 2 Días" },
  "individualCourse/discover":  { en:"Discover Scuba Diving Punta Cana | $100 | 4.8★", es:"Discover Scuba Diving Punta Cana | $100 | 4.8★" },
  "individualCourse/enriched-air": { en:"PADI Nitrox Course Punta Cana | $350 | 4.8★", es:"Curso PADI Nitrox Punta Cana | $350 | 4.8★" },
  "individualCourse/peak-performance-buoyancy": { en:"PADI Peak Performance Buoyancy Punta Cana | $300 | 4.8★", es:"PADI Control de Flotabilidad Punta Cana | $300 | 4.8★" },
  "individualCourse/wreck":    { en:"PADI Wreck Diver Punta Cana | $400 | 4.8★", es:"PADI Wreck Diver Punta Cana | $400 | 4.8★" },
  "trips/catalina":            { en:"Catalina Island Diving from Punta Cana | $220 | 4.8★", es:"Buceo en Isla Catalina desde Punta Cana | $220 | 4.8★" },
  "trips/bayahibe":            { en:"Bayahibe Diving from Punta Cana | $180 | 4.8★", es:"Buceo en Bayahibe desde Punta Cana | $180 | 4.8★" },
  "trips/saona":               { en:"Private Saona Dive Charter | Punta Cana | $250 | 4.8★", es:"Chárter Privado de Buceo a Isla Saona | $250 | 4.8★" },
}

// Full rewrites for the 12 blog pages ranking 3-14 in the US.
const META = {
  "blogPost/do-you-need-cash-in-punta-cana": {
    en: { title:"Do You Need Cash in Punta Cana? Money & Payments Guide" },
    es: { title:"¿Necesitas Efectivo en Punta Cana? Dinero y Pagos" },
  },
  "blogPost/reef-safe-sunscreen-dominican-republic": {
    en: { title:"Reef-Safe Sunscreen in the Dominican Republic (2026)",
          description:"The DR has no sunscreen ban, but the reef damage is the same. Which chemicals to avoid, the best brands, and where to buy locally." },
    es: { title:"Protector Solar Reef-Safe en República Dominicana (2026)",
          description:"La RD no tiene prohibición, pero el daño al arrecife es igual. Qué químicos evitar, las mejores marcas y dónde comprarlo localmente." },
  },
  "blogPost/mamajuana-dominican-drink": {
    en: { description:"Mamajuana is rum, red wine, honey and tree bark. Its Taíno history, how to drink it, the aphrodisiac claim, and where to buy the real thing." },
    es: { description:"La mamajuana es ron, vino tinto, miel y cortezas. Su historia taína, cómo tomarla, la fama afrodisíaca y dónde comprar botellas auténticas." },
  },
  "blogPost/san-juan-shopping-center-bavaro": {
    en: { title:"San Juan Shopping Center Bávaro: Stores, Hours & Guide",
          description:"Bávaro's original mall on Avenida Barceló Km 9. Over 60 shops, IKEA, Sirena Market, a seven-screen cinema and all three mobile carriers." },
    es: { description:"El centro comercial original de Bávaro, Avenida Barceló Km 9. Más de 60 tiendas, IKEA, Sirena Market, cine de siete salas y las tres operadoras." },
  },
  "blogPost/complete-guide-cabeza-de-toro": {
    en: { description:"Cabeza de Toro is the quiet stretch between Bávaro and Uvero Alto: fishing-village character, the closest reef access, and fewer crowds." },
    es: { description:"Cabeza de Toro es la zona tranquila entre Bávaro y Uvero Alto: carácter de pueblo pesquero, el acceso más cercano al arrecife y menos gente." },
  },
  "blogPost/puj-vs-sdq-airport-punta-cana": {
    en: { description:"PUJ is 20–45 minutes from the resorts; SDQ is 2–3 hours. When each makes sense, what the transfer costs, and the total-cost maths." },
    es: { description:"PUJ está a 20–45 minutos de los resorts; SDQ a 2–3 horas. Cuándo conviene cada uno, cuánto cuesta el traslado y el costo total real." },
  },
  "blogPost/downtown-punta-cana-mall-guide": {
    en: { title:"Downtown Punta Cana Mall: Jumbo, Pharmacy, Banks & Hours",
          description:"Downtown Mall, Avenida Barceló Km 8, open daily 8AM–10PM. Anchored by the Jumbo hypermarket, with Farmacia Carol, banks, ATMs and dining." },
    es: { title:"Downtown Punta Cana Mall: Jumbo, Farmacia y Bancos",
          description:"Downtown Mall, Avenida Barceló Km 8, abierto diario de 8AM a 10PM. Anclado por el hipermercado Jumbo, con Farmacia Carol, bancos y cajeros." },
  },
  "blogPost/jumbo-punta-cana-guide": {
    en: { title:"Jumbo Punta Cana: Hypermarket Guide for Visitors",
          description:"Jumbo at Downtown Punta Cana on Avenida Barceló. What to buy — rum, coffee, chocolate, mamajuana kits — and how much you save on resort prices." },
    es: { title:"Jumbo Punta Cana: Guía del Hipermercado para Visitantes",
          description:"Jumbo en Downtown Punta Cana, Avenida Barceló. Qué comprar — ron, café, chocolate, kits de mamajuana — y cuánto ahorras frente al resort." },
  },
  "blogPost/supermercados-bravo-punta-cana": {
    en: { title:"Supermercados Bravo Punta Cana: Hours & Location",
          description:"Bravo opened on Avenida Barceló opposite Downtown in December 2025. Open 6AM to midnight Mon–Sat, closed Sundays — the area's longest hours." },
    es: { title:"Supermercados Bravo Punta Cana: Horarios y Ubicación",
          description:"Bravo abrió en la Avenida Barceló frente a Downtown en diciembre de 2025. Abierto de 6AM a medianoche lun–sáb, cerrado los domingos." },
  },
  "blogPost/bluemall-punta-cana-guide": {
    en: { title:"BlueMall Punta Cana: Hours, Stores & Is It Worth It?",
          description:"BlueMall Puntacana: open 10AM–9PM Mon–Sat, 2km from PUJ, free parking. Zara, luxury brands, cinema — and when to go somewhere else instead." },
    es: { title:"BlueMall Punta Cana: Horarios, Tiendas y Si Vale la Pena",
          description:"BlueMall Puntacana: abierto 10AM–9PM lun–sáb, a 2km del PUJ, estacionamiento gratis. Zara, marcas de lujo, cine — y cuándo ir a otro lado." },
  },
  "blogPost/nacional-vs-jumbo-vs-bravo-punta-cana": {
    en: { title:"Nacional vs Jumbo vs Bravo: Which Punta Cana Supermarket",
          description:"Jumbo and Nacional are CCN sister brands; Bravo is the independent, open 6AM–midnight but closed Sundays. Which to pick, and what you'll pay." },
    es: { title:"Nacional vs Jumbo vs Bravo: Qué Supermercado en Punta Cana",
          description:"Jumbo y Nacional son marcas hermanas de CCN; Bravo es la independiente, abierta de 6AM a medianoche y cerrada los domingos. Cuál elegir." },
  },
  "blogPost/farmacia-carol-punta-cana": {
    en: { title:"Farmacia Carol Punta Cana: Locations, Hours & Advice",
          description:"Farmacia Carol at Downtown Mall, BlueMall and San Juan, with 24-hour branches and delivery. Medication name differences and ear-care for divers." },
    es: { title:"Farmacia Carol Punta Cana: Sucursales, Horarios y Consejos",
          description:"Farmacia Carol en Downtown Mall, BlueMall y San Juan, con sucursales 24 horas y entrega. Nombres de medicamentos y cuidado del oído para buzos." },
  },
}

// Dive sites: cardDescription doubles as the meta description.
const CARDS = {
  "anchor": {
    en:"A healthy reef where the Monica's anchor chain still rests across the coral. A great step up for Open Water divers and a natural pairing with the wreck.",
    es:"Un arrecife saludable donde la cadena del ancla del Monica descansa sobre el coral. Un buen paso adelante para buceadores Open Water.",
    de:"Ein gesundes Riff, auf dem noch die Ankerkette der Monica über den Korallen liegt. Ein guter nächster Schritt für Open Water Taucher." },
  "atlantic-princess-bayahibe": {
    en:"A former cruise ship, now one of the best first wreck dives in the DR — shallow, full of character and covered in coral. On our Bayahibe trips.",
    es:"Un antiguo crucero turístico, hoy una de las mejores primeras inmersiones en pecios de la RD: poco profundo y lleno de vida. En nuestros viajes a Bayahibe.",
    de:"Ein ehemaliges Ausflugsschiff, heute einer der besten ersten Wracktauchgänge der DomRep — flach und charaktervoll. Teil unserer Bayahibe-Ausflüge." },
  "cuevitas": {
    en:"Sunlit swim-throughs and small caves, no overhead training needed. Watch for lobster and cleaner shrimp as sunbeams cut through the rock.",
    es:"Pasadizos iluminados y pequeñas cuevas, sin formación en espacios cerrados. Busca langostas y camarones limpiadores entre las grietas.",
    de:"Sonnendurchflutete Durchschwimmbereiche und kleine Höhlen, ohne Höhlenausbildung. Achte auf Langusten und Putzergarnelen in den Spalten." },
  "el-nino": {
    en:"One of our favourite first-ocean-dive sites: shallow, calm and clear, with vibrant schools of tropical fish. Ideal after a Discover Scuba session.",
    es:"Uno de nuestros sitios favoritos para la primera inmersión en el mar: poco profundo, tranquilo y claro, con cardúmenes de peces tropicales.",
    de:"Einer unserer liebsten Plätze für den ersten Tauchgang im Meer: flach, ruhig und klar, mit lebhaften Schwärmen tropischer Fische." },
  "finger-coral-plantation": {
    en:"Home to our coral nursery, where young fragments grow before being transplanted onto the reef. Shallow and easy, with yellowtail snappers everywhere.",
    es:"Hogar de nuestro vivero de coral, donde los fragmentos crecen antes de trasplantarse al arrecife. Poco profundo y fácil, con rabirrubias por doquier.",
    de:"Hier liegt unsere Korallenaufzucht, in der junge Fragmente heranwachsen, bevor sie ins Riff verpflanzt werden. Flach und einfach." },
  "park-reef": {
    en:"A calm, easy dive over coral-covered rock, reliably clear even when conditions elsewhere aren't. One of the best sites for turtles, lobster and squid.",
    es:"Una inmersión tranquila sobre formaciones cubiertas de coral, clara incluso cuando otros sitios no lo están. Ideal para ver tortugas y langostas.",
    de:"Ein ruhiger, einfacher Tauchgang über korallenbewachsene Felsen, zuverlässig klar. Einer der besten Plätze für Schildkröten und Langusten." },
  "rock-city": {
    en:"Natural canyons in the reef feel like flying down underwater streets, walls covered in hard corals and sponges. A superb drift dive when conditions allow.",
    es:"Cañones naturales en el arrecife, como volar por calles submarinas entre corales duros y esponjas. Gran inmersión de deriva si las condiciones acompañan.",
    de:"Natürliche Canyons im Riff, durch die man wie durch Unterwasserstraßen gleitet. Bei passenden Bedingungen ein hervorragender Strömungstauchgang." },
  "shark-point": {
    en:"An expansive coral garden on pristine deep reef and a prime spot for nurse and reef sharks — no cage, no bait. Needs Advanced Open Water or 20+ dives.",
    es:"Un extenso jardín de coral sobre arrecife profundo y un lugar privilegiado para tiburones nodriza y de arrecife, sin jaula. Requiere Advanced Open Water.",
    de:"Ein weitläufiger Korallengarten auf unberührtem Tiefriff und Top-Platz für Ammen- und Riffhaie — ohne Käfig. Erfordert Advanced Open Water." },
  "st-george-wreck-bayahibe": {
    en:"A 73 m Scottish-built cargo ship sunk as an artificial reef, now home to barracuda, morays and groupers. A deep highlight of our Bayahibe day trips.",
    es:"Un carguero de 73 m construido en Escocia, hundido como arrecife artificial. Hoy hogar de barracudas, morenas y meros. En nuestros viajes a Bayahibe.",
    de:"Ein 73 m langer, in Schottland gebauter Frachter, als künstliches Riff versenkt. Heute Heimat von Barrakudas, Muränen und Zackenbarschen." },
  "submarine": {
    en:"A Russian tourist submarine that sank off Cabeza de Toro in 1998 — one of Punta Cana's most unusual artificial reefs. Shallow, bright and beginner-friendly.",
    es:"Un submarino turístico ruso que se hundió frente a Cabeza de Toro en 1998, hoy uno de los arrecifes artificiales más singulares de Punta Cana.",
    de:"Ein russisches Ausflugs-U-Boot, das 1998 vor Cabeza de Toro sank — heute eines der ungewöhnlichsten künstlichen Riffe in Punta Cana." },
  "the-wall-catalina": {
    en:"A spectacular drop-off, arguably the best dive site in the DR. A coral-covered wall teeming with life, and the signature dive of our Catalina day trip.",
    es:"Una espectacular pared vertical, quizá el mejor sitio de buceo de la RD. Un muro cubierto de coral y la inmersión emblemática de nuestra excursión.",
    de:"Ein spektakulärer Steilabfall, wohl der beste Tauchplatz der DomRep. Eine korallenbewachsene Wand und der Höhepunkt unseres Catalina-Ausflugs." },
  "wreck-monica": {
    en:"An 1880s French cargo ship that once carried materials for the Panama Canal. Propeller, engine and boiler are still visible — an easy first wreck dive.",
    es:"Un carguero francés de 1880 que transportaba materiales para el Canal de Panamá. Hélice, motor y caldera aún visibles. Uno de los pecios más fáciles.",
    de:"Ein französischer Frachter aus den 1880er-Jahren, der Material für den Panamakanal transportierte. Propeller, Maschine und Kessel sind noch sichtbar." },
}

const docs = await c.fetch(`*[!(_id in path("drafts.**")) && _type in ["individualCourse","trips","blogPost","diveSite"]]{_id,_type,"slug":slug.current,seo,cardDescription}`)
const byKey = new Map(docs.map(d => [`${d._type}/${d.slug}`, d]))
const bySlug = new Map(docs.filter(d => d._type === "diveSite").map(d => [d.slug, d]))

let bad = 0, n = 0
const tx = c.transaction()

function patchMeta(key, locs, titleOnly) {
  const d = byKey.get(key)
  if (!d) { console.log(`  ! not found: ${key}`); bad++; return }
  const seo = JSON.parse(JSON.stringify(d.seo))
  for (const [loc, value] of Object.entries(locs)) {
    const title = titleOnly ? value : value.title
    const description = titleOnly ? undefined : value.description
    if (title && title.length > T_MAX) { console.log(`  ! OVER ${key}[${loc}] T:${title.length}`); bad++; continue }
    if (description && description.length > D_MAX) { console.log(`  ! OVER ${key}[${loc}] D:${description.length}`); bad++; continue }
    const before = seo.meta[loc] ?? {}
    seo.meta[loc] = { ...before, ...(title ? { title } : {}), ...(description ? { description } : {}) }
    const parts = []
    if (title) parts.push(`T ${String((before.title||"").length).padStart(3)}->${String(title.length).padStart(2)}`)
    if (description) parts.push(`D ${String((before.description||"").length).padStart(3)}->${String(description.length).padStart(3)}`)
    console.log(`  ${key} [${loc}]  ${parts.join("  ")}`)
    n++
  }
  tx.patch(d._id, { set: { seo } })
}

for (const [key, locs] of Object.entries(TITLES)) patchMeta(key, locs, true)
for (const [key, locs] of Object.entries(META)) patchMeta(key, locs, false)

for (const [slug, locs] of Object.entries(CARDS)) {
  const d = bySlug.get(slug)
  if (!d) { console.log(`  ! diveSite not found: ${slug}`); bad++; continue }
  const card = JSON.parse(JSON.stringify(d.cardDescription ?? {}))
  for (const [loc, text] of Object.entries(locs)) {
    if (text.length > D_MAX) { console.log(`  ! OVER diveSite/${slug}[${loc}] ${text.length}`); bad++; continue }
    console.log(`  diveSite/${slug} [${loc}]  ${String((card[loc]||"").length).padStart(3)}->${String(text.length).padStart(3)}`)
    card[loc] = text
    n++
  }
  tx.patch(d._id, { set: { cardDescription: card } })
}

console.log(`\n${n} value(s) rewritten, ${bad} rejected`)
if (bad) { console.error("Refusing to write while any entry is over the limit."); process.exit(1) }
if (!write) { console.log("Dry run. Re-run with --write."); process.exit(0) }
await tx.commit()
console.log("Committed.")
