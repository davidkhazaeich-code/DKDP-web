#!/usr/bin/env node
/**
 * Captures haute definition pour les images de presentation des etudes de cas
 * (2026-09-30) : les ecrans qu'on incruste ensuite dans une scene generee
 * (workflows/image-presentation-realisation.md du DEV SPACE).
 *
 * A la difference de capture-sections.mjs (WebP pour le site), la sortie est
 * un PNG sans perte, au format de l'ecran d'arrivee :
 *   - ordinateur : 1512 x 950 en 2x (MacBook Pro 14, sous la bande de l'encoche) ;
 *   - telephone : 393 x 798 en 3x (iPhone, sous la barre d'etat de 54 pt que
 *     l'outil d'incrustation dessine avec l'heure et les icones).
 *
 * Usage :
 *   node tools/realisations/capture-hd.mjs --spec shots.json --out /chemin/dossier [--only nom1,nom2]
 *
 * shots.json :
 *   { "base": "https://site.ch", "css": ".ti-widget{display:none!important}",
 *     "shots": [
 *       { "name": "home-desktop", "url": "/" },
 *       { "name": "estim-mobile", "url": "/estimation/", "mobile": true, "actions": [
 *         { "do": "clickIfVisible", "selector": "#price-popup-close" },
 *         { "do": "click", "role": "button", "name": "^50g$" },
 *         { "do": "eval", "js": "window.scrollBy(0, 400)" } ] } ] }
 *
 * Actions : wait (ms), css (content), click (selector ou role + name), clickIfVisible,
 * scrollTo (selector, offset), scroll (y, defilement lent), hover, eval (js ; la valeur
 * rendue s'affiche, utile pour verifier un montant avant de le publier).
 * Champs d'une capture : viewport, dpr, settle (ms apres le chargement), fullPage.
 * Les traceurs sont coupes : une capture ne compte jamais comme une visite chez le client.
 */
import { chromium } from 'playwright'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { blockTracking } from './block-tracking.mjs'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]])
    return acc
  }, []),
)
if (!args.spec || !args.out) {
  console.error('Usage: --spec <shots.json> --out <dossier> [--only nom1,nom2]')
  process.exit(1)
}
const spec = JSON.parse(readFileSync(args.spec, 'utf8'))
const only = args.only ? new Set(args.only.split(',')) : null
mkdirSync(args.out, { recursive: true })
const browser = await chromium.launch(spec.channel ? { channel: spec.channel } : {})

async function run(page, a) {
  switch (a.do) {
    case 'wait':
      return page.waitForTimeout(a.ms)
    case 'css':
      return page.addStyleTag({ content: a.content })
    case 'clickIfVisible': {
      const l = page.locator(a.selector).first()
      if (await l.isVisible().catch(() => false)) await l.click().catch(() => {})
      return
    }
    case 'click':
      if (a.role) return page.getByRole(a.role, { name: new RegExp(a.name) }).first().click()
      return page.locator(a.selector).first().click()
    case 'scrollTo':
      await page.locator(a.selector).first().scrollIntoViewIfNeeded()
      if (a.offset) await page.evaluate((o) => window.scrollBy(0, o), a.offset)
      return page.waitForTimeout(600)
    case 'scroll':
      return page.evaluate(async (to) => {
        for (let y = 0; y <= to; y += 200) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 80))
        }
        window.scrollTo(0, to)
      }, a.y)
    case 'hover':
      return page.locator(a.selector).first().hover()
    case 'eval': {
      const r = await page.evaluate(a.js)
      if (r !== undefined) console.log('  eval ->', r)
      return
    }
  }
}

for (const s of spec.shots) {
  if (only && !only.has(s.name)) continue
  const mobile = Boolean(s.mobile)
  const ctx = await browser.newContext({
    viewport: s.viewport ?? (mobile ? { width: 393, height: 798 } : { width: 1512, height: 950 }),
    deviceScaleFactor: s.dpr ?? (mobile ? 3 : 2),
    isMobile: mobile,
    hasTouch: mobile,
    locale: spec.locale ?? 'fr-CH',
    ...(mobile
      ? { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1' }
      : {}),
  })
  await blockTracking(ctx)
  const page = await ctx.newPage()
  try {
    await page.goto(spec.base.replace(/\/$/, '') + s.url, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(s.settle ?? 2500)
    if (spec.css || s.css) await page.addStyleTag({ content: (spec.css ?? '') + (s.css ?? '') })
    for (const a of s.actions ?? []) await run(page, a)
    await page.waitForTimeout(900)
    const png = await page.screenshot({ type: 'png', fullPage: Boolean(s.fullPage) })
    writeFileSync(join(args.out, `${s.name}.png`), png)
    console.log(`${s.name}.png`)
  } catch (e) {
    console.error(`${s.name}: ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
}
await browser.close()
