import type { Sector, FeatureId } from './types'

export const SECTORS: { id: Sector; label: string }[] = [
  { id: 'restaurant', label: 'Restaurant / Hôtel' },
  { id: 'health', label: 'Santé / Médical' },
  { id: 'legal', label: 'Juridique / Fiduciaire' },
  { id: 'real-estate', label: 'Immobilier' },
  { id: 'retail', label: 'Commerce / Retail' },
  { id: 'services', label: 'Services / Consulting' },
  { id: 'tech', label: 'Tech / SaaS' },
  { id: 'artisan', label: 'Artisan / BTP' },
  { id: 'training', label: 'Formation / Coaching' },
  { id: 'other', label: 'Autre' },
]

export const SECTOR_SUGGESTIONS: Partial<Record<Sector, FeatureId[]>> = {
  restaurant: ['booking', 'gallery'],
  health: ['form', 'booking'],
  retail: ['payment', 'newsletter'],
  services: ['blog-setup', 'newsletter'],
  tech: ['members', 'chatbot'],
  training: ['booking', 'members'],
}
