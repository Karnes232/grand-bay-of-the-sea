/**
 * Seed the two Open Water course variants as DRAFTS:
 *   1. PADI Open Water Referral  ($375) — slug: openwater-referral
 *   2. PADI Open Water eLearning ($425) — slug: openwater-elearning
 * Also bumps Advanced Open Water's order 4 -> 6 so the new courses slot in
 * right after Open Water in the beginner grid.
 *
 * Run: npx tsx --env-file=.env.local scripts/seed-openwater-variants.ts
 */
import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN"
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
  perspective: "raw",
})

const SITE = "https://www.grandbay-puntacana.com"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ls = (en: string, es: string) => ({ _type: "localizedString", en, es })
const lt = (en: string, es: string) => ({ _type: "localizedText", en, es })

const block = (key: string, style: string, text: string) => ({
  _type: "block",
  _key: key,
  style,
  markDefs: [],
  children: [{ _type: "span", _key: `${key}s`, marks: [], text }],
})

type Para = { style: string; en: string; es: string }

const localizedBlock = (keyPrefix: string, paras: Para[]) => ({
  _type: "localizedBlock",
  en: paras.map((p, i) => block(`${keyPrefix}-en-${i + 1}`, p.style, p.en)),
  es: paras.map((p, i) => block(`${keyPrefix}-es-${i + 1}`, p.style, p.es)),
})

const imageRef = (ref: string, alt: string, key?: string) => ({
  _type: "image",
  ...(key ? { _key: key } : {}),
  alt,
  asset: { _type: "reference", _ref: ref },
})

type Faq = { q: { en: string; es: string }; a: { en: string; es: string } }

const faqItems = (keyPrefix: string, faqs: Faq[]) =>
  faqs.map((f, i) => ({
    _type: "faqItem",
    _key: `${keyPrefix}-faq-${i + 1}`,
    question: ls(f.q.en, f.q.es),
    answer: {
      _type: "localizedBlock",
      en: [block(`${keyPrefix}-faq-${i + 1}-en`, "normal", f.a.en)],
      es: [block(`${keyPrefix}-faq-${i + 1}-es`, "normal", f.a.es)],
    },
  }))

const faqPageJsonLd = (slug: string, locale: "en" | "es", faqs: Faq[]) =>
  JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE}${locale === "es" ? "/es" : ""}/courses/${slug}#faq`,
      mainEntityOfPage: `${SITE}${locale === "es" ? "/es" : ""}/courses/${slug}`,
      inLanguage: locale,
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q[locale],
        acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
      })),
    },
    null,
    2
  )

const courseJsonLd = (opts: {
  locale: "en" | "es"
  name: string
  description: string
  instanceName: string
  instanceDescription: string
  slug: string
  price: string
}) =>
  JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: opts.name,
      provider: { "@id": `${SITE}/#business` },
      description: opts.description,
      hasCourseInstance: {
        "@type": "CourseInstance",
        name: opts.instanceName,
        description: opts.instanceDescription,
        courseMode: "InPerson",
        offers: {
          "@type": "Offer",
          url: `${SITE}${opts.locale === "es" ? "/es" : ""}/courses/${opts.slug}`,
          price: opts.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2027-12-31",
        },
        location: {
          "@type": "Place",
          name: "Grand Bay of the Sea",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Punta Cana",
            addressRegion: "La Altagracia",
            addressCountry: "DO",
          },
        },
      },
    },
    null,
    2
  )

// ---------------------------------------------------------------------------
// Shared image assets (already uploaded — reused from the Open Water course)
// ---------------------------------------------------------------------------

const IMG = {
  guyDiving: "image-19834efdcede3c8e0ee67e0d43bce3a5b795fdc0-2000x1333-webp",
  girlOnWreck: "image-d8a4c1c8af8c0f645ed6bef9165e2df45bb677be-2000x1332-webp",
  groupOnBoat: "image-7213ef85adb5aebc2da0860ebcc39d09b456deaf-814x610-webp",
  morayEel: "image-a7ea5f94adf0622d55825b31c78318bd225f142a-960x636-jpg",
  turtleWide: "image-6580f613318b7a7363d27ab8e6133958354b928a-4993x2809-webp",
  girlOnReef: "image-59cf40a308d01e7f59a88d2ed6ecf83fed1fdae0-5472x3648-webp",
  octopus: "image-f85e42d4e2e972422a87b3eb1db695837ef4070e-1920x1080-webp",
  girlDiving: "image-f3b8254fe2b8dd37efd3fd1c38a483b7ebbb4ecc-2000x1333-webp",
  wreck: "image-78f1e9827e945e8a4cebfe94fb476c7485d2b752-1280x960-webp",
  turtle: "image-feb931c2d867dd22d9c973c2a59fbeb5e0eb4351-2000x1500-webp",
  turtleSmall: "image-cb146d278c42e1e772312041e422507b6ee70133-1280x842-webp",
  diveCenter: "image-098b322d046c7179998d478d774cff34e319cec3-640x480-webp",
  studentDivers: "image-c5b50cfa22de710560374bab2db3bfb2e7d39106-1185x889-webp",
}

