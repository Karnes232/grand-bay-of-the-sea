/**
 * Keep the Home FAQPage JSON-LD in step with the visible FAQ list.
 *
 * FaqAccordion renders every entry in `faqs[]` but emits its JSON-LD from the
 * separately stored `structuredData` string, so adding a FAQ in Studio silently
 * desynchronises the two. This appends any visible FAQ missing from the schema.
 */
import { createClient } from "next-sanity"
const write=process.argv.includes("--write")
const c=createClient({projectId:"33b6wn5r",dataset:"production",apiVersion:"2025-11-13",
  token:process.env.SANITY_API_WRITE_TOKEN,useCdn:false,perspective:"raw"})
const txt=a=>Array.isArray(a)?a.filter(b=>b._type==="block").map(b=>(b.children||[]).map(ch=>ch.text).join("")).join(" ").trim():String(a||"")

const doc=await c.fetch(`*[_type=="faqs" && page=="Home" && !(_id in path("drafts.**"))][0]`)
const sd=JSON.parse(JSON.stringify(doc.structuredData))
let changed=false
for (const loc of ["en","es","de"]){
  const parsed=JSON.parse(sd[loc])
  const have=new Set((parsed.mainEntity||[]).map(q=>q.name))
  let added=0
  for (const f of doc.faqs){
    const q=f.question?.[loc]; const a=txt(f.answer?.[loc])
    if(!q||!a||have.has(q)) continue
    parsed.mainEntity.push({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}})
    added++; console.log(`  [${loc}] + ${q}`)
  }
  if(added){sd[loc]=JSON.stringify(parsed,null,2);changed=true}
  console.log(`  [${loc}] mainEntity ${have.size} -> ${parsed.mainEntity.length}`)
}
if(!changed){console.log("already in sync");process.exit(0)}
if(!write){console.log("\nDry run. Re-run with --write.");process.exit(0)}
await c.patch(doc._id).set({structuredData:sd}).commit()
console.log("\nCommitted.")
