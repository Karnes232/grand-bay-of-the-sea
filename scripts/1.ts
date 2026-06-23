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
      en: "🌐 The Story Behind Our Website: Meet James Karnes & DR Web Studio",
      es: "🌐 La Historia Detrás de Nuestra Web: Conoce a James Karnes y DR Web Studio",
    },

    slug: {
      _type: "slug",
      current: "dr-web-studio-punta-cana-website-design",
    },

    publishDate: "2026-06-14",

    description: {
      _type: "localizedText",
      en: "The person who built our website also runs a Punta Cana web design studio. Here's how DR Web Studio works, what they cost, and why other local businesses are quietly switching to them.",
      es: "La persona que construyó nuestra web también dirige un estudio de diseño web en Punta Cana. Aquí cómo trabaja DR Web Studio, cuánto cuesta y por qué otros negocios locales están cambiándose a ellos.",
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
            { _type: "span", _key: "en-b1-s1", text: "Every few weeks someone asks us who built our website. Usually it's another Punta Cana business owner who's noticed the booking experience works smoothly, the pages load fast on hotel WiFi, and the whole site behaves the same in English and Spanish. The honest answer is a little unusual: the person behind our site is also the person behind Grand Bay of the Sea itself. James Karnes founded our dive operation, and he also runs DR Web Studio — a small Punta Cana web design and development studio that has quietly become the go-to choice for local tourism, event, and small business websites. Since the question comes up often enough that we keep typing the same answer into WhatsApp, we figured it was time to write the longer version down.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b2-s1", text: "Two Businesses, One Founder", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b3-l1", href: "https://www.dr-webstudio.com/en/about-me" },
          ],
          children: [
            { _type: "span", _key: "en-b3-s1", text: "James started out as a diver, not a developer. The web work came later — first to fix our own outdated website, then for friends in the local tourism industry who saw what we'd done and asked if he could do the same for them. Within a couple of years he had built sites for so many Punta Cana businesses that the side project became its own studio. ", marks: [] },
            { _type: "span", _key: "en-b3-s2", text: "DR Web Studio", marks: ["en-b3-l1"] },
            { _type: "span", _key: "en-b3-s3", text: " now operates as a small team focused on modern, fast, bilingual websites for businesses in the Dominican Republic and abroad. Same founder, same hometown, same standards — applied to a completely different industry.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b4-s1", text: "We mention the connection openly because it's a credibility thing, not a marketing thing. When you read about a local business on another local business's blog, it's reasonable to ask what the relationship is. Here it's simple: the same person runs both. We hire him for our site because we know exactly how the work gets done. Other Punta Cana businesses hire him for the same reason after seeing the result on our end.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b5-s1", text: "What DR Web Studio Actually Does", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b6-l1", href: "https://www.dr-webstudio.com/en/our-services" },
          ],
          children: [
            { _type: "span", _key: "en-b6-s1", text: "The ", marks: [] },
            { _type: "span", _key: "en-b6-s2", text: "studio's service list", marks: ["en-b6-l1"] },
            { _type: "span", _key: "en-b6-s3", text: " covers most of what a Dominican small business needs to operate online: custom business websites, landing pages and one-page sites for campaigns, full e-commerce builds with payment integration, multilingual setups (English and Spanish are the default, but more languages are possible), website migrations from outdated platforms, headless CMS implementation so non-technical owners can manage their own content, API integrations for booking systems and inventory tools, and ongoing maintenance and support after launch. The studio handles design, development, deployment, and post-launch support as one team, rather than handing off between specialists who don't know your project.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b7-s1", text: "The technical stack is modern. Sites are built on Next.js (the same framework used by Netflix, TikTok, and many of the most performance-sensitive websites in the world), with Sanity as the content management system, Tailwind for styling, and standard integrations for payments, email, and analytics. This matters less for what the site looks like than for how it performs — Next.js sites typically load in under two seconds, which is fast enough that mobile travelers checking a dive shop's availability from a hotel pool aren't waiting around. Most Punta Cana tourism sites are still on WordPress or template builders that take five to ten seconds to load on the same connection.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b8-s1", text: "Why It Matters for Local Businesses", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b9-s1", text: "The honest state of Punta Cana small business websites: most of them are either nonexistent, built on free Wix or Squarespace templates that look almost identical to every other tourism site in the area, or trapped on outdated WordPress installations that nobody has updated in years. The result is that the businesses with the best service often have the weakest digital presence, while the ones that paid for a real website (or never had one and rely on Instagram) lose bookings every week to competitors with a smoother online experience.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b10-s1", text: "A travel-decision moment usually goes like this: someone in a hotel room searches \"scuba diving Punta Cana\" or \"private boat trip Bávaro,\" gets a list of options, taps the first three, and books with whichever site loaded fastest, had clearer pricing, and supported the language they read. If your site takes seven seconds to load, has no Spanish version, hides the prices behind a contact form, and looks like the same template as five other operators, you're losing that booking before the customer even reads about your service. That's the problem a properly built website actually solves — not winning awards for design, but converting search traffic into actual booked customers.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b11-s1", text: "Transparent Pricing (Yes, Really)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b12-l1", href: "https://www.dr-webstudio.com/en/pricing" },
          ],
          children: [
            { _type: "span", _key: "en-b12-s1", text: "Most web design quotes in this industry are deliberately vague until you've spent an hour on a discovery call. DR Web Studio publishes the actual numbers on ", marks: [] },
            { _type: "span", _key: "en-b12-s2", text: "the pricing page", marks: ["en-b12-l1"] },
            { _type: "span", _key: "en-b12-s3", text: ", which is unusual enough in the local market that it's worth pointing out. The three standard packages are Starter ($400) for one to three pages with basic SEO and a contact form, Business ($800) for four to eight pages with a custom design, branding, CMS integration, and advanced SEO setup, and E-commerce ($900) for full online stores with product catalogs, secure checkout, and order confirmation. Custom builds and integrations go up from there based on scope.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b13-s1", text: "Context for those numbers: comparable freelance work in the US or Western Europe typically runs $1,500 to $8,000 for a small business site, and agency work starts at $4,000 and goes up well past $15,000. The Dominican pricing isn't lower because the work is worse — it's lower because the cost of living, overhead, and operating expenses in Punta Cana are a fraction of what they are in Miami, New York, or London. A custom Next.js site that would cost $5,000 to $8,000 from a US freelancer can be built for under $1,000 here, and the technical output is the same. This is the same dynamic that makes the Dominican Republic competitive for tourism — local pricing structures meet international quality, and the gap is the savings.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b14",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b14-s1", text: "Who Else Works With Them", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b15",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b15-l1", href: "https://www.dr-webstudio.com/en/portfolio" },
          ],
          children: [
            { _type: "span", _key: "en-b15-s1", text: "We're far from the only Punta Cana business that's used DR Web Studio. ", marks: [] },
            { _type: "span", _key: "en-b15-s2", text: "The portfolio", marks: ["en-b15-l1"] },
            { _type: "span", _key: "en-b15-s3", text: " covers a fair cross-section of the local market: Sertuin Events for event production, Punta Cana Tour Store for excursion booking, Punta Cana Proposal Packages for luxury proposal planning, Punta Cana Venue Collection for wedding venues, Esencias by Nancy for boutique fragrance, Punta Cana Photo Edition for photography services, and Punta Cana Wedding Packages for full-service wedding planning. Beyond the tourism stack, there's also Fuerza del Pueblo Verón-Punta Cana, a political/civic site with a custom CMS solution. The common thread is that all of them are local Dominican operations that wanted something better than a generic template and didn't want to pay agency rates for it.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b16-s1", text: "What Our Own Site Needed", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b17-s1", text: "Since this is a Grand Bay blog post, it's fair to use our own website as the working example. Our requirements were specific: a full bilingual English/Spanish version because our customers split roughly evenly between English-speaking travelers and Spanish-speaking residents and visitors; a course catalog with PADI certifications, prices, and clear next steps; dive site profiles with photos and dive plan descriptions; trip pages for Catalina and Bayahibe excursions with day-of logistics laid out; a blog system that supports the kind of long-form SEO content you're reading right now; integration with our communication channels (WhatsApp, email); and a content management system that lets non-developers update prices, schedules, and posts without filing a ticket every time.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b18-s1", text: "The build came in under what most agencies would have quoted for a static brochure site, and the practical result is that travelers booking dives with us can find what they need, see actual prices, and reach the team on WhatsApp inside about thirty seconds. The site doesn't try to win design awards. It tries to win bookings. That's the right framework for almost every local tourism business making this decision.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b19-s1", text: "What Makes James Different to Work With", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b20-s1", text: "A few practical things that come up when local business owners describe what working with DR Web Studio is like. Communication is direct — no account managers, no project coordinators, no creative directors between you and the person actually building the site. You talk to James, he builds the thing, you review it together. Decisions happen at the speed of the conversation rather than the speed of a Monday status meeting.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b21-s1", text: "He also doesn't try to sell features you don't need. Punta Cana tourism businesses are pitched on chatbots, AI integrations, complex booking systems, membership platforms, and dozens of other add-ons by agencies that bill by the feature. The DR Web Studio approach is closer to the opposite: figure out the smallest, simplest site that actually does what the business needs, ship it fast, see what's working, and add things only when the data says they'll matter. That's not a complicated philosophy, but it's rare in this industry.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b22-s1", text: "The other practical difference is that, as a Dominican-based small business himself, he understands the realities of the market he's selling to. He knows what international tourists expect when they land here, what local customers expect when they search in Spanish, what the typical Punta Cana hotel WiFi looks like at 9pm during peak season (it's not great, which is why fast-loading sites matter so much), and how booking conversion patterns actually look in this region. An overseas freelancer building the same site can write good code but doesn't see any of that context.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b23",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b23-s1", text: "If You're a Punta Cana Business Reading This", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b24-s1", text: "A simple test for whether your current website is doing its job: open it on your phone using mobile data, not hotel WiFi. Time how long it takes to load. Try to find your prices. Try to switch to Spanish (or English, if you're a Spanish-first site). Try to send a WhatsApp message to your business through the site. If any of those steps took more than a few seconds, that's a friction point that's costing you bookings — and it's the kind of thing the studio fixes routinely.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b25",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b25-l1", href: "https://www.dr-webstudio.com/en/our-services/website-migrations-or-rebuilds" },
            { _type: "link", _key: "en-b25-l2", href: "https://www.dr-webstudio.com/en/our-services/landing-pages" },
            { _type: "link", _key: "en-b25-l3", href: "https://www.dr-webstudio.com/en/our-services/e-commerce" },
          ],
          children: [
            { _type: "span", _key: "en-b25-s1", text: "Most local businesses contacting the studio fall into one of three buckets. They have an old site that needs ", marks: [] },
            { _type: "span", _key: "en-b25-s2", text: "a full rebuild on a modern platform", marks: ["en-b25-l1"] },
            { _type: "span", _key: "en-b25-s3", text: "; they have no site at all and need ", marks: [] },
            { _type: "span", _key: "en-b25-s4", text: "a focused landing page", marks: ["en-b25-l2"] },
            { _type: "span", _key: "en-b25-s5", text: " to start with; or they're ready to sell products and services online and need ", marks: [] },
            { _type: "span", _key: "en-b25-s6", text: "a real e-commerce setup", marks: ["en-b25-l3"] },
            { _type: "span", _key: "en-b25-s7", text: " with payments, checkout, and inventory. Each path has its own scope and price, and the studio's questionnaire process narrows down which one fits before any quote gets written.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b26",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b26-s1", text: "The Bilingual Question Specifically", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b27",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b27-l1", href: "https://www.dr-webstudio.com/en/our-services/multilingual-and-international-websites" },
          ],
          children: [
            { _type: "span", _key: "en-b27-s1", text: "Anyone running a tourism business in Punta Cana eventually faces the multilingual question. The default \"solution\" most operators use is to copy their content into Google Translate and paste the result into the site, which produces Spanish that obviously wasn't written by a human and chases off Spanish-speaking customers. The proper alternative is ", marks: [] },
            { _type: "span", _key: "en-b27-s2", text: "a real multilingual setup", marks: ["en-b27-l1"] },
            { _type: "span", _key: "en-b27-s3", text: " where every piece of content has separate, native-quality versions in each language, with proper URL structures, hreflang tags for search engines, and language switching that actually works. This is what we have, and it's a significant part of why our Spanish-language search traffic converts at all. DR Web Studio builds this routinely for tourism clients because it's basically required if you want both halves of the customer base.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b28-s1", text: "What the Process Looks Like", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b29",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b29-l1", href: "https://www.dr-webstudio.com/en/project-planner" },
          ],
          children: [
            { _type: "span", _key: "en-b29-s1", text: "The starting point is ", marks: [] },
            { _type: "span", _key: "en-b29-s2", text: "a short questionnaire on the project planner page", marks: ["en-b29-l1"] },
            { _type: "span", _key: "en-b29-s3", text: " — basic questions about what kind of business you run, what you currently have online, what you'd want a new site to do, and a rough timeline. From there James reviews the answers and either sends a fixed quote (for projects that match one of the standard packages) or schedules a short call to scope a custom build. There's no high-pressure sales meeting; the questionnaire-first approach exists so both sides can decide quickly whether the project is a fit before anyone spends time on a long conversation.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b30-s1", text: "Once a project is agreed, the typical timeline is two to four weeks for a Starter or Business package, four to eight weeks for E-commerce or custom builds, and longer for projects with complex integrations or large content migrations. Payments are usually split between an upfront deposit and a launch-day balance, with payment plans available for larger custom projects.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b31",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b31-s1", text: "What Happens After Launch", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b32",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b32-l1", href: "https://www.dr-webstudio.com/en/our-services/ongoing-website-maintenance-and-support" },
          ],
          children: [
            { _type: "span", _key: "en-b32-s1", text: "Standard packages include 30 to 60 days of post-launch support, which covers fixing any bugs that surface in early traffic, small content adjustments, and answering questions from the team learning to use the CMS. After that window, ", marks: [] },
            { _type: "span", _key: "en-b32-s2", text: "ongoing maintenance and support", marks: ["en-b32-l1"] },
            { _type: "span", _key: "en-b32-s3", text: " is available as a flat monthly fee for businesses that don't want to think about updates, backups, or security patches themselves. This is also when content additions (new blog posts, new dive sites, new courses, new product pages) typically get scheduled. The maintenance arrangement is optional — plenty of clients run their own sites after launch using the CMS — but it's there for businesses that don't have anyone in-house who wants to manage that work.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx1-s1", text: "When DR Web Studio Isn't the Right Fit", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-bx2-s1", text: "A founder-story post should mention the cases where this isn't the right call, otherwise the recommendation is incomplete. If your business needs a fifteen-person enterprise team with 24/7 phone support, a dedicated account manager, and a multi-year retainer with SLAs, you want a larger agency, not a focused boutique. If you have a very rare or highly specialized technology need (industry-specific compliance work, regulated medical or financial integrations, native mobile app development from scratch), confirm fit on the discovery call before signing — sometimes the right answer is a referral elsewhere. And if your budget is genuinely zero and you just need something live next week, an honest answer is that Wix or Squarespace will get you online faster, and DR Web Studio's value shows up later when you're ready to invest in something that converts visitors into customers. The studio is most useful for the long middle — businesses past the survival-mode phase, not yet at the enterprise-procurement phase, who need their website to actually earn money rather than just exist.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b33",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b33-s1", text: "How to Get In Touch", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b34",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b34-l1", href: "https://dr-webstudio.com/" },
            { _type: "link", _key: "en-b34-l2", href: "https://www.dr-webstudio.com/en/contact" },
            { _type: "link", _key: "en-b34-l3", href: "https://www.dr-webstudio.com/en/portfolio" },
          ],
          children: [
            { _type: "span", _key: "en-b34-s1", text: "The full studio site is at ", marks: [] },
            { _type: "span", _key: "en-b34-s2", text: "dr-webstudio.com", marks: ["en-b34-l1"] },
            { _type: "span", _key: "en-b34-s3", text: " with detailed service pages, the public portfolio, and the questionnaire that starts most projects. For direct contact, ", marks: [] },
            { _type: "span", _key: "en-b34-s4", text: "the contact page", marks: ["en-b34-l2"] },
            { _type: "span", _key: "en-b34-s5", text: " has email and the standard quote form. If you'd rather see the work first, ", marks: [] },
            { _type: "span", _key: "en-b34-s6", text: "the portfolio", marks: ["en-b34-l3"] },
            { _type: "span", _key: "en-b34-s7", text: " walks through several recent Punta Cana builds with a bit of context on what each project needed.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b35",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "en-b35-s1", text: "Why We're Recommending This Openly", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "en-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "en-b36-l1", href: "https://www.grandbay-puntacana.com/sites" },
            { _type: "link", _key: "en-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "en-b36-s1", text: "Cross-promoting one of our own businesses on the other's blog isn't a marketing trick. The Punta Cana tourism economy is small enough that everyone knows everyone, and the businesses we share guides, boats, equipment, and coffee with are the same ones that need decent websites — and the ones that benefit if we collectively look more professional online. If you're a customer of ", marks: [] },
            { _type: "span", _key: "en-b36-s2", text: "the dive shop", marks: ["en-b36-l1"] },
            { _type: "span", _key: "en-b36-s3", text: " who happens to run a small business yourself, or a local operator reading this because we shared the link, this is just the longer-form version of an answer we've given dozens of times on WhatsApp. The short version, as always, is on ", marks: [] },
            { _type: "span", _key: "en-b36-s4", text: "WhatsApp", marks: ["en-b36-l2"] },
            { _type: "span", _key: "en-b36-s5", text: " — message either business and we'll point you to the right person.", marks: [] },
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
            { _type: "span", _key: "es-b1-s1", text: "Cada pocas semanas alguien nos pregunta quién construyó nuestra página web. Usualmente es otro propietario de negocio en Punta Cana que ha notado que la experiencia de reserva funciona suave, que las páginas cargan rápido en el WiFi del hotel, y que todo el sitio se comporta igual en inglés y español. La respuesta honesta es algo poco usual: la persona detrás de nuestra web también es la persona detrás de Grand Bay of the Sea. James Karnes fundó nuestra operación de buceo y también dirige DR Web Studio — un pequeño estudio de diseño y desarrollo web en Punta Cana que se ha convertido silenciosamente en la opción preferida para sitios web de turismo, eventos y pequeños negocios locales. Como la pregunta sale lo bastante seguido como para que sigamos tecleando la misma respuesta en WhatsApp, decidimos que ya era momento de escribir la versión larga.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b2",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b2-s1", text: "Dos Negocios, Un Fundador", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b3",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b3-l1", href: "https://www.dr-webstudio.com/es/about-me" },
          ],
          children: [
            { _type: "span", _key: "es-b3-s1", text: "James empezó como buzo, no como desarrollador. El trabajo web llegó después — primero para arreglar nuestra propia página desactualizada, luego para amigos de la industria turística local que vieron lo que habíamos hecho y le preguntaron si podía hacer lo mismo por ellos. En un par de años había construido sitios para tantos negocios de Punta Cana que el proyecto paralelo se volvió su propio estudio. ", marks: [] },
            { _type: "span", _key: "es-b3-s2", text: "DR Web Studio", marks: ["es-b3-l1"] },
            { _type: "span", _key: "es-b3-s3", text: " opera ahora como un equipo pequeño enfocado en sitios web modernos, rápidos y bilingües para negocios en la República Dominicana y en el exterior. Mismo fundador, misma ciudad, mismos estándares — aplicados a una industria completamente distinta.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b4",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b4-s1", text: "Mencionamos la conexión abiertamente porque es un tema de credibilidad, no de marketing. Cuando lees sobre un negocio local en el blog de otro negocio local, es razonable preguntarse cuál es la relación. Aquí es simple: la misma persona dirige ambos. Lo contratamos para nuestro sitio porque sabemos exactamente cómo se hace el trabajo. Otros negocios de Punta Cana lo contratan por la misma razón después de ver el resultado en nuestro lado.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b5",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b5-s1", text: "Qué Hace Realmente DR Web Studio", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b6",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b6-l1", href: "https://www.dr-webstudio.com/es/our-services" },
          ],
          children: [
            { _type: "span", _key: "es-b6-s1", text: "La ", marks: [] },
            { _type: "span", _key: "es-b6-s2", text: "lista de servicios del estudio", marks: ["es-b6-l1"] },
            { _type: "span", _key: "es-b6-s3", text: " cubre la mayor parte de lo que un pequeño negocio dominicano necesita para operar en línea: sitios web a medida para negocios, landing pages y sitios de una sola página para campañas, e-commerce completo con integración de pagos, configuraciones multilingües (inglés y español por defecto, con la opción de más idiomas), migraciones de plataformas anticuadas, implementación de CMS headless para que dueños no técnicos puedan gestionar su propio contenido, integraciones de API para sistemas de reservas e inventario, y mantenimiento continuo y soporte después del lanzamiento. El estudio maneja diseño, desarrollo, despliegue y soporte como un solo equipo, en lugar de pasar el proyecto entre especialistas que no conocen tu proyecto.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b7",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b7-s1", text: "El stack técnico es moderno. Los sitios se construyen en Next.js (el mismo framework que usan Netflix, TikTok y muchas de las webs más exigentes en rendimiento del mundo), con Sanity como sistema de gestión de contenido, Tailwind para estilos e integraciones estándar para pagos, correo y analítica. Esto importa menos por cómo se ve el sitio y más por cómo rinde — los sitios en Next.js normalmente cargan en menos de dos segundos, lo bastante rápido para que un viajero móvil que revisa la disponibilidad de un centro de buceo desde la piscina del hotel no se quede esperando. La mayoría de los sitios turísticos de Punta Cana siguen en WordPress o constructores tipo plantilla que tardan de cinco a diez segundos en cargar en la misma conexión.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b8",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b8-s1", text: "Por Qué Importa para los Negocios Locales", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b9",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b9-s1", text: "El estado real de los sitios web de pequeños negocios en Punta Cana: la mayoría son inexistentes, están en plantillas gratuitas de Wix o Squarespace que se ven casi idénticas a cualquier otro sitio turístico de la zona, o están atrapados en instalaciones viejas de WordPress que nadie ha actualizado en años. El resultado es que los negocios con el mejor servicio a menudo tienen la presencia digital más débil, mientras que los que pagaron por una web real (o que nunca tuvieron una y dependen de Instagram) pierden reservas cada semana frente a competidores con una experiencia en línea más fluida.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b10",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b10-s1", text: "Un momento típico de decisión de viaje funciona así: alguien en la habitación de un hotel busca \"buceo Punta Cana\" o \"paseo privado en bote Bávaro\", obtiene una lista de opciones, abre las primeras tres y reserva con aquella cuyo sitio cargó más rápido, mostró precios claros y soportaba el idioma en el que lee. Si tu sitio tarda siete segundos en cargar, no tiene versión en español, esconde los precios detrás de un formulario de contacto y se ve como la misma plantilla que otros cinco operadores, pierdes esa reserva antes de que el cliente siquiera lea sobre tu servicio. Ese es el problema que una web bien hecha realmente resuelve — no ganar premios de diseño, sino convertir el tráfico de búsqueda en clientes reales que reservan.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b11",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b11-s1", text: "Precios Transparentes (En Serio)", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b12",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b12-l1", href: "https://www.dr-webstudio.com/es/pricing" },
          ],
          children: [
            { _type: "span", _key: "es-b12-s1", text: "La mayoría de las cotizaciones de diseño web en esta industria son deliberadamente vagas hasta que has pasado una hora en una llamada de descubrimiento. DR Web Studio publica los números reales en ", marks: [] },
            { _type: "span", _key: "es-b12-s2", text: "la página de precios", marks: ["es-b12-l1"] },
            { _type: "span", _key: "es-b12-s3", text: ", lo cual es lo bastante inusual en el mercado local como para que valga la pena señalarlo. Los tres paquetes estándar son Starter ($400) para una a tres páginas con SEO básico y formulario de contacto, Business ($800) para cuatro a ocho páginas con diseño a medida, branding, integración de CMS y SEO avanzado, y E-commerce ($900) para tiendas online completas con catálogo de productos, checkout seguro y confirmaciones de pedido. Los proyectos a medida e integraciones suben desde ahí según el alcance.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b13",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b13-s1", text: "Contexto para esos números: el trabajo freelance equivalente en Estados Unidos o Europa Occidental cuesta típicamente entre $1.500 y $8.000 por un sitio de pequeño negocio, y el trabajo de agencia parte de $4.000 y supera fácilmente los $15.000. El precio dominicano no es más bajo porque el trabajo sea peor — es más bajo porque el costo de vida, la sobrecarga y los gastos operativos en Punta Cana son una fracción de lo que son en Miami, Nueva York o Londres. Un sitio en Next.js a medida que costaría entre $5.000 y $8.000 con un freelance estadounidense se puede construir aquí por menos de $1.000, y el resultado técnico es el mismo. Es la misma dinámica que hace competitiva a la República Dominicana para el turismo — estructura de precios local con calidad internacional, y la diferencia es el ahorro.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b14",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b14-s1", text: "Quién Más Trabaja Con Ellos", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b15",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b15-l1", href: "https://www.dr-webstudio.com/es/portfolio" },
          ],
          children: [
            { _type: "span", _key: "es-b15-s1", text: "Estamos lejos de ser el único negocio de Punta Cana que ha trabajado con DR Web Studio. ", marks: [] },
            { _type: "span", _key: "es-b15-s2", text: "El portafolio", marks: ["es-b15-l1"] },
            { _type: "span", _key: "es-b15-s3", text: " cubre una buena muestra del mercado local: Sertuin Events para producción de eventos, Punta Cana Tour Store para reservas de excursiones, Punta Cana Proposal Packages para propuestas matrimoniales de lujo, Punta Cana Venue Collection para venues de boda, Esencias by Nancy para fragancias boutique, Punta Cana Photo Edition para servicios de fotografía y Punta Cana Wedding Packages para planificación integral de bodas. Más allá del stack turístico también está Fuerza del Pueblo Verón-Punta Cana, un sitio político/cívico con solución CMS a medida. El hilo común es que todos son operaciones dominicanas locales que querían algo mejor que una plantilla genérica y que no querían pagar tarifas de agencia.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b16",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b16-s1", text: "Lo Que Nuestro Sitio Necesitaba", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b17",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b17-s1", text: "Ya que esta es una publicación del blog de Grand Bay, es justo usar nuestro propio sitio como ejemplo de trabajo. Nuestros requisitos eran específicos: una versión completamente bilingüe en inglés/español porque nuestros clientes se dividen casi por igual entre viajeros angloparlantes y residentes y visitantes hispanohablantes; un catálogo de cursos con certificaciones PADI, precios y siguientes pasos claros; perfiles de sitios de buceo con fotos y descripciones del plan de inmersión; páginas de excursiones a Catalina y Bayahibe con la logística del día explicada; un sistema de blog que soporte el tipo de contenido SEO de formato largo como el que estás leyendo; integración con nuestros canales de comunicación (WhatsApp, correo); y un sistema de gestión de contenido que permita a personas no desarrolladoras actualizar precios, horarios y publicaciones sin tener que abrir un ticket cada vez.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b18",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b18-s1", text: "El proyecto se completó por debajo de lo que la mayoría de las agencias habrían cotizado por un sitio estático tipo folleto, y el resultado práctico es que los viajeros que reservan inmersiones con nosotros pueden encontrar lo que necesitan, ver precios reales y comunicarse con el equipo por WhatsApp en unos treinta segundos. El sitio no busca ganar premios de diseño. Busca ganar reservas. Ese es el marco correcto para casi todo negocio local de turismo que toma esta decisión.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b19",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b19-s1", text: "Qué Hace Distinto a James para Trabajar Con Él", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b20",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b20-s1", text: "Algunas cosas prácticas que salen cuando los dueños de negocios locales describen cómo es trabajar con DR Web Studio. La comunicación es directa — sin account managers, sin coordinadores de proyecto, sin directores creativos entre tú y la persona que realmente construye el sitio. Hablas con James, él construye la cosa, lo revisan juntos. Las decisiones ocurren a la velocidad de la conversación, no a la velocidad de una reunión de estatus de los lunes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b21",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b21-s1", text: "Tampoco intenta venderte funcionalidades que no necesitas. A los negocios turísticos de Punta Cana les ofrecen chatbots, integraciones de IA, sistemas complejos de reservas, plataformas de membresía y docenas de extras más por parte de agencias que facturan por funcionalidad. El enfoque de DR Web Studio es más bien lo opuesto: descubrir el sitio más pequeño y simple que realmente haga lo que el negocio necesita, lanzarlo rápido, ver qué funciona y agregar cosas solo cuando los datos digan que importarán. No es una filosofía complicada, pero es rara en esta industria.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b22",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b22-s1", text: "La otra diferencia práctica es que, al ser él mismo dueño de un pequeño negocio en República Dominicana, entiende las realidades del mercado al que le vende. Sabe qué esperan los turistas internacionales cuando aterrizan aquí, qué esperan los clientes locales cuando buscan en español, cómo se ve el WiFi típico de un hotel de Punta Cana a las 9pm en temporada alta (no muy bien, por eso importan tanto los sitios que cargan rápido) y cómo lucen realmente los patrones de conversión de reservas en esta región. Un freelancer en el extranjero construyendo el mismo sitio puede escribir buen código pero no ve nada de ese contexto.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b23",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b23-s1", text: "Si Eres un Negocio de Punta Cana Leyendo Esto", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b24",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b24-s1", text: "Una prueba simple para saber si tu sitio actual está haciendo su trabajo: ábrelo en tu celular usando datos móviles, no WiFi de hotel. Cronometra cuánto tarda en cargar. Intenta encontrar tus precios. Intenta cambiar a español (o a inglés, si tu sitio es español-primero). Intenta enviar un mensaje de WhatsApp a tu negocio a través del sitio. Si cualquiera de esos pasos tomó más de unos segundos, ese es un punto de fricción que te está costando reservas — y es exactamente el tipo de cosa que el estudio arregla de forma rutinaria.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b25",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b25-l1", href: "https://www.dr-webstudio.com/es/our-services/website-migrations-or-rebuilds" },
            { _type: "link", _key: "es-b25-l2", href: "https://www.dr-webstudio.com/es/our-services/landing-pages" },
            { _type: "link", _key: "es-b25-l3", href: "https://www.dr-webstudio.com/es/our-services/e-commerce" },
          ],
          children: [
            { _type: "span", _key: "es-b25-s1", text: "La mayoría de los negocios locales que contactan al estudio caen en uno de tres grupos. Tienen un sitio viejo que necesita ", marks: [] },
            { _type: "span", _key: "es-b25-s2", text: "una reconstrucción completa en una plataforma moderna", marks: ["es-b25-l1"] },
            { _type: "span", _key: "es-b25-s3", text: "; no tienen sitio en absoluto y necesitan ", marks: [] },
            { _type: "span", _key: "es-b25-s4", text: "una landing page enfocada", marks: ["es-b25-l2"] },
            { _type: "span", _key: "es-b25-s5", text: " para empezar; o están listos para vender productos y servicios en línea y necesitan ", marks: [] },
            { _type: "span", _key: "es-b25-s6", text: "una configuración de e-commerce real", marks: ["es-b25-l3"] },
            { _type: "span", _key: "es-b25-s7", text: " con pagos, checkout e inventario. Cada ruta tiene su propio alcance y precio, y el cuestionario del estudio acota cuál encaja antes de que se escriba cualquier cotización.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b26",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b26-s1", text: "El Tema Bilingüe Específicamente", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b27",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b27-l1", href: "https://www.dr-webstudio.com/es/our-services/multilingual-and-international-websites" },
          ],
          children: [
            { _type: "span", _key: "es-b27-s1", text: "Cualquiera que opere un negocio turístico en Punta Cana eventualmente enfrenta la cuestión multilingüe. La \"solución\" por defecto que usan la mayoría de los operadores es copiar su contenido en Google Translate y pegar el resultado en el sitio, lo que produce un español que evidentemente no fue escrito por un humano y espanta a los clientes hispanohablantes. La alternativa correcta es ", marks: [] },
            { _type: "span", _key: "es-b27-s2", text: "una configuración multilingüe real", marks: ["es-b27-l1"] },
            { _type: "span", _key: "es-b27-s3", text: " donde cada pieza de contenido tiene versiones separadas, de calidad nativa en cada idioma, con estructuras de URL apropiadas, etiquetas hreflang para los motores de búsqueda y un cambio de idioma que realmente funciona. Esto es lo que tenemos, y es parte significativa de por qué nuestro tráfico de búsqueda en español convierte. DR Web Studio construye esto rutinariamente para clientes turísticos porque básicamente es requisito si quieres ambas mitades de la base de clientes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b28",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b28-s1", text: "Cómo es el Proceso", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b29",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b29-l1", href: "https://www.dr-webstudio.com/es/project-planner" },
          ],
          children: [
            { _type: "span", _key: "es-b29-s1", text: "El punto de partida es ", marks: [] },
            { _type: "span", _key: "es-b29-s2", text: "un cuestionario corto en la página de planificación de proyecto", marks: ["es-b29-l1"] },
            { _type: "span", _key: "es-b29-s3", text: " — preguntas básicas sobre qué tipo de negocio operas, qué tienes en línea actualmente, qué querrías que hiciera un sitio nuevo y un calendario aproximado. Desde ahí James revisa las respuestas y envía una cotización fija (para proyectos que encajan en uno de los paquetes estándar) o agenda una llamada corta para definir un proyecto a medida. No hay una reunión de ventas con alta presión; el enfoque cuestionario-primero existe para que ambos lados puedan decidir rápido si el proyecto encaja antes de que nadie invierta tiempo en una conversación larga.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b30",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b30-s1", text: "Una vez acordado el proyecto, el tiempo típico es de dos a cuatro semanas para un paquete Starter o Business, cuatro a ocho semanas para E-commerce o builds a medida, y más para proyectos con integraciones complejas o migraciones grandes de contenido. Los pagos normalmente se dividen entre un depósito inicial y un saldo de día de lanzamiento, con planes de pago disponibles para proyectos a medida más grandes.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b31",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b31-s1", text: "Qué Pasa Después del Lanzamiento", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b32",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b32-l1", href: "https://www.dr-webstudio.com/es/our-services/ongoing-website-maintenance-and-support" },
          ],
          children: [
            { _type: "span", _key: "es-b32-s1", text: "Los paquetes estándar incluyen 30 a 60 días de soporte post-lanzamiento, lo que cubre arreglar cualquier bug que aparezca con el tráfico inicial, pequeños ajustes de contenido y responder preguntas del equipo aprendiendo a usar el CMS. Después de esa ventana, ", marks: [] },
            { _type: "span", _key: "es-b32-s2", text: "el mantenimiento y soporte continuo", marks: ["es-b32-l1"] },
            { _type: "span", _key: "es-b32-s3", text: " está disponible como una cuota mensual fija para negocios que no quieren pensar en actualizaciones, respaldos ni parches de seguridad por su cuenta. También es cuando se suelen programar las adiciones de contenido (nuevas publicaciones de blog, nuevos sitios de buceo, nuevos cursos, nuevas páginas de producto). El arreglo de mantenimiento es opcional — varios clientes operan sus sitios después del lanzamiento usando el CMS — pero está ahí para negocios que no tienen a alguien internamente que quiera manejar ese trabajo.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx1",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx1-s1", text: "Cuándo DR Web Studio No es la Opción Correcta", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-bx2",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-bx2-s1", text: "Una historia de fundador debería mencionar los casos donde esta no es la decisión correcta, si no la recomendación queda incompleta. Si tu negocio necesita un equipo empresarial de quince personas con soporte telefónico 24/7, un account manager dedicado y un contrato plurianual con SLAs, lo que quieres es una agencia más grande, no una boutique enfocada. Si tienes una necesidad tecnológica muy rara o muy especializada (cumplimiento normativo específico de industria, integraciones médicas o financieras reguladas, desarrollo nativo de app móvil desde cero), confirma el encaje en la llamada de descubrimiento antes de firmar — a veces la respuesta correcta es derivarte a otro lado. Y si tu presupuesto es genuinamente cero y solo necesitas algo en línea la semana entrante, la respuesta honesta es que Wix o Squarespace te ponen en línea más rápido, y el valor de DR Web Studio aparece después, cuando estás listo para invertir en algo que convierta visitantes en clientes. El estudio es más útil para el largo medio — negocios pasada la fase de supervivencia, todavía no en la fase de procurement empresarial, que necesitan que su sitio realmente genere dinero en lugar de simplemente existir.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b33",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b33-s1", text: "Cómo Contactarlos", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b34",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b34-l1", href: "https://dr-webstudio.com/" },
            { _type: "link", _key: "es-b34-l2", href: "https://www.dr-webstudio.com/es/contact" },
            { _type: "link", _key: "es-b34-l3", href: "https://www.dr-webstudio.com/es/portfolio" },
          ],
          children: [
            { _type: "span", _key: "es-b34-s1", text: "El sitio completo del estudio está en ", marks: [] },
            { _type: "span", _key: "es-b34-s2", text: "dr-webstudio.com", marks: ["es-b34-l1"] },
            { _type: "span", _key: "es-b34-s3", text: " con páginas detalladas de servicios, el portafolio público y el cuestionario con el que arrancan la mayoría de los proyectos. Para contacto directo, ", marks: [] },
            { _type: "span", _key: "es-b34-s4", text: "la página de contacto", marks: ["es-b34-l2"] },
            { _type: "span", _key: "es-b34-s5", text: " tiene correo y el formulario estándar de cotización. Si prefieres ver el trabajo primero, ", marks: [] },
            { _type: "span", _key: "es-b34-s6", text: "el portafolio", marks: ["es-b34-l3"] },
            { _type: "span", _key: "es-b34-s7", text: " recorre varios proyectos recientes de Punta Cana con un poco de contexto sobre lo que cada uno necesitaba.", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b35",
          style: "h2",
          markDefs: [],
          children: [
            { _type: "span", _key: "es-b35-s1", text: "Por Qué Lo Recomendamos Abiertamente", marks: [] },
          ],
        },
        {
          _type: "block",
          _key: "es-b36",
          style: "normal",
          markDefs: [
            { _type: "link", _key: "es-b36-l1", href: "https://www.grandbay-puntacana.com/es/sites" },
            { _type: "link", _key: "es-b36-l2", href: "https://wa.me/18297239338" },
          ],
          children: [
            { _type: "span", _key: "es-b36-s1", text: "Promover uno de nuestros propios negocios en el blog del otro no es un truco de marketing. La economía turística de Punta Cana es lo bastante pequeña como para que todos se conozcan, y los negocios con los que compartimos guías, botes, equipo y café son los mismos que necesitan webs decentes — y los que se benefician si colectivamente nos vemos más profesionales en línea. Si eres un cliente del ", marks: [] },
            { _type: "span", _key: "es-b36-s2", text: "centro de buceo", marks: ["es-b36-l1"] },
            { _type: "span", _key: "es-b36-s3", text: " que además dirige un pequeño negocio, o un operador local leyendo esto porque te compartimos el enlace, esta es simplemente la versión larga de una respuesta que hemos dado decenas de veces por WhatsApp. La versión corta, como siempre, está en ", marks: [] },
            { _type: "span", _key: "es-b36-s4", text: "WhatsApp", marks: ["es-b36-l2"] },
            { _type: "span", _key: "es-b36-s5", text: " — escribe a cualquiera de los dos negocios y te apuntamos a la persona correcta.", marks: [] },
          ],
        },
      ],
    },

    seo: {
      _type: "seo",
      meta: {
        en: {
          title: "Meet DR Web Studio: The Punta Cana Team Behind Our Website (2026)",
          description:
            "DR Web Studio is the local Punta Cana web design studio that built our site — founded by James Karnes, who also runs Grand Bay. Modern, fast, bilingual websites with transparent pricing.",
          keywords: ["dr web studio", "punta cana web design", "dominican republic web developer", "small business website punta cana", "james karnes", "tourism website dominican republic"],
        },
        es: {
          title: "Conoce a DR Web Studio: El Equipo Detrás de Nuestra Web (2026)",
          description:
            "DR Web Studio es el estudio local de diseño web de Punta Cana que construyó nuestro sitio — fundado por James Karnes, quien también dirige Grand Bay. Webs modernas, rápidas y bilingües con precios transparentes.",
          keywords: ["dr web studio", "diseño web punta cana", "desarrollo web republica dominicana", "pagina web pequeño negocio punta cana", "james karnes", "web turismo republica dominicana"],
        },
      },
      openGraph: {
        en: {
          title: "Meet DR Web Studio: The Punta Cana Team Behind Our Website",
          description: "The person who built our website also runs a Punta Cana web design studio. Here's the founder story, what they cost, and why local businesses are switching.",
        },
        es: {
          title: "Conoce a DR Web Studio: El Equipo Detrás de Nuestra Web",
          description: "La persona que construyó nuestra web también dirige un estudio de diseño web en Punta Cana. Aquí la historia del fundador, los precios y por qué los negocios locales están cambiando.",
        },
      },
      structuredData: {
        en: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "The Story Behind Our Website: Meet James Karnes & DR Web Studio",
          description: "A founder-story profile of DR Web Studio, the Punta Cana web design and development studio that built the Grand Bay of the Sea website. Covers the founder background, services offered, transparent pricing ($400 Starter, $800 Business, $900 E-commerce), client list across local tourism and event businesses, why DR pricing is lower than US/EU equivalents, the process from questionnaire to launch, and the broader case for why local Punta Cana businesses benefit from a properly built website.",
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
            "@id": "https://www.grandbay-puntacana.com/blog/local-businesses/dr-web-studio-punta-cana-website-design",
          },
        }),
        es: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "La Historia Detrás de Nuestra Web: Conoce a James Karnes y DR Web Studio",
          description: "Un perfil tipo historia de fundador sobre DR Web Studio, el estudio de diseño y desarrollo web de Punta Cana que construyó la página de Grand Bay of the Sea. Cubre la trayectoria del fundador, los servicios ofrecidos, los precios transparentes ($400 Starter, $800 Business, $900 E-commerce), la lista de clientes entre negocios locales de turismo y eventos, por qué el precio dominicano es menor que el equivalente en EE. UU. o la UE, el proceso desde el cuestionario hasta el lanzamiento, y el argumento más amplio de por qué los negocios locales de Punta Cana se benefician de una web bien construida.",
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
            "@id": "https://www.grandbay-puntacana.com/es/blog/local-businesses/dr-web-studio-punta-cana-website-design",
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