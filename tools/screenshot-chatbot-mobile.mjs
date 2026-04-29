import { chromium, devices } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-fix/chatbot-mobile'

const VIEWPORTS = [
  { name: 'iphone-se', device: devices['iPhone SE'] },
  { name: 'iphone-13', device: devices['iPhone 13'] },
  { name: 'iphone-15-pro-max', device: devices['iPhone 15 Pro Max'] },
]

async function captureStates(viewport) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ ...viewport.device })
  const page = await ctx.newPage()

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
  // Wait for chatbot to mount (lazy + ssr:false)
  await page.waitForSelector('.chat-bottom-bar-wrapper', { timeout: 20000 }).catch(() => {})
  await page.waitForTimeout(1500)

  await page.screenshot({
    path: `${OUT}/${viewport.name}-01-closed.png`,
    fullPage: false,
  })
  console.log(`[${viewport.name}] closed bar captured`)

  // Visible input only (skip honeypot input[name="website"])
  const input = await page.$('.chat-bottom-bar-wrapper input[type="text"]:not([name])')
  if (!input) {
    console.warn(`[${viewport.name}] visible input not found, skipping open states`)
    await browser.close()
    return
  }
  await input.click()
  await page.waitForTimeout(300)
  // Bypass network call: force isOpen via clicking the suggestion button after type
  await input.fill('Bonjour test')
  await page.waitForTimeout(400)
  await page.screenshot({
    path: `${OUT}/${viewport.name}-02-bar-typed.png`,
    fullPage: false,
  })
  console.log(`[${viewport.name}] typed bar captured`)

  // Submit. Use form submit to avoid keyboard timing issues.
  await page.evaluate(() => {
    const form = document.querySelector('.chat-bottom-bar-wrapper form')
    form?.requestSubmit()
  })
  await page.waitForSelector('.chat-window', { timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: `${OUT}/${viewport.name}-03-open.png`,
    fullPage: false,
  })
  console.log(`[${viewport.name}] open chat captured`)

  await browser.close()
}

await mkdir(OUT, { recursive: true })

for (const vp of VIEWPORTS) {
  try {
    await captureStates(vp)
  } catch (e) {
    console.error(`[${vp.name}] error:`, e.message)
  }
}

console.log('Done.')
