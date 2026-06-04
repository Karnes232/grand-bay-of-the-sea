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
      en: "🌬️ How to Stop Your Scuba Mask from Fogging: Complete Guide",
      es: "🌬️ Cómo Evitar que se Empañe tu Máscara de Buceo: Guía Completa",
    },

    slug: {
      _type: "slug",
      current: "how-to-stop-scuba-mask-fogging",
    },

    publishDate: "2026-05-29",

    description: {
      _type: "localizedText",
      en: "Foggy mask ruining your dives? Here's why it happens, the one-time prep that fixes new masks, the defog routine for every dive, and how to clear fog underwater.",
      es: "¿Una máscara empañada te arruina las inmersiones? Aquí está por qué pasa, la preparación única para máscaras nuevas, la rutina de antiempañante por inmersión y cómo despejar bajo el agua.",
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
              text: "A foggy mask is the most common annoyance in scuba diving. New divers experience it on almost every first dive, and even experienced divers run into it when something goes wrong with their gear or routine. The good news is that mask fogging is almost completely preventable once you understand what causes it and follow a simple two-part routine. This guide walks through why masks fog, the one-time treatment that fixes brand-new masks for life, the defog routine you should do before every single dive, what to do when your mask still fogs underwater, and how to diagnose persistent fogging that won't go away.",
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
            { _type: "span", _key: "en-b2-s1", text: "Why Scuba Masks Fog in the First Place", marks: [] },
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
              text: "Fogging happens when warm, humid air inside your mask meets the cooler glass of the lens. Water vapor in that humid air condenses into tiny droplets on the glass — the same process that fogs a bathroom mirror when you shower, or your car windshield on a cold morning. Two things drive it underwater: the temperature difference between your face and the water, and any contaminants on the inside of the lens that give the water droplets something to cling to. Even tiny amounts of skin oils, fingerprints, sunscreen residue, or factory-applied silicone film increase fogging dramatically.",
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
              text: "Brand-new masks have a particularly stubborn fogging problem because of how they're manufactured. During production, masks pick up a thin invisible layer of silicone from the moulds and from being stacked together with other masks in shipping. That silicone film is hydrophobic — it actively repels water — which sounds like it should help but actually makes things worse, because water droplets bead up tightly on it instead of spreading into a thin invisible film. Until that silicone layer is removed, no amount of pre-dive defog spray will keep a new mask clear.",
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
            { _type: "span", _key: "en-b5-s1", text: "The One-Time New Mask Treatment", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b6-l1", href: "https://blog.padi.com/ear-equalization-and-ear-care-for-scuba-divers/" },
          ],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "Before you take a new mask diving, you need to remove the factory silicone film. The standard method recommended by ", marks: [] },
            { _type: "span", _key: "en-b6-s2", text: "PADI and most dive professionals", marks: ["en-b6-l1"] },
            { _type: "span", _key: "en-b6-s3", text: " is the toothpaste treatment. It's cheap, safe, and works permanently. Use a plain, non-gel, non-whitening white toothpaste — the gritty texture of regular paste is what scrubs the silicone off. Do not use whitening toothpaste (the abrasives are too harsh and will scratch the lens), and do not use gel toothpaste (it's too smooth and won't work). Any plain mint Colgate, Crest, or generic equivalent does the job.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b7-s1",
              text: "The method itself is simple. Squeeze a small amount of toothpaste — roughly the size of a pea — onto the inside of each lens. Using your finger, rub the toothpaste over the entire inside surface in small circles. Pay special attention to the edges where the lens meets the silicone skirt, since that's where the film tends to be heaviest. Rub for at least three to five minutes per lens. Then leave the toothpaste sitting on the lenses overnight if possible — twelve hours of contact gives the cleaning agents time to fully break down the silicone film.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b8-s1",
              text: "The next morning, rinse the mask thoroughly with fresh water. Get into the corners and grooves between the lens and skirt — any leftover toothpaste residue will irritate your eyes underwater. Repeat the entire process two or three times for best results. A single round usually helps, but most masks need two or three full cycles to be completely fog-free. If you skip this step entirely and just hope your defog routine will work, you're in for a frustrating first few dives.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "About the Burning Method", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b10-s1",
              text: "You may see videos online showing divers using a lighter or torch flame to burn the silicone off the inside of a new lens. It works — the silicone is destroyed instantly — and many old-school divers swear by it. But most modern dive shops and instructors recommend against it for two reasons. First, it only works on glass lenses; if your mask has plastic or polycarbonate lenses (most masks do these days), the flame will melt or warp them and ruin the mask. Second, even on glass, holding flame near the silicone skirt risks damaging or burning the skirt itself, which compromises the seal. The toothpaste method is safer, cheaper, and works on every mask. If you're committed to burning, only do it if you can confirm your lens is tempered glass and you can keep the flame entirely on the glass surface — but really, just use the toothpaste.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "The Pre-Dive Defog Routine", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b12-s1",
              text: "Even after you've treated your mask, you still need to apply a defog before every single dive. The defog doesn't replace the toothpaste treatment — it's a thin film that prevents water droplets from forming on the lens during the dive. There are three options that all work well: commercial defog spray, diluted baby shampoo, or your own saliva.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "Commercial defog: ", marks: ["strong"] },
            { _type: "span", _key: "en-b13-s2", text: "Brands like Sea Gold, McNett Sea Drops, and Stream2Sea Mask Defog are sold at dive shops and online. Apply two or three drops to each dry lens, rub it around the entire inside surface, then rinse very briefly with seawater just before donning the mask. Don't rinse so thoroughly that you remove all the film — a thin residue is what does the work.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "Baby shampoo: ", marks: ["strong"] },
            { _type: "span", _key: "en-b14-s2", text: "Mix one part baby shampoo with about ten parts water in a small spray bottle. The mild surfactant in baby shampoo prevents droplet formation, and it doesn't sting if it gets in your eyes. Spray into the dry mask, rub it around, give a quick seawater rinse, and dive. Inexpensive and very effective.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "Saliva: ", marks: ["strong"] },
            { _type: "span", _key: "en-b15-s2", text: "The classic free method. Spit into the dry mask, rub the saliva over the entire inside surface, give a brief seawater rinse, and dive. Saliva works because of its surfactant proteins, the same way commercial defog works. It does feel awkward the first few times but it's free, always available, and your dive guide spits in their own mask every dive. The key is that the mask must be dry when you apply the saliva and you only rinse briefly afterward.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b16-s1",
              text: "Whichever method you use, three principles apply universally. Apply to a dry mask, not a wet one — water dilutes whatever surfactant you're using and reduces effectiveness. Apply fresh before each dive, not the night before — defog films are temporary and degrade between dives. And rinse only briefly with seawater, not freshwater — fresh rinsing washes too much of the film off. Many divers ruin their defog routine by rinsing their mask too vigorously right before getting in the water.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "What to Do When Your Mask Fogs Underwater", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b18-l1", href: "https://www.grandbay-puntacana.com/courses/openwater" },
          ],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Sometimes fog happens despite a good routine. The fix underwater is simple — let a small amount of seawater into the mask, swirl it across the lens, then exhale through your nose to clear the water back out. This is one of the standard skills you learn during your ", marks: [] },
            { _type: "span", _key: "en-b18-s2", text: "Open Water certification", marks: ["en-b18-l1"] },
            { _type: "span", _key: "en-b18-s3", text: " and most divers can do it without breaking buoyancy or stopping the dive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b19-s1",
              text: "The technique: tilt your head back slightly so the bottom edge of the mask sits lower than the top. Press the top of the mask frame gently against your forehead with one finger, breaking the seal there. Let a small amount of water in through the bottom — just enough to slosh across the lens, not enough to flood completely. Quickly tilt your head forward, press the top of the mask back into place, and exhale through your nose slowly. The water drains out the bottom and you can see clearly again. The whole process takes about five seconds with practice.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "Diagnosing Persistent Fogging", marks: [] },
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
              text: "If your mask still fogs after the new-mask treatment and a good defog routine, something else is going on. Run through this checklist.",
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
            { _type: "span", _key: "en-b22-s1", text: "You're breathing through your nose. ", marks: ["strong"] },
            { _type: "span", _key: "en-b22-s2", text: "This is the most common cause of persistent fogging. The mask should only have air going in from your face on the skin side, not from your nose. Every time you exhale through your nose, you push warm humid air directly into the mask. Practice breathing in and out only through your regulator, not through your nose.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "Your mask doesn't fit properly. ", marks: ["strong"] },
            { _type: "span", _key: "en-b23-s2", text: "A mask that's too loose or too tight allows tiny air gaps that introduce warm air. Test fit by holding the mask to your face without the strap and gently inhaling through your nose — if it seals against your face from suction alone for several seconds, the fit is good. If it falls off or has visible gaps, try a different mask shape.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "Sunscreen, makeup, or skin oils on the lens. ", marks: ["strong"] },
            { _type: "span", _key: "en-b24-s2", text: "Anything oily transfers from your face or fingers to the inside of the lens and ruins the defog film. Wash your hands before applying defog, and try not to handle the inside of the lens after applying. Reef-safe mineral sunscreen is particularly prone to leaving residue on lenses — wipe your forehead area before putting the mask on.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "The mask is too old. ", marks: ["strong"] },
            { _type: "span", _key: "en-b25-s2", text: "Older masks accumulate a film of skin oils, body proteins, and other residue that's harder to remove. If your mask is several years old and your defog routine isn't working anymore, try the toothpaste treatment again — it often refreshes an older mask. If even that doesn't work, the silicone skirt may be hardening and developing micro-cracks that introduce air. Replace it.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "Water temperature is unusually cold for the air. ", marks: ["strong"] },
            { _type: "span", _key: "en-b26-s2", text: "A mask that performs perfectly in warm Caribbean water may fog more in colder destinations. The bigger the temperature difference between your face and the water, the more aggressive the fogging. This isn't a problem you encounter much in Punta Cana with water temperatures around 26 to 29 degrees Celsius year-round.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Mask Care Between Dives and Trips", marks: [] },
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
              text: "Between dives in the same trip, rinse your mask in fresh water if available and let it air-dry inside a mesh gear bag. Don't leave it sitting in the sun on a hot dive deck — UV exposure and heat degrade the silicone skirt over time. Don't leave it pressed face-down on a hard surface — even brief pressure can deform the skirt's seal. And don't store it in the same bag as your wetsuit when both are still wet, because that traps moisture and can encourage mold growth on the silicone.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b29-s1",
              text: "Between trips, rinse the mask thoroughly with fresh water, dry it completely, and store it in its hard case or in a mesh bag in a cool dry place out of direct sunlight. A few drops of silicone preservative on the skirt every few months extends the life. Inspect the silicone skirt periodically — if it shows cracks, hardening, or yellowing, replace it. A mask with a degraded skirt will leak constantly no matter how well you defog it.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "Rental Masks: A Special Case", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b31-l1", href: "https://www.grandbay-puntacana.com/courses/discover" },
          ],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "If you're renting gear — common on a ", marks: [] },
            { _type: "span", _key: "en-b31-s2", text: "Discover Scuba dive", marks: ["en-b31-l1"] },
            { _type: "span", _key: "en-b31-s3", text: " or for travelers who don't own gear — the mask has usually been pre-treated by the operator and used by many divers before you, so the silicone film is long gone. Rental masks are usually less prone to fogging than brand-new owned masks for exactly that reason. Apply defog (the operator's defog or your own), rinse briefly, and dive. If the mask doesn't fit your face well, ask the operator for a different size or shape — fit matters more than brand. Don't be shy about trying two or three masks before settling on one.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "Quick Reference: The Complete Anti-Fog System", marks: [] },
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
              text: "For a new owned mask: scrub inside lenses with plain white toothpaste for 3–5 minutes per lens, leave overnight, rinse thoroughly, repeat the cycle 2–3 times before first dive. For every subsequent dive: apply defog (commercial spray, baby shampoo solution, or saliva) to dry lenses, rub it around, brief seawater rinse, then put the mask on without touching the inside. Underwater if fog develops: tilt head back, crack the top seal, let a little water in, exhale through the nose, water drains out the bottom. Between dives: fresh-water rinse if available, air-dry, store out of sunlight. If fog keeps happening despite all this, you're probably breathing through your nose during the dive — most common cause by far.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b34-s1", text: "When Fog Is Not Actually the Problem", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx1-s1", text: "Prescription Masks and Specialty Lenses", marks: [] },
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
              text: "If you wear glasses or contacts, fogging affects you a little differently. Contacts work fine for diving but evaporate faster in the air pocket of a mask, so dry-eye discomfort can be mistaken for fogging — keep your eyes closed during clears and rinses rather than blinking through them. Prescription dive masks have ground or bonded corrective lenses installed in standard mask housings; the lens itself is glass and accepts the same toothpaste treatment and pre-dive defog routine described above. Bonded stick-on diopter lenses work too but the adhesive layer is occasionally sensitive to alcohol-based defog sprays — stick with a gentle gel or baby shampoo solution on those. Bifocal dive masks (with a small reader segment at the bottom of each lens for reading gauges) follow the same prep rules as standard masks.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-bx3",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx3-s1", text: "Single Lens vs. Twin Lens — Does It Matter?", marks: [] },
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
              text: "Both styles fog the same way and require the same treatment, but they differ slightly in how the fogging shows up. Single-lens masks (one large window across both eyes) tend to fog more uniformly; twin-lens masks (separate left and right windows) sometimes fog asymmetrically when one lens runs warmer than the other, particularly if you breathe through your nose on one side. Twin-lens designs are usually easier to fit faces with narrow noses or strong cheekbones because the housing has more flex. Neither style is meaningfully easier to defog — pick based on field of view, fit, and personal preference, not on fog resistance.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b35",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b35-s1",
              text: "One last thing worth mentioning. Many divers describe their mask as fogging when what's actually happening is leaking. A small but steady inflow of water from a poor seal collects in the bottom of the mask and looks like condensation on the lens. The two problems look similar but require completely different fixes. If you're regularly clearing water from a mask that shouldn't be fogging, check the seal: try the inhale test, look for hair caught in the skirt (the most common culprit, especially around the temples), check the strap tension, and make sure the mask sits flat against your face without pressing too hard. A leaking mask will keep producing what looks like fog no matter how perfectly you defog it.",
              marks: [],
            },
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
            { _type: "span", _key: "en-b36-s1", text: "If you're diving with us in Punta Cana and still struggling with a foggy mask after a dive or two, talk to your guide on the boat — small fixes like adjusting the strap, tucking in stray hairs, or swapping the rental mask take a minute and make a huge difference to the rest of the day. You can also reach out before the trip through our ", marks: [] },
            { _type: "span", _key: "en-b36-s2", text: "contact page", marks: ["en-b36-l1"] },
            { _type: "span", _key: "en-b36-s3", text: " or on ", marks: [] },
            { _type: "span", _key: "en-b36-s4", text: "WhatsApp", marks: ["en-b36-l2"] },
            { _type: "span", _key: "en-b36-s5", text: " if you have questions about your own gear or want tips specific to the diving conditions here.", marks: [] },
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
              text: "Una máscara empañada es la molestia más común del buceo. Los buzos nuevos la sufren en casi cada primera inmersión, y hasta los buzos experimentados se topan con ella cuando algo falla en su equipo o rutina. La buena noticia es que el empañamiento es casi totalmente prevenible una vez que entiendes qué lo causa y sigues una sencilla rutina de dos partes. Esta guía recorre por qué se empañan las máscaras, el tratamiento único que arregla las máscaras nuevas para siempre, la rutina de antiempañante que debes hacer antes de cada inmersión, qué hacer si tu máscara se empaña bajo el agua y cómo diagnosticar el empañamiento persistente que no quiere irse.",
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
            { _type: "span", _key: "es-b2-s1", text: "Por Qué se Empañan las Máscaras de Buceo", marks: [] },
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
              text: "El empañamiento ocurre cuando el aire cálido y húmedo dentro de tu máscara se encuentra con el vidrio más frío del lente. El vapor de agua en ese aire húmedo se condensa en pequeñas gotitas sobre el vidrio — el mismo proceso que empaña el espejo del baño cuando te duchas, o el parabrisas del carro en una mañana fría. Dos cosas lo impulsan bajo el agua: la diferencia de temperatura entre tu cara y el agua, y cualquier contaminante en el interior del lente que dé a las gotitas de agua algo a lo que aferrarse. Hasta cantidades minúsculas de grasa de la piel, huellas, residuo de protector solar o el film de silicona aplicado de fábrica aumentan el empañamiento de forma dramática.",
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
              text: "Las máscaras nuevas tienen un problema de empañamiento particularmente terco por cómo se fabrican. Durante la producción, las máscaras agarran una fina capa invisible de silicona de los moldes y de estar apiladas con otras máscaras en el envío. Ese film de silicona es hidrofóbico — repele el agua de forma activa — lo cual suena como que debería ayudar pero en realidad empeora las cosas, porque las gotitas de agua se agrupan muy compactas sobre él en lugar de extenderse en una película fina e invisible. Hasta que se elimine esa capa de silicona, ningún spray antiempañante mantendrá despejada una máscara nueva.",
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
            { _type: "span", _key: "es-b5-s1", text: "El Tratamiento Único para Máscaras Nuevas", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b6-l1", href: "https://blog.padi.com/ear-equalization-and-ear-care-for-scuba-divers/" },
          ],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "Antes de llevar una máscara nueva a bucear, tienes que eliminar el film de silicona de fábrica. El método estándar recomendado por ", marks: [] },
            { _type: "span", _key: "es-b6-s2", text: "PADI y la mayoría de los profesionales del buceo", marks: ["es-b6-l1"] },
            { _type: "span", _key: "es-b6-s3", text: " es el tratamiento con pasta dental. Es económico, seguro y funciona permanentemente. Usa una pasta dental blanca, sencilla, sin gel y sin blanqueador — la textura ligeramente granulosa de la pasta común es lo que arranca la silicona. No uses pasta blanqueadora (sus abrasivos son demasiado duros y rayarán el lente), y no uses pasta en gel (es muy lisa y no funcionará). Cualquier Colgate o Crest común de menta, o un genérico equivalente, hace el trabajo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b7-s1",
              text: "El método en sí es sencillo. Pon una pequeña cantidad de pasta dental — del tamaño de un guisante — en el interior de cada lente. Con el dedo, frota la pasta sobre toda la superficie interna en pequeños círculos. Presta especial atención a los bordes donde el lente se une al faldón de silicona, porque ahí es donde el film tiende a ser más grueso. Frota al menos de tres a cinco minutos por lente. Luego deja la pasta sobre los lentes toda la noche si es posible — doce horas de contacto le dan a los agentes limpiadores el tiempo de descomponer del todo el film de silicona.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b8-s1",
              text: "A la mañana siguiente, enjuaga la máscara a fondo con agua dulce. Mete los dedos en las esquinas y ranuras entre el lente y el faldón — cualquier residuo de pasta que quede te irritará los ojos bajo el agua. Repite todo el proceso dos o tres veces para obtener mejores resultados. Una sola ronda suele ayudar, pero la mayoría de las máscaras necesita dos o tres ciclos completos para quedar totalmente libre de empañamiento. Si te saltas este paso por completo y solo esperas que tu rutina de antiempañante funcione, te esperan unas primeras inmersiones frustrantes.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "Sobre el Método de Quemar", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b10-s1",
              text: "Quizá veas videos en línea de buzos usando un encendedor o una llama para quemar la silicona en el interior de un lente nuevo. Funciona — la silicona se destruye al instante — y muchos buzos a la antigua lo defienden. Pero la mayoría de las tiendas de buceo y los instructores modernos lo desaconsejan por dos razones. Primero, solo funciona en lentes de vidrio; si tu máscara tiene lentes plásticos o de policarbonato (la mayoría hoy en día), la llama los derretirá o deformará y arruinará la máscara. Segundo, incluso en vidrio, mantener la llama cerca del faldón de silicona arriesga dañarlo o quemarlo, lo que compromete el sellado. El método de la pasta dental es más seguro, más económico y funciona en todas las máscaras. Si insistes en quemar, hazlo solo si confirmas que tu lente es de vidrio templado y puedes mantener la llama completamente sobre la superficie de vidrio — pero en serio, mejor usa la pasta.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "La Rutina de Antiempañante Antes de Bucear", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b12-s1",
              text: "Incluso después de tratar tu máscara, sigues teniendo que aplicar un antiempañante antes de cada inmersión. El antiempañante no sustituye al tratamiento de pasta dental — es una película fina que evita que se formen gotitas de agua sobre el lente durante la inmersión. Hay tres opciones que funcionan bien: spray antiempañante comercial, shampoo de bebé diluido o tu propia saliva.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Antiempañante comercial: ", marks: ["strong"] },
            { _type: "span", _key: "es-b13-s2", text: "Marcas como Sea Gold, McNett Sea Drops y Stream2Sea Mask Defog se venden en tiendas de buceo y en línea. Aplica dos o tres gotas a cada lente seco, frótalo por toda la superficie interna y enjuaga muy brevemente con agua de mar justo antes de colocarte la máscara. No enjuagues tanto que quites toda la película — un residuo fino es lo que hace el trabajo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Shampoo de bebé: ", marks: ["strong"] },
            { _type: "span", _key: "es-b14-s2", text: "Mezcla una parte de shampoo de bebé con unas diez partes de agua en una botellita con atomizador. El surfactante suave del shampoo de bebé evita la formación de gotas y no escuece si entra a los ojos. Rocía dentro de la máscara seca, frótalo, da un breve enjuague con agua de mar y bucea. Económico y muy efectivo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Saliva: ", marks: ["strong"] },
            { _type: "span", _key: "es-b15-s2", text: "El método clásico y gratis. Escupe en la máscara seca, frota la saliva por toda la superficie interna, da un breve enjuague con agua de mar y bucea. La saliva funciona por sus proteínas surfactantes, igual que el antiempañante comercial. Sí se siente raro las primeras veces, pero es gratis, siempre está disponible, y tu guía de buceo escupe en su propia máscara cada inmersión. La clave es que la máscara debe estar seca cuando apliques la saliva y solo enjuagas brevemente después.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b16-s1",
              text: "Cualquiera que sea el método que uses, tres principios aplican universalmente. Aplícalo en una máscara seca, no en una mojada — el agua diluye el surfactante que uses y reduce su efectividad. Aplica recién antes de cada inmersión, no la noche anterior — las películas antiempañantes son temporales y se degradan entre inmersiones. Y enjuaga solo brevemente con agua de mar, no con agua dulce — el enjuague con dulce arrastra demasiado film. Muchos buzos arruinan su rutina enjuagando la máscara con demasiada fuerza justo antes de meterse al agua.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Qué Hacer Cuando se te Empaña la Máscara Bajo el Agua", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b18-l1", href: "https://www.grandbay-puntacana.com/es/courses/openwater" },
          ],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "A veces el empañamiento ocurre a pesar de una buena rutina. El arreglo bajo el agua es simple — deja entrar una pequeña cantidad de agua de mar a la máscara, agítala por el lente y exhala por la nariz para sacar el agua. Es una de las habilidades estándar que aprendes durante tu ", marks: [] },
            { _type: "span", _key: "es-b18-s2", text: "certificación Open Water", marks: ["es-b18-l1"] },
            { _type: "span", _key: "es-b18-s3", text: " y la mayoría de los buzos la hace sin romper la flotabilidad ni detener la inmersión.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b19-s1",
              text: "La técnica: inclina la cabeza un poco hacia atrás para que el borde inferior de la máscara quede más bajo que el superior. Presiona suavemente el marco superior contra la frente con un dedo, rompiendo el sellado ahí. Deja entrar un poco de agua por abajo — solo lo justo para que se mueva por el lente, no para inundar del todo. Rápidamente inclina la cabeza hacia adelante, vuelve a presionar la parte superior en su sitio y exhala despacio por la nariz. El agua sale por abajo y vuelves a ver con claridad. Todo el proceso toma unos cinco segundos con práctica.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Diagnosticar el Empañamiento Persistente", marks: [] },
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
              text: "Si tu máscara sigue empañándose después del tratamiento de máscara nueva y de una buena rutina de antiempañante, algo más está pasando. Revisa esta lista.",
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
            { _type: "span", _key: "es-b22-s1", text: "Estás respirando por la nariz. ", marks: ["strong"] },
            { _type: "span", _key: "es-b22-s2", text: "Es la causa más común del empañamiento persistente. En la máscara solo debe entrar aire desde tu cara por el lado de la piel, no por la nariz. Cada vez que exhalas por la nariz, metes aire cálido y húmedo directamente en la máscara. Practica inhalar y exhalar solo por el regulador, no por la nariz.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Tu máscara no te queda bien. ", marks: ["strong"] },
            { _type: "span", _key: "es-b23-s2", text: "Una máscara demasiado floja o demasiado apretada deja pequeñas brechas de aire que meten aire cálido. Prueba el ajuste sosteniendo la máscara contra la cara sin la correa e inhalando suavemente por la nariz — si se sostiene contra tu cara solo por la succión durante varios segundos, el ajuste es bueno. Si se cae o tiene huecos visibles, prueba otra forma de máscara.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Protector solar, maquillaje o grasa de la piel en el lente. ", marks: ["strong"] },
            { _type: "span", _key: "es-b24-s2", text: "Cualquier cosa grasa se transfiere de tu cara o tus dedos al interior del lente y arruina la película antiempañante. Lávate las manos antes de aplicar el antiempañante e intenta no tocar el interior del lente después. El protector solar mineral reef-safe es particularmente propenso a dejar residuo en los lentes — limpia tu zona de la frente antes de ponerte la máscara.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "La máscara está demasiado vieja. ", marks: ["strong"] },
            { _type: "span", _key: "es-b25-s2", text: "Las máscaras viejas acumulan una capa de grasa de la piel, proteínas corporales y otros residuos más difíciles de quitar. Si tu máscara tiene varios años y tu rutina de antiempañante ya no funciona, prueba el tratamiento con pasta dental de nuevo — a menudo refresca una máscara vieja. Si ni eso funciona, el faldón de silicona puede estar endureciéndose y desarrollando micro-fisuras que meten aire. Reemplázala.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "La temperatura del agua es inusualmente fría para el aire. ", marks: ["strong"] },
            { _type: "span", _key: "es-b26-s2", text: "Una máscara que funciona perfecto en agua caribeña tibia puede empañarse más en destinos más fríos. Cuanto mayor es la diferencia de temperatura entre tu cara y el agua, más agresivo es el empañamiento. No es un problema que encuentres mucho en Punta Cana con temperaturas del agua entre 26 y 29 grados todo el año.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Cuidado de la Máscara entre Inmersiones y Viajes", marks: [] },
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
              text: "Entre inmersiones del mismo viaje, enjuaga tu máscara con agua dulce si está disponible y déjala secar al aire dentro de una bolsa de malla. No la dejes al sol sobre una cubierta caliente — la exposición a UV y el calor degradan el faldón de silicona con el tiempo. No la dejes apoyada boca abajo sobre una superficie dura — incluso una presión breve puede deformar el sellado del faldón. Y no la guardes en la misma bolsa que tu traje de neopreno si ambos están mojados, porque eso atrapa humedad y puede favorecer moho en la silicona.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b29-s1",
              text: "Entre viajes, enjuaga la máscara a fondo con agua dulce, sécala por completo y guárdala en su estuche rígido o en una bolsa de malla en un lugar fresco y seco, lejos del sol directo. Unas gotas de conservante para silicona en el faldón cada pocos meses alargan su vida. Inspecciona el faldón de silicona de vez en cuando — si muestra fisuras, endurecimiento o amarillamiento, reemplázalo. Una máscara con faldón degradado va a filtrar agua constantemente por mejor que apliques el antiempañante.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "Máscaras de Alquiler: Un Caso Especial", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b31-l1", href: "https://www.grandbay-puntacana.com/es/courses/discover" },
          ],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "Si estás alquilando equipo — algo común en una ", marks: [] },
            { _type: "span", _key: "es-b31-s2", text: "inmersión Discover Scuba", marks: ["es-b31-l1"] },
            { _type: "span", _key: "es-b31-s3", text: " o para viajeros que no tienen equipo propio — la máscara normalmente ya fue pretratada por el operador y usada por muchos buzos antes que tú, así que la silicona de fábrica desapareció hace tiempo. Las máscaras de alquiler suelen ser menos propensas al empañamiento que las nuevas propias precisamente por esa razón. Aplica antiempañante (el del operador o el tuyo), enjuaga brevemente y bucea. Si la máscara no te queda bien, pide al operador otra talla o forma — el ajuste importa más que la marca. No te dé vergüenza probar dos o tres máscaras antes de quedarte con una.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "Referencia Rápida: El Sistema Completo Antiempañamiento", marks: [] },
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
              text: "Para una máscara nueva propia: frota el interior de los lentes con pasta dental blanca común durante 3 a 5 minutos por lente, déjala toda la noche, enjuaga a fondo, repite el ciclo 2 o 3 veces antes de la primera inmersión. Para cada inmersión posterior: aplica antiempañante (spray comercial, solución de shampoo de bebé o saliva) a los lentes secos, frótalo, breve enjuague con agua de mar, y ponte la máscara sin tocar el interior. Bajo el agua, si aparece empañamiento: inclina la cabeza hacia atrás, rompe el sellado superior, deja entrar un poco de agua, exhala por la nariz y el agua sale por abajo. Entre inmersiones: enjuague con agua dulce si está disponible, secar al aire, guardar fuera del sol. Si el empañamiento sigue ocurriendo a pesar de todo esto, lo más probable es que estés respirando por la nariz durante la inmersión — es la causa más común de lejos.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b34-s1", text: "Cuando el Empañamiento No es el Problema Real", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx1-s1", text: "Máscaras Graduadas y Lentes Especiales", marks: [] },
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
              text: "Si usas anteojos o lentes de contacto, el empañamiento te afecta de manera un poco distinta. Los lentes de contacto funcionan bien para bucear pero se secan más rápido en la cámara de aire de una máscara, así que la molestia de ojo seco puede confundirse con empañamiento — mantén los ojos cerrados durante los vaciados y enjuagues en lugar de parpadear. Las máscaras de buceo graduadas tienen lentes correctivos pulidos o adheridos en cuerpos de máscara estándar; el lente en sí es de vidrio y acepta el mismo tratamiento con pasta de dientes y la misma rutina de antiempañante descritos arriba. Las lentes diópter adhesivas también funcionan, pero la capa de pegamento es ocasionalmente sensible a los antiempañantes con alcohol — quédate con un gel suave o solución de champú de bebé en esos. Las máscaras bifocales (con un pequeño segmento de lectura en la parte baja de cada lente para leer manómetros) siguen las mismas reglas de preparación que las máscaras estándar.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-bx3",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx3-s1", text: "Lente Único vs. Doble Lente — ¿Importa?", marks: [] },
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
              text: "Ambos estilos se empañan igual y requieren el mismo tratamiento, pero se diferencian un poco en cómo se manifiesta el empañamiento. Las máscaras de lente único (una ventana grande para ambos ojos) tienden a empañarse de manera más uniforme; las máscaras de doble lente (ventanas izquierda y derecha separadas) a veces se empañan de forma asimétrica cuando un lente corre más caliente que el otro, sobre todo si respiras por la nariz hacia un lado. Los diseños de doble lente suelen ser más fáciles de ajustar a caras con nariz angosta o pómulos marcados porque el cuerpo tiene más flexibilidad. Ningún estilo es significativamente más fácil de desempañar — elige por el campo visual, el ajuste y la preferencia personal, no por resistencia al empañamiento.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b35",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b35-s1",
              text: "Una última cosa que vale la pena mencionar. Muchos buzos describen su máscara como empañada cuando lo que realmente ocurre es que está filtrando. Una entrada pequeña pero constante de agua por un mal sellado se acumula en el fondo de la máscara y parece condensación sobre el lente. Los dos problemas se ven parecidos pero requieren soluciones totalmente distintas. Si estás vaciando agua de una máscara que no debería empañarse, revisa el sellado: prueba el test de inhalación, busca pelos atrapados en el faldón (el culpable más común, sobre todo en las sienes), revisa la tensión de la correa y asegúrate de que la máscara se apoye plana contra tu cara sin apretar de más. Una máscara que filtra seguirá produciendo lo que parece empañamiento por mejor que apliques el antiempañante.",
              marks: [],
            },
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
            { _type: "span", _key: "es-b36-s1", text: "Si estás buceando con nosotros en Punta Cana y sigues luchando con una máscara empañada después de una o dos inmersiones, habla con tu guía en el bote — ajustes pequeños como apretar la correa, meter algún pelo suelto o cambiar la máscara de alquiler toman un minuto y hacen una gran diferencia el resto del día. También puedes contactarnos antes del viaje a través de nuestra ", marks: [] },
            { _type: "span", _key: "es-b36-s2", text: "página de contacto", marks: ["es-b36-l1"] },
            { _type: "span", _key: "es-b36-s3", text: " o por ", marks: [] },
            { _type: "span", _key: "es-b36-s4", text: "WhatsApp", marks: ["es-b36-l2"] },
            { _type: "span", _key: "es-b36-s5", text: " si tienes preguntas sobre tu propio equipo o quieres consejos específicos para las condiciones de buceo de aquí.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "How to Stop Your Scuba Mask from Fogging: Complete Guide (2026)",
          description:
            "Foggy scuba mask? The one-time toothpaste prep for new masks, defog routine before every dive, how to clear fog underwater, and how to fix persistent fogging.",
          keywords: ["scuba mask fogging", "how to stop mask fogging", "new mask toothpaste", "defog scuba mask", "mask fogging underwater", "scuba mask care"],
        },
        es: {
          title: "Cómo Evitar que se Empañe tu Máscara de Buceo: Guía Completa (2026)",
          description:
            "¿Máscara empañada? Tratamiento único con pasta dental para máscaras nuevas, rutina antiempañante antes de cada inmersión, cómo despejar bajo el agua y cómo arreglar el empañamiento persistente.",
          keywords: ["empañamiento mascara buceo", "como evitar empañamiento mascara", "pasta dental mascara nueva", "antiempañante mascara buceo", "mascara empañada buceo"],
        },
      },
      openGraph: {
        en: {
          title: "How to Stop Your Scuba Mask from Fogging",
          description: "The complete fog-prevention system: toothpaste prep, defog routine, underwater clearing, and how to diagnose persistent fogging.",
        },
        es: {
          title: "Cómo Evitar que se Empañe tu Máscara de Buceo",
          description: "El sistema completo de prevención: pasta dental, rutina antiempañante, despejar bajo el agua y cómo diagnosticar empañamiento persistente.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "How to Stop Your Scuba Mask from Fogging: Complete Guide",
          description: "A complete guide to preventing scuba mask fogging, including why masks fog, the one-time toothpaste treatment for new masks, the pre-dive defog routine, how to clear fog underwater, troubleshooting persistent fogging, and mask care between dives.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/how-to-stop-scuba-mask-fogging",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Cómo Evitar que se Empañe tu Máscara de Buceo: Guía Completa",
          description: "Una guía completa para prevenir el empañamiento de la máscara de buceo, incluido por qué se empañan, el tratamiento único con pasta dental para máscaras nuevas, la rutina antiempañante antes de bucear, cómo despejar bajo el agua, solución de problemas persistentes y cuidado de la máscara entre inmersiones.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/how-to-stop-scuba-mask-fogging",
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