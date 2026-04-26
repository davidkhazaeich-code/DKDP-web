// tools/realisations/capture-extras.mjs
// One-shot helper to capture specific pages of goldencash.ch into the realisation folder
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const outDir = path.resolve('public/images/realisations/goldencash-refonte')

const targets = [
  { url: 'https://goldencash.ch/estimation', file: 'estimation-fullpage.webp', mode: 'fullpage' },
  { url: 'https://goldencash.ch/estimation', file: 'estimation-form.webp', mode: 'viewport-top' },
  { url: 'https://goldencash.ch/static-rates', file: 'dti-rates-table.webp', mode: 'fullpage' },
  { url: 'https://goldencash.ch/caverne-alibaba-secure', file: 'admin-login.webp', mode: 'viewport-top' },
]

async function toWebp(pngBuffer, outFile, maxBytes = 300_000) {
  let quality = 85
  while (quality >= 65) {
    let pipeline = sharp(pngBuffer)
    const meta = await pipeline.metadata()
    if (meta.width && meta.width > 16383) {
      pipeline = pipeline.resize(16000, undefined)
    }
    if (meta.height && meta.height > 16383) {
      pipeline = pipeline.resize(undefined, 16000)
    }
    const out = await pipeline.webp({ quality }).toBuffer()
    if (out.length <= maxBytes || quality === 65) {
      await writeFile(outFile, out)
      console.log(` ${path.basename(outFile)} : ${(out.length / 1024).toFixed(0)} KB (q=${quality})`)
      return
    }
    quality -= 5
  }
}

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

for (const t of targets) {
  console.log(`Capturing ${t.url}`)
  await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30_000 })

  // Trigger lazy loads
  for (let y = 0; y < 8000; y += 1000) {
    await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y)
    await page.waitForTimeout(150)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(400)

  let buf
  if (t.mode === 'fullpage') {
    buf = await page.screenshot({ fullPage: true, type: 'png' })
  } else {
    buf = await page.screenshot({ fullPage: false, type: 'png' })
  }

  await toWebp(buf, path.join(outDir, t.file))
}

await context.close()
await browser.close()
console.log('Done')
