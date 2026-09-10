import Image from 'next/image'
import { Check, Info, Minus } from 'lucide-react'
import { orange, green, chrome } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Carte produit du hero : ChatGPT Astra (GPT-6) en un coup d'oeil, avec le
 * selecteur de modeles tel qu'il se presente en septembre 2026 et ou chaque
 * modele repond selon l'abonnement. Remplace la photo de session du hero de la
 * page Claude. Faits : fiche Astra du 10.09.2026.
 */

const COPY = {
  fr: {
    kicker: 'Nouveau modèle phare d\'OpenAI',
    released: 'Sorti le 3 septembre 2026',
    selector: 'Sélecteur de modèles',
    models: [
      { name: 'GPT-6 Astra', where: 'Pro, Business et Enterprise dans le chat · Plus dans Work et Codex', status: 'astra' as const },
      { name: 'GPT-5.6 Sol', where: 'Le chat des comptes Plus', status: 'other' as const },
      { name: 'GPT-5.6 Luna', where: 'Comptes Free et Go', status: 'none' as const },
    ],
    stats: [
      { v: '1M', l: 'tokens de contexte' },
      { v: '4,2 %', l: 'd\'hallucinations, contre 12,2 % pour Sol, selon OpenAI' },
      { v: '128k', l: 'tokens de sortie' },
    ],
    footer: 'Agit dans un navigateur, remplit des formulaires, livre des documents finis. Texte et image en entrée, pas d\'audio ni de vidéo en natif.',
  },
  en: {
    kicker: 'OpenAI\'s new flagship model',
    released: 'Released on 3 September 2026',
    selector: 'Model picker',
    models: [
      { name: 'GPT-6 Astra', where: 'Pro, Business and Enterprise in the chat · Plus in Work and Codex', status: 'astra' as const },
      { name: 'GPT-5.6 Sol', where: 'The chat of Plus accounts', status: 'other' as const },
      { name: 'GPT-5.6 Luna', where: 'Free and Go accounts', status: 'none' as const },
    ],
    stats: [
      { v: '1M', l: 'tokens of context' },
      { v: '4.2%', l: 'hallucination rate, against 12.2% for Sol, according to OpenAI' },
      { v: '128k', l: 'output tokens' },
    ],
    footer: 'Acts inside a browser, fills in forms, delivers finished documents. Text and image in, no native audio or video.',
  },
} as const

const TONE = {
  astra: { color: green.color, bg: green.bg, border: green.border, Icon: Check },
  other: { color: chrome.color, bg: chrome.bg, border: chrome.border, Icon: Info },
  none:  { color: 'var(--text-muted)', bg: 'transparent', border: 'var(--surface-border)', Icon: Minus },
} as const

export function AstraHeroCard({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  const OR = orange.color, ORB = orange.bg, ORD = orange.border
  return (
    <div
      className="rounded-[16px] p-5 md:p-6 flex flex-col gap-5"
      style={{ background: 'var(--bg-card)', border: `1px solid ${ORD}`, boxShadow: '0 0 50px rgba(255,107,0,0.10)' }}
    >
      {/* Sur mobile le badge passe sous le titre, sinon le kicker s'empile sur 4 lignes a 390px. */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0"
            style={{ background: ORB, border: `1px solid ${ORD}` }}
          >
            <Image src="/images/partners/chatgpt-logo.png" alt="ChatGPT" width={24} height={24} className="rounded-[5px]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ color: OR }}>{t.kicker}</p>
            <p className="text-text font-bold text-lg leading-tight">ChatGPT Astra (GPT-6)</p>
          </div>
        </div>
        <span
          className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap"
          style={{ color: OR, background: ORB, border: `1px solid ${ORD}` }}
        >
          {t.released}
        </span>
      </div>

      <div className="rounded-[12px] p-3" style={{ background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">{t.selector}</p>
        <ul className="space-y-1.5">
          {t.models.map((m) => {
            const tone = TONE[m.status]
            const Icon = tone.Icon
            return (
              <li
                key={m.name}
                className="flex items-start gap-3 rounded-[8px] px-3 py-2"
                style={{ background: 'var(--bg-card)', border: `1px solid ${tone.border}` }}
              >
                <span
                  className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0"
                  style={{ background: tone.bg, border: `1px solid ${tone.border}`, color: tone.color }}
                >
                  <Icon size={11} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-text text-[13px] font-semibold leading-snug">{m.name}</p>
                  <p className="text-text-muted text-[11px] leading-snug">{m.where}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {t.stats.map((s) => (
          <div key={s.l} className="rounded-[10px] px-3 py-3 text-center" style={{ background: ORB, border: `1px solid ${ORD}` }}>
            <p className="text-xl font-bold leading-none mb-1" style={{ color: OR }}>{s.v}</p>
            <p className="text-text-muted text-[10px] leading-snug">{s.l}</p>
          </div>
        ))}
      </div>

      <p className="text-text-muted text-xs leading-relaxed">{t.footer}</p>
    </div>
  )
}
