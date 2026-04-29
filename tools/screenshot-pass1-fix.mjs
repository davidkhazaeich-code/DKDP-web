import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-pass1'
const VIEWPORT = { width: 1280, height: 900 }

// Each entry: [path, name, scrollSelectorOrNumber]
// scrollSelector: CSS selector to scroll into view ; number: pixel offset ; 'bottom': scroll to bottom
const SHOTS = [
  // 1. Homepage testimonials
  ['/', 'home-testimonials', { selector: '#testimonials-heading' }],
  // 2. Homepage footer
  ['/', 'home-footer', { scroll: 'bottom' }],
  // 3. Homepage team section
  ['/', 'home-team', { text: 'Quatre experts' }],
  // 4. Service pages footer
  ['/agence-digitale', 'agence-footer', { scroll: 'bottom' }],
  ['/formation-entreprise', 'formation-footer', { scroll: 'bottom' }],
  ['/intelligence-artificielle', 'ia-footer', { scroll: 'bottom' }],
  // 5. Tarifs page card surfaces
  ['/tarifs', 'tarifs-cards', { offset: 600 }],
  // 6. Realisations page card grid
  ['/realisations', 'realisations-grid', { offset: 600 }],
  // 7. Service pages - service windows / cards (homepage all-services)
  ['/', 'home-allservices', { text: 'Tous nos services' }],
  // 8. Tarifs full top
  ['/tarifs', 'tarifs-top', { offset: 0 }],
  // 9. Realisations top
  ['/realisations', 'realisations-top', { offset: 0 }],
]

async function shoot(theme, [path, name, opts], suffix = '') {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 })
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t)
      document.documentElement.style.colorScheme = t
    }, theme)
    await page.waitForTimeout(800)

    if (opts.scroll === 'bottom') {
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    } else if (typeof opts.offset === 'number') {
      await page.evaluate((y) => window.scrollTo(0, y), opts.offset)
    } else if (opts.selector) {
      const found = await page.evaluate((sel) => {
        const el = document.querySelector(sel)
        if (el) {
          el.scrollIntoView({ block: 'center', behavior: 'instant' })
          return true
        }
        return false
      }, opts.selector)
      if (!found) console.warn(`! ${name}: selector ${opts.selector} not found`)
    } else if (opts.text) {
      const found = await page.evaluate((needle) => {
        const all = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
        const hit = all.find(el => (el.textContent || '').includes(needle))
        if (hit) {
          hit.scrollIntoView({ block: 'center', behavior: 'instant' })
          return true
        }
        return false
      }, opts.text)
      if (!found) console.warn(`! ${name}: text "${opts.text}" not found`)
    }

    await page.waitForTimeout(700)

    await page.screenshot({
      path: `${OUT}/${name}-${theme}${suffix}.png`,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    })
    console.log(`OK ${theme} ${name}${suffix}`)
  } catch (e) {
    console.error(`FAIL ${theme} ${name}: ${e.message}`)
  }
  await browser.close()
}

await mkdir(OUT, { recursive: true })
for (const shot of SHOTS) {
  await shoot('light', shot)
}
console.log('Done')
