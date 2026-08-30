import { createClient } from "next-sanity"
const write = process.argv.includes("--write")
const c = createClient({projectId:"33b6wn5r",dataset:"production",apiVersion:"2025-11-13",
  token:process.env.SANITY_API_WRITE_TOKEN, useCdn:false, perspective:"raw"})

// Authoritative (Sanity + checkout + the already-correct whats-included post).
// $450 and $600 in the cost post are EXTERNAL market stats — never touch them.
const EN = [
  // Ranges FIRST — otherwise the single-value rules rewrite half a range and
  // the range pattern no longer matches.
  [/\$380–\$470\b/g,"$399–$499"], [/\$110–\$125\b/g,"$120–$135"],
  [/\$380\b/g,"$399"], [/\$470\b/g,"$499"], [/\$400\b/g,"$449"],
  [/\$125\b/g,"$135"], [/\$110\b/g,"$120"],
]
const DE = [
  // Ranges FIRST (see EN note above).
  [/\b380–470 USD\b/g,"399–499 USD"], [/\b110–125 USD\b/g,"120–135 USD"],
  [/\b380 USD\b/g,"399 USD"], [/\b470 USD\b/g,"499 USD"], [/\b400 USD\b/g,"449 USD"],
  [/\b125 USD\b/g,"135 USD"], [/\b110 USD\b/g,"120 USD"],
]
const SLUGS = ["how-much-does-scuba-diving-cost-punta-cana","how-to-get-padi-certified-punta-cana",
  "is-punta-cana-good-for-scuba-diving","discover-scuba-diving-vs-open-water-course"]

const apply=(s,rules)=>rules.reduce((a,[re,to])=>a.replace(re,to),s)
let changes=0
const tx=c.transaction()

const posts = await c.fetch(`*[_type=="blogPost" && slug.current in $s && !(_id in path("drafts.**"))]`,{s:SLUGS})
for (const p of posts){
  const clone=JSON.parse(JSON.stringify(p)); let touched=false
  for (const loc of ["en","es","de"]){
    const rules = loc==="de"?DE:EN
    for (const b of (clone.blogBody?.[loc]||[])){
      if(b._type!=="block") continue
      for (const ch of (b.children||[])){
        if(typeof ch.text!=="string") continue
        const next=apply(ch.text,rules)
        if(next!==ch.text){
          console.log(`  ${p.slug.current} [${loc}] ${b._key}\n    - ${ch.text.slice(0,150)}\n    + ${next.slice(0,150)}`)
          ch.text=next; touched=true; changes++
        }
      }
    }
    const m=clone.seo?.meta?.[loc]
    if(m?.description){
      const next=apply(m.description,rules)
      if(next!==m.description){console.log(`  ${p.slug.current} [${loc}] META\n    - ${m.description}\n    + ${next}`);m.description=next;touched=true;changes++}
    }
  }
  if(touched) tx.patch(p._id,{set:{blogBody:clone.blogBody, seo:clone.seo}})
}

// Catalina in the /scuba-diving-punta-cana FAQ ($240 -> $220), before it is merged into the homepage.
const sd = await c.fetch(`*[_type=="scubaDivingPuntaCana" && !(_id in path("drafts.**"))][0]`)
const sdc = JSON.parse(JSON.stringify(sd)); let sdTouched=false
for (const f of (sdc.faqs||[])) for (const loc of ["en","es","de"]) {
  const ans=f.answer?.[loc]
  if(!Array.isArray(ans)) continue
  for (const b of ans) for (const ch of (b.children||[])){
    if(typeof ch.text!=="string") continue
    const next=ch.text.replace(/\$240\b/g,"$220").replace(/\b240 USD\b/g,"220 USD")
    if(next!==ch.text){console.log(`  scubaDivingPuntaCana FAQ [${loc}]\n    - ${ch.text.slice(0,150)}\n    + ${next.slice(0,150)}`);ch.text=next;sdTouched=true;changes++}
  }
}
if(sdTouched) tx.patch(sdc._id,{set:{faqs:sdc.faqs}})

console.log(`\n${changes} change(s).`)
if(!write){console.log("Dry run. Re-run with --write.");process.exit(0)}
await tx.commit()
console.log("Committed.")
