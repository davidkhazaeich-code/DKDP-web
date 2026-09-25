// tools/realisations/render-flow-cover.mjs
//
// Couverture (16:10, WebP) et image de partage (1200x630, PNG) d'une etude de
// cas SANS site a capturer (automatisation, CRM, formation) : le schema de son
// flux, rendu dans la charte sombre de dkdp.ch. Un visuel reel du projet, pas
// une image generee.
//
//   node tools/realisations/render-flow-cover.mjs --spec tools/realisations/specs/<slug>-cover.json
//
// Spec JSON : { "slug", "eyebrow", "title", "steps": [{ "label", "detail", "kind" }] }
// kind : source | ia | outil | controle | sortie (le pas « ia » ressort en violet).
// Sortie : public/images/realisations/<slug>/cover.webp et og.png
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]])
    return acc
  }, []),
)
if (!args.spec) {
  console.error('Usage : node tools/realisations/render-flow-cover.mjs --spec <fichier.json>')
  process.exit(2)
}

const spec = JSON.parse(await readFile(args.spec, 'utf8'))
const KIND = { source: 'Entrée', ia: 'IA', outil: 'Outil', controle: 'Règle', sortie: 'Sortie' }
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

function html(width, height) {
  const compact = height < 700
  const steps = spec.steps
    .map((s, i) => {
      const ai = s.kind === 'ia'
      return `
      <li class="step${ai ? ' ai' : ''}">
        <div class="head"><span class="num">${i + 1}</span><span class="kind">${esc(KIND[s.kind] ?? '')}</span></div>
        <p class="label">${esc(s.label)}</p>
        ${s.detail && !compact ? `<p class="detail">${esc(s.detail)}</p>` : ''}
      </li>${i < spec.steps.length - 1 ? '<li class="arrow" aria-hidden="true">→</li>' : ''}`
    })
    .join('')
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${width}px; height: ${height}px; background: #0A0A0A; color: #fff;
    font-family: Inter, -apple-system, 'Helvetica Neue', Arial, sans-serif; overflow: hidden; }
  .wrap { position: relative; height: 100%; padding: ${compact ? '56px 64px' : '88px 96px'}; display: flex; flex-direction: column; }
  .glow { position: absolute; inset: 0; background:
    radial-gradient(60% 60% at 15% 0%, rgba(124,58,237,0.28), transparent 70%),
    radial-gradient(50% 50% at 100% 100%, rgba(167,139,250,0.14), transparent 70%); }
  .grid { position: absolute; inset: 0; opacity: .07;
    background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px);
    background-size: 48px 48px; }
  .eyebrow { position: relative; font-size: ${compact ? 15 : 18}px; letter-spacing: .16em; text-transform: uppercase; color: #C4B5FD; font-weight: 600; }
  h1 { position: relative; margin-top: ${compact ? 14 : 22}px; font-size: ${compact ? 40 : 58}px; line-height: 1.08; letter-spacing: -.02em; font-weight: 600; max-width: 22ch; }
  ol { position: relative; list-style: none; display: flex; align-items: stretch; gap: 0; margin-top: auto; }
  .step { flex: 1; background: #141414; border: 1px solid #2A2A2A; border-radius: 18px; padding: ${compact ? '16px 16px' : '24px 22px'}; }
  .step.ai { background: rgba(124,58,237,0.16); border-color: rgba(124,58,237,0.55); }
  .head { display: flex; align-items: center; gap: 10px; }
  .num { display: inline-flex; width: 28px; height: 28px; border-radius: 50%; align-items: center; justify-content: center;
    font: 600 13px/1 'JetBrains Mono', ui-monospace, monospace; color: #C4B5FD; background: rgba(124,58,237,0.18); border: 1px solid rgba(124,58,237,0.45); }
  .kind { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: #9CA3AF; font-weight: 600; }
  .label { margin-top: 14px; font-size: ${compact ? 19 : 23}px; font-weight: 600; line-height: 1.2; }
  .detail { margin-top: 8px; font-size: 16px; line-height: 1.4; color: #9CA3AF; }
  .arrow { display: flex; align-items: center; padding: 0 ${compact ? 8 : 12}px; color: #71717A; font-size: 22px; }
  .brand { position: absolute; right: ${compact ? 64 : 96}px; top: ${compact ? 52 : 84}px; font-weight: 700; letter-spacing: .06em; color: #D4D4D8; font-size: ${compact ? 18 : 22}px; }
  </style></head><body><div class="wrap"><div class="glow"></div><div class="grid"></div>
  <div class="brand">DKDP</div>
  <p class="eyebrow">${esc(spec.eyebrow)}</p>
  <h1>${esc(spec.title)}</h1>
  <ol>${steps}</ol></div></body></html>`
}

const outDir = path.resolve(`public/images/realisations/${spec.slug}`)
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 })

  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.setContent(html(1600, 1000), { waitUntil: 'load' })
  const cover = await page.screenshot({ type: 'png' })
  await sharp(cover).webp({ quality: 86 }).toFile(path.join(outDir, 'cover.webp'))

  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(html(1200, 630), { waitUntil: 'load' })
  const og = await page.screenshot({ type: 'png' })
  await writeFile(path.join(outDir, 'og.png'), await sharp(og).png({ compressionLevel: 9 }).toBuffer())

  console.log(`OK ${path.relative(process.cwd(), outDir)}/cover.webp et og.png`)
} finally {
  await browser.close()
}