// ---------------------------------------------------------------------------
// Course 1: PADI Open Water Referral — $375
// ---------------------------------------------------------------------------

const referralFaqs: Faq[] = [
  {
    q: {
      en: "What is the PADI Open Water Referral?",
      es: "¿Qué es el PADI Open Water Referral?",
    },
    a: {
      en: "It's the final part of the PADI Open Water Diver course. You complete the theory and confined water training with an instructor at home, then finish the 4 open water certification dives with us in Punta Cana.",
      es: "Es la parte final del curso PADI Open Water Diver. Completas la teoría y el entrenamiento en aguas confinadas con un instructor en tu país, y luego terminas las 4 inmersiones de certificación en aguas abiertas con nosotros en Punta Cana.",
    },
  },
  {
    q: {
      en: "What paperwork do I need to bring?",
      es: "¿Qué documentos necesito traer?",
    },
    a: {
      en: "Bring your signed PADI Referral Form, or your eLearning completion record together with your instructor's confined water sign-off. We verify your documents before your first dive.",
      es: "Trae tu formulario de referral PADI firmado, o tu registro de eLearning completado junto con la firma de tu instructor de las sesiones en aguas confinadas. Verificamos tus documentos antes de tu primera inmersión.",
    },
  },
  {
    q: {
      en: "How long is my referral valid?",
      es: "¿Cuánto tiempo es válido mi referral?",
    },
    a: {
      en: "PADI referral paperwork is valid for 12 months from your last completed training session. After that, you'll need a short refresher or to repeat parts of the training.",
      es: "La documentación de referral PADI es válida durante 12 meses desde tu última sesión de entrenamiento completada. Después de ese plazo, necesitarás un repaso corto o repetir partes del entrenamiento.",
    },
  },
  {
    q: {
      en: "How long does the referral take in Punta Cana?",
      es: "¿Cuánto tiempo toma el referral en Punta Cana?",
    },
    a: {
      en: "Two days. You'll complete dives 1 and 2 on the first day and dives 3 and 4 on the second day, after which your instructor processes your certification.",
      es: "Dos días. Completarás las inmersiones 1 y 2 el primer día y las inmersiones 3 y 4 el segundo día, tras lo cual tu instructor procesa tu certificación.",
    },
  },
  {
    q: {
      en: "What's included in the $375 price?",
      es: "¿Qué incluye el precio de $375?",
    },
    a: {
      en: "All 4 certification dives, boat trips to the dive sites, full equipment rental, your PADI instructor, and certification processing. There are no hidden extras.",
      es: "Las 4 inmersiones de certificación, los viajes en barco a los sitios de buceo, el alquiler completo del equipo, tu instructor PADI y el procesamiento de la certificación. No hay costos ocultos.",
    },
  },
  {
    q: {
      en: "What if my referral paperwork has expired?",
      es: "¿Qué pasa si mi documentación de referral ha caducado?",
    },
    a: {
      en: "Contact us before your trip. In most cases a short refresher session is enough to bring your skills up to date so you can complete your certification dives.",
      es: "Contáctanos antes de tu viaje. En la mayoría de los casos, una sesión corta de repaso es suficiente para actualizar tus habilidades y poder completar tus inmersiones de certificación.",
    },
  },
]

