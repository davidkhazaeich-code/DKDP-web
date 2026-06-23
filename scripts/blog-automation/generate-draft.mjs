#!/usr/bin/env node
/**
 * Blog draft generator — DKDP
 * -----------------------------------------------------------------------------
 * Pioche la prochaine idée "À rédiger" dans la base Notion, génère un article
 * on-brand avec l'API Anthropic, écrit src/lib/blog/<slug>.ts, l'enregistre dans
 * index.ts, et prépare le corps de la Pull Request. La création de branche/PR et
 * la mise à jour du statut Notion sont gérées par le workflow GitHub Action.
 *
 * Tout le contenu reste une PROPOSITION : rien n'est publié. David relit la PR
 * (+ preview Vercel) avant de merger.
 *
 * Variables d'environnement :
 *   NOTION_API_KEY            (requis)  Token d'intégration interne Notion
 *   NOTION_BLOG_IDEAS_DB_ID   (requis)  ID de la base "Idées blog"
 *   ANTHROPIC_API_KEY         (requis)  Clé API Anthropic
 *   BLOG_MODEL                (option)  Modèle (def. claude-sonnet-4-6)
 *   ANTHROPIC_BASE_URL        (option)  def. https://api.anthropic.com
 *   IDEA_STATUS_TODO          (option)  Libellé du statut "à rédiger" (def. "À rédiger")
 *   GITHUB_OUTPUT             (auto)    Fourni par GitHub Actions
 */

import { Client } from '@notionhq/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const BLOG_DIR = path.join(ROOT, 'src/lib/blog')
const INDEX_FILE = path.join(BLOG_DIR, 'index.ts')
const PR_BODY_FILE = path.join(ROOT, '.blog-automation-pr-body.md')

const MODEL = process.env.BLOG_MODEL || 'claude-sonnet-4-6'
const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com'
const STATUS_TODO = process.env.IDEA_STATUS_TODO || 'À rédiger'

const CATEGORY_MAP = {
  ia: 'ia', 'intelligence artificielle': 'ia',
  seo: 'seo', 'seo & visibilité': 'seo', 'référencement': 'seo',
  formation: 'formation',
  outils: 'outils', 'outils & productivité': 'outils', productivité: 'outils',
}

/* ───────────────────────── helpers ───────────────────────── */

function fail(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

function setOutput(key, value) {
  if (!process.env.GITHUB_OUTPUT) return
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`)
}

/** Notion plain text from a title/rich_text property */
function plain(prop) {
  if (!prop) return ''
  const arr = prop.title || prop.rich_text || []
  return arr.map((t) => t.plain_text).join('').trim()
}

function selectName(prop) {
  return prop?.select?.name || prop?.status?.name || ''
}

function stripDiacritics(str) {
  // NFD décompose les accents en lettre + marque combinante (U+0300–U+036F),
  // qu'on retire par filtrage de code-point (robuste, sans regex unicode).
  return str.normalize('NFD').split('').filter((c) => {
    const code = c.charCodeAt(0)
    return code < 0x0300 || code > 0x036f
  }).join('')
}

function slugify(str) {
  return stripDiacritics(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .replace(/-+$/g, '')
}

function uniqueSlug(base) {
  let slug = base
  let n = 2
  while (fs.existsSync(path.join(BLOG_DIR, `${slug}.ts`))) {
    slug = `${base}-${n++}`
  }
  return slug
}

/** Identifiant JS unique et valide dérivé du slug, ex: art + PascalCase */
function importIdent(slug) {
  const pascal = slug.split('-').filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
  return `art${pascal}`.replace(/[^A-Za-z0-9_$]/g, '')
}

function readTimeFrom(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(4, Math.round(words / 200))} min`
}

/** Date du jour à Genève → { dateFr, dateISO } */
function todayZurich() {
  const tz = 'Europe/Zurich'
  const now = new Date()
  const dateFr = new Intl.DateTimeFormat('fr-CH', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: tz,
  }).format(now)
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: tz,
  }).formatToParts(now)
  const get = (t) => parts.find((p) => p.type === t).value
  const dateISO = `${get('year')}-${get('month')}-${get('day')}`
  return { dateFr, dateISO }
}

