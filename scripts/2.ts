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
      en: "🎒 Do I Need to Bring My Own Scuba Gear to Punta Cana?",
      es: "🎒 ¿Necesito Traer Mi Propio Equipo de Buceo a Punta Cana?",
    },

    slug: {
      _type: "slug",
      current: "bring-own-scuba-gear-punta-cana",
    },

    publishDate: "2026-07-04",

    description: {
      _type: "localizedText",
      en: "Short answer: no. Full rental gear is provided. Here's what's actually included, what you should still bring, and when traveling with your own gear is worth the luggage weight.",
      es: "Respuesta corta: no. Se proporciona equipo completo de renta. Aquí lo que realmente está incluido, qué deberías traer de todas formas y cuándo vale la pena viajar con tu propio equipo.",
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
            { _type: "span", _key: "en-b1-s1", text: "Short answer: no, you don't need to bring your own scuba gear to Punta Cana. Full rental equipment is included with every course and guided dive at Grand Bay of the Sea, and the same is true at most reputable dive centers in the area. That said, some divers still choose to travel with their own gear for reasons ranging from fit preferences to sentimental attachment to a mask they've owned for a decade. This post covers what's actually included in the rental, what you should still pack regardless of the operator's rental policy, when bringing your own is genuinely worth the luggage weight, and when it's just an unnecessary hassle.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "What's Included in the Rental", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b3-l1", href: "https://www.grandbay-puntacana.com/courses" },
          ],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "Full rental gear at Grand Bay includes everything you need to get in the water on ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "any course or guided dive", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: ": buoyancy compensator (BCD), regulator with alternate air source, submersible pressure gauge (SPG) or dive computer, tank (usually 12-liter aluminum), weights and weight belt, wetsuit (3mm shorty or full 3mm based on season), mask, snorkel, and fins. Everything is checked and serviced regularly. You show up in a swimsuit with your certification card and we handle the rest.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "For sizing, we ask about your height and weight during booking so we can pre-select gear that will fit before you arrive. This matters most for BCDs (which come in XS through XXL) and wetsuits (same sizing range), less so for regulators and masks, which have some universal adjustment. Adjustments happen at the shop before you head out, so if something doesn't fit right, we swap it before it becomes a problem on the boat.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "What You Should Bring Regardless", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "There's a short list of things you should always bring on a dive trip regardless of whether you're renting or using your own gear. Your certification card (C-card) is essential for anything beyond a Discover Scuba Diving experience — the plastic version, a photo of it on your phone, or a printout all work. Your logbook is useful but not strictly required. A dive computer is included in the rental if you don't own one, but if you do own one, bring it — it has your personal history and settings.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "Beyond that: a swimsuit (or two — one for morning, one dry for the ride home), a rashguard for sun and light thermal protection, a lightweight towel that dries fast, reef-safe mineral sunscreen (chemical sunscreens damage coral and get you side-eyed by dive guides), a refillable water bottle, and cash for the balance of your dive fee, tipping the boat crew, and any lunch or drinks. Cards work at the shop with a small processing fee but cash is more efficient day-of.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "What's Worth Bringing If You Own It", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "Your own mask. ", marks: ["strong"] },
            { _type: "span", _key: "en-b9-s2", text: "This is the single piece of gear most worth bringing if you own one that fits well. Mask fit is highly personal — face shapes vary a lot, and a mask that seals perfectly on you might leak constantly on someone else. If you have a mask you know works, bring it. It weighs almost nothing, packs flat, and eliminates one variable that can ruin a dive if the rental doesn't fit your face well. Add a defog solution to the checked-luggage bag while you're at it.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "Your own dive computer. ", marks: ["strong"] },
            { _type: "span", _key: "en-b10-s2", text: "If you own one, definitely bring it. Your computer has been tracking your dive history — surface intervals, previous nitrogen loads, personal preferences — and continuing that record is genuinely useful. Rental computers work fine but start each dive from scratch, which means the algorithm treats you as a first-day diver every time. That's conservative, which is safe, but not as tailored as your own device.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "Your own wetsuit (if you're thermally sensitive). ", marks: ["strong"] },
            { _type: "span", _key: "en-b11-s2", text: "Rental wetsuits fit a broad range of body types acceptably but few of them fit perfectly. If you've dialed in a specific brand and fit that works for your body, bringing it means you'll be comfortable from dive one instead of adapting to something slightly off. This matters more in December through March when water is coolest and thermal fit affects comfort more directly.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Your own fins. ", marks: ["strong"] },
            { _type: "span", _key: "en-b12-s2", text: "Somewhat worth bringing if you're serious about your fin choice. Fin efficiency, comfort, and kick style differ a lot between models. If you've dialed in a specific style (split fins, jet fins, full-foot fins for warm water), bringing them is worth it. If you're neutral on fins, rental is fine. Fins take up meaningful luggage space, which is the main downside.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "What's Not Worth Bringing", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "BCD. ", marks: ["strong"] },
            { _type: "span", _key: "en-b14-s2", text: "Unless you're doing serious technical diving or have very specific configuration needs, traveling with a BCD is rarely worth it. BCDs are heavy (typically 2 to 4 kg), bulky in luggage, and rental BCDs at reputable shops are perfectly serviceable for recreational diving. The weight in your checked luggage is often the deciding factor — a BCD alone can put you over airline limits and cost more in overweight fees than a week of rental would.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Regulator. ", marks: ["strong"] },
            { _type: "span", _key: "en-b15-s2", text: "Same logic. A regulator is precision equipment, expensive to replace if damaged in transit, and heavy for its size. Reputable rental regulators are serviced regularly and function as well as personal gear for recreational depths. Bringing your own is a personal preference that comes with a real risk of TSA or baggage handling damage. If you do bring yours, hand-carry it in your carry-on rather than checking it.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "Tank. ", marks: ["strong"] },
            { _type: "span", _key: "en-b16-s2", text: "This one shouldn't need saying, but occasionally we get asked. Airline regulations require tanks to be shipped completely empty with valve open, and even then, most divers find the logistics not worth the payoff. Rental tanks are perfectly adequate; skip this.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "Weights. ", marks: ["strong"] },
            { _type: "span", _key: "en-b17-s2", text: "Universally not worth bringing. Weights are the heaviest item per volume you could pack, they're provided everywhere, and airline weight limits make them impractical.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Travel Considerations for Personal Gear", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "If you decide to bring some or all of your own gear, a few practical notes. Airline checked luggage weight limits vary but 23 kg (50 lbs) is common on transatlantic flights. A full set of dive gear can easily exceed that, so know your specific airline's rules and consider a second checked bag if needed (usually cheaper than overweight fees). Bring a padded gear bag rather than throwing gear loose into a suitcase — baggage handling is not gentle.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "For TSA and security, dive gear generally scans fine but occasionally triggers manual inspection. Regulators, dive computers, and cameras are the most commonly flagged items. Allow extra time at security, keep dive gear in easily-openable bags, and if you're traveling with a hard-shell dive computer, know that TSA sometimes asks to power it on to verify it's not a threat. Photos of gear pre-trip are useful for insurance claims if anything gets damaged in transit.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "Insurance for dive gear is worth thinking about if you're bringing anything valuable. Standard travel insurance often excludes dive equipment or has low sub-limits; specialized dive insurance from DAN (Divers Alert Network) covers both dive-related medical and equipment for reasonable annual rates. If you're checking a $2,000 regulator and computer setup, an $80 annual DAN membership pays for itself the first time anything happens.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "Quality of Rental Gear at Grand Bay", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "A fair question: how good is the rental gear, actually? Every dive shop makes claims about their equipment, and quality varies significantly across the Punta Cana market. Our BCDs are name-brand recreational BCDs (Cressi, Scubapro, Mares depending on the model), regulators are serviced annually per manufacturer specs, computers are current-generation Suunto or similar, and wetsuits are replaced regularly as they wear. The dive industry moves toward better rental fleets than it used to — a well-maintained modern rental setup is genuinely comparable to personal gear for the recreational depths we dive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "If you're renting anywhere in Punta Cana, a good habit is to inspect your rental gear on day one before you get to the boat. Check that the BCD inflator works both ways (inflate and deflate). Check that both second stages of the regulator produce air. Check the SPG or computer for accurate reading. Check that the mask seals on your face without straps. Any dive shop worth booking with should not just tolerate but welcome this check — it's basic dive safety, and shops that resist show you what they think about accountability.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "When Personal Gear Genuinely Makes Sense", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "Some scenarios where bringing your own full setup is genuinely worth the trouble. Advanced divers doing multi-week trips where the cumulative rental cost approaches the shipping cost of your own gear. Divers with specific configuration needs (side-mount, technical diving setups, rebreathers) that rental fleets don't typically cover. Divers with hard-to-fit body types (very short, very tall, unusually wide or narrow torso) where rental BCDs and wetsuits are consistently uncomfortable. Divers with specific certifications (Sidemount, Cavern, Tec 40) that require specialized equipment. Recreational-depth Caribbean tourism diving doesn't usually cross any of these thresholds — most travelers renting for a week are making the right call.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "The Middle Ground: Selective Personal Gear", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "For most divers, the sensible pattern is bringing a few personal items and renting the rest. Mask, computer, and maybe fins in your luggage; BCD, regulator, wetsuit, weights, and tank from the shop. That combination gives you the fit and comfort benefits of personal gear on the pieces that matter most, without the luggage weight and transit risk of the pieces that don't. It's what most experienced traveling divers land on after a few trips.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "If you're a first-time traveling diver figuring out your own preferences, the simplest starting point is to rent everything on your first Caribbean trip and see what works. You'll learn where rental gear is fine and where it isn't — and you'll be able to shop for your own gear with the knowledge of what specifically bothers you about rental versions. This is usually a better path than buying gear before your first trip based on manufacturer marketing.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "Course Students and Rental", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b31-l1", href: "https://www.grandbay-puntacana.com/courses/openwater" },
            { _type: "link", _key: "en-b31-l2", href: "https://www.grandbay-puntacana.com/courses/discover" },
          ],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "If you're taking a course — ", marks: [] },
            { _type: "span", _key: "en-b31-s2", text: "Open Water certification", marks: ["en-b31-l1"] },
            { _type: "span", _key: "en-b31-s3", text: " or a ", marks: [] },
            { _type: "span", _key: "en-b31-s4", text: "Discover Scuba Diving experience", marks: ["en-b31-l2"] },
            { _type: "span", _key: "en-b31-s5", text: " — you should definitely rent all your gear. There's no reason for a first-time student to travel with equipment they haven't chosen yet, and PADI courses are specifically designed around standard rental configurations. Get through the course, understand what fits and what doesn't, and then think about buying gear afterward if you plan to keep diving. Buying dive gear before your first course is one of the more common expensive mistakes new divers make.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx1-s1", text: "Buying Your Own Gear After the First Trip", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx2-s1", text: "Most divers who keep diving after their first trip eventually build a personal gear kit. The smart order of purchase, based on years of watching divers figure this out, is roughly: mask first (biggest personal fit variable, cheapest, packs easily), then dive computer (biggest safety and convenience upgrade for around $200 to $400), then fins if you have preferences on kick style, then wetsuit if you dive frequently in cool water, and finally BCD and regulator once you're clear on what configuration works for you. Buying the full kit upfront before you've dived enough to know your preferences is one of the most common expensive mistakes new divers make.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx3-s1", text: "A useful heuristic: after each trip, note what specifically annoyed you about the rental gear. If nothing did, keep renting — you're saving money and travel weight. If something consistently annoyed you (mask fit, fin power, computer interface), that's the next piece worth buying. Buying gear based on what you've actually experienced tends to produce a better collection than buying based on manufacturer marketing.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx4-s1", text: "What Rental Fees Actually Cover", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx5",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx5-s1", text: "One question that comes up occasionally: is rental gear an extra fee on top of the dive price, or is it included? At Grand Bay, all rental equipment is included in the price of guided dives and courses — no separate gear fee. That's not universal across the industry (some operators charge $15 to $30 per dive extra for gear), so it's worth checking with any operator you're comparing pricing against. The way pricing is structured says something about how the operator thinks about their customer relationship — bundled all-in-one pricing is simpler and usually reflects a shop that assumes you'll rent, versus itemized pricing that assumes you might BYO.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx6-s1", text: "One thing rental doesn't cover: replacement cost if you lose or damage a piece of gear. Rental gear is treated as expected wear, not fragile — normal use is fine — but if you lose a fin over the side of the boat or crack a mask on the ladder, we do ask you to cover the replacement. This is rare and shouldn't factor into your decision to rent, but it's worth knowing so nothing feels surprising if it happens.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "The Bottom Line", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b33-l1", href: "https://www.grandbay-puntacana.com/sites" },
            { _type: "link", _key: "en-b33-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b33-s1", text: "For a Punta Cana dive trip, the practical default is: rent the heavy stuff, bring the personal stuff. BCD, regulator, tank, weights, wetsuit — all rental, all included in the price of your ", marks: [] },
            { _type: "span", _key: "en-b33-s2", text: "guided dives or courses", marks: ["en-b33-l1"] },
            { _type: "span", _key: "en-b33-s3", text: ". Mask, computer, and fins are worth bringing if you own them and love them. Everything else stays at home. If you have specific questions about our rental fleet — brand, size availability, anything unusual — message us on ", marks: [] },
            { _type: "span", _key: "en-b33-s4", text: "WhatsApp", marks: ["en-b33-l2"] },
            { _type: "span", _key: "en-b33-s5", text: " before your trip and we'll confirm exactly what we can provide for your dates.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "Respuesta corta: no, no necesitas traer tu propio equipo de buceo a Punta Cana. El equipo completo de renta está incluido con cada curso e inmersión guiada en Grand Bay of the Sea, y lo mismo es cierto en la mayoría de los centros de buceo reputados de la zona. Dicho eso, algunos buzos deciden viajar con su propio equipo por razones que van desde preferencias de talla hasta apego sentimental a una máscara que llevan una década usando. Esta publicación cubre qué está realmente incluido en la renta, qué deberías empacar de todas formas sin importar la política de renta del operador, cuándo traer el tuyo vale genuinamente el peso en la maleta y cuándo es solo una molestia innecesaria.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "Qué Está Incluido en la Renta", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b3-l1", href: "https://www.grandbay-puntacana.com/es/courses" },
          ],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "El equipo completo de renta en Grand Bay incluye todo lo que necesitas para meterte al agua en ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "cualquier curso o inmersión guiada", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: ": chaleco compensador (BCD), regulador con fuente alterna de aire, manómetro sumergible (SPG) o computador de buceo, tanque (usualmente de aluminio de 12 litros), plomos y cinturón, wetsuit (shorty de 3mm o traje completo de 3mm según la temporada), máscara, snorkel y aletas. Todo se revisa y se le da mantenimiento regularmente. Llegas en traje de baño con tu tarjeta de certificación y nosotros nos encargamos del resto.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "Para las tallas, preguntamos por tu altura y peso durante la reserva para preseleccionar equipo que te quede antes de que llegues. Esto importa más para los BCDs (que vienen desde XS hasta XXL) y wetsuits (mismo rango), menos para reguladores y máscaras, que tienen algún ajuste universal. Los ajustes ocurren en la tienda antes de salir, así que si algo no queda bien, lo cambiamos antes de que sea un problema en el bote.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Qué Deberías Traer de Todas Formas", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "Hay una lista corta de cosas que siempre deberías traer en un viaje de buceo, sin importar si rentas o usas tu propio equipo. Tu tarjeta de certificación (C-card) es esencial para cualquier cosa más allá de una experiencia Discover Scuba Diving — la versión de plástico, una foto en tu teléfono o una impresión funcionan. Tu bitácora es útil pero no estrictamente requerida. Un computador de buceo está incluido en la renta si no tienes uno, pero si tienes uno, tráelo — tiene tu historial personal y ajustes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "Más allá de eso: un traje de baño (o dos — uno para la mañana, uno seco para el viaje de regreso), una lycra para sol y protección térmica ligera, una toalla liviana que se seque rápido, protector solar mineral reef-safe (los químicos dañan el coral y te ganan miradas raras de los guías de buceo), una botella recargable de agua y efectivo para el saldo de tu tarifa de buceo, propina a la tripulación del bote y cualquier almuerzo o bebida. Las tarjetas funcionan en la tienda con un pequeño cargo por procesamiento pero el efectivo es más eficiente el día de.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Qué Vale la Pena Traer si lo Tienes", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "Tu propia máscara. ", marks: ["strong"] },
            { _type: "span", _key: "es-b9-s2", text: "Esta es la sola pieza de equipo que más vale la pena traer si tienes una que te queda bien. El ajuste de la máscara es altamente personal — las formas de cara varían mucho, y una máscara que sella perfectamente en ti puede filtrar constantemente en otra persona. Si tienes una máscara que sabes que te funciona, tráela. Casi no pesa, empaca plana y elimina una variable que puede arruinar una inmersión si la de renta no se ajusta bien a tu cara. Agrega una solución antivaho a la maleta facturada de paso.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "Tu propio computador de buceo. ", marks: ["strong"] },
            { _type: "span", _key: "es-b10-s2", text: "Si tienes uno, definitivamente tráelo. Tu computador ha estado rastreando tu historial — intervalos de superficie, cargas previas de nitrógeno, preferencias personales — y continuar ese registro es genuinamente útil. Los computadores de renta funcionan bien pero empiezan cada inmersión desde cero, lo que significa que el algoritmo te trata como buzo de primer día cada vez. Eso es conservador, lo cual es seguro, pero no tan a la medida como tu propio dispositivo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Tu propio wetsuit (si eres térmicamente sensible). ", marks: ["strong"] },
            { _type: "span", _key: "es-b11-s2", text: "Los wetsuits de renta le quedan a una amplia gama de tipos de cuerpo aceptablemente pero pocos les quedan perfectamente. Si tienes un modelo específico que le queda a tu cuerpo, traerlo significa que estarás cómodo desde la primera inmersión en lugar de adaptarte a algo ligeramente descuadrado. Esto importa más de diciembre a marzo cuando el agua está más fresca y el ajuste térmico afecta la comodidad más directamente.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "Tus propias aletas. ", marks: ["strong"] },
            { _type: "span", _key: "es-b12-s2", text: "Algo digno de traer si eres serio con tu elección de aletas. La eficiencia, comodidad y estilo de patada difieren mucho entre modelos. Si tienes un estilo específico dialogado (aletas partidas, jet fins, aletas de calzo cerrado para agua cálida), vale la pena traerlas. Si eres neutro respecto a las aletas, la renta está bien. Las aletas ocupan espacio significativo en la maleta, que es la desventaja principal.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Qué No Vale la Pena Traer", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "BCD. ", marks: ["strong"] },
            { _type: "span", _key: "es-b14-s2", text: "A menos que estés haciendo buceo técnico serio o tengas necesidades de configuración muy específicas, viajar con un BCD rara vez vale la pena. Los BCDs son pesados (típicamente 2 a 4 kg), voluminosos en la maleta, y los BCDs de renta en tiendas serias son perfectamente funcionales para buceo recreativo. El peso en tu maleta facturada suele ser el factor decisivo — un BCD solo puede ponerte sobre los límites de la aerolínea y costarte más en cargos por sobrepeso de lo que costaría una semana de renta.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Regulador. ", marks: ["strong"] },
            { _type: "span", _key: "es-b15-s2", text: "Misma lógica. Un regulador es equipo de precisión, caro de reemplazar si se daña en tránsito, y pesado para su tamaño. Los reguladores de renta serios reciben servicio regularmente y funcionan tan bien como equipo personal para las profundidades recreativas. Traer el tuyo es una preferencia personal que viene con un riesgo real de daño por TSA o manejo de equipaje. Si traes el tuyo, llévalo en tu equipaje de mano en lugar de facturarlo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Tanque. ", marks: ["strong"] },
            { _type: "span", _key: "es-b16-s2", text: "Esto no debería necesitar decirse, pero ocasionalmente nos preguntan. Las regulaciones de aerolínea requieren que los tanques se envíen completamente vacíos con la válvula abierta, e incluso así, la mayoría de los buzos encuentran que la logística no vale la pena por el beneficio. Los tanques de renta son perfectamente adecuados; sáltate esto.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Plomos. ", marks: ["strong"] },
            { _type: "span", _key: "es-b17-s2", text: "Universalmente no vale la pena traerlos. Los plomos son lo más pesado por volumen que podrías empacar, están disponibles en todos lados, y los límites de peso de aerolínea los hacen poco prácticos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Consideraciones de Viaje para Equipo Personal", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Si decides traer algo o todo tu propio equipo, unas notas prácticas. Los límites de peso para maleta facturada de las aerolíneas varían pero 23 kg (50 lbs) es común en vuelos transatlánticos. Un set completo de equipo de buceo puede exceder eso fácil, así que conoce las reglas específicas de tu aerolínea y considera una segunda maleta facturada si es necesario (usualmente más barato que los cargos por sobrepeso). Trae una bolsa de equipo acolchada en lugar de tirar el equipo suelto en una maleta — el manejo de equipaje no es gentil.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Para TSA y seguridad, el equipo de buceo generalmente pasa bien pero ocasionalmente activa una inspección manual. Reguladores, computadores de buceo y cámaras son los ítems más comúnmente marcados. Deja tiempo extra en seguridad, mantén el equipo de buceo en bolsas fáciles de abrir, y si viajas con un computador de buceo de carcasa dura, ten en cuenta que TSA a veces pide encenderlo para verificar que no es una amenaza. Fotos del equipo antes del viaje son útiles para reclamos de seguro si algo se daña en tránsito.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "El seguro para el equipo de buceo vale la pena considerarlo si traes algo valioso. El seguro de viaje estándar a menudo excluye equipo de buceo o tiene sublímites bajos; el seguro especializado de buceo de DAN (Divers Alert Network) cubre tanto lo médico relacionado con buceo como el equipo por tarifas anuales razonables. Si estás facturando un set de regulador y computador de $2.000, una membresía anual DAN de $80 se paga sola la primera vez que pase cualquier cosa.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "Calidad del Equipo de Renta en Grand Bay", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Una pregunta justa: ¿qué tan bueno es el equipo de renta en realidad? Cada tienda de buceo hace afirmaciones sobre su equipo, y la calidad varía significativamente en el mercado de Punta Cana. Nuestros BCDs son BCDs recreativos de marca (Cressi, Scubapro, Mares según el modelo), los reguladores reciben servicio anual según especificaciones del fabricante, los computadores son Suunto o similar de generación actual, y los wetsuits se reemplazan regularmente conforme se desgastan. La industria del buceo se mueve hacia mejores flotas de renta que antes — un setup de renta moderno bien mantenido es genuinamente comparable al equipo personal para las profundidades recreativas que buceamos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Si rentas en cualquier lugar de Punta Cana, un buen hábito es inspeccionar tu equipo de renta el día uno antes de llegar al bote. Verifica que el inflador del BCD funcione en los dos sentidos (inflar y desinflar). Verifica que ambas etapas segundas del regulador produzcan aire. Verifica el SPG o computador para lectura precisa. Verifica que la máscara selle en tu cara sin correas. Cualquier tienda de buceo con la que valga la pena reservar no solo debería tolerar sino agradecer esta revisión — es seguridad básica de buceo, y las tiendas que se resisten te muestran lo que piensan sobre responsabilidad.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "Cuándo Traer Equipo Personal Sí Tiene Sentido", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "Algunos escenarios donde traer tu propio setup completo sí vale la pena el trabajo. Buzos avanzados haciendo viajes de varias semanas donde el costo acumulado de renta se acerca al costo de envío de tu propio equipo. Buzos con necesidades de configuración específicas (side-mount, setups técnicos, rebreathers) que las flotas de renta típicamente no cubren. Buzos con tipos de cuerpo difíciles de tallar (muy bajos, muy altos, torso inusualmente ancho o angosto) donde los BCDs y wetsuits de renta son consistentemente incómodos. Buzos con certificaciones específicas (Sidemount, Cavern, Tec 40) que requieren equipo especializado. El turismo caribeño a profundidades recreativas usualmente no cruza ninguno de estos umbrales — la mayoría de los viajeros rentando por una semana están tomando la decisión correcta.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "El Punto Medio: Equipo Personal Selectivo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "Para la mayoría de los buzos, el patrón sensato es traer unos pocos ítems personales y rentar el resto. Máscara, computador y quizás aletas en tu maleta; BCD, regulador, wetsuit, plomos y tanque desde la tienda. Esa combinación te da los beneficios de ajuste y comodidad del equipo personal en las piezas que más importan, sin el peso en maleta ni el riesgo de tránsito de las piezas que no. Es donde aterrizan la mayoría de los buzos viajeros experimentados después de unos cuantos viajes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "Si eres un buzo viajero primerizo averiguando tus propias preferencias, el punto de partida más simple es rentar todo en tu primer viaje al Caribe y ver qué funciona. Vas a aprender dónde el equipo de renta está bien y dónde no — y vas a poder comprar tu propio equipo con el conocimiento de qué específicamente te molesta de las versiones de renta. Este suele ser un mejor camino que comprar equipo antes de tu primer viaje basado en el marketing del fabricante.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "Estudiantes de Curso y Renta", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b31-l1", href: "https://www.grandbay-puntacana.com/es/courses/openwater" },
            { _type: "link", _key: "es-b31-l2", href: "https://www.grandbay-puntacana.com/es/courses/discover" },
          ],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "Si estás tomando un curso — ", marks: [] },
            { _type: "span", _key: "es-b31-s2", text: "certificación Open Water", marks: ["es-b31-l1"] },
            { _type: "span", _key: "es-b31-s3", text: " o una ", marks: [] },
            { _type: "span", _key: "es-b31-s4", text: "experiencia Discover Scuba Diving", marks: ["es-b31-l2"] },
            { _type: "span", _key: "es-b31-s5", text: " — definitivamente deberías rentar todo tu equipo. No hay razón para que un estudiante primerizo viaje con equipo que aún no ha elegido, y los cursos PADI están específicamente diseñados alrededor de configuraciones estándar de renta. Termina el curso, entiende qué te queda y qué no, y luego piensa en comprar equipo después si planeas seguir buceando. Comprar equipo de buceo antes de tu primer curso es uno de los errores caros más comunes que cometen los buzos nuevos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx1-s1", text: "Comprar tu Propio Equipo Después del Primer Viaje", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx2-s1", text: "La mayoría de los buzos que siguen buceando después de su primer viaje eventualmente arman un kit personal. El orden inteligente de compra, basado en años viendo a los buzos resolverlo, es aproximadamente: máscara primero (la variable de ajuste personal más grande, la más barata, empaca fácil), luego computador de buceo (la mayor mejora de seguridad y comodidad por unos $200 a $400), luego aletas si tienes preferencias sobre estilo de patada, luego wetsuit si buceas frecuentemente en agua fresca, y finalmente BCD y regulador una vez que tienes claro qué configuración te funciona. Comprar el kit completo por adelantado antes de haber buceado lo suficiente para conocer tus preferencias es uno de los errores caros más comunes que cometen los buzos nuevos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx3-s1", text: "Un heurístico útil: después de cada viaje, anota qué específicamente te molestó del equipo de renta. Si nada te molestó, sigue rentando — estás ahorrando dinero y peso de viaje. Si algo te molestó consistentemente (ajuste de máscara, potencia de aleta, interfaz de computador), esa es la siguiente pieza que vale la pena comprar. Comprar equipo basado en lo que realmente has experimentado tiende a producir una mejor colección que comprar basado en el marketing del fabricante.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx4-s1", text: "Qué Cubren Realmente las Tarifas de Renta", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx5",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx5-s1", text: "Una pregunta que sale ocasionalmente: ¿el equipo de renta es una tarifa extra sobre el precio de la inmersión, o está incluido? En Grand Bay, todo el equipo de renta está incluido en el precio de las inmersiones guiadas y los cursos — sin tarifa de equipo por separado. Esto no es universal en la industria (algunos operadores cobran $15 a $30 extra por inmersión por el equipo), así que vale la pena verificar con cualquier operador con el que compares precios. La forma en que está estructurado el precio dice algo sobre cómo el operador piensa sobre su relación con el cliente — el precio todo incluido es más simple y usualmente refleja una tienda que asume que rentarás, versus el precio detallado que asume que podrías traer el tuyo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx6-s1", text: "Algo que la renta no cubre: costo de reemplazo si pierdes o dañas una pieza de equipo. El equipo de renta se trata como desgaste esperado, no frágil — el uso normal está bien — pero si pierdes una aleta por el costado del bote o rompes una máscara en la escalera, sí te pedimos que cubras el reemplazo. Esto es raro y no debería influir en tu decisión de rentar, pero vale la pena saberlo para que nada se sienta sorpresivo si pasa.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b33-l1", href: "https://www.grandbay-puntacana.com/es/sites" },
            { _type: "link", _key: "es-b33-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b33-s1", text: "Para un viaje de buceo a Punta Cana, la opción práctica por defecto es: renta lo pesado, trae lo personal. BCD, regulador, tanque, plomos, wetsuit — todo de renta, todo incluido en el precio de tus ", marks: [] },
            { _type: "span", _key: "es-b33-s2", text: "inmersiones guiadas o cursos", marks: ["es-b33-l1"] },
            { _type: "span", _key: "es-b33-s3", text: ". Máscara, computador y aletas vale la pena traer si los tienes y los amas. Todo lo demás se queda en casa. Si tienes preguntas específicas sobre nuestra flota de renta — marca, disponibilidad de tallas, cualquier cosa inusual — escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b33-s4", text: "WhatsApp", marks: ["es-b33-l2"] },
            { _type: "span", _key: "es-b33-s5", text: " antes de tu viaje y te confirmamos exactamente qué podemos proporcionar para tus fechas.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "Do I Need to Bring My Own Scuba Gear to Punta Cana? (2026)",
          description:
            "Short answer: no. Full rental gear is provided at Grand Bay. Here's what's included, what you should still bring, and when your own gear is worth the luggage weight.",
          keywords: ["scuba gear punta cana rental", "bring own scuba gear punta cana", "dive gear rental dominican republic", "scuba equipment punta cana", "dive travel gear"],
        },
        es: {
          title: "¿Necesito Traer Mi Propio Equipo de Buceo a Punta Cana? (2026)",
          description:
            "Respuesta corta: no. Equipo completo de renta incluido en Grand Bay. Aquí lo que está incluido, qué deberías traer de todas formas y cuándo el tuyo vale la pena.",
          keywords: ["equipo buceo punta cana renta", "traer equipo buceo punta cana", "renta equipo buceo republica dominicana", "equipo scuba punta cana"],
        },
      },
      openGraph: {
        en: {
          title: "Do I Need to Bring My Own Scuba Gear to Punta Cana?",
          description: "Full rental gear is included at Grand Bay. Here's what's provided, what to still pack, and when bringing your own is worth the luggage weight.",
        },
        es: {
          title: "¿Necesito Traer Mi Propio Equipo de Buceo a Punta Cana?",
          description: "Equipo completo de renta incluido en Grand Bay. Aquí lo que se proporciona, qué empacar de todas formas y cuándo traer el tuyo vale la pena.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Do I Need to Bring My Own Scuba Gear to Punta Cana?",
          description: "A complete guide to what scuba gear is included with courses and dives at Grand Bay of the Sea, what divers should pack regardless of rental policy, what's worth bringing if you own it (mask, computer, wetsuit, fins), what's not worth traveling with (BCD, regulator, tank, weights), travel considerations for personal gear (airline weight limits, TSA screening, gear damage, insurance), quality of rental gear at Grand Bay, when personal gear genuinely makes sense (multi-week trips, technical diving, hard-to-fit body types), the selective middle ground most experienced traveling divers land on, and why course students should rent everything.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/bring-own-scuba-gear-punta-cana",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "¿Necesito Traer Mi Propio Equipo de Buceo a Punta Cana?",
          description: "Una guía completa sobre qué equipo de buceo está incluido con los cursos e inmersiones en Grand Bay of the Sea, qué deberían empacar los buzos sin importar la política de renta, qué vale la pena traer si lo tienes (máscara, computador, wetsuit, aletas), qué no vale la pena viajar (BCD, regulador, tanque, plomos), consideraciones de viaje para equipo personal (límites de peso de aerolínea, revisión TSA, daño de equipo, seguro), calidad del equipo de renta en Grand Bay, cuándo el equipo personal sí tiene sentido (viajes de varias semanas, buceo técnico, tipos de cuerpo difíciles de tallar), el punto medio selectivo al que llegan la mayoría de los buzos viajeros experimentados, y por qué los estudiantes de curso deberían rentar todo.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/bring-own-scuba-gear-punta-cana",
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