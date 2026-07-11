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
      en: "🔍 How to Choose a Reputable Dive Shop in Punta Cana",
      es: "🔍 Cómo Elegir una Tienda de Buceo Confiable en Punta Cana",
    },

    slug: {
      _type: "slug",
      current: "how-to-choose-dive-shop-punta-cana",
    },

    publishDate: "2026-07-04",

    description: {
      _type: "localizedText",
      en: "What separates a serious dive operator from an aggregator listing or resort-desk booking. Certification, group size, instructor qualifications, equipment condition, red flags, and specific questions to ask before you book.",
      es: "Qué separa a un operador de buceo serio de una listing de agregador o una reserva de escritorio de resort. Certificación, tamaño de grupo, calificaciones del instructor, condición del equipo, señales de alerta y preguntas específicas antes de reservar.",
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
            { _type: "span", _key: "en-b1-s1", text: "Choosing a dive operator is one of the most consequential decisions in planning a diving trip — more than the destination, more than the specific dive sites, arguably more than the certification agency. A good operator will run a safe, well-organized dive that shows you the reef properly. A bad one will hand you sketchy gear, push you into a 20-diver herd, and race through the site to fit in the next trip. Same reef, radically different experience. This is especially true in a tourism-heavy destination like Punta Cana, where dozens of operators compete for the same divers and the range of quality is wide. This post walks through what actually distinguishes a reputable dive shop from a mediocre or dangerous one — certification, group size, gear, instructor qualifications, transparency, and the specific red flags worth watching for.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "Certification Agency Affiliation", marks: [] },
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
            { _type: "span", _key: "en-b3-s1", text: "Every legitimate dive shop is affiliated with a recognized certification agency. In the Caribbean, the biggest are ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "PADI (Professional Association of Diving Instructors)", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: ", SSI (Scuba Schools International), and SDI (Scuba Diving International). PADI is by far the largest globally and issues the certifications most divers already hold. When a shop is a \"PADI 5-Star Dive Center\" or \"PADI Dive Resort,\" it means they've met specific operational standards — instructor qualifications, gear maintenance, safety practices, business practices — that PADI audits. This isn't a marketing badge; it's an accountability structure. If something goes seriously wrong at a certified dive center, the agency can investigate and revoke affiliation, which is a real business consequence.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "Verify agency affiliation independently rather than taking the shop's word. PADI maintains a dive center locator on their website where you can search for authorized centers by location. If a shop claims PADI affiliation but doesn't show up in the locator, that's a red flag — either they're not actually affiliated, or their affiliation has lapsed. This same principle applies to any agency they claim.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "Group Size Per Guide", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "Group size is one of the single biggest quality indicators, and it's rarely mentioned in marketing copy. A good recreational operator runs 6 to 8 divers per guide. A cheap volume operation runs 15 to 20 divers per guide, sometimes with two guides splitting a group of 20 across a shared boat. The economics of a dive boat are largely fixed — the boat, fuel, captain, gear, and permits cost roughly the same whether there are 6 or 20 divers on board — so the cheap-per-diver model works by cramming more people onto the same trip.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "The difference underwater is significant. With 6 divers, the guide can actually see everyone, respond quickly to any signal, and keep the group tight enough to see the marine life the guide points out. With 20 divers, the group spreads over 30 meters of reef, the guide loses eye contact with individuals, and the animals get scared off by the mass of divers before you have a chance to observe them. This isn't a subjective preference — it's a measurable difference in what you see and how much attention you get if you need help. Ask specifically: how many divers per guide? Answers over 8 to 10 should give you pause.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "Instructor Qualifications and Local Experience", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "For courses (Discover Scuba, Open Water, Advanced), the qualifications of your specific instructor matter enormously. A PADI Open Water Scuba Instructor (OWSI) is the minimum credential to teach entry-level courses. Beyond that, look at experience level — an instructor teaching for five years at a specific site will handle every situation the site presents; an instructor two months into their first job in a new destination is still learning. This isn't a knock on new instructors, who are usually well-supervised, but it's worth knowing which you're getting.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "For guided dives (not courses), the guide should be at minimum a certified Divemaster, though many shops use Instructors as guides. Also worth checking: does the guide actually know the specific sites, or are they following a memorized route? A guide who knows the reef intimately will show you the resident moray eel, the passageway where the reef sharks pass through, the specific coral formation with the octopus. A guide who's just following a compass heading will show you the same rectangle of reef whether it's your first dive here or your tenth.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "Equipment Condition", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Rental gear condition is one of the visible signals of an operator's overall care. When you arrive at the shop or boat, look at the gear you're being handed. Regulator hoses should be intact, not cracked or leaking. BCDs should hold air when inflated (test this before entering the water). Mask straps and fin straps should be in good condition. Tanks should have recent hydrostatic test stamps (usually visible near the valve). Wetsuits should be free of large tears. If the gear looks well-maintained, the operator is probably running a tight operation overall. If it looks like it's been abused and never serviced, that's a broader warning.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "Reputable operators service regulators annually, replace BCDs on a rotation, and inspect tanks per legal schedules. They don't push gear until it fails and then only replace what visibly broke. This costs money and shows in the price — an operator running \"too cheap\" packages often is either cutting gear maintenance corners or paying instructors below industry rates, both of which affect safety.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "Safety Practices and Emergency Response", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b15-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Ask the operator about their emergency response plan. A reputable shop will be able to tell you what happens if a diver has an incident — on-boat oxygen procedures, communication with land emergency services, coordination with the nearest hyperbaric chamber (in Santo Domingo for Punta Cana operations), and any relationship with ", marks: [] },
            { _type: "span", _key: "en-b15-s2", text: "Divers Alert Network", marks: ["en-b15-l1"] },
            { _type: "span", _key: "en-b15-s3", text: ". Many serious operators carry DAN professional membership, which provides accident coverage for their operation and access to DAN's 24/7 medical consultation hotline. If the shop can't articulate their emergency plan clearly, that's a genuine concern — it usually means they don't have one.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "Boats should visibly carry oxygen (a green kit with regulator), a first aid kit, marine radio, life vests, and surface flotation. If you don't see this gear on the boat, ask where it is. \"We don't need that\" is not an acceptable answer — every certification agency requires it and every reputable operator carries it.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "Reviews (With Skepticism)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Reviews matter but they're not the neutral signal they seem. Aggregator platforms (TripAdvisor, Viator, GetYourGuide) monetize the operator side by taking commission on bookings, which creates conflicts of interest in how they surface operators. Google reviews are generally more trustworthy because Google doesn't take booking commission — the operators have less ability to game the ranking. Read reviews for patterns rather than individual complaints (one bad review can happen to anyone; twenty complaints about the same issue tell you something). Look specifically for mentions of small groups, safety-focused briefings, quality gear, and knowledgeable guides. Watch out for repeated complaints about being upsold on the boat, unclear pricing, or dive sites that don't match what was advertised.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "Review counts matter more than average score for very small operators (the difference between 4.6 and 4.9 across 500 reviews is much more meaningful than the same difference across 10 reviews). Operators with only glowing recent reviews and no history are worth extra scrutiny — sometimes these are new operators, sometimes review manipulation.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "Booking Directly vs Through Third Parties", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "Where you book from affects the price and the flexibility you get. Booking through a large aggregator platform typically adds a 15 to 25% markup that goes to the platform, not to the operator delivering the dive. It also locks you into the platform's rigid cancellation and refund protocols, which often don't accommodate weather flexibility the way a direct booking would. Booking through a resort concierge involves a similar dynamic — many resorts operate on a commission or kickback basis with specific operators, which is why the same handful of names get recommended regardless of quality.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "Booking directly with a local operator — via their website, email, or WhatsApp — usually gets you the operator's actual price without markup, more flexible rescheduling for weather, direct communication with the people running your dive, and better ability to customize (\"I want to see a moray eel today\" or \"we'd prefer a quieter site\"). Direct booking is not the same as ignoring reviews — reputation still matters — but once you've identified operators you trust, direct is usually the better booking channel.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "Language Capabilities", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "For international divers, the guide's language capability matters more than it seems. Dive briefings are safety-critical — they cover the specific plan, hand signals, emergency procedures, and details about the site. A briefing delivered in a language you don't speak fluently means you miss information you need. Look for operators whose guides genuinely speak your language, not \"translation apps and gestures.\" In Punta Cana, most reputable operators handle English and Spanish comfortably; some also handle French, German, Italian, or Russian. Ask specifically what languages are available on your dates, and confirm before booking.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "Booking Transparency", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "A reputable operator gives you clear pricing before you book, in writing. This means the base rate, what's included, any additional charges (marine park fees, distant hotel pickup, gear rental if not included, card surcharges), the deposit structure, and the cancellation policy. If you can't get clear answers in writing, that's a warning. Day-of surprise charges are one of the most common complaints in the Punta Cana tourism industry — divers arrive expecting to pay the quoted price and find that gear, transport, or park fees weren't included after all.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Payment structure should also be reasonable. A deposit to secure the booking (typically $50 to $100 depending on trip type) is standard; being asked to pay the full amount upfront in cash weeks before your trip is unusual and worth questioning. Refund and rescheduling terms should be spelled out — weather cancellations should refund or rebook, and reasonable-notice cancellations by the diver should be refundable. Non-refundable everything is a policy that only benefits the operator.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "Red Flags", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "A few patterns that consistently correlate with poor operations. No physical shop or verifiable local address — an Instagram profile and a WhatsApp number is not a dive operation; it's a middleman or a very new operator without infrastructure. Refusal to provide clear pricing in writing. Extreme underpricing compared to the market — Punta Cana 2-tank dives at $60 to $80 are almost always corner-cut operations because the real cost of running a safe dive boat is higher than that. Group sizes over 15 divers per guide. Vague or missing certification agency affiliation. No visible safety gear on the boat. Vague or defensive answers to safety questions. Refusal to let you see the boat or gear before the dive day.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "The single strongest red flag: pressure tactics. Any operator that tries to rush your decision, insists on payment before you've seen the operation, or pressures you into upgrades on the boat is showing you how they treat customers when they have your money. Reputable operators don't need to pressure — their reputation and reviews do the selling.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "Questions to Ask Before Booking", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "The specific questions that separate a real operator conversation from a marketing brochure. What certification agency are you affiliated with, and can I verify that on your agency's site? How many divers per guide is your typical group? What sites are we likely to visit for my certification level? What's your cancellation and reschedule policy for weather? What's included in the quoted price, and what isn't? What safety equipment does the boat carry? Do you have DAN professional membership or equivalent? What's your emergency response protocol? Who is my instructor or guide, and what's their experience level? What language will the briefing be in?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b33-s1", text: "A reputable operator will answer these directly, without hedging or getting defensive. A bad operator will change the subject, promise vaguely, or push you toward booking before you've gotten answers. The response quality is often more informative than the specific answers.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b34-s1", text: "How This Applies to Grand Bay", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b35",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b35-l1", href: "https://www.grandbay-puntacana.com/" },
            { _type: "link", _key: "en-b35-l2", href: "https://www.grandbay-puntacana.com/courses" },
          ],
          children: [
            { _type: "span", _key: "en-b35-s1", text: "Here's how ", marks: [] },
            { _type: "span", _key: "en-b35-s2", text: "Grand Bay", marks: ["en-b35-l1"] },
            { _type: "span", _key: "en-b35-s3", text: " stacks up on each criteria above, so you can compare us against others fairly. PADI-affiliated, verifiable on PADI's dive center locator. Groups capped at 6 to 8 divers per guide. Instructors and guides who work the same sites daily and know them intimately. Gear serviced on manufacturer schedules, not on breakage. Written emergency protocol including on-boat oxygen, marine radio, and coordination with the Santo Domingo hyperbaric chamber. English and Spanish native-level briefings. Transparent pricing in writing before booking. 48-hour cancellation policy with full weather refunds. Direct booking via ", marks: [] },
            { _type: "span", _key: "en-b35-s4", text: "our website", marks: ["en-b35-l2"] },
            { _type: "span", _key: "en-b35-s5", text: " or WhatsApp — no aggregator markup, no resort commission structure.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b36",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b36-s1", text: "That's not a claim we're the only reputable operator in Punta Cana — there are others worth considering. It's a template for how to evaluate any operator on the criteria that actually matter. Ask other shops the same questions, verify their answers independently, and pick the one that gives you confidence.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b37",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b37-s1", text: "The Bottom Line", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b38",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b38-l1", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b38-s1", text: "A reputable dive operator is verifiable, transparent, small-group, well-equipped, and responsive to safety questions. Price alone isn't the signal — dive operations have real costs and dangerously underpriced trips usually mean corners cut somewhere. Certification affiliation, group size, gear condition, and how the operator answers safety questions tell you more than star ratings on aggregator sites. If you want to compare us specifically against any other operator you're considering, message us on ", marks: [] },
            { _type: "span", _key: "en-b38-s2", text: "WhatsApp", marks: ["en-b38-l1"] },
            { _type: "span", _key: "en-b38-s3", text: " and we'll answer any specific question directly. If we're not the right fit for your trip, we'll say so.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "Elegir un operador de buceo es una de las decisiones más consecuentes al planear un viaje de buceo — más que el destino, más que los sitios específicos, discutiblemente más que la agencia de certificación. Un buen operador manejará una inmersión segura y bien organizada que te muestre el arrecife apropiadamente. Uno malo te entregará equipo dudoso, te empujará a una manada de 20 buzos y correrá a través del sitio para embonar el próximo viaje. Mismo arrecife, experiencia radicalmente diferente. Esto es especialmente cierto en un destino cargado de turismo como Punta Cana, donde docenas de operadores compiten por los mismos buzos y el rango de calidad es amplio. Esta publicación recorre qué distingue realmente a una tienda de buceo confiable de una mediocre o peligrosa — certificación, tamaño de grupo, equipo, calificaciones del instructor, transparencia y las señales de alerta específicas que vale la pena vigilar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "Afiliación a Agencia de Certificación", marks: [] },
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
            { _type: "span", _key: "es-b3-s1", text: "Toda tienda de buceo legítima está afiliada a una agencia de certificación reconocida. En el Caribe, las más grandes son ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "PADI (Professional Association of Diving Instructors)", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: ", SSI (Scuba Schools International) y SDI (Scuba Diving International). PADI es por lejos la más grande globalmente y emite las certificaciones que la mayoría de los buzos ya tiene. Cuando una tienda es un \"PADI 5-Star Dive Center\" o \"PADI Dive Resort\", significa que ha cumplido con estándares operacionales específicos — calificaciones de instructor, mantenimiento de equipo, prácticas de seguridad, prácticas de negocio — que PADI audita. Esta no es una insignia de marketing; es una estructura de rendición de cuentas. Si algo sale seriamente mal en un centro de buceo certificado, la agencia puede investigar y revocar la afiliación, lo cual es una consecuencia real de negocio.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "Verifica la afiliación de la agencia independientemente en lugar de tomar la palabra de la tienda. PADI mantiene un localizador de centros de buceo en su sitio web donde puedes buscar centros autorizados por ubicación. Si una tienda dice tener afiliación PADI pero no aparece en el localizador, es una señal de alerta — o no están realmente afiliados, o su afiliación caducó. Este mismo principio aplica a cualquier agencia que digan.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Tamaño de Grupo Por Guía", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "El tamaño del grupo es uno de los indicadores de calidad más grandes, y rara vez se menciona en el copy de marketing. Un buen operador recreativo maneja de 6 a 8 buzos por guía. Una operación barata de volumen maneja de 15 a 20 buzos por guía, a veces con dos guías dividiendo un grupo de 20 en un bote compartido. La economía de un bote de buceo es en gran parte fija — el bote, combustible, capitán, equipo y permisos cuestan más o menos lo mismo ya sea que haya 6 o 20 buzos a bordo — así que el modelo barato-por-buzo funciona metiendo más gente en el mismo viaje.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "La diferencia bajo el agua es significativa. Con 6 buzos, el guía puede realmente ver a todos, responder rápido a cualquier señal y mantener al grupo lo bastante junto para ver la vida marina que el guía señala. Con 20 buzos, el grupo se dispersa a lo largo de 30 metros de arrecife, el guía pierde contacto visual con individuos y los animales se asustan por la masa de buzos antes de que tengas oportunidad de observarlos. Esto no es una preferencia subjetiva — es una diferencia medible en lo que ves y cuánta atención recibes si necesitas ayuda. Pregunta específicamente: ¿cuántos buzos por guía? Respuestas por encima de 8 a 10 deberían darte pausa.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Calificaciones del Instructor y Experiencia Local", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "Para cursos (Discover Scuba, Open Water, Advanced), las calificaciones de tu instructor específico importan enormemente. Un PADI Open Water Scuba Instructor (OWSI) es la credencial mínima para enseñar cursos de nivel de entrada. Más allá de eso, mira el nivel de experiencia — un instructor enseñando por cinco años en un sitio específico manejará cada situación que el sitio presente; un instructor dos meses en su primer trabajo en un nuevo destino todavía está aprendiendo. Esto no es un golpe a los instructores nuevos, que usualmente están bien supervisados, pero vale la pena saber cuál te va a tocar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "Para inmersiones guiadas (no cursos), el guía debería ser mínimo un Divemaster certificado, aunque muchas tiendas usan Instructores como guías. También vale la pena verificar: ¿el guía realmente conoce los sitios específicos, o está siguiendo una ruta memorizada? Un guía que conoce el arrecife íntimamente te mostrará la morena residente, el pasaje donde los tiburones de arrecife pasan, la formación de coral específica con el pulpo. Un guía que solo está siguiendo un rumbo de brújula te mostrará el mismo rectángulo de arrecife ya sea que sea tu primera inmersión aquí o la décima.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Condición del Equipo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "La condición del equipo de renta es una de las señales visibles del cuidado general de un operador. Cuando llegues a la tienda o el bote, mira el equipo que te están entregando. Las mangueras del regulador deberían estar intactas, no agrietadas ni fugando. Los BCDs deberían mantener el aire cuando se inflan (prueba esto antes de entrar al agua). Las correas de máscara y de aletas deberían estar en buena condición. Los tanques deberían tener sellos recientes de prueba hidrostática (usualmente visibles cerca de la válvula). Los wetsuits deberían estar libres de desgarres grandes. Si el equipo se ve bien mantenido, el operador probablemente maneja una operación estricta en general. Si se ve como si hubiera sido abusado y nunca hubiera recibido servicio, esa es una advertencia más amplia.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Los operadores serios dan servicio a los reguladores anualmente, reemplazan BCDs en rotación e inspeccionan tanques según los cronogramas legales. No fuerzan el equipo hasta que falla y luego solo reemplazan lo que visiblemente se rompió. Esto cuesta dinero y se muestra en el precio — un operador manejando paquetes \"demasiado baratos\" a menudo está recortando esquinas de mantenimiento de equipo o pagando instructores por debajo de las tarifas de la industria, ambos de los cuales afectan la seguridad.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Prácticas de Seguridad y Respuesta a Emergencias", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b15-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Pregúntale al operador sobre su plan de respuesta a emergencias. Una tienda confiable podrá decirte qué pasa si un buzo tiene un incidente — procedimientos de oxígeno en bote, comunicación con servicios de emergencia en tierra, coordinación con la cámara hiperbárica más cercana (en Santo Domingo para operaciones de Punta Cana), y cualquier relación con ", marks: [] },
            { _type: "span", _key: "es-b15-s2", text: "Divers Alert Network", marks: ["es-b15-l1"] },
            { _type: "span", _key: "es-b15-s3", text: ". Muchos operadores serios cargan membresía profesional DAN, que provee cobertura de accidentes para su operación y acceso a la línea de consulta médica 24/7 de DAN. Si la tienda no puede articular su plan de emergencia claramente, es una preocupación genuina — usualmente significa que no tienen uno.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Los botes deberían visiblemente cargar oxígeno (un kit verde con regulador), un kit de primeros auxilios, radio marina, chalecos salvavidas y flotación de superficie. Si no ves este equipo en el bote, pregunta dónde está. \"No lo necesitamos\" no es una respuesta aceptable — toda agencia de certificación lo requiere y todo operador serio lo carga.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Reseñas (Con Escepticismo)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Las reseñas importan pero no son la señal neutral que parecen. Las plataformas agregadoras (TripAdvisor, Viator, GetYourGuide) monetizan el lado del operador tomando comisión en las reservas, lo cual crea conflictos de interés en cómo hacen aparecer a los operadores. Las reseñas de Google son generalmente más confiables porque Google no toma comisión de reserva — los operadores tienen menos capacidad de manipular el ranking. Lee reseñas por patrones en lugar de quejas individuales (una mala reseña puede pasarle a cualquiera; veinte quejas sobre el mismo tema te dicen algo). Busca específicamente menciones de grupos pequeños, briefings enfocados en seguridad, equipo de calidad y guías conocedores. Cuidado con quejas repetidas sobre ser vendidas cosas de más en el bote, precios poco claros o sitios de buceo que no coinciden con lo anunciado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "El conteo de reseñas importa más que la puntuación promedio para operadores muy pequeños (la diferencia entre 4.6 y 4.9 a lo largo de 500 reseñas es mucho más significativa que la misma diferencia en 10 reseñas). Los operadores con solo reseñas recientes elogiosas y sin historial merecen escrutinio extra — a veces son operadores nuevos, a veces manipulación de reseñas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Reservar Directo vs A Través de Terceros", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "Dónde reservas afecta el precio y la flexibilidad que obtienes. Reservar a través de una gran plataforma agregadora típicamente agrega un margen de 15 a 25% que va a la plataforma, no al operador entregando la inmersión. También te encierra en los protocolos rígidos de cancelación y reembolso de la plataforma, que a menudo no acomodan la flexibilidad de clima como lo haría una reserva directa. Reservar a través de un concierge de resort involucra una dinámica similar — muchos resorts operan sobre una base de comisión o kickback con operadores específicos, por eso los mismos pocos nombres se recomiendan sin importar la calidad.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "Reservar directamente con un operador local — vía su sitio web, correo o WhatsApp — usualmente te consigue el precio real del operador sin margen, reprogramación más flexible por clima, comunicación directa con la gente manejando tu inmersión y mejor capacidad de personalizar (\"quiero ver una morena hoy\" o \"preferimos un sitio más tranquilo\"). La reserva directa no es lo mismo que ignorar reseñas — la reputación aún importa — pero una vez identificados los operadores que confías, la directa suele ser el mejor canal.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Capacidades de Idioma", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Para buzos internacionales, la capacidad de idioma del guía importa más de lo que parece. Los briefings de inmersión son críticos para la seguridad — cubren el plan específico, señales de mano, procedimientos de emergencia y detalles del sitio. Un briefing entregado en un idioma que no hablas fluidamente significa que te pierdes información que necesitas. Busca operadores cuyos guías genuinamente hablan tu idioma, no \"apps de traducción y gestos\". En Punta Cana, la mayoría de los operadores serios manejan inglés y español cómodamente; algunos también manejan francés, alemán, italiano o ruso. Pregunta específicamente qué idiomas están disponibles en tus fechas, y confirma antes de reservar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "Transparencia en la Reserva", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "Un operador confiable te da precios claros antes de reservar, por escrito. Esto significa la tarifa base, qué está incluido, cualquier cargo adicional (tarifas de parque marino, recogida de hotel distante, renta de equipo si no está incluida, recargos por tarjeta), la estructura de depósito y la política de cancelación. Si no puedes obtener respuestas claras por escrito, es una advertencia. Los cargos sorpresa del día son una de las quejas más comunes en la industria turística de Punta Cana — los buzos llegan esperando pagar el precio cotizado y encuentran que el equipo, transporte o tarifas de parque no estaban incluidos después de todo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "La estructura de pago también debería ser razonable. Un depósito para asegurar la reserva (típicamente $50 a $100 dependiendo del tipo de viaje) es estándar; que te pidan pagar el monto completo por adelantado en efectivo semanas antes de tu viaje es inusual y digno de cuestionar. Los términos de reembolso y reprogramación deberían estar deletreados — las cancelaciones por clima deberían reembolsar o reprogramar, y las cancelaciones con aviso razonable por parte del buzo deberían ser reembolsables. Todo no reembolsable es una política que solo beneficia al operador.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "Señales de Alerta", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "Unos patrones que consistentemente se correlacionan con operaciones pobres. Sin tienda física o dirección local verificable — un perfil de Instagram y un número de WhatsApp no es una operación de buceo; es un intermediario o un operador muy nuevo sin infraestructura. Negarse a proveer precios claros por escrito. Precios extremadamente bajos comparado con el mercado — inmersiones de 2 tanques en Punta Cana a $60 a $80 son casi siempre operaciones que recortan esquinas porque el costo real de manejar un bote de buceo seguro es más alto que eso. Tamaños de grupo por encima de 15 buzos por guía. Afiliación de agencia de certificación vaga o ausente. Sin equipo de seguridad visible en el bote. Respuestas vagas o defensivas a preguntas de seguridad. Negarse a dejarte ver el bote o el equipo antes del día de la inmersión.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "La señal de alerta más fuerte: tácticas de presión. Cualquier operador que trate de apurar tu decisión, insista en el pago antes de que hayas visto la operación, o te presione a upgrades en el bote está mostrándote cómo trata a los clientes cuando tiene tu dinero. Los operadores serios no necesitan presionar — su reputación y reseñas hacen la venta.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "Preguntas para Hacer Antes de Reservar", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "Las preguntas específicas que separan una conversación real con el operador de un folleto de marketing. ¿A qué agencia de certificación están afiliados, y puedo verificarlo en el sitio de su agencia? ¿Cuántos buzos por guía es tu grupo típico? ¿Qué sitios probablemente visitaremos para mi nivel de certificación? ¿Cuál es tu política de cancelación y reprogramación por clima? ¿Qué está incluido en el precio cotizado, y qué no? ¿Qué equipo de seguridad carga el bote? ¿Tienen membresía profesional DAN o equivalente? ¿Cuál es tu protocolo de respuesta a emergencias? ¿Quién es mi instructor o guía, y cuál es su nivel de experiencia? ¿En qué idioma será el briefing?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b33-s1", text: "Un operador serio contestará estas directamente, sin evadir o ponerse defensivo. Un mal operador cambiará el tema, prometerá vagamente, o te empujará a reservar antes de que hayas obtenido respuestas. La calidad de la respuesta es a menudo más informativa que las respuestas específicas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b34-s1", text: "Cómo Aplica Esto a Grand Bay", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b35",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b35-l1", href: "https://www.grandbay-puntacana.com/es" },
            { _type: "link", _key: "es-b35-l2", href: "https://www.grandbay-puntacana.com/es/courses" },
          ],
          children: [
            { _type: "span", _key: "es-b35-s1", text: "Así es como ", marks: [] },
            { _type: "span", _key: "es-b35-s2", text: "Grand Bay", marks: ["es-b35-l1"] },
            { _type: "span", _key: "es-b35-s3", text: " se compara en cada criterio de arriba, para que puedas compararnos con otros de forma justa. Afiliados a PADI, verificable en el localizador de centros de buceo de PADI. Grupos limitados a 6 a 8 buzos por guía. Instructores y guías que trabajan los mismos sitios diariamente y los conocen íntimamente. Equipo con servicio en cronogramas del fabricante, no por rotura. Protocolo de emergencia escrito incluyendo oxígeno en bote, radio marina y coordinación con la cámara hiperbárica de Santo Domingo. Briefings a nivel nativo en inglés y español. Precios transparentes por escrito antes de reservar. Política de cancelación de 48 horas con reembolsos completos por clima. Reserva directa vía ", marks: [] },
            { _type: "span", _key: "es-b35-s4", text: "nuestro sitio web", marks: ["es-b35-l2"] },
            { _type: "span", _key: "es-b35-s5", text: " o WhatsApp — sin margen de agregador, sin estructura de comisión de resort.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b36",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b36-s1", text: "Eso no es una afirmación de que somos el único operador serio en Punta Cana — hay otros dignos de considerar. Es una plantilla de cómo evaluar cualquier operador en los criterios que realmente importan. Hazles a otras tiendas las mismas preguntas, verifica sus respuestas independientemente, y elige la que te dé confianza.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b37",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b37-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b38",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b38-l1", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b38-s1", text: "Un operador de buceo serio es verificable, transparente, de grupo pequeño, bien equipado y responde a preguntas de seguridad. El precio solo no es la señal — las operaciones de buceo tienen costos reales y viajes peligrosamente subvalorados usualmente significan esquinas recortadas en alguna parte. La afiliación de certificación, tamaño de grupo, condición del equipo y cómo el operador contesta preguntas de seguridad te dicen más que las puntuaciones de estrellas en sitios agregadores. Si quieres compararnos específicamente contra cualquier otro operador que estés considerando, escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b38-s2", text: "WhatsApp", marks: ["es-b38-l1"] },
            { _type: "span", _key: "es-b38-s3", text: " y respondemos cualquier pregunta específica directamente. Si no somos el fit correcto para tu viaje, te lo diremos.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "How to Choose a Reputable Dive Shop in Punta Cana (2026 Guide)",
          description:
            "PADI affiliation, group size, gear condition, safety protocols, and specific red flags. The full checklist for evaluating a Punta Cana dive operator before you book.",
          keywords: ["choose dive shop punta cana", "best dive shop punta cana", "reputable scuba operator", "dive shop red flags", "PADI dive center punta cana"],
        },
        es: {
          title: "Cómo Elegir una Tienda de Buceo Confiable en Punta Cana (2026)",
          description:
            "Afiliación PADI, tamaño de grupo, condición del equipo, protocolos de seguridad y señales de alerta específicas. La lista completa para evaluar un operador de buceo en Punta Cana antes de reservar.",
          keywords: ["elegir tienda buceo punta cana", "mejor tienda buceo punta cana", "operador buceo serio", "señales alerta buceo", "centro PADI punta cana"],
        },
      },
      openGraph: {
        en: {
          title: "How to Choose a Reputable Dive Shop in Punta Cana",
          description: "Certification, group size, gear condition, safety practices, and red flags. A full evaluation framework for picking a Punta Cana dive operator that runs safe, well-organized trips.",
        },
        es: {
          title: "Cómo Elegir una Tienda de Buceo Confiable en Punta Cana",
          description: "Certificación, tamaño de grupo, condición del equipo, prácticas de seguridad y señales de alerta. Un marco completo para elegir un operador que maneje inmersiones seguras y bien organizadas.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "How to Choose a Reputable Dive Shop in Punta Cana",
          description: "A comprehensive framework for evaluating dive operators in Punta Cana. Covers certification agency affiliation (PADI, SSI, SDI) and independent verification, group size per guide (6-8 reputable vs 15-20 volume operators), instructor qualifications and local experience, equipment condition inspection tips, safety practices and emergency response including DAN professional membership, review skepticism (aggregator conflicts vs Google reviews), direct booking vs aggregator markup, language capabilities for briefings, booking transparency and pricing clarity, red flags (no local address, extreme underpricing, large groups, pressure tactics), specific questions to ask before booking, and Grand Bay's transparent stack against each criterion.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/how-to-choose-dive-shop-punta-cana",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Cómo Elegir una Tienda de Buceo Confiable en Punta Cana",
          description: "Un marco completo para evaluar operadores de buceo en Punta Cana. Cubre afiliación a agencia de certificación (PADI, SSI, SDI) y verificación independiente, tamaño de grupo por guía (6-8 operadores serios vs 15-20 operadores de volumen), calificaciones del instructor y experiencia local, tips de inspección de la condición del equipo, prácticas de seguridad y respuesta a emergencias incluyendo membresía profesional DAN, escepticismo hacia reseñas (conflictos de agregadores vs reseñas de Google), reserva directa vs margen de agregador, capacidades de idioma para briefings, transparencia de reservas y claridad de precios, señales de alerta (sin dirección local, precios extremadamente bajos, grupos grandes, tácticas de presión), preguntas específicas para hacer antes de reservar, y cómo se compara Grand Bay contra cada criterio.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/how-to-choose-dive-shop-punta-cana",
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