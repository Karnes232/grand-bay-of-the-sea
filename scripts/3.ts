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
      en: "🤢 How to Avoid Seasickness While Scuba Diving: A Diver's Guide",
      es: "🤢 Cómo Evitar el Mareo al Bucear: Guía para Buzos",
    },

    slug: {
      _type: "slug",
      current: "how-to-avoid-seasickness-scuba-diving",
    },

    publishDate: "2026-05-29",

    description: {
      _type: "localizedText",
      en: "Dread the boat ride more than the dive? Here's what causes seasickness, the medications that work (and the ones to avoid as a diver), natural remedies, and what to do if it hits you mid-trip.",
      es: "¿Te da más miedo el bote que la inmersión? Aquí qué causa el mareo, los medicamentos que funcionan (y los que evitar como buzo), remedios naturales y qué hacer si te ataca en pleno viaje.",
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
            {
              _type: "span",
              _key: "en-b1-s1",
              text: "Seasickness keeps more divers off the water than any other physical issue except ear problems. The frustrating part is that it has nothing to do with diving itself — once you're submerged, the symptoms usually disappear within minutes. It's the boat ride that does the damage. The good news is that seasickness is highly manageable with the right combination of preparation, medication, and on-board habits. This guide walks through what causes seasickness, the medications worth using (and the ones divers should be cautious about), natural remedies that actually help, behavioral tactics on the boat, and what to do if you start feeling sick mid-trip.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "What Actually Causes Seasickness", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b3-l1", href: "https://dan.org/safety-prevention/diver-safety/divers-blog/seasickness-prevention-and-treatment/" },
          ],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "Despite the name, water isn't the cause — motion is. ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "Divers Alert Network explains the mechanism", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: " as a sensory mismatch. Your inner ear's vestibular system senses the boat's motion — pitch, roll, yaw — while your eyes, fixed on a stable boat interior or horizon, often don't see the same motion. Your brain receives conflicting information about whether you're moving or not, decides something is wrong (in primitive terms, possibly poisoned), and triggers nausea as a defensive response. The same mechanism causes carsickness, airsickness, and the simulator sickness people get from VR headsets. It's why focusing on the horizon helps — it gives your eyes a stable reference that matches what your ears are sensing.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b4-s1",
              text: "This also explains why seasickness vanishes underwater. Once you're below the surface, the boat's motion is gone, the water around you is calm, and your vestibular and visual systems agree again. Many divers who feel awful on the boat report being completely fine the moment they descend. The trick is getting through the boat ride.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "Medications That Work", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b6-s1",
              text: "Several over-the-counter and prescription medications effectively prevent seasickness. The key question for divers is which ones are safe to use underwater — some have side effects (especially drowsiness) that compromise diving safety.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "Bonine (meclizine): ", marks: ["strong"] },
            { _type: "span", _key: "en-b7-s2", text: "Often the first choice for divers. It's effective, available over the counter in most countries, and causes significantly less drowsiness than other options. Take one tablet the evening before or at least one to two hours before boarding. The non-drowsy variant is widely available and is the better choice if you're going diving the same day.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "Dramamine (dimenhydrinate): ", marks: ["strong"] },
            { _type: "span", _key: "en-b8-s2", text: "Works well but the original formula causes meaningful drowsiness, which is a real problem for diving. The \"non-drowsy\" Dramamine formula actually contains meclizine — the same active ingredient as Bonine. If you pick Dramamine, get the non-drowsy version specifically.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "Stugeron (cinnarizine): ", marks: ["strong"] },
            { _type: "span", _key: "en-b9-s2", text: "Available over the counter in most countries outside the US, popular with European divers. Many divers report it works better than Bonine with similar low drowsiness. Worth picking up if you can find it.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b10-l1", href: "https://blog.padi.com/simple-tips-for-preventing-seasickness-divers-alert-network/" },
          ],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "Scopolamine patches (Transderm Scop): ", marks: ["strong"] },
            { _type: "span", _key: "en-b10-s2", text: "Prescription-only. The patch goes behind the ear and releases medication slowly over up to three days, which is convenient for multi-day liveaboards or back-to-back boat days. But several things to know first. Side effects include dry mouth, blurred vision, drowsiness, and occasionally confusion or hallucinations. More importantly for divers, ", marks: [] },
            { _type: "span", _key: "en-b10-s3", text: "DAN and PADI flag", marks: ["en-b10-l1"] },
            { _type: "span", _key: "en-b10-s4", text: " that wearing the patch for more than three days can cause withdrawal symptoms that mimic decompression sickness — dizziness, nausea, vomiting after the patch is removed — which could complicate diagnosis if something genuinely goes wrong on a dive. Talk to your doctor specifically about diving before getting a prescription, and never try a patch for the first time on a dive day.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b11-s1",
              text: "The universal rule with any of these medications: test them on a non-diving day first. Drowsiness affects different people differently, and you don't want to discover you're a heavy responder while you're at 18 metres in low visibility. Take a normal dose at home, see how it makes you feel, then decide whether it's safe for diving.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Natural Remedies", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "Ginger: ", marks: ["strong"] },
            { _type: "span", _key: "en-b13-s2", text: "Ginger candies, ginger tea, ginger ale (real ginger, not artificially flavored), and crystallized ginger all work for many divers. Research suggests ginger reduces stomach contractions, which helps relieve nausea. The advantage over medication is no drowsiness and no side effects. Effectiveness varies by person — some divers swear by it, others find it mild — but there's no downside to trying.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "Sea-Band acupressure wristbands: ", marks: ["strong"] },
            { _type: "span", _key: "en-b14-s2", text: "Elastic wristbands with a small bead that presses on the P6 acupressure point on the inside of each wrist. The scientific evidence is mixed but they help many people in practice and they have zero side effects, so they're worth keeping in your dive bag. Put them on before boarding, not after symptoms start.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Peppermint: ", marks: ["strong"] },
            { _type: "span", _key: "en-b15-s2", text: "Peppermint tea or peppermint candies help with mild nausea for some people. Less reliable than ginger, but a low-cost option to stack with other approaches.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "Hydration and food: ", marks: ["strong"] },
            { _type: "span", _key: "en-b16-s2", text: "Dehydration makes nausea worse. Drink water steadily before and during the boat ride — small sips, not big gulps. Eat a light breakfast at least an hour before boarding (not heavy, greasy, or acidic; toast, banana, plain crackers, or oatmeal are good choices). Don't go out on an empty stomach; an empty stomach actually makes seasickness more likely, not less. And no alcohol the night before.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "On the Boat: Behavioral Tactics That Help", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Stay outside, not below. ", marks: ["strong"] },
            { _type: "span", _key: "en-b18-s2", text: "Sitting inside a cabin or below deck is the worst possible spot for seasickness — enclosed space, no horizon visible, often combined with strong smells (fuel, food, sunscreen). Stay on the open deck where you can see the horizon, feel the wind, and breathe fresh air.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "Watch the horizon. ", marks: ["strong"] },
            { _type: "span", _key: "en-b19-s2", text: "This is the single most effective free remedy. Pick a stable point on the horizon — land if visible, otherwise just the line where sea meets sky — and look at it. It gives your eyes a visual reference that matches what your inner ear is sensing, resolving the mismatch that triggers nausea.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "Don't read, scroll, or stare at gauges. ", marks: ["strong"] },
            { _type: "span", _key: "en-b20-s2", text: "Looking at anything close to your face — phone screen, book, dive computer manual, gear bag — disconnects your eyes from the horizon and accelerates the onset of seasickness. The most common mistake new divers make is checking their phone on the boat ride out, then wondering why they feel awful by the time they're suiting up.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "Position yourself amidships. ", marks: ["strong"] },
            { _type: "span", _key: "en-b21-s2", text: "The middle of the boat — between the bow and the stern — moves the least. The bow rises and falls most aggressively in swell; the stern can pitch and yaw. The middle is the calmest spot. On dive boats, this usually means the middle bench seats, not the front or back rails.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "Avoid strong smells. ", marks: ["strong"] },
            { _type: "span", _key: "en-b22-s2", text: "Diesel fumes, fuel from the engine compartment, suntan oil, cigarette smoke, and even other people's breakfasts can trigger or worsen nausea. Sit upwind of the engine if possible, and avoid the kitchen or galley area on bigger boats.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "Get in the water early. ", marks: ["strong"] },
            { _type: "span", _key: "en-b23-s2", text: "If you start feeling sick on the boat, tell your guide and ask if you can be one of the first in the water. As soon as you're submerged, the symptoms usually fade within a few minutes. Most reputable dive operators are happy to send seasick divers in early — it solves the problem for both sides.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "If You Start Feeling Sick", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b25-s1",
              text: "Once seasickness has started, prevention is no longer an option — you're in management mode. Move to fresh air immediately if you're not already outside. Sit, don't stand. Find a horizon point and lock your eyes on it. Sip water slowly. Tell your guide so they know what's happening and can plan accordingly. If you have ginger candy, eat one. Don't take medication after symptoms have started — it won't work fast enough and most options are designed to prevent rather than treat.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b26-s1",
              text: "If you do throw up, lean over the leeward (downwind) side of the boat — important for everyone else on board. Don't try to make it to a bathroom; you almost certainly won't, and the bathroom is the worst place to be when seasick. After vomiting, you'll usually feel dramatically better. Rinse your mouth, take small sips of water, and let your guide know whether you still want to dive. Many divers do their best dive immediately after a rough boat ride — once underwater, the symptoms are gone.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Vomiting Through Your Regulator", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b28-s1",
              text: "It's worth knowing, because it does happen. If nausea strikes underwater, the universal advice from every diving safety organization is: keep the regulator in your mouth and vomit through it. The regulator is designed for this — it has a one-way exhaust valve that pushes everything out into the water — and your gear handles it without issue. Removing the regulator to vomit is dangerous because you may inhale during or immediately after, drawing water into your lungs. Keep it in, exhale strongly, and the system clears itself. Rinse your mouth with seawater afterward, take a few normal breaths, and signal your buddy that you're okay (or that you need to ascend if you're not). It's not glamorous but it's safe and routine, and your guide has seen it before.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "Picking the Right Boat Trip If You're Prone", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b30-l1", href: "https://www.grandbay-puntacana.com/sites" },
          ],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "If you know you're prone to seasickness, choose dive trips with shorter boat rides and calmer water. ", marks: [] },
            { _type: "span", _key: "en-b30-s2", text: "Local Punta Cana dive sites", marks: ["en-b30-l1"] },
            { _type: "span", _key: "en-b30-s3", text: " are typically 15 to 25 minutes from the dock, which is short enough that most people can manage without major issues. Catalina Island is a longer ride — about 90 minutes each way, generally on a larger and more stable catamaran with smoother motion. Bayahibe is typically the longest dive day at around two hours of road and boat combined, but the boat portion itself is similar in length to Catalina.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b31-s1",
              text: "Larger boats with deeper hulls handle rough water better than small open boats. Catamarans (two parallel hulls) ride more stably than monohulls and tend to be the most comfortable option for sensitive passengers. If the day's forecast is for high winds and big swell, ask whether the operator is running a smaller or larger boat that day, and consider postponing if you have flexibility.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "Building Your Personal Anti-Seasickness Plan", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b33-s1",
              text: "Most divers who get seasick stack multiple approaches rather than relying on any single thing. A typical effective plan for someone with moderate susceptibility might look like: light dinner the night before with no alcohol; take Bonine (non-drowsy) the night before and another tablet an hour before boarding; light breakfast 60 to 90 minutes before the boat (toast and banana); put Sea-Bands on before boarding; chew ginger candy on the way to the dock; on the boat, stay outside, sit amidships, watch the horizon, sip water steadily, and avoid looking at your phone. If you start feeling iffy, ask to be one of the first in the water.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b34-s1",
              text: "For people with severe susceptibility — anyone who has been hospitalized from seasickness, or who's miserable on every boat ride regardless of conditions — talk to your doctor about a scopolamine prescription specifically for diving, and choose your dive locations and trip lengths carefully. A liveaboard trip is probably not your best entry into diving; build experience on day boats with short rides first.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx1-s1", text: "Special Considerations: Pregnancy, Children, and Older Adults", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx2-s1",
              text: "Different life stages bring different constraints on what's safe and effective. Pregnant travelers shouldn't dive at all (a separate medical consensus regardless of seasickness), but for non-diving boat days, ginger and Sea-Bands are the standard recommendations because they avoid medication entirely; most over-the-counter motion sickness medications are not recommended during pregnancy, and scopolamine patches are contraindicated. Always check with your obstetrician before traveling.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx3",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx3-s1",
              text: "For children, meclizine (Bonine) is generally not recommended for kids under 12 without pediatric guidance, and dimenhydrinate (the original Dramamine) makes most kids extremely drowsy, which is unsafe around water. Ginger chews, Sea-Bands, and behavioral strategies (eyes on the horizon, no screen time, light snacks) are the safer first line. Pediatric formulations exist but should be chosen with a pediatrician rather than off the shelf.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx4",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx4-s1",
              text: "Older adults often have an easier time with motion sickness than they did as kids (susceptibility commonly declines with age) but face other complications. Many seasickness medications interact with blood pressure medications, sedatives, sleeping aids, and antidepressants. Scopolamine in particular can cause confusion, blurred vision, and urinary retention in older patients — generally not the first choice. Bring an updated medication list to your doctor before any trip and ask specifically about interactions; the over-the-counter options are not always benign in combination with prescription medications.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx5-s1", text: "Building Tolerance Over Multiple Dive Days", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx6",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx6-s1",
              text: "If you're diving for several consecutive days, your body genuinely adapts. The phenomenon is well-known to sailors and is sometimes called \"sea legs.\" The vestibular system recalibrates to the motion pattern of being at sea, and what felt unbearable on day one often becomes manageable by day three. This doesn't mean pushing through severe sickness on day one — that just primes a stronger aversion. The strategy is to medicate effectively early in the trip so you have positive boat experiences, then taper as your tolerance builds. Many divers on multi-day trips report needing nothing by the second week.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx7",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx7-s1",
              text: "Worth knowing: this adaptation can reverse on return to land. Some divers experience mal de débarquement — a persistent sensation of motion for a few days after returning from a boat-heavy trip. It's harmless, usually resolves on its own within a week, and the fact that it exists is actually evidence that your vestibular system was successfully adapting to the boat motion.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx8-s1", text: "Picking Boat Trips That Minimize Rough Water", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx9",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx9-s1",
              text: "Beyond medication, the trip you book matters more than people realize. Larger boats roll less in chop than small ones — a 12-metre dive boat is a different ride than a 6-metre RIB. Catamarans are dramatically more stable than monohulls in moderate swell because the two hulls resist roll. Closer dive sites mean shorter time on the water, which compounds: a 15-minute crossing is rarely a problem; a 90-minute crossing in chop is. Morning trips usually have calmer water than afternoon trips because the trade winds and thermal effects build through the day in most Caribbean locations. Asking your dive shop directly about typical conditions for the specific sites that day — and being willing to skip a rough day for a calmer one — is a more powerful tool than any medication.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b35",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b35-s1", text: "Diving in Punta Cana If You Get Seasick", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b36-l1", href: "https://www.grandbay-puntacana.com/contact" },
            { _type: "link", _key: "en-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b36-s1", text: "The Caribbean side of the Dominican Republic generally has calmer water than the Atlantic side, and Punta Cana sits on that calmer Caribbean coast. Local dive sites are reached by short boat rides on protected water for most of the year. If you're nervous about seasickness, start with local dives before tackling Catalina or Bayahibe — once you've completed two or three short-ride days without issue, you'll have a better sense of how your body handles the longer trips. If you tell your guide on the boat that you're prone to seasickness, they can position you in the calmest spot, get you in the water first, and keep an eye on you during surface intervals. Reach out via our ", marks: [] },
            { _type: "span", _key: "en-b36-s2", text: "contact page", marks: ["en-b36-l1"] },
            { _type: "span", _key: "en-b36-s3", text: " or on ", marks: [] },
            { _type: "span", _key: "en-b36-s4", text: "WhatsApp", marks: ["en-b36-l2"] },
            { _type: "span", _key: "en-b36-s5", text: " before your trip if you want help picking a schedule that minimizes rough-water exposure.", marks: [] },
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
            {
              _type: "span",
              _key: "es-b1-s1",
              text: "El mareo deja a más buzos fuera del agua que cualquier otro problema físico excepto los problemas de oído. Lo frustrante es que no tiene nada que ver con el buceo en sí — una vez sumergido, los síntomas suelen desaparecer en minutos. Es el trayecto en bote el que hace el daño. La buena noticia es que el mareo es muy manejable con la combinación correcta de preparación, medicación y hábitos a bordo. Esta guía recorre qué causa el mareo, los medicamentos que vale la pena usar (y aquellos con los que los buzos deben tener cuidado), remedios naturales que sí ayudan, tácticas de comportamiento en el bote y qué hacer si empiezas a sentirte mal en medio del viaje.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "Qué Causa Realmente el Mareo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b3-l1", href: "https://dan.org/safety-prevention/diver-safety/divers-blog/seasickness-prevention-and-treatment/" },
          ],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "A pesar del nombre, el agua no es la causa — lo es el movimiento. ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "Divers Alert Network explica el mecanismo", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: " como un desajuste sensorial. El sistema vestibular de tu oído interno detecta el movimiento del bote — cabeceo, balanceo, guiñada — mientras tus ojos, fijos en un interior estable o el horizonte, a menudo no ven el mismo movimiento. Tu cerebro recibe información contradictoria sobre si te estás moviendo o no, decide que algo anda mal (en términos primitivos, posiblemente envenenado) y dispara la náusea como respuesta defensiva. El mismo mecanismo causa el mareo en carro, en avión y el mareo de simulador con cascos de realidad virtual. Por eso fijar la vista en el horizonte ayuda — le da a los ojos una referencia visual estable que coincide con lo que sienten los oídos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b4-s1",
              text: "Esto también explica por qué el mareo desaparece bajo el agua. Una vez que estás bajo la superficie, el movimiento del bote ya no se siente, el agua que te rodea está en calma y tu sistema vestibular y visual coinciden de nuevo. Muchos buzos que se sienten fatal en el bote reportan estar perfectamente bien en cuanto descienden. El truco es pasar el trayecto del bote.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Medicamentos que Funcionan", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b6-s1",
              text: "Varios medicamentos de venta libre y con receta previenen el mareo de forma efectiva. La pregunta clave para los buzos es cuáles son seguros de usar antes de bucear — algunos tienen efectos secundarios (especialmente somnolencia) que comprometen la seguridad bajo el agua.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "Bonine (meclizina): ", marks: ["strong"] },
            { _type: "span", _key: "es-b7-s2", text: "Suele ser la primera opción para buzos. Es efectivo, está disponible sin receta en la mayoría de los países y produce mucha menos somnolencia que otras opciones. Toma una tableta la noche anterior o al menos una a dos horas antes de embarcar. La variante non-drowsy (sin somnolencia) está ampliamente disponible y es mejor opción si vas a bucear el mismo día.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Dramamine (dimenhidrinato): ", marks: ["strong"] },
            { _type: "span", _key: "es-b8-s2", text: "Funciona bien pero la fórmula original produce somnolencia importante, lo cual es un problema real para bucear. La fórmula non-drowsy de Dramamine en realidad contiene meclizina — el mismo principio activo que Bonine. Si eliges Dramamine, busca específicamente la versión non-drowsy.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "Stugeron (cinarizina): ", marks: ["strong"] },
            { _type: "span", _key: "es-b9-s2", text: "Disponible sin receta en la mayoría de los países fuera de EE. UU. y popular entre buzos europeos. Muchos buzos reportan que funciona mejor que Bonine con una somnolencia igual de baja. Vale la pena conseguirlo si lo encuentras.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b10-l1", href: "https://blog.padi.com/simple-tips-for-preventing-seasickness-divers-alert-network/" },
          ],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "Parches de escopolamina (Transderm Scop): ", marks: ["strong"] },
            { _type: "span", _key: "es-b10-s2", text: "Solo con receta. El parche va detrás de la oreja y libera medicamento lentamente durante hasta tres días, lo cual es cómodo para liveaboards o días seguidos de bote. Pero conviene saber varias cosas primero. Los efectos secundarios incluyen boca seca, visión borrosa, somnolencia y, ocasionalmente, confusión o alucinaciones. Y más importante aún para los buzos, ", marks: [] },
            { _type: "span", _key: "es-b10-s3", text: "DAN y PADI advierten", marks: ["es-b10-l1"] },
            { _type: "span", _key: "es-b10-s4", text: " que llevar el parche más de tres días puede causar síntomas de abstinencia que imitan los de la enfermedad por descompresión — mareo, náusea, vómito tras retirar el parche — lo que podría complicar el diagnóstico si algo de verdad sale mal en una inmersión. Habla con tu médico específicamente sobre buceo antes de obtener una receta, y nunca pruebes un parche por primera vez en un día de buceo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b11-s1",
              text: "La regla universal con cualquiera de estos medicamentos: pruébalos primero en un día sin buceo. La somnolencia afecta a cada persona distinto y no quieres descubrir que reaccionas fuerte cuando estás a 18 metros con visibilidad baja. Toma una dosis normal en casa, observa cómo te hace sentir y luego decide si es seguro para bucear.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "Remedios Naturales", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Jengibre: ", marks: ["strong"] },
            { _type: "span", _key: "es-b13-s2", text: "Caramelos de jengibre, té de jengibre, ginger ale (jengibre real, no saborizado artificial) y jengibre cristalizado funcionan para muchos buzos. La investigación sugiere que el jengibre reduce las contracciones estomacales, lo que ayuda a aliviar la náusea. La ventaja frente al medicamento es cero somnolencia y cero efectos secundarios. La efectividad varía por persona — algunos buzos lo defienden, otros lo encuentran suave — pero no hay nada que perder al probarlo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Pulseras de acupresión Sea-Band: ", marks: ["strong"] },
            { _type: "span", _key: "es-b14-s2", text: "Pulseras elásticas con una pequeña bolita que presiona el punto de acupresión P6 en el interior de cada muñeca. La evidencia científica es mixta pero a muchas personas les ayudan en la práctica y no tienen efectos secundarios, así que vale la pena tenerlas en tu bolso de buceo. Ponlas antes de embarcar, no después de que aparezcan los síntomas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Menta: ", marks: ["strong"] },
            { _type: "span", _key: "es-b15-s2", text: "El té de menta o los caramelos de menta ayudan con la náusea leve para algunas personas. Menos fiable que el jengibre, pero una opción de bajo costo para combinar con otros enfoques.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Hidratación y comida: ", marks: ["strong"] },
            { _type: "span", _key: "es-b16-s2", text: "La deshidratación empeora la náusea. Toma agua de manera constante antes y durante el trayecto en bote — sorbos pequeños, no tragos grandes. Desayuna ligero al menos una hora antes de embarcar (nada pesado, grasoso ni ácido; tostadas, plátano, galletas sencillas o avena son buenas opciones). No salgas con el estómago vacío; un estómago vacío en realidad hace más probable el mareo, no menos. Y nada de alcohol la noche anterior.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "En el Bote: Tácticas de Comportamiento que Ayudan", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Quédate fuera, no abajo. ", marks: ["strong"] },
            { _type: "span", _key: "es-b18-s2", text: "Sentarte dentro de una cabina o bajo cubierta es el peor lugar posible para el mareo — espacio cerrado, sin horizonte visible, a menudo combinado con olores fuertes (combustible, comida, protector solar). Quédate en la cubierta abierta donde puedes ver el horizonte, sentir el viento y respirar aire fresco.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Mira el horizonte. ", marks: ["strong"] },
            { _type: "span", _key: "es-b19-s2", text: "Es el remedio gratuito más efectivo. Elige un punto estable en el horizonte — tierra si se ve, si no la línea donde se juntan el mar y el cielo — y míralo. Le da a tus ojos una referencia visual que coincide con lo que detecta tu oído interno, resolviendo el desajuste que dispara la náusea.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "No leas, no uses el celular, no mires los manómetros de cerca. ", marks: ["strong"] },
            { _type: "span", _key: "es-b20-s2", text: "Mirar cualquier cosa cerca de la cara — pantalla del celular, libro, manual de la computadora de buceo, bolsa de equipo — desconecta tus ojos del horizonte y acelera la aparición del mareo. El error más común que cometen los buzos nuevos es revisar el teléfono en el trayecto al sitio, y después se preguntan por qué se sienten fatal al ponerse el equipo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "Ponte en el centro del bote. ", marks: ["strong"] },
            { _type: "span", _key: "es-b21-s2", text: "La parte media del bote — entre la proa y la popa — es la que menos se mueve. La proa sube y baja más agresivamente con el oleaje; la popa puede cabecear y guiñar. La parte media es el punto más tranquilo. En botes de buceo, esto suele ser los bancos del medio, no la baranda delantera ni la trasera.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "Evita olores fuertes. ", marks: ["strong"] },
            { _type: "span", _key: "es-b22-s2", text: "Los humos de diésel, el combustible del compartimiento del motor, el aceite bronceador, el humo de cigarrillo y hasta el desayuno de otras personas pueden disparar o empeorar la náusea. Siéntate a barlovento del motor si es posible y evita la zona de cocina o galera en los botes más grandes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Métete al agua temprano. ", marks: ["strong"] },
            { _type: "span", _key: "es-b23-s2", text: "Si empiezas a sentirte mal en el bote, dile a tu guía y pregunta si puedes ser de los primeros en entrar al agua. En cuanto te sumerges, los síntomas suelen desaparecer en unos minutos. La mayoría de los operadores serios mandan con gusto a los buzos mareados primero — resuelve el problema para ambos lados.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Si Empiezas a Sentirte Mal", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b25-s1",
              text: "Una vez que ha empezado el mareo, la prevención ya no es opción — estás en modo manejo. Sal a tomar aire fresco de inmediato si no estás ya afuera. Siéntate, no estés parado. Encuentra un punto del horizonte y fija la vista en él. Sorbe agua lentamente. Avísale a tu guía para que sepa qué está pasando y pueda planear en consecuencia. Si tienes un caramelo de jengibre, cómete uno. No tomes medicación una vez aparecidos los síntomas — no actuará lo bastante rápido y la mayoría de las opciones está pensada para prevenir, no para tratar.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b26-s1",
              text: "Si vomitas, inclínate hacia la banda de sotavento (a favor del viento) del bote — importante para los demás a bordo. No intentes llegar al baño; casi seguro no lo lograrás y el baño es el peor lugar donde estar mareado. Después de vomitar, normalmente te sentirás mucho mejor. Enjuágate la boca, toma pequeños sorbos de agua y dile al guía si todavía quieres bucear. Muchos buzos hacen su mejor inmersión justo después de un trayecto en bote movido — una vez bajo el agua, los síntomas se han ido.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Vomitar a Través del Regulador", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b28-s1",
              text: "Vale la pena saberlo, porque sí ocurre. Si la náusea aparece bajo el agua, el consejo universal de cada organización de seguridad de buceo es: mantén el regulador en la boca y vomita a través de él. El regulador está diseñado para esto — tiene una válvula de escape unidireccional que empuja todo al agua — y tu equipo lo maneja sin problemas. Quitarse el regulador para vomitar es peligroso porque puedes inhalar durante o justo después, metiendo agua a los pulmones. Mantenlo, exhala fuerte y el sistema se limpia solo. Enjuágate la boca con agua de mar después, toma unas respiraciones normales y señaliza a tu compañero que estás bien (o que necesitas ascender si no lo estás). No es elegante pero es seguro y rutinario, y tu guía ya lo ha visto antes.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "Elegir el Viaje en Bote Correcto Si Eres Propenso", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b30-l1", href: "https://www.grandbay-puntacana.com/es/sites" },
          ],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "Si sabes que eres propenso al mareo, elige viajes de buceo con trayectos cortos y agua más calma. ", marks: [] },
            { _type: "span", _key: "es-b30-s2", text: "Los sitios de buceo locales de Punta Cana", marks: ["es-b30-l1"] },
            { _type: "span", _key: "es-b30-s3", text: " suelen estar a 15 o 25 minutos del muelle, lo bastante corto para que la mayoría lo maneje sin problemas mayores. La Isla Catalina es un trayecto más largo — unos 90 minutos cada sentido, generalmente en un catamarán más grande y estable con movimiento más suave. Bayahibe suele ser el día más largo, con unas dos horas combinadas de carretera y bote, pero la parte en bote en sí es parecida en duración a Catalina.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b31-s1",
              text: "Los botes más grandes con cascos más profundos manejan mejor el agua movida que los botes abiertos pequeños. Los catamaranes (dos cascos paralelos) navegan más estables que los monocascos y suelen ser la opción más cómoda para pasajeros sensibles. Si el pronóstico del día indica vientos altos y oleaje grande, pregunta si el operador está saliendo con un bote más pequeño o más grande ese día, y considera posponer si tienes flexibilidad.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "Construir tu Plan Antimareo Personal", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b33-s1",
              text: "La mayoría de los buzos que se marean combina varios enfoques en lugar de depender de uno solo. Un plan típico efectivo para alguien con susceptibilidad moderada podría ser: cena ligera la noche anterior sin alcohol; tomar Bonine (sin somnolencia) la noche anterior y otra tableta una hora antes de embarcar; desayuno ligero 60 a 90 minutos antes del bote (tostada y plátano); ponerse las Sea-Bands antes de embarcar; masticar caramelo de jengibre camino al muelle; en el bote, quedarse afuera, sentarse en el centro, mirar el horizonte, sorber agua de manera constante y evitar mirar el celular. Si empiezas a sentirte raro, pide ser de los primeros en entrar al agua.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b34-s1",
              text: "Para personas con susceptibilidad severa — quienes han sido hospitalizados por mareo o sufren miserablemente cada trayecto en bote sin importar las condiciones — habla con tu médico sobre una receta de escopolamina específicamente para buceo, y elige tus ubicaciones y duraciones de viaje con cuidado. Un viaje en liveaboard probablemente no es tu mejor entrada al buceo; gana experiencia primero en botes de día con trayectos cortos.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx1-s1", text: "Consideraciones Especiales: Embarazo, Niños y Adultos Mayores", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-bx2-s1",
              text: "Distintas etapas de la vida traen distintas restricciones sobre qué es seguro y efectivo. Las viajeras embarazadas no deben bucear (un consenso médico aparte, independiente del mareo), pero para días de bote sin bucear, el jengibre y las Sea-Bands son las recomendaciones estándar porque evitan la medicación por completo; la mayoría de los medicamentos de venta libre para el mareo no se recomiendan durante el embarazo, y los parches de escopolamina están contraindicados. Siempre consulta con tu obstetra antes de viajar.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-bx3",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-bx3-s1",
              text: "Para los niños, la meclizina (Bonine) no se recomienda generalmente en menores de 12 sin orientación pediátrica, y el dimenhidrinato (el Dramamine original) deja a la mayoría muy somnolientos, lo cual no es seguro cerca del agua. Las pastillas de jengibre, las Sea-Bands y las estrategias de comportamiento (mirar al horizonte, no usar pantallas, snacks ligeros) son la primera línea más segura. Existen formulaciones pediátricas pero conviene elegirlas con un pediatra y no de góndola.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-bx4",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-bx4-s1",
              text: "Los adultos mayores muchas veces lo llevan mejor que cuando eran niños (la susceptibilidad suele bajar con la edad) pero enfrentan otras complicaciones. Muchos medicamentos para el mareo interactúan con medicamentos para la presión, sedantes, somníferos y antidepresivos. La escopolamina en particular puede causar confusión, visión borrosa y retención urinaria en pacientes mayores — en general no es la primera elección. Lleva una lista actualizada de tus medicamentos a tu médico antes de cualquier viaje y pregunta específicamente por interacciones; las opciones de venta libre no siempre son inocuas combinadas con medicamentos recetados.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-bx5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx5-s1", text: "Desarrollar Tolerancia en Varios Días de Buceo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx6",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-bx6-s1",
              text: "Si vas a bucear varios días seguidos, el cuerpo de verdad se adapta. El fenómeno es bien conocido entre marineros y a veces se llama \"piernas de mar\". El sistema vestibular se recalibra al patrón de movimiento del mar, y lo que se sentía insoportable el día uno suele volverse manejable para el día tres. Esto no significa aguantar un mareo severo el día uno — eso solo refuerza una aversión más fuerte. La estrategia es medicarse bien al inicio del viaje para tener experiencias positivas en el bote, y luego reducir la dosis a medida que se construye la tolerancia. Muchos buzos en viajes de varios días reportan no necesitar nada a partir de la segunda semana.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-bx7",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx7-s1", text: "Elegir Salidas en Bote que Minimicen el Agua Movida", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx8",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-bx8-s1",
              text: "Más allá de la medicación, el viaje que reservas importa más de lo que la gente piensa. Los botes más grandes ruedan menos con el oleaje que los pequeños — un bote de buceo de 12 metros es un viaje distinto a una semirrígida de 6 metros. Los catamaranes son drásticamente más estables que los monocascos con oleaje moderado porque los dos cascos resisten el balanceo. Los sitios de buceo más cercanos significan menos tiempo en el agua, lo cual se suma: un trayecto de 15 minutos rara vez es un problema; uno de 90 minutos con oleaje sí. Las salidas matinales suelen tener agua más tranquila que las de tarde porque los vientos alisios y los efectos térmicos se intensifican durante el día en la mayoría de los lugares del Caribe. Preguntar al centro de buceo directamente por las condiciones típicas de los sitios concretos ese día — y estar dispuesto a saltarse un día movido por uno más tranquilo — es una herramienta más poderosa que cualquier medicamento.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b35",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b35-s1", text: "Bucear en Punta Cana Si Te Mareas", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b36-l1", href: "https://www.grandbay-puntacana.com/es/contact" },
            { _type: "link", _key: "es-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b36-s1", text: "El lado caribeño de la República Dominicana generalmente tiene agua más calma que el lado atlántico, y Punta Cana está sobre esa costa caribeña más tranquila. A los sitios de buceo locales se llega con trayectos cortos en agua protegida durante la mayor parte del año. Si estás nervioso con el mareo, empieza con buceos locales antes de meterte con Catalina o Bayahibe — una vez que hagas dos o tres días de trayectos cortos sin problema, tendrás una mejor idea de cómo maneja tu cuerpo los viajes más largos. Si le dices a tu guía en el bote que eres propenso al mareo, puede colocarte en el punto más tranquilo, meterte al agua primero y estar pendiente durante los intervalos en superficie. Escríbenos por nuestra ", marks: [] },
            { _type: "span", _key: "es-b36-s2", text: "página de contacto", marks: ["es-b36-l1"] },
            { _type: "span", _key: "es-b36-s3", text: " o por ", marks: [] },
            { _type: "span", _key: "es-b36-s4", text: "WhatsApp", marks: ["es-b36-l2"] },
            { _type: "span", _key: "es-b36-s5", text: " antes del viaje si quieres ayuda para elegir un horario que minimice la exposición a agua movida.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "How to Avoid Seasickness While Scuba Diving: A Diver's Guide (2026)",
          description:
            "Seasickness prevention for divers: best medications (Bonine, scopolamine), natural remedies (ginger, Sea-Bands), behavioral tactics, and what to do if it hits you.",
          keywords: ["seasickness scuba diving", "how to prevent seasickness diving", "bonine vs dramamine diving", "scopolamine patch diving", "ginger seasickness", "motion sickness diving"],
        },
        es: {
          title: "Cómo Evitar el Mareo al Bucear: Guía para Buzos (2026)",
          description:
            "Prevención del mareo para buzos: mejores medicamentos (Bonine, escopolamina), remedios naturales (jengibre, Sea-Bands), tácticas de comportamiento y qué hacer si te ataca.",
          keywords: ["mareo buceo", "como evitar mareo buceo", "bonine vs dramamine buceo", "parche escopolamina buceo", "jengibre mareo", "cinetosis buceo"],
        },
      },
      openGraph: {
        en: {
          title: "How to Avoid Seasickness While Scuba Diving",
          description: "What works, what to avoid, and how to manage seasickness as a diver. Medications, natural remedies, behavioral tactics, and underwater protocol.",
        },
        es: {
          title: "Cómo Evitar el Mareo al Bucear",
          description: "Qué funciona, qué evitar y cómo manejar el mareo como buzo. Medicamentos, remedios naturales, tácticas de comportamiento y protocolo bajo el agua.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "How to Avoid Seasickness While Scuba Diving: A Diver's Guide",
          description: "A comprehensive guide to preventing and managing seasickness while scuba diving, including the causes of motion sickness, effective medications (Bonine, Dramamine, Stugeron, scopolamine patches) with diver-specific safety considerations, natural remedies (ginger, Sea-Bands, peppermint), behavioral tactics on the boat, and what to do if symptoms strike underwater.",
          datePublished: "2026-05-29",
          inLanguage: "en",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/how-to-avoid-seasickness-scuba-diving",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Cómo Evitar el Mareo al Bucear: Guía para Buzos",
          description: "Una guía completa para prevenir y manejar el mareo durante el buceo, incluyendo las causas de la cinetosis, medicamentos efectivos (Bonine, Dramamine, Stugeron, parches de escopolamina) con consideraciones específicas de seguridad para buzos, remedios naturales (jengibre, Sea-Bands, menta), tácticas de comportamiento en el bote y qué hacer si los síntomas aparecen bajo el agua.",
          datePublished: "2026-05-29",
          inLanguage: "es",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/how-to-avoid-seasickness-scuba-diving",
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