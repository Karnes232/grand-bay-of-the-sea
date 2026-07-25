/**
 * Seed the Privacy Policy singleton + its pageSeo doc (2026-07-25).
 * Idempotent: createOrReplace with fixed IDs and deterministic block keys.
 * Hero image reuses the contact-page hero asset; OG image reuses the
 * cancellation-policy OG asset (owner can swap either in Studio).
 *
 * Run: npx tsx --env-file=.env.local scripts/seed-privacy-policy.ts
 */
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

let k = 0
const key = (p: string) => `${p}-${(k++).toString(36).padStart(3, "0")}`

const block = (
  prefix: string,
  style: "h1" | "h2" | "normal",
  text: string,
  listItem?: "bullet",
) => ({
  _key: key(prefix),
  _type: "block",
  style,
  ...(listItem ? { listItem, level: 1 } : {}),
  markDefs: [],
  children: [{ _key: key(prefix), _type: "span", marks: [], text }],
})

const EN = [
  block("ppe", "h1", "Privacy Policy"),
  block("ppe", "normal", "Last updated: July 25, 2026"),
  block(
    "ppe",
    "normal",
    'Grand Bay of the Sea ("we", "us") is a PADI dive center located at Carretera Cabeza de Toro, Punta Cana, Dominican Republic. This policy explains what personal information we collect through this website, why we collect it, and how we handle it.',
  ),
  block("ppe", "h2", "Information We Collect"),
  block(
    "ppe",
    "normal",
    "When you contact us or request a booking through our website, we collect the details you provide in the form: your name, email address, hotel or accommodation, diving certification level, preferred activity date, number of guests, and your message. Our forms also record which page of the site you sent them from.",
  ),
  block(
    "ppe",
    "normal",
    "When you pay a deposit, the payment is processed entirely by PayPal. We never receive or store your card number or PayPal credentials — we only receive confirmation that the deposit was paid.",
  ),
  block(
    "ppe",
    "normal",
    "Like most websites, we also collect standard technical information (browser type, pages visited, approximate location) through cookies and analytics, described below.",
  ),
  block("ppe", "h2", "How We Use Your Information"),
  block("ppe", "normal", "Respond to your inquiry and confirm availability.", "bullet"),
  block("ppe", "normal", "Process your booking and send confirmation emails.", "bullet"),
  block(
    "ppe",
    "normal",
    "Keep a record of certified divers for safety and operational reasons.",
    "bullet",
  ),
  block("ppe", "normal", "Understand how the website is used so we can improve it.", "bullet"),
  block(
    "ppe",
    "normal",
    "We do not sell your personal information, and we do not add you to marketing lists without your consent.",
  ),
  block("ppe", "h2", "Services We Rely On"),
  block(
    "ppe",
    "normal",
    "Your information is handled by a small set of service providers, each under its own privacy policy:",
  ),
  block("ppe", "normal", "Netlify — website hosting and delivery of form submissions.", "bullet"),
  block("ppe", "normal", "Supabase — secure storage of booking records.", "bullet"),
  block("ppe", "normal", "PayPal — deposit payments.", "bullet"),
  block("ppe", "normal", "Resend — booking confirmation emails.", "bullet"),
  block(
    "ppe",
    "normal",
    "Google Analytics and Google Tag Manager — anonymous site usage statistics.",
    "bullet",
  ),
  block("ppe", "normal", "Sanity and Cloudinary — content and media delivery.", "bullet"),
  block("ppe", "h2", "Cookies & Analytics"),
  block(
    "ppe",
    "normal",
    "We use Google Analytics (via Google Tag Manager) to understand how visitors use the site — which pages are popular and how people find us. These tools set cookies in your browser. We also remember your language preference. You can block or delete cookies at any time in your browser settings; the site works fine without them.",
  ),
  block("ppe", "h2", "How Long We Keep Your Data"),
  block(
    "ppe",
    "normal",
    "We keep booking and contact records for as long as they are needed to operate the business — to manage your booking, answer follow-up questions, and meet safety and accounting obligations. Records that are no longer needed are deleted.",
  ),
  block("ppe", "h2", "Your Rights"),
  block(
    "ppe",
    "normal",
    "You can ask us at any time to see the personal information we hold about you, to correct it, or to delete it. Email us at grandbayofthesea@gmail.com and we will respond as quickly as we can. If you are in the European Union, these rights are guaranteed by the GDPR; we honor the same requests from everyone, wherever you are.",
  ),
  block("ppe", "h2", "Children"),
  block(
    "ppe",
    "normal",
    "Our website is not directed at children. Diving activities for minors (PADI programs start at age 10) are always booked and consented to by a parent or guardian, and any information about a minor is provided to us by the guardian for the purposes of the booking.",
  ),
  block("ppe", "h2", "Changes to This Policy"),
  block(
    "ppe",
    "normal",
    "If we change how we handle personal information, we will update this page and revise the date at the top.",
  ),
  block("ppe", "h2", "Contact"),
  block(
    "ppe",
    "normal",
    "Grand Bay of the Sea · Carretera Cabeza de Toro, Punta Cana, Dominican Republic. Email: grandbayofthesea@gmail.com · WhatsApp: +1 829-723-9338.",
  ),
]

