'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Globe, Cpu, GraduationCap, Search, Megaphone, BarChart2,
  Bot, Workflow, BrainCircuit, BookOpen, Users2, Presentation,
  Phone, FileText, Star, ChevronRight, X, Menu,
  Film, Shield, Share2, Palette, LayoutGrid,
  Sparkles, CalendarCheck, Monitor,
} from 'lucide-react'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'

// ─── Mega-menu data ───────────────────────────────────────────────────────────

const AGENCE_MAIN = [
  { title: 'Création de site web', href: '/agence-digitale/creation-site-web', icon: Globe, description: 'Sites sur mesure qui convertissent et performent.' },
  { title: 'SEO & Référencement', href: '/agence-digitale/seo', icon: Search, description: 'Visibilité organique durable sur Google.' },
  { title: 'Publicité SEA', href: '/agence-digitale/publicite-sea', icon: Megaphone, description: 'Google Ads et campagnes payantes rentables.' },
  { title: 'Réseaux sociaux', href: '/agence-digitale/reseaux-sociaux', icon: Share2, description: 'Présence sociale cohérente et engageante.' },
  { title: 'Création vidéo', href: '/agence-digitale/creation-video', icon: Film, description: 'Vidéos qui captivent et convertissent.' },
  { title: 'Consulting marketing', href: '/agence-digitale/consulting-marketing', icon: Presentation, description: 'Stratégie digitale et accompagnement.' },
  { title: 'RGPD & Cookies', href: '/agence-digitale/rgpd-cookies', icon: Shield, description: 'Conformité légale et protection des données.' },
]

const AGENCE_SECONDARY = [
  { title: 'Audit site gratuit', href: '/agence-digitale/creation-site-web/audit-site', icon: Search },
  { title: 'Audit SEO gratuit', href: '/agence-digitale/seo/audit-seo', icon: BarChart2 },
  { title: 'Nos réalisations', href: '/realisations', icon: Star },
  { title: 'Tarifs agence', href: '/tarifs', icon: FileText },
  { title: 'Contacter l\'agence', href: '/contact', icon: Phone },
]

const IA_MAIN = [
  { title: 'Agents IA sur mesure', href: '/intelligence-artificielle/agents-ia', icon: Bot, description: 'Automatisez vos processus avec des agents intelligents.' },
  { title: 'Automatisation métier', href: '/intelligence-artificielle/automatisation', icon: Workflow, description: 'Workflows sans code, zéro friction.' },
  { title: 'Audit & Conseil IA', href: '/intelligence-artificielle/audit-conseil', icon: BrainCircuit, description: 'Diagnostiquez votre potentiel d\'automatisation.' },
  { title: 'Mise en place IA', href: '/intelligence-artificielle/mise-en-place', icon: Cpu, description: 'Déployez l\'IA dans votre stack existant.' },
]

const IA_SECONDARY = [
  { title: 'Formation IA entreprise', href: '/formation-entreprise/ia', icon: GraduationCap },
  { title: 'Cas clients IA', href: '/realisations', icon: Star },
  { title: 'Tarifs IA', href: '/tarifs', icon: FileText },
  { title: 'Parler à un expert', href: '/contact', icon: Phone },
]

const FORMATION_MAIN = [
  { title: 'Formation IA en entreprise', href: '/formation-entreprise/ia', icon: BrainCircuit, description: 'Formez vos équipes aux outils IA du quotidien.' },
  { title: 'Bureautique', href: '/formation-entreprise/bureautique', icon: BookOpen, description: 'Gagnez du temps sur chaque fichier.' },
  { title: 'Réseaux sociaux', href: '/formation-entreprise/reseaux-sociaux', icon: Share2, description: 'Maîtrisez les plateformes sociales.' },
  { title: 'Cybersécurité', href: '/formation-entreprise/cybersecurite', icon: Shield, description: 'Protégez vos données et vos collaborateurs.' },
  { title: 'Web design', href: '/formation-entreprise/web-design', icon: Palette, description: 'Créez des interfaces modernes et efficaces.' },
  { title: 'Informatique', href: '/formation-entreprise/informatique', icon: Cpu, description: 'Compétences informatiques essentielles.' },
  { title: 'Montage vidéo', href: '/formation-entreprise/montage-video', icon: Film, description: 'Créez des vidéos professionnelles.' },
]

const FORMATION_SECONDARY = [
  { title: 'Programme complet', href: '/formation-entreprise', icon: BookOpen },
  { title: 'Pour les particuliers', href: '/formation-particuliers', icon: Users2 },
  { title: 'Réserver une session', href: '/contact', icon: Phone },
]

