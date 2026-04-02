import type { Metadata } from 'next'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

export const metadata: Metadata = {
  title: 'Mentions légales · DKDP Genève',
  description: 'Mentions légales de DKDP, service digital à Genève. Informations légales, responsable de publication et hébergement.',
  alternates: { canonical: 'https://dkdp.ch/mentions-legales' },
  robots: { index: false },
}

const SECTIONS = [
  {
    title: 'Éditeur du site',
    items: [
      { label: 'Raison sociale', value: 'DKDP' },
      { label: 'Responsable de publication', value: 'David Khazaei' },
      { label: 'Adresse', value: '36 Rue du 31 Décembre, Quartier des Eaux-Vives, 1207 Genève, Suisse' },
      { label: 'Email', value: 'dk@dkdp.ch' },
      { label: 'Téléphone', value: '+41 79 940 79 69' },
      { label: 'Site web', value: 'https://dkdp.ch' },
    ],
  },
  {
    title: 'Hébergement',
    items: [
      { label: 'Hébergeur', value: 'Vercel Inc.' },
      { label: 'Adresse', value: '340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis' },
      { label: 'Site', value: 'vercel.com' },
    ],
  },
  {
    title: 'Propriété intellectuelle',
    text: "L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de DKDP, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces éléments est strictement interdite sans l'accord exprès par écrit de DKDP.",
  },
  {
    title: 'Limitation de responsabilité',
    text: "DKDP s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, DKDP ne garantit pas l'exactitude, la précision ou l'exhaustivité des informations disponibles. DKDP décline toute responsabilité pour tout dommage direct ou indirect résultant de l'accès à ce site ou de l'utilisation des informations et contenus qui y figurent.",
  },
  {
    title: 'Liens hypertextes',
    text: "Le site dkdp.ch peut contenir des liens hypertextes vers d'autres sites. DKDP n'a pas la possibilité de vérifier le contenu des sites ainsi visités et n'assumera en conséquence aucune responsabilité de ce fait.",
  },
  {
    title: 'Droit applicable et juridiction compétente',
    text: "Le présent site est soumis au droit suisse. En cas de litige et à défaut de résolution amiable, les tribunaux du canton de Genève sont seuls compétents.",
  },
]

export default function MentionsLegalesPage() {
  return (
    <main className="pt-14">
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">

          <SectionReveal>
            <GradTag className="mb-6">Légal</GradTag>
            <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">Mentions légales</h1>
            <p className="text-text-secondary leading-relaxed mb-16 max-w-lg">
              Conformément aux obligations légales en vigueur, vous trouverez ci-dessous les informations légales relatives au site dkdp.ch.
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {SECTIONS.map((section, i) => (
              <SectionReveal key={section.title} delay={i * 0.05}>
                <div
                  className="rounded-[16px] p-7 border"
                  style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}
                >
                  <h2 className="text-white font-bold text-lg mb-5">{section.title}</h2>
                  {'items' in section && section.items && (
                    <div className="space-y-2.5">
                      {section.items.map((item) => (
                        <div key={item.label} className="grid grid-cols-[140px_1fr] gap-4">
                          <span className="text-text-muted text-sm">{item.label}</span>
                          <span className="text-text-secondary text-sm">{item.value}</span>
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
