'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { m, AnimatePresence } from 'framer-motion'
import {
  Globe, Cpu, GraduationCap, Search, Megaphone, BarChart2,
  Bot, Workflow, BrainCircuit, BookOpen, Users2, Presentation,
  Phone, FileText, ChevronRight, X, Menu,
  Film, Shield, Share2, Palette, LayoutGrid, Wand2,
  CalendarCheck, MessageCircle, Smartphone, Sparkles, Monitor,
} from 'lucide-react'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { ClaudeIcon } from '@/components/icons/ClaudeIcon'
import { DkdpLogo } from '@/components/ui/DkdpLogo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { type Locale, detectLocaleFromPath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizedPath } from '@/i18n/slugs'

// ─── Mega-menu data builders ──────────────────────────────────────────────────

type MegaItem = { title: string; href: string; icon: React.ElementType; description?: string }
type MegaSecondary = { title: string; href: string; icon: React.ElementType }
type PillarKey = 'agence' | 'ia' | 'formation' | 'apropos'
type TagLink = { text: string; href: string }

function buildNavData(lang: Locale) {
  const dict = getDictionary(lang)
  const t = dict.nav
  const lp = (fr: string) => localizedPath(fr, lang)

  const AGENCE_MAIN: MegaItem[] = [
    { title: t.agenceMain[0].title, description: t.agenceMain[0].description, href: lp('/agence-digitale/creation-site-web'), icon: Globe },
    { title: t.agenceMain[1].title, description: t.agenceMain[1].description, href: lp('/agence-digitale/refonte-site-web'), icon: Globe },
    { title: t.agenceMain[2].title, description: t.agenceMain[2].description, href: lp('/agence-digitale/developpement-application'), icon: Smartphone },
    { title: t.agenceMain[3].title, description: t.agenceMain[3].description, href: lp('/agence-digitale/seo'), icon: Search },
    { title: t.agenceMain[4].title, description: t.agenceMain[4].description, href: lp('/agence-digitale/publicite-sea'), icon: Megaphone },
    { title: t.agenceMain[5].title, description: t.agenceMain[5].description, href: lp('/agence-digitale/reseaux-sociaux'), icon: Share2 },
    { title: t.agenceMain[6].title, description: t.agenceMain[6].description, href: lp('/agence-digitale/creation-video'), icon: Film },
    { title: t.agenceMain[7].title, description: t.agenceMain[7].description, href: lp('/agence-digitale/consulting-marketing'), icon: Presentation },
    { title: t.agenceMain[8].title, description: t.agenceMain[8].description, href: lp('/agence-digitale/rgpd-cookies'), icon: Shield },
  ]

  const AGENCE_SECONDARY: MegaSecondary[] = [
    { title: t.agenceSecondary[0].title, href: lp('/agence-digitale/creation-site-web/audit-site'), icon: Search },
    { title: t.agenceSecondary[1].title, href: lp('/agence-digitale/seo/audit-seo'), icon: BarChart2 },
    { title: t.agenceSecondary[2].title, href: lp('/agence-digitale/creation-site-web/estimation'), icon: CalendarCheck },
    { title: t.agenceSecondary[3].title, href: lp('/tarifs'), icon: FileText },
    { title: t.agenceSecondary[4].title, href: lp('/contact'), icon: Phone },
  ]

  const IA_MAIN: MegaItem[] = [
    { title: t.iaMain[0].title, description: t.iaMain[0].description, href: lp('/intelligence-artificielle/agents-ia'), icon: Bot },
    { title: t.iaMain[1].title, description: t.iaMain[1].description, href: lp('/intelligence-artificielle/automatisation'), icon: Workflow },
    { title: t.iaMain[2].title, description: t.iaMain[2].description, href: lp('/intelligence-artificielle/audit-conseil'), icon: BrainCircuit },
    { title: t.iaMain[3].title, description: t.iaMain[3].description, href: lp('/intelligence-artificielle/mise-en-place'), icon: Cpu },
    { title: t.iaMain[4].title, description: t.iaMain[4].description, href: lp('/intelligence-artificielle/chatbot-ia'), icon: MessageCircle },
  ]

  const IA_SECONDARY: MegaSecondary[] = [
    { title: t.iaSecondary[0].title, href: lp('/intelligence-artificielle/geneve'), icon: Globe },
    { title: t.iaSecondary[1].title, href: lp('/formation-entreprise/ia'), icon: GraduationCap },
    { title: t.iaSecondary[2].title, href: lp('/formation-entreprise/claude-ai'), icon: ClaudeIcon },
    { title: t.iaSecondary[3].title, href: lp('/tarifs'), icon: FileText },
    { title: t.iaSecondary[4].title, href: lp('/contact'), icon: Phone },
  ]

  const FORMATION_MAIN: MegaItem[] = [
    { title: t.formationMain[0].title, description: t.formationMain[0].description, href: lp('/formation-entreprise/ia'), icon: BrainCircuit },
    { title: t.formationMain[1].title, description: t.formationMain[1].description, href: lp('/formation-entreprise/claude-ai'), icon: ClaudeIcon },
    { title: t.formationMain[2].title, description: t.formationMain[2].description, href: lp('/formation-entreprise/bureautique'), icon: BookOpen },
    { title: t.formationMain[3].title, description: t.formationMain[3].description, href: lp('/formation-entreprise/reseaux-sociaux'), icon: Share2 },
    { title: t.formationMain[4].title, description: t.formationMain[4].description, href: lp('/formation-entreprise/cybersecurite'), icon: Shield },
    { title: t.formationMain[5].title, description: t.formationMain[5].description, href: lp('/formation-entreprise/canva'), icon: Wand2 },
    { title: t.formationMain[6].title, description: t.formationMain[6].description, href: lp('/formation-entreprise/figma'), icon: Palette },
    { title: t.formationMain[7].title, description: t.formationMain[7].description, href: lp('/formation-entreprise/informatique'), icon: Cpu },
    { title: t.formationMain[8].title, description: t.formationMain[8].description, href: lp('/formation-entreprise/montage-video'), icon: Film },
  ]

  const FORMATION_SECONDARY: MegaSecondary[] = [
    { title: t.formationSecondary[0].title, href: lp('/formation-entreprise'), icon: BookOpen },
    // Anchor #formateurs n'a pas d'equivalent EN sur la page ia, on retombe sur le hub formation.
    { title: t.formationSecondary[1].title, href: lp('/formation-entreprise/ia') + (lang === 'fr' ? '#formateurs' : ''), icon: Users2 },
    { title: t.formationSecondary[2].title, href: lp('/formation-particuliers'), icon: Users2 },
    { title: t.formationSecondary[3].title, href: lp('/contact'), icon: Phone },
  ]

  const APROPOS_MAIN: MegaItem[] = [
    { title: t.aproposMain[0].title, description: t.aproposMain[0].description, href: lp('/a-propos'), icon: Users2 },
    { title: t.aproposMain[1].title, description: t.aproposMain[1].description, href: lp('/tarifs'), icon: FileText },
    { title: t.aproposMain[2].title, description: t.aproposMain[2].description, href: lp('/blog'), icon: BookOpen },
    { title: t.aproposMain[3].title, description: t.aproposMain[3].description, href: lp('/glossaire'), icon: Search },
  ]

  const APROPOS_SECONDARY: MegaSecondary[] = [
    { title: t.aproposSecondary[0].title, href: lp('/formation-particuliers'), icon: GraduationCap },
    { title: t.aproposSecondary[1].title, href: lp('/contact'), icon: Phone },
  ]

  return { AGENCE_MAIN, AGENCE_SECONDARY, IA_MAIN, IA_SECONDARY, FORMATION_MAIN, FORMATION_SECONDARY, APROPOS_MAIN, APROPOS_SECONDARY, dict }
}

