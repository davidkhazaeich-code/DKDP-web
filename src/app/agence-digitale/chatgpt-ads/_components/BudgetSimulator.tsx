'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Info } from 'lucide-react'
import { violet, green } from '@/lib/tokens'
import { formatSwissChf, formatSwissInt } from '@/lib/format'
import { estimateCampaign } from '@/lib/chatgpt-ads/estimate'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'
import { LABELS } from './copy'

/**
 * Simulateur de budget ChatGPT Ads. Trois curseurs (budget média mensuel,
 * fourchette de CPC supposée, taux de conversion) et une fourchette de clics,
 * de contacts et de coût par contact, calculée par `estimateCampaign`.
 *
 * Aucun taux de change ni benchmark caché : OpenAI recommande de démarrer
 * entre 3 et 5 USD par clic et ne publie aucun benchmark de performance. Le
 * bandeau « estimation indicative, pas une promesse » n'est pas décoratif.
 */

const V = violet.color
const VB = violet.bg
const VD = violet.border

const COPY: Record<Locale, {
  budget: string
  cpc: string
  cpcHint: string
  rate: string
  rateHint: string
  clicks: string
  leads: string
  cpl: string
  perMonth: string
  lessThanOne: string
  cta: string
  ctaSub: string
  method: string
}> = {
  fr: {
    budget: 'Budget média mensuel',
    cpc: 'Coût par clic supposé',
    cpcHint: 'OpenAI recommande de démarrer entre 3 et 5 USD par clic. Réglez la fourchette en francs selon le cours du jour.',
    rate: 'Part des clics qui deviennent un contact',
    rateHint: 'Un formulaire envoyé, un appel, une réservation. Un site rapide et une page de destination précise pèsent plus que l\'annonce.',
    clicks: 'Clics estimés',
    leads: 'Contacts estimés',
    cpl: 'Coût par contact',
    perMonth: 'par mois',
    lessThanOne: 'moins de 1',
    cta: 'Cadrer mon pilote',
    ctaSub: 'Réponse sous 24h ouvrées, sans engagement.',
    method: 'Méthode : clics = budget divisé par le CPC ; contacts = clics multipliés par le taux ; coût par contact = budget divisé par les contacts. Le CPC réel dépend de l\'enchère, de la concurrence et de la pertinence jugée par OpenAI.',
  },
  en: {
    budget: 'Monthly media budget',
    cpc: 'Assumed cost per click',
    cpcHint: 'OpenAI recommends starting between 3 and 5 USD per click. Set the range in francs according to the day\'s rate.',
    rate: 'Share of clicks that become a contact',
    rateHint: 'A submitted form, a call, a booking. A fast site and a precise landing page weigh more than the ad itself.',
    clicks: 'Estimated clicks',
    leads: 'Estimated contacts',
    cpl: 'Cost per contact',
    perMonth: 'per month',
    lessThanOne: 'under 1',
    cta: 'Scope my pilot',
    ctaSub: 'Reply within 24 working hours, no commitment.',
    method: 'Method: clicks = budget divided by CPC; contacts = clicks multiplied by the rate; cost per contact = budget divided by contacts. The real CPC depends on the bid, the competition and the relevance judged by OpenAI.',
  },
}

function Range({
  id,
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <label htmlFor={id} className="text-sm font-semibold text-text">{label}</label>
        <output htmlFor={id} className="text-sm font-bold tabular-nums" style={{ color: V }}>{display}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={display}
        className="w-full accent-[#A78BFA]"
      />
    </div>
  )
}

