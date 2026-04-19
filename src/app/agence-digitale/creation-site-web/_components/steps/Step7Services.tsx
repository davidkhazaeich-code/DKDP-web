'use client'

import { Wrench, GraduationCap, Shield, Video, Timer, Check } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { MultiSelectCard } from '../ui/MultiSelectCard'
import { SectionLabel } from '../ui/SectionLabel'

export function Step7Services() {
  const { state, dispatch } = useEstimator()

  const isRushSelected = state.services.includes('rush')

  return (
    <div className="space-y-4">
      <SectionLabel optional>Services complémentaires</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        <MultiSelectCard
          title="Maintenance"
          description="Mises à jour, sécurité, modifications mineures"
          price="CHF 150"
          priceLabel="/mois"
          icon={<Wrench size={18} />}
          selected={state.services.includes('maintenance')}
          onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'maintenance' })}
        />

        <MultiSelectCard
          title="Formation"
          description="Formation à la gestion de votre site"
          price="CHF 200"
          icon={<GraduationCap size={18} />}
          selected={state.services.includes('training')}
          onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'training' })}
        />

        <MultiSelectCard
          title="Conformité RGPD"
          description="Politique de confidentialité, cookies, consentement"
          price="CHF 500"
          icon={<Shield size={18} />}
          selected={state.services.includes('rgpd')}
          onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'rgpd' })}
        />

        <MultiSelectCard
          title="Production vidéo"
          description="Vidéo de présentation ou promotionnelle"
          price="CHF 1'500-4'000"
          icon={<Video size={18} />}
          selected={state.services.includes('video')}
          onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'video' })}
        />
      </div>

      {/* Livraison express — full width, orange highlight */}
      <button
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'rush' })}
        className={[
          'group relative w-full rounded-xl p-3.5 sm:p-4 text-left transition-all duration-200 cursor-pointer min-h-[72px] sm:min-h-[80px]',
          isRushSelected
            ? 'border border-orange-500/60 bg-orange-500/[0.10] shadow-[0_0_0_1px_rgba(255,140,0,0.2)]'
            : 'border border-orange-500/25 bg-orange-500/[0.04] hover:border-orange-500/40 hover:bg-orange-500/[0.06]',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200',
            isRushSelected
              ? 'bg-orange-500 border border-orange-400 opacity-100 scale-100'
              : 'bg-transparent border border-orange-500/30 opacity-0 scale-75',
          ].join(' ')}
        >
          {isRushSelected && <Check size={12} className="text-white" strokeWidth={3} />}
        </span>

        <div className="flex items-start gap-3 pr-8">
          <span className={['mt-0.5 flex-shrink-0 transition-colors', isRushSelected ? 'text-orange-400' : 'text-orange-500/70'].join(' ')}>
            <Timer size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <span className="text-sm font-semibold text-zinc-100 leading-snug">
                Livraison express (-1 mois)
              </span>
              <span className="text-xs font-semibold text-orange-400 shrink-0">+30%</span>
            </div>
            <p className="mt-1 text-xs text-orange-400/80 leading-relaxed">
              Votre projet livré en moins d&apos;un mois, +30% sur le coût total
            </p>
          </div>
        </div>
      </button>
    </div>
  )
}
