import { MessageSquare, Sparkles, MousePointerClick } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { violet, green } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Le parcours d'une annonce dans ChatGPT en trois temps : la question, la
 * réponse, la carte sponsorisée. Faits : fiche du 10.09.2026 (format de la
 * carte, système séparé, enchère au second prix pondérée par la pertinence).
 */

const V = violet.color
const VB = violet.bg
const VD = violet.border

type Step = { Icon: LucideIcon; n: string; title: string; text: string }

const STEPS: Record<Locale, Step[]> = {
  fr: [
    {
      Icon: MessageSquare,
      n: '01',
      title: 'La question',
      text: 'Un utilisateur Free ou Go décrit ce qu\'il cherche : un cours du soir, un artisan, un séjour, une formation. Il donne son contexte et ses contraintes, pas trois mots-clés.',
    },
    {
      Icon: Sparkles,
      n: '02',
      title: 'La réponse',
      text: 'ChatGPT répond comme d\'habitude. Les annonces tournent sur un système séparé : elles n\'influencent ni le contenu, ni l\'ordre, ni le ton de la réponse.',
    },
    {
      Icon: MousePointerClick,
      n: '03',
      title: 'La carte sponsorisée',
      text: 'Sous la réponse, une carte étiquetée « sponsorisé » propose votre offre quand vos indications de contexte, votre titre, votre texte et votre page de destination correspondent. Enchère au second prix, pondérée par la pertinence.',
    },
  ],
  en: [
    {
      Icon: MessageSquare,
      n: '01',
      title: 'The question',
      text: 'A Free or Go user describes what they need: an evening class, a tradesperson, a weekend away, a course. They give context and constraints, not three keywords.',
    },
    {
      Icon: Sparkles,
      n: '02',
      title: 'The answer',
      text: 'ChatGPT answers as usual. Ads run on a separate system: they influence neither the content, nor the order, nor the tone of the answer.',
    },
    {
      Icon: MousePointerClick,
      n: '03',
      title: 'The sponsored card',
      text: 'Below the answer, a card labelled "sponsored" offers your service when your context hints, title, copy and landing page match. Second-price auction, weighted by relevance.',
    },
  ],
}

const CARD_PARTS: Record<Locale, { title: string; items: string[]; note: string }> = {
  fr: {
    title: 'Ce que contient la carte',
    items: ['Nom de l\'annonceur', 'Favicon (votre logo)', 'Titre', 'Texte de description', 'Image', 'Page de destination'],
    note: 'Un seul format aujourd\'hui. Pas de vidéo, pas de formulaire dans ChatGPT : le clic mène sur votre site, où se joue la conversion.',
  },
  en: {
    title: 'What the card contains',
    items: ['Advertiser name', 'Favicon (your logo)', 'Title', 'Description copy', 'Image', 'Landing page'],
    note: 'One format for now. No video, no form inside ChatGPT: the click lands on your site, where the conversion happens.',
  },
}

export function HowItWorks({ lang = 'fr' }: { lang?: Locale }) {
  const steps = STEPS[lang]
  const card = CARD_PARTS[lang]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
      <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 list-none m-0 p-0">
        {steps.map((s, i) => (
          <li key={s.n} className="relative flex flex-col gap-4 p-6 rounded-[16px] border border-border bg-bg-card h-full">
            <div className="flex items-center justify-between">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                style={{ background: VB, border: `1px solid ${VD}` }}
              >
                <s.Icon size={20} style={{ color: V }} aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold tracking-widest" style={{ color: V }}>{s.n}</span>
            </div>
            <h3 className="text-text font-bold text-lg leading-snug">{s.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{s.text}</p>
            {i < steps.length - 1 && (
              <svg
                aria-hidden="true"
                className="hidden md:block absolute top-1/2 -right-[14px] -translate-y-1/2 z-10"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M4 12h14m0 0-5-5m5 5-5 5" stroke={V} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>

      <aside
        className="rounded-[16px] p-6 border"
        style={{ background: VB, borderColor: VD }}
        aria-label={card.title}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: V }}>{card.title}</p>
        <ul className="space-y-2.5 m-0 p-0 list-none">
          {card.items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-text">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0"
                style={{ background: green.bg, border: `1px solid ${green.border}` }}
                aria-hidden="true"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5.2 4.2 7.3 8 3.2" stroke={green.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-text-muted text-xs leading-relaxed mt-5">{card.note}</p>
      </aside>
    </div>
  )
}
