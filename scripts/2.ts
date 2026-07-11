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
      en: "🎯 What's Included in a Punta Cana Dive Package? A Transparent Breakdown",
      es: "🎯 ¿Qué Incluye un Paquete de Buceo en Punta Cana? Un Desglose Transparente",
    },

    slug: {
      _type: "slug",
      current: "whats-included-punta-cana-dive-package",
    },

    publishDate: "2026-07-04",

    description: {
      _type: "localizedText",
      en: "What actually comes with a Punta Cana dive booking — gear, tanks, guide, boat, transport — and what usually isn't included. Full pricing breakdown for Grand Bay's local dives, shark dive, DSD, and Catalina trips.",
      es: "Qué viene realmente incluido en una reserva de buceo en Punta Cana — equipo, tanques, guía, bote, transporte — y qué no suele estar incluido. Desglose completo de precios para las inmersiones locales, buceo con tiburones, DSD y salidas a Catalina de Grand Bay.",
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
            { _type: "span", _key: "en-b1-s1", text: "\"What's included?\" is one of the first questions we get when someone starts pricing dive trips in Punta Cana. It's a smart question because dive package inclusions vary a lot between operators — one shop's advertised price might cover everything you need for the day, while another's covers only the tanks and expects you to pay separately for gear, transportation, taxes, and gratuities. Comparing prices without knowing what's inside them leads to bad decisions. This post walks through what's standard in the Punta Cana market, what's typically included at Grand Bay specifically, what's usually not, and how to compare packages so you're actually looking at apples to apples.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "What's Standard Across Reputable Operators", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b3-l1", href: "https://www.padi.com/" },
          ],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "At any ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "PADI-certified operator", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: " in Punta Cana, a standard 2-tank dive package includes the tanks themselves (usually 12-liter aluminum), weights and weight belt, buoyancy compensator device (BCD), regulator with alternate air source, submersible pressure gauge (SPG), wetsuit appropriate for the season, mask, snorkel, and fins. The guide is included. The boat is included. So are basic surface refreshments — usually water and fruit between dives. That's the baseline. If an operator's advertised price doesn't include these fundamentals, that's a warning sign about what corners they might be cutting elsewhere.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "Hotel pickup is a variable — many operators include it within a set radius (typically the main Punta Cana and Bávaro strip) but charge extra for pickups from more distant hotels in Uvero Alto or Cap Cana. Marine park fees (for sites within protected areas like Parque Nacional del Este near Catalina) are sometimes included in the advertised price and sometimes separate. Always ask specifically.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "What's Included at Grand Bay Specifically", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b6-l1", href: "https://www.grandbay-puntacana.com/sites" },
          ],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "Every booking at Grand Bay includes full rental gear (BCD, regulator, tank, weights, wetsuit, mask, snorkel, fins), the boat and captain, a certified guide, hotel pickup and drop-off from anywhere in the Punta Cana or Bávaro strip, water and light snacks between dives, and access to our ", marks: [] },
            { _type: "span", _key: "en-b6-s2", text: "dive site list", marks: ["en-b6-l1"] },
            { _type: "span", _key: "en-b6-s3", text: " with site selection based on your certification and the daily conditions. That's what you're paying for on our advertised price — no additional charges show up on the day beyond your remaining balance and any extras you choose to add.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "The one piece of gear we don't include is a dive computer — this is one of the few items we ask divers to bring if they own one, or to accept that the guide will manage depth and time for the group. Most Caribbean recreational dive operators handle it the same way. If you own a computer, definitely bring it. If you don't, the guide's dive plan and profile management cover the same function during a guided dive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "The Standard Local Dive Pricing", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "Local 2-tank dives — the standard morning trip to nearby reefs and wrecks in Punta Cana — are $135 per certified diver for a single day. Multi-day divers pay $120 per day starting from their second day of diving with us. That drop reflects real savings on our end (gear stays set up between days, briefing overhead is lower once you know how we work, and repeat divers move faster) that we pass through rather than pocket. If you're planning three or more days of local diving during your trip, this discount adds up.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "The 2-tank price covers both dives, all the gear, the boat, the guide, and hotel pickup within the standard zone. Two dives at 40 to 50 minutes each with a surface interval in between; typical total time from pickup to drop-off is around 5 hours.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "Shark Dive Pricing", marks: [] },
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
            { _type: "span", _key: "en-b12-s1", text: "The ", marks: [] },
            { _type: "span", _key: "en-b12-s2", text: "Shark Point dive", marks: ["en-b12-l1"] },
            { _type: "span", _key: "en-b12-s3", text: " at 26 meters is priced at $190 per Advanced Open Water certified diver. This is a specialty dive requiring the Advanced cert because of the depth. The price includes the same standard inclusions (gear, boat, guide, pickup) plus the specific site fee and logistics of running the deeper dive. Divers without Advanced cert can't book Shark Point directly — but if you're doing your Advanced Open Water course with us, the Shark Point dive is often included as one of your Adventure Dives during the certification.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "Discover Scuba Diving (DSD) Pricing", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b14-l1", href: "https://www.grandbay-puntacana.com/courses/discover" },
          ],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "For first-time divers with no certification, ", marks: [] },
            { _type: "span", _key: "en-b14-s2", text: "Discover Scuba Diving is $100", marks: ["en-b14-l1"] },
            { _type: "span", _key: "en-b14-s3", text: ". This includes a briefing on basic scuba theory, a confined water introduction to breathing underwater and essential safety skills, and one guided open-water dive to a maximum of 12 meters. All gear, guide, boat, and hotel pickup are included. The typical DSD starts around 1:30 PM (after our morning trip has returned), so it doesn't require a full day. Total commitment from pickup to drop-off is around 3 to 4 hours.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Catalina and Bayahibe Trip Pricing", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b16-l1", href: "https://www.grandbay-puntacana.com/trips/catalina" },
          ],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "The ", marks: [] },
            { _type: "span", _key: "en-b16-s2", text: "Catalina Island diving trip", marks: ["en-b16-l1"] },
            { _type: "span", _key: "en-b16-s3", text: " is a full-day excursion at $220 for divers, including lunch and drinks on the boat, park entry fees, all gear, guide, boat, and extended pickup from further hotel zones. Snorkeling on the same trip is $100. Catalina Island sits inside Parque Nacional del Este and the day involves more travel time than a local dive (leaving around 7 AM rather than 8:30) so the pricing reflects the longer day and additional inclusions.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b17-l1", href: "https://www.grandbay-puntacana.com/trips/bayahibe" },
          ],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "The ", marks: [] },
            { _type: "span", _key: "en-b17-s2", text: "Bayahibe diving trip", marks: ["en-b17-l1"] },
            { _type: "span", _key: "en-b17-s3", text: " is $180 per diver. This is a half-day trip so lunch isn't included, but everything else is — gear, guide, boat, transport, park entry. Bayahibe's dive sites offer different terrain than Punta Cana's local reefs, including several notable wrecks, which is why it's popular as a variety day for divers spending a week with us.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Course Package Pricing", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b19-l1", href: "https://www.grandbay-puntacana.com/courses/scubadiver" },
            { _type: "link", _key: "en-b19-l2", href: "https://www.grandbay-puntacana.com/courses/openwater" },
            { _type: "link", _key: "en-b19-l3", href: "https://www.grandbay-puntacana.com/courses/advanced" },
          ],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "For PADI certifications, ", marks: [] },
            { _type: "span", _key: "en-b19-s2", text: "PADI Scuba Diver", marks: ["en-b19-l1"] },
            { _type: "span", _key: "en-b19-s3", text: " (a shorter entry-level cert) is $399, ", marks: [] },
            { _type: "span", _key: "en-b19-s4", text: "PADI Open Water Diver", marks: ["en-b19-l2"] },
            { _type: "span", _key: "en-b19-s5", text: " (the full entry-level lifetime cert) is $499, and ", marks: [] },
            { _type: "span", _key: "en-b19-s6", text: "PADI Advanced Open Water Diver", marks: ["en-b19-l3"] },
            { _type: "span", _key: "en-b19-s7", text: " is $449. Each course price covers all instruction time, learning materials, all pool and open-water training dives, use of gear during training, and the PADI certification fee itself once you've completed the course. What's not included in course pricing is any additional recreational diving before or after the course (that gets priced at the regular 2-tank rate).", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "Course pricing is a package for a reason — the training days include multiple dives and considerable instructor time. Comparing course prices per individual dive misses the point; you're paying for a lifetime certification and the training that produces safe, competent divers, not just for the tank fills.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "What's Not Included (And Sometimes Worth Adding)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "A few things that don't come with a standard Punta Cana dive package but that some divers add on. Nitrox (enriched air) can be requested for certified nitrox divers, at a small per-tank premium. Underwater photography rental — cameras or GoPros with housing — isn't standard, though we can point you at rental options if you don't have your own. Alcoholic drinks aren't included on any dive day; alcohol is deliberately kept out of dive days because of its physiological effects and DCS risk factors. Distant hotel pickups (Uvero Alto, Cap Cana, hotels further than the standard zone) carry an extra transport charge of $50 to $70 depending on distance.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "Gratuities for the boat crew and guide are appreciated but never mandatory — Dominican norms suggest $5 to $10 per diver per day for the guide and $3 to $5 per diver per day for the boat crew if you're happy with the service. These aren't required and no reputable operator will pressure you.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "Deposits and Payment", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "For local dives and the shark dive, a $50 deposit secures your booking. For Catalina and Bayahibe trips, the deposit is $100 because of the additional operator commitments (park fees, longer boat charter). The remaining balance is paid on the day of the dive. We accept cash in USD or Dominican pesos, and credit cards work with a 10% processing surcharge (which reflects the actual fees we pay to the card processor — the surcharge isn't a markup, it's a pass-through). Cash is preferred just because it's simpler for both sides.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "The deposit is fully refundable if we have to cancel for weather (any dive site becoming unsafe due to conditions), or if you cancel with at least 48 hours notice. Same-day cancellations for reasons other than weather aren't refundable — that reflects the fact that we've already blocked the slot and can't easily fill it. If we can reschedule you within your stay for weather-cancelled dives, we always try that first before processing a refund.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Weather and Rescheduling", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "Weather-based cancellations happen occasionally — Punta Cana's tropical weather is generally cooperative but strong winds, rough seas, or storms occasionally make a dive site unsafe. When conditions look marginal we monitor forecasts starting 48 hours out and reach out proactively if a change is likely. When we can, we reschedule within your stay at no extra charge. If rescheduling isn't possible (weather is bad and you're leaving), the deposit is refunded in full and any prepaid balance returned promptly.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "This flexibility is one reason booking directly with a local operator matters — we know the conditions in real time and can adjust. Booking through a large aggregator or resort concierge often locks you into a fixed refund/rebook protocol that doesn't match the practical reality of tropical weather.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "How to Compare Packages Between Operators", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "If you're comparing dive packages from multiple Punta Cana operators, ask these specific questions to make the comparison fair. Is gear included, or is it a per-day rental fee on top? Is hotel pickup included, and from what zones? Are marine park fees separate for national park sites? Is the guide included, or is that a separate charge? Is the price per diver or per tank (some operators price per tank, which changes the math)? What's the deposit structure and cancellation policy? Are there hidden card surcharges? Getting these answers in writing before booking prevents most of the day-of surprises that make trips more expensive than the quoted price.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "Also worth asking: what's the group size? Some cheap packages are cheap because they cram 20 divers onto a boat with two guides, which is a very different experience than a small-group operation with a 6-to-8 diver maximum. The cost per diver of running a boat trip doesn't change much whether there are 6 or 20 divers on board — but the experience does.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bA",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bA-s1", text: "What a Typical Dive Day Actually Looks Like", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bB",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bB-s1", text: "To give you a concrete picture of what you're paying for on a local 2-tank day: pickup at your hotel between 8:15 and 8:45 AM depending on location, then a 15 to 30 minute drive to our boat launch. On arrival, a gear check and full site briefing — the guide covers depth, expected conditions, marine life to look for, hand signals, buddy pairings, and emergency procedures. Boat ride to the first site is typically 10 to 20 minutes. First dive runs 40 to 50 minutes, then back to the boat for a surface interval of 45 to 60 minutes with water, fruit, and light snacks. Second dive to a different site follows, similar duration. Boat ride back, gear rinse, and drop-off at your hotel between 1:30 and 2:00 PM. Total commitment is about five hours pickup-to-drop-off.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bC",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bC-s1", text: "The Catalina full-day trip stretches this to about eight hours pickup-to-drop-off, with a longer boat ride (roughly an hour each way), two dives with a proper lunch break in between (lunch is included on the boat), and time to enjoy the park itself. The Bayahibe trip is in between — around six hours total — with two dives at different Bayahibe sites plus the boat and park travel time. Knowing the actual time commitment for each option helps you plan the rest of your day; a local 2-tank leaves your afternoon completely free, while Catalina fills the entire day. This matters for divers combining multiple activities during their trip or coordinating with non-diving partners who have their own plans.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b33-s1", text: "The Bottom Line", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b34-l1", href: "https://www.grandbay-puntacana.com/courses" },
            { _type: "link", _key: "en-b34-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b34-s1", text: "Standard Grand Bay pricing: $135 for local 2-tank dives ($120/day multi-day), $190 for the Shark Point dive, $100 for Discover Scuba Diving, $220 for Catalina Island diving (or $100 for snorkeling), and $180 for Bayahibe. PADI course packages range from $399 (Scuba Diver) to $499 (Open Water) to $449 (Advanced). All prices include full gear, boat, guide, and pickup from standard Punta Cana/Bávaro hotel zones. A $50 deposit locks in local dives; $100 for Catalina. If you have specific questions about what applies to your ", marks: [] },
            { _type: "span", _key: "en-b34-s2", text: "trip or course", marks: ["en-b34-l1"] },
            { _type: "span", _key: "en-b34-s3", text: " — hotel pickup zone, group size on your dates, whether nitrox is available, anything else — message us on ", marks: [] },
            { _type: "span", _key: "en-b34-s4", text: "WhatsApp", marks: ["en-b34-l2"] },
            { _type: "span", _key: "en-b34-s5", text: " and we'll confirm exactly what's included for your booking.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "\"¿Qué está incluido?\" es una de las primeras preguntas que recibimos cuando alguien empieza a comparar precios de buceo en Punta Cana. Es una pregunta inteligente porque las inclusiones de los paquetes de buceo varían mucho entre operadores — el precio anunciado de una tienda podría cubrir todo lo que necesitas para el día, mientras que el de otra cubre solo los tanques y espera que pagues aparte el equipo, transporte, impuestos y propinas. Comparar precios sin saber qué hay dentro lleva a malas decisiones. Esta publicación recorre qué es estándar en el mercado de Punta Cana, qué está típicamente incluido en Grand Bay específicamente, qué no suele estar, y cómo comparar paquetes para que realmente estés viendo peras con peras.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "Qué es Estándar Entre Operadores Serios", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b3-l1", href: "https://www.padi.com/" },
          ],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "En cualquier ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "operador certificado PADI", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: " en Punta Cana, un paquete estándar de 2 tanques incluye los tanques mismos (usualmente de aluminio de 12 litros), plomos y cinturón, chaleco compensador (BCD), regulador con fuente alterna de aire, manómetro sumergible (SPG), wetsuit apropiado para la temporada, máscara, snorkel y aletas. El guía está incluido. El bote está incluido. También los refrescos básicos en superficie — usualmente agua y fruta entre inmersiones. Ese es el mínimo base. Si el precio anunciado de un operador no incluye estos fundamentos, es una señal de alerta sobre qué esquinas podrían estar recortando en otras partes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "La recogida en hotel es variable — muchos operadores la incluyen dentro de un radio establecido (típicamente la franja principal de Punta Cana y Bávaro) pero cobran extra por recogidas de hoteles más distantes en Uvero Alto o Cap Cana. Las tarifas de parque marino (para sitios dentro de áreas protegidas como el Parque Nacional del Este cerca de Catalina) a veces están incluidas en el precio anunciado y a veces son aparte. Siempre pregunta específicamente.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Qué Está Incluido en Grand Bay Específicamente", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b6-l1", href: "https://www.grandbay-puntacana.com/es/sites" },
          ],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "Cada reserva en Grand Bay incluye equipo completo de renta (BCD, regulador, tanque, plomos, wetsuit, máscara, snorkel, aletas), el bote y capitán, un guía certificado, recogida y regreso al hotel desde cualquier parte de la franja de Punta Cana o Bávaro, agua y snacks ligeros entre inmersiones, y acceso a nuestra ", marks: [] },
            { _type: "span", _key: "es-b6-s2", text: "lista de sitios de buceo", marks: ["es-b6-l1"] },
            { _type: "span", _key: "es-b6-s3", text: " con selección de sitio basada en tu certificación y las condiciones diarias. Eso es lo que estás pagando en nuestro precio anunciado — no aparecen cargos adicionales el día de más allá de tu saldo restante y cualquier extra que decidas agregar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "La única pieza de equipo que no incluimos es un computador de buceo — este es uno de los pocos ítems que pedimos a los buzos que traigan si tienen uno, o que acepten que el guía manejará la profundidad y el tiempo del grupo. La mayoría de los operadores recreativos caribeños lo manejan igual. Si tienes un computador, definitivamente tráelo. Si no, el plan de inmersión del guía y el manejo del perfil cubren la misma función durante una inmersión guiada.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Precios Estándar de Inmersiones Locales", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "Las inmersiones locales de 2 tanques — la salida matutina estándar a arrecifes y naufragios cercanos en Punta Cana — son $135 por buzo certificado en un día único. Los buzos de múltiples días pagan $120 por día desde su segundo día buceando con nosotros. Esa baja refleja ahorros reales de nuestro lado (el equipo queda montado entre días, la carga de briefing es menor una vez que sabes cómo trabajamos, y los buzos que repiten se mueven más rápido) que trasladamos en lugar de embolsar. Si planeas tres o más días de buceo local en tu viaje, este descuento suma.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "El precio de 2 tanques cubre ambas inmersiones, todo el equipo, el bote, el guía y la recogida en hotel dentro de la zona estándar. Dos inmersiones de 40 a 50 minutos cada una con un intervalo de superficie en medio; el tiempo total típico de recogida a regreso es de unas 5 horas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Precio del Buceo con Tiburones", marks: [] },
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
            { _type: "span", _key: "es-b12-s1", text: "La ", marks: [] },
            { _type: "span", _key: "es-b12-s2", text: "inmersión de Shark Point", marks: ["es-b12-l1"] },
            { _type: "span", _key: "es-b12-s3", text: " a 26 metros tiene un precio de $190 por buzo certificado Advanced Open Water. Es una inmersión de especialidad que requiere la certificación Advanced por la profundidad. El precio incluye las mismas inclusiones estándar (equipo, bote, guía, recogida) más la tarifa específica del sitio y la logística de operar la inmersión más profunda. Los buzos sin certificación Advanced no pueden reservar Shark Point directamente — pero si estás haciendo tu curso Advanced Open Water con nosotros, la inmersión de Shark Point a menudo se incluye como una de tus Adventure Dives durante la certificación.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Precio de Discover Scuba Diving (DSD)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b14-l1", href: "https://www.grandbay-puntacana.com/es/courses/discover" },
          ],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Para buzos primerizos sin certificación, ", marks: [] },
            { _type: "span", _key: "es-b14-s2", text: "Discover Scuba Diving es $100", marks: ["es-b14-l1"] },
            { _type: "span", _key: "es-b14-s3", text: ". Esto incluye un briefing sobre teoría básica de scuba, una introducción en aguas confinadas a la respiración bajo el agua y habilidades esenciales de seguridad, y una inmersión guiada en aguas abiertas a un máximo de 12 metros. Todo el equipo, guía, bote y recogida en hotel están incluidos. El DSD típico empieza alrededor de la 1:30 PM (después de que nuestra salida matutina ha regresado), así que no requiere un día completo. El compromiso total desde la recogida hasta el regreso es de unas 3 a 4 horas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Precios de Salidas a Catalina y Bayahibe", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b16-l1", href: "https://www.grandbay-puntacana.com/es/trips/catalina" },
          ],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "La ", marks: [] },
            { _type: "span", _key: "es-b16-s2", text: "salida de buceo a la Isla Catalina", marks: ["es-b16-l1"] },
            { _type: "span", _key: "es-b16-s3", text: " es una excursión de día completo a $220 para buzos, incluyendo almuerzo y bebidas en el bote, tarifas de entrada al parque, todo el equipo, guía, bote y recogida extendida desde zonas de hotel más lejanas. El snorkel en la misma salida es $100. La Isla Catalina está dentro del Parque Nacional del Este y el día involucra más tiempo de viaje que una inmersión local (saliendo alrededor de las 7 AM en lugar de las 8:30) así que el precio refleja el día más largo e inclusiones adicionales.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b17-l1", href: "https://www.grandbay-puntacana.com/es/trips/bayahibe" },
          ],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "La ", marks: [] },
            { _type: "span", _key: "es-b17-s2", text: "salida de buceo a Bayahibe", marks: ["es-b17-l1"] },
            { _type: "span", _key: "es-b17-s3", text: " es $180 por buzo. Es una salida de medio día así que el almuerzo no está incluido, pero todo lo demás sí — equipo, guía, bote, transporte, entrada al parque. Los sitios de buceo de Bayahibe ofrecen un terreno diferente a los arrecifes locales de Punta Cana, incluyendo varios naufragios notables, por lo que es popular como un día de variedad para buzos que pasan una semana con nosotros.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Precios de Paquetes de Cursos", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b19-l1", href: "https://www.grandbay-puntacana.com/es/courses/scubadiver" },
            { _type: "link", _key: "es-b19-l2", href: "https://www.grandbay-puntacana.com/es/courses/openwater" },
            { _type: "link", _key: "es-b19-l3", href: "https://www.grandbay-puntacana.com/es/courses/advanced" },
          ],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Para certificaciones PADI, ", marks: [] },
            { _type: "span", _key: "es-b19-s2", text: "PADI Scuba Diver", marks: ["es-b19-l1"] },
            { _type: "span", _key: "es-b19-s3", text: " (una certificación de nivel de entrada más corta) es $399, ", marks: [] },
            { _type: "span", _key: "es-b19-s4", text: "PADI Open Water Diver", marks: ["es-b19-l2"] },
            { _type: "span", _key: "es-b19-s5", text: " (la certificación completa de por vida de nivel de entrada) es $499, y ", marks: [] },
            { _type: "span", _key: "es-b19-s6", text: "PADI Advanced Open Water Diver", marks: ["es-b19-l3"] },
            { _type: "span", _key: "es-b19-s7", text: " es $449. Cada precio de curso cubre todo el tiempo de instrucción, los materiales de aprendizaje, todas las inmersiones de entrenamiento en piscina y aguas abiertas, uso de equipo durante el entrenamiento, y la tarifa de certificación PADI misma una vez que has completado el curso. Lo que no está incluido en el precio del curso es cualquier buceo recreativo adicional antes o después del curso (eso se cotiza a la tarifa regular de 2 tanques).", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "El precio del curso es un paquete por una razón — los días de entrenamiento incluyen múltiples inmersiones y considerable tiempo de instructor. Comparar precios de curso por inmersión individual pierde el punto; estás pagando por una certificación de por vida y el entrenamiento que produce buzos seguros y competentes, no solo por los llenados de tanque.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "Qué No Está Incluido (Y A Veces Vale la Pena Agregar)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "Algunas cosas que no vienen con un paquete estándar de buceo en Punta Cana pero que algunos buzos agregan. El nitrox (aire enriquecido) puede ser solicitado por buzos certificados en nitrox, con un pequeño extra por tanque. La renta de fotografía subacuática — cámaras o GoPros con carcasa — no es estándar, aunque podemos indicarte opciones de renta si no tienes la tuya. Las bebidas alcohólicas no están incluidas en ningún día de buceo; el alcohol se mantiene deliberadamente fuera de los días de buceo por sus efectos fisiológicos y factores de riesgo de EDC. Las recogidas de hoteles distantes (Uvero Alto, Cap Cana, hoteles más allá de la zona estándar) tienen un cargo extra de transporte de $50 a $70 según la distancia.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Las propinas para la tripulación del bote y el guía son apreciadas pero nunca obligatorias — las normas dominicanas sugieren $5 a $10 por buzo por día para el guía y $3 a $5 por buzo por día para la tripulación del bote si estás contento con el servicio. No son requeridas y ningún operador serio te presionará.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Depósitos y Pago", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "Para inmersiones locales y la inmersión con tiburones, un depósito de $50 asegura tu reserva. Para las salidas a Catalina y Bayahibe, el depósito es de $100 por los compromisos adicionales del operador (tarifas de parque, chárter de bote más largo). El saldo restante se paga el día de la inmersión. Aceptamos efectivo en USD o pesos dominicanos, y las tarjetas de crédito funcionan con un recargo de procesamiento del 10% (que refleja las tarifas reales que pagamos al procesador de tarjetas — el recargo no es un margen, es un pase directo). El efectivo se prefiere solo porque es más simple para ambos lados.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "El depósito es completamente reembolsable si tenemos que cancelar por clima (cualquier sitio de buceo volviéndose inseguro por condiciones), o si cancelas con al menos 48 horas de anticipación. Las cancelaciones el mismo día por razones distintas al clima no son reembolsables — eso refleja el hecho de que ya bloqueamos el espacio y no podemos llenarlo fácilmente. Si podemos reprogramarte dentro de tu estancia por inmersiones canceladas por clima, siempre intentamos eso primero antes de procesar un reembolso.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Clima y Reprogramación", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "Las cancelaciones por clima pasan ocasionalmente — el clima tropical de Punta Cana generalmente es cooperativo pero vientos fuertes, mar picado o tormentas ocasionalmente hacen un sitio de buceo inseguro. Cuando las condiciones se ven marginales, monitoreamos los pronósticos desde 48 horas antes y te contactamos proactivamente si un cambio es probable. Cuando podemos, reprogramamos dentro de tu estancia sin cargo extra. Si reprogramar no es posible (el clima está mal y te vas), el depósito se reembolsa completo y cualquier saldo pagado por adelantado se devuelve pronto.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "Esta flexibilidad es una razón por la que reservar directamente con un operador local importa — conocemos las condiciones en tiempo real y podemos ajustar. Reservar a través de un gran agregador o concierge de resort a menudo te encierra en un protocolo fijo de reembolso/rebook que no coincide con la realidad práctica del clima tropical.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "Cómo Comparar Paquetes Entre Operadores", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "Si estás comparando paquetes de buceo de múltiples operadores en Punta Cana, haz estas preguntas específicas para hacer la comparación justa. ¿El equipo está incluido, o es una tarifa de renta por día encima? ¿La recogida en hotel está incluida, y desde qué zonas? ¿Las tarifas de parque marino son aparte para sitios de parque nacional? ¿El guía está incluido, o es un cargo separado? ¿El precio es por buzo o por tanque (algunos operadores cotizan por tanque, lo que cambia las cuentas)? ¿Cuál es la estructura del depósito y la política de cancelación? ¿Hay recargos ocultos por tarjeta? Obtener estas respuestas por escrito antes de reservar previene la mayoría de las sorpresas del día de que hacen los viajes más caros que el precio cotizado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "También vale la pena preguntar: ¿cuál es el tamaño del grupo? Algunos paquetes baratos son baratos porque meten 20 buzos en un bote con dos guías, lo que es una experiencia muy diferente a la de una operación de grupo pequeño con un máximo de 6 a 8 buzos. El costo por buzo de operar una salida en bote no cambia mucho ya sea que haya 6 o 20 buzos a bordo — pero la experiencia sí.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bA",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bA-s1", text: "Cómo Se Ve Realmente un Día Típico de Buceo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bB",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bB-s1", text: "Para darte una imagen concreta de lo que estás pagando en un día local de 2 tanques: recogida en tu hotel entre las 8:15 y las 8:45 AM según la ubicación, luego un viaje de 15 a 30 minutos hasta el punto de embarque. A la llegada, revisión del equipo y briefing completo del sitio — el guía cubre profundidad, condiciones esperadas, vida marina a buscar, señales de mano, asignaciones de compañero y procedimientos de emergencia. El viaje en bote al primer sitio es típicamente de 10 a 20 minutos. La primera inmersión corre de 40 a 50 minutos, luego regreso al bote para un intervalo de superficie de 45 a 60 minutos con agua, fruta y snacks ligeros. Segunda inmersión en un sitio diferente, duración similar. Viaje de regreso, enjuague del equipo y entrega en tu hotel entre la 1:30 y las 2:00 PM. El compromiso total es de unas cinco horas de recogida a entrega.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bC",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bC-s1", text: "La salida de día completo a Catalina estira esto a unas ocho horas de recogida a entrega, con un viaje en bote más largo (aproximadamente una hora de cada lado), dos inmersiones con una pausa apropiada para el almuerzo en medio (el almuerzo está incluido en el bote) y tiempo para disfrutar el parque mismo. La salida a Bayahibe está en medio — unas seis horas en total — con dos inmersiones en distintos sitios de Bayahibe más el tiempo de bote y viaje al parque. Conocer el compromiso real de tiempo de cada opción te ayuda a planear el resto de tu día; una salida local de 2 tanques deja tu tarde completamente libre, mientras que Catalina llena el día entero. Esto importa para buzos que combinan múltiples actividades durante su viaje o que coordinan con parejas no buzas que tienen sus propios planes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b33-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b34-l1", href: "https://www.grandbay-puntacana.com/es/courses" },
            { _type: "link", _key: "es-b34-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b34-s1", text: "Precios estándar de Grand Bay: $135 por inmersiones locales de 2 tanques ($120/día en múltiples días), $190 por la inmersión de Shark Point, $100 por Discover Scuba Diving, $220 por buceo en la Isla Catalina (o $100 por snorkel), y $180 por Bayahibe. Los paquetes de cursos PADI van desde $399 (Scuba Diver) a $499 (Open Water) a $449 (Advanced). Todos los precios incluyen equipo completo, bote, guía y recogida desde las zonas estándar de hoteles en Punta Cana/Bávaro. Un depósito de $50 asegura las inmersiones locales; $100 para Catalina. Si tienes preguntas específicas sobre lo que aplica para tu ", marks: [] },
            { _type: "span", _key: "es-b34-s2", text: "viaje o curso", marks: ["es-b34-l1"] },
            { _type: "span", _key: "es-b34-s3", text: " — zona de recogida en hotel, tamaño del grupo en tus fechas, si el nitrox está disponible, cualquier otra cosa — escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b34-s4", text: "WhatsApp", marks: ["es-b34-l2"] },
            { _type: "span", _key: "es-b34-s5", text: " y te confirmamos exactamente qué está incluido para tu reserva.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "What's Included in a Punta Cana Dive Package? Full Breakdown (2026)",
          description:
            "Full pricing breakdown: $135 local 2-tank, $190 shark dive, $100 DSD, $220 Catalina, $180 Bayahibe. What's included, what's not, and how to compare packages between operators.",
          keywords: ["punta cana dive package", "scuba diving punta cana price", "grand bay diving cost", "punta cana scuba package included", "dive trip cost"],
        },
        es: {
          title: "¿Qué Incluye un Paquete de Buceo en Punta Cana? Desglose Completo (2026)",
          description:
            "Desglose completo de precios: $135 locales, $190 tiburones, $100 DSD, $220 Catalina, $180 Bayahibe. Qué está incluido, qué no, y cómo comparar paquetes entre operadores.",
          keywords: ["paquete buceo punta cana", "precio buceo punta cana", "grand bay precio buceo", "buceo punta cana incluido"],
        },
      },
      openGraph: {
        en: {
          title: "What's Included in a Punta Cana Dive Package?",
          description: "Full transparent pricing for Grand Bay dives, courses, and trips. What's included, what's not, and how to compare packages fairly.",
        },
        es: {
          title: "¿Qué Incluye un Paquete de Buceo en Punta Cana?",
          description: "Precios transparentes completos para inmersiones, cursos y salidas de Grand Bay. Qué está incluido, qué no, y cómo comparar paquetes de forma justa.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "What's Included in a Punta Cana Dive Package? A Transparent Breakdown",
          description: "Comprehensive breakdown of what's included in Punta Cana dive packages: full rental gear (BCD, regulator, tank, weights, wetsuit, mask, snorkel, fins), boat, certified guide, hotel pickup, refreshments. Full transparent Grand Bay pricing for local 2-tank dives ($135, or $120 multi-day), Shark Point dive ($190), Discover Scuba Diving ($100), Catalina Island ($220 diving, $100 snorkeling), Bayahibe ($180), and PADI courses (Scuba Diver $399, Open Water $499, Advanced $449). Also covers what's not included (nitrox, cameras, distant pickups, tips), deposit and payment structure, weather rescheduling policy, and how to compare packages between operators.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/whats-included-punta-cana-dive-package",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "¿Qué Incluye un Paquete de Buceo en Punta Cana? Un Desglose Transparente",
          description: "Desglose completo de qué incluyen los paquetes de buceo en Punta Cana: equipo completo de renta (BCD, regulador, tanque, plomos, wetsuit, máscara, snorkel, aletas), bote, guía certificado, recogida en hotel, refrescos. Precios transparentes completos de Grand Bay para inmersiones locales de 2 tanques ($135, o $120 múltiples días), Shark Point ($190), Discover Scuba Diving ($100), Isla Catalina ($220 buceo, $100 snorkel), Bayahibe ($180), y cursos PADI (Scuba Diver $399, Open Water $499, Advanced $449). También cubre qué no está incluido (nitrox, cámaras, recogidas distantes, propinas), estructura de depósitos y pagos, política de reprogramación por clima, y cómo comparar paquetes entre operadores.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/whats-included-punta-cana-dive-package",
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