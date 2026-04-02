import type { Metadata } from 'next'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

export const metadata: Metadata = {
  title: 'Conditions générales de vente · DKDP Genève',
  description:
    'Conditions générales de vente de DKDP, agence digitale à Genève. Modalités de prestation, paiement, propriété intellectuelle et responsabilités.',
  alternates: { canonical: 'https://dkdp.ch/conditions-generales-de-vente' },
  robots: { index: false },
}

const SECTIONS = [
  {
    title: 'Article 1 — Champ d\'application',
    text: 'Les présentes Conditions Générales de Vente (CGV) régissent l\'ensemble des prestations de services proposées par DKDP (ci-après « le Prestataire »), dont le siège est situé 36 Rue du 31 Décembre, 1207 Genève, Suisse, à ses clients professionnels et particuliers (ci-après « le Client »). Toute commande implique l\'acceptation pleine et entière des présentes CGV. En cas de contradiction entre les présentes CGV et tout autre document, les présentes prévalent.',
  },
  {
    title: 'Article 2 — Devis et commandes',
    text: 'Toute prestation fait l\'objet d\'un devis écrit remis au Client, valable 30 jours à compter de sa date d\'émission. Le devis est réputé accepté à réception de son bon de commande signé ou de toute confirmation écrite (email inclus) par le Client. Toute modification de périmètre demandée après acceptation du devis fait l\'objet d\'un avenant signé des deux parties.',
  },
  {
    title: 'Article 3 — Prix et modalités de paiement',
    items: [
      { label: 'Devise', value: 'Tous les prix sont exprimés en francs suisses (CHF), hors TVA le cas échéant.' },
      { label: 'Acompte', value: '50 % du montant total à la signature du devis, solde à la livraison.' },
      { label: 'Délai de paiement', value: '30 jours nets à compter de la date de facturation.' },
      { label: 'Retard de paiement', value: 'En cas de retard, des intérêts moratoires de 5 % par an sont appliqués de plein droit, sans mise en demeure préalable.' },
      { label: 'Mode de paiement', value: 'Virement bancaire ou tout autre moyen accepté par le Prestataire.' },
    ],
  },
  {
    title: 'Article 4 — Délais de réalisation',
    text: 'Les délais indiqués dans le devis sont donnés à titre indicatif. Ils courent à compter de la réception de l\'acompte et de l\'ensemble des éléments nécessaires à la réalisation de la prestation. Tout retard imputable au Client (fourniture tardive des contenus, validations, retours) entraîne automatiquement le report des délais sans pénalité pour le Prestataire.',
  },
  {
    title: 'Article 5 — Obligations du Client',
    text: 'Le Client s\'engage à fournir dans les délais convenus l\'ensemble des informations, contenus, accès et validations nécessaires à la bonne exécution de la mission. Le Client garantit être titulaire des droits de propriété intellectuelle sur les éléments qu\'il transmet au Prestataire (textes, images, logos, données). Le Client est seul responsable de la conformité de ses activités et contenus aux lois applicables.',
  },
  {
    title: 'Article 6 — Propriété intellectuelle',
    text: 'Les livrables produits dans le cadre de la mission (sites web, visuels, contenus, codes sources) deviennent propriété du Client à compter du règlement intégral des sommes dues. Jusqu\'au paiement complet, le Prestataire conserve tous les droits de propriété intellectuelle sur les travaux réalisés. Les outils, méthodes, frameworks et savoir-faire propres au Prestataire utilisés pour la réalisation restent en toute hypothèse sa propriété exclusive. Le Prestataire se réserve le droit de mentionner la réalisation à titre de référence commerciale, sauf opposition expresse du Client notifiée par écrit.',
  },
  {
    title: 'Article 7 — Confidentialité',
    text: 'Le Prestataire s\'engage à maintenir strictement confidentielle toute information de nature confidentielle communiquée par le Client dans le cadre de la mission. Cette obligation de confidentialité perdure pendant une durée de 3 ans après la fin de la mission. Elle ne s\'applique pas aux informations accessibles au public ou connues du Prestataire antérieurement.',
  },
  {
    title: 'Article 8 — Limitation de responsabilité',
    text: 'La responsabilité du Prestataire est limitée aux dommages directs et prévisibles résultant d\'une faute prouvée dans l\'exécution de la prestation, dans la limite du montant total de la prestation concernée. Le Prestataire ne saurait être tenu responsable des dommages indirects, perte d\'exploitation, perte de données, perte de chiffre d\'affaires, ni des conséquences d\'une utilisation inadéquate des livrables par le Client. Le Prestataire ne garantit pas les résultats de référencement naturel (SEO), de publicité en ligne (SEA) ni de campagnes marketing, dont les résultats dépendent de facteurs extérieurs à son contrôle.',
  },
  {
    title: 'Article 9 — Résiliation',
    text: 'En cas de résiliation à l\'initiative du Client après acceptation du devis, l\'acompte versé reste acquis au Prestataire à titre d\'indemnité forfaitaire. Les travaux réalisés jusqu\'à la date de résiliation sont facturés au prorata du temps passé, selon le taux journalier convenu. Le Prestataire peut résilier la prestation en cas de manquement grave du Client à ses obligations après mise en demeure restée sans effet pendant 15 jours.',
  },
  {
    title: 'Article 10 — Droit applicable et juridiction',
    text: 'Les présentes CGV sont soumises au droit suisse, à l\'exclusion de toute règle de conflit de lois. En cas de litige, les parties s\'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d\'accord amiable, les tribunaux du canton de Genève sont seuls compétents.',
  },
]

export default function CGVPage() {
  return (
    <main className="pt-14">
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">

          <SectionReveal>
            <GradTag className="mb-6">Légal</GradTag>
            <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">
              Conditions générales de vente
            </h1>
            <p className="text-text-secondary leading-relaxed mb-16 max-w-lg">
              Ces conditions s&apos;appliquent à toutes les prestations de services fournies par DKDP à ses clients, professionnels comme particuliers.
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {SECTIONS.map((section, i) => (
              <SectionReveal key={section.title} delay={i * 0.04}>
                <div
                  className="rounded-[16px] p-7 border"
                  style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}
                >
                  <h2 className="text-white font-bold text-lg mb-5">{section.title}</h2>
                  {'items' in section && section.items && (
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <div key={item.label} className="grid grid-cols-[160px_1fr] gap-4">
                          <span className="text-text-muted text-sm">{item.label}</span>
                          <span className="text-text-secondary text-sm leading-relaxed">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {'text' in section && section.text && (
                    <p className="text-text-secondary text-sm leading-relaxed">{section.text}</p>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.45}>
            <p className="text-text-muted text-xs text-center mt-12">
              Dernière mise à jour : avril 2026
            </p>
          </SectionReveal>

        </div>
      </section>
    </main>
  )
}
