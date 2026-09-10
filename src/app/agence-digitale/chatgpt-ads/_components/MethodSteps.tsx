import { violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * La méthode DKDP en cinq étapes, du cadrage à la décision. Les contraintes
 * citées (robots OAI-AdsBot et OAI-SearchBot, compte ouvert par le client,
 * CPC de départ 3 à 5 USD) viennent de la fiche du 10.09.2026.
 */

type Step = { n: string; title: string; text: string }

const STEPS: Record<Locale, Step[]> = {
  fr: [
    { n: '01', title: 'Cadrage et éligibilité', text: 'Catégorie autorisée par OpenAI, page de destination pertinente, robots OAI-AdsBot et OAI-SearchBot non bloqués, objectif chiffré avant le premier franc.' },
    { n: '02', title: 'Compte et mesure', text: 'Vous créez le compte Ads Manager à votre nom, DKDP y est invité. OpenAI Pixel et Conversions API, paramètres UTM, bandeau de consentement conforme à la nLPD : le même montage que DKDP a posé sur son propre site.' },
    { n: '03', title: 'Cartes et indications de contexte', text: 'Six à huit variations titre et texte par offre, chacune avec un angle différent. En français d\'abord, en allemand si vous vendez outre-Sarine.' },
    { n: '04', title: 'Pilote de 30 jours', text: 'Objectif Clicks, enchère de départ entre 3 et 5 USD comme le recommande OpenAI, ajustements chaque semaine, budget média entre CHF 600 et 1\'500.' },
    { n: '05', title: 'Décision et montée en charge', text: 'Rapport de fin de pilote : dépensé, cliqué, converti, coût par contact. Go ou no-go, puis gestion mensuelle et optimisation des conversions.' },
  ],
  en: [
    { n: '01', title: 'Scoping and eligibility', text: 'Category allowed by OpenAI, relevant landing page, OAI-AdsBot and OAI-SearchBot not blocked, a numbered goal before the first franc.' },
    { n: '02', title: 'Account and measurement', text: 'You create the Ads Manager account in your name, DKDP is invited. OpenAI Pixel and Conversions API, UTM parameters, consent banner in line with Swiss data protection law: the same setup DKDP runs on its own site.' },
    { n: '03', title: 'Cards and context hints', text: 'Six to eight title and copy variations per offer, each with a different angle. French first, German if you sell across the Sarine.' },
    { n: '04', title: '30-day pilot', text: 'Clicks objective, starting bid between 3 and 5 USD as OpenAI recommends, weekly adjustments, media budget between CHF 600 and 1\'500.' },
    { n: '05', title: 'Decision and scale-up', text: 'End-of-pilot report: spent, clicked, converted, cost per contact. Go or no-go, then monthly management and conversion optimisation.' },
  ],
}

export function MethodSteps({ lang = 'fr' }: { lang?: Locale }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-5 gap-4 list-none m-0 p-0">
      {STEPS[lang].map((s) => (
        <li key={s.n} className="flex flex-col gap-3 p-5 bg-bg rounded-[14px] border border-border h-full">
          <div className="text-[11px] font-bold tracking-widest" style={{ color: violet.color }}>{s.n}</div>
          <h3 className="text-text font-semibold text-sm leading-snug">{s.title}</h3>
          <p className="text-text-muted text-xs leading-relaxed">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}