// ─── Pillar accent colours ────────────────────────────────────────────────────

const PILLAR_ACCENT = {
  agence:    { color: 'var(--violet-light)', bg: 'var(--violet-bg)',  border: 'var(--violet-border)' },
  ia:        { color: 'var(--text-secondary)', bg: 'var(--chrome-bg)', border: 'var(--chrome-border)' },
  formation: { color: 'var(--orange-light)', bg: 'var(--orange-bg)',   border: 'var(--orange-border)' },
  apropos:   { color: 'var(--text-secondary)', bg: 'var(--gray-bg)', border: 'var(--gray-border)' },
}

const TRIGGER_STYLE: Record<'agence' | 'ia' | 'formation' | 'apropos', React.CSSProperties> = {
  agence:    { '--trigger-hover-bg': 'var(--violet-bg)', '--trigger-active-bg': 'var(--violet-bg)', '--trigger-active-color': 'var(--violet)' } as React.CSSProperties,
  formation: { '--trigger-hover-bg': 'var(--orange-bg)', '--trigger-active-bg': 'var(--orange-bg)', '--trigger-active-color': 'var(--orange)' } as React.CSSProperties,
  ia:        { '--trigger-hover-bg': 'var(--chrome-bg)', '--trigger-active-bg': 'var(--chrome-bg)', '--trigger-active-color': 'var(--text)' } as React.CSSProperties,
  apropos:   { '--trigger-hover-bg': 'var(--gray-bg)',   '--trigger-active-bg': 'var(--gray-bg)',   '--trigger-active-color': 'var(--text)' } as React.CSSProperties,
}

