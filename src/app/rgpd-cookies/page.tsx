import type { Metadata } from 'next'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

export const metadata: Metadata = {
  title: 'RGPD et Cookies · DKDP Genève',
  description: 'Politique de gestion des cookies et conformité RGPD du site dkdp.ch. Gérez vos préférences de cookies.',
  alternates: { canonical: 'https://dkdp.ch/rgpd-cookies' },
  robots: { index: false },
}

const COOKIES = [
  {
    nom: 'Cookies essentiels',
    base: 'Intérêt légitime',
    duree: 'Session',
    description: 'Indispensables au fonctionnement du site : navigation, sécurité, mémorisation de vos préférences. Ces cookies ne peuvent pas être désactivés.',
    exemples: ['__vercel_live_token', 'next-auth.session-token'],
  },
  {
    nom: 'Cookies analytiques',
    base: 'Consentement',
    duree: '13 mois',
    description: "Mesure d'audience pour comprendre comment les visiteurs utilisent le site. Les données sont anonymisées et ne permettent pas de vous identifier personnellement.",
    exemples: ['_ga', '_gid', '_gat'],
  },
  {
    nom: 'Cookies marketing',
    base: 'Consentement',
    duree: '90 jours',
    description: 'Suivi des conversions publicitaires (Google Ads). Permettent de mesurer l\'efficacité de nos campagnes et de vous proposer des contenus pertinents.',
    exemples: ['_gcl_au', 'IDE'],
  },
  {
    nom: 'Cookies tiers (Cal.com)',
    base: 'Consentement',
    duree: '30 jours',
    description: 'Utilisés lors de la réservation d\'un appel via Cal.com. Ces cookies sont déposés par un service tiers et sont soumis à leur propre politique de confidentialité.',
    exemples: ['cal.com session'],
  },
]

export default function RGPDCookiesPage() {
  return (
    <main className="pt-14">
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">

          <SectionReveal>
            <GradTag className="mb-6">Légal</GradTag>
            <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">RGPD et Cookies</h1>
            <p className="text-text-secondary leading-relaxed mb-16 max-w-lg">
              Le site dkdp.ch utilise des cookies pour son bon fonctionnement et l&apos;analyse d&apos;audience. Voici comment nous les gérons et comment exercer vos droits.
            </p>
          </SectionReveal>

          {/* Qu'est-ce qu'un cookie */}
          <SectionReveal delay={0.05}>
            <div className="rounded-[16px] p-7 border mb-6" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="text-white font-bold text-lg mb-4">Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre navigateur lors de votre visite sur un site web. Il permet au site de mémoriser certaines informations sur votre passage (langue, préférences, identifiant de session) et de vous reconnaître lors d&apos;une prochaine visite.
              </p>
            </div>
          </SectionReveal>

          {/* Tableau cookies */}
          <div className="space-y-4 mb-10">
            {COOKIES.map((cookie, i) => (
              <SectionReveal key={cookie.nom} delay={0.05 + i * 0.05}>
                <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-white font-bold text-base">{cookie.nom}</h2>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(212,212,216,0.08)', color: '#D4D4D8' }}>
                        {cookie.base}
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(212,212,216,0.06)', color: '#A0A0A8' }}>
                        {cookie.duree}
                      </span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">{cookie.description}</p>
                  <p className="text-text-muted text-xs">
                    Exemples : {cookie.exemples.join(', ')}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Gérer les préférences */}
          <SectionReveal delay={0.25}>
            <div className="rounded-[16px] p-7 border mb-6" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="text-white font-bold text-lg mb-4">Gérer vos préférences</h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Lors de votre première visite, une bannière vous permet d&apos;accepter ou refuser les cookies non essentiels. Vous pouvez modifier vos préférences à tout moment.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Vous pouvez également désactiver les cookies directement dans les paramètres de votre navigateur. Notez que certaines fonctionnalités du site peuvent être altérées si vous désactivez les cookies essentiels.
              </p>
            </div>
          </SectionReveal>

          {/* Vos droits RGPD */}
          <SectionReveal delay={0.28}>
            <div className="rounded-[16px] p-7 border mb-6" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="text-white font-bold text-lg mb-4">Vos droits RGPD</h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la Loi fédérale suisse sur la protection des données (LPD), vous disposez des droits suivants :
              </p>
              <ul className="space-y-2">
                {[
                  'Droit d\'accès à vos données personnelles',
                  'Droit de rectification des données inexactes',
                  'Droit à l\'effacement (droit à l\'oubli)',
                  'Droit à la portabilité de vos données',
                  'Droit d\'opposition au traitement',
                  'Droit de retirer votre consentement à tout moment',
                ].map((droit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#D4D4D8' }} />
                    {droit}
                  </li>
                ))}
              </ul>
              <p className="text-text-muted text-xs mt-4">
                Pour exercer vos droits : <a href="mailto:dk@dkdp.ch" className="text-white hover:underline">dk@dkdp.ch</a>
              </p>
            </div>
          </SectionReveal>

          {/* Lien politique confidentialité */}
          <SectionReveal delay={0.30}>
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="text-white font-bold text-lg mb-4">Pour aller plus loin</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Pour une information complète sur le traitement de vos données personnelles, consultez notre{' '}
                <a href="/politique-de-confidentialite" className="text-white hover:underline">politique de confidentialité</a>{' '}
                et nos{' '}
                <a href="/mentions-legales" className="text-white hover:underline">mentions légales</a>.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.35}>
            <p className="text-text-muted text-xs text-center mt-12">
              Dernière mise à jour : avril 2026
            </p>
          </SectionReveal>

        </div>
      </section>
    </main>
  )
}
