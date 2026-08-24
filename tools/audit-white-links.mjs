/**
 * Audit statique des couleurs de liens.
 *
 * Parse chaque balise ouvrante <Link> / <a>, en extrait le className, et classe :
 *   FULL    couleur pleine au repos (text-text / text-white) : doit passer en gris
 *   NOHOVER gris au repos mais aucun etat de survol
 *   ODD     survol vers autre chose que la couleur pleine
 *
 *   node tools/audit-white-links.mjs [--all]
 */
import fs from 'node:fs'
import path from 'node:path'

const files = []
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.tsx$/.test(e.name)) files.push(p)
  }
}
walk('src')

/** Lit la balise ouvrante complete a partir de l'index du '<'. */
function readOpenTag(src, start) {
  let i = start
  let depth = 0
  let quote = null
  while (i < src.length) {
    const c = src[i]
    if (quote) {
      if (c === quote && src[i - 1] !== '\\') quote = null
    } else if (c === '"' || c === "'" || c === '`') {
      quote = c
    } else if (c === '{') depth++
    else if (c === '}') depth--
    else if (c === '>' && depth === 0) return src.slice(start, i + 1)
    i++
  }
  return null
}

const AT_REST_FULL = /(^|[\s"'`{])(text-text|text-white)(?![-\w/])/
const AT_REST_GRAY = /(^|[\s"'`{])(text-text-secondary|text-text-muted|text-zinc-[3-6]00)(?![-\w])/
const HOVER_FULL = /(hover|group-hover|active):(text-text(?![-\w])|text-white(?![-\w])|\[color:var\(--text\)\])/
const HOVER_ANY = /(hover|group-hover|active):/

const out = { FULL: [], NOHOVER: [], ODD: [] }

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const re = /<(Link|a)[\s>]/g
  let m
  while ((m = re.exec(src))) {
    const tag = readOpenTag(src, m.index)
    if (!tag) continue
    const cn = tag.match(/className=(?:"([^"]*)"|\{`([^`]*)`\}|\{cn\(([\s\S]*?)\)\}|\{([^}]*)\})/)
    const cls = cn ? (cn[1] || cn[2] || cn[3] || cn[4] || '') : ''
    if (!cls) continue
    const line = src.slice(0, m.index).split('\n').length
    const rec = { file: f, line, cls: cls.replace(/\s+/g, ' ').trim() }
    // Les elements avec un fond/bordure/padding sont des boutons ou des cartes, pas des liens textuels
    const isButtonish = /\b(rounded|border|px-\d|py-\d|bg-)/.test(cls)
    if (AT_REST_FULL.test(cls) && !HOVER_FULL.test(cls)) out.FULL.push({ ...rec, isButtonish })
    else if (AT_REST_GRAY.test(cls) && !HOVER_ANY.test(cls)) out.NOHOVER.push({ ...rec, isButtonish })
    else if (AT_REST_GRAY.test(cls) && HOVER_ANY.test(cls) && !HOVER_FULL.test(cls)) out.ODD.push({ ...rec, isButtonish })
  }
}

const showAll = process.argv.includes('--all')
for (const [k, list] of Object.entries(out)) {
  const shown = showAll ? list : list.filter((h) => !h.isButtonish)
  console.log(`\n\n########## ${k} : ${shown.length}${showAll ? '' : ` (sur ${list.length}, boutons/cartes masques)`} ##########`)
  const byFile = new Map()
  for (const h of shown) {
    if (!byFile.has(h.file)) byFile.set(h.file, [])
    byFile.get(h.file).push(h)
  }
  for (const [f, hs] of [...byFile].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${f}  (${hs.length})`)
    hs.forEach((h) => console.log(`  L${h.line}  ${h.cls.slice(0, 160)}`))
  }
}
