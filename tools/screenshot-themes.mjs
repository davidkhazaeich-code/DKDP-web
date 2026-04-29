// Usage: node tools/screenshot-themes.mjs
// Captures screenshots of key DKDP pages in BOTH dark and light themes.
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots'

const PAGES = [
  ['/',                                   'home'],
  ['/agence-digitale',                    'agence-digitale'],
  ['/intelligence-artificielle',          'ia'],
  ['/formation-entreprise',               'formation-entreprise'],
  ['/formation-entreprise/claude-ai',     'claude-ai'],
  ['/a-propos',                           'a-propos'],
  ['/contact',                            'contact'],
  ['/tarifs',                             'tarifs'],
  ['/blog',                               'blog-listing'],
  ['/blog/audit-digital-360-avant-de-se-lancer', 'blog-article'],
]

async function shoot(theme) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  // Inject localStorage value before any page loads
  await ctx.addInitScript((t) => {
    try { localStorage.setItem('dkdp-theme', t) } catch {}
  }, theme)

  for (const [path, name] of PAGES) {
    const page = await ctx.newPage()
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 })
      await page.waitForTimeout(1200)
      await page.screenshot({
        path: `${OUT}/${name}-${theme}.png`,
        fullPage: false,
      })
      console.log(`OK  ${theme}  ${path}`)
    } catch (e) {
      console.error(`ERR ${theme}  ${path}: ${e.message}`)
    }
    await page.close()
  }

  await browser.close()
}

async function main() {
  await mkdir(OUT, { recursive: true })
  console.log('--- DARK theme ---')
  await shoot('dark')
  console.log('--- LIGHT theme ---')
  await shoot('light')
  console.log('Done. Screenshots in', OUT)
}

main().catch(e => { console.error(e); process.exit(1) })
