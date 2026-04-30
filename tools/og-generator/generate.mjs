import { chromium } from '@playwright/test'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATE = await readFile(resolve(__dirname, 'template.html'), 'utf-8')
const OUT_DIR = resolve(__dirname, '../../public/images/og')
const ROOT_OUT = resolve(__dirname, '../../public')

await mkdir(OUT_DIR, { recursive: true })

const PILLARS = {
  agence:    { bg: '#0A0A0A', accent: '#7C3AED', accentSoft: '#A78BFA', accent2: '#FF6B00', border: 'rgba(167,139,250,0.30)' },
  formation: { bg: '#0A0A0A', accent: '#FF6B00', accentSoft: '#FF8C00', accent2: '#7C3AED', border: 'rgba(255,140,0,0.30)' },
  ia:        { bg: '#050505', accent: '#A78BFA', accentSoft: '#D4D4D8', accent2: '#FF6B00', border: 'rgba(212,212,216,0.22)' },
  marque:    { bg: '#0A0A0A', accent: '#7C3AED', accentSoft: '#D4D4D8', accent2: '#FF6B00', border: 'rgba(212,212,216,0.22)' },
}

const PAGES = [
  // Generic / informational
  { file: 'contact.png',                pillar: 'marque',    label: 'Contact · DKDP',                 title: 'Parlons de votre projet',         subtitle: 'Réponse sous 24h · Appel découverte gratuit' },
  { file: 'tarifs.png',                 pillar: 'marque',    label: 'Tarifs',                          title: 'Tarifs transparents',                  subtitle: 'Site web · Formation · Automatisation IA',       size: 'smaller' },
  { file: 'a-propos.png',               pillar: 'marque',    label: 'À propos',                        title: 'David Khazaei',                        subtitle: 'Fondateur DKDP · Genève · Depuis 2015' },
  { file: 'blog.png',                   pillar: 'marque',    label: 'Blog DKDP',                       title: 'Ressources IA & digital',         subtitle: 'Conseils SEO · Intelligence artificielle · Formation', size: 'smaller' },
  { file: 'glossaire.png',              pillar: 'ia',        label: 'Glossaire',                       title: 'Lexique IA & digital',            subtitle: '65+ termes expliqués pour les PME romandes',     size: 'smaller' },
  { file: 'formation-particuliers.png', pillar: 'formation', label: 'Formation Particuliers',          title: 'Cours informatique à domicile',   subtitle: 'Excel · IA · Smartphone · Cybersécurité',        size: 'smallest' },
  { file: 'realisations.png',           pillar: 'marque',    label: 'Réalisations',                    title: 'Nos projets clients',                  subtitle: 'Sites web · Apps · Solutions IA pour PME suisses', size: 'smaller' },

  // Lead-gen pages
  { file: 'audit-seo.png',              pillar: 'agence',    label: 'Audit SEO · Gratuit',             title: 'Audit SEO complet',                    subtitle: 'Mots-clés · Technique · Contenu · Backlinks · Sous 48h' },
  { file: 'audit-site.png',             pillar: 'agence',    label: 'Audit Site · Gratuit',            title: 'Audit de site web',                    subtitle: 'Performance · SEO · UX · Mobile · Sécurité' },
  { file: 'estimation-site-web.png',    pillar: 'agence',    label: 'Estimation · Gratuit',            title: 'Estimer mon site web',                 subtitle: 'Simulateur interactif · Devis détaillé sous 48h', size: 'smaller' },

  // Ville pages — generic, used by all city pages
  { file: 'agence-digitale-ville.png',  pillar: 'agence',    label: 'Agence digitale · Suisse romande', title: 'Sites web, SEO & IA',             subtitle: 'Genève · Lausanne · Nyon · Fribourg · Sion · Neuchâtel', size: 'smaller' },
]

async function renderOne(browser, page) {
  const pillar = PILLARS[page.pillar]
  const ctx = await browser.newContext({ viewport: { width: 1376, height: 768 }, deviceScaleFactor: 2 })
  const tab = await ctx.newPage()
  const html = TEMPLATE
  await tab.setContent(html, { waitUntil: 'load' })

  // Wait for fonts
  await tab.evaluate(() => document.fonts.ready)

  await tab.evaluate(({ pillar, page }) => {
    const root = document.documentElement
    root.style.setProperty('--bg', pillar.bg)
    root.style.setProperty('--accent', pillar.accent)
    root.style.setProperty('--accent-soft', pillar.accentSoft)
    root.style.setProperty('--accent2', pillar.accent2)
    root.style.setProperty('--border', pillar.border)

    const titleEl = document.getElementById('title')
    titleEl.textContent = page.title
    if (page.size === 'smaller') titleEl.classList.add('smaller')
    if (page.size === 'smallest') titleEl.classList.add('smallest')

    document.getElementById('pillar').textContent = page.label

    // Subtitle: split on " · " to add styled separators
    const sub = document.getElementById('subtitle')
    sub.innerHTML = ''
    const parts = page.subtitle.split(' · ')
    parts.forEach((p, i) => {
      sub.append(document.createTextNode(p))
      if (i < parts.length - 1) {
        const s = document.createElement('span')
        s.className = 'sep'
        s.textContent = '·'
        sub.append(s)
      }
    })
  }, { pillar, page })

  // Force re-layout
  await tab.waitForTimeout(150)

  const out = page.file === 'realisations.png'
    ? resolve(ROOT_OUT, 'og-realisations.png')
    : resolve(OUT_DIR, page.file)

  await tab.screenshot({ path: out, omitBackground: false, type: 'png' })
  await ctx.close()

  // Also save copy of realisations to og folder for clarity
  if (page.file === 'realisations.png') {
    await tab.screenshot({ path: resolve(OUT_DIR, 'realisations.png') }).catch(() => {})
  }

  return out
}

const browser = await chromium.launch()
console.log(`Generating ${PAGES.length} OG images...`)
for (const p of PAGES) {
  const path = await renderOne(browser, p)
  console.log(`  ✓ ${p.file} → ${path}`)
}
await browser.close()
console.log('Done.')