// ─── MegaPanel ────────────────────────────────────────────────────────────────

function MegaPanel({
  pillar, label, labelHref, tags, main, secondary, hubHref, hubLabel, lang,
}: {
  pillar: PillarKey
  label: string
  labelHref: string
  tags: TagLink[]
  main: MegaItem[]
  secondary: MegaSecondary[]
  hubHref: string
  hubLabel: string
  lang: Locale
}) {
  const { color, bg, border } = PILLAR_ACCENT[pillar]
  const dict = getDictionary(lang)
  const quickAccess = lang === 'en' ? 'Quick access' : 'Acces rapide'
  return (
    <div className="w-[700px] p-5 grid grid-cols-[1fr_190px] gap-5">
      {/* Left - main links */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <NavigationMenuLink asChild>
            <Link
              href={labelHref}
              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ color, background: bg, border: `1px solid ${border}` }}
            >
              {label}
            </Link>
          </NavigationMenuLink>
          <span className="text-text-muted text-xs flex items-center gap-1">
            {tags.map((tag, i) => (
              <span key={tag.href} className="inline-flex items-center gap-1">
                {i > 0 && <span className="opacity-40">·</span>}
                <NavigationMenuLink asChild>
                  <Link href={tag.href} className="transition-colors hover:text-text">
                    {tag.text}
                  </Link>
                </NavigationMenuLink>
              </span>
            ))}
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-1.5">
          {main.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="group flex items-start gap-3 rounded-[8px] p-2.5 border border-transparent transition-all duration-200 hover:bg-[var(--pillar-bg)] hover:border-[var(--pillar-border)] hover:-translate-y-[1px]"
                  style={{ '--pillar-bg': bg, '--pillar-border': border, '--pillar-color': color } as React.CSSProperties}
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px] transition-transform duration-200 group-hover:scale-105"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <item.icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-secondary leading-snug transition-colors duration-200 group-hover:text-text">
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
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">{quickAccess}</p>
        <ul className="space-y-0.5">
          {secondary.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 rounded-[6px] px-2 py-1.5 text-[12px] text-text-secondary transition-all duration-200 hover:bg-[var(--pillar-bg)] hover:text-text hover:translate-x-0.5 group"
                  style={{ '--pillar-bg': bg, '--pillar-color': color } as React.CSSProperties}
                >
                  <item.icon size={13} className="flex-shrink-0 text-text-muted transition-colors group-hover:text-[var(--pillar-color)]" />
                  <span>{item.title}</span>
                  <ChevronRight
                    size={11}
                    className="ml-auto opacity-0 transition-opacity group-hover:opacity-90"
                    style={{ color }}
                  />
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-border">
          <NavigationMenuLink asChild>
            <Link
              href={localizedPath('/contact', lang)}
              className="flex items-center justify-center gap-1.5 w-full rounded-[6px] py-2 text-[12px] font-semibold transition-all"
              style={{ color, background: bg, border: `1px solid ${border}` }}
            >
              {dict.common.freeQuote} <ChevronRight size={12} />
            </Link>
          </NavigationMenuLink>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────

type TabKey = PillarKey

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -28, opacity: 0 }),
}