const APROPOS_MAIN = [
  { title: 'À propos de l\'agence', href: '/a-propos', icon: Users2, description: 'Notre équipe, nos valeurs et notre histoire.' },
  { title: 'Réalisations', href: '/realisations', icon: Star, description: 'Nos projets et succès clients.' },
  { title: 'Tarifs', href: '/tarifs', icon: FileText, description: 'Formules et prix clairs et transparents.' },
  { title: 'Blog', href: '/blog', icon: BookOpen, description: 'Ressources et conseils digitaux.' },
  { title: 'Glossaire', href: '/glossaire', icon: Search, description: 'Lexique du digital et de l\'IA.' },
]

const APROPOS_SECONDARY = [
  { title: 'Formation particuliers', href: '/formation-particuliers', icon: GraduationCap },
  { title: 'Contacter l\'agence', href: '/contact', icon: Phone },
]

// ─── Pillar accent colours ────────────────────────────────────────────────────

const PILLAR_ACCENT = {
  agence:    { color: '#A78BFA', bg: 'rgba(124,58,237,0.12)',  border: 'rgba(124,58,237,0.25)' },
  ia:        { color: '#D4D4D8', bg: 'rgba(212,212,216,0.08)', border: 'rgba(212,212,216,0.18)' },
  formation: { color: '#FF8C00', bg: 'rgba(255,107,0,0.10)',   border: 'rgba(255,107,0,0.22)'  },
  apropos:   { color: '#9CA3AF', bg: 'rgba(156,163,175,0.08)', border: 'rgba(156,163,175,0.18)' },
}

// ─── MegaMenu panel ───────────────────────────────────────────────────────────

type MegaItem = { title: string; href: string; icon: React.ElementType; description?: string }
type MegaSecondary = { title: string; href: string; icon: React.ElementType }
type PillarKey = 'agence' | 'ia' | 'formation' | 'apropos'

