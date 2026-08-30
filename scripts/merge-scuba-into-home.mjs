/**
 * Fold the unique content of the (noindexed, about-to-be-301'd)
 * /scuba-diving-punta-cana page into the homepage, which owns the head term.
 *
 * Only genuinely unique material moves: the "Why Divers Choose Grand Bay"
 * differentiator section, and the two FAQs the homepage does not already
 * answer (hotel transport, dive sites). Everything else is a near-duplicate of
 * copy the homepage already carries.
 */
import { createClient } from "next-sanity"
const write = process.argv.includes("--write")
const c = createClient({projectId:"33b6wn5r",dataset:"production",apiVersion:"2025-11-13",
  token:process.env.SANITY_API_WRITE_TOKEN, useCdn:false, perspective:"raw"})

const LOCALES=["en","es","de"]
const key=(p,i)=>`${p}${i}`
const txt=b=>(b.children||[]).map(ch=>ch.text).join("")

const sd  = await c.fetch(`*[_type=="scubaDivingPuntaCana" && !(_id in path("drafts.**"))][0]`)
const home= await c.fetch(`*[_type=="homePage" && !(_id in path("drafts.**"))][0]`)
const faq = await c.fetch(`*[_type=="faqs" && page=="Home" && !(_id in path("drafts.**"))][0]`)

const newHomeP3 = JSON.parse(JSON.stringify(home.paragraph3))
for (const loc of LOCALES){
  const src=(sd.paragraph3?.[loc]||[])
  // Drop the trailing CTA block: it says "use the contact form below" and is
  // specific to the page being retired.
  const keep=src.filter((b,i)=> !(i===src.length-1 && /contact form|formulario de contacto|Kontaktformular/i.test(txt(b))))
  const rekeyed=keep.map((b,i)=>({...JSON.parse(JSON.stringify(b)), _key:key("sdmerge",i)}))
  newHomeP3[loc]=[...(newHomeP3[loc]||[]), ...rekeyed]
  console.log(`[${loc}] paragraph3: ${home.paragraph3?.[loc]?.length||0} + ${rekeyed.length} = ${newHomeP3[loc].length} blocks`)
}

const WANT=[/transport/i, /dive sites are available|sitios de buceo|Tauchplätze/i]
const unique=(sd.faqs||[]).filter(f=>WANT.some(re=>re.test(f.question?.en||"")))
console.log(`\nFAQs moving (${unique.length}):`)
unique.forEach(f=>console.log("   • "+f.question.en))
const newFaqs=[...(faq.faqs||[]), ...unique.map((f,i)=>({...JSON.parse(JSON.stringify(f)),_key:key("sdfaq",i)}))]
console.log(`Home FAQs: ${faq.faqs.length} -> ${newFaqs.length}`)

if(!write){console.log("\nDry run. Re-run with --write.");process.exit(0)}
await c.transaction()
  .patch(home._id,{set:{paragraph3:newHomeP3}})
  .patch(faq._id,{set:{faqs:newFaqs}})
  .commit()
console.log("\nCommitted.")