/** Extrait le premier objet JSON d'une chaîne (tolérant aux fences) */
function extractJson(text) {
  let t = text.trim()
  if (t.startsWith('```')) t = t.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim()
  const start = t.indexOf('{')
  const end = t.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('Aucun JSON trouvé dans la réponse du modèle.')
  return JSON.parse(t.slice(start, end + 1))
}

/* ───────────────────────── Notion ───────────────────────── */

async function resolveDataSourceId(notion, id) {
  // API Notion 2025-09-03 (@notionhq/client v5) : les requêtes passent par
  // les "data sources". L'ID fourni peut être soit un data source, soit une base.
  if (process.env.NOTION_BLOG_IDEAS_DATASOURCE_ID) return process.env.NOTION_BLOG_IDEAS_DATASOURCE_ID
  try {
    await notion.dataSources.retrieve({ data_source_id: id })
    return id // c'était déjà un data source
  } catch (_) { /* sinon, on tente comme database */ }
  const db = await notion.databases.retrieve({ database_id: id })
  const ds = db.data_sources?.[0]?.id
  if (!ds) fail('Impossible de résoudre le data source de la base Notion (NOTION_BLOG_IDEAS_DB_ID).')
  return ds
}

async function fetchNextIdea(notion, dbId) {
  // On filtre côté code pour rester robuste quel que soit le type exact
  // de la propriété "Statut" (select ou status) et son nom de colonne.
  const dataSourceId = await resolveDataSourceId(notion, dbId)
  const res = await notion.dataSources.query({
    data_source_id: dataSourceId,
    page_size: 25,
    sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
  })
  for (const page of res.results) {
    const props = page.properties || {}
    const statusProp = props['Statut'] || props['Status'] || props['Statut éditorial']
    if (selectName(statusProp).trim().toLowerCase() === STATUS_TODO.toLowerCase()) {
      return { page, props }
    }
  }
  return null
}

function readIdea(props) {
  const titleProp = Object.values(props).find((p) => p.type === 'title')
  return {
    title: plain(titleProp),
    category: selectName(props['Catégorie'] || props['Categorie'] || props['Category']),
    brief: plain(props['Brief'] || props['Notes'] || props['Description']),
    mainKw: plain(props['Mot-clé principal'] || props['Mot-cle principal'] || props['Mot-clé']),
    secondaryKw: plain(props['Mots-clés secondaires'] || props['Mots-cles secondaires']),
    slug: plain(props['Slug']),
  }
}

/* ───────────────────────── Anthropic ───────────────────────── */

