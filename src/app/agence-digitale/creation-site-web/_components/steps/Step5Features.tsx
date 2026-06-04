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

const FEATURES_FR: FeatureItem[] = [
  { id: 'blog-setup', title: 'Création de blog', description: 'structuré, catégories, articles', price: 'CHF 800', icon: <BookOpen size={18} /> },
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

const FEATURES_EN: FeatureItem[] = [
  { id: 'blog-setup', title: 'Blog setup', description: 'structured, categories, articles', price: 'CHF 800', icon: <BookOpen size={18} /> },
  { id: 'blog-management', title: 'Blog management', description: 'Monthly publishing and maintenance', price: 'CHF 300', priceLabel: '/month', icon: <PenSquare size={18} /> },
  { id: 'form', title: 'Custom form', description: 'Contact, quote, registration', price: 'CHF 400', icon: <ClipboardList size={18} /> },
  { id: 'booking', title: 'Booking system', description: 'Online appointment scheduling', price: "CHF 1'200", icon: <CalendarCheck size={18} /> },
  { id: 'members', title: 'Member area', description: 'User accounts and restricted access', price: "CHF 2'000", icon: <Users size={18} /> },
  { id: 'chatbot', title: 'AI chatbot', description: 'Smart conversational assistant', price: "CHF 1'500", icon: <MessageSquare size={18} /> },
  { id: 'payment', title: 'Online payment', description: 'Stripe, Twint or another gateway', price: "CHF 1'800", icon: <CreditCard size={18} /> },
  { id: 'newsletter', title: 'Newsletter', description: 'Mailchimp or similar integration', price: 'CHF 300', icon: <Mail size={18} /> },
  { id: 'gallery', title: 'Photo/video gallery', description: 'Portfolio or visual showcase', price: 'CHF 500', icon: <ImageIcon size={18} /> },
  { id: 'extra-pages', title: 'Additional pages', description: 'Extra content', price: 'CHF 200/page', icon: <FilePlus size={18} /> },
]

const T = {
  fr: {
    features: 'Fonctionnalités',
    hint: (n: number) => `${n} suggestion${n > 1 ? 's' : ''} pour votre secteur`,
  },
  en: {
    features: 'Features',
    hint: (n: number) => `${n} suggestion${n > 1 ? 's' : ''} for your industry`,
  },
} as const

export function Step5Features() {
  const { state, dispatch, lang } = useEstimator()
  const t = T[lang]
  const FEATURES = lang === 'en' ? FEATURES_EN : FEATURES_FR

  const recommended: FeatureId[] =
    state.sector && state.sector in SECTOR_SUGGESTIONS
      ? (SECTOR_SUGGESTIONS[state.sector] ?? [])
      : []

  return (
    <div className="space-y-4">
      <SectionLabel
        optional
        lang={lang}
        hint={recommended.length > 0 ? t.hint(recommended.length) : undefined}
      >
        {t.features}
      </SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {FEATURES.map((feature) => (
          <MultiSelectCard
            key={feature.id}
            lang={lang}
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
