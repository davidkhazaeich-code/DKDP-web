import Link from 'next/link'
import { orange } from '@/lib/tokens'
import { Users, Clock, CalendarDays } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'

const OR = orange.color
const ORB = orange.bg
const ORD = orange.border

const RATE_VALUES: (number | null)[] = [200, 300, null, null]

const CONTENT = {
  fr: {
    rateLabels: ['1 personne', '2 personnes', '3-6 personnes', '6-10 personnes'],
    perHour: 'par heure',
    onQuote: 'Sur devis',
    formats: [
      { label: 'Demi-journée', work: '3h de formation', prep: '1h de préparation' },
      { label: 'Journée entière', work: '6h de formation', prep: '2h de préparation' },
    ],
    rate: 'Tarif',
    customNote: 'Programme personnalise selon vos besoins.',
    requestQuote: 'Demander un devis',
    bottomNote: 'Le programme est personnalise pour chaque entreprise.',
    freeQuote: 'Devis gratuit sous 48h',
  },
  en: {
    rateLabels: ['1 person', '2 people', '3-6 people', '6-10 people'],
    perHour: 'per hour',
    onQuote: 'On quote',
    formats: [
      { label: 'Half-day', work: '3h of training', prep: '1h of preparation' },
      { label: 'Full day', work: '6h of training', prep: '2h of preparation' },
    ],
    rate: 'Rate',
    customNote: 'Programme tailored to your needs.',
    requestQuote: 'Request a quote',
    bottomNote: 'The programme is tailored for each company.',
    freeQuote: 'Free quote within 48h',
  },
} as const

export function FormationPricing({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  const contact = localizedPath('/contact', lang)
  return (
    <div>
      {/* Hourly rates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {RATE_VALUES.map((rate, i) => (
          <div
            key={t.rateLabels[i]}
            className="rounded-[14px] border p-5 text-center"
            style={{ background: ORB, borderColor: ORD }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid ${ORD}` }}
            >
              <Users size={15} style={{ color: OR }} />
            </div>
            <p className="text-text-muted text-xs font-medium mb-1">{t.rateLabels[i]}</p>
            {rate ? (
              <>
                <p className="text-xl font-bold" style={{ color: OR }}>CHF {rate}</p>
                <p className="text-text-muted text-[10px] mt-0.5">{t.perHour}</p>
              </>
            ) : (
              <Link
                href={contact}
                className="text-base font-bold transition-opacity hover:opacity-80"
                style={{ color: OR }}
              >
                {t.onQuote}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Format cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {t.formats.map((f, i) => (
          <div
            key={f.label}
            className="rounded-[14px] border p-6"
            style={{ background: ORB, borderColor: ORD }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid ${ORD}` }}
              >
                {i === 0
                  ? <Clock size={15} style={{ color: OR }} />
                  : <CalendarDays size={15} style={{ color: OR }} />
                }
              </div>
              <div>
                <p className="text-text font-bold text-base">{f.label}</p>
                <p className="text-text-muted text-xs">{f.work} + {f.prep}</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-text-secondary text-sm">{t.rate}</span>
              <Link
                href={contact}
                className="font-bold text-sm transition-opacity hover:opacity-80"
                style={{ color: OR }}
              >
                {t.onQuote}
              </Link>
            </div>
            <p className="text-text-muted text-[10px] mt-2">
              {t.customNote}{' '}
              <Link href={contact} className="underline hover:text-text transition-colors" style={{ color: OR }}>
                {t.requestQuote}
              </Link>
            </p>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-text-muted text-xs mt-4 text-center leading-relaxed">
        {t.bottomNote}{' '}
        <Link href={contact} className="underline hover:text-text transition-colors" style={{ color: OR }}>
          {t.freeQuote}
        </Link>
      </p>
    </div>
  )
}
