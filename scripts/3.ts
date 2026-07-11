import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.",
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
})

const CATEGORIES = {
  marineLife: "3c7be8b3-9aa6-438f-922a-c6877c1690c6",
  conservationOceanAwareness: "4968fc1f-2aad-455f-ab27-7b8572964807",
  travelTips: "952488d1-a4c5-4ac3-bc90-1d1d3894114e",
  divingTips: "987ef65e-2c28-41f6-ab58-d5c17fbfb728",
  localBusinesses: "ea82f5b2-4abe-4c36-8684-d2a3aac6e2c4",
} as const

const posts = [
  {
    _type: "blogPost",

    title: {
      _type: "localizedString",
      en: "🛟 Are Punta Cana Dive Sites Safe for Tourists? An Honest Assessment",
      es: "🛟 ¿Son Seguros los Sitios de Buceo en Punta Cana para Turistas? Una Evaluación Honesta",
    },

    slug: {
      _type: "slug",
      current: "punta-cana-dive-sites-safety",
    },

    publishDate: "2026-07-04",

    description: {
      _type: "localizedText",
      en: "How safe is scuba diving in Punta Cana, really? Recreational dive safety statistics, what makes a site safe, marine life risks (very few), emergency response infrastructure, and how Grand Bay evaluates conditions daily.",
      es: "¿Qué tan seguro es realmente bucear en Punta Cana? Estadísticas de seguridad del buceo recreativo, qué hace seguro a un sitio, riesgos de vida marina (muy pocos), infraestructura de respuesta a emergencias, y cómo Grand Bay evalúa las condiciones a diario.",
    },

    blogCategory: {
      _type: "reference",
      _ref: CATEGORIES.divingTips,
    },

    backgroundImages: [],

    blogBody: {
      _type: "localizedBlock",
      en: [
        {
          _type: "block",
          _key: "en-b1",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b1-s1", text: "Short answer: yes. Scuba diving in Punta Cana is safe by any reasonable measure — the dive sites are well-established, the water conditions are consistently mild, marine life risks are minimal, and reputable local operators run tight safety practices. This is true for both certified divers on guided dives and first-timers doing Discover Scuba Diving experiences. That said, \"safe\" doesn't mean \"risk-free,\" and understanding what actually makes a dive site safe (and what could make it unsafe) matters more than a blanket reassurance. This post walks through recreational diving safety generally, what makes Punta Cana's specific sites well-suited to tourism diving, the small marine life risks that do exist, emergency response infrastructure in the Dominican Republic, and how our team evaluates conditions on any given day.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "How Safe Is Recreational Diving in General?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b3-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "Recreational scuba diving has a strong safety record compared to most adventure sports. According to data compiled by ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "Divers Alert Network", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: " in their annual diving reports, fatal accident rates in recreational diving are consistently low — roughly on par with recreational cycling and safer than activities like motorcycling or skiing. The overwhelming majority of dive fatalities involve pre-existing medical conditions (particularly cardiovascular disease), out-of-air incidents from poor gas management, or diving well beyond a diver's certification or experience. For a certified diver on a guided recreational dive at appropriate depths, the actual risk profile is genuinely low.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "For Discover Scuba Diving participants (first-time divers with no certification), the risk profile is different but also low — DSD dives happen at shallower depths (12 meters maximum), under direct instructor supervision, with the guide managing everything except the diver's own breathing and basic movement. This is why DSD is a legitimate way for hesitant travelers to try the sport before committing to certification, not a corner-cut version of certified diving.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "What Makes Punta Cana's Sites Well-Suited for Tourism Diving", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "A few characteristics of the Punta Cana dive environment make it particularly forgiving for recreational divers. Water temperatures stay 26 to 29°C year-round, so thermal stress isn't a factor. Currents are typically mild on the reef sites we dive most often, so drift-diving skills aren't required. Depths are moderate — most reef sites in the 12 to 18 meter range, deeper sites at 25 to 30 meters, well within recreational limits. Visibility is generally 15 to 25 meters, which is enough to see your buddy and the reef structure without disorientation. The bottom topography is mostly reef and sand rather than complex overhead environments; there are no cave dives at recreational operations here, no cavern penetrations, no dark chambers.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "The combination of warm water, moderate depth, mild current, and clear visibility means the same dive site can accommodate a new Open Water diver on their first Caribbean trip and an experienced diver on their thousandth dive equally well. Some destinations require serious technical training or specific specialty skills to dive safely; Punta Cana doesn't.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "Weather and Sea Conditions", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "The variable that changes day-to-day safety more than anything else is weather. Punta Cana has a tropical climate with generally calm conditions, but strong winds, storms, and heavy rain events can make specific sites temporarily unsafe by creating rough surface conditions, poor visibility from stirred-up sediment, or unusual currents. Hurricane season (June through November, with peak risk August through October) occasionally brings systems close enough to affect diving even without a direct hit. This is why weather cancellations exist — reputable operators will decline to run a dive if conditions aren't safe rather than push through and hope.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "At Grand Bay, we monitor sea conditions and weather forecasts starting 48 hours out for any booked day. If forecasts look marginal, we reach out to divers proactively about likely rescheduling. On the morning of a dive, we make a final call based on actual conditions — sometimes a day that looked marginal turns out fine, and occasionally a day that looked good turns out to have overnight-developed conditions that push us to reschedule. The judgment call rests with the guide who's actually looking at the sea, not with a booking algorithm.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "Marine Life Risks (There Aren't Many)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b12-l1", href: "https://www.grandbay-puntacana.com/shark-dive-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "One question that comes up more than it should: what about the marine life? The reality of Caribbean reef diving is that dangerous marine life encounters are extremely rare and almost always the result of the diver initiating contact. Sharks in Punta Cana waters — including the ", marks: [] },
            { _type: "span", _key: "en-b12-s2", text: "nurse sharks and Caribbean reef sharks at Shark Point", marks: ["en-b12-l1"] },
            { _type: "span", _key: "en-b12-s3", text: " — are not aggressive toward divers. They're accustomed to the presence of humans on the reef and treat divers as neither prey nor threat. Nurse sharks in particular are slow, docile, and generally uninterested in people.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "The marine life that can hurt you here does so mostly through defensive contact when disturbed. Moray eels are docile if left alone but can bite if a hand is stuck in their crevice. Lionfish carry venomous spines that cause painful stings if brushed against. Sea urchins have spines that can pierce a wetsuit. Fire coral causes a stinging rash on contact. Scorpionfish are camouflaged and can be stepped on inadvertently in shallow water. All of these are avoided by the same basic rule: look but don't touch, and keep your hands and feet away from the reef.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "Punta Cana doesn't have a persistent jellyfish problem the way some Caribbean destinations occasionally do — box jellyfish and Portuguese man-of-war are rare here. Barracuda, which look intimidating, are essentially harmless to divers as long as you don't wear shiny jewelry (which they can mistake for prey fish). We haven't had a serious marine life incident in our operation.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Emergency Response Infrastructure", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "One thing that matters when evaluating dive destination safety is what the emergency response looks like if something does go wrong. The Dominican Republic has hyperbaric (recompression) chamber facilities in Santo Domingo, about a 2 to 3 hour drive west of Punta Cana. In a suspected decompression sickness (DCS) case, the standard protocol is stabilization on-site with 100% oxygen, evacuation to Santo Domingo by ground or air ambulance, and treatment in the chamber. This is the same infrastructure available across most major Caribbean tourism destinations.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b17-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "For any diver traveling internationally, ", marks: [] },
            { _type: "span", _key: "en-b17-s2", text: "Divers Alert Network membership", marks: ["en-b17-l1"] },
            { _type: "span", _key: "en-b17-s3", text: " is worth considering. DAN offers a 24/7 dive medical emergency hotline, coordination of chamber referrals and evacuations, and dive-specific accident insurance that covers medical evacuation and hyperbaric treatment. Standard travel insurance often excludes diving-related incidents or has low sub-limits; DAN was built specifically for this. An annual membership runs $75 to $100 depending on the region and covers a lot for the money.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Grand Bay's Safety Practices", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "A few practical things we do that affect safety on any given dive. Group sizes are kept small — typically 6 to 8 divers per guide, not the 15 to 20 that some volume-oriented operations run. Small groups mean the guide can actually monitor each diver, respond quickly if someone needs help, and keep the group together underwater. Large groups spread out, lose divers to sight lines, and dilute the guide's attention.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "Every dive gets a full pre-dive briefing covering the specific site, expected conditions, the dive plan (depth, time, direction, exit strategy), buddy assignments, hand signals review, and emergency procedures. This isn't optional and it isn't a formality — it's how the dive team makes sure everyone's on the same page before descent. Standard emergency signaling protocols, buddy checks, and reserve air pressure targets get confirmed on every trip.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "Boats carry a fully-stocked oxygen kit, a first aid kit, a marine radio for emergency communication, and life vests for surface flotation. Gear gets inspected before every trip and serviced on manufacturer-recommended schedules — not just when something visibly breaks. The captain remains on the boat during dives, watching for surfacing divers and monitoring surface conditions.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "The Diver's Side of Safety", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "Not every safety factor sits with the operator. Divers contribute to their own safety in real ways. Diving within your certification and experience level is the biggest one — a newly-certified Open Water diver shouldn't attempt sites at 30 meters, and a diver who hasn't dived in five years should do a refresher or scuba review before jumping into a full day of diving. Being honest on the medical form matters — undisclosed conditions are one of the leading contributing factors in dive fatalities. Following the pre-dive briefing, staying with your buddy, and monitoring your own air pressure are basic responsibilities that operators can't do for you.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "Physical readiness matters too. Being adequately rested, hydrated, and sober — no alcohol the night before or the morning of a dive — dramatically reduces DCS risk factors and improves your performance underwater. The most common preventable factor in dive incidents isn't equipment failure or environmental surprise; it's a diver who wasn't physically ready for the dive they signed up for.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "What Happens If Something Does Go Wrong", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "In an actual dive incident, the response is layered. First is the immediate on-site response — the guide manages the affected diver, provides oxygen if indicated, and coordinates ascent for the rest of the group. Second is on-boat stabilization — oxygen, hydration, monitoring while the boat returns to shore. Third is land-based emergency response — ambulance dispatch, hospital transport, and if DCS is suspected, coordination with the hyperbaric chamber in Santo Domingo. DAN's 24/7 hotline can be called at any point to coordinate specialist medical guidance in real time.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Serious incidents are rare in this environment, but the plan for them is written down and practiced. This is one of the things we ask when other divers ask us about choosing a local operator — does the shop have a written emergency response plan, and can they walk you through it if asked? Reputable operators everywhere should be able to.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "How Punta Cana Compares to Other Caribbean Destinations", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "For safety purposes, Punta Cana ranks similarly to the mainstream Caribbean tourism destinations — Cozumel, Cancún, Aruba, Grand Cayman. Water conditions are consistently mild, the tourism dive industry is mature, and there's established emergency infrastructure. It's a step less complex than destinations that require drift-diving skills (Cozumel's stronger currents) or specific technical training (wall dives with rapid depth drops). It's more established than emerging destinations that are just building their dive tourism infrastructure. For a certified recreational diver or first-time DSD participant, Punta Cana is genuinely one of the more forgiving places to dive in the Caribbean.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bA",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bA-s1", text: "The Buddy System and Its Role in Safety", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bB",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bB-s1", text: "One safety practice that gets less attention than it deserves in casual dive planning conversations is the buddy system. Every certified diver is trained to dive with a buddy — a second diver who monitors you as you monitor them, providing redundancy for equipment issues, air-sharing capability if one of you runs low unexpectedly, and a witness if anything unusual happens. On a guided dive, the guide functions as a safety monitor for the whole group, but buddy pairs still matter for the same reasons certification agencies teach them. Your buddy sees you if you're struggling before the guide might, and can help with a small equipment fix that doesn't warrant surfacing the whole group.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bC",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bC-s1", text: "For solo travelers who arrive without a buddy, the guide either pairs them with another compatible solo diver or takes on direct buddy responsibility. Either arrangement works well. The important thing is not to end up in the water without an established plan for who's watching out for whom. Ask before you get on the boat: \"who's my buddy?\" A reputable guide will have a clear answer ready. A rushed or disorganized operator might not have thought about it yet — which is itself a signal.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bD",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bD-s1", text: "Related to this: don't hesitate to signal any issue to your buddy or guide during a dive. Ear equalization problems, buoyancy trouble, mild anxiety, feeling cold, muscle cramping — all of these are things the guide can help address without incident if you signal early. What turns small issues into large ones is not signaling until the situation has already escalated. Every experienced dive professional would rather stop or turn around a dive than push through with a stressed or uncomfortable diver, and no one should feel embarrassed about calling a dive early for their own comfort or safety.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "The Bottom Line", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b31-l1", href: "https://www.grandbay-puntacana.com/courses" },
            { _type: "link", _key: "en-b31-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "Punta Cana is a safe destination for recreational diving, with mild conditions, moderate depths, low marine life risks, mature emergency response infrastructure, and reputable operators who prioritize safety through small groups, thorough briefings, and well-maintained equipment. Diver contribution matters too — accurate medical disclosure, appropriate certification level, adequate rest, and honest self-assessment before each dive make the biggest difference. If you have specific safety questions about a ", marks: [] },
            { _type: "span", _key: "en-b31-s2", text: "specific course or trip", marks: ["en-b31-l1"] },
            { _type: "span", _key: "en-b31-s3", text: " — group sizes, emergency protocols, insurance recommendations — message us on ", marks: [] },
            { _type: "span", _key: "en-b31-s4", text: "WhatsApp", marks: ["en-b31-l2"] },
            { _type: "span", _key: "en-b31-s5", text: " and we'll walk you through it.", marks: [] },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "es-b1",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b1-s1", text: "Respuesta corta: sí. El buceo scuba en Punta Cana es seguro bajo cualquier medida razonable — los sitios de buceo están bien establecidos, las condiciones del agua son consistentemente suaves, los riesgos de vida marina son mínimos y los operadores locales serios manejan prácticas de seguridad estrictas. Esto es cierto tanto para buzos certificados en inmersiones guiadas como para primerizos haciendo experiencias Discover Scuba Diving. Dicho eso, \"seguro\" no significa \"libre de riesgo\", y entender qué hace realmente seguro un sitio de buceo (y qué podría hacerlo inseguro) importa más que una reafirmación en blanco. Esta publicación recorre la seguridad del buceo recreativo en general, qué hace que los sitios específicos de Punta Cana sean idóneos para el buceo turístico, los pequeños riesgos de vida marina que sí existen, la infraestructura de respuesta a emergencias en la República Dominicana y cómo nuestro equipo evalúa las condiciones en cualquier día dado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "¿Qué Tan Seguro Es el Buceo Recreativo en General?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b3-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "El buceo scuba recreativo tiene un fuerte historial de seguridad comparado con la mayoría de los deportes de aventura. Según datos compilados por ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "Divers Alert Network", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: " en sus reportes anuales de buceo, las tasas de accidentes fatales en el buceo recreativo son consistentemente bajas — más o menos a la par con el ciclismo recreativo y más seguras que actividades como motociclismo o esquí. La abrumadora mayoría de las fatalidades de buceo involucran condiciones médicas preexistentes (particularmente enfermedad cardiovascular), incidentes por quedarse sin aire por mal manejo del gas, o bucear muy por encima de la certificación o experiencia del buzo. Para un buzo certificado en una inmersión guiada recreativa a profundidades apropiadas, el perfil real de riesgo es genuinamente bajo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "Para los participantes de Discover Scuba Diving (buzos primerizos sin certificación), el perfil de riesgo es diferente pero también bajo — las inmersiones DSD ocurren a profundidades más someras (máximo 12 metros), bajo supervisión directa del instructor, con el guía manejando todo excepto la propia respiración y movimiento básico del buzo. Por eso el DSD es una forma legítima para viajeros indecisos de probar el deporte antes de comprometerse a la certificación, no una versión con esquinas recortadas del buceo certificado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Qué Hace a los Sitios de Punta Cana Idóneos para el Buceo Turístico", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "Unas características del ambiente de buceo de Punta Cana lo hacen particularmente indulgente para los buzos recreativos. Las temperaturas del agua se mantienen de 26 a 29°C todo el año, así que el estrés térmico no es un factor. Las corrientes son típicamente suaves en los sitios de arrecife que buceamos más frecuentemente, así que no se requieren habilidades de buceo a la deriva. Las profundidades son moderadas — la mayoría de los sitios de arrecife en el rango de 12 a 18 metros, los sitios más profundos a 25 a 30 metros, bien dentro de los límites recreativos. La visibilidad generalmente es de 15 a 25 metros, lo que es suficiente para ver a tu compañero y la estructura del arrecife sin desorientación. La topografía del fondo es principalmente arrecife y arena en lugar de ambientes complejos con techo; no hay inmersiones en cuevas en las operaciones recreativas aquí, no hay penetraciones de caverna, no hay cámaras oscuras.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "La combinación de agua cálida, profundidad moderada, corriente suave y visibilidad clara significa que el mismo sitio de buceo puede acomodar igualmente bien a un nuevo buzo Open Water en su primer viaje al Caribe y a un buzo experimentado en su inmersión número mil. Algunos destinos requieren entrenamiento técnico serio o habilidades específicas de especialidad para bucear con seguridad; Punta Cana no.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Clima y Condiciones del Mar", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "La variable que cambia la seguridad diaria más que cualquier otra es el clima. Punta Cana tiene un clima tropical con condiciones generalmente calmadas, pero vientos fuertes, tormentas y eventos de lluvia intensa pueden hacer sitios específicos temporalmente inseguros al crear condiciones de superficie bravas, mala visibilidad por sedimento removido o corrientes inusuales. La temporada de huracanes (de junio a noviembre, con riesgo pico de agosto a octubre) ocasionalmente trae sistemas lo bastante cerca para afectar el buceo incluso sin un impacto directo. Por eso existen las cancelaciones por clima — los operadores serios se negarán a operar una inmersión si las condiciones no son seguras en lugar de forzarlo y esperar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "En Grand Bay, monitoreamos las condiciones del mar y los pronósticos del clima empezando 48 horas antes de cualquier día reservado. Si los pronósticos se ven marginales, contactamos a los buzos proactivamente sobre posibles reprogramaciones. La mañana de una inmersión, tomamos la decisión final basada en las condiciones reales — a veces un día que se veía marginal resulta bien, y ocasionalmente un día que se veía bien resulta tener condiciones desarrolladas durante la noche que nos empujan a reprogramar. El criterio recae en el guía que realmente está viendo el mar, no en un algoritmo de reservas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Riesgos de Vida Marina (No Hay Muchos)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b12-l1", href: "https://www.grandbay-puntacana.com/es/shark-dive-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "Una pregunta que sale más de lo debido: ¿qué pasa con la vida marina? La realidad del buceo de arrecife caribeño es que los encuentros con vida marina peligrosa son extremadamente raros y casi siempre resultado del buzo iniciando el contacto. Los tiburones en aguas de Punta Cana — incluyendo los ", marks: [] },
            { _type: "span", _key: "es-b12-s2", text: "tiburones nodriza y tiburones de arrecife caribeño en Shark Point", marks: ["es-b12-l1"] },
            { _type: "span", _key: "es-b12-s3", text: " — no son agresivos hacia los buzos. Están acostumbrados a la presencia de humanos en el arrecife y tratan a los buzos como ni presa ni amenaza. Los tiburones nodriza en particular son lentos, dóciles y generalmente sin interés en las personas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "La vida marina que sí puede hacerte daño aquí lo hace principalmente a través de contacto defensivo cuando se le molesta. Las morenas son dóciles si las dejas en paz pero pueden morder si una mano se mete en su grieta. Los peces león cargan espinas venenosas que causan piquetes dolorosos si se rozan. Los erizos de mar tienen espinas que pueden perforar un wetsuit. El coral fuego causa erupción urticante al contacto. Los peces escorpión están camuflados y pueden ser pisados inadvertidamente en agua somera. Todos estos se evitan con la misma regla básica: mira pero no toques, y mantén las manos y los pies lejos del arrecife.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Punta Cana no tiene un problema persistente de medusas como algunos destinos caribeños ocasionalmente tienen — las medusas caja y la fragata portuguesa son raras aquí. Las barracudas, que se ven intimidantes, son esencialmente inofensivas para los buzos siempre que no uses joyas brillantes (que pueden confundir con peces presa). No hemos tenido un incidente serio de vida marina en nuestra operación.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Infraestructura de Respuesta a Emergencias", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Una cosa que importa al evaluar la seguridad de un destino de buceo es cómo se ve la respuesta a emergencias si algo sí sale mal. La República Dominicana tiene instalaciones de cámara hiperbárica (de recompresión) en Santo Domingo, a unas 2 o 3 horas en auto al oeste de Punta Cana. En un caso sospechoso de enfermedad por descompresión (EDC), el protocolo estándar es estabilización en sitio con oxígeno al 100%, evacuación a Santo Domingo por ambulancia terrestre o aérea, y tratamiento en la cámara. Esta es la misma infraestructura disponible en la mayoría de los destinos turísticos importantes del Caribe.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b17-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Para cualquier buzo viajando internacionalmente, vale la pena considerar la ", marks: [] },
            { _type: "span", _key: "es-b17-s2", text: "membresía en Divers Alert Network", marks: ["es-b17-l1"] },
            { _type: "span", _key: "es-b17-s3", text: ". DAN ofrece una línea de emergencia médica de buceo 24/7, coordinación de referencias a cámara y evacuaciones, y seguro específico para accidentes de buceo que cubre evacuación médica y tratamiento hiperbárico. El seguro de viaje estándar a menudo excluye incidentes relacionados con buceo o tiene sublímites bajos; DAN fue construido específicamente para esto. Una membresía anual va de $75 a $100 según la región y cubre mucho por el dinero.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Prácticas de Seguridad de Grand Bay", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Unas cosas prácticas que hacemos que afectan la seguridad en cualquier inmersión. Los tamaños de grupo se mantienen pequeños — típicamente 6 a 8 buzos por guía, no los 15 a 20 que algunas operaciones orientadas al volumen manejan. Los grupos pequeños significan que el guía puede realmente monitorear a cada buzo, responder rápido si alguien necesita ayuda y mantener al grupo junto bajo el agua. Los grupos grandes se dispersan, pierden buzos de la línea de vista y diluyen la atención del guía.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Cada inmersión recibe un briefing pre-inmersión completo cubriendo el sitio específico, condiciones esperadas, el plan de inmersión (profundidad, tiempo, dirección, estrategia de salida), asignaciones de compañero, repaso de señales manuales y procedimientos de emergencia. Esto no es opcional y no es una formalidad — es cómo el equipo de buceo se asegura de que todos estén en la misma página antes del descenso. Los protocolos estándar de señalización de emergencia, verificaciones de compañero y objetivos de presión de aire de reserva se confirman en cada salida.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "Los botes cargan un kit de oxígeno totalmente equipado, un kit de primeros auxilios, una radio marina para comunicación de emergencia y chalecos salvavidas para flotación en superficie. El equipo se inspecciona antes de cada salida y recibe servicio según los cronogramas recomendados por el fabricante — no solo cuando algo se rompe visiblemente. El capitán permanece en el bote durante las inmersiones, atento a buzos que suben y monitoreando las condiciones de superficie.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "El Lado del Buzo en la Seguridad", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "No todo factor de seguridad recae en el operador. Los buzos contribuyen a su propia seguridad de formas reales. Bucear dentro de tu certificación y nivel de experiencia es el más grande — un buzo Open Water recién certificado no debería intentar sitios a 30 metros, y un buzo que no ha buceado en cinco años debería hacer un refrescamiento o repaso de scuba antes de saltar a un día completo de buceo. Ser honesto en el formulario médico importa — las condiciones no divulgadas son uno de los principales factores contribuyentes en las fatalidades de buceo. Seguir el briefing pre-inmersión, quedarte con tu compañero y monitorear tu propia presión de aire son responsabilidades básicas que los operadores no pueden hacer por ti.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "La disposición física también importa. Estar adecuadamente descansado, hidratado y sobrio — sin alcohol la noche anterior o la mañana de una inmersión — reduce dramáticamente los factores de riesgo de EDC y mejora tu desempeño bajo el agua. El factor prevenible más común en los incidentes de buceo no es fallo del equipo o sorpresa ambiental; es un buzo que no estaba físicamente listo para la inmersión que reservó.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "Qué Pasa Si Algo Sí Sale Mal", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "En un incidente real de buceo, la respuesta es en capas. Primero es la respuesta inmediata en sitio — el guía maneja al buzo afectado, provee oxígeno si está indicado y coordina el ascenso del resto del grupo. Segundo es la estabilización en bote — oxígeno, hidratación, monitoreo mientras el bote regresa a tierra. Tercero es la respuesta de emergencia en tierra — despacho de ambulancia, transporte al hospital, y si se sospecha EDC, coordinación con la cámara hiperbárica en Santo Domingo. La línea 24/7 de DAN puede ser llamada en cualquier punto para coordinar guía médica especializada en tiempo real.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Los incidentes serios son raros en este ambiente, pero el plan para ellos está escrito y practicado. Esta es una de las cosas que preguntamos cuando otros buzos nos preguntan sobre elegir un operador local — ¿tiene la tienda un plan de respuesta a emergencias por escrito, y pueden recorrerlo contigo si se les pide? Los operadores serios en todos lados deberían poder.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "Cómo Se Compara Punta Cana con Otros Destinos Caribeños", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "Para efectos de seguridad, Punta Cana se ubica similar a los destinos turísticos caribeños principales — Cozumel, Cancún, Aruba, Gran Caimán. Las condiciones del agua son consistentemente suaves, la industria del buceo turístico es madura, y hay infraestructura de emergencia establecida. Es un paso menos compleja que destinos que requieren habilidades de buceo a la deriva (las corrientes más fuertes de Cozumel) o entrenamiento técnico específico (inmersiones de pared con caídas rápidas de profundidad). Es más establecida que destinos emergentes que apenas están construyendo su infraestructura de buceo turístico. Para un buzo recreativo certificado o un participante primerizo de DSD, Punta Cana es genuinamente uno de los lugares más indulgentes para bucear en el Caribe.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bA",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bA-s1", text: "El Sistema de Compañero y Su Rol en la Seguridad", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bB",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bB-s1", text: "Una práctica de seguridad que recibe menos atención de la que merece en conversaciones casuales de planeación de buceo es el sistema de compañero. Todo buzo certificado está entrenado para bucear con un compañero — un segundo buzo que te monitorea mientras tú lo monitoreas, proveyendo redundancia para problemas de equipo, capacidad de compartir aire si alguno de los dos se queda bajo inesperadamente, y un testigo si pasa algo inusual. En una inmersión guiada, el guía funciona como monitor de seguridad para todo el grupo, pero los pares de compañeros aún importan por las mismas razones que las agencias de certificación los enseñan. Tu compañero te ve si estás batallando antes que el guía tal vez, y puede ayudar con un arreglo pequeño de equipo que no amerita hacer subir a todo el grupo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bC",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bC-s1", text: "Para viajeros solos que llegan sin compañero, el guía o los empareja con otro buzo solo compatible o asume responsabilidad directa de compañero. Cualquiera de los dos arreglos funciona bien. Lo importante es no terminar en el agua sin un plan establecido de quién está cuidando a quién. Pregunta antes de subir al bote: \"¿quién es mi compañero?\" Un guía serio tendrá una respuesta clara lista. Un operador apurado o desorganizado podría no haberlo pensado todavía — lo cual es en sí una señal.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bD",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bD-s1", text: "Relacionado a esto: no dudes en señalar cualquier problema a tu compañero o guía durante una inmersión. Problemas de compensación de oídos, dificultades de flotabilidad, ansiedad leve, sentir frío, calambres musculares — todos estos son cosas que el guía puede ayudar a abordar sin incidente si señalas temprano. Lo que convierte problemas pequeños en grandes es no señalar hasta que la situación ya escaló. Todo profesional de buceo experimentado preferiría parar o dar vuelta a una inmersión antes que forzar el paso con un buzo estresado o incómodo, y nadie debería sentir vergüenza por terminar una inmersión temprano por su propia comodidad o seguridad.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b31-l1", href: "https://www.grandbay-puntacana.com/es/courses" },
            { _type: "link", _key: "es-b31-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "Punta Cana es un destino seguro para el buceo recreativo, con condiciones suaves, profundidades moderadas, riesgos bajos de vida marina, infraestructura madura de respuesta a emergencias y operadores serios que priorizan la seguridad a través de grupos pequeños, briefings exhaustivos y equipo bien mantenido. La contribución del buzo también importa — divulgación médica precisa, nivel de certificación apropiado, descanso adecuado y autoevaluación honesta antes de cada inmersión hacen la diferencia más grande. Si tienes preguntas específicas de seguridad sobre un ", marks: [] },
            { _type: "span", _key: "es-b31-s2", text: "curso o viaje específico", marks: ["es-b31-l1"] },
            { _type: "span", _key: "es-b31-s3", text: " — tamaños de grupo, protocolos de emergencia, recomendaciones de seguro — escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b31-s4", text: "WhatsApp", marks: ["es-b31-l2"] },
            { _type: "span", _key: "es-b31-s5", text: " y te lo recorremos.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "Are Punta Cana Dive Sites Safe for Tourists? Honest Assessment (2026)",
          description:
            "Recreational dive safety statistics, what makes a dive site safe, marine life risks in Punta Cana (very few), emergency response infrastructure including hyperbaric chamber access, and how Grand Bay handles safety daily.",
          keywords: ["punta cana diving safety", "is scuba diving safe punta cana", "dive site safety dominican republic", "recreational diving risk", "punta cana shark safety"],
        },
        es: {
          title: "¿Son Seguros los Sitios de Buceo en Punta Cana? Evaluación Honesta (2026)",
          description:
            "Estadísticas de seguridad del buceo recreativo, qué hace seguro un sitio, riesgos de vida marina en Punta Cana (muy pocos), infraestructura de respuesta a emergencias incluyendo acceso a cámara hiperbárica.",
          keywords: ["seguridad buceo punta cana", "es seguro bucear punta cana", "seguridad sitio buceo republica dominicana", "riesgo buceo recreativo"],
        },
      },
      openGraph: {
        en: {
          title: "Are Punta Cana Dive Sites Safe for Tourists?",
          description: "Yes — with context. What makes Punta Cana's sites well-suited for tourism diving, the small marine life risks, emergency response infrastructure, and how Grand Bay evaluates conditions daily.",
        },
        es: {
          title: "¿Son Seguros los Sitios de Buceo en Punta Cana para Turistas?",
          description: "Sí — con contexto. Qué hace idóneos los sitios de Punta Cana para el buceo turístico, los pequeños riesgos de vida marina, la infraestructura de emergencia y cómo Grand Bay evalúa condiciones a diario.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Are Punta Cana Dive Sites Safe for Tourists? An Honest Assessment",
          description: "A comprehensive assessment of scuba diving safety in Punta Cana, Dominican Republic. Covers recreational diving safety statistics from Divers Alert Network, what makes Punta Cana dive sites well-suited for tourism (mild currents, moderate depths, warm water, clear visibility, no overhead environments), weather and sea condition management, marine life risks (nurse sharks non-aggressive, moray/lionfish/urchin/fire coral avoidance rule), emergency response infrastructure including hyperbaric chamber in Santo Domingo, DAN membership benefits, Grand Bay's safety practices (small groups 6-8 divers, thorough briefings, boat safety equipment), diver responsibilities (medical honesty, appropriate certification level, rest and sobriety), incident response protocols, and comparison to other Caribbean destinations.",
          datePublished: "2026-07-04",
          inLanguage: "en",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/punta-cana-dive-sites-safety",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "¿Son Seguros los Sitios de Buceo en Punta Cana para Turistas? Una Evaluación Honesta",
          description: "Una evaluación integral de la seguridad del buceo scuba en Punta Cana, República Dominicana. Cubre estadísticas de seguridad del buceo recreativo de Divers Alert Network, qué hace idóneos los sitios de Punta Cana para el turismo (corrientes suaves, profundidades moderadas, agua cálida, visibilidad clara, sin ambientes con techo), manejo de clima y condiciones del mar, riesgos de vida marina (tiburones nodriza no agresivos, regla de evitar morena/pez león/erizo/coral fuego), infraestructura de respuesta a emergencias incluyendo cámara hiperbárica en Santo Domingo, beneficios de la membresía DAN, prácticas de seguridad de Grand Bay (grupos pequeños de 6-8 buzos, briefings exhaustivos, equipo de seguridad en bote), responsabilidades del buzo (honestidad médica, nivel de certificación apropiado, descanso y sobriedad), protocolos de respuesta a incidentes, y comparación con otros destinos caribeños.",
          datePublished: "2026-07-04",
          inLanguage: "es",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/punta-cana-dive-sites-safety",
          },
        }),
      },
      noIndex: false,
      noFollow: false,
    },
  },
] as const

async function main() {
  let created = 0
  let skipped = 0

  for (const post of posts) {
    const slug = post.slug.current

    const existingId = await client.fetch<string | null>(
      `*[_type == "blogPost" && slug.current == $slug][0]._id`,
      { slug },
    )

    if (existingId) {
      console.log(`[skip] "${slug}" — already exists as ${existingId}`)
      skipped++
      continue
    }

    const result = await client.create(post)
    console.log(`[created] ${result._id} — ${slug}`)
    created++
  }

  console.log(`\nDone. created=${created} skipped=${skipped}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})