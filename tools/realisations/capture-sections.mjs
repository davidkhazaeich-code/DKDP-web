#!/usr/bin/env node
/**
 * Captures de SECTIONS pour une realisation (sections phare, tunnel ouvert,
 * vues mobiles), en complement de capture.mjs qui produit les pages entieres.
 *
 * Chaque capture est une vue a la taille de l'ecran (1440x900 desktop,
 * 390x844 mobile), pas une page entiere : c'est ce qu'attendent ScreenFrame
 * et PhoneFrame. Sortie WebP q82, 1440 px de large en desktop, 780 px en
 * mobile (2x), dans public/images/realisations/<slug>/.
 *
 * Usage :
 *   node tools/realisations/capture-sections.mjs --base https://site.ch --slug mon-slug --spec shots.json
 *
 * shots.json = tableau d'entrees :
 *   { "name": "hero-desktop", "url": "/" }
 *   { "name": "hero-mobile", "url": "/", "mobile": true }
 *   { "name": "gestes", "url": "/urgence", "scroll": 950 }              // defile lentement jusqu'a 950 px
 *   { "name": "tunnel", "url": "/", "click": "button:has-text(\"Faire une demande\")", "waitFor": ".lead-modal__box" }
 *   { "name": "refs", "url": "/qui-appeler", "scrollTo": "#references-officielles", "offset": -120 }
 *
 * Le defilement est toujours lent (250 px toutes les 90 ms) : les sections
 * qui se revelent a l'intersection restent grises sur une capture prise
 * apres un saut direct.
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]])
    return acc
  }, []),
)
const { base, slug, spec } = args
if (!base || !slug || !spec) {
  console.error('Usage: --base <url> --slug <slug> --spec <shots.json>')
  process.exit(1)
}
const shots = JSON.parse(readFileSync(spec, 'utf8'))
const outDir = join(process.cwd(), 'public/images/realisations', slug)
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

async function slowScroll(page, to) {
  await page.evaluate(async (to) => {
    for (let y = 0; y <= to; y += 250) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, to)
  }, to)
  await page.waitForTimeout(700)
}

for (const s of shots) {
  const mobile = Boolean(s.mobile)
  const page = await browser.newPage({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    deviceScaleFactor: mobile ? 2 : 1.25,
    isMobile: mobile,
    hasTouch: mobile,
  })
  try {
    await page.goto(base.replace(/\/$/, '') + s.url, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(1500)
    if (s.scroll) await slowScroll(page, s.scroll)
    if (s.scrollTo) {
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 300) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 60))
        }
      })
      await page.locator(s.scrollTo).first().scrollIntoViewIfNeeded()
      if (s.offset) await page.evaluate((o) => window.scrollBy(0, o), s.offset)
    }
    if (s.click) {
      await page.locator(s.click).first().click()
      if (s.waitFor) await page.waitForSelector(s.waitFor, { timeout: 8000 })
      await page.waitForTimeout(900)
    }
    await page.waitForTimeout(600)
    const png = await page.screenshot({ type: 'png' })
    const buf = await sharp(png).resize({ width: mobile ? 780 : 1440 }).webp({ quality: 82 }).toBuffer()
    writeFileSync(join(outDir, `${s.name}.webp`), buf)
    console.log(`${s.name}.webp  ${Math.round(buf.length / 1024)} KB`)
  } catch (e) {
    console.error(`${s.name}: ${e.message.split('\n')[0]}`)
  } finally {
    await page.close()
  }
}
await browser.close()
