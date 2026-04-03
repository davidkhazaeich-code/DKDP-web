import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Smartphone, BarChart2, TrendingUp, Zap, Target, Layers } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { FAQSection } from '@/components/sections/FAQSection'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { SocialBeforeAfter } from './_components/SocialBeforeAfter'

export const metadata: Metadata = {
  title: 'Formation Réseaux Sociaux Entreprise Genève · DKDP',
  description:
    'Formation réseaux sociaux professionnels à Genève. Instagram, LinkedIn, TikTok et Facebook. Stratégie, Canva, calendrier éditorial. Vos équipes repartent autonomes dès le lendemain.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/reseaux-sociaux' },
}

const FAQ = [
  {
    question: 'La formation couvre-t-elle LinkedIn, Instagram et Facebook ?',
    answer:
      'Oui. La formation peut couvrir Instagram, LinkedIn, Facebook, TikTok et YouTube selon vos besoins. Pour la plupart des PME suisses, DKDP recommande de se concentrer sur LinkedIn (B2B) et Instagram (B2C) pour maximiser l\'impact.',
  },
  {
    question: 'Faut-il déjà avoir des comptes actifs pour suivre la formation ?',
    answer:
      'Non. La formation est adaptée que vous démarriez de zéro ou que vous souhaitiez améliorer une présence existante. DKDP peut aider à créer ou optimiser les profils dans le cadre de la formation.',
  },
  {
    question: 'La formation inclut-elle la création de visuels ?',
    answer:
      'Oui. Un module entier est dédié à la création de visuels avec Canva : templates, formats adaptés à chaque réseau, cohérence visuelle. Vous repartez avec votre kit de templates personnalisé aux couleurs de votre marque.',
  },
  {
    question: 'Comment analyser les performances de ses publications ?',
    answer:
      'La formation couvre la lecture et l\'interprétation des analytics natifs (Instagram Insights, LinkedIn Analytics, Meta Business Suite). Vous apprenez à identifier les contenus qui fonctionnent et à ajuster votre stratégie en conséquence.',
  },
  {
    question: 'La formation aborde-t-elle les publicités payantes sur les réseaux ?',
    answer:
      'En option pour le Programme Expert. Un module avancé sur les Social Ads Meta (Instagram + Facebook) et LinkedIn Ads peut être ajouté. Il couvre la création de campagnes, le ciblage d\'audience et la lecture des résultats.',
  },
  {
    question: 'À qui s\'adresse cette formation réseaux sociaux ?',
    answer:
      'Aux indépendants, chargés de communication, community managers, dirigeants qui gèrent eux-mêmes leurs réseaux, gérants de commerces, associations et toute personne souhaitant une présence professionnelle en ligne.',
  },
]

const MODULES = [
  'Stratégie social media : objectifs, audience cible, positionnement',
  'Création de visuels avec Canva (templates et identité de marque)',
  'Calendrier éditorial : planifier 30 jours en 2 heures',
  'Copywriting pour les réseaux (accroches, légendes, CTA)',
  'Instagram : Reels, Stories, carrousels et hashtags',
  'LinkedIn : personal branding et contenu B2B',
  'TikTok et YouTube Shorts : formats courts engageants',
  'Outils de planification (Meta Business Suite, Buffer)',
  'Analyse des performances : métriques qui comptent vraiment',
]

const ROLES = [
  'Indépendants et entrepreneurs',
  'Équipes communication PME',
  'Community managers débutants',
  'Gérants de petits commerces',
  'Professionnels libéraux',
  'Associations et institutions',
  'Artisans et commerçants',
  'Tout professionnel voulant s\'afficher en ligne',
]

const steps = [
  { Icon: Target, title: 'Stratégie & audience', desc: 'Définition de votre positionnement, de votre audience cible et des objectifs mesurables par plateforme.' },
  { Icon: Layers, title: 'Création de contenu', desc: 'Production de visuels avec Canva, rédaction de légendes engageantes. Première série de posts créés en séance.' },
  { Icon: Smartphone, title: 'Publication & outils', desc: 'Mise en place du calendrier éditorial et des outils de planification. Workflow hebdomadaire en 2 heures.' },
  { Icon: BarChart2, title: 'Analyse & optimisation', desc: 'Lecture des statistiques natives et ajustements. Chaque participant repart avec ses KPIs définis.' },
]

const color = orange.color, bg = orange.bg, border = orange.border

