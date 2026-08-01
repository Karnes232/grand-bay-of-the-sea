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
      en: "✈️ PUJ vs SDQ: Which Airport Should You Fly Into for Punta Cana?",
      es: "✈️ PUJ vs SDQ: ¿A Qué Aeropuerto Debes Volar para Punta Cana?",
    },

    slug: {
      _type: "slug",
      current: "puj-vs-sdq-airport-punta-cana",
    },

    publishDate: "2026-07-06",

    description: {
      _type: "localizedText",
      en: "PUJ is 20-45 minutes from most Punta Cana resorts; SDQ is 2-3 hours away via Autopista del Coral. When each airport makes sense, transfer costs and options, and how to compare fares that look cheaper into SDQ.",
      es: "PUJ está a 20-45 minutos de la mayoría de resorts de Punta Cana; SDQ está a 2-3 horas vía Autopista del Coral. Cuándo tiene sentido cada aeropuerto, costos de transporte y cómo comparar tarifas que parecen más baratas a SDQ.",
    },

    blogCategory: {
      _type: "reference",
      _ref: CATEGORIES.travelTips,
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
            { _type: "span", _key: "en-b1-s1", text: "Short answer: fly into PUJ (Punta Cana International) if you're heading straight to a Punta Cana resort. Fly into SDQ (Las Américas in Santo Domingo) if the flight is significantly cheaper, if you're combining Santo Domingo with your beach time, or if you can't get a good direct flight into PUJ from your city. The two airports are 100+ miles apart with a 2-3 hour drive between them, so \"which airport\" is a real decision that shows up in cost, time, and how much of your vacation you spend in transit. This post walks through when each choice makes sense, what the transfer looks like, and how to actually compare the total-cost math when SDQ fares look cheaper on paper.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "PUJ (Punta Cana International Airport)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "PUJ is the primary tourism airport for the Dominican Republic and the busiest airport in the country. It's designed specifically for the Punta Cana resort corridor, sits in the middle of the tourism zone, and puts you 20 to 45 minutes from almost every resort in the area — Bavaro is typically 15-30 minutes, Cabeza de Toro around 20-30 minutes, Cap Cana around 15-25 minutes, Uvero Alto around 40-60 minutes. The terminal itself is famously open-air with a thatched-roof design that says \"you're on vacation\" before you've even cleared immigration.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "Direct flights operate to PUJ from most major US cities (New York, Miami, Atlanta, Chicago, Boston, Charlotte, Newark, and dozens more), major Canadian cities (Toronto, Montreal, Ottawa, Vancouver seasonally), and increasingly from Europe (Madrid, Frankfurt, Paris, London, Amsterdam) and Latin America. For most vacationers coming from a primary market, a direct PUJ flight will exist on multiple airlines with pricing that's competitive with SDQ once you factor in transfer costs.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "SDQ (Las Américas International Airport)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "SDQ serves Santo Domingo, the DR's capital city on the south coast. It's the country's other major international airport, with a broader mix of business and leisure traffic since Santo Domingo itself is a city of 3 million people. From SDQ to Punta Cana resorts is about 100 miles / 160 km by road, following Autopista del Coral (Highway 3) — a modern divided toll highway with 2 toll booths totaling around $3-5 USD in tolls. Drive time is 2 to 3 hours depending on traffic and your destination in the Punta Cana area.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "SDQ can be significantly cheaper on airfare — routes from secondary US cities, Latin American hubs, and connecting flights from Europe often price $100 to $200 less through SDQ than PUJ per person. This is the main reason a Punta Cana traveler ends up at SDQ: the math on airfare savings versus the added transfer cost sometimes favors SDQ, especially for couples and families where the savings multiply.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "The Total-Cost Math", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "The comparison isn't just about ticket price. To make a fair PUJ vs SDQ decision, add the transfer cost and time value to each option:", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "PUJ transfer: $30 to $60 for a private taxi to most Punta Cana hotels (round trip $60 to $120). Time: 30 to 45 minutes each way. Many all-inclusive packages include PUJ transfers, so this may be $0 depending on how you booked.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "SDQ transfer: $130 to $270 for a private transfer service (round trip $260 to $540) for one to four people. Time: 2 to 3 hours each way. Alternatively, Expreso Bávaro operates a bus service between SDQ and Bávaro at around $17 per person one way, taking 4 to 4.5 hours with stops — cheap but eating a large chunk of vacation time.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Rough math for a couple: SDQ airfare $200 cheaper per person = $400 saved. SDQ private transfer $250 round trip vs PUJ $80 round trip = $170 extra. Net: still $230 ahead on SDQ. For a family of four, the airfare savings multiply while transfer costs stay roughly the same (a single vehicle for four fits in the standard transfer), so SDQ makes even more sense. For a solo traveler with a modest airfare gap, PUJ almost always wins on total cost once transfer is factored in.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "When PUJ Makes Sense", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "PUJ is the right choice for the vast majority of Punta Cana vacationers, especially: short trips (3-5 days) where losing 4-6 hours of vacation to airport transfers is a big deal proportionally; travelers with kids or elderly companions where a shorter transfer is easier on everyone; anyone whose primary purpose is beach/resort time (no city interest); anyone landing late at night or leaving early morning (the extra transfer time on top of a red-eye is brutal); and anyone whose airfare from their home city into PUJ is within $75-100 per person of the SDQ alternative.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "When SDQ Makes Sense", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "SDQ makes sense in three specific scenarios. First: significant airfare savings — $150+ per person per direction, which multiplies for couples and families. Second: you want to combine Santo Domingo with your beach time — the Zona Colonial (Colonial Zone) is a genuinely worthwhile UNESCO World Heritage historic district with 500-year-old buildings, cathedrals, and streetscapes; spending 1-2 nights in Santo Domingo before transferring to Punta Cana turns \"extra transfer time\" into \"cultural pre-game.\" Third: your airline of choice only serves SDQ from your city, or the SDQ schedule matches your dates when PUJ doesn't.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "If you're going the combo route, the logical sequence is: fly into SDQ → 1-2 nights in Santo Domingo (Colonial Zone) → private transfer to Punta Cana → beach and diving portion of the trip → PUJ departure back home. This gives you city + beach in one trip without doubling back to Santo Domingo for departure. Total transfer time is similar to a round-trip SDQ approach but you get a legitimate cultural experience added.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "Other Airport Options", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "For completeness, there are three other DR airports occasionally relevant to Punta Cana travelers. LRM (La Romana International Airport) is a small airport about 90 minutes from Punta Cana, closer to Bayahibe and Casa de Campo. Limited flights, mostly charter and some seasonal European service. Sometimes cheaper than PUJ but the flight options are scarce enough that most travelers never see LRM as a real alternative.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "STI (Cibao International Airport in Santiago) is in the north-central part of the country, about 4 hours from Punta Cana by road. Serves the Cibao region (Puerto Plata, Cabarete, Sosúa area) and would be inappropriate for a Punta Cana-only trip. POP (Gregorio Luperón International Airport in Puerto Plata) is on the north coast and similarly serves that region — about 4.5 hours from Punta Cana. Only relevant if you're doing a Puerto Plata + Punta Cana combined trip.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "The Autopista del Coral Drive", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "If you do end up at SDQ, the drive to Punta Cana is on Autopista del Coral (Highway 3), which is a modern divided toll highway — much better than the older secondary roads Dominican tourists used before it was completed. Two toll booths, cash or card accepted, roughly $3 to $5 total in tolls. The scenery is mostly rural — sugar cane fields, small towns, occasional coastal views. Rest stops are limited but exist along the route. If you're doing this drive independently in a rental car, know that Dominican highway driving is different from the US or Europe (aggressive lane discipline, mixed vehicle speeds, and occasional livestock near the road are all normal), and most travelers prefer a private transfer where a local driver handles that.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "Booking Transfers", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b24-l1", href: "https://www.grandbay-puntacana.com/blog/travel-tips/getting-around-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "For SDQ to Punta Cana, book a private transfer service in advance rather than negotiating with airport taxis on arrival — pre-booked transfers are often $40 to $50 cheaper and much less stressful after a long flight. Most reputable operators charge $130 to $200 for a private car for 1-4 people, with larger vans available for groups. For PUJ, if your resort didn't include transport, any pre-booked private taxi is typically $30 to $50 depending on destination. Our ", marks: [] },
            { _type: "span", _key: "en-b24-s2", text: "getting around Punta Cana guide", marks: ["en-b24-l1"] },
            { _type: "span", _key: "en-b24-s3", text: " covers ground transport options in more depth once you're in the area.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "The Bottom Line", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b26-l1", href: "https://www.grandbay-puntacana.com/courses" },
            { _type: "link", _key: "en-b26-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "Fly PUJ for almost every straightforward Punta Cana vacation — it's 20-45 minutes from your resort, direct flights exist from most major cities, and transfer costs are low. Fly SDQ if the airfare is significantly cheaper ($150+ per person), if you want to add Santo Domingo's Colonial Zone to the trip, or if PUJ schedules don't work for you. The math tilts toward SDQ for couples and families with real airfare gaps, toward PUJ for solo travelers and short trips. If you're planning a ", marks: [] },
            { _type: "span", _key: "en-b26-s2", text: "diving-focused trip", marks: ["en-b26-l1"] },
            { _type: "span", _key: "en-b26-s3", text: " and want help coordinating airport pickup or figuring out logistics, message us on ", marks: [] },
            { _type: "span", _key: "en-b26-s4", text: "WhatsApp", marks: ["en-b26-l2"] },
            { _type: "span", _key: "en-b26-s5", text: " with your dates and we'll help you plan the arrival day around your first dive.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "Respuesta corta: vuela a PUJ (Punta Cana Internacional) si vas directo a un resort en Punta Cana. Vuela a SDQ (Las Américas en Santo Domingo) si el vuelo es significativamente más barato, si estás combinando Santo Domingo con tu tiempo de playa, o si no puedes conseguir un buen vuelo directo a PUJ desde tu ciudad. Los dos aeropuertos están a más de 160 km de distancia con 2-3 horas de manejo entre ellos, así que \"cuál aeropuerto\" es una decisión real que aparece en costo, tiempo y cuánto de tus vacaciones pasas en tránsito. Esta publicación recorre cuándo tiene sentido cada opción, cómo se ve el transporte y cómo comparar realmente la matemática de costo total cuando las tarifas a SDQ parecen más baratas en papel.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "PUJ (Aeropuerto Internacional de Punta Cana)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "PUJ es el aeropuerto turístico primario de la República Dominicana y el aeropuerto más ocupado del país. Está diseñado específicamente para el corredor de resorts de Punta Cana, se sienta en medio de la zona turística y te pone a 20-45 minutos de casi todo resort en el área — Bávaro es típicamente 15-30 minutos, Cabeza de Toro alrededor de 20-30 minutos, Cap Cana alrededor de 15-25 minutos, Uvero Alto alrededor de 40-60 minutos. La terminal en sí es famosamente al aire libre con un diseño de techo de palma que dice \"estás de vacaciones\" antes de que hayas pasado inmigración.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "Los vuelos directos operan a PUJ desde la mayoría de las ciudades importantes de EE.UU. (Nueva York, Miami, Atlanta, Chicago, Boston, Charlotte, Newark, y docenas más), grandes ciudades canadienses (Toronto, Montreal, Ottawa, Vancouver estacional), y cada vez más desde Europa (Madrid, Frankfurt, París, Londres, Ámsterdam) y Latinoamérica. Para la mayoría de vacacionistas que vienen de un mercado primario, existirá un vuelo directo a PUJ en múltiples aerolíneas con precios que son competitivos con SDQ una vez que factorizas los costos de transporte.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "SDQ (Aeropuerto Internacional Las Américas)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "SDQ sirve a Santo Domingo, la ciudad capital de la RD en la costa sur. Es el otro aeropuerto internacional importante del país, con una mezcla más amplia de tráfico de negocios y turismo ya que Santo Domingo en sí es una ciudad de 3 millones de personas. De SDQ a resorts de Punta Cana es aproximadamente 160 km por carretera, siguiendo la Autopista del Coral (Autovía 3) — una autopista moderna de peaje dividida con 2 casetas de peaje que totalizan aproximadamente $3-5 USD en peajes. El tiempo de manejo es de 2 a 3 horas dependiendo del tráfico y tu destino en el área de Punta Cana.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "SDQ puede ser significativamente más barato en tarifa aérea — las rutas desde ciudades secundarias de EE.UU., hubs latinoamericanos y vuelos con conexión desde Europa frecuentemente cotizan $100 a $200 menos por SDQ que por PUJ por persona. Esta es la razón principal por la que un viajero a Punta Cana termina en SDQ: la matemática de ahorros de tarifa aérea contra el costo adicional de transporte a veces favorece a SDQ, especialmente para parejas y familias donde los ahorros se multiplican.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "La Matemática de Costo Total", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "La comparación no es solo el precio del boleto. Para hacer una decisión justa PUJ vs SDQ, agrega el costo de transporte y el valor del tiempo a cada opción:", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "Transporte PUJ: $30 a $60 por un taxi privado a la mayoría de los hoteles de Punta Cana (ida y vuelta $60 a $120). Tiempo: 30 a 45 minutos cada trayecto. Muchos paquetes todo-incluido incluyen transporte PUJ, así que esto puede ser $0 dependiendo de cómo reservaste.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Transporte SDQ: $130 a $270 por un servicio de transporte privado (ida y vuelta $260 a $540) para una a cuatro personas. Tiempo: 2 a 3 horas cada trayecto. Alternativamente, Expreso Bávaro opera un servicio de autobús entre SDQ y Bávaro por alrededor de $17 por persona un trayecto, tomando 4 a 4.5 horas con paradas — barato pero comiéndose un pedazo grande de tiempo de vacaciones.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "Matemática aproximada para una pareja: tarifa aérea SDQ $200 más barata por persona = $400 ahorrados. Transporte privado SDQ $250 ida y vuelta vs PUJ $80 ida y vuelta = $170 extra. Neto: aún $230 adelante en SDQ. Para una familia de cuatro, los ahorros de tarifa aérea se multiplican mientras los costos de transporte se mantienen aproximadamente iguales (un solo vehículo para cuatro cabe en el transporte estándar), así que SDQ tiene aún más sentido. Para un viajero solitario con una brecha modesta de tarifa aérea, PUJ casi siempre gana en costo total una vez que se factoriza el transporte.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Cuándo Tiene Sentido PUJ", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "PUJ es la elección correcta para la gran mayoría de los vacacionistas de Punta Cana, especialmente: viajes cortos (3-5 días) donde perder 4-6 horas de vacaciones a transportes al aeropuerto es un gran tema proporcionalmente; viajeros con niños o acompañantes mayores donde un transporte más corto es más fácil para todos; cualquiera cuyo propósito principal sea tiempo de playa/resort (sin interés en la ciudad); cualquiera aterrizando tarde en la noche o saliendo temprano en la mañana (el tiempo extra de transporte encima de un vuelo nocturno es brutal); y cualquiera cuya tarifa aérea desde su ciudad de origen a PUJ esté dentro de $75-100 por persona de la alternativa SDQ.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Cuándo Tiene Sentido SDQ", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "SDQ tiene sentido en tres escenarios específicos. Primero: ahorros significativos de tarifa aérea — $150+ por persona por dirección, que se multiplican para parejas y familias. Segundo: quieres combinar Santo Domingo con tu tiempo de playa — la Zona Colonial es un distrito histórico Patrimonio Mundial de la UNESCO genuinamente valioso con edificios, catedrales y calles de 500 años; pasar 1-2 noches en Santo Domingo antes de transferir a Punta Cana convierte el \"tiempo extra de transporte\" en \"precalentamiento cultural.\" Tercero: tu aerolínea preferida solo sirve SDQ desde tu ciudad, o el itinerario de SDQ coincide con tus fechas cuando PUJ no.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Si vas por la ruta combo, la secuencia lógica es: volar a SDQ → 1-2 noches en Santo Domingo (Zona Colonial) → transporte privado a Punta Cana → porción de playa y buceo del viaje → salida por PUJ de vuelta a casa. Esto te da ciudad + playa en un viaje sin regresar a Santo Domingo para la salida. El tiempo total de transporte es similar a un enfoque de SDQ ida y vuelta pero obtienes una experiencia cultural legítima agregada.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "Otras Opciones de Aeropuerto", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Para completar, hay tres otros aeropuertos de la RD ocasionalmente relevantes para viajeros de Punta Cana. LRM (Aeropuerto Internacional de La Romana) es un aeropuerto pequeño a aproximadamente 90 minutos de Punta Cana, más cerca de Bayahibe y Casa de Campo. Vuelos limitados, mayormente charter y algún servicio europeo estacional. A veces más barato que PUJ pero las opciones de vuelo son tan escasas que la mayoría de los viajeros nunca ven LRM como una alternativa real.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "STI (Aeropuerto Internacional del Cibao en Santiago) está en la parte centro-norte del país, aproximadamente 4 horas de Punta Cana por carretera. Sirve la región del Cibao (Puerto Plata, Cabarete, área de Sosúa) y sería inapropiado para un viaje solo a Punta Cana. POP (Aeropuerto Internacional Gregorio Luperón en Puerto Plata) está en la costa norte y similarmente sirve esa región — aproximadamente 4.5 horas de Punta Cana. Solo relevante si estás haciendo un viaje combinado de Puerto Plata + Punta Cana.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "El Trayecto por la Autopista del Coral", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "Si terminas en SDQ, el trayecto a Punta Cana es por la Autopista del Coral (Autovía 3), que es una autopista moderna dividida de peaje — mucho mejor que las carreteras secundarias más viejas que los turistas dominicanos usaban antes de que fuera terminada. Dos casetas de peaje, efectivo o tarjeta aceptados, aproximadamente $3 a $5 total en peajes. El paisaje es mayormente rural — campos de caña de azúcar, pequeños pueblos, vistas costeras ocasionales. Los paradores son limitados pero existen a lo largo de la ruta. Si estás haciendo este trayecto independientemente en un auto rentado, sepa que manejar en autopistas dominicanas es diferente que en EE.UU. o Europa (disciplina de carril agresiva, velocidades mixtas de vehículo y ganado ocasional cerca de la carretera son todos normales), y la mayoría de los viajeros prefieren un transporte privado donde un conductor local maneja eso.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Reservando Transportes", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b24-l1", href: "https://www.grandbay-puntacana.com/es/blog/travel-tips/getting-around-punta-cana" },
          ],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Para SDQ a Punta Cana, reserva un servicio de transporte privado por adelantado en lugar de negociar con taxis del aeropuerto a la llegada — los transportes pre-reservados frecuentemente son $40 a $50 más baratos y mucho menos estresantes después de un vuelo largo. La mayoría de los operadores serios cobran $130 a $200 por un auto privado para 1-4 personas, con vans más grandes disponibles para grupos. Para PUJ, si tu resort no incluyó transporte, cualquier taxi privado pre-reservado es típicamente $30 a $50 dependiendo del destino. Nuestra ", marks: [] },
            { _type: "span", _key: "es-b24-s2", text: "guía para moverte en Punta Cana", marks: ["es-b24-l1"] },
            { _type: "span", _key: "es-b24-s3", text: " cubre las opciones de transporte terrestre con más profundidad una vez que estás en el área.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b26-l1", href: "https://www.grandbay-puntacana.com/es/courses" },
            { _type: "link", _key: "es-b26-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "Vuela PUJ para casi cualquier vacación directa a Punta Cana — está a 20-45 minutos de tu resort, existen vuelos directos desde la mayoría de las ciudades importantes y los costos de transporte son bajos. Vuela SDQ si la tarifa aérea es significativamente más barata ($150+ por persona), si quieres agregar la Zona Colonial de Santo Domingo al viaje, o si los itinerarios de PUJ no funcionan para ti. La matemática se inclina hacia SDQ para parejas y familias con brechas reales de tarifa aérea, hacia PUJ para viajeros solos y viajes cortos. Si estás planeando un ", marks: [] },
            { _type: "span", _key: "es-b26-s2", text: "viaje enfocado en buceo", marks: ["es-b26-l1"] },
            { _type: "span", _key: "es-b26-s3", text: " y quieres ayuda coordinando la recogida en aeropuerto o resolviendo logística, escríbenos por ", marks: [] },
            { _type: "span", _key: "es-b26-s4", text: "WhatsApp", marks: ["es-b26-l2"] },
            { _type: "span", _key: "es-b26-s5", text: " con tus fechas y te ayudamos a planear el día de llegada alrededor de tu primera inmersión.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "PUJ vs SDQ: Which Airport for Punta Cana? (2026 Guide)",
          description:
            "PUJ (Punta Cana) is 20-45 min from resorts. SDQ (Santo Domingo) is 2-3 hours away via Autopista del Coral. When each makes sense, transfer costs, total-cost math, and other DR airports.",
          keywords: ["puj vs sdq", "punta cana airport", "santo domingo vs punta cana airport", "which airport punta cana", "SDQ transfer to punta cana", "PUJ airport"],
        },
        es: {
          title: "PUJ vs SDQ: ¿Qué Aeropuerto para Punta Cana? (Guía 2026)",
          description:
            "PUJ (Punta Cana) está a 20-45 min de los resorts. SDQ (Santo Domingo) está a 2-3 horas vía Autopista del Coral. Cuándo tiene sentido cada uno, costos de transporte y matemática de costo total.",
          keywords: ["puj vs sdq", "aeropuerto punta cana", "santo domingo aeropuerto", "que aeropuerto punta cana", "transporte SDQ punta cana"],
        },
      },
      openGraph: {
        en: {
          title: "PUJ vs SDQ: Which Airport for Punta Cana?",
          description: "Full comparison of Punta Cana International (PUJ) vs Las Américas Santo Domingo (SDQ): distances, drive times, transfer costs, and when each choice makes sense.",
        },
        es: {
          title: "PUJ vs SDQ: ¿Qué Aeropuerto para Punta Cana?",
          description: "Comparación completa de Punta Cana Internacional (PUJ) vs Las Américas Santo Domingo (SDQ): distancias, tiempos de manejo, costos de transporte y cuándo tiene sentido cada opción.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "PUJ vs SDQ: Which Airport Should You Fly Into for Punta Cana?",
          description: "Complete comparison of Punta Cana International Airport (PUJ) versus Las Américas International Airport (SDQ) for Punta Cana travel. PUJ is 20-45 minutes from most Punta Cana resorts (Bavaro 15-30 min, Cabeza de Toro 20-30 min, Cap Cana 15-25 min, Uvero Alto 40-60 min). SDQ is 100+ miles/160+ km away with a 2-3 hour drive via Autopista del Coral (Highway 3, $3-5 tolls). SDQ can be $100-200 cheaper on airfare from secondary US cities, Latin American hubs, and European connections. Total-cost math worked through for couples and families. When PUJ makes sense (short trips, families with kids, red-eye flights, small airfare gaps). When SDQ makes sense (significant airfare savings, Santo Domingo combo trips including Colonial Zone UNESCO site, airline availability). Transfer costs: PUJ private taxi $30-60, SDQ private transfer $130-270, Expreso Bavaro bus $17 (4.5 hours). Other DR airports: LRM (La Romana), STI (Santiago), POP (Puerto Plata).",
          datePublished: "2026-07-06",
          inLanguage: "en",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/blog/travel-tips/puj-vs-sdq-airport-punta-cana",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "PUJ vs SDQ: ¿A Qué Aeropuerto Debes Volar para Punta Cana?",
          description: "Comparación completa del Aeropuerto Internacional de Punta Cana (PUJ) contra el Aeropuerto Internacional Las Américas (SDQ) para viajes a Punta Cana. PUJ está a 20-45 minutos de la mayoría de los resorts. SDQ está a más de 160 km con manejo de 2-3 horas por la Autopista del Coral. SDQ puede ser $100-200 más barato en tarifa aérea. Matemática de costo total trabajada para parejas y familias. Cuándo tiene sentido cada opción. Costos de transporte. Otros aeropuertos: LRM, STI, POP.",
          datePublished: "2026-07-06",
          inLanguage: "es",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.grandbay-puntacana.com/es/blog/travel-tips/puj-vs-sdq-airport-punta-cana",
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
