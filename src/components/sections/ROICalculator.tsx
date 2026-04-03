'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Clock, Users, Banknote, Timer, TrendingUp, Layers, BarChart2, CalendarClock } from 'lucide-react'
import { HeroBg } from '@/components/ui/HeroBg'

const WEEKS = 50       // semaines travaillées / an
const RECOVERY = 0.70  // taux d'heures récupérables par l'IA

const chrome   = '#D4D4D8'
const chromeBg = 'rgba(212,212,216,0.06)'
const chromeBd = 'rgba(212,212,216,0.18)'
const green    = '#4ade80'

function formatCHF(n: number): string {
  if (n >= 100_000) return `CHF ${(n / 1000).toFixed(0)}k`
  if (n >= 10_000)  return `CHF ${(n / 1000).toFixed(1)}k`
  return `CHF ${n.toLocaleString('fr-CH')}`
}

function SliderInput({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format,
  hint,
  icon,
}: {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  format: (v: number) => string
  hint?: string
  icon?: React.ReactNode
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-white leading-snug">
          {icon && <span style={{ color: 'rgba(212,212,216,0.55)' }}>{icon}</span>}
          {label}
        </span>
        <span className="text-base font-bold flex-shrink-0" style={{ color: chrome }}>
          {format(value)}
        </span>
      </div>
      {hint && <p className="text-[11px] text-text-muted leading-snug">{hint}</p>}
      <div
        className="relative h-2 rounded-full cursor-pointer select-none"
        style={{ background: 'rgba(212,212,216,0.10)' }}
      >
        {/* Fill - chrome liquid gradient */}
        <div
          className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, rgba(212,212,216,0.30), #D4D4D8)',
          }}
        />
        {/* Thumb - chrome sphere */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: 'linear-gradient(135deg, #f0f0f0 0%, #a8a8a8 45%, #d4d4d8 70%, #7a7a7a 100%)',
            boxShadow: '0 0 8px rgba(212,212,216,0.55), 0 1px 3px rgba(0,0,0,0.6)',
          }}
        />
        {/* Native input - invisible, interaction only */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
      </div>
      <div className="flex justify-between text-[10px] text-text-muted">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

export function ROICalculator() {
  const [heures, setHeures] = useState(10)
  const [personnes, setPersonnes] = useState(3)
  const [tauxHoraire, setTauxHoraire] = useState(90)

  const heuresAn = Math.round(heures * personnes * WEEKS * RECOVERY)
  const gainsAn  = heuresAn * tauxHoraire

  // Estimation investissement DKDP selon volume de travail
  const scope      = heures * personnes
  const investMin  = scope <= 20 ? 3_500 : scope <= 60 ? 6_500 : 12_000
  const investMax  = Math.round((investMin * 1.7) / 500) * 500

  const roi              = gainsAn > 0 ? gainsAn / investMin : 0
  const moisRentabilite  = gainsAn > 0 ? Math.max(1, Math.ceil((investMin / gainsAn) * 12)) : 0

  return (
    <HeroBg
     
      blob1="rgba(212,212,216,0.07)"
      blob2="rgba(124,58,237,0.06)"
      className="bg-bg-card border-y border-border"
    >
    <section id="calculateur-roi" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: chromeBg, color: chrome, border: `1px solid ${chromeBd}` }}
          >
            Calculateur ROI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            Combien vous coûte le travail manuel ?
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
            Estimez en 30 secondes ce que l&apos;automatisation IA peut vous faire gagner. Résultats en francs suisses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Sliders ── */}
          <div
            className="rounded-[20px] p-6 sm:p-8 border space-y-6 sm:space-y-8 backdrop-blur-sm"
            style={{
              background: 'rgba(212,212,216,0.03)',
              borderColor: chromeBd,
              boxShadow: '0 0 40px rgba(212,212,216,0.04)',
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(212,212,216,0.50)' }}>
              Votre situation actuelle
            </p>

            <SliderInput
              label="Heures de travail manuel / semaine"
              min={1} max={40} step={1}
              value={heures} onChange={setHeures}
              format={(v) => `${v}h`}
              hint="Saisie de données, traitement d'emails, rapports, transferts entre outils..."
              icon={<Clock size={14} />}
            />

            <SliderInput
              label="Collaborateurs concernés"
              min={1} max={30} step={1}
              value={personnes} onChange={setPersonnes}
              format={(v) => `${v} pers.`}
              icon={<Users size={14} />}
            />

            <SliderInput
              label="Taux horaire moyen"
              min={60} max={250} step={5}
              value={tauxHoraire} onChange={setTauxHoraire}
              format={(v) => `${v} CHF`}
              hint="Coût total employeur ou valeur de l'heure productive."
              icon={<Banknote size={14} />}
            />

            <div className="pt-4 border-t" style={{ borderColor: 'rgba(212,212,216,0.10)' }}>
              <p className="text-text-muted text-[10px] leading-relaxed">
                Basé sur {RECOVERY * 100}% d&apos;heures récupérables par l&apos;IA · {WEEKS} semaines travaillées / an
                <br />Méthodologie McKinsey Global Institute / World Economic Forum
              </p>
            </div>
          </div>

          {/* ── Résultats ── */}
          <div className="space-y-4">

            {/* Grands chiffres - vert conservé */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div
                className="rounded-[14px] sm:rounded-[16px] p-4 sm:p-6 border backdrop-blur-sm"
                style={{ background: 'rgba(74,222,128,0.06)', borderColor: 'rgba(74,222,128,0.20)' }}
              >
                <p className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3" style={{ color: green }}>
                  <Timer size={12} /> Heures libérées / an
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-none" style={{ color: green }}>
                  {heuresAn.toLocaleString('fr-CH')}h
                </p>
                <p className="text-text-muted text-[10px] sm:text-xs mt-1.5 sm:mt-2">
                  {personnes > 1 ? `${Math.round(heuresAn / personnes)}h / pers.` : 'pour votre équipe'}
                </p>
              </div>

              <div
                className="rounded-[14px] sm:rounded-[16px] p-4 sm:p-6 border backdrop-blur-sm"
                style={{ background: 'rgba(74,222,128,0.06)', borderColor: 'rgba(74,222,128,0.20)' }}
              >
                <p className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3" style={{ color: green }}>
                  <TrendingUp size={12} /> Gains estimés / an
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-none" style={{ color: green }}>
                  {formatCHF(gainsAn)}
                </p>
                <p className="text-text-muted text-[10px] sm:text-xs mt-1.5 sm:mt-2">
                  Valeur productive récupérée
                </p>
              </div>
            </div>

            {/* Projection DKDP - chrome */}
            <div
              className="rounded-[16px] p-6 border backdrop-blur-sm"
              style={{ background: chromeBg, borderColor: chromeBd }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-5"
                style={{ color: 'rgba(212,212,216,0.55)' }}
              >
                Projection avec DKDP
              </p>

              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-text-muted text-sm"><Layers size={13} style={{ color: 'rgba(212,212,216,0.45)' }} />Investissement estimé</span>
                  <span className="text-white font-bold text-sm">
                    {formatCHF(investMin)} à {formatCHF(investMax)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-text-muted text-sm"><BarChart2 size={13} style={{ color: 'rgba(212,212,216,0.45)' }} />ROI à 12 mois</span>
                  <span className="font-bold text-2xl" style={{ color: chrome }}>
                    x{roi.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-text-muted text-sm"><CalendarClock size={13} style={{ color: 'rgba(212,212,216,0.45)' }} />Délai de rentabilité</span>
                  <span className="font-bold text-sm" style={{ color: chrome }}>
                    {moisRentabilite} mois
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t" style={{ borderColor: 'rgba(212,212,216,0.10)' }}>
                <p className="text-text-muted text-[10px] leading-relaxed">
                  Estimation indicative. DKDP livre un chiffrage précis lors de l&apos;audit IA initial.
                </p>
              </div>
            </div>

            {/* CTA - liquid metal chrome */}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-[12px] text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] duration-150"
              style={{
                background: 'linear-gradient(135deg, #e8e8e8 0%, #a0a0a8 30%, #d4d4d8 58%, #707078 100%)',
                color: '#0a0a0a',
                boxShadow: '0 0 24px rgba(212,212,216,0.20), inset 0 1px 0 rgba(255,255,255,0.35)',
              }}
              aria-label="Faire une demande à DKDP"
            >
              Faire une demande <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
    </HeroBg>
  )
}
