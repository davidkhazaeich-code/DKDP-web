import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-fix'
const VIEWPORT = { width: 1280, height: 900 }

async function shootSections(theme) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 })
  // Override anti-FOUC's forced dark by setting data-theme post-load.
  // The anti-FOUC currently strips localStorage, so we set the attribute directly.
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t)
    document.documentElement.style.colorScheme = t
  }, theme)
  await page.waitForTimeout(1500)

  // Get total page height
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const sections = Math.ceil(pageHeight / VIEWPORT.height)
  console.log(`${theme}: page ${pageHeight}px, ${sections} sections`)

  for (let i = 0; i < sections; i++) {
    const y = i * VIEWPORT.height
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await page.waitForTimeout(700)
    await page.screenshot({
      path: `${OUT}/home-${theme}-section-${String(i).padStart(2, '0')}.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    })
    console.log(`  section ${i} at y=${y}`)
  }

  await browser.close()
}

await mkdir(OUT, { recursive: true })
await shootSections('light')
await shootSections('dark')
console.log('Done')