const referralCourse = {
  _id: "drafts.course-openwater-referral",
  _type: "individualCourse",
  course: "Open Water Referral",
  title: ls(
    "PADI Open Water Referral in Punta Cana",
    "PADI Open Water Referral en Punta Cana"
  ),
  slug: { _type: "slug", current: "openwater-referral" },
  cardImage: imageRef(IMG.girlOnReef, "Diver over a coral reef in Punta Cana"),
  cardDescription: lt(
    "Finished your theory and confined water training at home? Complete your 4 certification dives with us in Punta Cana!",
    "¿Terminaste la teoría y el entrenamiento en aguas confinadas en casa? ¡Completa tus 4 inmersiones de certificación con nosotros en Punta Cana!"
  ),
  cardHashTags: ["referral", "PADI", "Caribbean dives"],
  courseLevel: "beginner",
  order: 4,
  padiPrice: 375,
  level: ls("Beginner", "Principiante"),
  duration: ls("2 Days", "2 Días"),
  dives: ls("4 open water", "4 en aguas abiertas"),
  maxDepth: ls("18 m / 60 ft", "18 m / 60 ft"),
  extraInfo: ls("Over 2 Days", "En 2 Días"),
  videoId: "scubaHero_wzvqdg",
  paragraph1: localizedBlock("owr-p1", [
    {
      style: "h1",
      en: "Finish Your Open Water Certification in the Caribbean",
      es: "Termina tu Certificación Open Water en el Caribe",
    },
    {
      style: "normal",
      en: "The PADI Open Water Referral is for students who have already completed the first two parts of the Open Water Diver course at home — the knowledge development and the confined water training — signed off by a PADI instructor. All that's left is Part Three: your 4 open water certification dives. Complete them with us over 2 relaxed days in Punta Cana's warm, clear Caribbean water and fly home a certified diver.",
      es: "El PADI Open Water Referral es para estudiantes que ya completaron las dos primeras partes del curso Open Water Diver en su país — el desarrollo de conocimientos y el entrenamiento en aguas confinadas — firmadas por un instructor PADI. Solo queda la Parte Tres: tus 4 inmersiones de certificación en aguas abiertas. Complétalas con nosotros en 2 días tranquilos en las cálidas y cristalinas aguas caribeñas de Punta Cana y vuela a casa como buceador certificado.",
    },
    {
      style: "normal",
      en: "Why finish in a cold lake or quarry when you can do your certification dives at 26–29°C (78–84°F) with 15–25 meters of visibility? Your referral paperwork is valid for 12 months from your last training session, so this is the perfect way to turn the final step of your certification into the highlight of your vacation.",
      es: "¿Por qué terminar en un lago frío o una cantera cuando puedes hacer tus inmersiones de certificación a 26–29°C con 15–25 metros de visibilidad? Tu documentación de referral es válida durante 12 meses desde tu última sesión de entrenamiento, así que esta es la manera perfecta de convertir el paso final de tu certificación en lo mejor de tus vacaciones.",
    },
  ]),
  paragraph2: localizedBlock("owr-p2", [
    {
      style: "h3",
      en: "How the Referral Works",
      es: "Cómo Funciona el Referral",
    },
    {
      style: "normal",
      en: "Bring your signed PADI Referral Form — or your eLearning completion record plus the confined water sign-off from your instructor. We check your paperwork, meet you at the dive center, and get you straight into the water; there's no classroom time and no confined water sessions to repeat.",
      es: "Trae tu formulario de referral PADI firmado — o tu registro de eLearning completado más la firma de tu instructor de las sesiones en aguas confinadas. Revisamos tu documentación, te recibimos en el centro de buceo y te llevamos directo al agua; no hay tiempo de aula ni sesiones de aguas confinadas que repetir.",
    },
    {
      style: "normal",
      en: "PADI referral documentation is valid for 12 months from the date of your last completed training session. If you're close to the limit or your paperwork has expired, contact us before your trip — a short refresher is usually all it takes to get you back on track.",
      es: "La documentación de referral PADI es válida durante 12 meses desde la fecha de tu última sesión de entrenamiento completada. Si estás cerca del límite o tu documentación ha caducado, contáctanos antes de tu viaje — normalmente un repaso corto es todo lo que necesitas para retomar el camino.",
    },
  ]),
  paragraph3: localizedBlock("owr-p3", [
    {
      style: "h3",
      en: "Day 1 — Dives 1 & 2",
      es: "Día 1 — Inmersiones 1 y 2",
    },
    {
      style: "normal",
      en: "Your first morning starts with a short briefing and equipment setup — everything is included, from wetsuit and BCD to regulator, mask, and fins. Then we head out to our calm local reefs off Cabeza de Toro for your first two certification dives.",
      es: "Tu primera mañana comienza con un breve briefing y la preparación del equipo — todo está incluido, desde el traje y el BCD hasta el regulador, la máscara y las aletas. Después salimos a nuestros tranquilos arrecifes locales frente a Cabeza de Toro para tus dos primeras inmersiones de certificación.",
    },
    {
      style: "normal",
      en: "Sites like El Niño and Park Reef are gentle, shallow, and full of life — lobsters, squid, and turtles are regular visitors. The required skills are spread across the dives, so most of your time is spent actually diving, not kneeling on the sand.",
      es: "Sitios como El Niño y Park Reef son suaves, poco profundos y llenos de vida — langostas, calamares y tortugas son visitantes habituales. Las habilidades requeridas se reparten entre las inmersiones, así que la mayor parte del tiempo la pasas realmente buceando, no arrodillado en la arena.",
    },
  ]),
  paragraph4: localizedBlock("owr-p4", [
    {
      style: "h3",
      en: "Day 2 — Dives 3 & 4",
      es: "Día 2 — Inmersiones 3 y 4",
    },
    {
      style: "normal",
      en: "On your second day you'll complete dives 3 and 4, going a little deeper and demonstrating the remaining skills. By now the gear feels familiar and your buoyancy is coming together — these dives feel much more like fun dives than training.",
      es: "En tu segundo día completarás las inmersiones 3 y 4, bajando un poco más profundo y demostrando las habilidades restantes. A estas alturas el equipo ya te resulta familiar y tu flotabilidad va tomando forma — estas inmersiones se sienten mucho más como buceo recreativo que como entrenamiento.",
    },
    {
      style: "normal",
      en: "When you surface from dive 4, you're done: your instructor signs you off and processes your PADI Open Water Diver certification, recognized everywhere in the world. The underwater handshake at the end is a moment you won't forget.",
      es: "Cuando sales a la superficie de la inmersión 4, has terminado: tu instructor firma tu formación y procesa tu certificación PADI Open Water Diver, reconocida en todo el mundo. El apretón de manos bajo el agua al final es un momento que no olvidarás.",
    },
  ]),
  paragraph5: localizedBlock("owr-p5", [
    {
      style: "h3",
      en: "What's Included for $375",
      es: "Qué Incluye por $375",
    },
    {
      style: "normal",
      en: "The referral price includes all four open water certification dives, boat trips to the dive sites, full equipment rental, your PADI instructor, and the processing of your certification with PADI. There are no hidden extras.",
      es: "El precio del referral incluye las cuatro inmersiones de certificación en aguas abiertas, los viajes en barco a los sitios de buceo, el alquiler completo del equipo, tu instructor PADI y el procesamiento de tu certificación con PADI. No hay costos ocultos.",
    },
    {
      style: "normal",
      en: "We teach in English, Spanish, and French, and keep groups small so your instructor can adjust the pace to you. All you need to bring is your referral paperwork, a swimsuit, and a towel.",
      es: "Enseñamos en inglés, español y francés, y mantenemos los grupos pequeños para que tu instructor pueda ajustar el ritmo a ti. Solo necesitas traer tu documentación de referral, un traje de baño y una toalla.",
    },
  ]),
  paragraph6: localizedBlock("owr-p6", [
    {
      style: "h3",
      en: "Certified — Now the Fun Starts",
      es: "Certificado — Ahora Empieza la Diversión",
    },
    {
      style: "normal",
      en: "Once certified, you can dive with a buddy to 18 meters / 60 feet anywhere in the world — and your certification never expires. With the course finished in just 2 days, you'll have the rest of your vacation to enjoy it.",
      es: "Una vez certificado, puedes bucear con un compañero hasta 18 metros / 60 pies en cualquier parte del mundo — y tu certificación nunca caduca. Con el curso terminado en solo 2 días, tendrás el resto de tus vacaciones para disfrutarlo.",
    },
    {
      style: "normal",
      en: "Many of our referral students add a few fun dives on our local reefs and wrecks, or continue straight into the Advanced Open Water course, which extends your depth limit to 30 meters and unlocks sites like Shark Point and Catalina's deeper walls.",
      es: "Muchos de nuestros estudiantes de referral añaden algunas inmersiones recreativas en nuestros arrecifes y pecios locales, o continúan directamente con el curso Advanced Open Water, que amplía tu límite de profundidad a 30 metros y desbloquea sitios como Shark Point y las paredes más profundas de Catalina.",
    },
  ]),
  photoList: [
    imageRef(IMG.girlOnWreck, "Girl diving on a wreck", "owr-ph-1"),
    imageRef(IMG.groupOnBoat, "Group on dive boat", "owr-ph-2"),
    imageRef(IMG.turtleWide, "Sea turtle on the reef", "owr-ph-3"),
    imageRef(IMG.girlOnReef, "Girl diving over coral reef", "owr-ph-4"),
    imageRef(IMG.turtle, "Turtle swimming in Punta Cana", "owr-ph-5"),
    imageRef(IMG.studentDivers, "Student divers in training", "owr-ph-6"),
  ],
  seo: {
    _type: "seo",
    meta: {
      en: {
        title: "PADI Open Water Referral in Punta Cana | Finish Your Dives",
        description:
          "Complete your PADI Open Water Referral in Punta Cana. Finish your 4 certification dives in 2 days on warm Caribbean reefs with expert instructors. $375.",
        keywords: [
          "PADI Open Water Referral Punta Cana",
          "Open Water referral dives Caribbean",
          "complete Open Water certification Punta Cana",
          "referral dives Dominican Republic",
          "finish scuba certification on vacation",
        ],
      },
      es: {
        title: "PADI Open Water Referral en Punta Cana | Tus 4 Inmersiones",
        description:
          "Completa tu PADI Open Water Referral en Punta Cana: tus 4 inmersiones de certificación en 2 días en arrecifes caribeños con instructores expertos. $375.",
        keywords: [
          "PADI Open Water Referral Punta Cana",
          "inmersiones de referral Caribe",
          "completar certificación Open Water Punta Cana",
          "buceo referral República Dominicana",
        ],
      },
    },
    openGraph: {
      en: {
        title: "PADI Open Water Referral in Punta Cana | Finish Your Dives",
        description:
          "Complete your PADI Open Water Referral in Punta Cana. Finish your 4 certification dives in 2 days on warm Caribbean reefs with expert instructors. $375.",
      },
      es: {
        title: "PADI Open Water Referral en Punta Cana | Tus 4 Inmersiones",
        description:
          "Completa tu PADI Open Water Referral en Punta Cana: tus 4 inmersiones de certificación en 2 días en arrecifes caribeños con instructores expertos. $375.",
      },
      image: imageRef(IMG.girlOnReef, "Diver over a coral reef in Punta Cana"),
    },
    structuredData: {
      en: courseJsonLd({
        locale: "en",
        name: "PADI Open Water Referral",
        description:
          "Complete the final part of your PADI Open Water Diver course in Punta Cana: 4 open water certification dives over 2 days with a PADI instructor.",
        instanceName: "PADI Open Water Referral - 2 Day Certification Dives",
        instanceDescription:
          "Finish your Open Water certification with 4 open water dives over 2 days in Punta Cana. Theory and confined water training completed at home with a referral.",
        slug: "openwater-referral",
        price: "375",
      }),
      es: courseJsonLd({
        locale: "es",
        name: "PADI Open Water Referral",
        description:
          "Completa la parte final de tu curso PADI Open Water Diver en Punta Cana: 4 inmersiones de certificación en aguas abiertas durante 2 días con un instructor PADI.",
        instanceName: "PADI Open Water Referral - Inmersiones de certificación en 2 días",
        instanceDescription:
          "Termina tu certificación Open Water con 4 inmersiones en aguas abiertas durante 2 días en Punta Cana. Teoría y aguas confinadas completadas en tu país con un referral.",
        slug: "openwater-referral",
        price: "375",
      }),
    },
    noIndex: false,
    noFollow: false,
  },
  faqs: faqItems("owr", referralFaqs),
  structuredData: {
    en: faqPageJsonLd("openwater-referral", "en", referralFaqs),
    es: faqPageJsonLd("openwater-referral", "es", referralFaqs),
  },
}

