import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'

/**
 * Qui pilote les campagnes : David Khazaei. Même traitement photo que
 * `DavidCard` (fond radial violet, portrait détouré). Décision de David du
 * 10.09.2026 : un bloc court, pas une biographie.
 */

const COPY: Record<Locale, { kicker: string; title: string; text: string; cta: string; facts: string[] }> = {
  fr: {
    kicker: 'Qui pilote vos campagnes',
    title: 'David Khazaei, fondateur de DKDP',
    text: 'David gère les campagnes Google Ads et YouTube de PME romandes et d\'événements internationaux à Genève. C\'est lui qui ouvre le canal ChatGPT Ads avec vous : cadrage, cartes, mesure, rapport. Pas de junior, pas d\'intermédiaire.',
    cta: 'Faire connaissance',
    facts: ['Un seul interlocuteur du cadrage au rapport', 'Accès complet à votre compte, à tout moment', 'Compte Ads Manager DKDP ouvert et pixel OpenAI posé sur dkdp.ch depuis le 10 septembre 2026'],
  },
  en: {
    kicker: 'Who runs your campaigns',
    title: 'David Khazaei, founder of DKDP',
    text: 'David runs the Google Ads and YouTube campaigns of Swiss SMEs and international events in Geneva. He is the one opening the ChatGPT Ads channel with you: scoping, cards, measurement, report. No junior, no middleman.',
    cta: 'Meet the team',
    facts: ['One contact from scoping to report', 'Full access to your account, at any time', 'DKDP Ads Manager account open and OpenAI pixel live on dkdp.ch since 10 September 2026'],
  },
}

export function ExpertBlock({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  return (
    <div className="bg-bg-card border border-border rounded-[20px] overflow-hidden flex flex-col md:flex-row">
      <div className="relative flex-shrink-0 flex items-end justify-center md:justify-start w-full md:w-[260px] h-[240px] md:h-auto">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.14) 0%, transparent 70%)' }}
        />
        <Image
          src="/images/team/david-khazaei.png"
          alt={lang === 'fr' ? 'David Khazaei, fondateur de DKDP, pilote les campagnes ChatGPT Ads à Genève' : 'David Khazaei, founder of DKDP, runs ChatGPT Ads campaigns in Geneva'}
          width={260}
          height={300}
          className="relative z-10 h-full w-auto object-contain object-bottom"
          style={{ maxHeight: '300px', width: 'auto' }}
        />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: violet.color }}>{t.kicker}</p>
        <h3 className="text-2xl font-bold mb-3 text-text">{t.title}</h3>
        <p className="text-text-secondary leading-relaxed mb-5 max-w-xl">{t.text}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 list-none m-0 p-0">
          {t.facts.map((f) => (
            <li key={f} className="text-xs text-text-secondary leading-snug pl-3 border-l-2" style={{ borderColor: violet.border }}>
              {f}
            </li>
          ))}
        </ul>
        <Link
          href={localizedPath('/a-propos', lang)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold w-fit"
          style={{ color: violet.color }}
        >
          {t.cta} <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