function MegaPanel({
  pillar, label, tagline, main, secondary, hubHref, hubLabel,
}: {
  pillar: PillarKey
  label: string
  tagline: string
  main: MegaItem[]
  secondary: MegaSecondary[]
  hubHref: string
  hubLabel: string
}) {
  const { color, bg, border } = PILLAR_ACCENT[pillar]
  return (
    <div className="w-[700px] p-5 grid grid-cols-[1fr_190px] gap-5">
      {/* Left - main links */}
      <div>
        {/* Pillar header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <span
            className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase"
            style={{ color, background: bg, border: `1px solid ${border}` }}
          >
            {label}
          </span>
          <span className="text-text-muted text-xs">{tagline}</span>
        </div>
        <ul className="grid grid-cols-2 gap-1.5">
          {main.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="group flex items-start gap-3 rounded-[8px] p-2.5 transition-colors hover:bg-white/[0.04]"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <item.icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white leading-snug group-hover:text-white">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-[11px] text-text-muted leading-snug mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
        {/* Hub - see all */}
        <div className="mt-3 pt-2.5 border-t border-border">
          <NavigationMenuLink asChild>
            <Link
              href={hubHref}
              className="inline-flex items-center gap-1 text-[12px] font-medium transition-colors hover:opacity-80"
              style={{ color }}
            >
              {hubLabel} <ChevronRight size={12} />
            </Link>
          </NavigationMenuLink>
        </div>
      </div>

      {/* Right - secondary links */}
      <div className="border-l border-border pl-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">Accès rapide</p>
        <ul className="space-y-0.5">
          {secondary.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 rounded-[6px] px-2 py-1.5 text-[12px] text-text-secondary hover:bg-white/[0.04] hover:text-white transition-colors group"
                >
                  <item.icon size={13} className="flex-shrink-0 text-text-muted group-hover:text-white transition-colors" />
                  <span>{item.title}</span>
                  <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-border">
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-1.5 w-full rounded-[6px] py-2 text-[12px] font-semibold transition-all"
              style={{ color, background: bg, border: `1px solid ${border}` }}
            >
              Devis gratuit <ChevronRight size={12} />
            </Link>
          </NavigationMenuLink>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile Nav (rich tabbed UI) ─────────────────────────────────────────────

type TabKey = PillarKey

const MOBILE_TABS: {
  key: TabKey
  label: string
  tabIcon: React.ElementType
  color: string
  bg: string
  border: string
  items: MegaItem[]
  secondary: MegaSecondary[]
  hubHref?: string
  hubLabel?: string
}[] = [
  { key: 'agence',    label: 'Services',  tabIcon: Globe,       ...PILLAR_ACCENT.agence,    items: AGENCE_MAIN,    secondary: AGENCE_SECONDARY,    hubHref: '/agence-digitale',         hubLabel: 'Voir tous les services' },
  { key: 'formation', label: 'Formation', tabIcon: GraduationCap, ...PILLAR_ACCENT.formation, items: FORMATION_MAIN, secondary: FORMATION_SECONDARY, hubHref: '/formation-entreprise',    hubLabel: 'Voir toutes les formations' },
  { key: 'ia',        label: 'IA',        tabIcon: Bot,         ...PILLAR_ACCENT.ia,        items: IA_MAIN,        secondary: IA_SECONDARY,        hubHref: '/intelligence-artificielle', hubLabel: 'Voir toutes nos solutions IA' },
  { key: 'apropos',   label: 'Agence',    tabIcon: LayoutGrid,  ...PILLAR_ACCENT.apropos,   items: APROPOS_MAIN,   secondary: APROPOS_SECONDARY,   hubHref: '/a-propos',                hubLabel: 'À propos de DKDP' },
]

const TAB_ORDER: TabKey[] = ['agence', 'formation', 'ia', 'apropos']

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -28, opacity: 0 }),
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = React.useState<TabKey>('agence')
  const [direction, setDirection] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setActiveTab('agence'), 280)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!mounted || typeof window === 'undefined') return null

  const tab = MOBILE_TABS.find(t => t.key === activeTab)!

  function switchTab(key: TabKey) {
    const ci = TAB_ORDER.indexOf(activeTab)
    const ni = TAB_ORDER.indexOf(key)
    if (ci === ni) return
    setDirection(ni > ci ? 1 : -1)
    setActiveTab(key)
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          id="mobile-menu"
          className="fixed left-0 right-0 bottom-0 z-40 xl:hidden flex flex-col"
          style={{ top: '56px', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(24px)' }}
        >
          {/* ── Tab bar ── */}
          <div className="flex-shrink-0 px-4 pt-4 pb-3">
            <div className="flex gap-1.5 p-1 rounded-[14px] bg-white/[0.04] border border-border">
              {MOBILE_TABS.map(t => {
                const isActive = activeTab === t.key
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => switchTab(t.key)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-[12px] font-semibold transition-all duration-200"
                    style={isActive
                      ? { color: t.color, background: t.bg, border: `1px solid ${t.border}` }
                      : { color: '#52525B' }
                    }
                  >
                    <t.tabIcon size={13} />
                    <span className="truncate">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                className="px-4 pb-4"
              >
                {/* Cards grid */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {tab.items.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.16 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex flex-col gap-2.5 rounded-[12px] p-3.5 h-full active:scale-[0.97] transition-transform"
                        style={{ background: tab.bg, border: `1px solid ${tab.border}` }}
                      >
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                          style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${tab.border}` }}
                        >
                          <item.icon size={16} style={{ color: tab.color }} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-white leading-snug">{item.title}</p>
                          {item.description && (
                            <p className="text-[11px] text-text-muted leading-snug mt-0.5 line-clamp-2">{item.description}</p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Hub link */}
                {tab.hubHref && (
                  <div className="mt-3.5">
                    <Link
                      href={tab.hubHref}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity hover:opacity-70"
                      style={{ color: tab.color }}
                    >
                      {tab.hubLabel} <ChevronRight size={12} />
                    </Link>
                  </div>
                )}

                {/* Secondary links */}
                {tab.secondary.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2.5">Accès rapide</p>
                    <div className="space-y-0.5">
                      {tab.secondary.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-2 py-2.5 rounded-[8px] text-[13px] text-text-secondary hover:bg-white/[0.05] hover:text-white transition-colors group"
                        >
                          <item.icon size={14} className="flex-shrink-0 transition-colors" style={{ color: tab.color }} />
                          <span>{item.title}</span>
                          <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Bottom CTA ── */}
          <div
            className="flex-shrink-0 px-4 pt-3"
            style={{
              paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              data-cal-link="david-khazaei/planifier-un-appel"
              data-cal-namespace="planifier-un-appel"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="flex items-center justify-center w-full px-5 py-3.5 bg-white text-black font-bold rounded-full text-[15px] active:scale-[0.98] transition-all hover:bg-gray-100"
            >
              Réservez un appel →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ─── Scroll progress gradient per pillar ─────────────────────────────────────

function getPillarGradient(pathname: string): string {
  if (pathname.startsWith('/intelligence-artificielle'))
    return 'linear-gradient(to right, rgba(255,255,255,0.70), #D4D4D8)'
  if (pathname.startsWith('/formation-entreprise') || pathname.startsWith('/formation-particuliers'))
    return 'linear-gradient(to right, rgba(255,255,255,0.70), #FF8C00)'
  return 'linear-gradient(to right, rgba(255,255,255,0.70), #A78BFA)'
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const progressGradient = getPillarGradient(pathname)
  const progressOpacity = useTransform(scrollYProgress, [0, 0.03, 1], [0, 1, 1])

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        role="banner"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300',
          scrolled || mobileOpen
            ? 'bg-[#0A0A0A]/90 backdrop-blur-[20px] border-border'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="DKDP - Accueil">
            <Image src="/images/logo/dkdp_blanc-croped.png" alt="DKDP" width={108} height={36} priority />
          </Link>

          {/* Desktop nav (xl+) */}
          <div className="hidden xl:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* ── Service Digital ── */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/agence-digitale')}><Monitor size={13} style={{ color: '#A78BFA' }} className="mr-1" />Service Digital</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="agence"
                      label="Agence"
                      tagline="Sites · SEO · Ads · Vidéo"
                      main={AGENCE_MAIN}
                      secondary={AGENCE_SECONDARY}
                      hubHref="/agence-digitale"
                      hubLabel="Voir tous nos services"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ── Formation ── */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/formation-entreprise')}><GraduationCap size={13} style={{ color: '#FF8C00' }} className="mr-1" />Formation</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="formation"
                      label="Formation"
                      tagline="IA · Bureautique · Vidéo · Cyber"
                      main={FORMATION_MAIN}
                      secondary={FORMATION_SECONDARY}
                      hubHref="/formation-entreprise"
                      hubLabel="Voir toutes les formations"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ── Intelligence Artificielle ── */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/intelligence-artificielle')}><Sparkles size={13} style={{ color: '#D4D4D8' }} className="mr-1" />Intelligence Artificielle</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="ia"
                      label="IA"
                      tagline="Agents · Automatisation · Conseil"
                      main={IA_MAIN}
                      secondary={IA_SECONDARY}
                      hubHref="/intelligence-artificielle"
                      hubLabel="Voir toutes nos solutions IA"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ── À propos ── */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/a-propos')}><LayoutGrid size={13} style={{ color: '#9CA3AF' }} className="mr-1" />À propos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="apropos"
                      label="Agence"
                      tagline="Réalisations · Tarifs · Blog · Ressources"
                      main={APROPOS_MAIN}
                      secondary={APROPOS_SECONDARY}
                      hubHref="/a-propos"
                      hubLabel="À propos de DKDP"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ── Contact ── */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-text-secondary hover:text-white transition-colors duration-150"
                    >
                      <Phone size={13} />
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA (xl+) */}
          <div className="hidden xl:block">
            <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="md" shaderDelay={1000}><CalendarCheck size={14} />Réservez un appel</LiquidMetalButton>
          </div>

          {/* Tablet / small laptop - abbreviated mega menus + Contact button (md–xl) */}
          <div className="hidden md:flex xl:hidden items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/agence-digitale')}><Monitor size={13} style={{ color: '#A78BFA' }} className="mr-1" />Service Digital</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="agence"
                      label="Agence"
                      tagline="Sites · SEO · Ads · Vidéo"
                      main={AGENCE_MAIN}
                      secondary={AGENCE_SECONDARY}
                      hubHref="/agence-digitale"
                      hubLabel="Voir tous nos services"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/formation-entreprise')}><GraduationCap size={13} style={{ color: '#FF8C00' }} className="mr-1" />Formation</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="formation"
                      label="Formation"
                      tagline="IA · Bureautique · Vidéo · Cyber"
                      main={FORMATION_MAIN}
                      secondary={FORMATION_SECONDARY}
                      hubHref="/formation-entreprise"
                      hubLabel="Voir toutes les formations"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/intelligence-artificielle')}><Sparkles size={13} style={{ color: '#D4D4D8' }} className="mr-1" />IA</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="ia"
                      label="IA"
                      tagline="Agents · Automatisation · Conseil"
                      main={IA_MAIN}
                      secondary={IA_SECONDARY}
                      hubHref="/intelligence-artificielle"
                      hubLabel="Voir toutes nos solutions IA"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push('/a-propos')}><LayoutGrid size={13} style={{ color: '#9CA3AF' }} className="mr-1" />Agence</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel
                      pillar="apropos"
                      label="Agence"
                      tagline="Réalisations · Tarifs · Blog · Ressources"
                      main={APROPOS_MAIN}
                      secondary={APROPOS_SECONDARY}
                      hubHref="/a-propos"
                      hubLabel="À propos de DKDP"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ── Contact ── */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-text-secondary hover:text-white transition-colors duration-150"
                    >
                      <Phone size={13} />
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Hamburger (mobile + tablet, below xl) */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="xl:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:bg-white/5 transition-colors"
          >
            {mobileOpen
              ? <X size={18} />
              : <Menu size={18} />
            }
          </button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ scaleX: scrollYProgress, opacity: progressOpacity, background: progressGradient }}
        />
      </motion.header>

      {/* Mobile nav */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
