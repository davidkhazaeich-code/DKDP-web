/**
 * QA des diagrammes animés (kit dg-*, docs/claude/22-diagrammes-animes.md).
 *
 * Pour chaque cible « chemin@sélecteur » : amène le diagramme à l'écran (à la molette, comme un
 * lecteur), rejoue sa séquence figée à zéro, puis capture une image par instant et l'état final.
 * Avec --ref, capture le même sélecteur sur le site de référence (la prod) pour vérifier
 * que l'état final est identique au rendu d'avant : le script écrit le pourcentage de
 * pixels qui diffèrent, et une image de différence. Planche contact par cible.
 *
 *   node tools/qa-diagrammes-animes.mjs --base http://localhost:3107 --ref https://dkdp.ch \
 *     --out /tmp/qa-dg [--mobile] [--light] [--times 0,150,300,600,1000,1600] \
 *     "/agence-digitale/seo@[data-dg='hero']" "/agence-digitale/seo@section#process [data-dg]"
 *
 * Le sélecteur de référence peut différer : "chemin@sélecteur@sélecteurRef".
 * Sans marge, le cadre suit la racine ; --pad 40 élargit (cartes flottantes qui débordent).
 * --loops 0,800,1600 : capture aussi les boucles (data-dg-live) à ces instants de leur cycle.
 */
import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const flag = (k) => args.includes(k)
const BASE = opt('--base', 'http://localhost:3107')
const REF = opt('--ref', '')
const OUT = opt('--out', 'tools/output/qa-dg')
const PAD = Number(opt('--pad', '24'))
const TIMES = opt('--times', '0,150,300,500,800,1100,1500,2000').split(',').map(Number)
const LOOPS = (opt('--loops', '') || '').split(',').filter(Boolean).map(Number)
const MOBILE = flag('--mobile')
const THEME = flag('--light') ? 'light' : 'dark'
const VALUE_OPTS = new Set(['--base', '--ref', '--out', '--pad', '--times', '--loops'])
const TARGETS = args.filter((a, i) => !a.startsWith('--') && !VALUE_OPTS.has(args[i - 1]))
await mkdir(OUT, { recursive: true })

const slug = (s) => s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 80) || 'home'
const browser = await chromium.launch()

async function open(url) {
  const ctx = await browser.newContext({
    viewport: MOBILE ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    isMobile: MOBILE,
    hasTouch: MOBILE,
  })
  await ctx.addInitScript((t) => { try { localStorage.setItem('dkdp-theme', t) } catch {} }, THEME)
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)) })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 }).catch(() => {})
  await page.evaluate(() => document.fonts.ready)
  return { ctx, page, errors }
}

// Amène la racine à l'écran comme un lecteur : à la molette (Lenis ramène un scrollTo
// programmé à sa propre position), jusqu'à ce qu'elle soit posée au milieu de l'écran.
async function bring(page, selector) {
  const el = page.locator(selector).first()
  await el.waitFor({ state: 'attached', timeout: 20000 })
  const vp = page.viewportSize()
  await page.mouse.move(vp.width / 2, vp.height / 2)
  for (let k = 0; k < 8; k++) {
    const d = await el.evaluate((n) => {
      const r = n.getBoundingClientRect()
      return r.top - Math.max(80, (innerHeight - r.height) / 2)
    })
    if (Math.abs(d) < 12) break
    await page.mouse.wheel(0, d)
    await page.waitForTimeout(1200)
  }
  await page.waitForTimeout(300)
  return el
}

// Rejoue la séquence des racines de la cible (elle-même ou ses descendants [data-dg]) depuis zéro, figée : noms d'animation coupés puis remis
// (nouvelles animations), racine armée et jouée, tout en pause à t = 0. Boucles arrêtées.
const replay = (el) => el.evaluate((target) => {
  const roots = target.matches('[data-dg]') ? [target] : [...target.querySelectorAll('[data-dg]')]
  const modes = roots.map((r) => r.dataset.dg)
  for (const root of roots) {
    for (const a of ['data-dg-armed', 'data-dg-play', 'data-dg-live']) root.removeAttribute(a)
    root.dataset.dg = 'qa-off'
  }
  void document.body.offsetHeight
  roots.forEach((root, k) => {
    root.dataset.dg = modes[k]
    root.setAttribute('data-dg-armed', '')
    root.setAttribute('data-dg-play', '')
  })
  void document.body.offsetHeight
  for (const a of target.getAnimations({ subtree: true })) { a.pause(); a.currentTime = 0 }
})

// Animations de la racine à l'instant t (ms depuis le départ de la séquence).
const seek = (el, t) => el.evaluate(async (root, tt) => {
  for (const a of root.getAnimations({ subtree: true })) { a.pause(); a.currentTime = tt }
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
}, t)

// État de repos : entrées terminées, boucles arrêtées, animations infinies figées à leur départ.
const finalize = (page) => page.evaluate(async () => {
  document.querySelectorAll('[data-dg-live]').forEach((n) => n.removeAttribute('data-dg-live'))
  for (const a of document.getAnimations()) {
    a.pause()
    a.currentTime = a.effect?.getTiming().iterations === Infinity ? 0 : 999999
  }
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
})