// ---------------------------------------------------------------------------
// Course 2: PADI Open Water Diver for eLearners — $425
// ---------------------------------------------------------------------------

const elearningFaqs: Faq[] = [
  {
    q: {
      en: "How is this different from the regular Open Water course?",
      es: "¿En qué se diferencia del curso Open Water regular?",
    },
    a: {
      en: "The training is identical — the difference is that you've already bought the PADI eLearning directly from PADI and completed the theory online, so the in-destination price is lower: $425 instead of $499.",
      es: "El entrenamiento es idéntico — la diferencia es que ya compraste el PADI eLearning directamente a PADI y completaste la teoría en línea, por lo que el precio en destino es menor: $425 en lugar de $499.",
    },
  },
  {
    q: {
      en: "Do I need to finish the eLearning before I arrive?",
      es: "¿Necesito terminar el eLearning antes de llegar?",
    },
    a: {
      en: "Yes, ideally. Completing all knowledge development sections before your trip means your time in Punta Cana is spent diving, not studying. If you have a section left, talk to us — we can usually work it into the schedule.",
      es: "Sí, idealmente. Completar todas las secciones de desarrollo de conocimientos antes de tu viaje significa que tu tiempo en Punta Cana lo pasas buceando, no estudiando. Si te queda alguna sección, habla con nosotros — normalmente podemos acomodarla en el horario.",
    },
  },
  {
    q: {
      en: "What do I need to bring?",
      es: "¿Qué necesito traer?",
    },
    a: {
      en: "Your PADI eLearning completion record (in the PADI app or as a PDF), a swimsuit, and a towel. All diving equipment is included in the course.",
      es: "Tu registro de eLearning PADI completado (en la app de PADI o como PDF), un traje de baño y una toalla. Todo el equipo de buceo está incluido en el curso.",
    },
  },
  {
    q: {
      en: "How long does the course take?",
      es: "¿Cuánto dura el curso?",
    },
    a: {
      en: "Usually 2 to 3 days: a short theory review, confined water training, and then your 4 open water certification dives.",
      es: "Normalmente de 2 a 3 días: un breve repaso de la teoría, entrenamiento en aguas confinadas y luego tus 4 inmersiones de certificación en aguas abiertas.",
    },
  },
  {
    q: {
      en: "What's included in the $425 price?",
      es: "¿Qué incluye el precio de $425?",
    },
    a: {
      en: "Confined water training, all 4 open water certification dives, boat trips, full equipment rental, your PADI instructor, and certification processing. The PADI eLearning itself is purchased separately from PADI.",
      es: "El entrenamiento en aguas confinadas, las 4 inmersiones de certificación en aguas abiertas, los viajes en barco, el alquiler completo del equipo, tu instructor PADI y el procesamiento de la certificación. El PADI eLearning se compra por separado a PADI.",
    },
  },
]

