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
      en: "🌡️ What's the Water Temperature for Diving in Punta Cana? A Month-by-Month Guide",
      es: "🌡️ ¿Cuál es la Temperatura del Agua para Bucear en Punta Cana? Guía Mes a Mes",
    },

    slug: {
      _type: "slug",
      current: "water-temperature-scuba-diving-punta-cana",
    },

    publishDate: "2026-07-04",

    description: {
      _type: "localizedText",
      en: "Punta Cana water temperatures run 26–29°C (78–84°F) year-round. Here's the month-by-month breakdown, what wetsuit to wear, and why depth barely changes the temperature at recreational dive sites.",
      es: "La temperatura del agua en Punta Cana ronda los 26–29°C (78–84°F) todo el año. Aquí el desglose mes a mes, qué wetsuit usar y por qué la profundidad casi no cambia la temperatura en los sitios recreativos.",
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
            { _type: "span", _key: "en-b1-s1", text: "Short answer: water temperatures in Punta Cana stay between 26 and 29°C (78 to 84°F) all year, with the coolest months in February and March and the warmest in August and September. That's warm enough to dive comfortably in a rashguard for most of the year and a thin wetsuit in the cooler months. But the short answer misses the details that actually matter for planning your trip and packing your bag — what to wear, whether the numbers change at depth, how personal thermal comfort varies, and how Punta Cana compares to other Caribbean destinations divers might be considering. This post walks through all of that.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "The Year-Round Range", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "Punta Cana sits in a stretch of the Caribbean where the surrounding water is thermally stable. Unlike temperate destinations that swing 10°C or more between summer and winter, Punta Cana's diving water rarely dips below 25°C or climbs above 30°C. That's the practical reason the region is a year-round diving destination — there's no cold-water off-season where operators pack up their boats. The stability comes from the sheer volume of the Caribbean basin and the year-round tropical sun heating the surface layer.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "Divers coming from northern latitudes (US East Coast, UK, Northern Europe, Canada) often overestimate how much wetsuit they need because they're mentally calibrated to their home waters. If you're used to diving in a 7mm suit off Massachusetts or a drysuit in the UK, the shift to Caribbean thermal reality is dramatic — you'll be actively overheating on the surface interval in gear that was appropriate at home.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "Month-by-Month Breakdown", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "January and February. ", marks: ["strong"] },
            { _type: "span", _key: "en-b6-s2", text: "The coolest stretch of the year. Water temperatures typically run 25 to 27°C (77 to 81°F). Air temperatures are also at their lowest for the year — still balmy by any standard (23 to 28°C during the day) but noticeably cooler than summer. This is when a 3mm shorty wetsuit is genuinely useful, especially for divers doing multiple dives in one day when the cumulative cooling adds up. Rashguards alone work for divers with high thermal tolerance and short bottom times.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "March through May. ", marks: ["strong"] },
            { _type: "span", _key: "en-b7-s2", text: "Warming trend. Water climbs from around 26°C in early March to 27–28°C by late May. This is the sweet spot for most divers — warm enough for a rashguard for the average person, cool enough that overheating on the boat is manageable. Visibility is typically excellent through this window because the seasonal rains haven't started, so the water column stays clear.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "June through September. ", marks: ["strong"] },
            { _type: "span", _key: "en-b8-s2", text: "The warmest stretch. Water temperatures peak at 28 to 30°C (82 to 86°F), with August and September commonly the hottest. This is bathwater territory. A rashguard is usually enough for anyone, and some divers skip even that and dive in just a swimsuit — though we always recommend a rashguard for sun protection on the boat and light abrasion protection underwater. This window overlaps with hurricane season, so weather rather than temperature is the main planning consideration.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "October through December. ", marks: ["strong"] },
            { _type: "span", _key: "en-b9-s2", text: "Cooling trend, but slowly. Water stays around 27–28°C through October and gradually drops to 26–27°C by mid-December. Late fall and early winter are one of the underrated diving windows in Punta Cana — post-hurricane season, water is still warm from the summer heat load, tourist crowds thin out between the seasons, and visibility is typically excellent. A rashguard is usually plenty; a 3mm shorty is a comfort upgrade for multi-dive days.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "What Wetsuit Should You Actually Wear?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "The honest answer depends on your personal thermal comfort more than the specific date. Some divers run warm and are perfectly happy in a swimsuit in 25°C water; others feel chilled in a full 5mm suit at 29°C. That said, here's the practical guide most divers land on. For water at 28–30°C (June through October), a rashguard is enough for most people. For water at 26–28°C (November through May, most days), a 3mm shorty or a rashguard plus dive skin works well. For water at 25–26°C (peak of winter, roughly late January through early March), a 3mm full suit is the safer choice, especially if you're doing a multi-tank day or you know you're thermally sensitive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b12-l1", href: "https://www.grandbay-puntacana.com/courses" },
          ],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Grand Bay provides wetsuits with all ", marks: [] },
            { _type: "span", _key: "en-b12-s2", text: "courses and guided dives", marks: ["en-b12-l1"] },
            { _type: "span", _key: "en-b12-s3", text: ", so you don't need to travel with your own. If you have a preferred fit or a specific brand you love, bringing your own is fine — but for most travelers it's not worth the luggage weight. Our rental wetsuits are 3mm shortys and full 3mm suits, which cover the range of conditions we typically see.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "Air Temperature vs Water Temperature", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "One thing travelers often confuse: air and water temperatures don't move together and shouldn't be treated as the same thing. Air temperature in Punta Cana ranges roughly 23–31°C (74–88°F) across the year, with much more day-to-night variation than water. Water is thermally slow — it takes weeks or months to noticeably heat up or cool down, so seasonal changes lag behind the air by about a month. That's why September water is often warmer than August water even though the sun is starting to weaken, and why February water is sometimes cooler than January's despite similar air temperatures.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "For dive planning, this means the packing forecast on your phone shows air temperature, not water. Don't assume that a 28°C day means 28°C water — check the sea surface temperature separately, especially if you're diving early in a shoulder season transition.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "Does Depth Change the Temperature?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "This is where Punta Cana is genuinely different from cold-water diving destinations. In many parts of the world, water temperature drops sharply below the thermocline — the boundary between the sun-warmed surface layer and cooler deeper water. On typical recreational dive sites in Punta Cana, the recreational depth range (5 to 30 meters) sits mostly within the surface mixed layer, so the temperature at 25 meters is often within a degree of the temperature at the surface.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b18-l1", href: "https://www.grandbay-puntacana.com/shark-dive-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "This matters practically. If you're going to 26 meters on the ", marks: [] },
            { _type: "span", _key: "en-b18-s2", text: "Shark Point dive", marks: ["en-b18-l1"] },
            { _type: "span", _key: "en-b18-s3", text: ", you're not descending into markedly colder water — you'll feel the temperature drop slightly, but it's a matter of one or two degrees, not five or ten. The exception is unusual conditions after strong winds or rain events that mix the water column differently, which can occasionally produce a thermocline at recreational depths — but this isn't the norm.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "How Punta Cana Compares to Other Caribbean Destinations", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "For divers deciding between destinations, water temperature is often part of the comparison. Punta Cana sits roughly middle of the pack among Caribbean diving destinations for thermal conditions. Cozumel and Cancún run about the same year-round, sometimes a fraction warmer in summer. Aruba and Curaçao run slightly cooler in winter due to open-water exposure and stronger current. Cuba is comparable. The Bahamas — especially the northern Bahamas — can be measurably cooler in winter, with New Providence and Abaco winter waters occasionally dipping to 23°C. Belize and the Cayman Islands are usually a degree or two warmer year-round because they sit in even more thermally protected water.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "The practical takeaway: for thermal purposes, Punta Cana behaves like most of the central Caribbean, so any packing advice you find for Cozumel, Cancún, or the Riviera Maya is generally applicable here too. The bigger differences between these destinations tend to be dive site variety, marine life, and visibility rather than water temperature.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "Personal Thermal Comfort Varies More Than the Water", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "The single most consistent finding across divers we've worked with over the years: individual thermal tolerance varies enormously. A group of six divers doing the same dive in the same water can range from \"a rashguard was too much\" to \"I need a full 5mm next time.\" The variables are body composition (body fat is thermally protective), fitness level (higher metabolic rate produces more heat), age, hydration status, and whether you're doing multiple tanks in one day (each subsequent dive cools you more than the last as your core loses heat gradually).", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "If you don't know your own thermal profile from previous dive trips, our default recommendation for first-timers is to wear slightly more insulation than you think you need on the first dive, then adjust down if you overheat. It's much easier to peel off a wetsuit top on the boat than to fix chilling that starts underwater. Divers who chronically underdress on day one often end up cold and miserable by day three as fatigue compounds thermal debt.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "What About the Rare Cold Snaps?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "Every few years, a strong northern cold front pushes far enough south to briefly cool the surface water in the Dominican Republic. When this happens (typically in January or February), water temperatures can drop to 24°C for a few days before recovering. It's rare, unpredictable, and rarely lasts more than a week — but if you're diving in mid-winter and the forecast shows an unusually cold week, having a 3mm full suit rather than a shorty is worth it. For most travelers this level of preparation is unnecessary; for divers doing four or five days of diving in mid-winter it's worth checking the sea surface temperature forecast a few days out.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Air Consumption and Water Temperature", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "One subtle effect worth knowing: colder water increases air consumption for most divers because the body works harder to maintain core temperature, which means more oxygen consumption and shorter bottom times per tank. This is barely noticeable in Punta Cana's warm waters — the difference between diving at 28°C versus 26°C might extend your bottom time by only a minute or two. But for divers coming from colder waters, this is one of the reasons Caribbean dives often feel longer than home dives even at similar depths. Warmer water is more air-efficient.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "Practical Packing Advice", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "Given all of the above, here's what actually makes sense to pack. Regardless of season, always bring one rashguard (long sleeve, UPF-rated) — you'll use it in the water and on the boat, and it's near-weightless in luggage. If you're diving in December through March, add either a 3mm shorty or a full 3mm suit depending on your thermal tolerance. If you're diving in June through October, the rashguard alone is usually enough. If you're uncertain, err on the side of slightly warmer — you can always vent a wetsuit; you can't add insulation you didn't bring.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "You don't need a hood or gloves in Punta Cana under any normal conditions. If you own them and prefer to dive in them for personal reasons, that's fine — but they're not required and most divers don't use them.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "Grand Bay's Thermal Comfort Approach", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b33-l1", href: "https://www.grandbay-puntacana.com/sites" },
          ],
          children: [
            { _type: "span", _key: "en-b33-s1", text: "We monitor sea surface temperatures daily as part of our dive planning, and we adjust the recommended rental wetsuit thickness based on the actual current conditions — not just the calendar month. During a cool-water spell, we'll suggest a full 3mm even in April; during an unusually warm week we'll suggest a rashguard even in January. This is one of the reasons booking through a local dive shop that lives with the water beats booking through a resort concierge who's working from a template. We know what the ", marks: [] },
            { _type: "span", _key: "en-b33-s2", text: "dive sites", marks: ["en-b33-l1"] },
            { _type: "span", _key: "en-b33-s3", text: " feel like this week, not last year.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx1-s1", text: "Multi-Tank Days and Cumulative Cooling", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx2-s1", text: "The single trickiest thermal calculation isn't a single dive — it's the third dive of a two-day stretch. Your core temperature drops slightly during each dive as your body loses heat to the water, and even with a solid surface interval you don't fully recover before the next dive. By dive four or five across a multi-day trip, cumulative thermal debt makes the same water feel colder than it did on day one. Divers who dressed for day one often find themselves shivering on day three even in identical conditions.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx3-s1", text: "The practical fix is to plan your wetsuit around the last dive of the trip, not the first. If you're doing five dives across three days and the water is 26°C, wear the setup that will keep you comfortable on dive five — that's the one where you'll notice cooling most. It'll feel slightly warm on dive one, which is easily managed by venting the wetsuit or peeling the top off between dives. Erring toward slightly more insulation across a multi-day trip almost always ends better than erring toward slightly less.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx4-s1", text: "Kids and Thermal Comfort", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx5",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx5-s1", text: "For families diving with kids (junior open water divers age 10 to 14, or Bubblemaker participants), thermal comfort matters more than for adults. Children have a higher surface-area-to-body-mass ratio, less body fat as insulation, and less overall metabolic heat production. They get cold faster and stay cold longer. If you're diving in the cooler months with a child, plan on a full 3mm suit even if adults in the group are in shorties or rashguards. And keep dives shorter — 30 minutes rather than 50 — because the cumulative cooling on a child adds up faster than on an adult.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b34-s1", text: "The Bottom Line", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b35",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b35-l1", href: "https://www.grandbay-puntacana.com/courses/discover" },
            { _type: "link", _key: "en-b35-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b35-s1", text: "Punta Cana's water is warm enough to dive year-round in minimal thermal protection, with the specific choice depending on the month and your personal cold tolerance. A rashguard covers most of the year, a 3mm shorty covers the winter months for most people, and a full 3mm suit is the maximum most divers ever need here. If you're planning a trip and want a specific recommendation based on the current forecast for your travel dates, message us on ", marks: [] },
            { _type: "span", _key: "en-b35-s2", text: "WhatsApp", marks: ["en-b35-l2"] },
            { _type: "span", _key: "en-b35-s3", text: " and we'll give you a tailored answer. And if you're thinking about a ", marks: [] },
            { _type: "span", _key: "en-b35-s4", text: "Discover Scuba Diving experience", marks: ["en-b35-l1"] },
            { _type: "span", _key: "en-b35-s5", text: " for your first time, thermal comfort is one of the reasons Punta Cana is such a beginner-friendly destination — warm water lets you focus on the skills instead of the cold.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "Respuesta corta: la temperatura del agua en Punta Cana se mantiene entre 26 y 29°C (78 a 84°F) todo el año, con los meses más frescos en febrero y marzo y los más cálidos en agosto y septiembre. Es lo bastante cálido para bucear cómodamente con una lycra la mayor parte del año y un wetsuit fino en los meses más frescos. Pero la respuesta corta se salta los detalles que realmente importan para planear tu viaje y armar la maleta — qué ponerse, si los números cambian en profundidad, cómo varía la comodidad térmica personal y cómo se compara Punta Cana con otros destinos del Caribe. Esta publicación cubre todo eso.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "El Rango a lo Largo del Año", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "Punta Cana está en una franja del Caribe donde el agua alrededor es térmicamente estable. A diferencia de destinos templados que oscilan 10°C o más entre verano e invierno, el agua de buceo de Punta Cana rara vez baja de 25°C o sube de 30°C. Esa es la razón práctica por la que la región es destino de buceo todo el año — no hay temporada baja de agua fría en la que los operadores guarden los botes. La estabilidad viene del enorme volumen del Caribe y del sol tropical constante calentando la capa superficial.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "Los buzos que vienen de latitudes del norte (costa este de EE. UU., Reino Unido, norte de Europa, Canadá) suelen sobreestimar cuánto wetsuit necesitan porque están calibrados mentalmente para sus aguas de casa. Si estás acostumbrado a bucear en un traje de 7mm en Massachusetts o un traje seco en el Reino Unido, el cambio a la realidad térmica caribeña es dramático — vas a pasar calor en el intervalo de superficie con un equipo que en casa era apropiado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Desglose Mes a Mes", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "Enero y febrero. ", marks: ["strong"] },
            { _type: "span", _key: "es-b6-s2", text: "La franja más fresca del año. Las temperaturas del agua suelen estar entre 25 y 27°C (77 a 81°F). Las temperaturas del aire también están en su punto más bajo del año — todavía suaves para cualquier estándar (23 a 28°C durante el día) pero notablemente más frescas que en verano. Es cuando un wetsuit shorty de 3mm es genuinamente útil, sobre todo para buzos que hacen varias inmersiones en un día y el enfriamiento acumulado suma. Solo lycra funciona para buzos con alta tolerancia térmica y tiempos de fondo cortos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "De marzo a mayo. ", marks: ["strong"] },
            { _type: "span", _key: "es-b7-s2", text: "Tendencia al calentamiento. El agua sube de unos 26°C a principios de marzo a 27–28°C a finales de mayo. Este es el punto dulce para la mayoría de los buzos — lo bastante cálido para que baste una lycra para la persona promedio, lo bastante fresco para que el calor en el bote sea manejable. La visibilidad suele ser excelente durante esta ventana porque las lluvias estacionales no han empezado, así que la columna de agua se mantiene clara.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "De junio a septiembre. ", marks: ["strong"] },
            { _type: "span", _key: "es-b8-s2", text: "La franja más cálida. Las temperaturas del agua alcanzan su pico de 28 a 30°C (82 a 86°F), con agosto y septiembre habitualmente los más calurosos. Territorio de agua tibia como bañera. Una lycra suele bastar para cualquiera, y algunos buzos se saltan incluso eso y bucean solo en traje de baño — aunque siempre recomendamos una lycra por protección solar en el bote y ligera protección contra roces bajo el agua. Esta ventana se solapa con la temporada de huracanes, así que el clima más que la temperatura es la consideración principal de planificación.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "De octubre a diciembre. ", marks: ["strong"] },
            { _type: "span", _key: "es-b9-s2", text: "Enfriamiento gradual, pero lento. El agua se mantiene alrededor de 27–28°C durante octubre y baja gradualmente a 26–27°C a mediados de diciembre. El final del otoño y comienzos del invierno son una de las ventanas de buceo subestimadas en Punta Cana — pasada la temporada de huracanes, el agua sigue caliente por la carga térmica del verano, las multitudes de turistas bajan entre temporadas y la visibilidad suele ser excelente. Una lycra suele ser suficiente; un shorty de 3mm es una mejora de confort para días de varias inmersiones.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "¿Qué Wetsuit Deberías Usar Realmente?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "La respuesta honesta depende más de tu comodidad térmica personal que de la fecha específica. Algunos buzos son de sangre caliente y están perfectamente cómodos en traje de baño a 25°C; otros sienten frío con un traje completo de 5mm a 29°C. Dicho eso, esta es la guía práctica en la que aterrizan la mayoría de los buzos. Para agua de 28–30°C (de junio a octubre), una lycra basta para casi todos. Para agua de 26–28°C (de noviembre a mayo, casi siempre), un shorty de 3mm o una lycra más un skin funciona bien. Para agua de 25–26°C (pico de invierno, aproximadamente finales de enero a principios de marzo), un traje completo de 3mm es la opción más segura, sobre todo si haces un día de varias inmersiones o sabes que eres sensible al frío.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b12-l1", href: "https://www.grandbay-puntacana.com/es/courses" },
          ],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "Grand Bay proporciona wetsuits en todos los ", marks: [] },
            { _type: "span", _key: "es-b12-s2", text: "cursos e inmersiones guiadas", marks: ["es-b12-l1"] },
            { _type: "span", _key: "es-b12-s3", text: ", así que no necesitas viajar con el tuyo. Si tienes una talla preferida o una marca que amas, traer el tuyo está bien — pero para la mayoría de los viajeros no vale la pena el peso en la maleta. Nuestros wetsuits de renta son shortys de 3mm y trajes completos de 3mm, que cubren el rango de condiciones que solemos ver.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Temperatura del Aire vs Temperatura del Agua", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Algo que los viajeros suelen confundir: la temperatura del aire y la del agua no se mueven juntas y no deberían tratarse como lo mismo. La temperatura del aire en Punta Cana va aproximadamente de 23 a 31°C (74 a 88°F) a lo largo del año, con mucha más variación entre día y noche que el agua. El agua es térmicamente lenta — tarda semanas o meses en calentarse o enfriarse notablemente, así que los cambios estacionales están atrasados respecto al aire por cerca de un mes. Por eso el agua de septiembre suele ser más cálida que la de agosto aunque el sol ya empieza a debilitarse, y por eso el agua de febrero a veces está más fresca que la de enero a pesar de temperaturas de aire similares.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Para la planificación de buceo, esto significa que el pronóstico del clima en tu teléfono muestra la temperatura del aire, no del agua. No asumas que un día de 28°C significa agua a 28°C — revisa la temperatura de superficie del mar por separado, sobre todo si buceas al inicio de una transición de temporada.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "¿La Profundidad Cambia la Temperatura?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Aquí es donde Punta Cana es genuinamente distinta de destinos de buceo de agua fría. En muchas partes del mundo, la temperatura del agua cae bruscamente bajo la termoclina — el límite entre la capa superficial calentada por el sol y el agua más fría del fondo. En los sitios recreativos típicos de Punta Cana, el rango de profundidad recreativa (5 a 30 metros) se ubica mayormente dentro de la capa mezclada superficial, así que la temperatura a 25 metros suele estar dentro de un grado de la temperatura en la superficie.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b18-l1", href: "https://www.grandbay-puntacana.com/es/shark-dive-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Esto importa en la práctica. Si vas a 26 metros en ", marks: [] },
            { _type: "span", _key: "es-b18-s2", text: "la inmersión de Shark Point", marks: ["es-b18-l1"] },
            { _type: "span", _key: "es-b18-s3", text: ", no estás descendiendo a agua marcadamente más fría — sentirás una ligera baja de temperatura, pero es cuestión de uno o dos grados, no cinco o diez. La excepción son las condiciones inusuales tras vientos fuertes o eventos de lluvia que mezclan la columna de agua de forma distinta, lo que ocasionalmente puede producir una termoclina a profundidades recreativas — pero no es lo normal.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Cómo se Compara Punta Cana con Otros Destinos Caribeños", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Para buzos decidiendo entre destinos, la temperatura del agua a menudo es parte de la comparación. Punta Cana está aproximadamente en la mitad del pelotón entre los destinos de buceo caribeños en cuanto a condiciones térmicas. Cozumel y Cancún corren más o menos igual todo el año, a veces una fracción más cálidos en verano. Aruba y Curazao son ligeramente más frescos en invierno por la exposición a mar abierto y corrientes más fuertes. Cuba es comparable. Bahamas — sobre todo las del norte — puede ser medibly más fresco en invierno, con aguas de invierno de New Providence y Ábaco cayendo ocasionalmente a 23°C. Belice y las Islas Caimán suelen ser un grado o dos más cálidos todo el año porque están en aguas aún más protegidas térmicamente.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "La conclusión práctica: para efectos térmicos, Punta Cana se comporta como la mayor parte del Caribe central, así que cualquier consejo de equipaje que encuentres para Cozumel, Cancún o la Riviera Maya generalmente aplica aquí también. Las diferencias más grandes entre estos destinos tienden a ser variedad de sitios de buceo, vida marina y visibilidad más que temperatura del agua.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "La Comodidad Térmica Personal Varía Más que el Agua", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "El hallazgo más consistente en los buzos con los que hemos trabajado a lo largo de los años: la tolerancia térmica individual varía enormemente. Un grupo de seis buzos haciendo la misma inmersión en la misma agua puede ir desde \"la lycra fue demasiado\" hasta \"necesito un 5mm completo la próxima vez\". Las variables son composición corporal (la grasa corporal es térmicamente protectora), nivel de fitness (una tasa metabólica más alta produce más calor), edad, estado de hidratación, y si haces varias inmersiones en un día (cada inmersión subsiguiente te enfría más que la anterior a medida que tu core pierde calor gradualmente).", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Si no conoces tu propio perfil térmico de viajes anteriores, nuestra recomendación por defecto para primerizos es usar un poco más de aislamiento del que crees que necesitas en la primera inmersión, y luego ajustar hacia abajo si pasas calor. Es mucho más fácil quitarte la parte de arriba del wetsuit en el bote que arreglar el enfriamiento que empieza bajo el agua. Los buzos que crónicamente van con muy poca ropa el día uno a menudo terminan con frío y miserables al día tres a medida que la fatiga se combina con la deuda térmica.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "¿Y los Raros Frentes Fríos?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "Cada pocos años, un frente frío del norte empuja lo bastante al sur para enfriar brevemente el agua de superficie en la República Dominicana. Cuando eso pasa (típicamente en enero o febrero), las temperaturas del agua pueden caer a 24°C durante unos días antes de recuperarse. Es raro, impredecible y rara vez dura más de una semana — pero si buceas a mitad de invierno y el pronóstico muestra una semana inusualmente fría, tener un traje completo de 3mm en lugar de un shorty vale la pena. Para la mayoría de los viajeros este nivel de preparación no es necesario; para buzos haciendo cuatro o cinco días de buceo en pleno invierno vale la pena revisar el pronóstico de temperatura del mar unos días antes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Consumo de Aire y Temperatura del Agua", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "Un efecto sutil que vale la pena conocer: el agua más fría aumenta el consumo de aire en la mayoría de los buzos porque el cuerpo trabaja más para mantener la temperatura del core, lo que significa más consumo de oxígeno y tiempos de fondo más cortos por tanque. Esto es apenas notable en las aguas cálidas de Punta Cana — la diferencia entre bucear a 28°C versus 26°C puede extender tu tiempo de fondo solo por uno o dos minutos. Pero para buzos que vienen de aguas más frías, esta es una de las razones por las que las inmersiones caribeñas a menudo se sienten más largas que las inmersiones en casa a profundidades similares. El agua más cálida es más eficiente en aire.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "Consejo Práctico de Equipaje", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "Considerando todo lo anterior, esto es lo que realmente tiene sentido empacar. Sin importar la temporada, trae siempre al menos una lycra (manga larga, con protección UPF) — la vas a usar en el agua y en el bote, y no pesa casi nada en la maleta. Si buceas de diciembre a marzo, agrega un shorty de 3mm o un traje completo de 3mm según tu tolerancia térmica. Si buceas de junio a octubre, la lycra sola suele bastar. Si tienes dudas, tiende hacia lo un poco más cálido — siempre puedes ventilar un wetsuit; no puedes agregar aislamiento que no trajiste.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "No necesitas capucha ni guantes en Punta Cana bajo ninguna condición normal. Si los tienes y prefieres bucear con ellos por preferencia personal, está bien — pero no son requeridos y la mayoría de los buzos no los usa.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "El Enfoque de Comodidad Térmica de Grand Bay", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b33-l1", href: "https://www.grandbay-puntacana.com/es/sites" },
          ],
          children: [
            { _type: "span", _key: "es-b33-s1", text: "Monitoreamos la temperatura de superficie del mar diariamente como parte de nuestra planificación de inmersiones, y ajustamos el grosor de wetsuit recomendado según las condiciones reales del momento — no solo el mes calendario. Durante un frente frío, sugerimos un 3mm completo incluso en abril; durante una semana inusualmente cálida sugerimos una lycra incluso en enero. Esta es una de las razones por las que reservar con un centro de buceo local que vive con el agua supera a reservar con un concierge de resort trabajando con plantilla. Sabemos cómo se sienten los ", marks: [] },
            { _type: "span", _key: "es-b33-s2", text: "sitios de buceo", marks: ["es-b33-l1"] },
            { _type: "span", _key: "es-b33-s3", text: " esta semana, no el año pasado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx1-s1", text: "Días de Varias Inmersiones y Enfriamiento Acumulado", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx2-s1", text: "El cálculo térmico más complicado no es una sola inmersión — es la tercera inmersión de una racha de dos días. Tu temperatura core baja ligeramente durante cada inmersión conforme tu cuerpo pierde calor hacia el agua, y aún con un buen intervalo de superficie no te recuperas del todo antes de la siguiente. Para la inmersión cuatro o cinco a lo largo de un viaje de varios días, la deuda térmica acumulada hace que la misma agua se sienta más fría de lo que se sentía el día uno. Los buzos que se vistieron para el día uno a menudo se encuentran temblando el día tres en condiciones idénticas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx3-s1", text: "El arreglo práctico es planear tu wetsuit para la última inmersión del viaje, no la primera. Si vas a hacer cinco inmersiones en tres días y el agua está a 26°C, usa el setup que te mantendrá cómodo en la inmersión cinco — esa es donde vas a notar más el enfriamiento. Se va a sentir ligeramente cálido en la inmersión uno, lo que se maneja fácil ventilando el wetsuit o quitándote la parte de arriba entre inmersiones. Inclinarse hacia un poco más de aislamiento a lo largo de un viaje de varios días casi siempre termina mejor que inclinarse hacia un poco menos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx4-s1", text: "Niños y Comodidad Térmica", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx5",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx5-s1", text: "Para familias buceando con niños (buzos Junior Open Water de 10 a 14 años, o participantes de Bubblemaker), la comodidad térmica importa más que para adultos. Los niños tienen una mayor proporción de área superficial a masa corporal, menos grasa como aislamiento y menor producción metabólica de calor. Se enfrían más rápido y se quedan fríos más tiempo. Si buceas en los meses más frescos con un niño, planea un traje completo de 3mm incluso si los adultos del grupo están en shortys o lycras. Y mantén las inmersiones más cortas — 30 minutos en lugar de 50 — porque el enfriamiento acumulado en un niño suma más rápido que en un adulto.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b34-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b35",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b35-l1", href: "https://www.grandbay-puntacana.com/es/courses/discover" },
            { _type: "link", _key: "es-b35-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b35-s1", text: "El agua de Punta Cana es lo bastante cálida para bucear todo el año con mínima protección térmica, y la elección específica depende del mes y de tu tolerancia personal al frío. Una lycra cubre la mayor parte del año, un shorty de 3mm cubre los meses de invierno para la mayoría de las personas, y un traje completo de 3mm es lo máximo que la mayoría de los buzos necesita aquí. Si estás planeando un viaje y quieres una recomendación específica basada en el pronóstico actual para tus fechas, escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b35-s2", text: "WhatsApp", marks: ["es-b35-l2"] },
            { _type: "span", _key: "es-b35-s3", text: " y te damos una respuesta a la medida. Y si estás pensando en una ", marks: [] },
            { _type: "span", _key: "es-b35-s4", text: "experiencia Discover Scuba Diving", marks: ["es-b35-l1"] },
            { _type: "span", _key: "es-b35-s5", text: " para tu primera vez, la comodidad térmica es una de las razones por las que Punta Cana es un destino tan amigable para principiantes — el agua cálida te deja concentrarte en las habilidades en lugar del frío.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "Water Temperature for Scuba Diving in Punta Cana: Month-by-Month (2026)",
          description:
            "Punta Cana water temperatures run 26–29°C (78–84°F) year-round. Month-by-month breakdown, wetsuit recommendations, air vs water, and how depth affects temperature.",
          keywords: ["water temperature punta cana", "wetsuit punta cana diving", "punta cana ocean temperature", "scuba diving water temperature dominican republic", "punta cana water temp"],
        },
        es: {
          title: "Temperatura del Agua para Bucear en Punta Cana: Mes a Mes (2026)",
          description:
            "El agua de Punta Cana está entre 26–29°C (78–84°F) todo el año. Desglose mes a mes, qué wetsuit usar, aire vs agua, y cómo la profundidad afecta la temperatura.",
          keywords: ["temperatura agua punta cana", "wetsuit punta cana buceo", "temperatura oceano punta cana", "temperatura buceo republica dominicana"],
        },
      },
      openGraph: {
        en: {
          title: "Water Temperature for Diving in Punta Cana: A Month-by-Month Guide",
          description: "Punta Cana water stays 26–29°C year-round. Here's what to wear each month, why depth barely matters, and how it compares to other Caribbean destinations.",
        },
        es: {
          title: "Temperatura del Agua para Bucear en Punta Cana: Guía Mes a Mes",
          description: "El agua de Punta Cana se mantiene entre 26–29°C todo el año. Aquí qué ponerse cada mes, por qué la profundidad casi no importa y cómo se compara con otros destinos caribeños.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "What's the Water Temperature for Diving in Punta Cana? A Month-by-Month Guide",
          description: "A complete guide to water temperatures for scuba diving in Punta Cana, Dominican Republic. Covers the year-round temperature range (26–29°C / 78–84°F), month-by-month breakdown, wetsuit recommendations based on both temperature and personal thermal tolerance, the difference between air and water temperature, how depth affects temperature at Punta Cana dive sites (very little in the recreational range), comparisons to other Caribbean destinations, personal thermal comfort factors, rare cold snaps, the effect of water temperature on air consumption, and practical packing advice.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/water-temperature-scuba-diving-punta-cana",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "¿Cuál es la Temperatura del Agua para Bucear en Punta Cana? Guía Mes a Mes",
          description: "Una guía completa de las temperaturas del agua para bucear en Punta Cana, República Dominicana. Cubre el rango de temperatura durante todo el año (26–29°C / 78–84°F), desglose mes a mes, recomendaciones de wetsuit según temperatura y tolerancia térmica personal, la diferencia entre temperatura del aire y del agua, cómo la profundidad afecta la temperatura en los sitios de buceo de Punta Cana (muy poco en el rango recreativo), comparaciones con otros destinos caribeños, factores de comodidad térmica personal, frentes fríos raros, el efecto de la temperatura del agua sobre el consumo de aire y consejo práctico de equipaje.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/water-temperature-scuba-diving-punta-cana",
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