import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildArticle, buildBreadcrumbList } from '@/lib/schema'
import {
  ARTICLES,
  getArticle,
  getRelatedArticles,
  BLOG_CATEGORIES,
  type CategoryKey,
} from '@/lib/blog-data'

/* ─────────────────────────────────────────────
   Design tokens
───────────────────────────────────────────── */
const violet   = '#A78BFA'
const violetBg = 'rgba(124,58,237,0.08)'
const violetBd = 'rgba(124,58,237,0.20)'
const chrome   = '#D4D4D8'
const chromeBg = 'rgba(212,212,216,0.06)'
const chromeBd = 'rgba(212,212,216,0.14)'
const orange   = '#FF8C00'
const orangeBg = 'rgba(255,107,0,0.08)'
const orangeBd = 'rgba(255,107,0,0.18)'

/* ─────────────────────────────────────────────
   Static params
───────────────────────────────────────────── */
export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: `https://dkdp.ch/blog/${slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: `https://dkdp.ch/blog/${slug}`,
      type: 'article',
      publishedTime: article.dateISO,
      images: article.heroImage.src
        ? [{ url: `https://dkdp.ch${article.heroImage.src}` }]
        : [],
    },
  }
}

/* ─────────────────────────────────────────────
   Internal service CTAs
───────────────────────────────────────────── */
interface ServiceLink {
  label: string
  href: string
  desc: string
  color: string
  bg: string
  border: string
}

const ALL_SERVICES: ServiceLink[] = [
  {
    label: 'Création de site web',
    href: '/agence-digitale/creation-site-web',
    desc: 'Sites performants, SEO-first et adaptatifs pour votre PME.',
    color: violet, bg: violetBg, border: violetBd,
  },
  {
    label: 'SEO & Référencement',
    href: '/agence-digitale/seo',
    desc: 'Visibilité locale et nationale sur Google, durable et mesurable.',
    color: violet, bg: violetBg, border: violetBd,
  },
  {
    label: 'Audit & Conseil IA',
    href: '/intelligence-artificielle/audit-conseil',
    desc: 'Identifiez vos opportunités IA concrètes en 1 session.',
    color: chrome, bg: chromeBg, border: chromeBd,
  },
  {
    label: 'Automatisation IA',
    href: '/intelligence-artificielle/automatisation',
    desc: 'Workflows automatisés qui libèrent vos équipes des tâches répétitives.',
    color: chrome, bg: chromeBg, border: chromeBd,
  },
  {
    label: 'Formation IA entreprise',
    href: '/formation-entreprise/ia',
    desc: 'Formez vos collaborateurs aux outils IA adaptés à leur métier.',
    color: orange, bg: orangeBg, border: orangeBd,
  },
  {
    label: 'Formation cybersécurité',
    href: '/formation-entreprise/cybersecurite',
    desc: 'Sensibilisez vos équipes aux risques et aux bons réflexes.',
    color: orange, bg: orangeBg, border: orangeBd,
  },
]

const CATEGORY_SERVICES: Record<CategoryKey, string[]> = {
  ia: [
    '/intelligence-artificielle/audit-conseil',
    '/intelligence-artificielle/automatisation',
    '/formation-entreprise/ia',
  ],
  seo: [
    '/agence-digitale/seo',
    '/agence-digitale/creation-site-web',
    '/intelligence-artificielle/audit-conseil',
  ],
  formation: [
    '/formation-entreprise/ia',
    '/formation-entreprise/cybersecurite',
    '/intelligence-artificielle/audit-conseil',
  ],
  outils: [
    '/agence-digitale/creation-site-web',
    '/intelligence-artificielle/automatisation',
    '/agence-digitale/seo',
  ],
}

function getServicesForCategory(category: CategoryKey): ServiceLink[] {
  const hrefs = CATEGORY_SERVICES[category]
  return hrefs.map(href => ALL_SERVICES.find(s => s.href === href)!).filter(Boolean)
}

/* ─────────────────────────────────────────────
   Markdown → HTML renderer
───────────────────────────────────────────── */

