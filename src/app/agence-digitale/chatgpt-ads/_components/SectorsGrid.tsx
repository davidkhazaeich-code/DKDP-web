import { ShoppingBag, Wrench, BedDouble, GraduationCap, Landmark, Ban, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { violet, green, orange } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Pour qui ChatGPT Ads marche, pour qui pas encore. Catégories et
 * interdictions : politiques publicitaires OpenAI v1.5 du 31 août 2026 (fiche
 * du 10.09.2026). Les exemples sont des situations types, sans nom
 * d'entreprise réelle.
 */

type Card = { Icon: LucideIcon; title: string; text: string }

const GOOD: Record<Locale, Card[]> = {
  fr: [
    { Icon: ShoppingBag, title: 'Commerce et e-commerce', text: 'Une boutique de Carouge qui vend aussi en ligne : la carte s\'affiche quand quelqu\'un compare des produits, cherche une idée de cadeau ou demande où acheter près de chez lui.' },
    { Icon: Wrench, title: 'Services locaux', text: 'Artisans, studios de sport, salons de coiffure, garages, opticiens : le moment où quelqu\'un demande « qui contacter à Genève pour… » et donne son quartier.' },
    { Icon: BedDouble, title: 'Hôtellerie, restauration, tourisme', text: 'Un week-end à Montreux, une table pour un anniversaire à Lausanne, une activité un dimanche de pluie : des conversations qui finissent par une réservation.' },
    { Icon: GraduationCap, title: 'Formation et produits numériques', text: 'Cours, ateliers, logiciels, abonnements : la personne explique son objectif et son niveau, la carte répond à ce moment précis.' },
  ],
  en: [
    { Icon: ShoppingBag, title: 'Retail and e-commerce', text: 'A Carouge boutique that also sells online: the card shows up when someone compares products, looks for a gift idea or asks where to buy nearby.' },
    { Icon: Wrench, title: 'Local services', text: 'Tradespeople, gyms, hair salons, garages, opticians: the moment someone asks "who should I contact in Geneva for…" and names their neighbourhood.' },
    { Icon: BedDouble, title: 'Hotels, restaurants, tourism', text: 'A weekend in Montreux, a birthday table in Lausanne, something to do on a rainy Sunday: conversations that end with a booking.' },
    { Icon: GraduationCap, title: 'Training and digital products', text: 'Courses, workshops, software, subscriptions: the person explains their goal and level, and the card answers that exact moment.' },
  ],
}

const CAUTION: Record<Locale, Card[]> = {
  fr: [
    { Icon: Landmark, title: 'Finance, santé, juridique', text: 'Autorisés au cas par cas aux États-Unis seulement. Hors États-Unis, OpenAI les déclare généralement interdits. On ne vend pas ce canal à une banque, un cabinet médical ou une étude d\'avocats sans validation préalable d\'OpenAI.' },
    { Icon: Ban, title: 'Alcool, jeux d\'argent, politique, emploi et logement', text: 'Interdits par les politiques publicitaires d\'OpenAI (version du 31 août 2026), y compris les annonces individuelles d\'emploi ou de logement. Une plateforme d\'annonces reste possible sans référence à une offre précise.' },
    { Icon: Briefcase, title: 'B2B : à tester avec prudence', text: 'Les décideurs sont souvent sur Plus, Business ou Enterprise, des forfaits sans annonces. Le canal peut toucher les indépendants et les petites structures ; un pilote de 30 jours tranche.' },
  ],
  en: [
    { Icon: Landmark, title: 'Finance, health, legal', text: 'Allowed case by case in the United States only. Outside the US, OpenAI describes them as generally prohibited. We do not sell this channel to a bank, a medical practice or a law firm without prior approval from OpenAI.' },
    { Icon: Ban, title: 'Alcohol, gambling, politics, jobs and housing', text: 'Prohibited by OpenAI\'s ad policies (version of 31 August 2026), including individual job or housing listings. A listings platform remains possible as long as no specific listing is referenced.' },
    { Icon: Briefcase, title: 'B2B: test with care', text: 'Decision-makers often sit on Plus, Business or Enterprise, plans without ads. The channel can still reach freelancers and small firms; a 30-day pilot settles it.' },
  ],
}

const HEAD: Record<Locale, { good: string; caution: string }> = {
  fr: { good: 'Ça marche', caution: 'Pas encore, ou sur validation' },
  en: { good: 'It works', caution: 'Not yet, or subject to approval' },
}

export function SectorsGrid({ lang = 'fr' }: { lang?: Locale }) {
  const h = HEAD[lang]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: green.color }}>{h.good}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GOOD[lang].map((c) => (
            <div key={c.title} className="flex flex-col gap-3 p-5 rounded-[14px] border border-border bg-bg-card h-full">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[10px]"
                style={{ background: violet.bg, border: `1px solid ${violet.border}` }}
              >
                <c.Icon size={18} style={{ color: violet.color }} aria-hidden="true" />
              </div>
              <h3 className="text-text font-bold text-base leading-snug">{c.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: orange.color }}>{h.caution}</p>
        <div className="grid grid-cols-1 gap-4">
          {CAUTION[lang].map((c) => (
            <div
              key={c.title}
              className="flex gap-4 p-5 rounded-[14px] border h-full"
              style={{ background: orange.bg, borderColor: orange.border }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
                style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid ${orange.border}` }}
              >
                <c.Icon size={18} style={{ color: orange.color }} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-text font-bold text-base leading-snug mb-1.5">{c.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
