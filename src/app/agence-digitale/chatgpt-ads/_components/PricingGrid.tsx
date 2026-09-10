import Link from 'next/link'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'
import { CONTACT_HREF } from './copy'

/**
 * Les trois formules ChatGPT Ads décidées par David le 10 septembre 2026.
 * Le pilote est mis en avant : c'est l'entrée naturelle sur un canal neuf.
 * Prix hors budget média, qui va directement à OpenAI, sans commission.
 */

type Offer = { label: string; price: string; duration: string; highlight: boolean; features: string[] }

const OFFERS: Record<Locale, Offer[]> = {
  fr: [
    {
      label: 'Pilote 30 jours',
      price: 'CHF 1\'200',
      duration: 'Forfait unique, la porte d\'entrée',
      highlight: true,
      features: [
        'Cadrage et vérification d\'éligibilité',
        'Accompagnement à l\'ouverture de votre compte Ads Manager',
        'OpenAI Pixel ou Conversions API, paramètres UTM',
        '2 à 3 groupes d\'annonces, 6 à 8 cartes',
        'Suivi hebdomadaire pendant 30 jours',
        'Rapport de fin de pilote et décision go ou no-go',
      ],
    },
    {
      label: 'Gestion mensuelle',
      price: 'CHF 450 / mois',
      duration: 'Après le pilote',
      highlight: false,
      features: [
        'Optimisation hebdomadaire des enchères et des indications de contexte',
        'Nouvelles cartes chaque mois',
        'Rapport mensuel : impressions, clics, coût par contact',
        'Accès complet à votre compte, à tout moment',
        'Sans engagement, préavis de 30 jours',
      ],
    },
    {
      label: 'Google Ads + ChatGPT Ads',
      price: 'CHF 950 / mois',
      duration: 'Les deux canaux, un seul rapport',
      highlight: false,
      features: [
        'Google Search et ChatGPT Ads gérés ensemble',
        'Arbitrage du budget entre les deux canaux',
        'Tests A/B des messages sur les deux canaux',
        'Un seul rapport mensuel',
        'Point mensuel de 30 minutes',
        'Sans engagement, préavis de 30 jours',
      ],
    },
  ],
  en: [
    {
      label: '30-day pilot',
      price: 'CHF 1\'200',
      duration: 'One-off, the way in',
      highlight: true,
      features: [
        'Scoping and eligibility check',
        'Guidance to open your own Ads Manager account',
        'OpenAI Pixel or Conversions API, UTM parameters',
        '2 to 3 ad groups, 6 to 8 cards',
        'Weekly monitoring for 30 days',
        'End-of-pilot report and go or no-go decision',
      ],
    },
    {
      label: 'Monthly management',
      price: 'CHF 450 / month',
      duration: 'After the pilot',
      highlight: false,
      features: [
        'Weekly optimisation of bids and context hints',
        'New cards every month',
        'Monthly report: impressions, clicks, cost per contact',
        'Full access to your account, at any time',
        'No commitment, 30 days\' notice',
      ],
    },
    {
      label: 'Google Ads + ChatGPT Ads',
      price: 'CHF 950 / month',
      duration: 'Both channels, one report',
      highlight: false,
      features: [
        'Google Search and ChatGPT Ads managed together',
        'Budget arbitration between the two channels',
        'A/B tests of the messages on both channels',
        'One monthly report',
        'Monthly 30-minute check-in',
        'No commitment, 30 days\' notice',
      ],
    },
  ],
}

const TEXT: Record<Locale, { badge: string; cta: string; note: string }> = {
  fr: {
    badge: 'Recommandé pour démarrer',
    cta: 'Demander un devis',
    note: 'Budget média conseillé pour un pilote : CHF 600 à 1\'500, versé directement à OpenAI sur votre compte. Zéro commission. Prix hors TVA.',
  },
  en: {
    badge: 'Recommended to start',
    cta: 'Request a quote',
    note: 'Suggested media budget for a pilot: CHF 600 to 1\'500, paid directly to OpenAI on your own account. Zero commission. Prices excluding VAT.',
  },
}

const color = violet.color
const bg = violet.bg
const border = violet.border

export function PricingGrid({ lang = 'fr' }: { lang?: Locale }) {
  const t = TEXT[lang]
  const href = localizedPath(CONTACT_HREF.split('?')[0], lang) + '?service=service-digital'
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OFFERS[lang].map((offer) => (
          <div
            key={offer.label}
            className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
            style={{
              borderColor: offer.highlight ? color : border,
              boxShadow: offer.highlight ? '0 0 40px rgba(124,58,237,0.15)' : 'none',
            }}
          >
            {offer.highlight && <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />}
            <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
              {offer.highlight && (
                <span
                  className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                  style={{ background: bg, color, border: `1px solid ${border}` }}
                >
                  {t.badge}
                </span>
              )}
              <p className="text-text font-bold text-xl mb-1">{offer.label}</p>
              <p className="text-2xl font-bold mb-1" style={{ color }}>{offer.price}</p>
              <p className="text-text-muted text-xs mb-6">{offer.duration}</p>
              <ul className="space-y-2.5 flex-1 list-none m-0 p-0">
                {offer.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} aria-hidden="true" />
                    <span className="text-text-secondary text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  background: offer.highlight ? color : bg,
                  color: offer.highlight ? '#000' : color,
                  border: `1px solid ${border}`,
                }}
              >
                {t.cta} <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="text-text-muted text-xs text-center mt-6 max-w-2xl mx-auto">{t.note}</p>
    </div>
  )
}
