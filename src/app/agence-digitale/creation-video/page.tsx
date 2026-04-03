import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, Zap, Star } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { FAQSection } from '@/components/sections/FAQSection'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { VideoFormatsGrid } from './_components/VideoFormatsGrid'
import { violet } from '@/lib/tokens'

export const metadata: Metadata = {
  title: 'Création Vidéo Entreprise Genève · DKDP',
  description:
    'Production vidéo professionnelle à Genève. Vidéos institutionnelles, témoignages clients, Reels et contenus courts. Captez l\'attention et restez en mémoire.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/creation-video' },
}

const color = violet.color
const bg = violet.bg
const border = violet.border

const FAQ = [
  {
    question: 'Combien coûte une vidéo d\'entreprise à Genève ?',
    answer:
      'Un témoignage client ou un format court (30 à 90 secondes) démarre à CHF 800. Une vidéo institutionnelle complète (2 à 5 minutes, tournage et montage) se situe entre CHF 2\'000 et CHF 6\'000. Un devis est établi après brief selon vos besoins précis.',
  },
  {
    question: 'Quels types de vidéos produisez-vous ?',
    answer:
      'DKDP produit des vidéos institutionnelles, des témoignages clients, des présentations de produits ou services, des Reels et contenus courts pour les réseaux sociaux, des capsules de formation, et des vidéos pour les campagnes publicitaires.',
  },
  {
    question: 'Combien de temps prend la production d\'une vidéo ?',
    answer:
      'Un format court (Reel, teaser) est livré en 5 à 10 jours. Une vidéo institutionnelle complète prend 3 à 5 semaines : brief, script, tournage, montage, révisions et livraison finale.',
  },
  {
    question: 'Venez-vous tourner dans nos locaux à Genève ?',
    answer:
      'Oui. DKDP se déplace dans vos locaux à Genève et en Suisse romande pour les tournages. On apporte notre matériel (caméra, éclairage, micro). Un repérage préalable est prévu pour les projets complexes.',
  },
  {
    question: 'Les vidéos sont-elles adaptées pour les réseaux sociaux ?',
    answer:
      'Oui. Chaque vidéo est livrable en plusieurs formats selon les plateformes : format carré (Instagram), vertical 9:16 (Reels, TikTok, Stories) et horizontal 16:9 (YouTube, site web). On adapte le montage à chaque format.',
  },
  {
    question: 'Proposez-vous des sous-titres et du texte animé ?',
    answer:
      'Oui. Sous-titres automatiques corrigés, animations de texte, cartons et motion design basiques sont inclus selon le forfait. Plus de 80% des vidéos sur les réseaux sociaux sont regardées sans son : les sous-titres ne sont pas optionnels.',
  },
  {
    question: 'Combien de cycles de révisions sont inclus ?',
    answer:
      'Deux cycles de révisions sont inclus dans chaque projet. Un premier retour après le premier cut, un second après les ajustements. Des révisions supplémentaires peuvent être ajoutées au forfait.',
  },
]

const BENEFITS = [
  {
    Icon: Zap,
    value: '2.7×',
    title: 'Engagement supérieur',
    desc: 'La vidéo génère en moyenne 2.7× plus d\'engagement que les images statiques sur les réseaux sociaux et 80% de conversions supplémentaires sur les landing pages.',
  },
  {
    Icon: BarChart2,
    value: '+80%',
    title: 'Conversion sur site',
    desc: 'Une vidéo de présentation sur votre page de service augmente le taux de conversion de 80% en maintenant l\'attention des visiteurs.',
  },
  {
    Icon: Star,
    value: '4K',
    title: 'Qualité cinématographique',
    desc: 'Captation 4K, stabilisateur 3 axes, lumière professionnelle. Votre marque mérite une image qui inspire confiance au premier regard.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Brief & storyboard',
    desc: 'Définition des objectifs, messages clés et story-board. Validation complète avant le moindre tournage.',
  },
  {
    step: '02',
    title: 'Préparation',
    desc: 'Scouting de lieu, matériel, brief des personnes filmées, planning journée de tournage.',
  },
  {
    step: '03',
    title: 'Captation',
    desc: 'Tournage avec équipement 4K, stabilisateur et éclairage professionnel. Coverage complet de chaque scène.',
  },
  {
    step: '04',
    title: 'Post-production',
    desc: 'Montage, étalonnage colorimétrique, sound design, motion graphics, sous-titres.',
  },
  {
    step: '05',
    title: 'Livraison & formats',
    desc: 'Export multi-formats selon plateformes cibles. Livraison cloud + versions adaptées Reels/YT/LinkedIn.',
  },
]

