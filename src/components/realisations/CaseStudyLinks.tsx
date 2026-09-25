import Link from 'next/link'
import { ARTICLES } from '@/lib/blog'
import { DOMAINS } from '@/lib/realisations/taxonomy'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Les liens qui font travailler une etude de cas : la page service de chaque
 * domaine couvert (la « money page »), et les articles du blog utiles au meme
 * lecteur. Le blog etant en francais, la version anglaise ne liste que les
 * pages service.
 */
export function CaseStudyLinks({ r, lang = 'fr' }: { r: Realisation; lang?: Locale }) {
  const en = lang === 'en'
  const services = r.domains
    .map((d) => ({ domain: d, label: DOMAINS[d][lang], href: DOMAINS[d].service?.[lang] ?? null }))
    .filter((s): s is { domain: typeof s.domain; label: string; href: string } => Boolean(s.href))
  const articles = en
    ? []
    : (r.relatedArticles ?? [])
        .map((slug) => ARTICLES.find((a) => a.slug === slug))
        .filter((a): a is (typeof ARTICLES)[number] => Boolean(a))

  if (services.length === 0 && articles.length === 0) return null

  return (
    <section id="aller-plus-loin" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-2 md:gap-12">
        {services.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
              {en ? 'The services behind this project' : 'Les prestations de ce projet'}
            </h2>
            <ul className="mt-6 grid gap-3">
              {services.map((s) => (
                <li key={s.domain}>
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between rounded-xl border border-border bg-bg-card px-5 py-4 text-[16px] text-text-secondary transition-colors hover:text-text"
                  >
                    <span>{s.label}</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {articles.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-text md:text-2xl">À lire sur le même sujet</h2>
            <ul className="mt-6 grid gap-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group block rounded-xl border border-border bg-bg-card px-5 py-4 transition-colors"
                  >
                    <span className="block text-[16px] leading-snug text-text-secondary transition-colors group-hover:text-text">
                      {a.title}
                    </span>
                    <span className="mt-1 block text-sm text-text-muted">{a.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
