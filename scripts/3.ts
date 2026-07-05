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
      en: "⏱️ How Long Does a Typical Scuba Dive Last in Punta Cana?",
      es: "⏱️ ¿Cuánto Dura una Inmersión Típica en Punta Cana?",
    },

    slug: {
      _type: "slug",
      current: "how-long-scuba-dive-lasts-punta-cana",
    },

    publishDate: "2026-07-04",

    description: {
      _type: "localizedText",
      en: "Certified 2-tank dives in Punta Cana typically run around 45 minutes each. Here's what determines dive length — depth, air consumption, water temperature — and how DSD, courses, and Shark Point compare.",
      es: "Las inmersiones de dos tanques para buzos certificados en Punta Cana suelen durar unos 45 minutos cada una. Aquí lo que determina la duración — profundidad, consumo de aire, temperatura del agua — y cómo se comparan DSD, cursos y Shark Point.",
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
            { _type: "span", _key: "en-b1-s1", text: "Short answer: a typical certified dive in Punta Cana runs around 45 minutes underwater. That's the number that comes up most often when we tell divers what to expect from our standard two-tank guided trips — sometimes a bit longer at shallower depths, sometimes a bit shorter at deeper sites. A Discover Scuba Diving experience, which is a shorter format for first-timers, is usually 30 minutes or so of actual underwater time. But \"how long does a dive last\" has more to it than a single number, because the actual time depends on your depth, your air consumption rate, the water temperature, and how hard you're working. This post walks through the factors, the different dive formats, and how the timing looks in practice on our boat.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "Standard 2-Tank Dives: About 45 Minutes Each", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b3-l1", href: "https://www.grandbay-puntacana.com/sites" },
          ],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "For ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "our standard guided dives on Punta Cana reefs", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: ", the typical bottom time on each dive is about 45 minutes. A two-tank morning trip usually looks like this: leave the shop around 8:30 AM, arrive at the first dive site 20 to 30 minutes later, do a 45-minute dive at a depth in the 12 to 18 meter range, come up for a 45 to 60 minute surface interval on the boat, drop back down for the second 45-minute dive at a nearby site, and be back on land by early afternoon. That's the shape of most days.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "The 45-minute figure isn't a rule; it's a strong average for the depth range we typically dive. Divers with better air efficiency come up with plenty of air after 50 minutes; new divers or divers still working on their breathing sometimes reach the reserve pressure closer to the 35 to 40 minute mark. Nobody's checking a stopwatch and forcing everyone up at exactly 45 — the actual dive ends when either the dive's no-decompression limit is approached, or when someone in the group is getting low on air, whichever comes first.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "What Actually Determines How Long a Dive Lasts", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "Four main factors set the length of any dive: depth, air consumption, water temperature, and exertion level. Depth is the biggest one — the deeper you go, the faster you use air and the sooner you approach the no-decompression limit. This is why a shallow reef dive at 10 meters can last 60+ minutes while a 30-meter deep dive maxes out at around 25 minutes. Punta Cana's popular reef sites at 12 to 18 meters are in the sweet spot where 45-minute bottom times are natural.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b7-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "Air consumption — technically your SAC rate (Surface Air Consumption) — is the second big factor and the one that varies most between individuals. According to research summarized by ", marks: [] },
            { _type: "span", _key: "en-b7-s2", text: "Divers Alert Network", marks: ["en-b7-l1"] },
            { _type: "span", _key: "en-b7-s3", text: ", typical recreational divers consume 15 to 25 liters per minute at the surface, which translates to different actual consumption rates at different depths (because air is denser at depth). Divers with lower SAC rates naturally get longer bottom times from the same tank; divers with higher rates come up sooner. Experience is the main variable — new divers usually breathe more heavily out of nerves and unfamiliarity, and SAC rate typically drops significantly over the first 20 to 50 dives.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "Depth and No-Decompression Limits", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "Every recreational dive has to stay within a maximum bottom time based on depth, set by no-decompression limits (NDLs). These come from decompression theory — the deeper and longer you dive, the more nitrogen your tissues absorb, and beyond certain thresholds you'd need required decompression stops before you could safely surface. Recreational diving stays within limits that allow direct ascent (with just a safety stop). At 12 meters, NDL is well over an hour. At 18 meters, roughly 50+ minutes. At 25 meters, closer to 30 minutes. At 30 meters, closer to 20 minutes. At 40 meters, less than 10 minutes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "In practice, on a typical Punta Cana reef dive at 12 to 18 meters, air consumption is usually the limiting factor rather than NDL — divers run low on air before they approach the no-deco time. On deeper dives at 25 to 30 meters, the two limits get closer together and NDL sometimes matters more. Modern dive computers track both simultaneously and alert you well before either becomes an issue.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "Water Temperature and Duration", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Water temperature affects duration in two ways — one small, one bigger. The small effect is that colder water increases air consumption because your body works harder to maintain core temperature; this can shorten dives by a minute or two. In Punta Cana's warm waters (26 to 29°C year-round) this effect is barely noticeable compared to divers coming from colder home waters. The bigger effect is thermal comfort itself — a diver getting cold decides to end the dive early even if air and NDL are fine, which is a psychological limit rather than a hard physical one. This is why proper thermal protection matters even in warm water; a diver who's slightly chilled at minute 35 misses out on the last 10 to 15 minutes of a good dive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "Discover Scuba Diving: Shorter Format", marks: [] },
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
            { _type: "span", _key: "en-b14-s1", text: "For ", marks: [] },
            { _type: "span", _key: "en-b14-s2", text: "Discover Scuba Diving", marks: ["en-b14-l1"] },
            { _type: "span", _key: "en-b14-s3", text: " participants — people trying scuba for the first time without a certification — the underwater time is typically around 30 minutes. This is shorter than a certified dive for two reasons: DSD depth is limited to 12 meters (which is more forgiving on air consumption), and beginner air consumption is usually higher than experienced divers'. The 30-minute figure covers a real dive experience with time to see reef life, practice basic skills, and get comfortable with underwater breathing — but it's shorter than what certified divers get from the same amount of air because a first-time diver breathes through it faster.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "The DSD session itself is longer than 30 minutes — there's a briefing, gear setup, some skills in shallow water before descending, and the underwater exploration portion. Total time from arrival at the shop to end of the dive is usually 2 to 3 hours. If you get comfortable during the DSD, some operators (including us) offer an optional second DSD dive the same day for divers who want more time.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "Certification Course Dives", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b17-l1", href: "https://www.grandbay-puntacana.com/courses/openwater" },
          ],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "For ", marks: [] },
            { _type: "span", _key: "en-b17-s2", text: "Open Water certification students", marks: ["en-b17-l1"] },
            { _type: "span", _key: "en-b17-s3", text: ", each of the four open-water training dives runs about 30 to 40 minutes, similar to DSD length but with specific skills to complete during each dive. Skills include things like mask clearing, regulator recovery, controlled emergency swimming ascents, and buoyancy exercises. As students progress from dive one to dive four, their air consumption improves noticeably and later dives feel longer even at the same depth. By the fourth open-water dive, most students are approaching the 40-minute range that mirrors the standard certified dive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b18-l1", href: "https://www.grandbay-puntacana.com/courses/advanced" },
          ],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "For ", marks: [] },
            { _type: "span", _key: "en-b18-s2", text: "Advanced Open Water students", marks: ["en-b18-l1"] },
            { _type: "span", _key: "en-b18-s3", text: ", dive length varies more because different specialty dives have different profiles. A deep dive (adventure dive) at 25 to 30 meters might run 20 to 25 minutes bottom time; a peak buoyancy dive at shallower depth might run 45 to 60 minutes; a navigation dive is typically 30 to 45 minutes. The certification course covers five different dives with a range of depths and formats, so the overall average is similar to a standard certified dive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "The Shark Point Exception", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b20-l1", href: "https://www.grandbay-puntacana.com/shark-dive-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "The ", marks: [] },
            { _type: "span", _key: "en-b20-s2", text: "Shark Point dive", marks: ["en-b20-l1"] },
            { _type: "span", _key: "en-b20-s3", text: " sits at about 26 meters, deeper than our typical reef sites, and dive length there is closer to 30 to 35 minutes because of the depth. That's still enough time for a legitimate shark encounter — the sharks are typically visible early in the dive because they're in the immediate area, not something you have to search for. The shorter dive time is inherent to the depth, not a limitation of the site.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "Bottom Time vs Total Dive Time", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "A distinction worth understanding. \"Bottom time\" in diving officially refers to the time from starting your descent to starting your ascent. \"Total dive time\" adds the ascent, the safety stop, and any additional shallow exploration on the way up. When we say a typical dive is 45 minutes, we're usually talking about bottom time plus the safety stop and final ascent — closer to the total time you're underwater from getting in the water to surfacing.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "A standard dive typically ends with a 3-minute safety stop at 5 meters, followed by a slow ascent to the surface. This adds about 5 minutes to the total time compared to a hypothetical dive that ends at the bottom. All the depth-and-time figures we give in this post are total in-water times, not narrow \"bottom time\" numbers.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "Why Some Divers Come Up Sooner", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "In group diving, the actual end time of any dive is set by the first person to reach a limit — that's the diver who's used the most air, or the one approaching NDL, or the one who's getting cold, or the one who signals they've had enough. This is why couples or friends dive together often end up with slightly different air remaining on the boat: the diver who ate through their air faster ended the dive for everyone, and the more efficient diver still has 500 to 800 PSI left.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "This is normal and expected, not a failure on anyone's part. The dive plan is built around the least efficient breather in the group so nobody ends up in an air-critical situation, which is exactly the right way to plan a group dive.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "How to Extend Your Bottom Time", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "The most reliable way to get longer dives is to improve your air consumption — which mostly means practicing calm, slow breathing patterns and getting comfortable enough underwater that you're not fighting the environment. New divers often breathe too fast or too shallow out of nerves, then run out of air 15 minutes before their more experienced buddy. Deep, slow breaths (in through the mouth, out slowly, no breath holding) are more efficient than rapid shallow breathing, both physiologically and for buoyancy.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "Buoyancy control is the other big lever. A diver who's constantly compensating for over- or under-inflation of their BCD is doing more physical work than a diver who's neutrally buoyant and gliding. Time invested in mastering buoyancy pays back on every subsequent dive in longer bottom times. This is why the PADI Peak Performance Buoyancy specialty is one of the most useful specialties for improving your diving overall, not just for photography.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "Physical fitness matters at the margin. Divers who are cardiovascularly fit have lower resting oxygen consumption and lower air consumption during moderate underwater activity. This isn't a huge effect for casual reef diving, but it's real over long dives.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "What Happens If You Run Low on Air", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "Standard practice is to signal the guide when your air reaches about 100 to 70 bar (roughly 1500 to 1000 PSI), and to start the ascent when the group leader signals or when you reach approximately 50 bar (700 PSI). Nobody dives their tank to empty — the reserve is deliberate margin for the ascent and safety stop plus emergency response if anything goes wrong. If you run lower than that in the middle of a dive, the correct response is to signal the guide, share air with the guide's alternate second stage if needed, and ascend safely with the group. This is one of the specific skills covered in Open Water training and reviewed on every dive briefing.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b33-s1", text: "How Long Is the Full Day at the Shop?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b34-s1", text: "The whole two-tank experience takes longer than the sum of the two dives. Typical shape: pickup or arrival at the shop around 8:30 AM, gear setup and briefing 30 minutes, boat ride to first site 20 to 30 minutes, first dive 45 minutes, surface interval 45 to 60 minutes, transit to second site (if different) 10 to 20 minutes, second dive 45 minutes, boat ride back 20 to 30 minutes, gear rinse and debrief 15 minutes. All in, you're back on land around 1:00 to 2:00 PM. Total time at the operation is about 5 hours for something like 90 minutes of actual underwater time.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b35",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b35-s1", text: "The Bottom Line", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b36-l1", href: "https://www.grandbay-puntacana.com/courses" },
            { _type: "link", _key: "en-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b36-s1", text: "For certified divers doing standard 2-tank days on Punta Cana reefs, expect about 45 minutes per dive with an hour or so between dives on the boat. For first-time divers doing a Discover Scuba Diving experience, expect about 30 minutes underwater on your intro dive. For certification courses, dive length varies but averages between 30 and 45 minutes per dive across the training. Depth, air consumption, and thermal comfort all move these numbers around. If you have specific questions about how long the dives look for your ", marks: [] },
            { _type: "span", _key: "en-b36-s2", text: "course or trip", marks: ["en-b36-l1"] },
            { _type: "span", _key: "en-b36-s3", text: ", message us on ", marks: [] },
            { _type: "span", _key: "en-b36-s4", text: "WhatsApp", marks: ["en-b36-l2"] },
            { _type: "span", _key: "en-b36-s5", text: " with your certification level and dates and we'll give you a specific answer for your itinerary.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "Respuesta corta: una inmersión típica para un buzo certificado en Punta Cana dura unos 45 minutos bajo el agua. Ese es el número que sale más seguido cuando les decimos a los buzos qué esperar de nuestras salidas guiadas estándar de dos tanques — a veces un poco más en sitios someros, a veces un poco menos en sitios más profundos. Una experiencia Discover Scuba Diving, que es un formato más corto para primerizos, suele ser de unos 30 minutos de tiempo real bajo el agua. Pero \"cuánto dura una inmersión\" tiene más matices que un solo número, porque el tiempo real depende de tu profundidad, tu consumo de aire, la temperatura del agua y qué tanto estés esforzándote. Esta publicación recorre los factores, los distintos formatos de inmersión y cómo se ven los tiempos en la práctica en nuestro bote.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "Inmersiones Estándar de 2 Tanques: Unos 45 Minutos Cada Una", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b3-l1", href: "https://www.grandbay-puntacana.com/es/sites" },
          ],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "Para ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "nuestras inmersiones guiadas estándar en los arrecifes de Punta Cana", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: ", el tiempo típico de fondo en cada inmersión es de unos 45 minutos. Una salida matutina de dos tanques usualmente se ve así: salir de la tienda alrededor de las 8:30 AM, llegar al primer sitio de buceo 20 a 30 minutos después, hacer una inmersión de 45 minutos a una profundidad en el rango de 12 a 18 metros, subir para un intervalo de superficie de 45 a 60 minutos en el bote, bajar de nuevo para la segunda inmersión de 45 minutos en un sitio cercano, y estar de regreso en tierra a mediodía tarde. Esa es la forma de la mayoría de los días.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "La cifra de 45 minutos no es una regla; es un promedio fuerte para el rango de profundidad que típicamente buceamos. Los buzos con mejor eficiencia de aire salen con bastante aire después de 50 minutos; los buzos nuevos o los que todavía trabajan en su respiración a veces llegan a la presión de reserva más cerca de los 35 a 40 minutos. Nadie está revisando un cronómetro forzando a todos a subir exactamente a los 45 — la inmersión real termina cuando o se acerca al límite de no descompresión, o cuando alguien en el grupo se está quedando con poco aire, lo que pase primero.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Qué Determina Realmente la Duración de una Inmersión", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "Cuatro factores principales establecen la duración de cualquier inmersión: profundidad, consumo de aire, temperatura del agua y nivel de esfuerzo. La profundidad es el más grande — cuanto más profundo vas, más rápido usas aire y más pronto te acercas al límite de no descompresión. Por eso una inmersión somera de arrecife a 10 metros puede durar 60+ minutos mientras una inmersión profunda a 30 metros topa cerca de 25 minutos. Los sitios populares de arrecife de Punta Cana a 12 a 18 metros están en el punto dulce donde los 45 minutos de tiempo de fondo son naturales.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b7-l1", href: "https://dan.org/" },
          ],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "El consumo de aire — técnicamente tu tasa SAC (Surface Air Consumption) — es el segundo gran factor y el que más varía entre individuos. Según investigación resumida por ", marks: [] },
            { _type: "span", _key: "es-b7-s2", text: "Divers Alert Network", marks: ["es-b7-l1"] },
            { _type: "span", _key: "es-b7-s3", text: ", los buzos recreativos típicos consumen de 15 a 25 litros por minuto en la superficie, lo que se traduce en distintas tasas reales de consumo a distintas profundidades (porque el aire es más denso en profundidad). Los buzos con tasas SAC más bajas obtienen naturalmente tiempos de fondo más largos del mismo tanque; los buzos con tasas más altas salen antes. La experiencia es la variable principal — los buzos nuevos generalmente respiran más pesado por nervios y falta de familiaridad, y la tasa SAC típicamente baja significativamente en las primeras 20 a 50 inmersiones.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Profundidad y Límites de No Descompresión", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "Toda inmersión recreativa tiene que mantenerse dentro de un tiempo máximo de fondo basado en la profundidad, establecido por los límites de no descompresión (NDL). Estos vienen de la teoría de descompresión — cuanto más profundo y más tiempo bucees, más nitrógeno absorben tus tejidos, y más allá de ciertos umbrales necesitarías paradas de descompresión requeridas antes de poder subir con seguridad. El buceo recreativo se mantiene dentro de límites que permiten ascenso directo (con solo una parada de seguridad). A 12 metros, el NDL supera con creces la hora. A 18 metros, unos 50+ minutos. A 25 metros, cerca de 30 minutos. A 30 metros, cerca de 20 minutos. A 40 metros, menos de 10 minutos.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "En la práctica, en una inmersión típica de arrecife en Punta Cana a 12 a 18 metros, el consumo de aire suele ser el factor limitante en lugar del NDL — los buzos se quedan con poco aire antes de acercarse al tiempo de no-deco. En inmersiones más profundas a 25 a 30 metros, los dos límites se acercan y el NDL a veces importa más. Los computadores de buceo modernos rastrean ambos simultáneamente y te alertan mucho antes de que cualquiera se convierta en un problema.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Temperatura del Agua y Duración", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "La temperatura del agua afecta la duración de dos formas — una pequeña, una más grande. El efecto pequeño es que el agua más fría aumenta el consumo de aire porque tu cuerpo trabaja más para mantener la temperatura core; esto puede acortar las inmersiones por uno o dos minutos. En las aguas cálidas de Punta Cana (26 a 29°C todo el año) este efecto es apenas notable comparado con buzos que vienen de aguas de casa más frías. El efecto más grande es la comodidad térmica misma — un buzo que se enfría decide terminar la inmersión temprano aunque el aire y el NDL estén bien, lo cual es un límite psicológico más que uno físico duro. Por eso la protección térmica adecuada importa incluso en agua cálida; un buzo que está levemente frío al minuto 35 se pierde los últimos 10 a 15 minutos de una buena inmersión.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Discover Scuba Diving: Formato Más Corto", marks: [] },
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
            { _type: "span", _key: "es-b14-s1", text: "Para los participantes de ", marks: [] },
            { _type: "span", _key: "es-b14-s2", text: "Discover Scuba Diving", marks: ["es-b14-l1"] },
            { _type: "span", _key: "es-b14-s3", text: " — personas probando scuba por primera vez sin certificación — el tiempo bajo el agua es típicamente de unos 30 minutos. Esto es más corto que una inmersión certificada por dos razones: la profundidad DSD está limitada a 12 metros (lo que es más indulgente con el consumo de aire), y el consumo de aire de un principiante suele ser mayor al de los buzos experimentados. La cifra de 30 minutos cubre una experiencia real de inmersión con tiempo para ver vida de arrecife, practicar habilidades básicas y sentirse cómodo respirando bajo el agua — pero es más corta de lo que los buzos certificados obtienen de la misma cantidad de aire porque un buzo primerizo respira a través de él más rápido.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "La sesión DSD en sí es más larga que 30 minutos — hay un briefing, montaje de equipo, algunas habilidades en agua somera antes de descender, y la porción de exploración bajo el agua. El tiempo total desde llegar a la tienda hasta el fin de la inmersión es usualmente de 2 a 3 horas. Si te sientes cómodo durante el DSD, algunos operadores (incluidos nosotros) ofrecen una segunda inmersión DSD opcional el mismo día para buzos que quieren más tiempo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Inmersiones de Cursos de Certificación", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b17-l1", href: "https://www.grandbay-puntacana.com/es/courses/openwater" },
          ],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Para los ", marks: [] },
            { _type: "span", _key: "es-b17-s2", text: "estudiantes de certificación Open Water", marks: ["es-b17-l1"] },
            { _type: "span", _key: "es-b17-s3", text: ", cada una de las cuatro inmersiones de entrenamiento en aguas abiertas dura unos 30 a 40 minutos, similar a la duración del DSD pero con habilidades específicas que completar durante cada inmersión. Las habilidades incluyen cosas como despejar la máscara, recuperación del regulador, ascensos controlados de emergencia y ejercicios de flotabilidad. Conforme los estudiantes avanzan de la inmersión uno a la cuatro, su consumo de aire mejora notablemente y las inmersiones posteriores se sienten más largas incluso a la misma profundidad. Para la cuarta inmersión de aguas abiertas, la mayoría de los estudiantes se acerca al rango de los 40 minutos que refleja la inmersión certificada estándar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b18-l1", href: "https://www.grandbay-puntacana.com/es/courses/advanced" },
          ],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Para los ", marks: [] },
            { _type: "span", _key: "es-b18-s2", text: "estudiantes Advanced Open Water", marks: ["es-b18-l1"] },
            { _type: "span", _key: "es-b18-s3", text: ", la duración varía más porque distintas inmersiones de especialidad tienen distintos perfiles. Una inmersión profunda (adventure dive) a 25 a 30 metros podría durar 20 a 25 minutos de fondo; una inmersión de flotabilidad de precisión a profundidad somera podría durar 45 a 60 minutos; una inmersión de navegación es típicamente 30 a 45 minutos. El curso de certificación cubre cinco inmersiones distintas con un rango de profundidades y formatos, así que el promedio general es similar a una inmersión certificada estándar.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "La Excepción de Shark Point", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b20-l1", href: "https://www.grandbay-puntacana.com/es/shark-dive-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "La ", marks: [] },
            { _type: "span", _key: "es-b20-s2", text: "inmersión de Shark Point", marks: ["es-b20-l1"] },
            { _type: "span", _key: "es-b20-s3", text: " está a unos 26 metros, más profunda que nuestros sitios típicos de arrecife, y la duración de la inmersión ahí está más cerca de 30 a 35 minutos por la profundidad. Ese sigue siendo tiempo suficiente para un encuentro legítimo con tiburones — los tiburones típicamente son visibles temprano en la inmersión porque están en el área inmediata, no algo que tengas que buscar. El tiempo de inmersión más corto es inherente a la profundidad, no una limitación del sitio.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "Tiempo de Fondo vs Tiempo Total de Inmersión", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "Una distinción que vale la pena entender. El \"tiempo de fondo\" en buceo se refiere oficialmente al tiempo desde empezar el descenso hasta empezar el ascenso. El \"tiempo total de inmersión\" agrega el ascenso, la parada de seguridad y cualquier exploración somera adicional en el camino hacia arriba. Cuando decimos que una inmersión típica es de 45 minutos, usualmente hablamos del tiempo de fondo más la parada de seguridad y el ascenso final — más cerca del tiempo total que estás bajo el agua desde meterte al agua hasta salir a la superficie.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Una inmersión estándar típicamente termina con una parada de seguridad de 3 minutos a 5 metros, seguida por un ascenso lento a la superficie. Esto agrega unos 5 minutos al tiempo total comparado con una inmersión hipotética que termine en el fondo. Todas las cifras de profundidad-y-tiempo que damos en esta publicación son tiempos totales en el agua, no números estrechos de \"tiempo de fondo\".", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Por Qué Algunos Buzos Suben Antes", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "En el buceo en grupo, el tiempo real de fin de cualquier inmersión lo establece la primera persona en alcanzar un límite — ese es el buzo que ha usado más aire, o el que se acerca al NDL, o el que se está enfriando, o el que señala que ya tuvo suficiente. Por eso las parejas o amigos que bucean juntos a menudo terminan con aire ligeramente distinto restante en el bote: el buzo que se comió su aire más rápido terminó la inmersión para todos, y el buzo más eficiente todavía tiene 500 a 800 PSI restantes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "Esto es normal y esperado, no una falla de nadie. El plan de inmersión está construido alrededor del respirador menos eficiente del grupo para que nadie termine en una situación crítica de aire, que es exactamente la forma correcta de planear una inmersión de grupo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Cómo Extender tu Tiempo de Fondo", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "La forma más confiable de obtener inmersiones más largas es mejorar tu consumo de aire — lo que principalmente significa practicar patrones de respiración lentos y calmados y sentirte lo bastante cómodo bajo el agua como para no estar peleando con el ambiente. Los buzos nuevos a menudo respiran demasiado rápido o demasiado superficialmente por los nervios, y se quedan sin aire 15 minutos antes de su compañero más experimentado. Respiraciones profundas y lentas (por la boca, salir lento, sin retener el aire) son más eficientes que la respiración rápida y superficial, fisiológicamente y para la flotabilidad.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "El control de flotabilidad es la otra gran palanca. Un buzo que está constantemente compensando por sobre-inflación o sub-inflación de su BCD está haciendo más trabajo físico que un buzo que está neutralmente flotante y planeando. El tiempo invertido en dominar la flotabilidad se paga en cada inmersión subsiguiente en tiempos de fondo más largos. Por eso la especialidad PADI Peak Performance Buoyancy es una de las especialidades más útiles para mejorar tu buceo en general, no solo para fotografía.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "El fitness físico importa al margen. Los buzos que están cardiovascularmente en forma tienen un consumo de oxígeno en reposo más bajo y un consumo de aire más bajo durante actividad subacuática moderada. Este no es un efecto enorme para el buceo casual de arrecife, pero es real en inmersiones largas.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "Qué Pasa si te Quedas con Poco Aire", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "La práctica estándar es señalar al guía cuando tu aire llegue a unos 100 a 70 bar (aproximadamente 1500 a 1000 PSI), y empezar el ascenso cuando el líder del grupo señale o cuando llegues a aproximadamente 50 bar (700 PSI). Nadie bucea su tanque hasta vaciarlo — la reserva es margen deliberado para el ascenso y la parada de seguridad más la respuesta de emergencia si algo sale mal. Si te quedas con menos que eso a mitad de una inmersión, la respuesta correcta es señalar al guía, compartir aire con la segunda etapa alternativa del guía si es necesario, y ascender con seguridad con el grupo. Esta es una de las habilidades específicas cubiertas en el entrenamiento Open Water y revisadas en cada briefing de inmersión.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b33-s1", text: "¿Cuánto Dura el Día Completo en la Tienda?", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b34-s1", text: "La experiencia completa de dos tanques toma más tiempo que la suma de las dos inmersiones. Forma típica: recogida o llegada a la tienda alrededor de las 8:30 AM, montaje de equipo y briefing 30 minutos, viaje en bote al primer sitio 20 a 30 minutos, primera inmersión 45 minutos, intervalo de superficie 45 a 60 minutos, traslado al segundo sitio (si es distinto) 10 a 20 minutos, segunda inmersión 45 minutos, viaje en bote de regreso 20 a 30 minutos, enjuague de equipo y debrief 15 minutos. En total, estás de regreso en tierra alrededor de 1:00 a 2:00 PM. Tiempo total en la operación es de unas 5 horas para algo así como 90 minutos de tiempo real bajo el agua.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b35",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b35-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b36-l1", href: "https://www.grandbay-puntacana.com/es/courses" },
            { _type: "link", _key: "es-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b36-s1", text: "Para buzos certificados haciendo días estándar de 2 tanques en los arrecifes de Punta Cana, espera unos 45 minutos por inmersión con una hora entre inmersiones en el bote. Para primerizos haciendo una experiencia Discover Scuba Diving, espera unos 30 minutos bajo el agua en tu inmersión introductoria. Para cursos de certificación, la duración varía pero promedia entre 30 y 45 minutos por inmersión a lo largo del entrenamiento. Profundidad, consumo de aire y comodidad térmica mueven estos números. Si tienes preguntas específicas sobre cómo se ven las inmersiones para tu ", marks: [] },
            { _type: "span", _key: "es-b36-s2", text: "curso o viaje", marks: ["es-b36-l1"] },
            { _type: "span", _key: "es-b36-s3", text: ", escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b36-s4", text: "WhatsApp", marks: ["es-b36-l2"] },
            { _type: "span", _key: "es-b36-s5", text: " con tu nivel de certificación y fechas y te damos una respuesta específica para tu itinerario.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "How Long Does a Typical Scuba Dive Last in Punta Cana? (2026)",
          description:
            "Certified 2-tank dives in Punta Cana run about 45 minutes each. DSD is around 30 minutes. Depth, air consumption, and thermal comfort all affect dive length — here's the breakdown.",
          keywords: ["scuba dive length punta cana", "how long dive lasts", "dive time punta cana", "SAC rate diving", "dive duration"],
        },
        es: {
          title: "¿Cuánto Dura una Inmersión en Punta Cana? Guía Práctica (2026)",
          description:
            "Las inmersiones certificadas de 2 tanques en Punta Cana duran unos 45 minutos cada una. El DSD dura unos 30 minutos. Profundidad, consumo de aire y comodidad térmica afectan la duración.",
          keywords: ["duracion inmersion punta cana", "cuanto dura buceo", "tiempo inmersion punta cana", "tasa SAC buceo"],
        },
      },
      openGraph: {
        en: {
          title: "How Long Does a Typical Scuba Dive Last in Punta Cana?",
          description: "Certified dives ~45 min. DSD ~30 min. What determines dive length, how depth affects it, and how the full day at Grand Bay looks in practice.",
        },
        es: {
          title: "¿Cuánto Dura una Inmersión Típica en Punta Cana?",
          description: "Inmersiones certificadas ~45 min. DSD ~30 min. Qué determina la duración, cómo la profundidad la afecta y cómo se ve el día completo en Grand Bay.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "How Long Does a Typical Scuba Dive Last in Punta Cana?",
          description: "A practical guide to scuba dive duration in Punta Cana. Standard certified 2-tank dives run about 45 minutes each; Discover Scuba Diving is around 30 minutes; the Shark Point dive at 26 meters is closer to 30-35 minutes. Covers what determines dive length (depth, air consumption/SAC rate, water temperature, exertion), no-decompression limits by depth, the difference between bottom time and total dive time, how course dives vary, why group dives end when the first person hits a limit, and how to extend bottom time through improved air consumption and buoyancy control.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/diving-tips/how-long-scuba-dive-lasts-punta-cana",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "¿Cuánto Dura una Inmersión Típica en Punta Cana?",
          description: "Una guía práctica sobre la duración de las inmersiones en Punta Cana. Las inmersiones estándar de 2 tanques para certificados duran unos 45 minutos cada una; el Discover Scuba Diving dura unos 30 minutos; la inmersión de Shark Point a 26 metros está más cerca de 30-35 minutos. Cubre qué determina la duración (profundidad, consumo de aire/tasa SAC, temperatura del agua, esfuerzo), los límites de no descompresión por profundidad, la diferencia entre tiempo de fondo y tiempo total, cómo varían las inmersiones de cursos, por qué las inmersiones en grupo terminan cuando la primera persona llega a un límite, y cómo extender el tiempo de fondo mediante mejora del consumo de aire y control de flotabilidad.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/diving-tips/how-long-scuba-dive-lasts-punta-cana",
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