const elearningCourse = {
  _id: "drafts.course-openwater-elearning",
  _type: "individualCourse",
  course: "Open Water eLearning",
  title: ls(
    "PADI Open Water Diver Course for eLearners in Punta Cana",
    "Curso PADI Open Water Diver para eLearners en Punta Cana"
  ),
  slug: { _type: "slug", current: "openwater-elearning" },
  cardImage: imageRef(IMG.girlDiving, "Girl diving in Punta Cana"),
  cardDescription: lt(
    "Bought PADI eLearning and finished the theory? Do your confined water training and 4 ocean dives with us!",
    "¿Compraste el PADI eLearning y terminaste la teoría? ¡Haz tu entrenamiento en aguas confinadas y tus 4 inmersiones con nosotros!"
  ),
  cardHashTags: ["eLearning", "PADI", "get certified"],
  courseLevel: "beginner",
  order: 5,
  padiPrice: 425,
  level: ls("Beginner", "Principiante"),
  duration: ls("2-3 Days", "2-3 Días"),
  dives: ls("4 open water", "4 en aguas abiertas"),
  maxDepth: ls("18 m / 60 ft", "18 m / 60 ft"),
  extraInfo: ls("Over 2-3 Days", "En 2-3 Días"),
  videoId: "scubaHero_wzvqdg",
  paragraph1: localizedBlock("owe-p1", [
    {
      style: "h1",
      en: "Your Theory Is Done — Come Dive",
      es: "Ya Hiciste la Teoría — Ven a Bucear",
    },
    {
      style: "normal",
      en: "This course is for students who bought PADI Open Water eLearning directly from PADI and completed the knowledge development online. You arrive with the theory done — we take care of everything else: your confined water training and your 4 open water certification dives in Punta Cana's warm Caribbean sea.",
      es: "Este curso es para estudiantes que compraron el PADI Open Water eLearning directamente a PADI y completaron el desarrollo de conocimientos en línea. Llegas con la teoría hecha — nosotros nos encargamos de todo lo demás: tu entrenamiento en aguas confinadas y tus 4 inmersiones de certificación en el cálido mar caribeño de Punta Cana.",
    },
    {
      style: "normal",
      en: "Because you already own your PADI eLearning materials, the in-destination price is $425 instead of the full course price. Over 2–3 relaxed days you'll go from finishing quizzes on your phone to exploring living coral reefs as a certified diver.",
      es: "Como ya tienes tus materiales de PADI eLearning, el precio en destino es de $425 en lugar del precio del curso completo. En 2–3 días tranquilos pasarás de terminar cuestionarios en tu teléfono a explorar arrecifes de coral vivos como buceador certificado.",
    },
  ]),
  paragraph2: localizedBlock("owe-p2", [
    {
      style: "h3",
      en: "Quick Theory Review on Arrival",
      es: "Repaso Rápido de la Teoría a tu Llegada",
    },
    {
      style: "normal",
      en: "When you arrive, your instructor reviews your eLearning record, goes over the key concepts with you, and answers any questions before you get in the water. There's no classroom marathon — just a focused review to make sure everything clicked.",
      es: "Cuando llegas, tu instructor revisa tu registro de eLearning, repasa los conceptos clave contigo y responde a todas tus preguntas antes de entrar al agua. No hay maratón de aula — solo un repaso enfocado para asegurarnos de que todo quedó claro.",
    },
    {
      style: "normal",
      en: "Our instructors teach in English, Spanish, and French, so you can learn in the language you're most comfortable with. Try to finish all eLearning sections before your trip; it keeps your schedule free for diving.",
      es: "Nuestros instructores enseñan en inglés, español y francés, para que aprendas en el idioma con el que te sientas más cómodo. Intenta terminar todas las secciones del eLearning antes de tu viaje; así tu horario queda libre para bucear.",
    },
  ]),
  paragraph3: localizedBlock("owe-p3", [
    {
      style: "h3",
      en: "Confined Water Skills Training",
      es: "Entrenamiento de Habilidades en Aguas Confinadas",
    },
    {
      style: "normal",
      en: "Your in-water training starts in a calm, confined water environment where you learn to set up your equipment and master the fundamental skills — all gear is included in the course, from wetsuit and BCD to regulator, mask, and fins.",
      es: "Tu entrenamiento en el agua comienza en un entorno tranquilo de aguas confinadas donde aprendes a montar tu equipo y dominar las habilidades fundamentales — todo el equipo está incluido en el curso, desde el traje y el BCD hasta el regulador, la máscara y las aletas.",
    },
    {
      style: "normal",
      en: "We train in small groups so your instructor can give you personal attention and repeat any skill until it feels natural. Nothing is rushed; you move on when you're ready.",
      es: "Entrenamos en grupos pequeños para que tu instructor pueda darte atención personalizada y repetir cualquier habilidad hasta que se sienta natural. Nada es apresurado; avanzas cuando estás listo.",
    },
  ]),
  paragraph4: localizedBlock("owe-p4", [
    {
      style: "h3",
      en: "Master the Skills You Need Underwater",
      es: "Domina las Habilidades que Necesitas Bajo el Agua",
    },
    {
      style: "normal",
      en: "You'll practice buoyancy control, mask clearing, regulator recovery, air sharing, and responding to common underwater situations until they become second nature.",
      es: "Practicarás el control de la flotabilidad, el vaciado de la máscara, la recuperación del regulador, compartir aire y la respuesta a situaciones comunes bajo el agua hasta que se vuelvan naturales.",
    },
    {
      style: "normal",
      en: "We make sure you feel completely confident before progressing to the ocean — our instructors watch your body language, adjust the pace to you, and never move on until you're ready.",
      es: "Nos aseguramos de que te sientas completamente seguro antes de pasar al mar — nuestros instructores observan tu lenguaje corporal, ajustan el ritmo a ti y nunca avanzan hasta que estés listo.",
    },
  ]),
  paragraph5: localizedBlock("owe-p5", [
    {
      style: "h3",
      en: "4 Open Water Dives in the Caribbean",
      es: "4 Inmersiones en Aguas Abiertas del Caribe",
    },
    {
      style: "normal",
      en: "The highlight of the course: four certification dives on our calm local reefs off Cabeza de Toro — sites like El Niño and Park Reef, where lobsters, squid, and turtles are regular visitors. Skills are spread across the dives so most of your time is spent exploring.",
      es: "Lo mejor del curso: cuatro inmersiones de certificación en nuestros tranquilos arrecifes locales frente a Cabeza de Toro — sitios como El Niño y Park Reef, donde langostas, calamares y tortugas son visitantes habituales. Las habilidades se reparten entre las inmersiones para que pases la mayor parte del tiempo explorando.",
    },
    {
      style: "normal",
      en: "By your fourth dive you're not practicing anymore; you're simply diving. When you surface, your instructor processes your PADI Open Water Diver certification — recognized everywhere in the world, and it never expires.",
      es: "En tu cuarta inmersión ya no estás practicando; simplemente estás buceando. Cuando sales a la superficie, tu instructor procesa tu certificación PADI Open Water Diver — reconocida en todo el mundo, y nunca caduca.",
    },
  ]),
  paragraph6: localizedBlock("owe-p6", [
    {
      style: "h3",
      en: "Your Ticket to a Lifetime of Diving",
      es: "Tu Boleto a una Vida de Buceo",
    },
    {
      style: "normal",
      en: "Certified Open Water Divers can dive with a buddy to 18 meters / 60 feet anywhere in the world. Finish the course early in your stay and spend the rest of your vacation diving with us on reefs and wrecks.",
      es: "Los buceadores Open Water certificados pueden bucear con un compañero hasta 18 metros / 60 pies en cualquier parte del mundo. Termina el curso al principio de tu estancia y pasa el resto de tus vacaciones buceando con nosotros en arrecifes y pecios.",
    },
    {
      style: "normal",
      en: "Ready for more? Many eLearners continue straight into the Advanced Open Water course, which extends your depth limit to 30 meters and unlocks sites like Shark Point and Catalina's deeper walls.",
      es: "¿Listo para más? Muchos eLearners continúan directamente con el curso Advanced Open Water, que amplía tu límite de profundidad a 30 metros y desbloquea sitios como Shark Point y las paredes más profundas de Catalina.",
    },
  ]),
  photoList: [
    imageRef(IMG.guyDiving, "Diver exploring Punta Cana reefs", "owe-ph-1"),
    imageRef(IMG.morayEel, "Moray eel", "owe-ph-2"),
    imageRef(IMG.octopus, "Octopus on the reef", "owe-ph-3"),
    imageRef(IMG.wreck, "Wreck dive site", "owe-ph-4"),
    imageRef(IMG.turtleSmall, "Sea turtle", "owe-ph-5"),
    imageRef(IMG.diveCenter, "Grand Bay of the Sea dive center", "owe-ph-6"),
    imageRef(IMG.studentDivers, "Student divers in training", "owe-ph-7"),
  ],
  seo: {
    _type: "seo",
    meta: {
      en: {
        title: "PADI Open Water eLearning in Punta Cana | Get Certified",
        description:
          "Finished your PADI eLearning? Complete your confined water training and 4 open water dives in Punta Cana in 2-3 days and get certified. $425.",
        keywords: [
          "PADI eLearning Open Water Punta Cana",
          "Open Water Diver eLearning Caribbean",
          "complete PADI eLearning certification",
          "scuba certification for eLearners Dominican Republic",
        ],
      },
      es: {
        title: "PADI Open Water eLearning en Punta Cana | Certifícate",
        description:
          "¿Terminaste tu PADI eLearning? Completa tu entrenamiento en aguas confinadas y tus 4 inmersiones en Punta Cana en 2-3 días y certifícate. $425.",
        keywords: [
          "PADI eLearning Open Water Punta Cana",
          "curso Open Water eLearning Caribe",
          "certificación PADI eLearning República Dominicana",
        ],
      },
    },
    openGraph: {
      en: {
        title: "PADI Open Water eLearning in Punta Cana | Get Certified",
        description:
          "Finished your PADI eLearning? Complete your confined water training and 4 open water dives in Punta Cana in 2-3 days and get certified. $425.",
      },
      es: {
        title: "PADI Open Water eLearning en Punta Cana | Certifícate",
        description:
          "¿Terminaste tu PADI eLearning? Completa tu entrenamiento en aguas confinadas y tus 4 inmersiones en Punta Cana en 2-3 días y certifícate. $425.",
      },
      image: imageRef(IMG.girlDiving, "Girl diving in Punta Cana"),
    },
    structuredData: {
      en: courseJsonLd({
        locale: "en",
        name: "PADI Open Water Diver Course for eLearners",
        description:
          "Complete your PADI Open Water Diver certification in Punta Cana after finishing PADI eLearning: confined water training and 4 open water dives over 2-3 days.",
        instanceName:
          "PADI Open Water Diver for eLearners - 2-3 Day In-Person Certification",
        instanceDescription:
          "In-water portion of the PADI Open Water Diver course for students who completed PADI eLearning: confined water training and 4 open water dives in Punta Cana.",
        slug: "openwater-elearning",
        price: "425",
      }),
      es: courseJsonLd({
        locale: "es",
        name: "Curso PADI Open Water Diver para eLearners",
        description:
          "Completa tu certificación PADI Open Water Diver en Punta Cana tras terminar el PADI eLearning: entrenamiento en aguas confinadas y 4 inmersiones en aguas abiertas en 2-3 días.",
        instanceName:
          "PADI Open Water Diver para eLearners - Certificación presencial de 2-3 días",
        instanceDescription:
          "Parte práctica del curso PADI Open Water Diver para estudiantes que completaron el PADI eLearning: aguas confinadas y 4 inmersiones en aguas abiertas en Punta Cana.",
        slug: "openwater-elearning",
        price: "425",
      }),
    },
    noIndex: false,
    noFollow: false,
  },
  faqs: faqItems("owe", elearningFaqs),
  structuredData: {
    en: faqPageJsonLd("openwater-elearning", "en", elearningFaqs),
    es: faqPageJsonLd("openwater-elearning", "es", elearningFaqs),
  },
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  for (const doc of [referralCourse, elearningCourse]) {
    const slug = doc.slug.current
    const existingId = await client.fetch<string | null>(
      `*[_type == "individualCourse" && slug.current == $slug][0]._id`,
      { slug }
    )
    if (existingId) {
      console.log(`[skip] "${slug}" — already exists as ${existingId}`)
      continue
    }
    const result = await client.createIfNotExists(doc)
    console.log(`[created draft] ${result._id} — ${slug}`)
  }

  // Bump Advanced Open Water from order 4 to 6 so the new courses take 4 and 5.
  const advancedDocs = await client.fetch<{ _id: string; order: number }[]>(
    `*[_type == "individualCourse" && slug.current == "advanced"]{ _id, order }`
  )
  for (const adv of advancedDocs) {
    if (adv.order === 4) {
      await client.patch(adv._id).set({ order: 6 }).commit()
      console.log(`[patched] ${adv._id} — order 4 -> 6`)
    } else {
      console.log(`[skip] ${adv._id} — order is ${adv.order}, not 4`)
    }
  }

  console.log("\nDone. Review and publish the two drafts in Sanity Studio (/studio).")
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
