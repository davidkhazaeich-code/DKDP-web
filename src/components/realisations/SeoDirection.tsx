import { SectionReveal } from '@/components/ui/SectionReveal'
import type { RealisationSeo } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Direction SEO et GEO d'une realisation : le resultat tel qu'il est declare
 * a Google, les donnees structurees emises, une page par intention (liens
 * directs vers le site livre, ce sont les bonnes pages a citer), et les choix
 * faits pour les moteurs generatifs.
 *
 * L'apercu de resultat est une carte blanche dans les deux themes : c'est un
 * document, pas une surface du site, il garde ses couleurs propres.
 */
export function SeoDirection({ seo, lang = 'fr' }: { seo: RealisationSeo; lang?: Locale }) {
  const en = lang === 'en'
  const t = {
    h2: en ? 'SEO and generative search' : 'SEO et moteurs génératifs',
    serp: en ? 'The result as declared to Google' : 'Le résultat tel qu\'il est déclaré à Google',
    serpNote: en
      ? 'Brand name first, the query in plain words, and no delay in the snippet: a promise you cannot keep in 600 pixels is a lost click.'
      : 'Le nom de marque en tête, la requête en mots simples, et aucun délai dans l\'extrait : une promesse qu\'on ne peut pas tenir en 600 pixels est un clic perdu.',
    schemas: en ? 'Structured data emitted' : 'Données structurées émises',
    schemasNote: en
      ? 'Generated from the same content the visitor reads. Nothing is declared in the markup that is not visible on the page.'
      : 'Générées depuis le contenu que le visiteur lit. Rien n\'est déclaré dans le balisage qui ne soit visible sur la page.',
    intents: en ? 'One page per search intent' : 'Une page par intention de recherche',
    geo: en ? 'Written to be quoted' : 'Écrit pour être cité',
  }
  const host = seo.serp.url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <section id="seo" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-[68ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">{t.h2}</h2>
          {seo.intro && (
            <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary md:text-lg">{seo.intro}</p>
          )}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-12 md:gap-6">
          {/* Apercu de resultat */}
          <SectionReveal className="md:col-span-7">
            <div className="h-full rounded-2xl border border-border bg-bg-card p-6 md:p-7">
              <span className="text-xs uppercase tracking-wide text-text-muted">{t.serp}</span>
              <div className="mt-5 rounded-xl border border-black/10 bg-white p-5 text-[#202124] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white">
                    {seo.serp.favicon ? (
                      <img src={seo.serp.favicon} alt="" className="h-5 w-5 object-contain" loading="lazy" />
                    ) : (
                      <span className="text-[11px] font-bold text-[#202124]">{seo.serp.siteName.trim()[0]}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] leading-tight text-[#202124]">{seo.serp.siteName}</span>
                    <span className="block truncate text-[12px] leading-tight text-[#4d5156]">{seo.serp.url}</span>
                  </span>
                </div>
                <p className="mt-3 text-[19px] leading-[1.3] text-[#1a0dab] md:text-[20px]">{seo.serp.title}</p>
                <p className="mt-1.5 text-[14px] leading-[1.58] text-[#4d5156]">{seo.serp.description}</p>
              </div>
              <p className="mt-4 text-sm leading-[1.6] text-text-secondary">{t.serpNote}</p>
            </div>
          </SectionReveal>

          {/* Donnees structurees */}
          <SectionReveal className="md:col-span-5" delay={0.08}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-bg-card p-6 md:p-7">
              <div>
                <span className="text-xs uppercase tracking-wide text-text-muted">{t.schemas}</span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {seo.schemas.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border px-3 py-1 font-mono text-[12px]"
                      style={{
                        background: 'var(--violet-bg)',
                        borderColor: 'var(--violet-border)',
                        color: 'var(--violet-text)',
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm leading-[1.6] text-text-secondary">{t.schemasNote}</p>
            </div>
          </SectionReveal>

          {/* Une page par intention : liens directs vers le site livre */}
          <div className="md:col-span-12">
            <h3 className="text-xs uppercase tracking-wide text-text-muted">{t.intents}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {seo.intents.map((it) => (
                <li key={it.path}>
                  <a
                    href={`${seo.serp.url.replace(/\/$/, '')}${it.path}`}
                    target="_blank"
                    rel="noopener"
                    className="group flex h-full flex-col gap-1 rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-border-strong"
                  >
                    <span className="text-sm font-semibold text-text">{it.label}</span>
                    <span className="truncate font-mono text-[11px] text-text-muted transition-colors group-hover:text-text-secondary">
                      {host}
                      {it.path}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* GEO */}
          <div className="md:col-span-12">
            <h3 className="text-xs uppercase tracking-wide text-text-muted">{t.geo}</h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {seo.geo.map((g) => (
                <li key={g.title} className="rounded-2xl border border-border bg-bg-card p-5">
                  <p className="text-[15px] font-semibold text-text">{g.title}</p>
                  <p className="mt-2 text-sm leading-[1.6] text-text-secondary">{g.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