function MobileNav({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Locale }) {
  const [activeTab, setActiveTab] = React.useState<TabKey>('agence')
  const [direction, setDirection] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  const navData = React.useMemo(() => buildNavData(lang), [lang])
  const dict = navData.dict
  const lp = (fr: string) => localizedPath(fr, lang)

  const MOBILE_TABS = React.useMemo(() => [
    { key: 'agence' as TabKey,    label: dict.nav.groups.agence,    tabIcon: Globe,        ...PILLAR_ACCENT.agence,    items: navData.AGENCE_MAIN,    secondary: navData.AGENCE_SECONDARY,    tags: [{ text: lang === 'en' ? 'Websites' : 'Sites', href: lp('/agence-digitale/creation-site-web') }, { text: 'SEO', href: lp('/agence-digitale/seo') }, { text: 'Ads', href: lp('/agence-digitale/publicite-sea') }, { text: lang === 'en' ? 'Video' : 'Vidéo', href: lp('/agence-digitale/creation-video') }], hubHref: lp('/agence-digitale'),         hubLabel: dict.common.viewAllServices },
    { key: 'formation' as TabKey, label: dict.nav.groups.formation, tabIcon: GraduationCap, ...PILLAR_ACCENT.formation, items: navData.FORMATION_MAIN, secondary: navData.FORMATION_SECONDARY, tags: [{ text: 'IA', href: lp('/formation-entreprise/ia') }, { text: lang === 'en' ? 'Office' : 'Bureautique', href: lp('/formation-entreprise/bureautique') }, { text: lang === 'en' ? 'Video' : 'Vidéo', href: lp('/formation-entreprise/montage-video') }, { text: 'Cyber', href: lp('/formation-entreprise/cybersecurite') }], hubHref: lp('/formation-entreprise'),    hubLabel: dict.common.viewAllTrainings },
    { key: 'ia' as TabKey,        label: dict.nav.groups.ia,        tabIcon: Bot,          ...PILLAR_ACCENT.ia,        items: navData.IA_MAIN,        secondary: navData.IA_SECONDARY,        tags: [{ text: lang === 'en' ? 'Agents' : 'Agents', href: lp('/intelligence-artificielle/agents-ia') }, { text: lang === 'en' ? 'Automation' : 'Automatisation', href: lp('/intelligence-artificielle/automatisation') }, { text: lang === 'en' ? 'Consulting' : 'Conseil', href: lp('/intelligence-artificielle/audit-conseil') }], hubHref: lp('/intelligence-artificielle'), hubLabel: dict.common.viewAllAi },
    { key: 'apropos' as TabKey,   label: dict.nav.groups.apropos,   tabIcon: LayoutGrid,   ...PILLAR_ACCENT.apropos,   items: navData.APROPOS_MAIN,   secondary: navData.APROPOS_SECONDARY,   tags: [{ text: lang === 'en' ? 'Work' : 'Réalisations', href: lp('/a-propos') }, { text: dict.common.ourPricing, href: lp('/tarifs') }, { text: 'Blog', href: '/blog' }, { text: lang === 'en' ? 'Glossary' : 'Ressources', href: '/glossaire' }], hubHref: lp('/a-propos'),                hubLabel: lang === 'en' ? 'About DKDP' : 'À propos de DKDP' },
  ], [lang, dict, navData])

  const TAB_ORDER: TabKey[] = ['agence', 'formation', 'ia', 'apropos']

  React.useEffect(() => setMounted(true), [])
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setActiveTab('agence'), 280)
      return () => clearTimeout(t)
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!mounted || typeof window === 'undefined') return null

  const tab = MOBILE_TABS.find(t => t.key === activeTab)!
  const quickAccess = lang === 'en' ? 'Quick access' : 'Acces rapide'
  const ariaMenuLabel = lang === 'en' ? 'Navigation menu' : 'Menu de navigation'

  function haptic() {
    try { navigator.vibrate?.(8) } catch {}
  }

  function switchTab(key: TabKey) {
    const ci = TAB_ORDER.indexOf(activeTab)
    const ni = TAB_ORDER.indexOf(key)
    if (ci === ni) return
    setDirection(ni > ci ? 1 : -1)
    setActiveTab(key)
    haptic()
  }

  function swipeToNextTab(deltaX: number) {
    const ci = TAB_ORDER.indexOf(activeTab)
    if (deltaX < 0 && ci < TAB_ORDER.length - 1) {
      switchTab(TAB_ORDER[ci + 1])
    } else if (deltaX > 0 && ci > 0) {
      switchTab(TAB_ORDER[ci - 1])
    }
  }

  function handleTabClick(t: typeof MOBILE_TABS[0]) {
    if (activeTab === t.key && t.hubHref) {
      router.push(t.hubHref)
      onClose()
    } else {
      switchTab(t.key)
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          key="mobile-nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={ariaMenuLabel}
          className="fixed left-0 right-0 bottom-0 z-40 xl:hidden flex flex-col"
          style={{
            top: 'calc(66px + env(safe-area-inset-top, 0px))',
            background: 'color-mix(in srgb, var(--bg) 97%, transparent)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            willChange: 'transform, opacity',
          }}
        >
          {/* Tab bar */}
          <div className="flex-shrink-0 px-4 pt-4 pb-3">
            <div className="flex gap-1.5 p-1 rounded-[14px] bg-[var(--surface-default)] border border-border">
              {MOBILE_TABS.map(t => {
                const isActive = activeTab === t.key
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleTabClick(t)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-[12px] font-semibold transition-all duration-200"
                    style={isActive
                      ? { color: t.color, background: t.bg, border: `1px solid ${t.border}` }
                      : { color: 'var(--text-secondary)' }
                    }
                  >
                    <t.tabIcon size={13} />
                    <span className="truncate">{t.label}</span>
                    {isActive && <ChevronRight size={11} className="opacity-50 flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={activeTab}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                onPanEnd={(_, info) => {
                  if (
                    Math.abs(info.offset.x) > 60 &&
                    Math.abs(info.offset.x) > Math.abs(info.offset.y) * 1.5 &&
                    Math.abs(info.velocity.x) > 150
                  ) {
                    swipeToNextTab(info.offset.x)
                  }
                }}
                className="px-4 pb-4 touch-pan-y"
              >
                <div className="flex flex-wrap items-center gap-1.5 mt-1 mb-3">
                  <Link
                    href={tab.hubHref || '/'}
                    onClick={onClose}
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
                    style={{ color: tab.color, background: tab.bg, border: `1px solid ${tab.border}` }}
                  >
                    {tab.label}
                  </Link>
                  {tab.tags.map((tag, i) => (
                    <span key={tag.href} className="inline-flex items-center gap-1">
                      {i > 0 && <span className="text-text-muted opacity-40 text-xs">·</span>}
                      <Link
                        href={tag.href}
                        onClick={onClose}
                        className="text-xs text-text-muted transition-colors active:text-text"
                      >
                        {tag.text}
                      </Link>
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2">
                  {tab.items.map((item, i) => (
                    <m.div
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.16 }}
                    >
                      <Link
                        href={item.href}
                        prefetch
                        onClick={() => { haptic(); onClose() }}
                        className="flex flex-col gap-2.5 rounded-[12px] p-3.5 h-full active:scale-[0.97] transition-transform"
                        style={{ background: tab.bg, border: `1px solid ${tab.border}` }}
                      >
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                          style={{ background: 'var(--bg-card)', border: `1px solid ${tab.border}` }}
                        >
                          <item.icon size={16} style={{ color: tab.color }} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-text leading-snug">{item.title}</p>
                          {item.description && (
                            <p className="text-[11px] text-text-muted leading-snug mt-0.5 line-clamp-2">{item.description}</p>
                          )}
                        </div>
                      </Link>
                    </m.div>
                  ))}
                </div>

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

                {tab.secondary.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2.5">{quickAccess}</p>
                    <div className="space-y-0.5">
                      {tab.secondary.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          prefetch
                          onClick={() => { haptic(); onClose() }}
                          className="flex items-center gap-3 px-2 py-2.5 rounded-[8px] text-[13px] text-text-secondary transition-colors group active:bg-[var(--pillar-bg)] active:text-[var(--pillar-color)]"
                          style={{ '--pillar-bg': tab.bg, '--pillar-color': tab.color } as React.CSSProperties}
                        >
                          <item.icon size={14} className="flex-shrink-0 transition-colors" style={{ color: tab.color }} />
                          <span>{item.title}</span>
                          <ChevronRight
                            size={11}
                            className="ml-auto opacity-30 transition-opacity group-active:opacity-90"
                            style={{ color: tab.color }}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </m.div>
            </AnimatePresence>
          </div>

          {/* Language switcher + Bottom CTA */}
          <div
            className="flex-shrink-0 px-4 pt-3 space-y-3"
            style={{
              paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
                {lang === 'en' ? 'Language' : 'Langue'}
              </span>
              <LanguageSwitcher onNavigate={onClose} />
            </div>
            <button
              type="button"
              onClick={onClose}
              data-cal-link="david-khazaei/planifier-un-appel"
              data-cal-namespace="planifier-un-appel"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="flex items-center justify-center w-full px-5 py-3.5 font-bold rounded-full text-[15px] active:scale-[0.98] transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #FF6B00)',
                color: '#FFFFFF',
              }}
            >
              {dict.common.bookCall} →
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ─── Scroll progress gradient per pillar ─────────────────────────────────────

function getPillarGradient(pathname: string): string {
  const start = 'color-mix(in srgb, var(--text-secondary) 70%, transparent)'
  // Detect FR or EN segments equivalently
  if (pathname.startsWith('/intelligence-artificielle') || pathname.startsWith('/en/artificial-intelligence'))
    return `linear-gradient(to right, ${start}, #D4D4D8)`
  if (pathname.startsWith('/formation-entreprise') || pathname.startsWith('/formation-particuliers') ||
      pathname.startsWith('/en/corporate-training') || pathname.startsWith('/en/individual-training'))
    return `linear-gradient(to right, ${start}, #FF8C00)`
  return `linear-gradient(to right, ${start}, #A78BFA)`
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const progressGradient = getPillarGradient(pathname)
  const progressBarRef = React.useRef<HTMLDivElement>(null)

  const lang: Locale = detectLocaleFromPath(pathname)
  const navData = React.useMemo(() => buildNavData(lang), [lang])
  const dict = navData.dict
  const lp = (fr: string) => localizedPath(fr, lang)

  const isAdminPage = pathname.startsWith('/admin')

  React.useEffect(() => {
    const bar = progressBarRef.current
    const handler = () => {
      setScrolled(window.scrollY > 20)
      if (bar) {
        const total = document.documentElement.scrollHeight - window.innerHeight
        const pct = total > 0 ? window.scrollY / total : 0
        bar.style.transform = `scaleX(${pct})`
        bar.style.opacity = pct > 0.03 ? '1' : '0'
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  React.useEffect(() => {
    if (!mobileOpen) return
    const scrollY = window.scrollY
    const { position, top, left, right, width, overflow } = document.body.style
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.position = position
      document.body.style.top = top
      document.body.style.left = left
      document.body.style.right = right
      document.body.style.width = width
      document.body.style.overflow = overflow
      window.scrollTo(0, scrollY)
    }
  }, [mobileOpen])

  if (isAdminPage) return null

  const ariaHome = lang === 'en' ? 'DKDP - Home' : 'DKDP - Accueil'
  const ariaToggleMenu = mobileOpen
    ? (lang === 'en' ? 'Close menu' : 'Fermer le menu')
    : (lang === 'en' ? 'Open menu' : 'Ouvrir le menu')

  const renderMega = (
    pillar: PillarKey,
    main: MegaItem[],
    secondary: MegaSecondary[],
    fallbackHub: string,
    hubLabel: string,
    pillarLabel: string,
    tags: TagLink[],
  ) => (
    <MegaPanel
      pillar={pillar}
      label={pillarLabel}
      labelHref={fallbackHub}
      tags={tags}
      main={main}
      secondary={secondary}
      hubHref={fallbackHub}
      hubLabel={hubLabel}
      lang={lang}
    />
  )

  return (
    <>
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{ background: progressGradient, transform: 'scaleX(0)', opacity: 0, transition: 'opacity 0.3s' }}
      />

      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-6"
      >
        <div
          className={cn(
            'pointer-events-auto max-w-[1200px] mx-auto mt-2 rounded-2xl border transition-all duration-300',
            scrolled || mobileOpen
              ? 'backdrop-blur-2xl border-border shadow-[0_1px_6px_color-mix(in_srgb,var(--text)_8%,transparent),0_0_0_1px_var(--surface-border)]'
              : 'bg-transparent border-transparent'
          )}
          style={
            scrolled || mobileOpen
              ? { background: 'color-mix(in srgb, var(--bg) 90%, transparent)' }
              : undefined
          }
        >
        <div className="px-4 sm:px-5 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href={lp('/')} className="flex items-center flex-shrink-0" aria-label={ariaHome}>
            <DkdpLogo width={108} height={36} priority />
          </Link>

          {/* Desktop nav (xl+) */}
          <div className="hidden xl:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/agence-digitale'))} style={TRIGGER_STYLE.agence}><Monitor size={13} style={{ color: '#A78BFA' }} className="mr-1" />{dict.nav.groups.agence}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('agence', navData.AGENCE_MAIN, navData.AGENCE_SECONDARY,
                      lp('/agence-digitale'), dict.common.viewAllServices,
                      lang === 'en' ? 'Agency' : 'Agence',
                      [
                        { text: lang === 'en' ? 'Websites' : 'Sites', href: lp('/agence-digitale/creation-site-web') },
                        { text: 'SEO', href: lp('/agence-digitale/seo') },
                        { text: 'Ads', href: lp('/agence-digitale/publicite-sea') },
                        { text: lang === 'en' ? 'Video' : 'Vidéo', href: lp('/agence-digitale/creation-video') },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/formation-entreprise'))} style={TRIGGER_STYLE.formation}><GraduationCap size={13} style={{ color: '#FF8C00' }} className="mr-1" />{dict.nav.groups.formation}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('formation', navData.FORMATION_MAIN, navData.FORMATION_SECONDARY,
                      lp('/formation-entreprise'), dict.common.viewAllTrainings,
                      lang === 'en' ? 'Training' : 'Formation',
                      [
                        { text: 'IA', href: lp('/formation-entreprise/ia') },
                        { text: lang === 'en' ? 'Office' : 'Bureautique', href: lp('/formation-entreprise/bureautique') },
                        { text: lang === 'en' ? 'Video' : 'Vidéo', href: lp('/formation-entreprise/montage-video') },
                        { text: 'Cyber', href: lp('/formation-entreprise/cybersecurite') },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/intelligence-artificielle'))} style={TRIGGER_STYLE.ia}><Sparkles size={13} style={{ color: 'var(--text-secondary)' }} className="mr-1" />{dict.nav.groups.ia}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('ia', navData.IA_MAIN, navData.IA_SECONDARY,
                      lp('/intelligence-artificielle'), dict.common.viewAllAi,
                      lang === 'en' ? 'AI' : 'IA',
                      [
                        { text: lang === 'en' ? 'Agents' : 'Agents', href: lp('/intelligence-artificielle/agents-ia') },
                        { text: lang === 'en' ? 'Automation' : 'Automatisation', href: lp('/intelligence-artificielle/automatisation') },
                        { text: lang === 'en' ? 'Consulting' : 'Conseil', href: lp('/intelligence-artificielle/audit-conseil') },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/a-propos'))} style={TRIGGER_STYLE.apropos}><LayoutGrid size={13} style={{ color: 'var(--text-secondary)' }} className="mr-1" />{dict.nav.groups.apropos}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('apropos', navData.APROPOS_MAIN, navData.APROPOS_SECONDARY,
                      lp('/a-propos'), lang === 'en' ? 'About DKDP' : 'À propos de DKDP',
                      lang === 'en' ? 'Agency' : 'Agence',
                      [
                        { text: lang === 'en' ? 'Work' : 'Réalisations', href: lp('/a-propos') },
                        { text: dict.common.ourPricing, href: lp('/tarifs') },
                        { text: 'Blog', href: '/blog' },
                        { text: lang === 'en' ? 'Glossary' : 'Ressources', href: '/glossaire' },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href={lp('/contact')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-text-secondary hover:text-text transition-colors duration-150"
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
          <div className="hidden xl:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="md" shaderDelay={1000}><CalendarCheck size={14} />{dict.common.bookCall}</LiquidMetalButton>
          </div>

          {/* Tablet / small laptop (md–xl) */}
          <div className="hidden md:flex xl:hidden items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/agence-digitale'))} style={TRIGGER_STYLE.agence}><Monitor size={13} style={{ color: '#A78BFA' }} className="mr-1" />{dict.nav.groups.agence}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('agence', navData.AGENCE_MAIN, navData.AGENCE_SECONDARY,
                      lp('/agence-digitale'), dict.common.viewAllServices,
                      lang === 'en' ? 'Agency' : 'Agence',
                      [
                        { text: lang === 'en' ? 'Websites' : 'Sites', href: lp('/agence-digitale/creation-site-web') },
                        { text: 'SEO', href: lp('/agence-digitale/seo') },
                        { text: 'Ads', href: lp('/agence-digitale/publicite-sea') },
                        { text: lang === 'en' ? 'Video' : 'Vidéo', href: lp('/agence-digitale/creation-video') },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/formation-entreprise'))} style={TRIGGER_STYLE.formation}><GraduationCap size={13} style={{ color: '#FF8C00' }} className="mr-1" />{dict.nav.groups.formation}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('formation', navData.FORMATION_MAIN, navData.FORMATION_SECONDARY,
                      lp('/formation-entreprise'), dict.common.viewAllTrainings,
                      lang === 'en' ? 'Training' : 'Formation',
                      [
                        { text: 'IA', href: lp('/formation-entreprise/ia') },
                        { text: lang === 'en' ? 'Office' : 'Bureautique', href: lp('/formation-entreprise/bureautique') },
                        { text: lang === 'en' ? 'Video' : 'Vidéo', href: lp('/formation-entreprise/montage-video') },
                        { text: 'Cyber', href: lp('/formation-entreprise/cybersecurite') },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/intelligence-artificielle'))} style={TRIGGER_STYLE.ia}><Sparkles size={13} style={{ color: 'var(--text-secondary)' }} className="mr-1" />{lang === 'en' ? 'AI' : 'IA'}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('ia', navData.IA_MAIN, navData.IA_SECONDARY,
                      lp('/intelligence-artificielle'), dict.common.viewAllAi,
                      lang === 'en' ? 'AI' : 'IA',
                      [
                        { text: lang === 'en' ? 'Agents' : 'Agents', href: lp('/intelligence-artificielle/agents-ia') },
                        { text: lang === 'en' ? 'Automation' : 'Automatisation', href: lp('/intelligence-artificielle/automatisation') },
                        { text: lang === 'en' ? 'Consulting' : 'Conseil', href: lp('/intelligence-artificielle/audit-conseil') },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => router.push(lp('/a-propos'))} style={TRIGGER_STYLE.apropos}><LayoutGrid size={13} style={{ color: 'var(--text-secondary)' }} className="mr-1" />{lang === 'en' ? 'Agency' : 'Agence'}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMega('apropos', navData.APROPOS_MAIN, navData.APROPOS_SECONDARY,
                      lp('/a-propos'), lang === 'en' ? 'About DKDP' : 'À propos de DKDP',
                      lang === 'en' ? 'Agency' : 'Agence',
                      [
                        { text: lang === 'en' ? 'Work' : 'Réalisations', href: lp('/a-propos') },
                        { text: dict.common.ourPricing, href: lp('/tarifs') },
                        { text: 'Blog', href: '/blog' },
                        { text: lang === 'en' ? 'Glossary' : 'Ressources', href: '/glossaire' },
                      ]
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href={lp('/contact')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-text-secondary hover:text-text transition-colors duration-150"
                    >
                      <Phone size={13} />
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile + tablet right-side controls */}
          <div className="xl:hidden flex items-center gap-2">
            <LanguageSwitcher compact />
            <ThemeToggle compact />
            <button
              type="button"
              aria-label={ariaToggleMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                try { navigator.vibrate?.(10) } catch {}
                setMobileOpen((v) => !v)
              }}
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-border text-text hover:bg-[var(--surface-default)] active:scale-95 transition-all"
            >
              {mobileOpen
                ? <X size={18} />
                : <Menu size={18} />
              }
            </button>
          </div>
        </div>

        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} lang={lang} />
    </>
  )
}