async function shoot(page, el, path) {
  // Calques fixes (en-tête, barre du chatbot, badge du serveur de dev) masqués : ils se posent
  // sur le cadre au mobile et faussent la comparaison.
  await page.evaluate(() => {
    for (const n of document.querySelectorAll('body *')) {
      if (getComputedStyle(n).position === 'fixed' && !n.closest('[data-dg]')) n.style.setProperty('visibility', 'hidden', 'important')
    }
    document.querySelectorAll('nextjs-portal').forEach((n) => n.style.setProperty('display', 'none', 'important'))
  })
  const box = await el.boundingBox()
  if (!box) return false
  const vp = page.viewportSize()
  const clip = {
    x: Math.max(0, box.x - PAD),
    y: Math.max(0, box.y - PAD),
    width: Math.min(vp.width - Math.max(0, box.x - PAD), box.width + PAD * 2),
    height: Math.min(vp.height - Math.max(0, box.y - PAD), box.height + PAD * 2),
  }
  await page.screenshot({ path, clip })
  return true
}

const report = []
for (const target of TARGETS) {
  const [path, selector, refSelector = selector] = target.split('@')
  const name = `${slug(path)}--${slug(selector)}${MOBILE ? '--mobile' : ''}${THEME === 'light' ? '--light' : ''}`
  const { ctx, page, errors } = await open(BASE + path)
  const el = await bring(page, selector)
  // En dev, l'hydratation peut suivre networkidle : attendre que la racine soit prise en charge.
  await el.evaluate(async (n) => {
    for (let k = 0; k < 150 && !(n.matches('[data-dg]') || n.querySelector('[data-dg]')); k++) await new Promise((r) => setTimeout(r, 100))
  })
  const state = await el.evaluate((n) => [...n.attributes].map((a) => a.name).filter((a) => a.startsWith('data-dg')).join(' '))
  const frames = []
  await replay(el)
  for (const t of TIMES) {
    await seek(el, t)
    const f = `${OUT}/${name}--t${String(t).padStart(5, '0')}.png`
    if (await shoot(page, el, f)) frames.push(f)
  }
  if (LOOPS.length) {
    // Boucles : entrées terminées, racines « à l'écran », boucles figées à chaque instant.
    await el.evaluate((target) => {
      for (const a of target.getAnimations({ subtree: true })) { a.pause(); a.currentTime = 999999 }
      const roots = target.matches('[data-dg]') ? [target] : [...target.querySelectorAll('[data-dg]')]
      for (const r of roots) { r.style.setProperty('--dg-loop-start', '0ms'); r.setAttribute('data-dg-live', '') }
      void document.body.offsetHeight
    })
    for (const t of LOOPS) {
      await el.evaluate(async (target, tt) => {
        for (const a of target.getAnimations({ subtree: true })) {
          if (a.effect?.getTiming().iterations === Infinity) { a.pause(); a.currentTime = tt }
        }
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      }, t)
      const f = `${OUT}/${name}--boucle${String(t).padStart(5, '0')}.png`
      if (await shoot(page, el, f)) frames.push(f)
    }
    await el.evaluate((target) => {
      const roots = target.matches('[data-dg]') ? [target] : [...target.querySelectorAll('[data-dg]')]
      for (const r of roots) r.style.removeProperty('--dg-loop-start')
    })
  }
  await finalize(page)
  const final = `${OUT}/${name}--final.png`
  await shoot(page, el, final)
  frames.push(final)
  let line = `${name}: ${state || 'sans data-dg'} · ${frames.length} images${errors.length ? ` · ERREURS ${errors.join(' | ')}` : ''}`
  await ctx.close()

  if (REF) {
    const ref = await open(REF + path)
    const refEl = await bring(ref.page, refSelector)
    await finalize(ref.page)
    const refFile = `${OUT}/${name}--ref.png`
    await shoot(ref.page, refEl, refFile)
    await ref.ctx.close()
    try {
      const out = execFileSync('python3', ['-c', `
import sys
from PIL import Image, ImageChops
a=Image.open(sys.argv[1]).convert('RGB'); b=Image.open(sys.argv[2]).convert('RGB')
if a.size!=b.size:
    print(f"TAILLE {a.size} contre {b.size}"); sys.exit()
d=ImageChops.difference(a,b).convert('L').point(lambda v: 255 if v>24 else 0)
n=sum(1 for v in d.getdata() if v)
d.save(sys.argv[3]); print(f"{100*n/(a.size[0]*a.size[1]):.3f} % de pixels differents")
`, final, refFile, `${OUT}/${name}--diff.png`]).toString().trim()
      line += ` · final contre réf : ${out}`
    } catch (e) { line += ` · diff impossible (${String(e).slice(0, 80)})` }
  }

  // Planche contact : images côte à côte, 4 par ligne.
  try {
    execFileSync('python3', ['-c', `
import sys
from PIL import Image, ImageDraw
files=sys.argv[2:]; ims=[Image.open(f).convert('RGB') for f in files]
w=max(i.size[0] for i in ims); h=max(i.size[1] for i in ims); cols=4; rows=(len(ims)+cols-1)//cols
sheet=Image.new('RGB',(w*cols,(h+28)*rows),(40,40,40)); dr=ImageDraw.Draw(sheet)
for k,(f,im) in enumerate(zip(files,ims)):
    x=(k%cols)*w; y=(k//cols)*(h+28); sheet.paste(im,(x,y+28)); dr.text((x+8,y+6),f.split('--')[-1].replace('.png',''),fill=(255,255,255))
sheet.thumbnail((2400,2400)); sheet.save(sys.argv[1])
`, `${OUT}/${name}--planche.png`, ...frames, ...(REF ? [`${OUT}/${name}--ref.png`] : [])])
  } catch (e) { line += ` · planche impossible (${String(e).slice(0, 80)})` }
  report.push(line)
  console.log(line)
}
await browser.close()
await writeFile(`${OUT}/rapport.txt`, report.join('\n') + '\n')
