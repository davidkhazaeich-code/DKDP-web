'use client'

import {
  Search, TrendingUp, Target, Share2, Filter,
  Database, Mail, Zap, BarChart3,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { MultiSelectCard } from '../ui/MultiSelectCard'
import { CollapsibleSection } from '../ui/CollapsibleSection'

export function Step6Acquisition() {
  const { state, dispatch } = useEstimator()

  const seoSelectedCount = state.seo.length
  const acquisitionSelectedCount = state.acquisition.length
  const automationSelectedCount = state.automation.length

  return (
    <div className="space-y-2">
      {/* Section 1 - SEO */}
      <CollapsibleSection
        title="SEO"
        defaultOpen={true}
        selectedCount={seoSelectedCount}
      >
        <div className="space-y-3">
          {/* Static "always included" row */}
          <div className="rounded-xl p-4 border border-white/10 bg-white/[0.02]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-zinc-100 leading-snug">
                  SEO technique de base
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  Toujours inclus
                </span>
              </div>
            </div>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              Optimisation on-page, meta tags, sitemap, performance
            </p>
          </div>

          {/* SEO avance */}
          <MultiSelectCard
            title="SEO avance"
            description="Audit complet, optimisation semantique, strategie mots-cles"
            price="CHF 1'500"
            icon={<Search size={18} />}
            selected={state.seo.includes('advanced-oneshot')}
            onToggle={() => dispatch({ type: 'TOGGLE_SEO', value: 'advanced-oneshot' })}
          />

          {/* SEO mensuel */}
          <MultiSelectCard
            title="SEO mensuel"
            description="Suivi, rapports, optimisation continue"
            price="CHF 600"
            priceLabel="/mois"
            icon={<TrendingUp size={18} />}
            selected={state.seo.includes('monthly')}
            onToggle={() => dispatch({ type: 'TOGGLE_SEO', value: 'monthly' })}
          />
        </div>
      </CollapsibleSection>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Section 2 - Acquisition & marketing digital */}
      <CollapsibleSection
        title="Acquisition & marketing digital"
        selectedCount={acquisitionSelectedCount}
      >
        <div className="space-y-3">
          <MultiSelectCard
            title="Google Ads (SEA)"
            description="Campagnes publicitaires Search et Display"
            price="CHF 400"
            priceLabel="/mois"
            icon={<Target size={18} />}
            selected={state.acquisition.includes('sea')}
            onToggle={() => dispatch({ type: 'TOGGLE_ACQUISITION', value: 'sea' })}
          />
          <MultiSelectCard
            title="Reseaux sociaux"
            description="Gestion et animation de vos profils"
            price="CHF 600"
            priceLabel="/mois"
            icon={<Share2 size={18} />}
            selected={state.acquisition.includes('social')}
            onToggle={() => dispatch({ type: 'TOGGLE_ACQUISITION', value: 'social' })}
          />
          <MultiSelectCard
            title="Funnel de conversion"
            description="Tunnel de vente et landing pages"
            price="CHF 2'000-4'000"
            icon={<Filter size={18} />}
            selected={state.acquisition.includes('funnel')}
            onToggle={() => dispatch({ type: 'TOGGLE_ACQUISITION', value: 'funnel' })}
          />
        </div>
      </CollapsibleSection>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Section 3 - Automatisation & CRM */}
      <CollapsibleSection
        title="Automatisation & CRM"
        selectedCount={automationSelectedCount}
      >
        <div className="space-y-3">
          <MultiSelectCard
            title="Integration CRM"
            description="Gestion centralisee de vos contacts"
            price="CHF 800-1'500"
            icon={<Database size={18} />}
            selected={state.automation.includes('crm')}
            onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'crm' })}
          />
          <MultiSelectCard
            title="Email marketing"
            description="Sequences automatisees et campagnes"
            price="CHF 1'200-2'500"
            icon={<Mail size={18} />}
            selected={state.automation.includes('email-marketing')}
            onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'email-marketing' })}
          />
          <MultiSelectCard
            title="Workflows automatises"
            description="Automatisation des taches repetitives"
            price="CHF 500-2'000"
            icon={<Zap size={18} />}
            selected={state.automation.includes('workflows')}
            onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'workflows' })}
          />
          <MultiSelectCard
            title="Dashboard analytics"
            description="Tableaux de bord personnalises"
            price="CHF 600-1'200"
            icon={<BarChart3 size={18} />}
            selected={state.automation.includes('dashboard')}
            onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'dashboard' })}
          />
        </div>
      </CollapsibleSection>
    </div>
  )
}