async function generateArticle(system, idea) {
  const userPrompt = [
    'Voici le brief pour le nouvel article. Rédige-le selon tes instructions système.',
    '',
    `Titre / angle souhaité : ${idea.title}`,
    idea.category ? `Catégorie : ${idea.category}` : '',
    idea.mainKw ? `Mot-clé principal : ${idea.mainKw}` : '',
    idea.secondaryKw ? `Mots-clés secondaires : ${idea.secondaryKw}` : '',
    '',
    'Brief détaillé :',
    idea.brief || '(pas de brief détaillé — développe l\'angle du titre de façon utile et concrète pour une PME romande)',
    '',
    'Rappel : réponds UNIQUEMENT avec l\'objet JSON du schéma <sortie>, rien d\'autre.',
  ].filter((l) => l !== '').join('\n')

  const res = await fetch(`${ANTHROPIC_BASE_URL}/v1/messages`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      temperature: 0.7,
      system,
      messages: [
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: '{' }, // prefill → force une sortie JSON
      ],
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Anthropic API ${res.status} : ${body.slice(0, 500)}`)
  }
  const data = await res.json()
  const text = '{' + (data.content?.map((b) => b.text || '').join('') || '')
  return extractJson(text)
}

/* ───────────────────────── écriture fichiers ───────────────────────── */

function buildArticleFile(article) {
  const f = (v) => JSON.stringify(v)
  return `import type { Article } from './types'

const article: Article = {
  slug: ${f(article.slug)},
  category: ${f(article.category)},
  title: ${f(article.title)},
  excerpt: ${f(article.excerpt)},
  date: ${f(article.date)},
  dateISO: ${f(article.dateISO)},
  readTime: ${f(article.readTime)},
  author: ${f(article.author)},
  heroImage: ${JSON.stringify(article.heroImage, null, 2).replace(/\n/g, '\n  ')},
  images: ${JSON.stringify(article.images)},
  content: ${f(article.content)},
  tags: ${f(article.tags)},
  seoTitle: ${f(article.seoTitle)},
  seoDescription: ${f(article.seoDescription)},
}

export default article
`
}

function registerInIndex(slug, ident) {
  let src = fs.readFileSync(INDEX_FILE, 'utf8')
  const IMPORT_ANCHOR = '// <blog-automation:imports>'
  const ARTICLE_ANCHOR = '// <blog-automation:articles>'

  if (!src.includes(IMPORT_ANCHOR) || !src.includes(ARTICLE_ANCHOR)) {
    fail(
      `Ancres manquantes dans index.ts. Ajoute "${IMPORT_ANCHOR}" après le dernier import ` +
      `et "${ARTICLE_ANCHOR}" juste après "export const ARTICLES: Article[] = [".`
    )
  }
  if (src.includes(`from './${slug}'`)) {
    fail(`L'article "${slug}" est déjà référencé dans index.ts.`)
  }

  src = src.replace(IMPORT_ANCHOR, `import ${ident} from './${slug}'\n${IMPORT_ANCHOR}`)
  src = src.replace(ARTICLE_ANCHOR, `${ARTICLE_ANCHOR}\n  ${ident},`)
  fs.writeFileSync(INDEX_FILE, src)
}

/** Place un visuel placeholder pour que la PR/preview ne montre pas d'image cassée */
function placeHeroPlaceholder(slug) {
  const target = path.join(ROOT, 'public/images/blog', `${slug}-hero.png`)
  const candidates = [
    path.join(ROOT, 'public/images/og/blog.png'),
    path.join(ROOT, 'public/og-image.png'),
  ]
  const source = candidates.find((c) => fs.existsSync(c))
  if (source && !fs.existsSync(target)) {
    fs.copyFileSync(source, target)
    return `/images/blog/${slug}-hero.png`
  }
  // Pas de placeholder dispo : on garde le chemin cible (image à fournir au review)
  return `/images/blog/${slug}-hero.png`
}

/* ───────────────────────── main ───────────────────────── */

