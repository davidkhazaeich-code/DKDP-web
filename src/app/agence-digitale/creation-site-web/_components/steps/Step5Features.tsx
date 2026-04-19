'use client'

import { ReactNode } from 'react'
import {
  BookOpen, PenSquare, ClipboardList, CalendarCheck,
  Users, MessageSquare, CreditCard, Mail, Image as ImageIcon, FilePlus,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { MultiSelectCard } from '../ui/MultiSelectCard'
import { SectionLabel } from '../ui/SectionLabel'
import { SECTOR_SUGGESTIONS } from '@/lib/estimation/sectors'
import type { FeatureId } from '@/lib/estimation/types'

interface FeatureItem {
  id: FeatureId
  title: string
  description: string
  price: string
  priceLabel?: string
  icon: ReactNode
}

const FEATURES: FeatureItem[] = [
  { id: 'blog-setup', title: 'Création de blog', description: 'Structure, catégories, articles', price: 'CHF 800', icon: <BookOpen size={18} /> },
  { id: 'blog-management', title: 'Gestion de blog', description: 'Publication et maintenance mensuelle', price: 'CHF 300', priceLabel: '/mois', icon: <PenSquare size={18} /> },
  { id: 'form', title: 'Formulaire sur-mesure', description: 'Contact, devis, inscription', price: 'CHF 400', icon: <ClipboardList size={18} /> },
  { id: 'booking', title: 'Système de réservation', description: 'Prise de rendez-vous en ligne', price: "CHF 1'200", icon: <CalendarCheck size={18} /> },
  { id: 'members', title: 'Espace membres', description: 'Comptes utilisateurs et accès restreint', price: "CHF 2'000", icon: <Users size={18} /> },
  { id: 'chatbot', title: 'Chatbot IA', description: 'Assistant conversationnel intelligent', price: "CHF 1'500", icon: <MessageSquare size={18} /> },
  { id: 'payment', title: 'Paiement en ligne', description: 'Stripe, Twint ou autre passerelle', price: "CHF 1'800", icon: <CreditCard size={18} /> },
  { id: 'newsletter', title: 'Newsletter', description: 'Intégration Mailchimp ou similaire', price: 'CHF 300', icon: <Mail size={18} /> },
  { id: 'gallery', title: 'Galerie photo/vidéo', description: 'Portfolio ou showcase visuel', price: 'CHF 500', icon: <ImageIcon size={18} /> },
  { id: 'extra-pages', title: 'Pages supplémentaires', description: 'Contenu additionnel', price: 'CHF 200/page', icon: <FilePlus size={18} /> },
]

export function Step5Features() {
  const { state, dispatch } = useEstimator()

  const recommended: FeatureId[] =
    state.sector && state.sector in SECTOR_SUGGESTIONS
      ? (SECTOR_SUGGESTIONS[state.sector] ?? [])
      : []

  return (
    <div className="space-y-4">
      <SectionLabel
        optional
        hint={recommended.length > 0 ? `${recommended.length} suggestion${recommended.length > 1 ? 's' : ''} pour votre secteur` : undefined}
      >
        Fonctionnalités
      </SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {FEATURES.map((feature) => (
          <MultiSelectCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            price={feature.price}
            priceLabel={feature.priceLabel}
            icon={feature.icon}
            selected={state.features.includes(feature.id)}
            onToggle={() => dispatch({ type: 'TOGGLE_FEATURE', value: feature.id })}
            recommended={recommended.includes(feature.id)}
          />
        ))}
      </div>
    </div>
  )
}
