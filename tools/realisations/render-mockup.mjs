// tools/realisations/render-mockup.mjs
//
// Mockups d'une etude de cas a partir de VRAIES captures : ordinateur + telephone,
// ou pages de document en eventail, dans la charte sombre de dkdp.ch. Jamais
// d'ecran invente : le mockup ne fait que cadrer une capture reelle.
//
//   node tools/realisations/render-mockup.mjs --spec tools/realisations/specs/<slug>-mockup.json
//
// Spec JSON :
// {
//   "slug": "sos-relevage",
//   "outputs": [
//     { "name": "mockup-hero", "layout": "laptop-phone", "width": 1600, "height": 1000,
//       "desktop": "public/images/realisations/sos-relevage/hero-desktop.webp",
//       "mobile": "public/images/realisations/sos-relevage/hero-mobile.webp",
//       "url": "sos-relevage.ch" },
//     { "name": "rapport-mockup", "layout": "documents", "width": 1600, "height": 1000,
//       "pages": ["chemin/page-1.png", "chemin/page-2.png"] },
//     { "name": "supports-mockup", "layout": "slides", "width": 1600, "height": 1000,
//       "slides": ["chemin/slide-devant.webp", "chemin/slide-derriere.webp"] }
//   ]
// }
// Layouts : laptop-phone, laptop, documents (pages A4 en eventail), slides (slides 16:9
// en pile, la premiere devant). Sortie : public/images/realisations/<slug>/<name>.webp
// (et <name>-og.png si "og": true, recadre en 1200x630).
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir, readFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]])
    return acc
  }, []),
)
if (!args.spec) {
  console.error('Usage : node tools/realisations/render-mockup.mjs --spec <fichier.json>')
  process.exit(2)
}
const spec = JSON.parse(await readFile(args.spec, 'utf8'))
// Data URI : une page creee par setContent n'a pas le droit de lire des fichiers file://.
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }
const src = (p) => `data:${MIME[path.extname(p).toLowerCase()] ?? 'image/png'};base64,${readFileSync(path.resolve(p)).toString('base64')}`
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; }
  body { background: #0A0A0A; overflow: hidden; font-family: Inter, -apple-system, 'Helvetica Neue', Arial, sans-serif; }
  .stage { position: relative; width: 100%; height: 100%; }
  .glow { position: absolute; inset: 0; background:
    radial-gradient(55% 60% at 30% 20%, rgba(124,58,237,0.30), transparent 70%),
    radial-gradient(45% 50% at 85% 90%, rgba(167,139,250,0.16), transparent 70%); }
  .grid { position: absolute; inset: 0; opacity: .06;
    background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px);
    background-size: 56px 56px; }
  img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }
  /* Ordinateur : ecran 16:10, cadre fin, socle */
  .laptop { position: absolute; }
  .laptop .lid { position: relative; background: #151515; border: 1px solid #2c2c2c; border-radius: 22px; padding: 16px 16px 20px;
    box-shadow: 0 40px 120px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.06); }
  .laptop .bar { height: 30px; display: flex; align-items: center; gap: 8px; padding: 0 12px; background: #1d1d1d; border-radius: 10px 10px 0 0; border-bottom: 1px solid #2a2a2a; }
  .laptop .bar i { width: 10px; height: 10px; border-radius: 50%; background: #3a3a3a; }
  .laptop .bar span { margin-left: 14px; font: 500 13px/1 ui-monospace, 'SF Mono', Menlo, monospace; color: #8b8b8b; }
  .laptop .screen { overflow: hidden; border-radius: 0 0 10px 10px; aspect-ratio: 16 / 10; background: #fff; }
  .laptop .base { height: 22px; margin: 0 -7%; background: linear-gradient(#262626, #161616); border-radius: 0 0 26px 26px; border: 1px solid #2c2c2c; border-top: none; }
  .laptop .base::before { content: ''; display: block; width: 16%; height: 6px; margin: 0 auto; background: #0f0f0f; border-radius: 0 0 10px 10px; }
  /* Telephone */
  .phone { position: absolute; background: #121212; border: 1px solid #2f2f2f; border-radius: 52px; padding: 12px;
    box-shadow: 0 40px 100px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08); }
  .phone .screen { position: relative; overflow: hidden; border-radius: 42px; aspect-ratio: 390 / 844; background: #fff; }
  .phone .island { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 30%; height: 26px; border-radius: 20px; background: #0b0b0b; z-index: 2; }
  /* Documents en eventail */
  .page { position: absolute; background: #fff; border-radius: 6px; overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,.55), 0 2px 0 rgba(255,255,255,.04); }
  .page img { object-fit: contain; object-position: top center; background: #fff; }
  /* Slides 16:9 en pile */
  .slide { position: absolute; border-radius: 14px; overflow: hidden; background: #111;
    border: 1px solid rgba(255,255,255,.08); box-shadow: 0 40px 110px rgba(0,0,0,.6), 0 2px 0 rgba(255,255,255,.04); }
`

function htmlFor(o) {
  const { width: W, height: H } = o
  let body = ''
  if (o.layout === 'laptop-phone' || o.layout === 'laptop') {
    const withPhone = o.layout === 'laptop-phone' && o.mobile
    const lw = withPhone ? W * 0.72 : W * 0.8
    const left = withPhone ? W * 0.07 : (W - lw) / 2
    const top = H * 0.08
    body += `<div class="laptop" style="left:${left}px;top:${top}px;width:${lw}px">
      <div class="lid"><div class="bar"><i></i><i></i><i></i><span>${esc(o.url)}</span></div>
      <div class="screen"><img src="${src(o.desktop)}" alt=""></div></div><div class="base"></div></div>`
    if (withPhone) {
      const pw = W * 0.2
      body += `<div class="phone" style="right:${W * 0.07}px;bottom:${H * 0.06}px;width:${pw}px">
        <div class="screen"><span class="island"></span><img src="${src(o.mobile)}" alt=""></div></div>`
    }
  } else if (o.layout === 'documents') {
    const pages = o.pages ?? []
    const pw = Math.min(W * 0.34, (H * 0.84) / 1.414)
    pages.forEach((p, i) => {
      const rot = pages.length === 1 ? 0 : i === 0 ? -5 : 4
      const x = W / 2 - pw / 2 + (pages.length === 1 ? 0 : (i === 0 ? -pw * 0.42 : pw * 0.42))
      const y = H * 0.08 + (i === 0 ? 0 : H * 0.03)
      body += `<div class="page" style="left:${x}px;top:${y}px;width:${pw}px;height:${pw * 1.414}px;transform:rotate(${rot}deg);z-index:${i + 1}">
        <img src="${src(p)}" alt=""></div>`
    })
  } else if (o.layout === 'slides') {
    const slides = o.slides ?? []
    const sw = W * 0.62
    const sh = (sw * 9) / 16
    // La premiere slide devant, en bas a droite ; les suivantes derriere, decalees.
    const spots = [
      { x: W * 0.28, y: H * 0.31, rot: 2.2, z: 3 },
      { x: W * 0.08, y: H * 0.09, rot: -3.8, z: 2 },
      { x: W * 0.4, y: H * 0.05, rot: 4.5, z: 1 },
    ]
    slides.slice(0, spots.length).forEach((p, i) => {
      const { x, y, rot, z } = spots[i]
      body += `<div class="slide" style="left:${x}px;top:${y}px;width:${sw}px;height:${sh}px;transform:rotate(${rot}deg);z-index:${z}">
        <img src="${src(p)}" alt=""></div>`
    })
  } else {
    throw new Error(`Layout inconnu : ${o.layout}`)
  }
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head>
  <body style="width:${W}px;height:${H}px"><div class="stage"><div class="glow"></div><div class="grid"></div>${body}</div></body></html>`
}

const outDir = path.resolve(`public/images/realisations/${spec.slug}`)
await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
try {
  for (const o of spec.outputs) {
    const page = await browser.newPage({ viewport: { width: o.width, height: o.height }, deviceScaleFactor: 2 })
    await page.setContent(htmlFor(o), { waitUntil: 'load' })
    await page.waitForTimeout(300)
    const png = await page.screenshot({ type: 'png' })
    await sharp(png).resize({ width: o.width }).webp({ quality: 84 }).toFile(path.join(outDir, `${o.name}.webp`))
    if (o.og) {
      await sharp(png).resize(1200, 630, { fit: 'cover', position: 'center' }).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${o.name}-og.png`))
    }
    console.log(`OK ${spec.slug}/${o.name}.webp${o.og ? ' + og' : ''}`)
    await page.close()
  }
} finally {
  await browser.close()
}
