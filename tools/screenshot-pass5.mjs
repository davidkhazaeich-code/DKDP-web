// Usage: node tools/screenshot-pass5.mjs
// Pass 5: focused contrast review screenshots — light mode only.
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-pass5'

// Each entry: [path, name, optional pre-screenshot action]
const PAGES = [
  ['/',                              'home-hero'],
  ['/',                              'home-services',     async (page) => {
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.6, behavior: 'instant' }))
    await page.waitForTimeout(800)
  }],
  ['/agence-digitale',               'agence-hero'],
  ['/intelligence-artificielle',     'ia-hero'],
  ['/tarifs',                        'tarifs'],
  ['/contact',                       'contact'],
  ['/formation-entreprise',          'formation-faq',     async (page) => {
    await page.evaluate(() => {
      const details = document.querySelectorAll('details')
      if (details.length > 0) details[0].setAttribute('open', '')
      const buttons = document.querySelectorAll('button[aria-expanded="false"]')
      if (buttons.length > 0) buttons[0].click()
    })
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight - window.innerHeight - 600, behavior: 'instant' }))
    await page.waitForTimeout(700)
  }],
  ['/blog',                          'blog-listing'],
]

async function shoot(theme) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  await ctx.addInitScript((t) => {
    try { localStorage.setItem('dkdp-theme', t) } catch {}
  }, theme)

  for (const entry of PAGES) {
    const [path, name, action] = entry
    const page = await ctx.newPage()
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 })
      await page.waitForTimeout(1200)
      if (action) await action(page)
      await page.screenshot({
        path: `${OUT}/${name}-${theme}.png`,
        fullPage: false,
      })
      console.log(`OK  ${theme}  ${path}  -> ${name}`)
    } catch (e) {
      console.error(`ERR ${theme}  ${path}: ${e.message}`)
    }
    await page.close()
  }

  await browser.close()
}

async function main() {
  await mkdir(OUT, { recursive: true })
  console.log('--- LIGHT theme (Pass 5) ---')
  await shoot('light')
  console.log('Done. Screenshots in', OUT)
}

main().catch(e => { console.error(e); process.exit(1) })
