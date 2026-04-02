import type { Metadata } from 'next'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

export const metadata: Metadata = {
  title: 'Politique de confidentialité · DKDP Genève',
  description: 'Politique de confidentialité de DKDP. Comment nous collectons, utilisons et protégeons vos données personnelles, conformément au RGPD et à la LPD suisse.',
  alternates: { canonical: 'https://dkdp.ch/politique-de-confidentialite' },
  robots: { index: false },
}

export default function PolitiqueDeConfidentialitePage() {
  return (
    <main className="pt-14">
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">

          <SectionReveal>
            <GradTag className="mb-6">Légal</GradTag>
            <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-text-secondary leading-relaxed mb-16 max-w-lg">
              Chez DKDP, la protection de vos données personnelles est une priorité. Cette politique explique quelles données nous collectons, pourquoi, et comment vous pouvez exercer vos droits.
            </p>
          </SectionReveal>

          <div className="space-y-6">

            {/* 1. Responsable du traitement */}
            <SectionReveal delay={0.05}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-5">1. Responsable du traitement</h2>
                <div className="space-y-2.5">
                  {[
                    { label: 'Responsable', value: 'David Khazaei (DKDP)' },
                    { label: 'Adresse', value: '36 Rue du 31 Décembre, 1207 Genève, Suisse' },
                    { label: 'Email', value: 'dk@dkdp.ch' },
                    { label: 'Téléphone', value: '+41 79 940 79 69' },
                  ].map((item) => (
                    <div key={item.label} className="grid grid-cols-[140px_1fr] gap-4">
                      <span className="text-text-muted text-sm">{item.label}</span>
                      <span className="text-text-secondary text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* 2. Données collectées */}
            <SectionReveal delay={0.08}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-5">2. Données collectées</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Nous collectons uniquement les données nécessaires à la fourniture de nos services et à la gestion de notre relation commerciale :
                </p>
                <div className="space-y-3">
                  {[
                    { type: 'Formulaire de contact', detail: 'Nom, prénom, adresse email, numéro de téléphone (optionnel), message.' },
                    { type: 'Réservation d\'appel', detail: 'Nom, adresse email, fuseau horaire, créneau choisi, via Cal.com.' },
                    { type: 'Données de navigation', detail: 'Adresse IP, type de navigateur, pages visitées, durée de visite, via cookies analytiques (voir section 6).' },
                    { type: 'Correspondance', detail: 'Emails et messages échangés dans le cadre d\'une prestation ou d\'un devis.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#D4D4D8' }} />
                      <div>
                        <p className="text-white text-sm font-semibold mb-1">{item.type}</p>
                        <p className="text-text-muted text-xs leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* 3. Finalités */}
            <SectionReveal delay={0.1}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-5">3. Finalités du traitement</h2>
                <div className="space-y-3">
                  {[
                    { finalite: 'Répondre à vos demandes de contact et devis', base: 'Intérêt légitime / Exécution du contrat' },
                    { finalite: 'Gérer la relation client et les prestations', base: 'Exécution du contrat' },
                    { finalite: 'Envoyer des informations sur nos services (si consentement)', base: 'Consentement' },
                    { finalite: 'Améliorer le site et nos services', base: 'Intérêt légitime' },
                    { finalite: 'Respecter nos obligations légales et comptables', base: 'Obligation légale' },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-[1fr_auto] gap-4 items-center py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(212,212,216,0.08)' }}>
                      <span className="text-text-secondary text-sm">{item.finalite}</span>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 text-right" style={{ background: 'rgba(212,212,216,0.08)', color: '#D4D4D8' }}>{item.base}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* 4. Conservation */}
            <SectionReveal delay={0.12}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-5">4. Durée de conservation</h2>
                <div className="space-y-2.5">
                  {[
                    { type: 'Données de contact (non-client)', duree: '12 mois après le dernier contact' },
                    { type: 'Données clients (contrats, facturation)', duree: '10 ans (obligation légale comptable suisse)' },
                    { type: 'Données analytiques (navigation)', duree: '13 mois maximum' },
                    { type: 'Données de réservation d\'appel', duree: '6 mois après l\'appel' },
                  ].map((item) => (
                    <div key={item.type} className="grid grid-cols-[1fr_200px] gap-4 items-start py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(212,212,216,0.08)' }}>
                      <span className="text-text-secondary text-sm">{item.type}</span>
                      <span className="text-text-muted text-xs text-right">{item.duree}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* 5. Partage des données */}
            <SectionReveal delay={0.14}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-5">5. Partage des données</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Vos données ne sont jamais vendues. Elles peuvent être transmises à des sous-traitants techniques strictement nécessaires à nos services :
                </p>
                <div className="space-y-3">
                  {[
                    { name: 'Vercel', role: 'Hébergement du site web', pays: 'USA (clauses contractuelles types)' },
                    { name: 'Cal.com', role: 'Réservation de rendez-vous en ligne', pays: 'USA (clauses contractuelles types)' },
                    { name: 'Google Analytics', role: 'Analyse d\'audience anonymisée (si activé)', pays: 'USA (clauses contractuelles types)' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div>
                        <p className="text-white text-sm font-semibold mb-0.5">{item.name}</p>
                        <p className="text-text-muted text-xs">{item.role}</p>
                        <p className="text-text-muted text-[11px] mt-0.5 opacity-70">{item.pays}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* 6. Cookies */}
            <SectionReveal delay={0.16}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-5">6. Cookies</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Ce site utilise des cookies pour son bon fonctionnement et l&apos;analyse d&apos;audience. Vous pouvez gérer vos préférences via la bannière de consentement affichée lors de votre première visite.
                </p>
                <div className="space-y-2.5">
                  {[
                    { type: 'Cookies essentiels', desc: 'Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.', base: 'Intérêt légitime' },
                    { type: 'Cookies analytiques', desc: 'Mesure d\'audience anonymisée pour améliorer le site.', base: 'Consentement' },
                    { type: 'Cookies marketing', desc: 'Publicité ciblée et suivi des conversions (Google Ads).', base: 'Consentement' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-[10px] border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(212,212,216,0.08)' }}>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-white text-sm font-semibold">{item.type}</p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,212,216,0.08)', color: '#D4D4D8' }}>{item.base}</span>
                        </div>
                        <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* 7. Vos droits */}
            <SectionReveal delay={0.18}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-5">7. Vos droits</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  Conformément au RGPD (UE 2016/679) et à la Loi fédérale suisse sur la protection des données (LPD), vous disposez des droits suivants :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { droit: 'Droit d\'accès', desc: 'Obtenir une copie de vos données personnelles.' },
                    { droit: 'Droit de rectification', desc: 'Corriger des données inexactes ou incomplètes.' },
                    { droit: 'Droit à l\'effacement', desc: 'Demander la suppression de vos données.' },
                    { droit: 'Droit à la portabilité', desc: 'Recevoir vos données dans un format structuré.' },
                    { droit: 'Droit d\'opposition', desc: 'Vous opposer à certains traitements.' },
                    { droit: 'Droit à la limitation', desc: 'Restreindre l\'utilisation de vos données.' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-white text-sm font-semibold mb-1">{item.droit}</p>
                      <p className="text-text-muted text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Pour exercer vos droits, contactez-nous à{' '}
                  <a href="mailto:dk@dkdp.ch" className="text-white hover:underline">dk@dkdp.ch</a>.
                  Nous répondrons dans un délai de 30 jours. En cas de litige, vous pouvez saisir le Préposé fédéral à la protection des données et à la transparence (PFPDT) en Suisse.
                </p>
              </div>
            </SectionReveal>

            {/* 8. Sécurité */}
            <SectionReveal delay={0.20}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-4">8. Sécurité</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou altération : chiffrement HTTPS, accès restreint aux données, hébergement sécurisé, sauvegardes régulières.
                </p>
              </div>
            </SectionReveal>

            {/* 9. Modifications */}
            <SectionReveal delay={0.22}>
              <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
                <h2 className="text-white font-bold text-lg mb-4">9. Modifications de cette politique</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Nous nous réservons le droit de modifier cette politique à tout moment. La date de dernière mise à jour est indiquée ci-dessous. En cas de modification substantielle, nous vous en informerons par email si vous êtes client.
                </p>
              </div>
            </SectionReveal>

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
