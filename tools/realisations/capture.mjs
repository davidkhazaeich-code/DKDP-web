// tools/realisations/capture.mjs
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]])
    return acc
  }, [])
)

const url = args.url
const slug = args.slug
const sectionsArg = args.sections ?? '0.33,0.66,0.90'
const mobileSectionsArg = args['mobile-sections'] ?? '0.50'

if (!url || !slug) {
  console.error('Usage : node tools/realisations/capture.mjs --url <URL> --slug <SLUG> [--sections 0.33,0.66,0.90] [--mobile-sections 0.50]')
  process.exit(2)
}

const sections = sectionsArg.split(',').map(Number)
const mobileSections = mobileSectionsArg.split(',').map(Number)

const outDir = path.resolve(`public/images/realisations/${slug}`)
await mkdir(outDir, { recursive: true })

// WebP max dimension is 16383px. Resize if needed before encoding.
const WEBP_MAX_DIM = 16383

async function toWebp(pngBuffer, outFile, maxBytes = 300_000) {
  const meta = await sharp(pngBuffer).metadata()
  let pipeline = sharp(pngBuffer)
  if ((meta.width ?? 0) > WEBP_MAX_DIM || (meta.height ?? 0) > WEBP_MAX_DIM) {
    const scale = WEBP_MAX_DIM / Math.max(meta.width ?? 1, meta.height ?? 1)
    pipeline = pipeline.resize(
      Math.floor((meta.width ?? 1) * scale),
      Math.floor((meta.height ?? 1) * scale),
      { fit: 'inside' }
    )
  }
  let quality = 85
  while (quality >= 65) {
    const out = await pipeline.clone().webp({ quality }).toBuffer()
    if (out.length <= maxBytes || quality === 65) {
      await writeFile(outFile, out)
      console.log(` ${path.basename(outFile)} : ${(out.length / 1024).toFixed(0)} KB (q=${quality})`)
      return
    }
    quality -= 5
  }
}

async function captureViewport(page, position) {
  const totalH = await page.evaluate(() => document.documentElement.scrollHeight)
  const viewportH = await page.evaluate(() => window.innerHeight)
  const targetY = Math.max(0, Math.min(totalH - viewportH, totalH * position))
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), targetY)
  await page.waitForTimeout(400)
  return page.screenshot({ fullPage: false, type: 'png' })
}

const browser = await chromium.launch()

// Desktop captures
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })

  // Trigger lazy-loads by progressive scroll
  for (let y = 0; y < 8000; y += 1000) {
    await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y)
    await page.waitForTimeout(150)
  }

  // Fullpage desktop
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  const desktopFull = await page.screenshot({ fullPage: true, type: 'png' })
  await toWebp(desktopFull, path.join(outDir, 'desktop.webp'))

  // OG (top viewport, cropped to 1200x630)
  await page.setViewportSize({ width: 1200, height: 800 })
  const ogPng = await page.screenshot({ fullPage: false, type: 'png' })
  const ogCropped = await sharp(ogPng).resize(1200, 630, { fit: 'cover', position: 'top' }).png().toBuffer()
  await writeFile(path.join(outDir, 'og.png'), ogCropped)
  console.log(` og.png : ${(ogCropped.length / 1024).toFixed(0)} KB`)

  // Section captures at scroll positions
  await page.setViewportSize({ width: 1440, height: 900 })
  for (let i = 0; i < sections.length; i++) {
    const buf = await captureViewport(page, sections[i])
    await toWebp(buf, path.join(outDir, `section-${i + 1}.webp`))
  }

  await context.close()
}

// Mobile captures
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
  })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })

  for (let y = 0; y < 8000; y += 1000) {
    await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y)
    await page.waitForTimeout(150)
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  const mobileFull = await page.screenshot({ fullPage: true, type: 'png' })
  await toWebp(mobileFull, path.join(outDir, 'mobile.webp'))

  for (let i = 0; i < mobileSections.length; i++) {
    const buf = await captureViewport(page, mobileSections[i])
    await toWebp(buf, path.join(outDir, `mobile-section-${i + 1}.webp`))
  }

  await context.close()
}

await browser.close()
console.log(`Capture terminee : public/images/realisations/${slug}/`)
