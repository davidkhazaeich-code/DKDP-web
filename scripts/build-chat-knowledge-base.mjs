/**
 * Auto-génération de la base de connaissances du chatbot DKDP.
 *
 * Crawle dkdp.ch (ou SITE_URL) via le sitemap, extrait le contenu
 * principal de chaque page, le convertit en markdown propre et
 * l'écrit dans src/data/chat-knowledge-base.ts.
 *
 * Exécution locale : npm run build:kb
 * Exécution CI :    via .github/workflows/update-chat-kb.yml
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'
import TurndownService from 'turndown'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT = join(ROOT, 'src/data/chat-knowledge-base.ts')
const SITE_URL = process.env.SITE_URL ?? 'https://dkdp.ch'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

// ─── Pages exclues de la KB ─────────────────────────────────────────────────
// On crawle tout le sitemap mais on skip les pages sans valeur informative
// pour le chatbot (pages légales, pages de liste, pages utilitaires).
const EXCLUDED_PATHS = new Set([
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/conditions-generales-de-vente',
  '/rgpd-cookies',
  '/plan-du-site',
])

const EXCLUDED_PREFIXES = [
  '/blog/', // individuels, trop nombreux, traités séparément si besoin
]

// ─── Ordre d'affichage dans la KB ───────────────────────────────────────────
// Les pages importantes en premier pour que le chatbot les privilégie.
const URL_PRIORITY = [
  '/',
  '/tarifs',
  '/a-propos',
  '/contact',
  '/agence-digitale',
  '/intelligence-artificielle',
  '/formation-entreprise',
]

function getPriority(url) {
  const path = new URL(url).pathname
  const idx = URL_PRIORITY.indexOf(path)
  if (idx >= 0) return idx
  if (path.startsWith('/agence-digitale/')) return 100
  if (path.startsWith('/intelligence-artificielle/')) return 200
  if (path.startsWith('/formation-entreprise/')) return 300
  return 500
}

function isExcluded(url) {
  const path = new URL(url).pathname
  if (EXCLUDED_PATHS.has(path)) return true
  return EXCLUDED_PREFIXES.some((p) => path.startsWith(p))
}

// ─── 1. Récupère la liste des URLs depuis le sitemap ────────────────────────

async function fetchSitemap() {
  console.log(`📡 Fetching sitemap: ${SITEMAP_URL}`)
  const res = await fetch(SITEMAP_URL)
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  const $ = cheerio.load(xml, { xmlMode: true })
  const urls = []
  $('url > loc').each((_, el) => {
    const url = $(el).text().trim()
    if (url && !isExcluded(url)) urls.push(url)
  })
  urls.sort((a, b) => getPriority(a) - getPriority(b))
  console.log(`✓ ${urls.length} URLs retenues (après exclusion)`)
  return urls
}

// ─── 2. Configure turndown pour du markdown propre ──────────────────────────

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
})

// On garde uniquement le texte et la structure — pas de liens (le bot
// utilise la mappe de liens internes statique), pas d'images.
turndown.addRule('stripLinks', {
  filter: ['a'],
  replacement: (content) => content,
})
turndown.addRule('stripImages', {
  filter: ['img', 'picture', 'svg'],
  replacement: () => '',
})

// ─── 3. Extrait le contenu principal d'une page HTML ────────────────────────

function extractContent(html, url) {
  const $ = cheerio.load(html)

  // Retire tout ce qui n'est pas du contenu informatif
  $('header, footer, nav, script, style, noscript, iframe').remove()
  $('[role="navigation"], [role="banner"], [role="contentinfo"]').remove()
  $('.chat-widget, #chat-widget, [data-chat]').remove()

  // Cible le main ou fallback sur body
  const main = $('main').first()
  const source = main.length ? main : $('body')

  // Titre de la page
  const title = $('title').text().trim() ||
    $('h1').first().text().trim() ||
    url

  // H1 principal pour référence
  const h1 = $('h1').first().text().trim()

  // Meta description (utile pour résumé court)
  const metaDesc = $('meta[name="description"]').attr('content')?.trim() ?? ''

  // Conversion HTML → markdown
  const markdown = turndown
    .turndown(source.html() ?? '')
    .replace(/\n{3,}/g, '\n\n') // normalise les sauts de ligne
    .replace(/[ \t]+\n/g, '\n') // trim trailing whitespace
    .trim()

  return { title, h1, metaDesc, markdown }
}

// ─── 4. Fetch concurrent avec limite ────────────────────────────────────────

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      try {
        results[idx] = await fn(items[idx], idx)
      } catch (err) {
        console.error(`  ✗ [${idx}] ${items[idx]}: ${err.message}`)
        results[idx] = null
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, worker))
  return results.filter(Boolean)
}

// ─── 5. Orchestration ───────────────────────────────────────────────────────

async function main() {
  const started = Date.now()
  const urls = await fetchSitemap()

  console.log(`🕷  Crawl de ${urls.length} pages (concurrence 5)...`)
  const pages = await mapWithConcurrency(urls, 5, async (url) => {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DKDP-Chatbot-KB-Builder/1.0' },
    })
    if (!res.ok) {
      console.log(`  ⚠  ${url} (${res.status})`)
      return null
    }
    const html = await res.text()
    const extracted = extractContent(html, url)
    console.log(`  ✓ ${new URL(url).pathname} (${extracted.markdown.length} chars)`)
    return { url, ...extracted }
  })

  // ─── 6. Assemble la knowledge base ────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10)
  const sections = pages.map((p) => {
    const path = new URL(p.url).pathname
    return `
---

## Page : ${path}

**Titre** : ${p.title}
${p.metaDesc ? `**Description** : ${p.metaDesc}\n` : ''}
${p.markdown}
`.trim()
  })

  const kbContent = `
# Base de connaissances DKDP (contenu actuel du site)

Source : crawl automatique de ${SITE_URL} le ${today}
Pages incluses : ${pages.length}

${sections.join('\n\n')}
`.trim()

  // ─── 7. Écrit le fichier TS importable ────────────────────────────────────
  const outDir = dirname(OUTPUT)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  const tsContent = `/**
 * Base de connaissances du chatbot DKDP.
 *
 * ⚠ FICHIER AUTO-GÉNÉRÉ — NE PAS ÉDITER MANUELLEMENT.
 * Regénéré chaque nuit par .github/workflows/update-chat-kb.yml
 * Ou à la demande : \`npm run build:kb\`
 *
 * Source : ${SITE_URL}
 * Dernière mise à jour : ${today}
 * Pages crawlées : ${pages.length}
 */

export const CHAT_KNOWLEDGE_BASE_UPDATED_AT = '${today}'
export const CHAT_KNOWLEDGE_BASE_PAGES_COUNT = ${pages.length}

export const CHAT_KNOWLEDGE_BASE = ${JSON.stringify(kbContent)}
`

  writeFileSync(OUTPUT, tsContent, 'utf8')

  const elapsed = ((Date.now() - started) / 1000).toFixed(1)
  console.log(`\n✓ KB générée en ${elapsed}s`)
  console.log(`  → ${OUTPUT}`)
  console.log(`  → ${pages.length} pages, ${kbContent.length} chars (${(kbContent.length / 4).toFixed(0)} tokens approx)`)
}

main().catch((err) => {
  console.error('✗ Build KB échoué :', err)
  process.exit(1)
})