export default function CreationVideoPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildService({ name: 'Création vidéo d\'entreprise Genève', url: '/agence-digitale/creation-video', description: 'Production vidéo professionnelle à Genève. Institutionnel, témoignages clients, Reels et contenus courts.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Création vidéo', url: 'https://dkdp.ch/agence-digitale/creation-video' },
      ])} />

      {/* ── Hero ── */}
      <InfiniteGrid accentRgb="124,58,237" blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-white transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Création vidéo</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Vidéo d&apos;entreprise · Genève</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Des vidéos qui{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>captivent, partagent et convertissent.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP produit vos vidéos d&apos;entreprise à Genève : clips sociaux, témoignages clients, brand films. Production 4K, livrée en 5 jours.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Devis vidéo gratuit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-white transition-colors">
                    Notre méthode ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                  <Image
                    src="/images/services/dkdp-agence-creation-video.webp"
                    alt="Production vidéo d'entreprise à Genève par DKDP"
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
              { v: '4K', l: 'Qualité de production', sub: 'Tous formats livrés' },
              { v: '2.7×', l: 'Engagement vidéo', sub: 'vs contenu statique' },
              { v: '5 jours', l: 'Délai livraison', sub: 'Clips sociaux' },
              { v: '50+', l: 'Vidéos produites', sub: 'En Suisse romande' },
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

      {/* ── Subnav ── */}
      <div className="sticky top-14 z-30 border-b border-zinc-800 bg-[rgba(9,9,11,0.92)] backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between gap-2">
            <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Navigation sections">
              {[
                { label: 'Notre approche', href: '#approche' },
                { label: 'Résultats', href: '#resultats' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'Processus', href: '#process' },
                { label: 'Réalisations', href: '#realisations' },
                { label: 'FAQ', href: '#faq' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold text-text-muted hover:text-white transition-colors duration-150 whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
            </nav>
            <Link
              href="/contact"
              className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80"
              style={{ background: 'rgba(124,58,237,0.18)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.30)' }}
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Notre approche ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Des vidéos pensées pour convaincre, pas juste pour briller.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Une belle image ne suffit pas. DKDP commence par comprendre votre message, votre cible et l&apos;objectif de la vidéo : notoriété, confiance, conversion. Chaque choix de cadrage, de musique et de montage est fait pour servir ce but.
              </p>
              <p className="text-text-secondary leading-relaxed">
                On livre chaque vidéo dans tous les formats dont vous avez besoin : site web, réseaux sociaux, présentation commerciale. Un seul tournage, de la valeur multipliée.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Tournage en intérieur et extérieur (Genève et Suisse)',
                  'Captation 4K, stabilisateur, éclairage professionnel',
                  'Post-production : montage, étalonnage, sound design',
                  'Motion graphics et sous-titres',
                  'Livraison multi-formats (Reels, Stories, YouTube, LinkedIn)',
                  'Shooting produit et corporate',
                  'Vidéos publicitaires (Meta Ads, YouTube Ads)',
                  'Interviews et témoignages clients',
                ].map((item) => (
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

      {/* ── Insight / Problème ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi la vidéo</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Le contenu statique ne convertit plus comme avant.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Les algorithmes de toutes les plateformes sociales priorisent la vidéo. Les visiteurs de votre site restent plus longtemps avec une vidéo. Vos prospects se souviennent de vous si vous leur avez parlé en vidéo. C&apos;est mesurable, pas une opinion.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Zap, title: 'La vidéo est regardée 5× plus longtemps qu\'un article de blog sur les réseaux.', sub: 'Source : HubSpot State of Marketing 2024' },
                  { Icon: BarChart2, title: '80% des consommateurs préfèrent voir une vidéo de marque plutôt que lire un texte.', sub: 'Source : Wyzowl Video Survey 2024' },
                  { Icon: Star, title: 'Les pages avec vidéo ont un taux de conversion 2× supérieur aux pages sans vidéo.', sub: 'Source : EyeView Digital' },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-3 items-start">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <item.Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                        <p className="text-text-muted text-[11px] mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <VideoFormatsGrid />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="resultats" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Résultats</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Le format qui convertit le mieux.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <b.Icon size={22} style={{ color }} />
                  </div>
                  <div className="text-3xl font-bold" style={{ color }}>{b.value}</div>
                  <h3 className="text-white font-bold text-lg">{b.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{b.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres ── */}
      <InfiniteGrid accentRgb="124,58,237" blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des tarifs clairs, un devis fixe.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Chaque devis est détaillé et validé avant démarrage. Pas de surprise en cours de production.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Clip Social',
                price: 'CHF 800',
                duration: 'Livraison 5 jours',
                highlight: false,
                features: [
                  '1 vidéo courte (30–90 sec)',
                  'Montage + étalonnage',
                  '2 formats livrés (9:16 + 16:9)',
                  'Sous-titres inclus',
                  '1 révision',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Série Contenu',
                price: "CHF 2'000",
                duration: 'Le plus demandé',
                highlight: true,
                features: [
                  '4 vidéos (mix courts + longs)',
                  'Motion graphics',
                  'Sous-titres + musique licenciée',
                  '3 formats par vidéo',
                  '2 révisions incluses',
                  'Livraison sous 10 jours',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Brand Film',
                price: "CHF 4'500",
                duration: 'Film de marque complet',
                highlight: false,
                features: [
                  'Film corporate 2–5 min',
                  'Drone si nécessaire',
                  'Interviews + coulisses',
                  'Musique licenciée',
                  '4 formats livrés',
                  'Droits d\'exploitation complets',
                ],
                cta: 'Discutons de votre projet',
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? `0 0 40px rgba(124,58,237,0.15)` : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                  )}
                  <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        Le plus demandé
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-1" style={{ color }}>{offer.price}</p>
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
                      href="/contact?service=service-digital"
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

      {/* ── Process ── */}
      <section id="process" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Du brief à la vidéo livrée.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <SectionReveal key={p.step} delay={i * 0.08}>
                <div className="flex flex-col gap-3 p-5 bg-bg rounded-[14px] border border-border h-full">
                  <div className="text-[11px] font-bold tracking-widest" style={{ color }}>{p.step}</div>
                  <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <InfiniteGrid accentRgb="124,58,237" blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que disent nos clients.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'DKDP a filmé nos témoignages clients en une demi-journée. Le résultat est d\'une qualité qu\'on n\'imaginait pas pour ce budget. Nos prospects les regardent avant de signer.',
                author: 'Directeur général, société de conseil',
                location: 'Genève',
              },
              {
                quote: 'On voulait une vidéo de marque pour notre site. DKDP a livré quelque chose qui nous a surpris. Notre taux de rebond a chuté de 65% depuis la mise en ligne.',
                author: 'Fondatrice, boutique de luxe',
                location: 'Genève',
              },
              {
                quote: 'Les Reels que DKDP produit pour nous font 10× plus de vues que ce qu\'on faisait avec notre smartphone. La différence est immédiate.',
                author: 'Responsable marketing, PME 80 personnes',
                location: 'Suisse romande',
              },
            ].map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.author}</p>
                    <p className="text-text-muted text-xs">{t.location}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </InfiniteGrid>

      {/* ── Réalisations + Garanties ── */}
      <section id="realisations" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Réalisations</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des résultats, pas des promesses.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'Société de conseil B2B',
                type: 'Témoignages clients',
                image: '/images/services/dkdp-agence-creation-video.webp',
                results: ['6 témoignages filmés en 1 journée', 'Utilisés sur site + LinkedIn', 'Taux de conversion +35%'],
                tech: 'Interview · 4K · Motion Graphics',
              },
              {
                client: 'Marque lifestyle Genève',
                type: 'Série Reels Instagram',
                image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
                results: ['12 Reels produits / trimestre', "Reach moyen 28'000 / Reel", '+340% abonnés en 4 mois'],
                tech: 'Reels · 9:16 · CapCut Pro',
              },
              {
                client: 'PME industrielle',
                type: 'Brand Film corporate',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ['Film 3 min + 4 déclinaisons', 'Utilisé en salon professionnel', 'Leads entrants +60% salon B2B'],
                tech: 'Brand Film · Drone · 4K · DaVinci',
              },
            ].map((r, i) => (
              <SectionReveal key={r.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={r.image}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color, border: `1px solid ${border}` }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ background: bg }}>
                    <p className="text-white font-bold mb-4">{r.client}</p>
                    <div className="space-y-2 flex-1">
                      {r.results.map((res) => (
                        <div key={res} className="flex items-center gap-2">
                          <Star size={11} style={{ color }} className="flex-shrink-0" />
                          <span className="text-white text-sm font-semibold">{res}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-text-muted text-[11px] mt-4 font-mono">{r.tech}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Garanties */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Nos engagements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'Story-board validé', desc: 'Vous validez le story-board avant le tournage. Aucune surprise : vous savez exactement ce qui sera filmé.' },
                  { Icon: Clock, title: 'Livraison en 5 jours', desc: 'Post-production livrée sous 5 jours pour les clips sociaux, 10 jours pour les brand films et interviews.' },
                  { Icon: BarChart2, title: 'Tous formats inclus', desc: 'Chaque vidéo est livrée en plusieurs formats adaptés aux plateformes : 9:16 pour les Reels, 16:9 pour YouTube et LinkedIn.' },
                  { Icon: Globe2, title: 'Droits complets cédés', desc: 'Vous recevez tous les droits d\'exploitation. Pas de contraintes d\'utilisation ou de durée sur les vidéos livrées.' },
                ].map((g) => (
                  <div key={g.title} className="text-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px] mx-auto mb-4"
                      style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${border}` }}
                    >
                      <g.Icon size={22} style={{ color }} />
                    </div>
                    <p className="text-white font-bold text-sm mb-2">{g.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[112px]">
        <FAQSection items={FAQ} title="Vos questions sur la création vidéo" />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/reseaux-sociaux"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                borderColor: 'rgba(124,58,237,0.28)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Zap size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Étape suivante</p>
                  <p className="text-white font-bold text-lg leading-tight">Gestion des réseaux sociaux</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Une vidéo professionnelle, c&apos;est bien. Diffusée sur les bonnes plateformes avec la bonne stratégie, c&apos;est transformationnel. Découvrez notre gestion des réseaux sociaux.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir les réseaux <ChevronRight size={12} />
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
