'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Users, Clock, Banknote, Timer, TrendingUp, Tag, BarChart2, CalendarClock } from 'lucide-react'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'

const JOURS_OUVRES = 220  // jours travaillés / an
const RECOVERY     = 0.65 // taux d'heures récupérables via meilleures pratiques IA

const accent  = '#FF8C00'
const accentBg = 'rgba(255,107,0,0.08)'
const accentBd = 'rgba(255,107,0,0.20)'

const chrome   = '#D4D4D8'
const chromeBg = 'rgba(212,212,216,0.06)'
const chromeBd = 'rgba(212,212,216,0.16)'
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
          {icon && <span style={{ color: 'rgba(212,212,216,0.45)' }}>{icon}</span>}
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
        {/* Fill */}
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
            boxShadow: '0 0 8px rgba(212,212,216,0.45), 0 1px 3px rgba(0,0,0,0.6)',
          }}
        />
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

export function ROICalculatorFormation() {
  const [collaborateurs, setCollaborateurs] = useState(5)
  const [tauxHoraire, setTauxHoraire]       = useState(90)
  const [tempsEco, setTempsEco]             = useState(60) // minutes / jour

  const heuresEcoParPersAn = (tempsEco / 60) * JOURS_OUVRES * RECOVERY
  const heuresAn           = Math.round(heuresEcoParPersAn * collaborateurs)
  const gainsAn            = heuresAn * tauxHoraire

  // Coût formation DKDP selon nombre de participants
  const prixFormation = collaborateurs <= 8 ? 1_500 : collaborateurs <= 15 ? 2_800 : 4_500
  const roi           = gainsAn > 0 ? gainsAn / prixFormation : 0
  const moisRetour    = gainsAn > 0 ? Math.max(1, Math.ceil((prixFormation / gainsAn) * 12)) : 0

  return (
    <InfiniteGrid
      accentRgb="212,212,216"
      blob1="rgba(212,212,216,0.06)"
      blob2="rgba(255,107,0,0.04)"
      className="bg-bg-card border-y border-border"
    >
    <section id="calculateur-roi-formation" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: accentBg, color: accent, border: `1px solid ${accentBd}` }}
          >
            Calculateur ROI Formation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            Combien vaut une journée de formation IA ?
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
            Estimez en 30 secondes le retour sur investissement d&apos;une formation IA pour vos équipes. En francs suisses.
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
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(212,212,216,0.45)' }}>
              Votre équipe aujourd&apos;hui
            </p>

            <SliderInput
              label="Collaborateurs à former"
              min={1} max={30} step={1}
              value={collaborateurs} onChange={setCollaborateurs}
              format={(v) => `${v} pers.`}
              icon={<Users size={14} />}
            />

            <SliderInput
              label="Temps perdu sur tâches manuelles / jour"
              min={15} max={180} step={15}
              value={tempsEco} onChange={setTempsEco}
              format={(v) => v >= 60 ? `${v / 60}h` : `${v} min`}
              hint="Emails répétitifs, synthèses, rapports, recherche d'info..."
              icon={<Clock size={14} />}
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
                Basé sur {RECOVERY * 100}% de temps récupérable après formation · {JOURS_OUVRES} jours ouvrés / an
                <br />Données post-formation observées sur nos participants
              </p>
            </div>
          </div>

          {/* ── Résultats ── */}
          <div className="space-y-4">

            {/* Grands chiffres - vert */}
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
                  {collaborateurs > 1 ? `${Math.round(heuresEcoParPersAn)}h / pers.` : 'pour votre équipe'}
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

            {/* Projection formation - chrome neutre */}
            <div
              className="rounded-[16px] p-6 border backdrop-blur-sm"
              style={{ background: chromeBg, borderColor: chromeBd }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-5"
                style={{ color: 'rgba(212,212,216,0.50)' }}
              >
                Projection formation DKDP
              </p>

              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-text-muted text-sm">
                    <Tag size={13} style={{ color: 'rgba(212,212,216,0.40)' }} />Coût de la formation
                  </span>
                  <span className="text-white font-bold text-sm">
                    {formatCHF(prixFormation)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-text-muted text-sm">
                    <BarChart2 size={13} style={{ color: 'rgba(212,212,216,0.40)' }} />ROI à 12 mois
                  </span>
                  <span className="font-bold text-2xl" style={{ color: chrome }}>
                    x{roi.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-text-muted text-sm">
                    <CalendarClock size={13} style={{ color: 'rgba(212,212,216,0.40)' }} />Rentabilisée en
                  </span>
                  <span className="font-bold text-sm" style={{ color: chrome }}>
                    {moisRetour} mois
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t" style={{ borderColor: 'rgba(212,212,216,0.10)' }}>
                <p className="text-text-muted text-[10px] leading-relaxed">
                  Estimation indicative. DKDP établit un devis précis selon votre programme sur mesure.
                </p>
              </div>
            </div>

            {/* CTA - liquid metal chrome */}
            <Link
              href="/contact#formulaire"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-[12px] text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] duration-150"
              style={{
                background: 'linear-gradient(135deg, #e8e8e8 0%, #a0a0a8 30%, #d4d4d8 58%, #707078 100%)',
                color: '#0a0a0a',
                boxShadow: '0 0 24px rgba(212,212,216,0.20), inset 0 1px 0 rgba(255,255,255,0.35)',
              }}
              aria-label="Demander un devis de formation"
            >
              Demander un devis <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
    </InfiniteGrid>
  )
}
