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
      en: "👂 Ear Equalization Problems Scuba Diving: Why and How to Fix Them",
      es: "👂 Problemas de Compensación de Oídos al Bucear: Por Qué Ocurren y Cómo Resolverlos",
    },

    slug: {
      _type: "slug",
      current: "ear-equalization-problems-scuba-diving",
    },

    publishDate: "2026-05-29",

    description: {
      _type: "localizedText",
      en: "Ears won't clear on descent? Pain at depth? Here's how ear equalization works, the six techniques every diver should know, why some divers struggle, and when to call off a dive.",
      es: "¿Los oídos no se compensan al bajar? ¿Dolor en profundidad? Aquí cómo funciona la compensación, las seis técnicas que todo buzo debe conocer, por qué algunos buzos sufren y cuándo abortar la inmersión.",
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
              text: "Ear equalization problems are the most common reason new divers cut a dive short, and the second most common pain point overall after mask issues. Almost every diver runs into difficulty at some point — either learning to equalize at all in their first few dives, or having an occasional day when one ear just won't cooperate. The good news is that ear equalization is a mechanical skill that improves with practice, and most divers who struggle initially become reliable equalizers once they understand what's happening and learn a few backup techniques. This guide explains how equalization actually works, walks through the six standard techniques, covers why some divers struggle more than others, and lays out what to do when your ears just won't clear.",
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
            { _type: "span", _key: "en-b2-s1", text: "How Ear Equalization Actually Works", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b3-s1",
              text: "Your ear has three parts: the outer ear (everything visible plus the ear canal), the middle ear (an air-filled space behind the eardrum), and the inner ear (containing the cochlea and balance organs). The eardrum sits between the outer and middle ear. When you descend underwater, the water pressure on the outside of the eardrum increases rapidly — about one additional atmosphere every 10 metres. If the air pressure inside the middle ear doesn't increase to match, the eardrum gets pushed inward by the water, causing pain, then potentially injury (a perforated eardrum or middle-ear barotrauma).",
              marks: [],
            },
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
              text: "The middle ear connects to the back of your throat through a thin tube called the Eustachian tube. Equalization is the process of opening that tube to push or let air flow up into the middle ear, raising its internal pressure to match the surrounding water. Every equalization technique is just a different way of forcing that tube open. The tube is normally closed most of the time and opens briefly when you yawn or swallow — that little pop you hear when you swallow on an airplane is the same mechanism.",
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
            { _type: "span", _key: "en-b5-s1", text: "The Six Equalization Techniques", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b6-l1", href: "https://dan.org/health-medicine/health-resource/smart-guides/beat-the-squeeze-equalize-like-a-pro/6-methods-to-equalize-your-ears/" },
          ],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "Most new divers learn just one technique — the Valsalva maneuver — and stop there. But ", marks: [] },
            { _type: "span", _key: "en-b6-s2", text: "Divers Alert Network documents six methods", marks: ["en-b6-l1"] },
            { _type: "span", _key: "en-b6-s3", text: ", and divers who learn multiple options have far fewer problems over time. If one method fails, you can try another.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "Valsalva maneuver: ", marks: ["strong"] },
            { _type: "span", _key: "en-b7-s2", text: "The standard, taught to every new diver. Pinch your nostrils closed (or press the mask skirt against them), then gently blow against the closed nose as if you were trying to exhale through it. The slight overpressure forces air up the Eustachian tubes into the middle ear. The keyword is gently — aggressive Valsalva can damage the inner ear. If gentle blowing doesn't work, don't blow harder; switch techniques or ascend.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "Frenzel maneuver: ", marks: ["strong"] },
            { _type: "span", _key: "en-b8-s2", text: "Preferred by experienced divers, freedivers, and anyone with persistent equalization problems. Pinch your nose, close the back of your throat (like you're about to lift something heavy), and push the back of your tongue upward and backward as if making a hard \"K\" sound. This uses only your tongue and throat muscles rather than your lungs and diaphragm. It's gentler, safer (can't generate dangerously high pressures), and works in any body position. Takes practice to learn but pays dividends.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "Toynbee maneuver: ", marks: ["strong"] },
            { _type: "span", _key: "en-b9-s2", text: "Pinch your nose and swallow. The swallowing motion activates muscles that pull the Eustachian tubes open while creating a slight pressure change in the throat. Particularly useful during ascent when you have a reverse block, but also a good complement to Valsalva on descent.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "Lowry technique: ", marks: ["strong"] },
            { _type: "span", _key: "en-b10-s2", text: "A combination move — pinch your nose, gently blow (Valsalva-style) while simultaneously swallowing. The combination opens the tubes more reliably than either move alone. Awkward to coordinate at first, but very effective when one ear is being stubborn.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "Edmonds technique: ", marks: ["strong"] },
            { _type: "span", _key: "en-b11-s2", text: "Valsalva combined with a jaw thrust or head tilt. Push your lower jaw forward and down (like sticking your jaw out), or tilt your head sharply to one side, while doing a gentle Valsalva. Mechanical jaw and neck movement physically helps pull the tubes open. Often the move that finally works when other techniques have failed on one stubborn ear.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Voluntary tubal opening (BTV): ", marks: ["strong"] },
            { _type: "span", _key: "en-b12-s2", text: "The advanced move — opening the Eustachian tubes through pure muscle control without any nose pinching or blowing. Some divers can learn to flex the soft palate and upper throat muscles in a way that opens the tubes voluntarily. If you can already do this on land (some people naturally can), it's the cleanest and easiest equalization method. If not, it takes serious practice to learn.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "The Rules of Equalization", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "Equalize early. ", marks: ["strong"] },
            { _type: "span", _key: "en-b14-s2", text: "Start equalizing at the surface before you descend. Most equalization problems happen because divers wait until they feel pressure before clearing, by which time the tubes are already partially squeezed shut and harder to open. The first equalization should happen at zero feet, then again at one or two feet, and so on.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Equalize often. ", marks: ["strong"] },
            { _type: "span", _key: "en-b15-s2", text: "DAN and PADI both recommend equalizing every metre or so of descent — for a typical descent rate, that's roughly every two seconds. Equalize before you feel pressure, not after. \"Equalize early and often\" is the slogan every dive instructor repeats for a reason.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "Equalize gently. ", marks: ["strong"] },
            { _type: "span", _key: "en-b16-s2", text: "A forceful Valsalva can do real damage to the inner ear. If gentle pressure doesn't work, switch techniques rather than blowing harder. The Frenzel maneuver is preferred at depth because it physically can't generate the dangerously high pressures that aggressive Valsalva can.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "Stop and ascend if it hurts. ", marks: ["strong"] },
            { _type: "span", _key: "en-b17-s2", text: "Ear pain is your body's warning that you're approaching damage. If you can't equalize at a depth, ascend a metre or two until the pressure releases, then try again. Never push through pain — the consequences range from temporary fluid buildup to a perforated eardrum to inner-ear injury that can affect balance and hearing permanently.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Descend feet-first. ", marks: ["strong"] },
            { _type: "span", _key: "en-b18-s2", text: "Going down feet-first allows fluid to drain away from the Eustachian tube openings via gravity, keeping them clearer. Head-first descents do the opposite. Use a descent line if available so you can control descent rate and pause as needed.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "Look up. ", marks: ["strong"] },
            { _type: "span", _key: "en-b19-s2", text: "Extending your neck (looking upward) helps open the Eustachian tubes. Many divers find equalization easier when they tilt their head back slightly while clearing. A small change in head position can make the difference between a tube that clears and one that doesn't.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "Why Some Divers Struggle More Than Others", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b21-s1",
              text: "Individual anatomy varies. Some people have naturally narrow Eustachian tubes; some have an unusual angle that makes them harder to open; some have one tube that's structurally tighter than the other (which is why a single ear often refuses to clear when the other works fine). None of this is anything you did wrong, and most people learn to work around their personal quirks.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b22-s1",
              text: "Allergies and congestion are the most common modifiable cause. Even mild seasonal allergies, hay fever, or a slight cold can swell the lining of the Eustachian tubes and make them refuse to open. This is why divers with congestion are advised not to dive — the squeeze you can't equalize against can cause real injury, and decongestant medications create their own risks (more on that in a moment).",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b23-s1",
              text: "Dehydration thickens mucus and makes tubes stickier. Drink plenty of water before diving. Smoking irritates the tube linings; smokers tend to have more equalization difficulty. And anxiety or tension tightens the muscles around the throat and Eustachian tubes — relaxed divers equalize more easily than tense ones, which is partly why first-dive equalization is often harder than later in the same trip.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "About Decongestants", marks: [] },
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
              text: "Many divers reach for a decongestant (Sudafed, oxymetazoline nasal sprays like Afrin) when their ears feel stuffy before a dive. This is generally not recommended. The problem is the rebound effect: as the medication wears off at depth, the swelling can return suddenly and trap pressure in the middle ear that you can't equalize back out. The result is a reverse block on ascent, which can cause significant pain and potential ear damage. If you genuinely need to be on decongestants, you probably shouldn't be diving that day. If you do use them, choose long-acting oral pseudoephedrine that won't wear off mid-dive rather than fast-acting nasal sprays, and clear it with a dive medical professional first.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "Reverse Block on Ascent", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b27-s1",
              text: "Most equalization talk focuses on descent because that's where the squeeze pain is most common. But ear problems on ascent — a reverse block — are also possible and can be just as bad. As you ascend, the air trapped in the middle ear expands and needs to vent back out through the Eustachian tube. If that tube is now swollen or partially blocked (especially if a decongestant has worn off), the expanding air gets trapped and pushes outward against the eardrum.",
              marks: [],
            },
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
              text: "If you feel pressure or pain in your ear on ascent, descend slightly to relieve the pressure, then ascend very slowly while gently performing Toynbee maneuvers (swallowing) to let the air vent. Never hold your breath or skip an ascent — just go up slowly. Reverse blocks usually resolve on their own within minutes if you ascend gently, but they're another reason to avoid decongestants before diving.",
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
            { _type: "span", _key: "en-b29-s1", text: "When to Call Off a Dive", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b30-s1",
              text: "If you've tried multiple techniques at a depth and still can't equalize one or both ears, the right move is to abort the dive. There is no shame in calling a dive — your guide and buddy will respect the decision, and pushing through can cause weeks of recovery for what was supposed to be an hour of fun. Signal your buddy, indicate the ear, and head up slowly. Many divers find that the ear that refused to clear on dive one is fine on dive two; the body sometimes just needs a reset.",
              marks: [],
            },
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
              text: "Don't dive at all if you have an active cold, sinus infection, ear infection, congestion you can't clear, or recent ear surgery. Don't dive within 24 hours of dental surgery. If you have chronic equalization problems and want to dive seriously, see an ENT (otolaryngologist) who works with divers — there are sometimes structural issues that can be addressed.",
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
            { _type: "span", _key: "en-b32-s1", text: "Practicing on Dry Land", marks: [] },
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
              text: "Ear equalization is one of the few diving skills you can genuinely practice without water. Several times a day — when you brush your teeth, sit in the car, watch TV — try gentle Valsalva or Frenzel maneuvers. Listen for the soft pop in each ear that indicates the tube has opened. Practice in front of a mirror so you can watch your throat muscles working. This builds muscle memory that pays off on dives, and helps you identify which technique works best for each of your ears (they may not be the same).",
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
              text: "On dive days, start equalizing gently several hours before you board the boat — every few minutes, just enough to feel the tubes opening. Chewing gum helps because it makes you swallow more frequently. By the time you're in the water, your tubes are warmed up and ready, not opening for the first time of the day under pressure.",
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
            { _type: "span", _key: "en-bx1-s1", text: "Diving with a Cold or Congestion: Just Don't", marks: [] },
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
              text: "If you're congested from a cold, allergies, or a sinus infection, the honest answer is to skip diving until you're clear. The Eustachian tubes and sinus passages are partially blocked by inflammation and mucus, which means equalization will be harder going down and potentially impossible coming up. A reverse block on ascent — where air expands inside your sinuses or middle ear but can't escape — can cause sharp pain, ruptured eardrums, or in worst cases lasting damage. Decongestants might let you descend, but as the medication wears off at depth, the rebound congestion can trap expanding air on the way up. No dive is worth that.",
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
              text: "If you're on a paid trip and feel a cold coming on, talk to your shop. Most reputable operators will let you sit out a day or push your remaining dives later in the trip, and would much rather rebook you than have you injure yourself trying to push through. The same applies if you woke up with a cold the morning of a dive — be honest with yourself and your guide.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx4-s1", text: "Practising Equalization on Dry Land", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx5",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx5-s1",
              text: "The single best investment you can make in your equalization is practicing the techniques at home, before the dive trip. Most divers have only ever attempted to equalize while descending, which is the worst possible time to learn — you're already under stress, the pressure differential is increasing, and a failed attempt sends you back to the surface. On land, with no pressure, you can experiment calmly with each technique to find one that works for your ears.",
              marks: [],
            },
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
              text: "Start with the Toynbee maneuver — pinch your nose and swallow. You should hear or feel a small click or pop in each ear; that's the Eustachian tubes briefly opening. Try the Frenzel next: close your nose, close the back of your throat as if holding your breath, then push the back of your tongue up against the roof of your mouth as if saying \"K\" or \"guh.\" If you can produce that click without using your lungs, you've got the Frenzel down — and it's the technique most dive instructors recommend for divers with stubborn ears. Practice it sitting in a chair, ten or fifteen times a day for a week before your trip, and the muscle memory will be there when you need it underwater.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx7",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx7-s1", text: "When to See an ENT Specialist", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx8",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx8-s1",
              text: "If you've worked on technique, you're not congested, you've practiced on dry land, and you still consistently fail to equalize, that's a medical issue rather than a skill issue. Common underlying causes include deviated septum, chronically narrow Eustachian tubes, persistent allergies, undiagnosed sinus disease, or scar tissue from previous infections. A diving-aware ENT specialist can evaluate the actual mechanics and either offer treatment (allergy management, surgery in some cases) or honestly tell you that diving may not be a great fit for your anatomy. Divers Alert Network maintains a referral list of physicians experienced with diving medicine; ask your dive shop or your home country's dive medical association if you don't know where to start.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx9",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx9-s1", text: "Equalization Trainers and Devices", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx10",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-bx10-s1",
              text: "A few products exist to help divers practice. The Otovent is a small balloon you inflate through one nostril; it's a medical device originally designed for children with chronic ear infections, and it teaches you what a Eustachian tube opening actually feels like — useful if you've never reliably produced one. The EarPopper is similar in concept and used in some clinical settings. Neither is necessary for most divers, but for someone who genuinely cannot produce a Valsalva or Frenzel pop on land, an Otovent for a week before the trip can be the breakthrough they need. Both are inexpensive and available without prescription in most countries.",
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
            { _type: "span", _key: "en-b35-s1", text: "What to Tell Your Dive Guide", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b36-l1", href: "https://www.grandbay-puntacana.com/courses/openwater" },
            { _type: "link", _key: "en-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b36-s1", text: "If you know you struggle with equalization, tell your guide before the dive. A good guide will adjust the descent rate, give you extra time at the surface to clear before going deeper, and choose a site with a slower bottom profile that lets you control depth more easily. New divers in particular benefit from saying upfront that this is something they're working on — a guide who knows will be far more patient and helpful than one who has to figure it out as the dive deteriorates. If you're certifying with us through ", marks: [] },
            { _type: "span", _key: "en-b36-s2", text: "an Open Water course", marks: ["en-b36-l1"] },
            { _type: "span", _key: "en-b36-s3", text: ", equalization technique is part of the curriculum and your instructor will work with you specifically until you have a reliable approach. Reach out on ", marks: [] },
            { _type: "span", _key: "en-b36-s4", text: "WhatsApp", marks: ["en-b36-l2"] },
            { _type: "span", _key: "en-b36-s5", text: " if you want to discuss a specific concern before you arrive — we hear from a lot of nervous first-time divers and can usually reassure or troubleshoot before the dive day arrives.", marks: [] },
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
              text: "Los problemas de compensación de oídos son la razón más común por la que los buzos nuevos cortan una inmersión, y el segundo gran punto de dolor en general después de los problemas con la máscara. Casi todo buzo se topa con alguna dificultad en algún momento — ya sea aprendiendo a compensar en sus primeras inmersiones o teniendo un día ocasional en que un oído simplemente no coopera. La buena noticia es que la compensación es una habilidad mecánica que mejora con la práctica, y la mayoría de los buzos que sufren al inicio se vuelven compensadores fiables una vez que entienden qué ocurre y aprenden algunas técnicas de respaldo. Esta guía explica cómo funciona realmente la compensación, repasa las seis técnicas estándar, cubre por qué algunos buzos sufren más que otros y describe qué hacer cuando tus oídos simplemente no se compensan.",
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
            { _type: "span", _key: "es-b2-s1", text: "Cómo Funciona Realmente la Compensación de Oídos", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b3-s1",
              text: "Tu oído tiene tres partes: el oído externo (todo lo visible más el canal auditivo), el oído medio (un espacio lleno de aire detrás del tímpano) y el oído interno (que contiene la cóclea y los órganos del equilibrio). El tímpano se sitúa entre el oído externo y el medio. Cuando desciendes bajo el agua, la presión del agua sobre el lado externo del tímpano aumenta rápido — alrededor de una atmósfera adicional cada 10 metros. Si la presión del aire dentro del oído medio no aumenta para igualarla, el agua empuja el tímpano hacia adentro, causando dolor y luego potencialmente lesión (un tímpano perforado o barotrauma del oído medio).",
              marks: [],
            },
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
              text: "El oído medio se conecta con la parte trasera de la garganta a través de un tubo delgado llamado trompa de Eustaquio. La compensación es el proceso de abrir esa trompa para empujar o dejar fluir aire al oído medio, subiendo su presión interna para igualar la del agua circundante. Cada técnica de compensación es solo una forma distinta de forzar la apertura de ese tubo. La trompa normalmente está cerrada la mayor parte del tiempo y se abre brevemente cuando bostezas o tragas — ese pequeño pop que escuchas al tragar en un avión es exactamente el mismo mecanismo.",
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
            { _type: "span", _key: "es-b5-s1", text: "Las Seis Técnicas de Compensación", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b6-l1", href: "https://dan.org/health-medicine/health-resource/smart-guides/beat-the-squeeze-equalize-like-a-pro/6-methods-to-equalize-your-ears/" },
          ],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "La mayoría de los buzos nuevos aprende solo una técnica — la maniobra de Valsalva — y se queda ahí. Pero ", marks: [] },
            { _type: "span", _key: "es-b6-s2", text: "Divers Alert Network documenta seis métodos", marks: ["es-b6-l1"] },
            { _type: "span", _key: "es-b6-s3", text: ", y los buzos que aprenden varias opciones tienen muchos menos problemas con el tiempo. Si un método falla, puedes probar otro.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "Maniobra de Valsalva: ", marks: ["strong"] },
            { _type: "span", _key: "es-b7-s2", text: "La estándar, que se enseña a todo buzo nuevo. Tapa las fosas nasales (o presiona el faldón de la máscara contra ellas) y sopla suavemente contra la nariz cerrada, como si intentaras exhalar por ella. La leve sobrepresión empuja aire por las trompas de Eustaquio hacia el oído medio. La palabra clave es suavemente — un Valsalva agresivo puede dañar el oído interno. Si soplar suavemente no funciona, no soples más fuerte; cambia de técnica o asciende.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Maniobra de Frenzel: ", marks: ["strong"] },
            { _type: "span", _key: "es-b8-s2", text: "Preferida por buzos experimentados, apneístas y cualquiera con problemas persistentes de compensación. Tapa la nariz, cierra la parte trasera de la garganta (como si fueras a levantar algo pesado) y empuja la parte trasera de la lengua hacia arriba y hacia atrás como si pronunciaras una \"K\" fuerte. Esto usa solo los músculos de la lengua y la garganta en lugar de los pulmones y el diafragma. Es más suave, más segura (no puede generar las presiones peligrosamente altas del Valsalva) y funciona en cualquier posición del cuerpo. Cuesta práctica aprenderla pero da resultados.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "Maniobra de Toynbee: ", marks: ["strong"] },
            { _type: "span", _key: "es-b9-s2", text: "Tapa la nariz y traga. El movimiento de tragar activa músculos que tiran de las trompas de Eustaquio abriéndolas y además crea un leve cambio de presión en la garganta. Particularmente útil en el ascenso si tienes un bloqueo inverso, pero también un buen complemento del Valsalva en el descenso.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "Técnica de Lowry: ", marks: ["strong"] },
            { _type: "span", _key: "es-b10-s2", text: "Una combinación — tapa la nariz, sopla suavemente (estilo Valsalva) mientras tragas al mismo tiempo. La combinación abre las trompas con más fiabilidad que cualquiera de los movimientos por separado. Es incómoda de coordinar al principio, pero muy efectiva cuando un oído se pone terco.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Técnica de Edmonds: ", marks: ["strong"] },
            { _type: "span", _key: "es-b11-s2", text: "Valsalva combinado con un empuje de mandíbula o inclinación de cabeza. Empuja la mandíbula inferior hacia adelante y hacia abajo (como sacando la mandíbula) o inclina la cabeza fuerte hacia un lado mientras haces un Valsalva suave. El movimiento mecánico de la mandíbula y el cuello ayuda físicamente a abrir las trompas. A menudo es el movimiento que finalmente funciona cuando otras técnicas han fallado en un oído terco.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "Apertura tubárica voluntaria (BTV): ", marks: ["strong"] },
            { _type: "span", _key: "es-b12-s2", text: "El movimiento avanzado — abrir las trompas de Eustaquio mediante puro control muscular sin pellizcar la nariz ni soplar. Algunos buzos aprenden a flexionar el paladar blando y los músculos superiores de la garganta de forma que abran las trompas voluntariamente. Si ya puedes hacerlo en tierra (algunas personas naturalmente pueden), es el método de compensación más limpio y fácil. Si no, requiere práctica seria aprenderlo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Las Reglas de la Compensación", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Compensa temprano. ", marks: ["strong"] },
            { _type: "span", _key: "es-b14-s2", text: "Empieza a compensar en la superficie antes de descender. La mayoría de los problemas ocurren porque los buzos esperan a sentir presión antes de despejar, y para entonces las trompas ya están parcialmente apretadas y más difíciles de abrir. La primera compensación debe ocurrir a cero metros, luego a uno o dos metros, y así sucesivamente.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Compensa con frecuencia. ", marks: ["strong"] },
            { _type: "span", _key: "es-b15-s2", text: "DAN y PADI recomiendan compensar más o menos cada metro de descenso — para un ritmo típico, eso son unos dos segundos. Compensa antes de sentir presión, no después. \"Compensa temprano y a menudo\" es el lema que cada instructor repite por una razón.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Compensa suavemente. ", marks: ["strong"] },
            { _type: "span", _key: "es-b16-s2", text: "Un Valsalva forzado puede causar daño real al oído interno. Si una presión suave no funciona, cambia de técnica en lugar de soplar más fuerte. La maniobra de Frenzel es preferida en profundidad porque físicamente no puede generar las presiones peligrosamente altas del Valsalva agresivo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Para y asciende si duele. ", marks: ["strong"] },
            { _type: "span", _key: "es-b17-s2", text: "El dolor de oído es el aviso de tu cuerpo de que te estás acercando al daño. Si no puedes compensar a una profundidad, asciende uno o dos metros hasta que la presión se libere y vuelve a intentarlo. Nunca empujes a través del dolor — las consecuencias van desde acumulación temporal de líquido hasta tímpano perforado o lesión del oído interno que puede afectar el equilibrio y la audición de forma permanente.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Desciende con los pies por delante. ", marks: ["strong"] },
            { _type: "span", _key: "es-b18-s2", text: "Bajar con los pies primero permite que el líquido drene fuera de las aberturas de las trompas de Eustaquio por gravedad, manteniéndolas más despejadas. Los descensos de cabeza hacen lo contrario. Usa una línea de descenso si está disponible para controlar el ritmo y pausar cuando haga falta.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Mira hacia arriba. ", marks: ["strong"] },
            { _type: "span", _key: "es-b19-s2", text: "Extender el cuello (mirar hacia arriba) ayuda a abrir las trompas de Eustaquio. Muchos buzos encuentran más fácil compensar inclinando ligeramente la cabeza hacia atrás mientras despejan. Un pequeño cambio en la posición de la cabeza puede marcar la diferencia entre una trompa que se despeja y una que no.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Por Qué Algunos Buzos Sufren Más que Otros", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b21-s1",
              text: "La anatomía individual varía. Algunas personas tienen trompas de Eustaquio naturalmente más estrechas; otras tienen un ángulo inusual que las hace más difíciles de abrir; algunas tienen una trompa estructuralmente más apretada que la otra (por eso un solo oído suele negarse a despejar mientras el otro funciona bien). Nada de esto es algo que hayas hecho mal y la mayoría aprende a trabajar alrededor de sus rarezas personales.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b22-s1",
              text: "Las alergias y la congestión son la causa modificable más común. Hasta alergias estacionales suaves, fiebre del heno o un leve resfriado pueden inflamar el revestimiento de las trompas de Eustaquio y hacer que se nieguen a abrir. Por eso a los buzos congestionados se les desaconseja bucear — el squeeze contra el que no puedes compensar puede causar lesiones reales, y los descongestionantes crean sus propios riesgos (más sobre esto en un momento).",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b23-s1",
              text: "La deshidratación espesa la mucosidad y hace que las trompas estén más pegajosas. Toma bastante agua antes de bucear. El tabaco irrita el revestimiento de las trompas; los fumadores tienden a tener más dificultades para compensar. Y la ansiedad o la tensión aprietan los músculos alrededor de la garganta y las trompas — los buzos relajados compensan más fácilmente que los tensos, lo que en parte explica por qué la primera inmersión suele ser más difícil que las posteriores del mismo viaje.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Sobre los Descongestionantes", marks: [] },
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
              text: "Muchos buzos recurren a un descongestionante (Sudafed, sprays nasales de oximetazolina como Afrin) cuando sienten los oídos tapados antes de una inmersión. Generalmente no se recomienda. El problema es el efecto rebote: cuando el medicamento se gasta en profundidad, la inflamación puede volver de golpe y atrapar presión en el oído medio que ya no puedes compensar hacia afuera. El resultado es un bloqueo inverso en el ascenso, que puede causar dolor importante y posibles daños al oído. Si genuinamente necesitas descongestionantes, probablemente no deberías bucear ese día. Si los usas, elige pseudoefedrina oral de acción prolongada que no se gaste a mitad de la inmersión en lugar de sprays nasales de acción rápida, y consúltalo antes con un profesional médico de buceo.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "Bloqueo Inverso en el Ascenso", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b27-s1",
              text: "La mayoría de la conversación sobre compensación se centra en el descenso porque es donde más común es el dolor por squeeze. Pero los problemas de oído en el ascenso — un bloqueo inverso — también son posibles y pueden ser igual de malos. Al subir, el aire atrapado en el oído medio se expande y necesita ventilarse de vuelta por la trompa de Eustaquio. Si esa trompa está ahora inflamada o parcialmente bloqueada (especialmente si un descongestionante se ha gastado), el aire en expansión queda atrapado y empuja el tímpano hacia afuera.",
              marks: [],
            },
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
              text: "Si sientes presión o dolor en el oído al ascender, desciende un poco para aliviarla y luego sube muy lentamente mientras haces maniobras suaves de Toynbee (tragando) para dejar salir el aire. Nunca contengas la respiración ni saltes un ascenso — simplemente sube despacio. Los bloqueos inversos normalmente se resuelven solos en minutos si asciendes con cuidado, pero son otra razón para evitar los descongestionantes antes de bucear.",
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
            { _type: "span", _key: "es-b29-s1", text: "Cuándo Abortar una Inmersión", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b30-s1",
              text: "Si has probado varias técnicas a una profundidad y aún no puedes compensar uno o ambos oídos, lo correcto es abortar la inmersión. No hay ninguna vergüenza en cancelar una inmersión — tu guía y compañero respetarán la decisión, y forzarlo puede causar semanas de recuperación por lo que se suponía sería una hora de diversión. Señaliza a tu compañero, indica el oído y sube despacio. Muchos buzos descubren que el oído que no quiso despejar en la primera inmersión está bien en la segunda; el cuerpo a veces solo necesita reiniciarse.",
              marks: [],
            },
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
              text: "No bucees si tienes un resfriado activo, sinusitis, infección de oído, congestión que no puedes despejar o cirugía reciente de oído. No bucees dentro de las 24 horas de una cirugía dental. Si tienes problemas crónicos de compensación y quieres bucear en serio, consulta a un otorrinolaringólogo que trabaje con buzos — a veces hay problemas estructurales que pueden tratarse.",
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
            { _type: "span", _key: "es-b32-s1", text: "Practicar en Tierra Firme", marks: [] },
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
              text: "La compensación de oídos es una de las pocas habilidades de buceo que de verdad puedes practicar sin agua. Varias veces al día — cuando te cepilles los dientes, te sientes en el carro, veas la tele — prueba un Valsalva o Frenzel suaves. Escucha el suave pop en cada oído que indica que la trompa se abrió. Practica frente a un espejo para poder ver los músculos de la garganta trabajando. Esto construye memoria muscular que da frutos en las inmersiones y te ayuda a identificar qué técnica funciona mejor para cada oído (pueden no ser la misma).",
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
              text: "Los días de buceo, empieza a compensar suavemente varias horas antes de embarcar — cada pocos minutos, lo justo para sentir que las trompas se abren. Masticar chicle ayuda porque hace que tragues con más frecuencia. Para cuando estés en el agua, tus trompas estarán calientes y listas, no abriéndose por primera vez del día bajo presión.",
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
            { _type: "span", _key: "es-bx1-s1", text: "Bucear con Gripe o Congestión: Simplemente No", marks: [] },
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
              text: "Si estás congestionado por un resfrío, alergias o una sinusitis, la respuesta honesta es saltarse el buceo hasta estar limpio. Las trompas de Eustaquio y los conductos sinusales están parcialmente bloqueados por inflamación y moco, lo que significa que igualar será más difícil al bajar y potencialmente imposible al subir. Un bloqueo inverso al ascenso — cuando el aire se expande dentro de los senos paranasales o del oído medio pero no puede salir — puede causar dolor agudo, tímpanos rotos o, en el peor de los casos, daño permanente. Los descongestionantes podrían dejarte descender, pero a medida que el medicamento pierde efecto en profundidad, la congestión de rebote puede atrapar el aire en expansión al subir. Ninguna inmersión vale eso.",
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
              text: "Si estás en un viaje pagado y sientes que se te viene un resfrío, habla con tu centro. La mayoría de los operadores serios te dejarán saltar un día o mover tus inmersiones restantes para más adelante en el viaje, y prefieren reprogramarte antes que verte lastimarte por forzar el buceo. Lo mismo aplica si te despertaste con un resfrío la mañana del día de buceo — sé honesto contigo mismo y con tu guía.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-bx4",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx4-s1", text: "Practicar la Igualación en Tierra Firme", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx5",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-bx5-s1",
              text: "La mejor inversión que puedes hacer en tu igualación es practicar las técnicas en casa, antes del viaje. La mayoría de los buzos solo ha intentado igualar mientras desciende, que es el peor momento posible para aprender — ya estás bajo estrés, el diferencial de presión va en aumento y un intento fallido te manda de vuelta a la superficie. En tierra, sin presión, puedes experimentar con calma con cada técnica para encontrar la que funciona con tus oídos.",
              marks: [],
            },
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
              text: "Empieza con la maniobra de Toynbee — pellizca la nariz y traga. Deberías oír o sentir un pequeño clic o pop en cada oído; son las trompas de Eustaquio abriéndose brevemente. Luego intenta el Frenzel: cierra la nariz, cierra el fondo de la garganta como si retuvieras la respiración y empuja la parte de atrás de la lengua contra el paladar como si dijeras \"K\" o \"gua\". Si logras producir ese clic sin usar los pulmones, dominaste el Frenzel — y es la técnica que más recomiendan los instructores para buzos con oídos rebeldes. Practícala sentado en una silla, diez o quince veces al día durante una semana antes del viaje, y la memoria muscular estará lista cuando la necesites bajo el agua.",
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
            { _type: "span", _key: "es-bx7-s1", text: "Cuándo Consultar a un Otorrinolaringólogo", marks: [] },
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
              text: "Si trabajaste la técnica, no estás congestionado, practicaste en tierra y aun así fallas consistentemente al igualar, eso es un tema médico y no de habilidad. Causas subyacentes comunes incluyen tabique nasal desviado, trompas de Eustaquio crónicamente angostas, alergias persistentes, enfermedad sinusal no diagnosticada o tejido cicatricial de infecciones previas. Un otorrinolaringólogo con experiencia en buceo puede evaluar la mecánica real y ofrecerte tratamiento (manejo de alergias, cirugía en algunos casos) o decirte honestamente que el buceo quizá no encaje bien con tu anatomía. Divers Alert Network mantiene una lista de derivación de médicos con experiencia en medicina de buceo; pregunta a tu centro o a la asociación de medicina de buceo de tu país si no sabes por dónde empezar.",
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
            { _type: "span", _key: "es-b35-s1", text: "Qué Decirle a tu Guía de Buceo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b36-l1", href: "https://www.grandbay-puntacana.com/es/courses/openwater" },
            { _type: "link", _key: "es-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b36-s1", text: "Si sabes que sufres con la compensación, díselo a tu guía antes de la inmersión. Un buen guía ajustará el ritmo de descenso, te dará tiempo extra en la superficie para despejar antes de bajar más y elegirá un sitio con un perfil de fondo más lento que te permita controlar mejor la profundidad. Los buzos nuevos en particular se benefician de decir desde el inicio que es algo en lo que están trabajando — un guía que lo sabe será mucho más paciente y útil que uno que tenga que adivinarlo a medida que la inmersión empeora. Si te estás certificando con nosotros mediante ", marks: [] },
            { _type: "span", _key: "es-b36-s2", text: "un curso Open Water", marks: ["es-b36-l1"] },
            { _type: "span", _key: "es-b36-s3", text: ", la técnica de compensación es parte del temario y tu instructor trabajará contigo específicamente hasta que tengas un método fiable. Escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b36-s4", text: "WhatsApp", marks: ["es-b36-l2"] },
            { _type: "span", _key: "es-b36-s5", text: " si quieres discutir una preocupación específica antes de llegar — escuchamos a muchos primerizos nerviosos y normalmente podemos tranquilizar o resolver dudas antes del día de la inmersión.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "Ear Equalization Problems Scuba Diving: Why and How to Fix Them (2026)",
          description:
            "Can't equalize your ears diving? Six techniques every diver should know (Valsalva, Frenzel, Toynbee, Lowry, Edmonds, BTV), why you struggle, and when to call off a dive.",
          keywords: ["ear equalization scuba diving", "valsalva maneuver diving", "frenzel maneuver", "ear problems scuba", "cant equalize ears diving", "scuba ear pain"],
        },
        es: {
          title: "Problemas de Compensación de Oídos al Bucear: Causas y Soluciones (2026)",
          description:
            "¿No puedes compensar oídos al bucear? Seis técnicas que todo buzo debe conocer (Valsalva, Frenzel, Toynbee, Lowry, Edmonds, BTV), por qué sufres y cuándo abortar.",
          keywords: ["compensar oidos buceo", "maniobra valsalva buceo", "maniobra frenzel", "problemas oido buceo", "no puedo compensar oidos buceo", "dolor oido buceo"],
        },
      },
      openGraph: {
        en: {
          title: "Ear Equalization Problems Scuba Diving: Why and How to Fix Them",
          description: "Six equalization techniques, the rules to follow, why some divers struggle, decongestant warnings, reverse blocks, and when to abort a dive.",
        },
        es: {
          title: "Problemas de Compensación de Oídos al Bucear",
          description: "Seis técnicas de compensación, las reglas a seguir, por qué algunos buzos sufren, advertencias sobre descongestionantes, bloqueos inversos y cuándo abortar.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Ear Equalization Problems Scuba Diving: Why and How to Fix Them",
          description: "A comprehensive guide to ear equalization for scuba divers, including how the middle ear and Eustachian tubes work, six equalization techniques (Valsalva, Frenzel, Toynbee, Lowry, Edmonds, BTV), the rules to follow on descent, why some divers struggle, decongestant warnings, reverse blocks on ascent, when to call off a dive, and how to practice on dry land.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/ear-equalization-problems-scuba-diving",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Problemas de Compensación de Oídos al Bucear: Por Qué Ocurren y Cómo Resolverlos",
          description: "Una guía completa de compensación de oídos para buzos, incluyendo cómo funcionan el oído medio y las trompas de Eustaquio, seis técnicas de compensación (Valsalva, Frenzel, Toynbee, Lowry, Edmonds, BTV), las reglas a seguir en el descenso, por qué algunos buzos sufren, advertencias sobre descongestionantes, bloqueos inversos en el ascenso, cuándo abortar una inmersión y cómo practicar en tierra.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/ear-equalization-problems-scuba-diving",
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