import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-services'
const VIEWPORT = { width: 1280, height: 900 }

const ROUTES = [
  ['/agence-digitale/creation-site-web', 'creation-site-web'],
  ['/agence-digitale/seo',                'seo'],
  ['/agence-digitale/refonte-site-web',   'refonte-site-web'],
  ['/intelligence-artificielle/agents-ia', 'agents-ia'],
  ['/intelligence-artificielle/chatbot-ia', 'chatbot-ia'],
  ['/intelligence-artificielle/audit-conseil', 'audit-conseil-ia'],
  ['/formation-entreprise/canva',         'formation-canva'],
  ['/formation-entreprise/ia',            'formation-ia'],
  ['/formation-particuliers',             'formation-particuliers'],
  ['/realisations',                       'realisations'],
  ['/glossaire',                          'glossaire'],
]

async function shootRoute(theme, [path, name]) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 })
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t)
      document.documentElement.style.colorScheme = t
    }, theme)
    await page.waitForTimeout(1500)

    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    const sections = Math.min(Math.ceil(pageHeight / VIEWPORT.height), 6) // cap at 6 viewports per page

    for (let i = 0; i < sections; i++) {
      const y = i * VIEWPORT.height
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
      await page.waitForTimeout(500)
      await page.screenshot({
        path: `${OUT}/${name}-${theme}-${String(i).padStart(2, '0')}.png`,
        clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      })
    }
    console.log(`✓ ${theme} ${path} (${sections} sections)`)
  } catch (e) {
    console.error(`✗ ${theme} ${path}: ${e.message}`)
  }
  await browser.close()
}

await mkdir(OUT, { recursive: true })
for (const route of ROUTES) {
  await shootRoute('light', route)
}
console.log('Done')
