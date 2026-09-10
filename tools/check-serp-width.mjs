/**
 * Mesure la largeur RENDUE des <title> et <meta name="description"> de dkdp.ch
 * dans la police des resultats Google (Arial 20px pour le titre, Arial 14px
 * pour la description), et signale ce que Google couperait.
 *
 * Google coupe le titre vers 600px et la description vers 920px en desktop
 * (environ 155 a 160 caracteres). Compter les caracteres ne suffit pas :
 * 52 caracteres en majuscules sont plus larges que 60 en minuscules.
 *
 * Usage :
 *   node tools/check-serp-width.mjs                          # https://dkdp.ch, tout le sitemap
 *   node tools/check-serp-width.mjs http://localhost:3000    # build local (next start)
 *   node tools/check-serp-width.mjs https://dkdp.ch formation chatgpt   # filtre sur les URL
 *   node tools/check-serp-width.mjs https://dkdp.ch --tout   # liste tout, du plus large au plus etroit
 *
 * Meme recette que cours-informatique/site-v2/tools/check-serp-width.mjs.
 */
import { chromium } from '@playwright/test'

const args = process.argv.slice(2)
const base = (args.find((a) => a.startsWith('http')) ?? 'https://dkdp.ch').replace(/\/$/, '')
const tout = args.includes('--tout')
const filtres = args.filter((a) => !a.startsWith('http') && !a.startsWith('--'))

const TITLE_MAX_PX = 600
const DESC_MAX_PX = 920

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
let urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  .map((u) => u.replace(/^https?:\/\/[^/]+/, base))
if (filtres.length) urls = urls.filter((u) => filtres.some((f) => u.includes(f)))
if (!urls.length) { console.error('Aucune URL a mesurer'); process.exit(1) }

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')

const pages = []
for (const url of urls) {
  const html = await (await fetch(url)).text()
  const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '')
  const desc = decode(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? html.match(/<meta\s+content="([^"]*)"\s+name="description"/i)?.[1] ?? '')
  pages.push({ url: url.replace(base, '') || '/', title, desc })
}

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent('<span id="t" style="position:absolute;white-space:nowrap;font:20px Arial"></span><span id="d" style="position:absolute;white-space:nowrap;font:14px Arial"></span>')
for (const p of pages) {
  const [tw, dw] = await page.evaluate(([t, d]) => {
    const et = document.getElementById('t'); et.textContent = t
    const ed = document.getElementById('d'); ed.textContent = d
    return [Math.round(et.getBoundingClientRect().width), Math.round(ed.getBoundingClientRect().width)]
  }, [p.title, p.desc])
  p.titlePx = tw; p.descPx = dw
}
await browser.close()

const coupes = pages.filter((p) => p.titlePx > TITLE_MAX_PX)
const descCoupees = pages.filter((p) => p.descPx > DESC_MAX_PX)
const sansDesc = pages.filter((p) => !p.desc)

const ligne = (p) => `${String(p.titlePx).padStart(4)}px  ${String(p.title.length).padStart(3)} car.  ${p.url}\n        ${p.title}`

if (tout) {
  for (const p of [...pages].sort((a, b) => b.titlePx - a.titlePx)) console.log(ligne(p))
} else {
  console.log(`${pages.length} pages mesurees sur ${base}`)
  console.log(`Titres au-dela de ${TITLE_MAX_PX}px (coupes par Google) : ${coupes.length}`)
  for (const p of coupes.sort((a, b) => b.titlePx - a.titlePx)) console.log(ligne(p))
  console.log(`Descriptions au-dela de ${DESC_MAX_PX}px : ${descCoupees.length}`)
  for (const p of descCoupees) console.log(`  ${p.descPx}px  ${p.desc.length} car.  ${p.url}`)
  if (sansDesc.length) console.log(`Sans description : ${sansDesc.map((p) => p.url).join(', ')}`)
  const moy = Math.round(pages.reduce((s, p) => s + p.titlePx, 0) / pages.length)
  console.log(`Largeur moyenne des titres : ${moy}px`)
}
process.exit(coupes.length ? 1 : 0)
