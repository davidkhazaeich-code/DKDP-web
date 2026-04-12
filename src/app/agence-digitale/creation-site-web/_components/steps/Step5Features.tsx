'use client'

import { useEstimator } from '../EstimatorContext'
import { MultiSelectCard } from '../ui/MultiSelectCard'
import { SECTOR_SUGGESTIONS } from '@/lib/estimation/sectors'
import type { FeatureId } from '@/lib/estimation/types'

interface FeatureItem {
  id: FeatureId
  title: string
  description: string
  price: string
  priceLabel?: string
}

const FEATURES: FeatureItem[] = [
  {
    id: 'blog-setup',
    title: 'Creation de blog',
    description: 'Structure, categories, articles',
    price: 'CHF 800',
  },
  {
    id: 'blog-management',
    title: 'Gestion de blog',
    description: 'Publication et maintenance mensuelle',
    price: 'CHF 300',
    priceLabel: '/mois',
  },
  {
    id: 'form',
    title: 'Formulaire sur mesure',
    description: 'Contact, devis, inscription',
    price: 'CHF 400',
  },
  {
    id: 'booking',
    title: 'Systeme de reservation',
    description: 'Prise de rendez-vous en ligne',
    price: 'CHF 1\'200',
  },
  {
    id: 'members',
    title: 'Espace membres',
    description: 'Comptes utilisateurs et acces restreint',
    price: 'CHF 2\'000',
  },
  {
    id: 'chatbot',
    title: 'Chatbot IA',
    description: 'Assistant conversationnel intelligent',
    price: 'CHF 1\'500',
  },
  {
    id: 'payment',
    title: 'Paiement en ligne',
    description: 'Stripe, Twint ou autre passerelle',
    price: 'CHF 1\'800',
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Integration Mailchimp ou similaire',
    price: 'CHF 300',
  },
  {
    id: 'gallery',
    title: 'Galerie photo/video',
    description: 'Portfolio ou showcase visuel',
    price: 'CHF 500',
  },
  {
    id: 'extra-pages',
    title: 'Pages supplementaires',
    description: 'Contenu additionnel',
    price: 'CHF 200/page',
  },
]

export function Step5Features() {
  const { state, dispatch } = useEstimator()

  const recommended: FeatureId[] =
    state.sector && state.sector in SECTOR_SUGGESTIONS
      ? (SECTOR_SUGGESTIONS[state.sector] ?? [])
      : []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {FEATURES.map((feature) => (
        <MultiSelectCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          price={feature.price}
          priceLabel={feature.priceLabel}
          selected={state.features.includes(feature.id)}
          onToggle={() => dispatch({ type: 'TOGGLE_FEATURE', value: feature.id })}
          recommended={recommended.includes(feature.id)}
        />
      ))}
    </div>
  )
}