const ES = [
  block("pps", "h1", "Política de Privacidad"),
  block("pps", "normal", "Última actualización: 25 de julio de 2026"),
  block(
    "pps",
    "normal",
    'Grand Bay of the Sea ("nosotros") es un centro de buceo PADI ubicado en Carretera Cabeza de Toro, Punta Cana, República Dominicana. Esta política explica qué información personal recopilamos a través de este sitio web, por qué la recopilamos y cómo la tratamos.',
  ),
  block("pps", "h2", "Información que Recopilamos"),
  block(
    "pps",
    "normal",
    "Cuando nos contactas o solicitas una reserva a través de nuestro sitio web, recopilamos los datos que proporcionas en el formulario: tu nombre, correo electrónico, hotel o alojamiento, nivel de certificación de buceo, fecha preferida de la actividad, número de personas y tu mensaje. Nuestros formularios también registran desde qué página del sitio los enviaste.",
  ),
  block(
    "pps",
    "normal",
    "Cuando pagas un depósito, el pago es procesado íntegramente por PayPal. Nunca recibimos ni almacenamos tu número de tarjeta ni tus credenciales de PayPal — solo recibimos la confirmación de que el depósito fue pagado.",
  ),
  block(
    "pps",
    "normal",
    "Como la mayoría de los sitios web, también recopilamos información técnica estándar (tipo de navegador, páginas visitadas, ubicación aproximada) mediante cookies y analítica, descritas más abajo.",
  ),
  block("pps", "h2", "Cómo Usamos tu Información"),
  block("pps", "normal", "Responder a tu consulta y confirmar disponibilidad.", "bullet"),
  block("pps", "normal", "Procesar tu reserva y enviar correos de confirmación.", "bullet"),
  block(
    "pps",
    "normal",
    "Mantener un registro de buzos certificados por razones de seguridad y operación.",
    "bullet",
  ),
  block("pps", "normal", "Entender cómo se usa el sitio web para poder mejorarlo.", "bullet"),
  block(
    "pps",
    "normal",
    "No vendemos tu información personal y no te añadimos a listas de marketing sin tu consentimiento.",
  ),
  block("pps", "h2", "Servicios que Utilizamos"),
  block(
    "pps",
    "normal",
    "Tu información es tratada por un pequeño grupo de proveedores de servicios, cada uno bajo su propia política de privacidad:",
  ),
  block("pps", "normal", "Netlify — alojamiento web y entrega de los formularios.", "bullet"),
  block("pps", "normal", "Supabase — almacenamiento seguro de los registros de reservas.", "bullet"),
  block("pps", "normal", "PayPal — pagos de depósitos.", "bullet"),
  block("pps", "normal", "Resend — correos de confirmación de reservas.", "bullet"),
  block(
    "pps",
    "normal",
    "Google Analytics y Google Tag Manager — estadísticas anónimas de uso del sitio.",
    "bullet",
  ),
  block("pps", "normal", "Sanity y Cloudinary — entrega de contenido y multimedia.", "bullet"),
  block("pps", "h2", "Cookies y Analítica"),
  block(
    "pps",
    "normal",
    "Usamos Google Analytics (a través de Google Tag Manager) para entender cómo los visitantes usan el sitio: qué páginas son populares y cómo nos encuentran. Estas herramientas colocan cookies en tu navegador. También recordamos tu preferencia de idioma. Puedes bloquear o eliminar las cookies en cualquier momento desde la configuración de tu navegador; el sitio funciona perfectamente sin ellas.",
  ),
  block("pps", "h2", "Cuánto Tiempo Conservamos tus Datos"),
  block(
    "pps",
    "normal",
    "Conservamos los registros de reservas y contacto durante el tiempo necesario para operar el negocio: gestionar tu reserva, responder preguntas posteriores y cumplir obligaciones de seguridad y contabilidad. Los registros que ya no se necesitan se eliminan.",
  ),
  block("pps", "h2", "Tus Derechos"),
  block(
    "pps",
    "normal",
    "Puedes pedirnos en cualquier momento ver la información personal que tenemos sobre ti, corregirla o eliminarla. Escríbenos a grandbayofthesea@gmail.com y responderemos lo antes posible. Si te encuentras en la Unión Europea, estos derechos están garantizados por el RGPD; atendemos las mismas solicitudes de cualquier persona, estés donde estés.",
  ),
  block("pps", "h2", "Menores de Edad"),
  block(
    "pps",
    "normal",
    "Nuestro sitio web no está dirigido a niños. Las actividades de buceo para menores (los programas PADI comienzan a los 10 años) siempre son reservadas y autorizadas por un padre o tutor, y cualquier información sobre un menor nos la proporciona el tutor para efectos de la reserva.",
  ),
  block("pps", "h2", "Cambios en esta Política"),
  block(
    "pps",
    "normal",
    "Si cambiamos la forma en que tratamos la información personal, actualizaremos esta página y revisaremos la fecha en la parte superior.",
  ),
  block("pps", "h2", "Contacto"),
  block(
    "pps",
    "normal",
    "Grand Bay of the Sea · Carretera Cabeza de Toro, Punta Cana, República Dominicana. Email: grandbayofthesea@gmail.com · WhatsApp: +1 829-723-9338.",
  ),
]

