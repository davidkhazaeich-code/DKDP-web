/* eslint-disable */
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-remaining'

// 20 routes not yet audited in light + 1 dynamic ville page
const REMAINING_ROUTES = [
  ['/agence-digitale/geneve',                          'ad-ville-geneve'],
  ['/agence-digitale/consulting-marketing',            'ad-consulting'],
  ['/agence-digitale/creation-site-web/audit-site',    'ad-audit-site'],
  ['/agence-digitale/creation-site-web/estimation',    'ad-estimation'],
  ['/agence-digitale/creation-video',                  'ad-video'],
  ['/agence-digitale/developpement-application',       'ad-app'],
  ['/agence-digitale/publicite-sea',                   'ad-sea'],
  ['/agence-digitale/reseaux-sociaux',                 'ad-rs'],
  ['/agence-digitale/rgpd-cookies',                    'ad-rgpd'],
  ['/agence-digitale/seo/audit-seo',                   'ad-audit-seo'],
  ['/formation-entreprise/bureautique',                'fe-bureautique'],
  ['/formation-entreprise/cybersecurite',              'fe-cyber'],
  ['/formation-entreprise/informatique',               'fe-info'],
  ['/formation-entreprise/montage-video',              'fe-montage'],
  ['/formation-entreprise/reseaux-sociaux',            'fe-rs'],
  ['/formation-entreprise/web-design',                 'fe-webdesign'],
  ['/intelligence-artificielle/automatisation',        'ia-auto'],
  ['/intelligence-artificielle/geneve',                'ia-geneve'],
  ['/intelligence-artificielle/mise-en-place',         'ia-mise-en-place'],
]

// 6 priority pages to spot-check on mobile (already validated desktop)
const MOBILE_SPOTCHECK = [
  ['/',                                  'home'],
  ['/agence-digitale',                   'ad'],
  ['/intelligence-artificielle',         'ia'],
  ['/formation-entreprise',              'fe'],
  ['/contact',                           'contact'],
  ['/glossaire',                         'glossaire'],
]

async function shoot(page, route, name, theme, viewport) {
  await page.setViewportSize(viewport)
  await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 })
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t)
    document.documentElement.style.colorScheme = t
  }, theme)
  await page.waitForTimeout(1200)
  const vw = `${viewport.width}x${viewport.height}`
  await page.screenshot({
    path: `${OUT}/${name}-${theme}-${vw}.png`,
    fullPage: false,
    clip: { x: 0, y: 0, width: viewport.width, height: viewport.height },
  })
  console.log(`  ${theme} ${vw} ${route}`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const browser = await chromium.launch()
  const ctx = await browser.newContext()
  const page = await ctx.newPage()

  console.log('--- Desktop light, 19 remaining routes ---')
  for (const [route, name] of REMAINING_ROUTES) {
    try {
      await shoot(page, route, name, 'light', { width: 1280, height: 900 })
    } catch (e) {
      console.error(`  ✗ ${route}: ${e.message}`)
    }
  }

  console.log('--- Mobile light, 6 priority spot-checks ---')
  for (const [route, name] of MOBILE_SPOTCHECK) {
    try {
      await shoot(page, route, name, 'light', { width: 375, height: 812 })
    } catch (e) {
      console.error(`  ✗ ${route}: ${e.message}`)
    }
  }

  await browser.close()
  console.log('Done')
}

main().catch(e => { console.error(e); process.exit(1) })
