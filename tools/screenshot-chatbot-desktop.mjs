import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-fix/chatbot-desktop'

const VIEWPORTS = [
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'tablet-ipad', width: 768, height: 1024 },
]

async function captureStates(vp) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForSelector('.chat-bottom-bar-wrapper', { timeout: 20000 }).catch(() => {})
  await page.waitForTimeout(1500)

  await page.screenshot({
    path: `${OUT}/${vp.name}-01-closed.png`,
    fullPage: false,
  })
  console.log(`[${vp.name}] closed bar captured`)

  const input = await page.$('.chat-bottom-bar-wrapper input[type="text"]:not([name])')
  if (!input) {
    console.warn(`[${vp.name}] visible input not found`)
    await browser.close()
    return
  }
  await input.click()
  await page.waitForTimeout(400)
  await page.screenshot({
    path: `${OUT}/${vp.name}-02-bar-focused.png`,
    fullPage: false,
  })
  console.log(`[${vp.name}] focused bar captured`)

  await input.fill('Bonjour test')
  await page.evaluate(() => {
    const form = document.querySelector('.chat-bottom-bar-wrapper form')
    form?.requestSubmit()
  })
  await page.waitForSelector('.chat-window', { timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: `${OUT}/${vp.name}-03-open.png`,
    fullPage: false,
  })
  console.log(`[${vp.name}] open chat captured`)

  await browser.close()
}

await mkdir(OUT, { recursive: true })
for (const vp of VIEWPORTS) {
  try { await captureStates(vp) } catch (e) { console.error(vp.name, e.message) }
}
console.log('Done.')