async function main() {
  for (const k of ['NOTION_API_KEY', 'NOTION_BLOG_IDEAS_DB_ID', 'ANTHROPIC_API_KEY']) {
    if (!process.env[k]) fail(`Variable d'environnement manquante : ${k}`)
  }

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const dbId = process.env.NOTION_BLOG_IDEAS_DB_ID

  console.log(`→ Recherche d'une idée au statut "${STATUS_TODO}"…`)
  const next = await fetchNextIdea(notion, dbId)
  if (!next) {
    console.log('✓ Aucune idée à rédiger. Rien à faire.')
    setOutput('created', 'false')
    return
  }

  const idea = readIdea(next.props)
  if (!idea.title) fail('L\'idée sélectionnée n\'a pas de titre.')
  console.log(`→ Idée : "${idea.title}"`)

  const categoryKey = CATEGORY_MAP[(idea.category || '').trim().toLowerCase()] || 'ia'
  if (!CATEGORY_MAP[(idea.category || '').trim().toLowerCase()]) {
    console.warn(`⚠ Catégorie "${idea.category}" non reconnue → fallback "ia". (Attendu : IA, SEO, Formation, Outils)`)
  }

  const slug = uniqueSlug(idea.slug ? slugify(idea.slug) : slugify(idea.title))
  const ident = importIdent(slug)
  console.log(`→ Slug : ${slug}`)

  const system = fs.readFileSync(path.join(__dirname, 'system-prompt.md'), 'utf8')
  console.log(`→ Génération via ${MODEL}…`)
  const gen = await generateArticle(system, idea)

  for (const k of ['title', 'excerpt', 'content', 'seoTitle', 'seoDescription']) {
    if (!gen[k] || typeof gen[k] !== 'string') fail(`Champ "${k}" manquant ou invalide dans la sortie du modèle.`)
  }

  const { dateFr, dateISO } = todayZurich()
  const heroSrc = placeHeroPlaceholder(slug)

  const article = {
    slug,
    category: categoryKey,
    title: gen.title.trim(),
    excerpt: gen.excerpt.trim(),
    date: dateFr,
    dateISO,
    readTime: readTimeFrom(gen.content),
    author: 'David Khazaei',
    heroImage: { src: heroSrc, alt: (gen.suggestedHeroAlt || gen.title).trim() },
    images: [],
    content: gen.content.trim(),
    tags: Array.isArray(gen.tags) ? gen.tags.slice(0, 7) : [],
    seoTitle: gen.seoTitle.trim(),
    seoDescription: gen.seoDescription.trim(),
  }

  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.ts`), buildArticleFile(article))
  registerInIndex(slug, ident)
  console.log(`✓ Écrit src/lib/blog/${slug}.ts + enregistré dans index.ts`)

  // Corps de la PR (relecture humaine)
  const prBody = [
    `## 📝 Brouillon d'article généré automatiquement`,
    ``,
    `**Idée source (Notion) :** ${idea.title}`,
    `**Catégorie :** ${article.category}  ·  **Temps de lecture estimé :** ${article.readTime}`,
    ``,
    `### À relire avant merge`,
    `- [ ] Fond : exactitude, angle, exemples, chiffres (CHF, dates, sources)`,
    `- [ ] Ton DKDP : direct, sans superlatifs, pas de tournures IA`,
    `- [ ] SEO : titre (${article.seoTitle.length} car.), méta (${article.seoDescription.length} car.), mot-clé bien placé`,
    `- [ ] **Visuel hero** : remplacer le placeholder \`public/images/blog/${slug}-hero.png\` par le vrai visuel`,
    `- [ ] Liens internes vers les pages de services pertinentes`,
    ``,
    `### Prompt visuel suggéré`,
    `> ${(gen.suggestedHeroImagePrompt || '—').replace(/\n/g, ' ')}`,
    ``,
    `**Alt hero proposé :** ${article.heroImage.alt}`,
    ``,
    `### Tags`,
    article.tags.map((t) => `\`${t}\``).join(' · ') || '—',
    ``,
    `---`,
    `_Généré par \`.github/workflows/blog-draft.yml\`. Le preview Vercel de cette PR montre le rendu réel. Merge = publication._`,
  ].join('\n')
  fs.writeFileSync(PR_BODY_FILE, prBody)

  setOutput('created', 'true')
  setOutput('slug', slug)
  setOutput('branch', `blog/${slug}`)
  setOutput('title', article.title.replace(/[\r\n]/g, ' '))
  setOutput('notion_page_id', next.page.id)
  console.log('✓ Métadonnées PR prêtes.')
}

// N'exécute main() que lancé directement (permet d'importer les helpers pour les tests)
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => fail(e.stack || e.message))
}

export {
  slugify, importIdent, readTimeFrom, todayZurich,
  extractJson, buildArticleFile, CATEGORY_MAP,
}
