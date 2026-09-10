/**
 * QA visuelle d'une ou plusieurs pages : capture pleine page en sombre et en
 * clair, sur desktop (1440) et mobile (390), apres un defilement progressif qui
 * declenche les SectionReveal. Sur desktop sombre, capture aussi chaque section
 * portant un id passe en --sections. Rapporte le nombre de h1, l'attribut
 * data-theme, un eventuel debordement horizontal et les erreurs console.
 *
 *   node tools/qa-page-screenshots.mjs --base http://localhost:3105 --out /tmp/qa \
 *     --sections fonctionnement,audience,faq /agence-digitale/chatgpt-ads /en/digital-agency/chatgpt-ads
 */
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const BASE = opt('--base', 'http://localhost:3000')
const OUT = opt('--out', 'tools/screenshots/qa')
const SECTIONS = (opt('--sections', '') || '').split(',').filter(Boolean)
const PAGES = args.filter((a, i) => a.startsWith('/') && !['--base', '--out', '--sections'].includes(args[i - 1]))
await mkdir(OUT, { recursive: true })
const slug = (p) => p.replace(/^\/+|\/+$/g, '').replace(/\//g, '_') || 'home'

const browser = await chromium.launch()
const report = []
for (const path of PAGES) {
  const name = slug(path)
  for (const theme of ['dark', 'light']) {
    for (const [vw, vh, dev] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
      const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1, isMobile: dev === 'mobile', hasTouch: dev === 'mobile' })
      await ctx.addInitScript((t) => { try { localStorage.setItem('dkdp-theme', t) } catch {} }, theme)
      const page = await ctx.newPage()
      const errors = []
      page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text().slice(0, 220)}`) })
      page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e).slice(0, 220)}`))
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 120000 })
      await page.waitForTimeout(800)
      const total = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y < total; y += Math.round(vh * 0.6)) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y)
        await page.waitForTimeout(120)
      }
      await page.waitForTimeout(600)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth ? `DEBORDEMENT scrollWidth ${document.documentElement.scrollWidth} > ${document.documentElement.clientWidth}` : 'ok')
      const h1 = await page.evaluate(() => document.querySelectorAll('h1').length)
      const themeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(300)
      await page.screenshot({ path: `${OUT}/${name}-${theme}-${dev}-full.png`, fullPage: true })
      if (theme === 'dark' && dev === 'desktop') {
        for (const id of SECTIONS) {
          const el = await page.$(`#${id}`)
          if (el) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(250); await el.screenshot({ path: `${OUT}/${name}-section-${id}.png` }) }
          else report.push(`${name}: section #${id} ABSENTE`)
        }
      }
      report.push(`${name} ${theme} ${dev}: h1=${h1} theme=${themeAttr} ${overflow} hauteur=${total} erreurs=${errors.length}${errors.length ? '\n   ' + errors.slice(0, 6).join('\n   ') : ''}`)
      await ctx.close()
    }
  }
}
await browser.close()
console.log(report.join('\n'))
