/**
 * Detecte les pages dont l'hydratation React casse, et l'effet de bord qui va avec :
 * `data-theme` disparait de `<html>` et la page repasse en sombre malgre le mode clair.
 *
 * A lancer contre la PROD : le principal declencheur connu (le separateur de milliers de
 * `fr-CH`, qui differe entre l'ICU de Vercel et celui de Chrome) ne se reproduit pas en
 * local, ou Node et Chrome sont d'accord. Voir `src/lib/format.ts`.
 *
 *   node tools/check-hydration.mjs https://dkdp.ch [chemin...]
 *
 * Sans chemin, balaye les pages a risque (celles qui affichent des nombres formates).
 */
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'https://dkdp.ch'
const PAGES = process.argv.length > 3 ? process.argv.slice(3) : [
  '/',
  '/intelligence-artificielle',
  '/en/artificial-intelligence',
  '/formation-entreprise',
  '/formation-entreprise/ia',
  '/formation-entreprise/claude-ai',
  '/en/corporate-training',
  '/en/corporate-training/ai',
  '/en/corporate-training/claude-ai',
  '/agence-digitale/creation-site-web',
  '/agence-digitale/creation-site-web/estimation',
  '/tarifs',
]

const run = async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext()
  await ctx.addInitScript(() => { try { localStorage.setItem('dkdp-theme', 'light') } catch {} })
  const page = await ctx.newPage()
  let ko = 0

  for (const path of PAGES) {
    const errors = []
    const onError = (e) => {
      if (/#4(18|1[89]|2[0-5])|Hydration|hydrat/i.test(e.message)) errors.push(e.message.slice(0, 120))
    }
    page.on('pageerror', onError)
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' })
    const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    await page.waitForTimeout(4500)
    const after = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    page.off('pageerror', onError)

    const broken = errors.length > 0 || after !== 'light'
    if (broken) ko++
    console.log(
      (broken ? 'KO ' : 'ok ') +
      ` data-theme ${String(before)} -> ${String(after)}`.padEnd(34) +
      path +
      (errors.length ? '   ' + errors[0] : ''),
    )
  }

  await browser.close()
  console.log(`\n${ko} page(s) en echec sur ${PAGES.length}.`)
  process.exitCode = ko > 0 ? 1 : 0
}

run()
