import Link from 'next/link'
import { CalendarCheck, ChevronRight } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { chf, prixAccompagnementIa } from '@/data/pricing'
import { localizedPath } from '@/i18n/slugs'
import type { Locale } from '@/i18n/config'
import { FR_PATH } from './content'

const TEXT = {
  fr: {
    tag: 'Accompagnement IA',
    title: 'Vous préférez être accompagné chaque mois ?',
    desc: `Direction formée, outil paramétré, équipes formées, livrables datés. Dès ${chf(prixAccompagnementIa('essentiel'))} par mois.`,
    more: 'Voir l’accompagnement',
  },
  en: {
    tag: 'AI adoption support',
    title: 'Would you rather be supported every month?',
    desc: `Leadership trained, tool configured, teams trained, dated deliverables. From ${chf(prixAccompagnementIa('essentiel'))} per month.`,
    more: 'See the support',
  },
}

/**
 * Bandeau vers /intelligence-artificielle/accompagnement-ia, posé sous les grilles
 * de services du hub IA, de l'audit, de la mise en place et de la formation IA
 * (maillage interne du 01/10/2026). Même gabarit que le pont « Formation IA » du hub.
 */
export function AccompagnementBridge({ lang = 'fr', className = 'mt-5' }: { lang?: Locale; className?: string }) {
  const t = TEXT[lang]
  return (
    <SectionReveal delay={0.3}>
      <Link
        href={localizedPath(FR_PATH, lang)}
        className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200 ${className}`}
        style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.10) 0%, rgba(212,212,216,0.04) 100%)', borderColor: 'rgba(167,139,250,0.24)' }}
      >
        <span className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0" style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)' }}>
            <CalendarCheck size={20} style={{ color: '#A78BFA' }} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#A78BFA' }}>{t.tag}</span>
            <span className="block text-text font-semibold">{t.title}</span>
            <span className="block text-text-muted text-[12.5px] mt-0.5">{t.desc}</span>
          </span>
        </span>
        <span className="flex-shrink-0 flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70" style={{ color: '#A78BFA' }}>
          {t.more} <ChevronRight size={12} aria-hidden="true" />
        </span>
      </Link>
    </SectionReveal>
  )
}
