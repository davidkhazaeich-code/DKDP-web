/**
 * Audit des couleurs de liens (etat par defaut vs hover), en dark et en light.
 *
 * Sortie : pour chaque page, la liste des <a> textuels avec leur couleur calculee
 * au repos et au survol, pour reperer les liens qui partent deja en blanc.
 *
 *   node tools/audit-link-colors.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs'

const BASE = process.argv[2] || 'https://dkdp.ch'

const PAGES = [
  '/', '/agence-digitale', '/intelligence-artificielle', '/formation-entreprise',
  '/agence-digitale/creation-site-web', '/agence-digitale/refonte-site-web',
  '/agence-digitale/developpement-application', '/agence-digitale/seo',
  '/agence-digitale/publicite-sea', '/agence-digitale/reseaux-sociaux',
  '/agence-digitale/creation-video', '/agence-digitale/consulting-marketing',
  '/agence-digitale/rgpd-cookies', '/agence-digitale/seo/audit-seo',
  '/agence-digitale/creation-site-web/audit-site', '/agence-digitale/creation-site-web/estimation',
  '/agence-digitale/geneve', '/agence-digitale/lausanne',
  '/intelligence-artificielle/agents-ia', '/intelligence-artificielle/automatisation',
  '/intelligence-artificielle/audit-conseil', '/intelligence-artificielle/mise-en-place',
  '/intelligence-artificielle/chatbot-ia', '/intelligence-artificielle/geneve',
  '/formation-entreprise/claude-ai', '/formation-entreprise/ia',
  '/formation-entreprise/bureautique', '/formation-entreprise/canva',
  '/formation-entreprise/web-design', '/formation-entreprise/cybersecurite',
  '/formation-entreprise/reseaux-sociaux', '/formation-entreprise/informatique',
  '/formation-entreprise/montage-video', '/formation-particuliers',
  '/contact', '/tarifs', '/a-propos', '/blog', '/realisations', '/glossaire',
  '/plan-du-site', '/mentions-legales', '/politique-de-confidentialite',
  '/conditions-generales-de-vente', '/rgpd-cookies',
  '/en', '/en/digital-agency', '/en/artificial-intelligence', '/en/corporate-training',
  '/en/about', '/en/pricing', '/en/glossary', '/en/sitemap', '/en/contact',
  '/en/portfolio', '/en/blog', '/en/individual-training',
]

const collect = () => {
  const norm = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return c
    const [r, g, b] = m[1].split(',').map((n) => Math.round(parseFloat(n)))
    return `rgb(${r}, ${g}, ${b})`
  }
  const out = []
  for (const a of document.querySelectorAll('a')) {
    const text = (a.textContent || '').trim().replace(/\s+/g, ' ')
    if (!text || text.length > 120) continue
    const r = a.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const cs = getComputedStyle(a)
    // Le noeud qui porte reellement la couleur du libelle
    const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT)
    let leafColor = cs.color
    let leafPath = ''
    const tn = walker.nextNode()
    if (tn && tn.parentElement) {
      leafColor = getComputedStyle(tn.parentElement).color
      leafPath = tn.parentElement === a ? 'self' : tn.parentElement.tagName.toLowerCase()
    }
    out.push({
      text: text.slice(0, 60),
      href: a.getAttribute('href'),
      color: norm(cs.color),
      leafColor: norm(leafColor),
      leafPath,
      cls: a.className && typeof a.className === 'string' ? a.className.slice(0, 200) : '',
      inParagraph: !!a.closest('p'),
      inNav: !!a.closest('nav, header, footer'),
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
    })
  }
  return out
}

const run = async () => {
  const browser = await chromium.launch()
  const report = {}
  for (const theme of ['dark', 'light']) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    await ctx.addInitScript((t) => {
      try { localStorage.setItem('dkdp-theme', t) } catch {}
    }, theme)
    const page = await ctx.newPage()
    for (const path of PAGES) {
      try {
        await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 45000 })
        await page.waitForTimeout(1200)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(900)
        const links = await page.evaluate(collect)
        report[`${theme} ${path}`] = links
        process.stderr.write(`[${theme}] ${path} : ${links.length} liens\n`)
      } catch (e) {
        process.stderr.write(`[${theme}] ${path} : ERREUR ${e.message}\n`)
      }
    }
    await ctx.close()
  }
  await browser.close()
  fs.writeFileSync('tools/output/link-colors.json', JSON.stringify(report, null, 2))

  // Synthese : repartition des couleurs
  for (const theme of ['dark', 'light']) {
    const tally = new Map()
    for (const [key, links] of Object.entries(report)) {
      if (!key.startsWith(theme + ' ')) continue
      for (const l of links) {
        const k = l.leafColor
        if (!tally.has(k)) tally.set(k, { n: 0, samples: [] })
        const t = tally.get(k)
        t.n++
        if (t.samples.length < 6) t.samples.push(`${key.slice(theme.length + 1)} :: "${l.text}" :: ${l.cls.slice(0, 90)}`)
      }
    }
    console.log(`\n===== ${theme.toUpperCase()} =====`)
    for (const [color, t] of [...tally].sort((a, b) => b[1].n - a[1].n)) {
      console.log(`\n${color}  (${t.n})`)
      t.samples.forEach((s) => console.log('   ' + s))
    }
  }
}

run()
