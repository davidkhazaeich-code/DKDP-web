import { Smartphone, Globe, Zap } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { violet, orange, teal } from '@/lib/tokens'

const APPS = [
  {
    Icon: Smartphone,
    title: 'Application mobile native',
    desc: 'Une app iOS ou Android construite avec les APIs système complètes : notifications push, caméra, GPS, biométrie. Performance maximale, expérience soignée.',
    tags: ['Swift (iOS)', 'Kotlin (Android)', 'React Native'],
    color: violet.color,
    bg: violet.bg,
    border: violet.border,
  },
  {
    Icon: Globe,
    title: 'Web App & SaaS',
    desc: "Application métier accessible depuis n'importe quel navigateur. Dashboard, portail client, outil interne. Aucune installation, déploiement simplifié.",
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    color: orange.color,
    bg: orange.bg,
    border: orange.border,
  },
  {
    Icon: Zap,
    title: 'PWA',
    desc: "L'expérience d'une app mobile, le déploiement d'un site web. Fonctionne hors-ligne, s'installe sur l'écran d'accueil, envoie des notifications. Idéal pour des budgets maîtrisés.",
    tags: ['Offline', 'Notifications push', 'Installable'],
    color: teal.color,
    bg: teal.bg,
    border: teal.border,
  },
]

export function AppTypesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {APPS.map((app, i) => (
        <SectionReveal key={app.title} delay={i * 0.1}>
          <div
            className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full hover:-translate-y-0.5 transition-transform duration-300"
          >
            {/* Icon */}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
              style={{ background: app.bg, border: `1px solid ${app.border}` }}
            >
              <app.Icon size={22} style={{ color: app.color }} strokeWidth={1.75} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-3">{app.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{app.desc}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-[6px]"
                  style={{ background: app.bg, color: app.color, border: `1px solid ${app.border}` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  )
}