export function BudgetSimulator({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  const [budget, setBudget] = useState(1000)
  const [cpcLow, setCpcLow] = useState(2.5)
  const [cpcHigh, setCpcHigh] = useState(4)
  const [ratePct, setRatePct] = useState(3)

  const r = estimateCampaign({ budgetChf: budget, cpcLowChf: cpcLow, cpcHighChf: cpcHigh, conversionRate: ratePct / 100 })

  const range = (low: number, high: number, fmt: (n: number) => string) => {
    if (high <= 0) return t.lessThanOne
    if (low <= 0) return `${t.lessThanOne} à ${fmt(high)}`.replace(' à ', lang === 'en' ? ' to ' : ' à ')
    if (low === high) return fmt(low)
    return `${fmt(low)} ${lang === 'en' ? 'to' : 'à'} ${fmt(high)}`
  }

  const cplText = r.costPerLeadLow > 0 && r.costPerLeadHigh > 0
    ? `${formatSwissChf(r.costPerLeadLow)} ${lang === 'en' ? 'to' : 'à'} ${formatSwissInt(r.costPerLeadHigh)}`
    : r.costPerLeadLow > 0
      ? formatSwissChf(r.costPerLeadLow)
      : t.lessThanOne

  const contactHref = localizedPath('/contact', lang) + '?service=service-digital'

  return (
    <div
      className="rounded-[20px] border p-5 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8"
      style={{ background: VB, borderColor: VD }}
    >
      <div className="space-y-7">
        <Range
          id="sim-budget"
          label={t.budget}
          value={budget}
          min={300}
          max={5000}
          step={100}
          display={`${formatSwissChf(budget)} ${t.perMonth}`}
          onChange={setBudget}
        />
        <div className="space-y-4">
          <Range
            id="sim-cpc-low"
            label={`${t.cpc} (min)`}
            value={cpcLow}
            min={1}
            max={8}
            step={0.5}
            display={`CHF ${cpcLow.toFixed(2)}`}
            onChange={setCpcLow}
          />
          <Range
            id="sim-cpc-high"
            label={`${t.cpc} (max)`}
            value={cpcHigh}
            min={1}
            max={8}
            step={0.5}
            display={`CHF ${cpcHigh.toFixed(2)}`}
            onChange={setCpcHigh}
          />
          <p className="text-text-muted text-xs leading-relaxed flex gap-1.5">
            <Info size={13} className="mt-0.5 flex-shrink-0" style={{ color: V }} aria-hidden="true" />
            <span>{t.cpcHint}</span>
          </p>
        </div>
        <div>
          <Range
            id="sim-rate"
            label={t.rate}
            value={ratePct}
            min={1}
            max={6}
            step={0.5}
            display={`${ratePct.toString().replace('.', lang === 'en' ? '.' : ',')} %`}
            onChange={setRatePct}
          />
          <p className="text-text-muted text-xs leading-relaxed mt-2">{t.rateHint}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {[
            { label: t.clicks, value: range(r.clicksLow, r.clicksHigh, formatSwissInt), accent: V },
            { label: t.leads, value: range(r.leadsLow, r.leadsHigh, formatSwissInt), accent: green.color },
            { label: t.cpl, value: cplText, accent: V },
          ].map((tile) => (
            <div key={tile.label} className="rounded-[14px] p-4 bg-bg-card border border-border" aria-live="polite">
              <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-1">{tile.label}</p>
              <p className="text-2xl font-bold tabular-nums" style={{ color: tile.accent }}>{tile.value}</p>
              <p className="text-text-muted text-[11px] mt-0.5">{t.perMonth}</p>
            </div>
          ))}
        </div>
        <p
          className="text-[11px] font-bold uppercase tracking-widest text-center rounded-full px-3 py-1.5"
          style={{ color: V, background: 'rgba(124,58,237,0.12)', border: `1px solid ${VD}` }}
        >
          {LABELS[lang].estimate}
        </p>
        <p className="text-text-muted text-[11px] leading-relaxed">{t.method}</p>
        <div className="mt-auto pt-2">
          <Link
            href={contactHref}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold text-black transition-opacity hover:opacity-85"
            style={{ background: V }}
          >
            {t.cta} <ChevronRight size={14} aria-hidden="true" />
          </Link>
          <p className="text-text-muted text-[11px] mt-2">{t.ctaSub}</p>
        </div>
      </div>
    </div>
  )
}
