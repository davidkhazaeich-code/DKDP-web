// tools/realisations/record-video.mjs
//
// Courte video d'interaction pour une etude de cas (bloc `videos` d'une
// realisation) : Playwright enregistre un parcours scenarise sur le site en
// ligne, ffmpeg en tire un MP4 H.264 (lecture partout), un WebM VP9 plus
// leger et une affiche WebP.
//
//   node tools/realisations/record-video.mjs --spec tools/realisations/specs/<slug>-<nom>.json
//
// Spec JSON :
// {
//   "slug": "sos-relevage", "name": "tunnel-demande", "base": "https://sos-relevage.ch",
//   "viewport": { "width": 1280, "height": 800 },
//   "trimStart": 1.2,            // secondes coupees au debut (chargement)
//   "posterAt": 3,               // seconde de l'affiche, apres coupe
//   "block": ["**/api/demande**"],  // requetes coupees : JAMAIS d'envoi reel de formulaire
//   "actions": [
//     { "do": "goto", "url": "/" },
//     { "do": "wait", "ms": 1200 },
//     { "do": "click", "role": "button", "name": "Faire une demande" },
//     { "do": "click", "selector": "[role=dialog] input" },
//     { "do": "type", "selector": "[role=dialog] input", "text": "Rue du 31-Décembre 36", "delay": 70 }
//   ]
// }
// Les traceurs (GA4, Ads, pixels) sont toujours bloques : une video ne compte
// jamais comme une visite chez le client.
//
// Champs facultatifs (29.09.2026) : "locale" (langue et indicatif du navigateur,
// ex. "fr-CH"), "channel": "chrome" (Google Chrome installe : le Chromium de
// Playwright ne lit pas le H.264, une video MP4 du site resterait sur son affiche).
// Actions en plus : { "do": "hover", "selector": ... }, { "do": "select",
// "selector": ..., "value": ... } et { "do": "eval", "js": "..." } (script dans la
// page, ex. placer une video a une seconde precise avant le clic de lecture).
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { mkdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { blockTracking } from './block-tracking.mjs'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]])
    return acc
  }, []),
)
if (!args.spec) {
  console.error('Usage : node tools/realisations/record-video.mjs --spec <fichier.json>')
  process.exit(2)
}
const spec = JSON.parse(await readFile(args.spec, 'utf8'))
const viewport = spec.viewport ?? { width: 1280, height: 800 }
const rawDir = path.join(os.tmpdir(), `record-${spec.slug}-${Date.now()}`)
const videoDir = path.resolve(`public/videos/realisations/${spec.slug}`)
const imageDir = path.resolve(`public/images/realisations/${spec.slug}`)
await mkdir(videoDir, { recursive: true })
await mkdir(imageDir, { recursive: true })

function target(page, a) {
  if (a.role) return page.getByRole(a.role, { name: new RegExp(a.name, 'i') }).first()
  if (a.text) return page.getByText(new RegExp(a.text, 'i')).first()
  return page.locator(a.selector).first()
}

// Champ a remplir : `text` y est le texte a taper, jamais le texte a chercher
// (sinon l'action attend un element qui contient deja la saisie, 29.09.2026).
function field(page, a) {
  if (a.selector) return page.locator(a.selector).first()
  return page.getByRole(a.role ?? 'textbox', { name: new RegExp(a.name, 'i') }).first()
}

// Chrome installe, sans --window-size, enregistre une bande grise d'environ 90 px
// en bas de la video (fenetre plus petite que le viewport, mesure du 29.09.2026).
// La saisie au clavier peut aussi s'y bloquer (suggestions de saisie automatique) :
// garder le Chromium de Playwright pour filmer un formulaire.
const browser = await chromium.launch(
  spec.channel ? { channel: spec.channel, args: [`--window-size=${viewport.width},${viewport.height}`] } : {},
)
let rawPath
try {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: viewport },
    ...(spec.locale ? { locale: spec.locale } : {}),
  })
  await blockTracking(context)
  for (const pattern of spec.block ?? []) {
    await context.route(pattern, (route) => {
      console.log(`bloqué : ${route.request().method()} ${route.request().url()}`)
      return route.abort()
    })
  }
  const page = await context.newPage()
  for (const a of spec.actions) {
    if (a.do === 'goto') await page.goto(new URL(a.url, spec.base).href, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    else if (a.do === 'wait') await page.waitForTimeout(a.ms)
    else if (a.do === 'click') await target(page, a).click()
    // Fenetre ou bandeau qui n'apparait pas a chaque visite : on le ferme s'il est la.
    else if (a.do === 'clickIfVisible') {
      const el = target(page, a)
      if (await el.isVisible().catch(() => false)) await el.click().catch(() => {})
    }
    else if (a.do === 'type') await field(page, a).pressSequentially(a.text, { delay: a.delay ?? 60 })
    // Remplace le contenu d'un champ, lettre par lettre, pour que la saisie se voie.
    else if (a.do === 'retype') {
      const el = field(page, a)
      await el.click({ clickCount: 3 })
      await page.keyboard.press('Backspace')
      await el.pressSequentially(a.text, { delay: a.delay ?? 90 })
    }
    else if (a.do === 'scroll') await page.mouse.wheel(0, a.y)
    // Defilement doux jusqu'a un element, avec un decalage pour laisser respirer le haut.
    else if (a.do === 'scrollTo') {
      await page.evaluate(
        ({ selector, offset }) => {
          const el = document.querySelector(selector)
          if (!el) return
          const y = el.getBoundingClientRect().top + window.scrollY + (offset ?? -120)
          window.scrollTo({ top: y, behavior: 'smooth' })
        },
        { selector: a.selector, offset: a.offset },
      )
      await page.waitForTimeout(a.ms ?? 900)
    }
    else if (a.do === 'css') await page.addStyleTag({ content: a.content })
    else if (a.do === 'hover') await target(page, a).hover()
    else if (a.do === 'select') await target(page, a).selectOption(a.value)
    else if (a.do === 'eval') await page.evaluate(a.js)
    else throw new Error(`Action inconnue : ${a.do}`)
  }
  rawPath = await page.video().path()
  await context.close()
} finally {
  await browser.close()
}

const mp4 = path.join(videoDir, `${spec.name}.mp4`)
const webm = path.join(videoDir, `${spec.name}.webm`)
const trim = String(spec.trimStart ?? 1)
const ff = (argv) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...argv])
ff(['-ss', trim, '-i', rawPath, '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '27', '-preset', 'slow', '-movflags', '+faststart', mp4])
ff(['-ss', trim, '-i', rawPath, '-an', '-c:v', 'libvpx-vp9', '-crf', '40', '-b:v', '0', '-row-mt', '1', webm])
const posterPng = path.join(rawDir, 'poster.png')
ff(['-ss', String(spec.posterAt ?? 2), '-i', mp4, '-frames:v', '1', posterPng])
const poster = path.join(imageDir, `${spec.name}-poster.webp`)
await sharp(posterPng).webp({ quality: 82 }).toFile(poster)

const duration = Number(
  execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp4]).toString().trim(),
)
await rm(rawDir, { recursive: true, force: true })
const size = (f) => Math.round(Number(execFileSync('stat', ['-f', '%z', f]).toString()) / 1024)
console.log(`OK ${path.relative(process.cwd(), mp4)} (${size(mp4)} Ko), .webm (${size(webm)} Ko), affiche ${path.relative(process.cwd(), poster)}`)
console.log(`durée ${duration.toFixed(1)} s, ${viewport.width}x${viewport.height}`)
