'use client'

import { Wrench, GraduationCap, Shield, Video, Timer, Check } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { MultiSelectCard } from '../ui/MultiSelectCard'

export function Step7Services() {
  const { state, dispatch } = useEstimator()

  const isRushSelected = state.services.includes('rush')

  return (
    <div className="space-y-3">
      {/* Maintenance */}
      <MultiSelectCard
        title="Maintenance"
        description="Mises à jour, sécurité, modifications mineures incluses"
        price="CHF 150"
        priceLabel="/mois"
        icon={<Wrench size={18} />}
        selected={state.services.includes('maintenance')}
        onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'maintenance' })}
      />

      {/* Formation */}
      <MultiSelectCard
        title="Formation"
        description="Formation à la gestion de votre site"
        price="CHF 200"
        icon={<GraduationCap size={18} />}
        selected={state.services.includes('training')}
        onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'training' })}
      />

      {/* Conformite RGPD */}
      <MultiSelectCard
        title="Conformité RGPD"
        description="Politique de confidentialité, cookies, consentement"
        price="CHF 500"
        icon={<Shield size={18} />}
        selected={state.services.includes('rgpd')}
        onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'rgpd' })}
      />

      {/* Production video */}
      <MultiSelectCard
        title="Production vidéo"
        description="Vidéo de présentation ou promotionnelle"
        price="CHF 1'500-4'000"
        icon={<Video size={18} />}
        selected={state.services.includes('video')}
        onToggle={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'video' })}
      />

      {/* Livraison express — special styling */}
      <div
        onClick={() => dispatch({ type: 'TOGGLE_SERVICE', value: 'rush' })}
        className={[
          'relative rounded-xl p-4 cursor-pointer transition-all duration-200',
          isRushSelected
            ? 'border border-orange-500/40 bg-orange-500/10'
            : 'border border-orange-500/20 bg-orange-500/5 hover:border-orange-500/30',
        ].join(' ')}
      >
        {/* Checkmark top-right */}
        {isRushSelected && (
          <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/40">
            <Check size={11} className="text-orange-300" strokeWidth={2.5} />
          </span>
        )}

        {/* Header */}
        <div className={['flex items-start justify-between gap-3', isRushSelected ? 'pr-6' : ''].join(' ')}>
          <div className="flex items-center gap-2 flex-wrap">
            <Timer size={18} className={isRushSelected ? 'text-orange-400' : 'text-zinc-500'} />
            <span className="text-sm font-medium text-zinc-100 leading-snug">
              Livraison express
            </span>
          </div>
          <span className="text-sm font-medium text-zinc-400 whitespace-nowrap">+30%</span>
        </div>

        {/* Orange warning */}
        <p className="mt-1 text-xs text-orange-400/80 leading-relaxed">
          Applique +30% sur le coût total du projet
        </p>
      </div>
    </div>
  )
}
