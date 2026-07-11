/**
 * Submit all sitemap URLs to IndexNow (Bing / Yandex / Naver / Seznam).
 *
 * Usage: node scripts/indexnow.mjs
 *
 * Run after deploys that add or materially change pages. The key file is
 * served at https://www.grandbay-puntacana.com/<key>.txt (public/<key>.txt).
 * A 200/202 response means the batch was accepted; per-URL processing is
 * asynchronous on the search engines' side.
 */

const HOST = "www.grandbay-puntacana.com"
const KEY = "822f01f533baa17ed6fc0215b9abd9ef"
const SITEMAP = `https://${HOST}/sitemap.xml`

const xml = await (await fetch(SITEMAP)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])

if (urls.length === 0) {
  console.error("No URLs found in sitemap — aborting.")
  process.exit(1)
}

console.log(`Submitting ${urls.length} URLs from ${SITEMAP} ...`)

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
})

console.log(`IndexNow response: ${res.status} ${res.statusText}`)
if (!res.ok && res.status !== 202) {
  const body = await res.text()
  console.error(body)
  process.exit(1)
}
