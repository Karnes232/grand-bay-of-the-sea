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
      en: "🌴 Meet Punta Cana Excursions by Grand Bay: The Curated Tour Marketplace We Built",
      es: "🌴 Conoce Punta Cana Excursions by Grand Bay: El Marketplace Curado de Tours que Construimos",
    },

    slug: {
      _type: "slug",
      current: "punta-cana-excursions-by-grand-bay",
    },

    publishDate: "2026-06-14",

    description: {
      _type: "localizedText",
      en: "Divers kept asking us about Saona, catamarans, and zipline tours. So we built a curated excursion marketplace. Here's the story of Punta Cana Excursions by Grand Bay, what's on it, and why we vet every operator.",
      es: "Los buzos nos seguían preguntando por Saona, catamaranes y tirolinas. Así que construimos un marketplace curado de excursiones. Aquí la historia de Punta Cana Excursions by Grand Bay, qué incluye y por qué evaluamos a cada operador.",
    },

    blogCategory: {
      _type: "reference",
      _ref: CATEGORIES.localBusinesses,
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
            { _type: "span", _key: "en-b1-s1", text: "Most divers who book with us at Grand Bay don't dive every day of their trip. After a morning of two-tank diving, they want to know what to do with the rest of their week. Saona Island? Worth it? Which catamaran company is the good one? Are the zipline tours actually safe? Is there a cocoa plantation that isn't a tourist trap? After about the thousandth time we typed out the same answers on WhatsApp, we built a website to do the work for us. That's how Punta Cana Excursions by Grand Bay started — not as a separate business plan, but as the natural extension of years of giving the same advice over and over. This post explains what's on the site, how it works, why we vet every tour ourselves, and where it does and doesn't make sense to use it.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "How This Started", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b3-l1", href: "https://puntacana-excursions.com/about" },
          ],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "The dive operation came first. Grand Bay of the Sea was a PADI-certified dive center in Cabeza de Toro long before any of this started, and after a decade of guiding travelers around the reefs off Punta Cana, Bávaro, and Cap Cana, we knew the local tourism economy from the inside. We knew which catamaran captains actually showed up on time, which Saona Island routes avoided the cruise-ship herds, which zipline parks had real safety standards, and which adventure tour operators treated their customers like cattle. That ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "behind-the-scenes knowledge", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: " was what divers wanted, but no website was giving it to them.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "So we built one. The idea was simple: take the recommendations we'd been giving to dive customers verbally for years, put them on a website with clear pricing and easy booking, and only include tours we'd actually take ourselves. That's what \"curated\" means in our context — not a marketing word, but a hard filter. If we wouldn't send our own family on it, it doesn't make the catalog.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "What You Can Book", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b6-l1", href: "https://puntacana-excursions.com/excursions" },
          ],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "The current ", marks: [] },
            { _type: "span", _key: "en-b6-s2", text: "excursion catalog", marks: ["en-b6-l1"] },
            { _type: "span", _key: "en-b6-s3", text: " is organized into six categories that cover most of what travelers actually want out of a Punta Cana week. Island tours include the classic Saona Island full-day trip with a beach lunch and a swim at the natural pool, plus shorter Catalina Island visits when conditions favor that destination. Catamaran cruises range from half-day snorkeling sails to sunset-and-open-bar evening trips, and they're the most popular category for divers looking for an easier, more social day on the water.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b7-l1", href: "https://puntacana-excursions.com/excursions?category=adventure" },
            { _type: "link", _key: "en-b7-l2", href: "https://puntacana-excursions.com/excursions?category=culture-nature" },
            { _type: "link", _key: "en-b7-l3", href: "https://puntacana-excursions.com/excursions?category=family-tours" },
          ],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "Beyond the water, the catalog covers ", marks: [] },
            { _type: "span", _key: "en-b7-s2", text: "adventure tours", marks: ["en-b7-l1"] },
            { _type: "span", _key: "en-b7-s3", text: " — ATVs, dune buggies, ziplines, and off-road jungle trails for travelers who want adrenaline on land — plus ", marks: [] },
            { _type: "span", _key: "en-b7-s4", text: "culture and nature experiences", marks: ["en-b7-l2"] },
            { _type: "span", _key: "en-b7-s5", text: " like cocoa plantations, rum distillery tours, and the cave systems that dot the interior of the country. ", marks: [] },
            { _type: "span", _key: "en-b7-s6", text: "Family tours", marks: ["en-b7-l3"] },
            { _type: "span", _key: "en-b7-s7", text: " are filtered for activities that work for kids — dolphin encounters, animal parks, and gentle boat rides where age restrictions and pace are explicitly travel-friendly. And scuba diving is still there, of course, mostly running through Grand Bay's own dive operation.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "Why \"By Grand Bay\" Matters", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "Most excursion sites in Punta Cana are aggregators with no skin in the game. They list everything, take a commission on bookings, and have no opinion on whether any given tour is good. The customer ends up choosing based on photos and star ratings — which is roughly the worst possible way to pick an excursion in a destination this saturated with operators of wildly different quality. Five-star ratings on tourism sites are basically meaningless because every operator games them, and the photos are all professionally shot regardless of whether the real experience matches.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "Our model is different because we live here. We've personally taken every tour on the site. We know the captain by name on most of the boats. We know which guides genuinely speak fluent English and which ones learned three phrases for the brochure. We know which Saona Island routes have changed in the last year because some operator started cutting corners on the route timing to squeeze in more customers. None of that information shows up on a star rating. It shows up in a curated catalog where we actively remove operators when they slip, and add new ones when something legitimately good comes along.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "How the Booking Process Works", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b12-l1", href: "https://puntacana-excursions.com/how-it-works" },
          ],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "The ", marks: [] },
            { _type: "span", _key: "en-b12-s2", text: "booking flow", marks: ["en-b12-l1"] },
            { _type: "span", _key: "en-b12-s3", text: " is intentionally simple. Browse the catalog, pick what you want, send a small deposit through PayPal to reserve your spot (usually between $15 and $30 per person depending on the excursion), and you get an email confirmation within minutes. The balance is paid on the day of the tour, either in cash (USD or Dominican pesos both work) or by card depending on the specific operator. Hotel pickup is included from any major resort in Punta Cana, Bávaro, Cap Cana, or Uvero Alto, and pickup times get confirmed by email the night before.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "The deposit-plus-balance structure is deliberate. It protects both sides — we know you're actually coming, you know we're holding your spot — without forcing you to pay the full tour cost on a website before you've even arrived in the country. If weather makes an excursion unsafe and we can't reschedule within your stay, the deposit is fully refunded. If you cancel at least 48 hours in advance, same thing. The friction-light cancellation policy exists because we'd rather have a customer come back next year happy than capture a small no-show fee from a stressed traveler whose flight got delayed.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "What Bilingual Support Actually Means", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b15-l1", href: "https://puntacana-excursions.com/contact" },
          ],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Every excursion site claims bilingual support. In practice, most of them mean \"we have a Spanish version of the homepage and an offshore call center that mostly speaks English.\" Our version of bilingual means that ", marks: [] },
            { _type: "span", _key: "en-b15-s2", text: "every message", marks: ["en-b15-l1"] },
            { _type: "span", _key: "en-b15-s3", text: " — booking inquiries, day-of WhatsApp questions, weather rescheduling — is handled in either English or Spanish by someone physically based in Punta Cana, not a generic call center in another country. Spanish-speaking domestic travelers and English-speaking international travelers get the same response time and the same quality of information. The handoff from inquiry to actual tour day doesn't lose anything in translation because the same team is on both ends.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "Pricing: Skipping the Resort Markup", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "The biggest single thing travelers don't realize about Punta Cana excursions is how much the resort concierge desk marks up the price. The same Saona Island tour that costs roughly $90 to $110 booked direct can run $150 to $200 through your all-inclusive resort, with the difference going entirely to the resort's commission structure. Catamaran tours show even bigger gaps — $50 to $70 direct versus $120 or more through a concierge.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Booking direct (or through us as a curated intermediary) cuts that markup out. The tour is the same, the operator is the same, the experience is the same — you just pay closer to what the tour actually costs to run, rather than what the resort can extract on top. For a family of four doing two excursions during a week-long stay, the savings often pay for a third excursion outright.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "First-Timer Recommendations", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b20-l1", href: "https://puntacana-excursions.com/excursions?category=island-tours" },
          ],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "For a traveler visiting Punta Cana for the first time and trying to pick excursions from the catalog, the usual recommendation is three: ", marks: [] },
            { _type: "span", _key: "en-b20-s2", text: "a full-day Saona Island tour", marks: ["en-b20-l1"] },
            { _type: "span", _key: "en-b20-s3", text: " for the postcard Caribbean island experience, a half-day catamaran cruise with snorkeling for the ocean lovers, and a zipline or buggy adventure for the day you want to see the Dominican interior instead of the coast. Spread across a five to seven day trip, that's three different sides of the country, with enough downtime in between for pool days and resort recovery.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "If diving is also on the agenda, the typical itinerary that works well is: dive on day one or two, catamaran or Saona on day three, dive again on day four or five, adventure tour on day six, and a flexible final day for whatever the group voted into. Surface intervals between dive days are useful (more on that in our dedicated post on non-dive days), and mixing in different types of activities prevents anyone from getting saturated on any single experience.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "Who Already Books Through Us", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "The customer base started as Grand Bay's diving customers — people who'd booked dives with us and asked about Saona or catamarans on the side. That's still a significant share of bookings, since it's a natural cross-sell. The rest comes from travelers who find the site directly through search, repeat customers from previous years, and referrals from friends or extended family who'd had a good week here before. The reviews on the site (which we don't filter) skew heavily toward repeat-booking comments and \"better than the cruise-ship Saona day we did three years ago\" comparisons — that's the customer base we keep optimizing for.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "When PCE Isn't the Right Fit", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "A curated catalog has trade-offs worth mentioning. If you want the absolute cheapest deal regardless of operator quality, a generic aggregator will sometimes undercut us by a few dollars per person — we don't list bottom-of-market operators even when they're cheaper, so our floor price is a little higher than the rock-bottom options. If you want a niche, ultra-specialized excursion that we haven't vetted (deep-sea fishing for marlin, advanced kitesurfing lessons, multi-day expedition trips into the central mountains), it's not in the catalog because we don't have firsthand experience to vouch for the operators. And if you genuinely don't care about quality consistency and just want to book the first thing your resort concierge recommends because it's easier, that's still a valid choice — we're for travelers who care enough to look one layer deeper.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "Booking Windows and Peak Season Timing", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Practical advice on timing. Regular season (May through November) bookings can usually be made 3 to 5 days in advance without availability problems. Peak season (December through April) tightens up — Saona Island, sunset catamarans, and a few of the more popular ATV operations regularly sell out a week or more ahead. The week between Christmas and New Year's is the absolute peak; book those days two to three weeks ahead if there's a specific tour you don't want to miss. Last-minute bookings (same-day or next-day) are sometimes possible — message us through the site and we'll check the actual operator availability rather than guessing.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "Weather and Rescheduling", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "Punta Cana's weather is mostly cooperative — there's a reason this is one of the most reliable beach destinations in the Caribbean. But the late summer and early fall months occasionally produce rough water that makes catamarans, island trips, or smaller boats unsafe. When that happens, we reschedule for another day within your stay at no charge. If rescheduling isn't possible (you're leaving the day after, every alternate day is also rough), we refund the deposit in full. We monitor weather conditions starting 48 hours before each excursion and reach out proactively if a change looks likely — you'll hear from us before you have to ask.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "The Diving Tie-In", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b31-l1", href: "https://puntacana-excursions.com/scuba-diving" },
            { _type: "link", _key: "en-b31-l2", href: "https://www.grandbay-puntacana.com/courses" },
          ],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "The scuba diving side of the catalog still runs through our Grand Bay dive operation — same boat, same instructors, same equipment. The only difference is that bookings can come in through either site. ", marks: [] },
            { _type: "span", _key: "en-b31-s2", text: "If you arrive on the excursions site looking for diving", marks: ["en-b31-l1"] },
            { _type: "span", _key: "en-b31-s3", text: ", you'll see a redirect to ", marks: [] },
            { _type: "span", _key: "en-b31-s4", text: "the actual course pages on Grand Bay's site", marks: ["en-b31-l2"] },
            { _type: "span", _key: "en-b31-s5", text: " because that's where the detailed PADI course information lives. The two sites are integrated on the backend even though they're separate publicly — your booking ends up with the same team regardless of which entry point you used.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx1-s1", text: "How We Compare to Viator, GetYourGuide, and the Big Aggregators", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx2-s1", text: "Two questions come up regularly. First: why not just use Viator or GetYourGuide for Punta Cana excursions? The honest answer is that those platforms are scale-first marketplaces — they list everything in every destination, take commission on transactions, and rely on user reviews to do the quality filtering. That model works fine when the underlying market is well-policed (like accommodation through Airbnb), but it falls apart in destinations like Punta Cana where operator quality varies wildly and reviews are aggressively gamed. You can find every Saona Island tour on Viator, but you can't easily find which one is actually good versus which one looks identical in the photos but cuts corners on the route.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx3-s1", text: "The second question is whether using a local curated marketplace means giving up the safety of a big international platform. Practically speaking, no — your payment is still processed through PayPal (the same payment processor major platforms use), you still get email confirmations and clear cancellation terms, and disputes can still be resolved through standard channels. What you give up is access to the absolute longest list of options, in exchange for an actual opinion about which ones are worth your time. For travelers who value efficiency and quality, that trade is usually positive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx4-s1", text: "Tipping Norms and Hidden Costs", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx5",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx5-s1", text: "One thing the listed excursion price never includes is tipping, and most travelers underestimate the cumulative effect. Reasonable Dominican tipping norms: $3 to $5 per person for the driver who handles your hotel pickup, $5 to $10 per person for the tour guide on a full-day excursion, $1 to $2 per drink for the bartender on a catamaran cruise, and $2 to $3 per person for boat crew when they handle gear and snorkel setup. Across a Saona Island day for a family of four, that's roughly $40 to $60 in cash tips beyond what's on the booking. We mention this upfront so it's not a surprise — tipping is genuine income for guides and crew here, not optional like in some destinations.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "How to Get In Touch", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b33-l1", href: "https://puntacana-excursions.com/" },
            { _type: "link", _key: "en-b33-l2", href: "https://puntacana-excursions.com/faq" },
            { _type: "link", _key: "en-b33-l3", href: "https://puntacana-excursions.com/contact" },
          ],
          children: [
            { _type: "span", _key: "en-b33-s1", text: "The full catalog is at ", marks: [] },
            { _type: "span", _key: "en-b33-s2", text: "puntacana-excursions.com", marks: ["en-b33-l1"] },
            { _type: "span", _key: "en-b33-s3", text: " with category browsing, filtering, and detailed pages for each tour. For practical questions (what's included, who it's for, what to bring), ", marks: [] },
            { _type: "span", _key: "en-b33-s4", text: "the FAQ page", marks: ["en-b33-l2"] },
            { _type: "span", _key: "en-b33-s5", text: " covers most of what people ask before booking. For specific itinerary advice or anything not covered, ", marks: [] },
            { _type: "span", _key: "en-b33-s6", text: "the contact form", marks: ["en-b33-l3"] },
            { _type: "span", _key: "en-b33-s7", text: " goes straight to our team — usually a few hours' response time during business hours.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b34-s1", text: "Why This Site Exists Separately", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b35",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b35-l1", href: "https://www.grandbay-puntacana.com/sites" },
            { _type: "link", _key: "en-b35-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b35-s1", text: "A reasonable question: why not just put excursions on Grand Bay's site instead of building a separate one? The answer is audience and intent. Someone searching for \"scuba diving Punta Cana\" arrives at ", marks: [] },
            { _type: "span", _key: "en-b35-s2", text: "the Grand Bay dive site", marks: ["en-b35-l1"] },
            { _type: "span", _key: "en-b35-s3", text: " and finds dive courses, dive sites, and PADI-certified instruction — exactly what they were looking for. Burying a catamaran catalog underneath would dilute that. Someone searching for \"things to do in Punta Cana\" arrives at the excursions site and finds a curated catalog without diving-shop overhead. Same team, same standards, different doors for different visitors. If you're not sure which is more relevant for your trip, ", marks: [] },
            { _type: "span", _key: "en-b35-s4", text: "WhatsApp", marks: ["en-b35-l2"] },
            { _type: "span", _key: "en-b35-s5", text: " us — either site's contact goes to the same group of people, and we'll point you at the right starting page.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "La mayoría de los buzos que reservan con nosotros en Grand Bay no bucean todos los días de su viaje. Después de una mañana de dos inmersiones, quieren saber qué hacer con el resto de su semana. ¿La Isla Saona? ¿Vale la pena? ¿Cuál es la empresa de catamaranes buena? ¿Las tirolinas son realmente seguras? ¿Hay alguna plantación de cacao que no sea una trampa turística? Después de cerca de la milésima vez que respondíamos lo mismo por WhatsApp, construimos un sitio web para que hiciera el trabajo por nosotros. Así nació Punta Cana Excursions by Grand Bay — no como un plan de negocio aparte, sino como la extensión natural de años dando los mismos consejos una y otra vez. Esta publicación explica qué hay en el sitio, cómo funciona, por qué evaluamos cada tour nosotros mismos y cuándo tiene y no tiene sentido usarlo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "Cómo Empezó Esto", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b3-l1", href: "https://puntacana-excursions.com/es/about" },
          ],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "La operación de buceo vino primero. Grand Bay of the Sea era un centro de buceo certificado PADI en Cabeza de Toro mucho antes de que nada de esto empezara, y tras una década guiando viajeros por los arrecifes de Punta Cana, Bávaro y Cap Cana, conocíamos la economía turística local desde adentro. Sabíamos qué capitanes de catamarán realmente llegaban a tiempo, qué rutas a la Isla Saona evitaban las manadas de cruceristas, qué parques de tirolina tenían estándares de seguridad reales y qué operadores de tours de aventura trataban a sus clientes como ganado. Ese ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "conocimiento de tras bastidores", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: " era lo que querían los buzos, pero ningún sitio web se lo estaba dando.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "Así que construimos uno. La idea era simple: tomar las recomendaciones que llevábamos años dando verbalmente a clientes de buceo, ponerlas en un sitio web con precios claros y reservas fáciles, e incluir solo tours que nosotros mismos haríamos. Eso es lo que significa \"curado\" en nuestro contexto — no una palabra de marketing, sino un filtro duro. Si no enviaríamos a nuestra propia familia en él, no entra al catálogo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Qué Puedes Reservar", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b6-l1", href: "https://puntacana-excursions.com/es/excursions" },
          ],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "El ", marks: [] },
            { _type: "span", _key: "es-b6-s2", text: "catálogo actual de excursiones", marks: ["es-b6-l1"] },
            { _type: "span", _key: "es-b6-s3", text: " está organizado en seis categorías que cubren la mayor parte de lo que los viajeros realmente quieren de una semana en Punta Cana. Las excursiones a islas incluyen el clásico tour de día completo a la Isla Saona con almuerzo en la playa y baño en la piscina natural, además de visitas más cortas a la Isla Catalina cuando las condiciones favorecen ese destino. Los catamaranes van desde paseos de medio día con snorkel hasta cruceros de atardecer con bar abierto, y son la categoría más popular para buzos buscando un día en el agua más social y relajado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b7-l1", href: "https://puntacana-excursions.com/es/excursions?category=adventure" },
            { _type: "link", _key: "es-b7-l2", href: "https://puntacana-excursions.com/es/excursions?category=culture-nature" },
            { _type: "link", _key: "es-b7-l3", href: "https://puntacana-excursions.com/es/excursions?category=family-tours" },
          ],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "Más allá del agua, el catálogo cubre ", marks: [] },
            { _type: "span", _key: "es-b7-s2", text: "tours de aventura", marks: ["es-b7-l1"] },
            { _type: "span", _key: "es-b7-s3", text: " — ATVs, buggies, tirolinas y rutas off-road por la selva para viajeros que quieren adrenalina en tierra — además de ", marks: [] },
            { _type: "span", _key: "es-b7-s4", text: "experiencias de cultura y naturaleza", marks: ["es-b7-l2"] },
            { _type: "span", _key: "es-b7-s5", text: " como plantaciones de cacao, tours de destilería de ron y los sistemas de cuevas del interior del país. Los ", marks: [] },
            { _type: "span", _key: "es-b7-s6", text: "tours familiares", marks: ["es-b7-l3"] },
            { _type: "span", _key: "es-b7-s7", text: " están filtrados para actividades que funcionan con niños — encuentros con delfines, parques de animales y paseos suaves en bote donde las restricciones de edad y el ritmo son explícitamente amigables con familias. Y el buceo sigue ahí, claro, operando principalmente a través del centro de buceo Grand Bay.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Por Qué Importa el \"By Grand Bay\"", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "La mayoría de los sitios de excursiones en Punta Cana son agregadores sin nada en juego. Listan todo, toman una comisión sobre las reservas y no tienen opinión sobre si un tour es bueno o no. El cliente termina eligiendo basado en fotos y estrellas — que es básicamente la peor forma posible de elegir una excursión en un destino tan saturado de operadores de calidad tan dispar. Las reseñas de cinco estrellas en sitios turísticos son prácticamente irrelevantes porque cada operador las manipula, y las fotos son todas profesionales sin importar si la experiencia real coincide.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "Nuestro modelo es distinto porque vivimos aquí. Hemos tomado personalmente cada tour del sitio. Conocemos al capitán por nombre en la mayoría de los botes. Sabemos qué guías hablan inglés realmente fluido y cuáles aprendieron tres frases para el folleto. Sabemos qué rutas de Saona cambiaron en el último año porque algún operador empezó a recortar tiempos para meter más clientes. Nada de eso aparece en una calificación de estrellas. Aparece en un catálogo curado donde activamente quitamos operadores cuando se aflojan, y sumamos nuevos cuando aparece algo legítimamente bueno.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Cómo Funciona el Proceso de Reserva", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b12-l1", href: "https://puntacana-excursions.com/es/how-it-works" },
          ],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "El ", marks: [] },
            { _type: "span", _key: "es-b12-s2", text: "flujo de reserva", marks: ["es-b12-l1"] },
            { _type: "span", _key: "es-b12-s3", text: " es intencionalmente simple. Navega el catálogo, elige lo que quieras, envía un pequeño depósito por PayPal para reservar tu lugar (normalmente entre $15 y $30 por persona según la excursión) y recibes confirmación por correo en minutos. El saldo se paga el día del tour, ya sea en efectivo (USD o pesos dominicanos, ambos sirven) o con tarjeta según el operador específico. La recogida en el hotel está incluida desde cualquier resort grande de Punta Cana, Bávaro, Cap Cana o Uvero Alto, y los horarios se confirman por correo la noche anterior.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "La estructura de depósito-más-saldo es deliberada. Protege a ambas partes — sabemos que de verdad vas a venir, tú sabes que estamos guardando tu lugar — sin obligarte a pagar el tour completo en un sitio web antes de haber siquiera llegado al país. Si el clima hace que una excursión no sea segura y no podemos reprogramarla dentro de tu estancia, el depósito se devuelve completo. Si cancelas con al menos 48 horas de antelación, lo mismo. La política de cancelación de baja fricción existe porque preferimos que un cliente vuelva el próximo año feliz a capturar una pequeña tarifa de no-show de un viajero estresado cuyo vuelo se retrasó.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Qué Significa Realmente el Soporte Bilingüe", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b15-l1", href: "https://puntacana-excursions.com/es/contact" },
          ],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Cada sitio de excursiones afirma tener soporte bilingüe. En la práctica, la mayoría quiere decir \"tenemos una versión en español de la página principal y un call center extranjero que mayormente habla inglés\". Nuestra versión de bilingüe significa que ", marks: [] },
            { _type: "span", _key: "es-b15-s2", text: "cada mensaje", marks: ["es-b15-l1"] },
            { _type: "span", _key: "es-b15-s3", text: " — consultas de reserva, preguntas por WhatsApp el día de, reprogramaciones por clima — se maneja en inglés o español por alguien físicamente basado en Punta Cana, no un call center genérico en otro país. Los viajeros nacionales hispanohablantes y los viajeros internacionales angloparlantes reciben el mismo tiempo de respuesta y la misma calidad de información. El traspaso de consulta a día del tour no pierde nada en la traducción porque es el mismo equipo en ambos lados.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Precios: Saltarse el Recargo del Resort", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Lo más grande que los viajeros no se dan cuenta sobre las excursiones en Punta Cana es cuánto recarga el precio el concierge del resort. El mismo tour a la Isla Saona que cuesta entre $90 y $110 reservado directo puede salir entre $150 y $200 a través del all-inclusive, con la diferencia yendo entera a la estructura de comisiones del resort. Los catamaranes muestran brechas aún mayores — $50 a $70 directo contra $120 o más a través del concierge.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Reservar directo (o a través de nosotros como intermediario curado) elimina ese recargo. El tour es el mismo, el operador es el mismo, la experiencia es la misma — solo pagas más cerca de lo que el tour realmente cuesta operar, en lugar de lo que el resort puede extraer encima. Para una familia de cuatro haciendo dos excursiones en una estancia de una semana, el ahorro a menudo paga por una tercera excursión completa.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Recomendaciones para Primerizos", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b20-l1", href: "https://puntacana-excursions.com/es/excursions?category=island-tours" },
          ],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Para un viajero visitando Punta Cana por primera vez e intentando elegir excursiones del catálogo, la recomendación habitual son tres: ", marks: [] },
            { _type: "span", _key: "es-b20-s2", text: "un tour de día completo a la Isla Saona", marks: ["es-b20-l1"] },
            { _type: "span", _key: "es-b20-s3", text: " para la experiencia caribeña de postal, un catamarán de medio día con snorkel para los amantes del mar, y una tirolina o aventura en buggy para el día en que quieras ver el interior dominicano en lugar de la costa. Repartido en un viaje de cinco a siete días, son tres caras distintas del país, con suficiente tiempo de descanso entre medias para días de piscina y recuperación en el resort.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "Si el buceo también está en la agenda, el itinerario que típicamente funciona bien es: bucear el día uno o dos, catamarán o Saona el día tres, bucear de nuevo el día cuatro o cinco, tour de aventura el día seis y un último día flexible para lo que el grupo vote. Los intervalos de superficie entre días de buceo son útiles (más sobre eso en nuestra publicación dedicada a días sin buceo), y mezclar distintos tipos de actividad evita que alguien se sature en una sola experiencia.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "Quién Ya Reserva con Nosotros", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "La base de clientes empezó como los clientes de buceo de Grand Bay — gente que había reservado inmersiones con nosotros y preguntó por Saona o catamaranes en paralelo. Eso sigue siendo una parte significativa de las reservas, ya que es una venta cruzada natural. El resto viene de viajeros que encuentran el sitio directo por búsqueda, clientes que repiten de años anteriores, y referencias de amigos o familia extendida que pasaron una buena semana aquí antes. Las reseñas del sitio (que no filtramos) se inclinan fuertemente hacia comentarios de reserva repetida y comparaciones tipo \"mejor que el día de Saona con crucero que hicimos hace tres años\" — esa es la base de clientes para la que seguimos optimizando.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Cuándo PCE No es la Opción Correcta", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "Un catálogo curado tiene compensaciones que vale la pena mencionar. Si quieres el precio absolutamente más bajo sin importar la calidad del operador, un agregador genérico a veces nos puede bajar por unos dólares por persona — no listamos operadores del último escalón aunque sean más baratos, así que nuestro piso de precio es un poco más alto que las opciones más ras del suelo. Si quieres una excursión muy nicho y ultra-especializada que no hemos evaluado (pesca de marlin en mar abierto, lecciones avanzadas de kitesurf, expediciones multi-día al interior montañoso), no está en el catálogo porque no tenemos experiencia directa para responder por los operadores. Y si genuinamente no te importa la consistencia de calidad y solo quieres reservar lo primero que el concierge del resort te recomiende porque es más fácil, sigue siendo una elección válida — somos para viajeros que se preocupan lo suficiente como para mirar una capa más profundo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "Ventanas de Reserva y Tiempos de Temporada Alta", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Consejo práctico sobre tiempos. En temporada regular (mayo a noviembre) las reservas se suelen hacer con 3 a 5 días de anticipación sin problemas de disponibilidad. La temporada alta (diciembre a abril) se aprieta — la Isla Saona, los catamaranes al atardecer y algunas de las operaciones de ATV más populares se llenan regularmente con una semana o más de anticipación. La semana entre Navidad y Año Nuevo es el pico absoluto; reserva esos días con dos o tres semanas de antelación si hay un tour específico que no quieres perderte. Las reservas de último minuto (mismo día o día siguiente) a veces son posibles — escríbenos por el sitio y revisamos la disponibilidad real del operador en lugar de adivinar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "Clima y Reprogramaciones", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "El clima de Punta Cana es mayormente cooperativo — hay una razón por la que este es uno de los destinos de playa más confiables del Caribe. Pero los meses de fin de verano y principios de otoño producen ocasionalmente mar pesado que hace inseguros catamaranes, viajes a islas o botes más pequeños. Cuando eso ocurre, reprogramamos para otro día dentro de tu estancia sin costo. Si reprogramar no es posible (te vas al día siguiente, todos los días alternos también están pesados), reembolsamos el depósito completo. Monitoreamos las condiciones del clima desde 48 horas antes de cada excursión y te contactamos proactivamente si parece probable un cambio — te enteras antes de que tengas que preguntar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "La Conexión con el Buceo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b31-l1", href: "https://puntacana-excursions.com/es/scuba-diving" },
            { _type: "link", _key: "es-b31-l2", href: "https://www.grandbay-puntacana.com/es/courses" },
          ],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "El lado de buceo del catálogo sigue corriendo por nuestra operación Grand Bay — mismo bote, mismos instructores, mismo equipo. La única diferencia es que las reservas pueden entrar por cualquiera de los dos sitios. ", marks: [] },
            { _type: "span", _key: "es-b31-s2", text: "Si llegas al sitio de excursiones buscando buceo", marks: ["es-b31-l1"] },
            { _type: "span", _key: "es-b31-s3", text: ", verás una redirección a ", marks: [] },
            { _type: "span", _key: "es-b31-s4", text: "las páginas de cursos en el sitio de Grand Bay", marks: ["es-b31-l2"] },
            { _type: "span", _key: "es-b31-s5", text: " porque ahí vive la información detallada de los cursos PADI. Los dos sitios están integrados en el backend aunque sean separados públicamente — tu reserva termina con el mismo equipo sin importar por qué puerta entraste.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx1-s1", text: "Cómo Nos Comparamos con Viator, GetYourGuide y los Grandes Agregadores", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx2-s1", text: "Dos preguntas salen seguido. Primera: ¿por qué no usar Viator o GetYourGuide para excursiones en Punta Cana? La respuesta honesta es que esas plataformas son marketplaces que priorizan escala — listan todo en cada destino, toman comisión en las transacciones y dependen de las reseñas de usuarios para filtrar calidad. Ese modelo funciona bien cuando el mercado de fondo está bien regulado (como el alojamiento por Airbnb), pero se cae en destinos como Punta Cana donde la calidad de operadores varía muchísimo y las reseñas se manipulan agresivamente. Puedes encontrar cada tour a Saona en Viator, pero no puedes encontrar fácilmente cuál es realmente bueno versus cuál se ve idéntico en las fotos pero recorta esquinas en la ruta.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx3-s1", text: "La segunda pregunta es si usar un marketplace local curado significa renunciar a la seguridad de una plataforma internacional grande. En la práctica, no — tu pago sigue procesándose por PayPal (el mismo procesador que usan las plataformas grandes), sigues recibiendo confirmaciones por correo y términos claros de cancelación, y las disputas se pueden resolver por los canales estándar. Lo que sacrificas es el acceso a la lista absolutamente más larga de opciones, a cambio de una opinión real sobre cuáles valen tu tiempo. Para viajeros que valoran la eficiencia y la calidad, ese intercambio suele ser positivo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx4-s1", text: "Normas de Propina y Costos Ocultos", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx5",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx5-s1", text: "Una cosa que el precio listado nunca incluye son las propinas, y la mayoría de los viajeros subestima el efecto acumulado. Normas razonables de propina en RD: $3 a $5 por persona para el chofer que maneja la recogida del hotel, $5 a $10 por persona para el guía en una excursión de día completo, $1 a $2 por trago para el bartender en un catamarán, y $2 a $3 por persona para la tripulación del bote cuando manejan equipo y setup de snorkel. En un día de Saona para una familia de cuatro, eso es aproximadamente $40 a $60 en efectivo de propinas más allá de lo que está en la reserva. Lo mencionamos por adelantado para que no sea sorpresa — la propina es ingreso genuino para guías y tripulación aquí, no opcional como en algunos destinos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "Cómo Contactarnos", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b33-l1", href: "https://puntacana-excursions.com/" },
            { _type: "link", _key: "es-b33-l2", href: "https://puntacana-excursions.com/es/faq" },
            { _type: "link", _key: "es-b33-l3", href: "https://puntacana-excursions.com/es/contact" },
          ],
          children: [
            { _type: "span", _key: "es-b33-s1", text: "El catálogo completo está en ", marks: [] },
            { _type: "span", _key: "es-b33-s2", text: "puntacana-excursions.com", marks: ["es-b33-l1"] },
            { _type: "span", _key: "es-b33-s3", text: " con navegación por categoría, filtros y páginas detalladas de cada tour. Para preguntas prácticas (qué incluye, para quién es, qué llevar), ", marks: [] },
            { _type: "span", _key: "es-b33-s4", text: "la página de FAQ", marks: ["es-b33-l2"] },
            { _type: "span", _key: "es-b33-s5", text: " cubre la mayoría de lo que la gente pregunta antes de reservar. Para consejos específicos de itinerario o cualquier cosa no cubierta, ", marks: [] },
            { _type: "span", _key: "es-b33-s6", text: "el formulario de contacto", marks: ["es-b33-l3"] },
            { _type: "span", _key: "es-b33-s7", text: " va directo a nuestro equipo — normalmente unas horas de tiempo de respuesta durante el horario laboral.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b34-s1", text: "Por Qué Este Sitio Existe Aparte", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b35",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b35-l1", href: "https://www.grandbay-puntacana.com/es/sites" },
            { _type: "link", _key: "es-b35-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b35-s1", text: "Una pregunta razonable: ¿por qué no poner las excursiones en el sitio de Grand Bay en lugar de construir uno separado? La respuesta es audiencia e intención. Alguien buscando \"buceo Punta Cana\" llega al ", marks: [] },
            { _type: "span", _key: "es-b35-s2", text: "sitio de buceo Grand Bay", marks: ["es-b35-l1"] },
            { _type: "span", _key: "es-b35-s3", text: " y encuentra cursos de buceo, sitios de buceo e instrucción certificada PADI — exactamente lo que estaba buscando. Enterrar un catálogo de catamaranes debajo lo diluiría. Alguien buscando \"qué hacer en Punta Cana\" llega al sitio de excursiones y encuentra un catálogo curado sin la sobrecarga de centro de buceo. Mismo equipo, mismos estándares, distintas puertas para distintos visitantes. Si no estás seguro cuál es más relevante para tu viaje, ", marks: [] },
            { _type: "span", _key: "es-b35-s4", text: "WhatsApp", marks: ["es-b35-l2"] },
            { _type: "span", _key: "es-b35-s5", text: " — cualquiera de los dos sitios va al mismo grupo de personas, y te apuntamos a la página de inicio correcta.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "Punta Cana Excursions by Grand Bay: Our Curated Tour Marketplace (2026)",
          description:
            "Punta Cana Excursions by Grand Bay is our curated tour marketplace — Saona Island, catamarans, ATV adventures, and family tours we've personally vetted. Easy deposit, no resort markup.",
          keywords: ["punta cana excursions", "punta cana tours", "saona island booking", "catamaran punta cana", "curated tours punta cana", "punta cana excursions by grand bay"],
        },
        es: {
          title: "Punta Cana Excursions by Grand Bay: Marketplace Curado de Tours (2026)",
          description:
            "Punta Cana Excursions by Grand Bay es nuestro marketplace curado — Isla Saona, catamaranes, ATV y tours familiares que hemos evaluado personalmente. Depósito simple, sin recargo de resort.",
          keywords: ["excursiones punta cana", "tours punta cana", "isla saona reserva", "catamaran punta cana", "tours curados punta cana"],
        },
      },
      openGraph: {
        en: {
          title: "Punta Cana Excursions by Grand Bay: Our Curated Tour Marketplace",
          description: "How we built a curated excursion marketplace from our dive operation. What's in the catalog, how booking works, and why we vet every operator.",
        },
        es: {
          title: "Punta Cana Excursions by Grand Bay: Nuestro Marketplace Curado",
          description: "Cómo construimos un marketplace curado de excursiones desde nuestra operación de buceo. Qué hay en el catálogo, cómo funciona la reserva y por qué evaluamos a cada operador.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Meet Punta Cana Excursions by Grand Bay: The Curated Tour Marketplace We Built",
          description: "A founder-perspective explainer on Punta Cana Excursions by Grand Bay, the curated tour marketplace built as an extension of the Grand Bay dive operation. Covers how the business started, the six excursion categories (island tours, catamarans, adventure, culture and nature, family tours, scuba diving), the curation principle and operator vetting, the deposit-plus-balance booking process, bilingual support, the resort-markup pricing reality, first-timer recommendations, weather rescheduling policy, and how the excursions site fits alongside the Grand Bay dive site.",
          datePublished: "2026-06-14",
          inLanguage: "en",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/blog/local-businesses/punta-cana-excursions-by-grand-bay",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Conoce Punta Cana Excursions by Grand Bay: El Marketplace Curado de Tours que Construimos",
          description: "Un explicador desde la perspectiva del fundador sobre Punta Cana Excursions by Grand Bay, el marketplace curado de tours construido como extensión de la operación de buceo Grand Bay. Cubre cómo empezó el negocio, las seis categorías de excursiones (tours a islas, catamaranes, aventura, cultura y naturaleza, tours familiares, buceo), el principio de curación y la evaluación de operadores, el proceso de reserva con depósito más saldo, el soporte bilingüe, la realidad del recargo del resort, recomendaciones para primerizos, la política de reprogramación por clima y cómo el sitio de excursiones encaja junto al sitio de buceo Grand Bay.",
          datePublished: "2026-06-14",
          inLanguage: "es",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/es/blog/local-businesses/punta-cana-excursions-by-grand-bay",
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