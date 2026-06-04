'use client'

import {
  Search, TrendingUp, Target, Share2, Filter,
  Database, Mail, Zap, BarChart3,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { MultiSelectCard } from '../ui/MultiSelectCard'
import { CollapsibleSection } from '../ui/CollapsibleSection'

const T = {
  fr: {
    seoTitle: 'SEO',
    baseSeoTitle: 'SEO technique de base',
    alwaysIncluded: 'Toujours inclus',
    baseSeoDesc: 'Optimisation on-page, meta tags, sitemap, performance',
    advancedTitle: 'SEO avancé',
    advancedDesc: 'Audit complet, optimisation sémantique, stratégie mots-clés',
    monthlyTitle: 'SEO mensuel',
    monthlyDesc: 'Suivi, rapports, optimisation continue',
    perMonth: '/mois',
    acquisitionTitle: 'Acquisition & marketing digital',
    seaTitle: 'Google Ads (SEA)',
    seaDesc: 'Campagnes publicitaires Search et Display',
    socialTitle: 'Réseaux sociaux',
    socialDesc: 'Gestion et animation de vos profils',
    funnelTitle: 'Funnel de conversion',
    funnelDesc: 'Tunnel de vente et landing pages',
    automationTitle: 'Automatisation & CRM',
    crmTitle: 'Intégration CRM',
    crmDesc: 'Gestion centralisée de vos contacts',
    emailTitle: 'Email marketing',
    emailDesc: 'Séquences automatisées et campagnes',
    workflowsTitle: 'Workflows automatisés',
    workflowsDesc: 'Automatisation des tâches répétitives',
    dashboardTitle: 'Dashboard analytics',
    dashboardDesc: 'Tableaux de bord personnalisés',
  },
  en: {
    seoTitle: 'SEO',
    baseSeoTitle: 'Basic technical SEO',
    alwaysIncluded: 'Always included',
    baseSeoDesc: 'On-page optimisation, meta tags, sitemap, performance',
    advancedTitle: 'Advanced SEO',
    advancedDesc: 'Full audit, semantic optimisation, keyword strategy',
    monthlyTitle: 'Monthly SEO',
    monthlyDesc: 'Tracking, reports, ongoing optimisation',
    perMonth: '/month',
    acquisitionTitle: 'Acquisition and digital marketing',
    seaTitle: 'Google Ads (SEA)',
    seaDesc: 'Search and Display advertising campaigns',
    socialTitle: 'Social media',
    socialDesc: 'Management and content for your profiles',
    funnelTitle: 'Conversion funnel',
    funnelDesc: 'Sales funnel and landing pages',
    automationTitle: 'Automation and CRM',
    crmTitle: 'CRM integration',
    crmDesc: 'Centralised contact management',
    emailTitle: 'Email marketing',
    emailDesc: 'Automated sequences and campaigns',
    workflowsTitle: 'Automated workflows',
    workflowsDesc: 'Automation of repetitive tasks',
    dashboardTitle: 'Analytics dashboard',
    dashboardDesc: 'Custom dashboards',
  },
} as const

export function Step6Acquisition() {
  const { state, dispatch, lang } = useEstimator()
  const t = T[lang]

  const seoSelectedCount = state.seo.length
  const acquisitionSelectedCount = state.acquisition.length
  const automationSelectedCount = state.automation.length

  return (
    <div className="divide-y divide-[color:var(--border)]">

      {/* SEO */}
      <div className="pb-1 first:pt-0">
        <CollapsibleSection title={t.seoTitle} defaultOpen={true} selectedCount={seoSelectedCount}>
          <div className="space-y-2.5 sm:space-y-3">
            {/* Always included */}
            <div className="rounded-xl p-3.5 sm:p-4 border border-emerald-500/20 bg-emerald-500/[0.04]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-text">{t.baseSeoTitle}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                  {t.alwaysIncluded}
                </span>
              </div>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                {t.baseSeoDesc}
              </p>
            </div>

            <MultiSelectCard
              lang={lang}
              title={t.advancedTitle}
              description={t.advancedDesc}
              price="CHF 1'500"
              icon={<Search size={18} />}
              selected={state.seo.includes('advanced-oneshot')}
              onToggle={() => dispatch({ type: 'TOGGLE_SEO', value: 'advanced-oneshot' })}
            />
            <MultiSelectCard
              lang={lang}
              title={t.monthlyTitle}
              description={t.monthlyDesc}
              price="CHF 600"
              priceLabel={t.perMonth}
              icon={<TrendingUp size={18} />}
              selected={state.seo.includes('monthly')}
              onToggle={() => dispatch({ type: 'TOGGLE_SEO', value: 'monthly' })}
            />
          </div>
        </CollapsibleSection>
      </div>

      {/* Acquisition */}
      <div className="py-1">
        <CollapsibleSection title={t.acquisitionTitle} selectedCount={acquisitionSelectedCount}>
          <div className="space-y-2.5 sm:space-y-3">
            <MultiSelectCard
              lang={lang}
              title={t.seaTitle}
              description={t.seaDesc}
              price="CHF 400"
              priceLabel={t.perMonth}
              icon={<Target size={18} />}
              selected={state.acquisition.includes('sea')}
              onToggle={() => dispatch({ type: 'TOGGLE_ACQUISITION', value: 'sea' })}
            />
            <MultiSelectCard
              lang={lang}
              title={t.socialTitle}
              description={t.socialDesc}
              price="CHF 600"
              priceLabel={t.perMonth}
              icon={<Share2 size={18} />}
              selected={state.acquisition.includes('social')}
              onToggle={() => dispatch({ type: 'TOGGLE_ACQUISITION', value: 'social' })}
            />
            <MultiSelectCard
              lang={lang}
              title={t.funnelTitle}
              description={t.funnelDesc}
              price="CHF 2'000-4'000"
              icon={<Filter size={18} />}
              selected={state.acquisition.includes('funnel')}
              onToggle={() => dispatch({ type: 'TOGGLE_ACQUISITION', value: 'funnel' })}
            />
          </div>
        </CollapsibleSection>
      </div>

      {/* Automation */}
      <div className="pt-1 last:pb-0">
        <CollapsibleSection title={t.automationTitle} selectedCount={automationSelectedCount}>
          <div className="space-y-2.5 sm:space-y-3">
            <MultiSelectCard
              lang={lang}
              title={t.crmTitle}
              description={t.crmDesc}
              price="CHF 800-1'500"
              icon={<Database size={18} />}
              selected={state.automation.includes('crm')}
              onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'crm' })}
            />
            <MultiSelectCard
              lang={lang}
              title={t.emailTitle}
              description={t.emailDesc}
              price="CHF 1'200-2'500"
              icon={<Mail size={18} />}
              selected={state.automation.includes('email-marketing')}
              onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'email-marketing' })}
            />
            <MultiSelectCard
              lang={lang}
              title={t.workflowsTitle}
              description={t.workflowsDesc}
              price="CHF 500-2'000"
              icon={<Zap size={18} />}
              selected={state.automation.includes('workflows')}
              onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'workflows' })}
            />
            <MultiSelectCard
              lang={lang}
              title={t.dashboardTitle}
              description={t.dashboardDesc}
              price="CHF 600-1'200"
              icon={<BarChart3 size={18} />}
              selected={state.automation.includes('dashboard')}
              onToggle={() => dispatch({ type: 'TOGGLE_AUTOMATION', value: 'dashboard' })}
            />
          </div>
        </CollapsibleSection>
      </div>

    </div>
  )
}
