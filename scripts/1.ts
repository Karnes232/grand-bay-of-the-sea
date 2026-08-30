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
      en: "🏘️ Puntacana Village: Shops, Restaurants & Services Near the Airport",
      es: "🏘️ Puntacana Village: Tiendas, Restaurantes y Servicios Cerca del Aeropuerto",
    },

    slug: {
      _type: "slug",
      current: "puntacana-village-guide",
    },

    publishDate: "2026-08-09",

    description: {
      _type: "localizedText",
      en: "A walkable village near PUJ airport with restaurants, a supermarket, pharmacy, bank, medical clinic, art galleries and a Four Points by Sheraton. Where residents actually eat, and the best place in Punta Cana to spend a few hours before a flight.",
      es: "Un pueblo caminable cerca del aeropuerto PUJ con restaurantes, supermercado, farmacia, banco, clínica médica, galerías de arte y un Four Points by Sheraton. Donde realmente comen los residentes, y el mejor lugar de Punta Cana para pasar unas horas antes de un vuelo.",
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
            {
              _type: "span",
              _key: "en-b1-s1",
              text: "Puntacana Village is the closest thing the area has to an actual town centre, and most visitors never see it. It sits a few minutes from Punta Cana International Airport — a low-rise cluster of Caribbean-style buildings containing restaurants, a supermarket, a pharmacy, a bank, medical services, art galleries, a hotel and a playground, arranged around walkable streets rather than inside a mall.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b2-s1",
              text: "It was built as the residential and service community for Grupo Puntacana — housing for people who work at the resort, the airport and the surrounding businesses — which is why it feels different from the tourist strips. This is where a lot of the area's professional residents actually live and eat. No commercial relationship here; we're a dive centre writing down what we tell guests.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b3-s1",
              text: "Where It Is and Why That Matters",
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
              text: "The village is adjacent to PUJ airport, in the Punta Cana Resort area at the southern end of the tourist zone. From Bávaro it's a 20 to 30 minute drive depending on traffic; from the airport it's barely five minutes. Puntacana Resort runs a shuttle for its guests, and it's an easy taxi from elsewhere.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b5-s1",
              text: "That airport proximity is the practical headline. If you have a late flight and a midday checkout, this is a considerably better way to spend the gap than sitting in departures — you can have a proper meal, buy last-minute gifts, and still be at the terminal in five minutes. It's also useful on arrival if you land early and your room isn't ready.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "Eating Here", marks: [] },
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
              text: "This is the strongest reason to make the trip. Grupo Puntacana operates more than a dozen restaurants and bars across its properties, and the village concentrates a good share of the accessible ones — a genuine spread of Dominican and international cooking at real restaurant prices rather than resort prices, in a setting where you order from a menu instead of queuing at a buffet.",
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
              text: "The atmosphere is the selling point. Tables outside, a village square rather than a hotel terrace, families and local residents alongside visitors, and an evening scene that keeps going after dinner. For anyone on an all-inclusive who has hit their limit on buffet food by day four — a genuinely common experience — a night here resets the trip.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b9-s1",
              text: "Specific restaurants open and close, so we won't list names that may be wrong by the time you read this. Check current listings, and if you want somewhere specific on a weekend evening, book — the good places fill up with residents, not just tourists.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b10-s1",
              text: "The Services That Make It Useful",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "en-b11-l1",
              href: "https://www.grandbay-puntacana.com/blog/local-businesses/hospitals-medical-clinics-punta-cana",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "en-b11-s1",
              text: "The village has a supermarket, a pharmacy, a bank with ATMs, and — worth knowing — an outpatient medical clinic operated by Hospital IMG. That last one matters if you're staying in the Punta Cana Resort area and need medical attention that isn't an emergency; our ",
              marks: [],
            },
            {
              _type: "span",
              _key: "en-b11-s2",
              text: "guide to hospitals and clinics",
              marks: ["en-b11-l1"],
            },
            {
              _type: "span",
              _key: "en-b11-s3",
              text: " covers the wider picture.",
              marks: [],
            },
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
              text: "There are also professional services, art galleries, a playground and ice cream for children, and the Four Points by Sheraton Puntacana Village hotel. That hotel is worth a mention for a specific use case: it's a sensible option for a first or last night if you have an awkward flight time, since you're minutes from the terminal without paying resort rates for a night you'll barely use.",
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
            {
              _type: "span",
              _key: "en-b13-s1",
              text: "Galerías Puntacana, the shopping centre in the village, covers day-to-day retail. It's smaller and more practical than the big malls — think errands rather than shopping as an activity.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b14-s1",
              text: "How It Compares",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "en-b15-l1",
              href: "https://www.grandbay-puntacana.com/blog/local-businesses/bluemall-punta-cana-guide",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "en-b15-s1",
              text: "Puntacana Village and ",
              marks: [],
            },
            {
              _type: "span",
              _key: "en-b15-s2",
              text: "BlueMall",
              marks: ["en-b15-l1"],
            },
            {
              _type: "span",
              _key: "en-b15-s3",
              text: " are both near the airport and both operated within the Grupo Puntacana orbit, but they're different propositions. BlueMall is an air-conditioned luxury mall with international designer brands and a cinema. The village is open-air, mixed-use, and residential in character — you go to BlueMall to shop and to the village to eat and spend an evening.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "en-b16-l1",
              href: "https://www.grandbay-puntacana.com/blog/local-businesses/san-juan-shopping-center-bavaro",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "en-b16-s1",
              text: "Compared to the Bávaro centres — ",
              marks: [],
            },
            {
              _type: "span",
              _key: "en-b16-s2",
              text: "San Juan Shopping Center",
              marks: ["en-b16-l1"],
            },
            {
              _type: "span",
              _key: "en-b16-s3",
              text: " and Downtown Punta Cana — the village is smaller, further south, and better for dining than for a big shop. If you're staying in Bávaro and need a supermarket run, don't drive down here; go to Downtown. If you want dinner somewhere pleasant and walkable, it's worth the trip.",
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
            {
              _type: "span",
              _key: "en-b17-s1",
              text: "The Conservation Connection",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "en-b18-l1",
              href: "https://www.grandbay-puntacana.com/blog/local-businesses/fundacion-grupo-puntacana-center-for-sustainability",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "en-b18-s1",
              text: "One thing worth combining with a village visit: the ",
              marks: [],
            },
            {
              _type: "span",
              _key: "en-b18-s2",
              text: "Fundación Grupo Puntacana Center for Sustainability",
              marks: ["en-b18-l1"],
            },
            {
              _type: "span",
              _key: "en-b18-s3",
              text: " is in the same resort area and runs visitor tours covering its coral nurseries, apiary, greenhouse and composting operations. A morning tour followed by lunch in the village makes a genuinely good non-diving day, particularly with children, and it's the most substantive conservation activity available to casual visitors in Punta Cana.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b19-s1",
              text: "Practical Notes",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b20-s1",
              text: "Prices are in Dominican pesos and cards are widely accepted, though smaller establishments may add a card surcharge — worth asking. Restaurant prices are below resort levels but this isn't a budget area; the village serves a relatively affluent residential population and prices reflect that. It's still considerably better value than eating at a hotel à la carte.",
              marks: [],
            },
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
              text: "Agree your taxi fare before setting off, and arrange the return in advance for an evening trip. The village is safe and pleasant to walk around after dark, which is not true of every part of the tourist zone. Weekday evenings are quiet; weekends are livelier and worth booking for.",
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
              text: "Bring a light layer for the evening if you're eating outside — it isn't cold, but a sea breeze after a day of sun catches people out.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en-b23-s1",
              text: "The Bottom Line",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "en-b24-l1",
              href: "https://www.grandbay-puntacana.com/contact",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "en-b24-s1",
              text: "Puntacana Village is a walkable, low-rise service and residential community minutes from PUJ airport, with restaurants, a supermarket, pharmacy, bank, an IMG outpatient clinic, art galleries, Galerías Puntacana and a Four Points by Sheraton. Its best uses are dinner away from the buffet, a last afternoon before a late flight, and pairing with a Center for Sustainability tour. It's not the place for a big supermarket shop or luxury retail — Downtown and BlueMall cover those. If you're planning dive days and want to know which evenings you'll be free, message us through ",
              marks: [],
            },
            {
              _type: "span",
              _key: "en-b24-s2",
              text: "our contact form",
              marks: ["en-b24-l1"],
            },
            {
              _type: "span",
              _key: "en-b24-s3",
              text: " with your dates.",
              marks: [],
            },
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
              text: "Puntacana Village es lo más parecido que la zona tiene a un centro de pueblo real, y la mayoría de los visitantes nunca lo ve. Está a pocos minutos del Aeropuerto Internacional de Punta Cana — un conjunto de edificios de poca altura estilo caribeño con restaurantes, supermercado, farmacia, banco, servicios médicos, galerías de arte, un hotel y un parque infantil, organizados alrededor de calles caminables en lugar de dentro de un centro comercial.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b2-s1",
              text: "Fue construido como la comunidad residencial y de servicios del Grupo Puntacana — vivienda para la gente que trabaja en el resort, el aeropuerto y los negocios circundantes — razón por la cual se siente diferente de las franjas turísticas. Aquí es donde muchos de los residentes profesionales de la zona realmente viven y comen. Sin relación comercial aquí; somos un centro de buceo escribiendo lo que le decimos a los huéspedes.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b3-s1",
              text: "Dónde Está y Por Qué Importa",
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
              text: "El village está adyacente al aeropuerto PUJ, en el área de Punta Cana Resort en el extremo sur de la zona turística. Desde Bávaro es un trayecto de 20 a 30 minutos dependiendo del tráfico; desde el aeropuerto son apenas cinco minutos. Puntacana Resort opera un transporte para sus huéspedes, y es un taxi fácil desde otros lugares.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b5-s1",
              text: "Esa cercanía al aeropuerto es el titular práctico. Si tienes un vuelo tarde y salida del hotel al mediodía, esta es una manera considerablemente mejor de pasar el hueco que sentarte en salidas — puedes tener una comida de verdad, comprar regalos de último minuto, y aún estar en la terminal en cinco minutos. También es útil al llegar si aterrizas temprano y tu habitación no está lista.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "Comer Aquí", marks: [] },
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
              text: "Esta es la razón más fuerte para hacer el viaje. El Grupo Puntacana opera más de una docena de restaurantes y bares en sus propiedades, y el village concentra buena parte de los accesibles — una variedad genuina de cocina dominicana e internacional a precios de restaurante real en lugar de precios de resort, en un entorno donde ordenas de un menú en lugar de hacer fila en un bufet.",
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
              text: "El ambiente es el atractivo. Mesas afuera, una plaza de pueblo en lugar de una terraza de hotel, familias y residentes locales junto a visitantes, y una escena nocturna que sigue después de la cena. Para cualquiera en un todo incluido que llegó a su límite de comida de bufet para el cuarto día — una experiencia genuinamente común — una noche aquí reinicia el viaje.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b9-s1",
              text: "Los restaurantes específicos abren y cierran, así que no listaremos nombres que puedan estar equivocados para cuando leas esto. Revisa los listados actuales, y si quieres un lugar específico una noche de fin de semana, reserva — los buenos lugares se llenan de residentes, no solo de turistas.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b10-s1",
              text: "Los Servicios Que Lo Hacen Útil",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "es-b11-l1",
              href: "https://www.grandbay-puntacana.com/es/blog/local-businesses/hospitals-medical-clinics-punta-cana",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "es-b11-s1",
              text: "El village tiene un supermercado, una farmacia, un banco con cajeros, y — vale la pena saberlo — una clínica médica ambulatoria operada por Hospital IMG. Esa última importa si te hospedas en el área de Punta Cana Resort y necesitas atención médica que no es una emergencia; nuestra ",
              marks: [],
            },
            {
              _type: "span",
              _key: "es-b11-s2",
              text: "guía de hospitales y clínicas",
              marks: ["es-b11-l1"],
            },
            {
              _type: "span",
              _key: "es-b11-s3",
              text: " cubre el panorama más amplio.",
              marks: [],
            },
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
              text: "También hay servicios profesionales, galerías de arte, un parque infantil y heladería para los niños, y el hotel Four Points by Sheraton Puntacana Village. Ese hotel merece mención por un caso de uso específico: es una opción sensata para una primera o última noche si tienes un horario de vuelo incómodo, ya que estás a minutos de la terminal sin pagar tarifas de resort por una noche que apenas usarás.",
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
            {
              _type: "span",
              _key: "es-b13-s1",
              text: "Galerías Puntacana, el centro comercial del village, cubre el comercio del día a día. Es más pequeño y más práctico que los centros grandes — piensa en mandados en lugar de compras como actividad.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b14-s1",
              text: "Cómo Se Compara",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "es-b15-l1",
              href: "https://www.grandbay-puntacana.com/es/blog/local-businesses/bluemall-punta-cana-guide",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "es-b15-s1",
              text: "Puntacana Village y ",
              marks: [],
            },
            {
              _type: "span",
              _key: "es-b15-s2",
              text: "BlueMall",
              marks: ["es-b15-l1"],
            },
            {
              _type: "span",
              _key: "es-b15-s3",
              text: " están ambos cerca del aeropuerto y ambos operan dentro de la órbita del Grupo Puntacana, pero son propuestas diferentes. BlueMall es un centro comercial de lujo con aire acondicionado, marcas internacionales de diseñador y cine. El village es al aire libre, de uso mixto, y residencial en carácter — vas a BlueMall a comprar y al village a comer y pasar una noche.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "es-b16-l1",
              href: "https://www.grandbay-puntacana.com/es/blog/local-businesses/san-juan-shopping-center-bavaro",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "es-b16-s1",
              text: "Comparado con los centros de Bávaro — ",
              marks: [],
            },
            {
              _type: "span",
              _key: "es-b16-s2",
              text: "San Juan Shopping Center",
              marks: ["es-b16-l1"],
            },
            {
              _type: "span",
              _key: "es-b16-s3",
              text: " y Downtown Punta Cana — el village es más pequeño, más al sur, y mejor para cenar que para una compra grande. Si te hospedas en Bávaro y necesitas ir al supermercado, no manejes hasta acá; ve a Downtown. Si quieres cenar en algún lugar agradable y caminable, vale el viaje.",
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
            {
              _type: "span",
              _key: "es-b17-s1",
              text: "La Conexión con la Conservación",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "es-b18-l1",
              href: "https://www.grandbay-puntacana.com/es/blog/local-businesses/fundacion-grupo-puntacana-center-for-sustainability",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "es-b18-s1",
              text: "Algo que vale la pena combinar con una visita al village: el ",
              marks: [],
            },
            {
              _type: "span",
              _key: "es-b18-s2",
              text: "Centro para la Sostenibilidad de la Fundación Grupo Puntacana",
              marks: ["es-b18-l1"],
            },
            {
              _type: "span",
              _key: "es-b18-s3",
              text: " está en la misma área del resort y ofrece tours para visitantes cubriendo sus viveros de coral, apiario, invernadero y operaciones de compostaje. Un tour matutino seguido de almuerzo en el village hace un día sin buceo genuinamente bueno, particularmente con niños, y es la actividad de conservación más sustantiva disponible para visitantes casuales en Punta Cana.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "h2",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b19-s1",
              text: "Notas Prácticas",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "es-b20-s1",
              text: "Los precios están en pesos dominicanos y las tarjetas se aceptan ampliamente, aunque los establecimientos más pequeños pueden añadir un recargo por tarjeta — vale la pena preguntar. Los precios de restaurante están por debajo de los niveles de resort pero esta no es una zona económica; el village atiende a una población residencial relativamente acomodada y los precios lo reflejan. Aún así es considerablemente mejor valor que comer a la carta en un hotel.",
              marks: [],
            },
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
              text: "Acuerda tu tarifa de taxi antes de salir, y coordina el regreso con anticipación para un viaje nocturno. El village es seguro y agradable para caminar después de oscurecer, lo cual no es cierto de toda parte de la zona turística. Las noches entre semana son tranquilas; los fines de semana son más animados y vale la pena reservar.",
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
              text: "Lleva una capa ligera para la noche si vas a comer afuera — no hace frío, pero una brisa marina después de un día de sol sorprende a la gente.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "En Resumen", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [
            {
              _type: "link",
              _key: "es-b24-l1",
              href: "https://www.grandbay-puntacana.com/es/contact",
            },
          ],
          children: [
            {
              _type: "span",
              _key: "es-b24-s1",
              text: "Puntacana Village es una comunidad caminable de servicios y residencial de poca altura a minutos del aeropuerto PUJ, con restaurantes, supermercado, farmacia, banco, una clínica ambulatoria de IMG, galerías de arte, Galerías Puntacana y un Four Points by Sheraton. Sus mejores usos son cenar lejos del bufet, una última tarde antes de un vuelo tarde, y combinarlo con un tour del Centro para la Sostenibilidad. No es el lugar para una compra grande de supermercado o comercio de lujo — Downtown y BlueMall cubren eso. Si estás planeando días de buceo y quieres saber qué noches estarás libre, escríbenos por ",
              marks: [],
            },
            {
              _type: "span",
              _key: "es-b24-s2",
              text: "nuestro formulario de contacto",
              marks: ["es-b24-l1"],
            },
            {
              _type: "span",
              _key: "es-b24-s3",
              text: " con tus fechas.",
              marks: [],
            },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title:
            "Puntacana Village: Shops, Restaurants & Services Near PUJ Airport",
          description:
            "A walkable low-rise village minutes from Punta Cana airport with restaurants, supermarket, pharmacy, bank, IMG outpatient clinic, art galleries, Galerías Puntacana and a Four Points by Sheraton. Best for dinner off-resort and pre-flight afternoons.",
          keywords: [
            "puntacana village",
            "punta cana village restaurants",
            "where to eat punta cana off resort",
            "galerias puntacana",
            "four points sheraton puntacana village",
            "near punta cana airport",
            "punta cana dinner",
          ],
        },
        es: {
          title:
            "Puntacana Village: Tiendas, Restaurantes y Servicios Cerca del Aeropuerto PUJ",
          description:
            "Un pueblo caminable de poca altura a minutos del aeropuerto de Punta Cana con restaurantes, supermercado, farmacia, banco, clínica ambulatoria de IMG, galerías de arte y un Four Points by Sheraton.",
          keywords: [
            "puntacana village",
            "restaurantes punta cana village",
            "donde comer punta cana fuera del resort",
            "galerias puntacana",
            "cerca aeropuerto punta cana",
          ],
        },
      },
      openGraph: {
        en: {
          title: "Puntacana Village: Shops, Restaurants & Services",
          description:
            "The closest thing Punta Cana has to a real town centre — walkable, five minutes from the airport, and where the area's residents actually eat.",
        },
        es: {
          title: "Puntacana Village: Tiendas, Restaurantes y Servicios",
          description:
            "Lo más parecido que Punta Cana tiene a un centro de pueblo real — caminable, a cinco minutos del aeropuerto, y donde realmente comen los residentes de la zona.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline:
            "Puntacana Village: Shops, Restaurants & Services Near the Airport",
          description:
            "Visitor guide to Puntacana Village, a low-rise walkable service and residential community located minutes from Punta Cana International Airport in the Punta Cana Resort area, built as the residential and service community for Grupo Puntacana housing resort, airport and local business employees. Covers location and access including 20 to 30 minutes from Bávaro, approximately five minutes from the airport, resort shuttle service for guests, and the practical value of airport proximity for late flights with midday checkouts or early arrivals before room readiness. Details the dining offering as the primary draw, with Dominican and international restaurants at non-resort prices in an open-air village square setting where local residents eat alongside visitors, with advice to check current listings and book for weekend evenings. Covers services including a supermarket, pharmacy, bank with ATMs, an outpatient medical clinic operated by Hospital IMG, professional services, art galleries, a children's playground, the Galerías Puntacana shopping centre, and the Four Points by Sheraton Puntacana Village hotel noted as a sensible option for awkward flight times. Compares the village against BlueMall Puntacana as an air-conditioned luxury mall and against the Bávaro centres San Juan Shopping Center and Downtown Punta Cana for larger grocery shopping. Notes the opportunity to combine a visit with a Fundación Grupo Puntacana Center for Sustainability tour covering coral nurseries, apiary, greenhouse and composting. Includes practical notes on peso pricing, card surcharges at smaller establishments, relative price levels, taxi arrangements, evening walkability and safety, and quieter weekday versus livelier weekend evenings.",
          datePublished: "2026-08-09",
          inLanguage: "en",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id":
              "https://www.grandbay-puntacana.com/blog/local-businesses/puntacana-village-guide",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline:
            "Puntacana Village: Tiendas, Restaurantes y Servicios Cerca del Aeropuerto",
          description:
            "Guía para visitantes de Puntacana Village, una comunidad caminable de servicios y residencial de poca altura ubicada a minutos del Aeropuerto Internacional de Punta Cana, construida como la comunidad residencial y de servicios del Grupo Puntacana. Cubre ubicación y acceso incluyendo 20 a 30 minutos desde Bávaro y aproximadamente cinco minutos desde el aeropuerto, y el valor práctico de la cercanía al aeropuerto para vuelos tardíos. Detalla la oferta gastronómica como el atractivo principal, con restaurantes dominicanos e internacionales a precios que no son de resort en un entorno de plaza al aire libre. Cubre servicios incluyendo supermercado, farmacia, banco con cajeros, una clínica ambulatoria operada por Hospital IMG, galerías de arte, Galerías Puntacana y el hotel Four Points by Sheraton. Compara el village contra BlueMall Puntacana y contra los centros de Bávaro. Nota la oportunidad de combinar una visita con un tour del Centro para la Sostenibilidad de la Fundación Grupo Puntacana.",
          datePublished: "2026-08-09",
          inLanguage: "es",
          author: { "@type": "Organization", name: "Grand Bay of the Sea" },
          publisher: {
            "@type": "Organization",
            name: "Grand Bay of the Sea",
            url: "https://www.grandbay-puntacana.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id":
              "https://www.grandbay-puntacana.com/es/blog/local-businesses/puntacana-village-guide",
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