const privacyPolicyDoc = {
  _id: "privacyPolicy",
  _type: "privacyPolicy",
  heroImage: {
    _type: "image",
    asset: {
      _type: "reference",
      // Contact-page hero asset, reused (swap in Studio if desired)
      _ref: "image-d8a4c1c8af8c0f645ed6bef9165e2df45bb677be-2000x1332-webp",
    },
    alt: "Grand Bay of the Sea dive boat in Punta Cana",
  },
  eyebrow: {
    _type: "localizedString",
    en: "Your data, handled with care",
    es: "Tus datos, tratados con cuidado",
  },
  content: { _type: "localizedBlock", en: EN, es: ES },
  contactPrompt: {
    _type: "localizedText",
    en: "Questions about your data or this policy? We are happy to help.",
    es: "¿Preguntas sobre tus datos o esta política? Estamos encantados de ayudarte.",
  },
}

const sdEn = JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: "https://www.grandbay-puntacana.com/privacy-policy",
    inLanguage: "en",
    publisher: { "@id": "https://www.grandbay-puntacana.com/#business" },
  },
  null,
  2,
)
const sdEs = JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política de Privacidad",
    url: "https://www.grandbay-puntacana.com/es/privacy-policy",
    inLanguage: "es",
    publisher: { "@id": "https://www.grandbay-puntacana.com/#business" },
  },
  null,
  2,
)

const pageSeoDoc = {
  _id: "pageSeo-privacy-policy",
  _type: "pageSeo",
  pageName: "Privacy Policy",
  seo: {
    _type: "seo",
    meta: {
      en: {
        title: "Privacy Policy | Grand Bay of the Sea",
        description:
          "How Grand Bay of the Sea collects, uses, and protects your personal information when you contact us or book diving in Punta Cana.",
        keywords: [
          "privacy policy",
          "grand bay of the sea",
          "data protection",
          "scuba diving punta cana",
        ],
      },
      es: {
        title: "Política de Privacidad | Grand Bay of the Sea",
        description:
          "Cómo Grand Bay of the Sea recopila, usa y protege tu información personal al contactarnos o reservar buceo en Punta Cana.",
        keywords: [
          "política de privacidad",
          "grand bay of the sea",
          "protección de datos",
          "buceo en punta cana",
        ],
      },
    },
    openGraph: {
      en: {
        title: "Privacy Policy | Grand Bay of the Sea Punta Cana",
        description:
          "How we collect, use, and protect your personal information when you contact us or book diving in Punta Cana.",
      },
      es: {
        title: "Política de Privacidad | Grand Bay of the Sea Punta Cana",
        description:
          "Cómo recopilamos, usamos y protegemos tu información personal al contactarnos o reservar buceo en Punta Cana.",
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          // Cancellation-policy OG asset, reused
          _ref: "image-03e194481c81e9d4038edfad7bef51657e775c87-2048x1566-jpg",
        },
      },
    },
    noIndex: false,
    noFollow: false,
    structuredData: { en: sdEn, es: sdEs },
  },
}

async function run() {
  if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN missing")
  const tx = client.transaction()
  tx.createOrReplace(privacyPolicyDoc as any)
  tx.createOrReplace(pageSeoDoc as any)
  await tx.commit()
  console.log("✔ privacyPolicy + pageSeo-privacy-policy created/replaced (published)")
  const check = await client.fetch(
    `{"policy": *[_id == "privacyPolicy"][0]{ "blocksEn": count(content.en), "blocksEs": count(content.es) }, "seo": *[_type == "pageSeo" && pageName == "Privacy Policy"][0].seo.meta.en.title}`,
  )
  console.log("Post-check:", JSON.stringify(check))
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