export default function FormationReseauxSociauxPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildCourse({ name: 'Formation Réseaux Sociaux Entreprise Genève', url: '/formation-entreprise/reseaux-sociaux', description: 'Formation réseaux sociaux professionnels à Genève. Instagram, LinkedIn, TikTok, Facebook. Stratégie, Canva, calendrier éditorial. Autonomie dès le lendemain.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Réseaux sociaux', url: 'https://dkdp.ch/formation-entreprise/reseaux-sociaux' },
      ])} />

      {/* ── Hero ── */}
      <InfiniteGrid accentRgb="255,140,0" blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-white transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Réseaux sociaux</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Instagram · LinkedIn · TikTok · Facebook</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Gérez vos réseaux sociaux vous-même,{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>avec impact.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes et indépendants à Instagram, LinkedIn, TikTok et Facebook. Stratégie, Canva, calendrier éditorial : vous repartez autonomes dès le lendemain.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=formation" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-reseaux-sociaux.webp"
                    alt="Formation réseaux sociaux en entreprise à Genève"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </InfiniteGrid>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '+180%', l: 'Engagement moyen', sub: 'Après formation équipes' },
              { v: '5', l: 'Plateformes couvertes', sub: 'Meta, LinkedIn, TikTok, YT' },
              { v: '2h/sem', l: 'Pour tout gérer', sub: 'Avec les bons outils' },
              { v: '500+', l: 'Participants formés', sub: 'En Suisse romande' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pourquoi maintenant ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Poster sans stratégie, c&apos;est travailler pour rien.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La majorité des professionnels qui gèrent leurs réseaux sociaux seuls publient de façon irrégulière, sans ligne éditoriale ni cohérence visuelle. Résultat : peu d&apos;abonnés, peu d&apos;engagement, et beaucoup de temps gaspillé.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP ne forme pas à la théorie. On travaille sur vos vrais comptes, on crée vos premiers posts pendant la formation, on met en place votre calendrier éditorial sur 30 jours. Vous repartez avec un système qui tourne.
              </p>
              <div className="space-y-3">
                {[
                  'Les marques qui publient avec un calendrier ont 3× plus d\'engagement que celles qui postent de façon spontanée',
                  'Canva réduit le temps de création visuelle de 70% par rapport aux outils professionnels',
                  '2 heures par semaine suffisent pour gérer 3 plateformes avec les bons outils',
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(255,107,0,0.07)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Avant / Après formation
                </p>
                <SocialBeforeAfter />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Résultats observés sur nos groupes de participants en Suisse romande.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Stratégie, contenu et analyse en une journée.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation commence par la stratégie : pour qui publiez-vous, quel message, sur quel réseau. On passe ensuite à la pratique : création de visuels dans Canva, rédaction de légendes, mise en place du calendrier éditorial et des outils de planification.
              </p>
              <p className="text-text-secondary leading-relaxed">
                La formation est adaptée à vos réseaux actuels et à votre audience. On ne travaille pas sur des exemples fictifs : on crée votre contenu pendant la journée.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {MODULES.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Pour qui ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profils</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Pour qui est cette formation ?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {ROLES.map((role, i) => (
              <SectionReveal key={role} delay={i * 0.07}>
                <div
                  className="flex items-center justify-center text-center p-4 rounded-[12px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-white font-medium text-sm">{role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Déroulement ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Déroulement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qui se passe pendant la journée.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 h-px top-[52px] pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)' }} />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                    <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <s.Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                La parole à nos participants.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'J\'avais un compte Instagram inactif depuis des mois. Après la formation, je poste 3 fois par semaine avec un vrai calendrier. Mes abonnés ont doublé en 6 semaines.',
                name: 'Thérapeute indépendante',
                company: 'Genève',
                stars: 5,
              },
              {
                quote: 'DKDP nous a appris à utiliser Canva et Meta Business Suite. Notre équipe gère maintenant nos 3 comptes en 2 heures par semaine.',
                name: 'Responsable communication',
                company: 'Association culturelle, Lausanne',
                stars: 5,
              },
              {
                quote: 'La partie LinkedIn m\'a particulièrement aidé. J\'ai maintenant une vraie stratégie B2B et je génère des leads directement depuis mes posts.',
                name: 'Consultant indépendant',
                company: 'Genève',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={12} style={{ color }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <InfiniteGrid accentRgb="255,140,0" blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)">
        <section className="py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Un tarif forfaitaire par groupe, transparent.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Pas de tarif par personne. Un prix fixe par groupe, quel que soit le nombre de participants (dans la limite indiquée).
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Initiation (½ j.)',
                price: 'CHF 700',
                duration: '3h · jusqu\'à 10 personnes',
                highlight: false,
                badge: '',
                features: [
                  '1 plateforme au choix',
                  'Canva : templates de base',
                  'Premiers posts créés',
                  'Guide pratique inclus',
                  'Attestation individuelle',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Journée Complète',
                price: "CHF 1'200",
                duration: '6h · jusqu\'à 10 personnes',
                highlight: true,
                badge: 'Le plus demandé',
                features: [
                  '3 plateformes couvertes',
                  'Canva avancé + Reels',
                  'Calendrier éditorial 30 jours',
                  'Outils de planification',
                  'Analyse des performances',
                  'Attestation + Q&R 30 jours',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Programme Expert',
                price: "CHF 2'000",
                duration: '12h · jusqu\'à 10 personnes',
                highlight: false,
                badge: '',
                features: [
                  '5 plateformes + stratégie complète',
                  'Publicité Meta et LinkedIn Ads',
                  'Stratégie de crise e-réputation',
                  'Suivi 60 jours',
                  'Attestation + rapport individuel',
                ],
                cta: 'Demander un devis',
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? '0 0 40px rgba(255,107,0,0.14)' : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                  )}
                  <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
                    {offer.badge && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        {offer.badge}
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-0.5" style={{ color }}>{offer.price}</p>
                    <p className="text-text-muted text-xs mb-6">{offer.duration}</p>
                    <div className="space-y-2.5 flex-1">
                      {offer.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact?service=formation"
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? color : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${border}`,
                      }}
                    >
                      {offer.cta} <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </InfiniteGrid>

      {/* ── FAQ ── */}
      <FAQSection items={FAQ} title="Vos questions sur la formation réseaux sociaux" />

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/formation-entreprise/montage-video"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: border,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <TrendingUp size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Aller plus loin</p>
                  <p className="text-white font-bold text-lg leading-tight">Créer votre propre contenu vidéo</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vous maîtrisez les réseaux sociaux. Pour créer votre propre contenu vidéo professionnel et décupler l&apos;engagement, découvrez notre formation montage vidéo.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Formation montage vidéo <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal />
    </main>
  )
}
