import Link from 'next/link'
import { Lock, ShieldAlert, Cookie, EyeOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'

/**
 * Données, confidentialité et nLPD. Faits : principes publicitaires OpenAI
 * (conversations jamais transmises, pas d'annonce près des sujets sensibles,
 * pas de personnalisation en Suisse et dans l'EEE au lancement), fiche du
 * 10.09.2026. Le pixel dépose un cookie : c'est un traceur au sens de la
 * nLPD, d'où le lien vers la page RGPD et cookies.
 */

type Tile = { Icon: LucideIcon; title: string; text: string; link?: { label: string; href: string } }

const TILES: Record<Locale, Tile[]> = {
  fr: [
    { Icon: Lock, title: 'Votre conversation n\'est jamais transmise', text: 'OpenAI ne partage ni les conversations, ni l\'historique, ni la mémoire avec l\'annonceur. DKDP ne reçoit que des chiffres agrégés : impressions, clics, conversions.' },
    { Icon: ShieldAlert, title: 'Pas d\'annonce près des sujets sensibles', text: 'Santé, santé mentale, politique, détresse : OpenAI n\'y place aucune annonce. Votre marque n\'apparaît pas dans une conversation où elle ferait tache.' },
    { Icon: Cookie, title: 'Le pixel est un traceur', text: 'L\'OpenAI Pixel dépose un cookie sur votre site. Il passe donc par votre bandeau de consentement, conforme à la nLPD. DKDP le branche sur votre gestion des cookies, ou passe par la Conversions API côté serveur.', link: { label: 'Notre service RGPD et cookies', href: '/agence-digitale/rgpd-cookies' } },
    { Icon: EyeOff, title: 'Pas de personnalisation en Suisse', text: 'Au lancement, ni l\'historique ni la mémoire ne servent à choisir une annonce en Suisse et dans l\'EEE. Seule la conversation en cours compte : vos cartes doivent être bonnes dès la première lecture.' },
  ],
  en: [
    { Icon: Lock, title: 'Your conversation is never shared', text: 'OpenAI shares neither conversations, nor history, nor memory with the advertiser. DKDP only receives aggregated figures: impressions, clicks, conversions.' },
    { Icon: ShieldAlert, title: 'No ads near sensitive topics', text: 'Health, mental health, politics, distress: OpenAI places no ads there. Your brand does not show up in a conversation where it would look out of place.' },
    { Icon: Cookie, title: 'The pixel is a tracker', text: 'The OpenAI Pixel sets a cookie on your site. It therefore goes through your consent banner, in line with Swiss data protection law. DKDP wires it to your cookie management, or uses the server-side Conversions API.', link: { label: 'Our GDPR and cookies service', href: '/agence-digitale/rgpd-cookies' } },
    { Icon: EyeOff, title: 'No personalisation in Switzerland', text: 'At launch, neither history nor memory is used to pick an ad in Switzerland and the EEA. Only the current conversation counts: your cards have to work on the first read.' },
  ],
}

export function ComplianceTiles({ lang = 'fr' }: { lang?: Locale }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {TILES[lang].map((t) => (
        <div key={t.title} className="flex flex-col gap-3 p-5 rounded-[14px] border border-border bg-bg-card h-full">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-[10px]"
            style={{ background: violet.bg, border: `1px solid ${violet.border}` }}
          >
            <t.Icon size={18} style={{ color: violet.color }} aria-hidden="true" />
          </div>
          <h3 className="text-text font-bold text-sm leading-snug">{t.title}</h3>
          <p className="text-text-secondary text-xs leading-relaxed flex-1">{t.text}</p>
          {t.link && (
            <Link href={localizedPath(t.link.href, lang)} className="text-xs underline text-text-secondary hover:text-text transition-colors w-fit">
              {t.link.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
