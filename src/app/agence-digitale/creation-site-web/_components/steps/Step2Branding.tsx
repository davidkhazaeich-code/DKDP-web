'use client'

import {
  CheckCircle2, Palette, RefreshCw, Paintbrush,
  Target, BarChart3, FileText,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { MultiSelectCard } from '../ui/MultiSelectCard'
import { SectionLabel } from '../ui/SectionLabel'

const T = {
  fr: {
    logo: 'Logo',
    logoExistingTitle: "J'ai déjà mon logo",
    logoExistingDesc: 'Fourni en vectoriel ou haute définition',
    included: 'Inclus',
    logoCreateTitle: 'Créer un logo',
    logoCreateDesc: 'Design original à votre image',
    logoModernizeTitle: 'Moderniser mon logo',
    logoModernizeDesc: "Refresh visuel de l'existant",
    identity: 'Identité visuelle',
    brandExistingTitle: "J'ai déjà ma charte",
    brandExistingDesc: 'Couleurs, typographies, style défini',
    brandCreateTitle: 'Créer une identité',
    brandCreateDesc: 'Palette, typo, charte complète',
    brandModernizeTitle: 'Moderniser mon branding',
    brandModernizeDesc: "Refonte partielle de l'existant",
    tags: ['Palette couleurs', 'Typographie', 'Charte graphique', 'Signature email'],
    strategy: 'Stratégie marketing',
    positioningTitle: 'Positionnement',
    positioningDesc: 'Définir votre proposition de valeur unique',
    marketTitle: 'Étude de marché',
    marketDesc: 'Analyse de la concurrence et opportunités',
    contentTitle: 'Stratégie de contenu',
    contentDesc: 'Planification éditoriale et mots-clés',
  },
  en: {
    logo: 'Logo',
    logoExistingTitle: 'I already have my logo',
    logoExistingDesc: 'Provided in vector or high resolution',
    included: 'Included',
    logoCreateTitle: 'Create a logo',
    logoCreateDesc: 'Original design tailored to you',
    logoModernizeTitle: 'Modernise my logo',
    logoModernizeDesc: 'Visual refresh of the existing one',
    identity: 'Visual identity',
    brandExistingTitle: 'I already have my brand guidelines',
    brandExistingDesc: 'Colours, typography, defined style',
    brandCreateTitle: 'Create an identity',
    brandCreateDesc: 'Palette, typography, complete guidelines',
    brandModernizeTitle: 'Modernise my branding',
    brandModernizeDesc: 'Partial redesign of the existing one',
    tags: ['Colour palette', 'Typography', 'Brand guidelines', 'Email signature'],
    strategy: 'Marketing strategy',
    positioningTitle: 'Positioning',
    positioningDesc: 'Define your unique value proposition',
    marketTitle: 'Market research',
    marketDesc: 'Competitive analysis and opportunities',
    contentTitle: 'Content strategy',
    contentDesc: 'Editorial planning and keywords',
  },
} as const

export function Step2Branding() {
  const { state, dispatch, lang } = useEstimator()
  const t = T[lang]

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* Logo */}
      <div>
        <SectionLabel optional lang={lang}>{t.logo}</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <SelectionCard
            title={t.logoExistingTitle}
            description={t.logoExistingDesc}
            price={t.included}
            priceColor="text-emerald-400"
            icon={<CheckCircle2 size={18} />}
            selected={state.logo === 'existing'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'existing' ? null : 'existing' })
            }
          />
          <SelectionCard
            title={t.logoCreateTitle}
            description={t.logoCreateDesc}
            price="CHF 800-1'500"
            icon={<Palette size={18} />}
            selected={state.logo === 'create'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'create' ? null : 'create' })
            }
          />
          <SelectionCard
            title={t.logoModernizeTitle}
            description={t.logoModernizeDesc}
            price="CHF 500-1'000"
            icon={<RefreshCw size={18} />}
            selected={state.logo === 'modernize'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'modernize' ? null : 'modernize' })
            }
          />
        </div>
      </div>

      {/* Identite visuelle */}
      <div>
        <SectionLabel optional lang={lang}>{t.identity}</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <SelectionCard
            title={t.brandExistingTitle}
            description={t.brandExistingDesc}
            price={t.included}
            priceColor="text-emerald-400"
            icon={<CheckCircle2 size={18} />}
            selected={state.branding === 'existing'}
            onClick={() =>
              dispatch({ type: 'SET_BRANDING', value: state.branding === 'existing' ? null : 'existing' })
            }
          />
          <SelectionCard
            title={t.brandCreateTitle}
            description={t.brandCreateDesc}
            price="CHF 1'000-2'000"
            icon={<Paintbrush size={18} />}
            selected={state.branding === 'create'}
            onClick={() =>
              dispatch({ type: 'SET_BRANDING', value: state.branding === 'create' ? null : 'create' })
            }
          >
            <div className="flex flex-wrap gap-1.5">
              {t.tags.map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-md border border-violet-500/30 bg-violet-500/10 text-violet-300 font-medium"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </SelectionCard>
          <SelectionCard
            title={t.brandModernizeTitle}
            description={t.brandModernizeDesc}
            price="CHF 600-1'200"
            icon={<RefreshCw size={18} />}
            selected={state.branding === 'modernize'}
            onClick={() =>
              dispatch({ type: 'SET_BRANDING', value: state.branding === 'modernize' ? null : 'modernize' })
            }
          />
        </div>
      </div>

      {/* stratégie marketing */}
      <div>
        <SectionLabel optional lang={lang}>{t.strategy}</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <MultiSelectCard
            lang={lang}
            title={t.positioningTitle}
            description={t.positioningDesc}
            price="CHF 800"
            icon={<Target size={18} />}
            selected={state.strategy.includes('positioning')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'positioning' })}
          />
          <MultiSelectCard
            lang={lang}
            title={t.marketTitle}
            description={t.marketDesc}
            price="CHF 600"
            icon={<BarChart3 size={18} />}
            selected={state.strategy.includes('market-study')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'market-study' })}
          />
          <MultiSelectCard
            lang={lang}
            title={t.contentTitle}
            description={t.contentDesc}
            price="CHF 1'200"
            icon={<FileText size={18} />}
            selected={state.strategy.includes('content-strategy')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'content-strategy' })}
          />
        </div>
      </div>

    </div>
  )
}