/** Apply inline formatting: bold, italic, inline-code, links */
function applyInline(text: string): string {
  return text
    // Escaped backticks from template literals \` -> just remove the backslash
    .replace(/\\`([^\\`]+)\\`/g, '<code class="px-1.5 py-0.5 rounded text-xs font-mono bg-zinc-800 text-violet-300 border border-zinc-700">$1</code>')
    // Markdown links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors">$1</a>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="text-zinc-300 italic">$1</em>')
}

/** Parse and render a block of Markdown table lines */
function renderTable(rows: string[]): string {
  const isHeaderSep = (r: string) => /^\|[\s\-|:]+\|$/.test(r.trim())
  const parseRow = (r: string) =>
    r.split('|').slice(1, -1).map(c => c.trim())

  const sepIdx = rows.findIndex(isHeaderSep)

  if (sepIdx === -1) {
    // No header separator — plain body table
    let html = '<div class="overflow-x-auto my-8 rounded-[14px] border border-zinc-800"><table class="w-full text-sm border-collapse"><tbody>'
    for (const row of rows) {
      html += '<tr class="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors">'
      for (const cell of parseRow(row)) {
        html += `<td class="py-3 px-5 text-zinc-400">${applyInline(cell)}</td>`
      }
      html += '</tr>'
    }
    return html + '</tbody></table></div>'
  }

  const headerRows = rows.slice(0, sepIdx)
  const bodyRows   = rows.slice(sepIdx + 1)

  let html = '<div class="overflow-x-auto my-8 rounded-[14px] border border-zinc-800 bg-zinc-900/40"><table class="w-full text-sm border-collapse">'

  // Header
  html += '<thead><tr>'
  for (const cell of parseRow(headerRows[0] ?? '')) {
    html += `<th class="text-left py-3 px-5 text-white font-semibold bg-zinc-800/70 border-b border-zinc-700 whitespace-nowrap text-xs uppercase tracking-wide">${applyInline(cell)}</th>`
  }
  html += '</tr></thead>'

  // Body
  html += '<tbody>'
  for (let i = 0; i < bodyRows.length; i++) {
    const bg = i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-transparent'
    html += `<tr class="${bg} border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">`
    const cells = parseRow(bodyRows[i])
    for (let j = 0; j < cells.length; j++) {
      const isFirst = j === 0
      html += `<td class="py-3 px-5 ${isFirst ? 'text-zinc-200 font-medium' : 'text-zinc-400'}">${applyInline(cells[j])}</td>`
    }
    html += '</tr>'
  }
  html += '</tbody>'

  return html + '</table></div>'
}

/** Full Markdown → HTML string, with table support */
function renderMarkdown(md: string): string {
  const lines = md.split('\n')
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Image marker (pass through verbatim — handled in JSX)
    if (line.startsWith('___IMG:')) {
      out.push(line)
      i++
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Table: consecutive lines starting with |
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      out.push(renderTable(tableLines))
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      out.push(
        `<h3 class="text-lg font-bold text-white mt-8 mb-3">${applyInline(line.slice(4))}</h3>`
      )
      i++
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      out.push(
        `<h2 class="text-2xl font-black text-white mt-12 mb-4 pb-3 border-b border-zinc-800">${applyInline(line.slice(3))}</h2>`
      )
      i++
      continue
    }

    // H1
    if (line.startsWith('# ')) {
      out.push(
        `<h1 class="text-3xl font-black text-white mt-10 mb-4">${applyInline(line.slice(2))}</h1>`
      )
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      out.push(
        `<blockquote class="my-5 pl-5 border-l-[3px] border-violet-500 text-zinc-400 italic leading-relaxed">${applyInline(line.slice(2))}</blockquote>`
      )
      i++
      continue
    }

    // Horizontal rule
    if (line.trim() === '---') {
      out.push('<hr class="border-zinc-800 my-10" />')
      i++
      continue
    }

    // Unordered list — collect consecutive items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        const text = lines[i].startsWith('- ') ? lines[i].slice(2) : lines[i].slice(2)
        items.push(
          `<li class="flex items-start gap-3 text-zinc-400 leading-relaxed">`
          + `<span class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style="background:#A78BFA"></span>`
          + `<span>${applyInline(text)}</span></li>`
        )
        i++
      }
      out.push(`<ul class="my-5 space-y-2 pl-1">${items.join('')}</ul>`)
      continue
    }

    // Ordered list — collect consecutive items
    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      let num = 1
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        const text = lines[i].replace(/^\d+\. /, '')
        items.push(
          `<li class="flex items-start gap-3 text-zinc-400 leading-relaxed">`
          + `<span class="shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5" style="background:rgba(124,58,237,0.18);color:#A78BFA">${num}</span>`
          + `<span>${applyInline(text)}</span></li>`
        )
        i++
        num++
      }
      out.push(`<ol class="my-5 space-y-3 pl-1">${items.join('')}</ol>`)
      continue
    }

    // Regular paragraph
    out.push(`<p class="text-zinc-400 leading-[1.8] mb-4">${applyInline(line)}</p>`)
    i++
  }

  return out.join('\n')
}

/* ─────────────────────────────────────────────
   Inline CTA banner (mid-article)
───────────────────────────────────────────── */
function InlineCTA({ service }: { service: ServiceLink }) {
  return (
    <aside
      className="my-10 rounded-[16px] border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      style={{ background: service.bg, borderColor: service.border }}
    >
      {/* Icon dot */}
      <div
        className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: service.border }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke={service.color} strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="text-[10px] font-bold uppercase tracking-widest mb-1 block"
          style={{ color: service.color }}
        >
          Service DKDP
        </span>
        <p className="text-white font-semibold text-sm mb-1">{service.label}</p>
        <p className="text-zinc-400 text-xs leading-relaxed">{service.desc}</p>
      </div>
      <Link
        href={service.href}
        className="shrink-0 text-xs font-bold px-4 py-2 rounded-[8px] transition-opacity hover:opacity-80 whitespace-nowrap"
        style={{ background: service.color, color: '#09090B' }}
      >
        En savoir plus
      </Link>
    </aside>
  )
}

/* ─────────────────────────────────────────────
   End-of-article service grid
───────────────────────────────────────────── */
function ServiceGrid({ services }: { services: ServiceLink[] }) {
  return (
    <section className="mt-16 mb-4">
      <div
        className="rounded-[20px] border p-8"
        style={{ background: 'rgba(124,58,237,0.04)', borderColor: 'rgba(124,58,237,0.14)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: violet }}>
          Nos services
        </p>
        <h3 className="text-xl font-black text-white mb-6">
          Vous avez des questions ? On peut vous aider.
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {services.map(svc => (
            <Link
              key={svc.href}
              href={svc.href}
              className="group flex flex-col gap-2 rounded-[14px] border p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: svc.bg, borderColor: svc.border }}
            >
              <span className="text-[11px] font-bold" style={{ color: svc.color }}>
                {svc.label}
              </span>
              <p className="text-zinc-400 text-xs leading-relaxed flex-1">
                {svc.desc}
              </p>
              <span
                className="text-[11px] font-semibold mt-1 group-hover:opacity-70 transition-opacity"
                style={{ color: svc.color }}
              >
                Decouvrir &rarr;
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="inline-block text-sm font-bold px-6 py-2.5 rounded-[10px] transition-opacity hover:opacity-80"
            style={{ background: violet, color: '#09090B' }}
          >
            Planifier un appel gratuit
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related  = getRelatedArticles(slug, 3)
  const cat      = BLOG_CATEGORIES[article.category]
  const services = getServicesForCategory(article.category)

  /* JSON-LD schemas */
  const schemas = [
    buildArticle({
      headline:      article.title,
      description:   article.seoDescription,
      url:           `/blog/${article.slug}`,
      datePublished: article.dateISO,
      dateModified:  article.dateISO,
      authorName:    article.author,
      image:         `https://dkdp.ch${article.heroImage.src}`,
    }),
    buildBreadcrumbList([
      { name: 'Accueil', url: 'https://dkdp.ch' },
      { name: 'Blog',    url: 'https://dkdp.ch/blog' },
      { name: article.title, url: `https://dkdp.ch/blog/${article.slug}` },
    ]),
  ]

  /* Render markdown and split around image markers */
  const rendered = renderMarkdown(article.content)
  const segments = rendered.split(/___IMG:([^_]+)___/)

  /* Build content parts (HTML + inline images + mid-article CTA) */
  const midIdx = Math.floor(segments.length / 2)
  // Pick the 2nd service (index 1) for the mid-article banner
  const midService = services[1] ?? services[0]

  const contentParts = segments.map((seg, i) => {
    if (i % 2 === 0) {
      // HTML prose
      const part = <div key={`prose-${i}`} dangerouslySetInnerHTML={{ __html: seg }} />
      // Insert mid-article CTA after the midpoint prose segment
      if (i === midIdx && midService) {
        return (
          <>
            {part}
            <InlineCTA key={`cta-${i}`} service={midService} />
          </>
        )
      }
      return part
    } else {
      // Inline image
      const img = article.images?.find(im => im.src.includes(seg))
      if (!img) return null
      return (
        <figure key={`img-${i}`} className="my-10">
          <div className="rounded-[16px] overflow-hidden border border-zinc-800">
            <img src={img.src} alt={img.alt} className="w-full h-auto" />
          </div>
          {img.caption && (
            <figcaption className="text-center text-sm text-zinc-500 mt-3 italic">
              {img.caption}
            </figcaption>
          )}
        </figure>
      )
    }
  })

  return (
    <main>
      {schemas.map((schema, i) => (
        <SchemaOrg key={i} schema={schema} />
      ))}

      {/* ══ 1. Breadcrumb + Header ══ */}
      <div className="bg-zinc-950 pt-28 pb-0">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8 flex-wrap" aria-label="Fil d&apos;Ariane">
            <Link href="/" className="hover:text-zinc-300 transition">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400 line-clamp-1">{article.title}</span>
          </nav>

          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5"
            style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}
          >
            {cat.label}
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-10 flex-wrap">
            <span>Par {article.author}</span>
            <span>·</span>
            <time dateTime={article.dateISO}>{article.date}</time>
            <span>·</span>
            <span>{article.readTime} de lecture</span>
          </div>
        </div>
      </div>

      {/* ══ 2. Hero image ══ */}
      <div className="bg-zinc-950 pb-2">
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="rounded-[20px] overflow-hidden aspect-video border border-zinc-800/60">
            <img
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ══ 3. Contenu + Sidebar ══ */}
      <div className="bg-zinc-950 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 max-w-5xl mx-auto px-4">

          {/* Colonne prose */}
          <article className="min-w-0">
            {contentParts}

            {/* First CTA (main service) inline */}
            {services[0] && (
              <InlineCTA service={services[0]} />
            )}

            {/* Service grid at end of article */}
            <ServiceGrid services={services} />
          </article>

          {/* Sidebar sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">

              {/* Sommaire rapide (tags) */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-[16px] p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service CTA sidebar */}
              {services.slice(0, 2).map(svc => (
                <div
                  key={svc.href}
                  className="rounded-[16px] p-5 border"
                  style={{ background: svc.bg, borderColor: svc.border }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest mb-2 block"
                    style={{ color: svc.color }}
                  >
                    Service DKDP
                  </span>
                  <p className="text-sm font-bold text-white mb-1">{svc.label}</p>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{svc.desc}</p>
                  <Link
                    href={svc.href}
                    className="block w-full text-center text-xs font-bold py-2 px-4 rounded-[8px] transition-opacity hover:opacity-80"
                    style={{ background: svc.color, color: '#09090B' }}
                  >
                    Decouvrir
                  </Link>
                </div>
              ))}

              {/* Contact sidebar */}
              <div
                className="rounded-[16px] p-5 border"
                style={{ background: violetBg, borderColor: violetBd }}
              >
                <p className="text-sm font-bold text-white mb-1">Une question ?</p>
                <p className="text-xs text-zinc-400 mb-4">Discutons de votre projet en 30 min.</p>
                <Link
                  href="/contact"
                  className="block w-full text-center text-xs font-bold py-2 px-4 rounded-[8px] transition-opacity hover:opacity-80"
                  style={{ background: violet, color: '#09090B' }}
                >
                  Appel gratuit
                </Link>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* ══ 4. Articles connexes ══ */}
      {related.length > 0 && (
        <section className="py-20 bg-zinc-900/30 border-t border-zinc-800">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">Articles connexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => {
                const relCat = BLOG_CATEGORIES[rel.category]
                return (
                  <SectionReveal key={rel.slug} className="h-full">
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="flex flex-col h-full bg-zinc-900/60 border border-zinc-800 rounded-[16px] overflow-hidden hover:-translate-y-0.5 transition-all duration-300 hover:border-zinc-600 group"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={rel.heroImage.src}
                          alt={rel.heroImage.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs font-semibold mb-2" style={{ color: relCat.color }}>
                          {relCat.label}
                        </span>
                        <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 flex-1">
                          {rel.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-zinc-500">{rel.date}</span>
                          <span className="text-xs font-semibold" style={{ color: violet }}>
                            Lire &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SectionReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. CTA Final ══ */}
      <CTAFinal />
    </main>
  )
}
