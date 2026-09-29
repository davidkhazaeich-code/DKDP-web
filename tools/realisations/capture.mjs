// tools/realisations/capture.mjs
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { blockTracking, slowScrollToBottom } from './block-tracking.mjs'

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
  console.error('Usage : node tools/realisations/capture.mjs --url <URL> --slug <SLUG> [--sections 0.33,0.66,0.90] [--mobile-sections 0.50] [--css "<regles>"] [--only desktop,mobile] [--wait domcontentloaded --settle 5000]')
  process.exit(2)
}

// --css : masque un widget tiers (bulle d'avis, chat) sur toutes les captures.
// --only : n'ecrit que ces sorties (desktop, og, sections, mobile, mobile-sections),
//          pour refaire une capture sans ecraser les autres fichiers du dossier.
const css = args.css
// --wait : evenement de chargement attendu. `networkidle` par defaut ; un site qui
//          diffuse une video en fond ou interroge une API en continu ne l'atteint
//          jamais (mkrcamp.com, 29.09.2026) : `--wait domcontentloaded --settle 5000`.
// --settle : pause en millisecondes apres le chargement (ecran de chargement, animations).
const waitUntil = args.wait ?? 'networkidle'
const settle = Number(args.settle ?? 0)
const only = args.only ? new Set(args.only.split(',')) : null
const want = (name) => !only || only.has(name)
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

// Une page plus haute que la limite de texture de Chrome (16 384 px) sort d'une
// capture pleine page avec une bande vide a droite (mkrcamp.com, 17 289 px, le
// 29.09.2026) : au-dela de 12 000 px, capture par tranches de 6 000 px assemblees.
async function fullPagePng(page) {
  const { h, dpr } = await page.evaluate(() => ({
    h: document.documentElement.scrollHeight,
    dpr: window.devicePixelRatio,
  }))
  if (h * dpr <= 12_000) return page.screenshot({ fullPage: true, type: 'png' })
  const vw = page.viewportSize().width
  const slice = Math.floor(6_000 / dpr)
  const parts = []
  for (let y = 0; y < h; y += slice) {
    const clip = { x: 0, y, width: vw, height: Math.min(slice, h - y) }
    parts.push({ input: await page.screenshot({ fullPage: true, type: 'png', clip }), top: Math.round(y * dpr), left: 0 })
  }
  return sharp({ create: { width: Math.round(vw * dpr), height: Math.round(h * dpr), channels: 3, background: '#000000' } })
    .composite(parts)
    .png()
    .toBuffer()
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
  await blockTracking(context)
  const page = await context.newPage()
  await page.goto(url, { waitUntil, timeout: 60_000 })
  if (settle) await page.waitForTimeout(settle)
  if (css) await page.addStyleTag({ content: css })

  // Lazy-loads et sections revelees a l'intersection : defilement lent sur toute la page
  await slowScrollToBottom(page)

  // Fullpage desktop
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  if (want('desktop')) {
    const desktopFull = await fullPagePng(page)
    await toWebp(desktopFull, path.join(outDir, 'desktop.webp'))
  }

  // OG (top viewport, cropped to 1200x630)
  if (want('og')) {
    await page.setViewportSize({ width: 1200, height: 800 })
    const ogPng = await page.screenshot({ fullPage: false, type: 'png' })
    const ogCropped = await sharp(ogPng).resize(1200, 630, { fit: 'cover', position: 'top' }).png().toBuffer()
    await writeFile(path.join(outDir, 'og.png'), ogCropped)
    console.log(` og.png : ${(ogCropped.length / 1024).toFixed(0)} KB`)
  }

  // Section captures at scroll positions
  await page.setViewportSize({ width: 1440, height: 900 })
  for (let i = 0; want('sections') && i < sections.length; i++) {
    const buf = await captureViewport(page, sections[i])
    await toWebp(buf, path.join(outDir, `section-${i + 1}.webp`))
  }

  await context.close()
}

// Mobile captures
if (want('mobile') || want('mobile-sections')) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
  })
  await blockTracking(context)
  const page = await context.newPage()
  await page.goto(url, { waitUntil, timeout: 60_000 })
  if (settle) await page.waitForTimeout(settle)
  if (css) await page.addStyleTag({ content: css })

  await slowScrollToBottom(page)

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  if (want('mobile')) {
    const mobileFull = await fullPagePng(page)
    await toWebp(mobileFull, path.join(outDir, 'mobile.webp'))
  }

  for (let i = 0; want('mobile-sections') && i < mobileSections.length; i++) {
    const buf = await captureViewport(page, mobileSections[i])
    await toWebp(buf, path.join(outDir, `mobile-section-${i + 1}.webp`))
  }

  await context.close()
}

await browser.close()
console.log(`Capture terminee : public/images/realisations/${slug}/`)
