'use client'

import { useState, useMemo } from 'react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'

const accent      = '#FF8C00'
const accentBg    = 'rgba(255,107,0,0.08)'
const accentBd    = 'rgba(255,107,0,0.18)'
const chrome      = '#D4D4D8'
const chromeBg    = 'rgba(212,212,216,0.06)'
const chromeBd    = 'rgba(212,212,216,0.14)'
const green       = '#4ade80'
const greenBg     = 'rgba(74,222,128,0.08)'
const greenBorder = 'rgba(74,222,128,0.20)'

function fmt(n: number) {
  const r = Math.round(n)
  if (r >= 1000) return `${Math.floor(r / 1000)}'${String(r % 1000).padStart(3, '0')}`
  return String(r)
}
function fmtChf(n: number) {
  const r = Math.round(n)
  if (r >= 1000) return `CHF ${Math.floor(r / 1000)}'${String(r % 1000).padStart(3, '0')}`
  return `CHF ${r}`
}

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}
function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-sm">{label}</span>
        <span className="text-sm font-bold" style={{ color: chrome }}>{display}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, rgba(255,107,0,0.5), ${accent})` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ WebkitAppearance: 'none' }}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: '#0A0A0A',
            borderColor: accent,
            boxShadow: `0 0 8px ${accent}66`,
          }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-text-muted text-[10px]">{min}</span>
        <span className="text-text-muted text-[10px]">{max}</span>
      </div>
    </div>
  )
}

export function FormationROICalculator() {
  const [collaborateurs, setCollaborateurs] = useState(8)
  const [heuresParSemaine, setHeuresParSemaine] = useState(6)
  const [coutHoraire, setCoutHoraire] = useState(60)

  const results = useMemo(() => {
    // After training: 2.5x faster on digital tasks → time on those tasks shrinks by 60%
    const GAIN_FACTOR = 0.60
    const SEMAINES_AN = 48

    const heuresSavedPerPersonPerWeek = heuresParSemaine * GAIN_FACTOR
    const heuresSavedTeamPerWeek = heuresSavedPerPersonPerWeek * collaborateurs
    const heuresSavedPerYear = heuresSavedTeamPerWeek * SEMAINES_AN

    const valeurSemaine = heuresSavedTeamPerWeek * coutHoraire
    const valeurAnnuelle = heuresSavedPerYear * coutHoraire

    // Training investment: groups of 10, full day CHF 3'000
    const sessions = Math.ceil(collaborateurs / 10)
    const investissement = sessions * 3000

    const roiPct = Math.round(((valeurAnnuelle - investissement) / investissement) * 100)
    const paybackSemaines = Math.ceil(investissement / valeurSemaine)

    return {
      heuresSavedPerPersonPerWeek,
      heuresSavedTeamPerWeek,
      heuresSavedPerYear,
      valeurSemaine,
      valeurAnnuelle,
      investissement,
      roiPct,
      paybackSemaines,
      sessions,
    }
  }, [collaborateurs, heuresParSemaine, coutHoraire])

  return (
    <InfiniteGrid
      accentRgb="255,107,0"
      blob1="rgba(255,107,0,0.07)"
      blob2="rgba(212,212,216,0.04)"
      className="bg-bg-card border-y border-border"
    >
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-14">
            <GradTag className="mb-4">Calculateur ROI</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Ce que ça vaut de former votre équipe.
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Une équipe formée travaille 2 à 3 fois plus vite sur ses tâches digitales. Estimez ce que ça représente concrètement pour votre entreprise.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            className="rounded-[24px] border overflow-hidden backdrop-blur-md"
            style={{ background: 'rgba(12,8,4,0.72)', borderColor: chromeBd, boxShadow: '0 0 60px rgba(255,107,0,0.06)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* ── Left: sliders ── */}
              <div className="p-8 md:p-10 space-y-8 border-b lg:border-b-0 lg:border-r backdrop-blur-sm" style={{ borderColor: chromeBd, background: 'rgba(255,107,0,0.02)' }}>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color: accent }}>
                    Votre situation actuelle
                  </p>
                  <div className="space-y-7">
                    <Slider
                      label="Collaborateurs à former"
                      value={collaborateurs}
                      min={1}
                      max={50}
                      step={1}
                      display={`${collaborateurs} pers.`}
                      onChange={setCollaborateurs}
                    />
                    <Slider
                      label="Heures/semaine sur tâches digitales (par pers.)"
                      value={heuresParSemaine}
                      min={1}
                      max={20}
                      step={1}
                      display={`${heuresParSemaine}h / sem.`}
                      onChange={setHeuresParSemaine}
                    />
                    <Slider
                      label="Coût horaire moyen chargé"
                      value={coutHoraire}
                      min={30}
                      max={150}
                      step={5}
                      display={`CHF ${coutHoraire}/h`}
                      onChange={setCoutHoraire}
                    />
                  </div>
                </div>

                {/* Before / After visual */}
                <div
                  className="rounded-[14px] p-5 border backdrop-blur-sm"
                  style={{ background: 'rgba(212,212,216,0.05)', borderColor: chromeBd }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
                    Temps moyen sur une tâche digitale
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-text-muted text-xs">Avant formation</span>
                        <span className="text-text-secondary text-xs font-semibold">{heuresParSemaine}h / sem.</span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: '100%', background: 'rgba(239,68,68,0.55)' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-semibold" style={{ color: green }}>Après formation</span>
                        <span className="text-xs font-bold" style={{ color: green }}>
                          {(heuresParSemaine * 0.4).toFixed(1)}h / sem.
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: '40%', background: `linear-gradient(90deg, ${green}66, ${green})` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-text-muted text-[10px] mt-3 text-center">
                    Hypothèse : 2,5x plus efficace sur les tâches digitales après formation
                  </p>
                </div>
              </div>

              {/* ── Right: results ── */}
              <div className="p-8 md:p-10 flex flex-col gap-5 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.15)' }}>
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                  Impact estimé pour votre entreprise
                </p>

                {/* Main metric */}
                <div
                  className="rounded-[16px] p-6 border text-center backdrop-blur-sm"
                  style={{ background: greenBg, borderColor: greenBorder }}
                >
                  <p className="text-text-muted text-xs mb-1">Valeur libérée sur 1 an</p>
                  <p className="text-4xl md:text-5xl font-bold leading-none" style={{ color: green }}>
                    {fmtChf(results.valeurAnnuelle)}
                  </p>
                  <p className="text-text-muted text-[11px] mt-2">
                    Soit {fmtChf(results.valeurSemaine)} récupérés chaque semaine
                  </p>
                </div>

                {/* 3 sub-metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-[12px] p-4 border backdrop-blur-sm"
                    style={{ background: chromeBg, borderColor: chromeBd }}
                  >
                    <p className="text-text-muted text-[10px] mb-1">Heures récupérées / sem.</p>
                    <p className="text-2xl font-bold" style={{ color: chrome }}>
                      {fmt(results.heuresSavedTeamPerWeek)}<span className="text-base font-semibold">h</span>
                    </p>
                    <p className="text-text-muted text-[10px] mt-0.5">
                      {results.heuresSavedPerPersonPerWeek.toFixed(1)}h / pers.
                    </p>
                  </div>
                  <div
                    className="rounded-[12px] p-4 border backdrop-blur-sm"
                    style={{ background: chromeBg, borderColor: chromeBd }}
                  >
                    <p className="text-text-muted text-[10px] mb-1">Heures libérées / an</p>
                    <p className="text-2xl font-bold" style={{ color: chrome }}>
                      {fmt(results.heuresSavedPerYear)}<span className="text-base font-semibold">h</span>
                    </p>
                    <p className="text-text-muted text-[10px] mt-0.5">
                      sur {48} semaines travaillées
                    </p>
                  </div>
                </div>

                {/* Investment vs ROI */}
                <div
                  className="rounded-[16px] p-5 border backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.09)' }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-text-muted text-[10px] mb-0.5">Investissement formation</p>
                      <p className="text-white font-bold text-lg">{fmtChf(results.investissement)}</p>
                      <p className="text-text-muted text-[10px]">
                        {results.sessions} session{results.sessions > 1 ? 's' : ''} · jusqu&apos;à {results.sessions * 10} pers.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-muted text-[10px] mb-0.5">ROI estimé</p>
                      <p className="text-2xl font-bold" style={{ color: green }}>
                        {results.roiPct > 0 ? '+' : ''}{results.roiPct}%
                      </p>
                      <p className="text-text-muted text-[10px]">sur 12 mois</p>
                    </div>
                  </div>

                  {/* Payback bar */}
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-text-muted text-[10px]">Délai de rentabilité</span>
                      <span className="text-xs font-bold" style={{ color: chrome }}>
                        {results.paybackSemaines} semaine{results.paybackSemaines > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (results.paybackSemaines / 52) * 100)}%`,
                          background: `linear-gradient(90deg, rgba(255,107,0,0.5), ${accent})`,
                        }}
                      />
                    </div>
                    <p className="text-text-muted text-[10px] mt-1">
                      L&apos;investissement est rentabilisé en {results.paybackSemaines < 4
                        ? 'moins d\'un mois'
                        : results.paybackSemaines < 8
                          ? 'moins de 2 mois'
                          : `${Math.ceil(results.paybackSemaines / 4)} mois`
                      }
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Demander un devis →
                  </LiquidMetalButton>
                </div>

                <p className="text-text-muted text-[10px] text-center leading-relaxed">
                  Estimation basée sur 2,5x de gain d&apos;efficacité moyen observé après nos formations, 48 semaines/an.
                  Chaque situation est différente : discutons de la vôtre.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
    </InfiniteGrid>
  )
}
