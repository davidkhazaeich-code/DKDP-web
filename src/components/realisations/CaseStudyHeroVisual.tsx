import { Archive, Database, Inbox, ListChecks, Lock, Sparkles, Workflow, GraduationCap, type LucideIcon } from 'lucide-react'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'
import { PhoneFrame } from './PhoneFrame'
import { KIND_LABEL } from './FlowDiagram'
import { formatDateLong } from '@/lib/format'
import type { HeroVisual, heroProof } from '@/lib/realisations/hero'
import type { FlowStepKind } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Colonne de droite du hero d'une etude de cas (2026-09-29) : le travail livre,
 * visible sans defiler. Un site montre son premier ecran sur ordinateur et sur
 * telephone ; un livrable pose deux vraies pages l'une sur l'autre ; un projet
 * sans ecran montre son flux ou son programme, etape par etape.
 *
 * Mouvement : kit dg-* en mode `hero` (joue au premier affichage des 1024 px,
 * en CSS). Seuls les elements secondaires entrent (telephone, seconde page,
 * etapes, pastille de preuve) : le grand visuel, candidat LCP, est peint tout
 * de suite et ne s'anime jamais en opacite.
 */
type Proof = NonNullable<ReturnType<typeof heroProof>>

export function CaseStudyHeroVisual({
  visual,
  clientName,
  proof,
  lang = 'fr',
}: {
  visual: HeroVisual
  clientName: string
  /** Premier resultat de l'etude, pose sur une image (site, pages) ; pas sur un schema. */
  proof?: Proof | null
  lang?: Locale
}) {
  switch (visual.kind) {
    case 'devices':
      return <Devices visual={visual} clientName={clientName} proof={proof} lang={lang} />
    case 'stack':
      return <Stack visual={visual} proof={proof} lang={lang} />
    case 'flow':
      return (
        <Sequence
          icon={Workflow}
          title={visual.flow.title}
          subtitle={visual.flow.intro}
          steps={visual.flow.steps.map((s) => ({
            label: s.label,
            detail: s.detail,
            tag: s.kind ? KIND_LABEL[lang][s.kind] : undefined,
            icon: s.kind ? KIND_ICON[s.kind] : undefined,
            strong: s.kind === 'ia' || s.kind === 'sortie',
          }))}
        />
      )
    case 'training':
      return (
        <Sequence
          icon={GraduationCap}
          title={lang === 'en' ? 'The programme' : 'Le programme'}
          subtitle={visual.training.format}
          steps={visual.training.sessions.map((s, i) => ({
            label: s.title,
            tag: lang === 'en' ? `Session ${i + 1}` : `Séance ${i + 1}`,
          }))}
        />
      )
    case 'cover':
      return (
        <figure className="relative mx-auto w-full max-w-[480px] lg:max-w-[560px]">
          <div aria-hidden="true" className="rz-halo" />
          <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card-lg)]">
            <img
              src={visual.src}
              alt={visual.alt}
              width={1600}
              height={1000}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
        </figure>
      )
  }
}

const KIND_ICON: Record<FlowStepKind, LucideIcon> = {
  source: Inbox,
  ia: Sparkles,
  controle: ListChecks,
  outil: Database,
  sortie: Archive,
}

/**
 * Pastille de preuve posee sur le visuel : le chiffre, ce qu'il mesure et la date
 * a laquelle il vaut (« au 20 septembre 2026 », pour un classement comme pour un
 * decompte). Des la tablette seulement : sur telephone, le visuel reste net et
 * les resultats attendent leur section.
 */
function ProofChip({ proof, lang, className }: { proof: Proof; lang: Locale; className: string }) {
  const date = formatDateLong(proof.capturedAt, lang)
  return (
    <div className={`absolute z-10 hidden sm:block ${className}`}>
      <div className="dg-float" style={{ '--dg-loop-start': '1.8s', '--dg-loop-at': '-3s' } as React.CSSProperties}>
        <div className="dg-pop" style={dg(0, 700, { '--dg-origin': 'left bottom' })}>
          <div className="rounded-xl border border-border bg-bg-card px-4 py-3 shadow-[var(--shadow-card-lg)]">
            <p className="text-[26px] font-bold leading-none tracking-[-0.02em] text-text">{proof.value}</p>
            <p className="mt-1.5 max-w-[19ch] text-[12.5px] font-semibold leading-snug text-text">{proof.metric}</p>
            <p className="mt-1 text-[11px] leading-snug text-text-muted">
              {lang === 'en' ? 'As of ' : 'Au '}
              <time dateTime={proof.capturedAt}>{date}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Premier ecran du site dans une fenetre de navigateur, sans defilement : image fixe et legere. */
function BrowserStill({ src, alt, host }: { src: string; alt: string; host: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0E0E10] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.85)]">
      <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[#1B1B1F] px-3">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-[#0E0E10]/60 px-3 py-0.5 font-mono text-[11px] text-white/60">
          <Lock className="h-3 w-3 shrink-0 text-white/45" aria-hidden="true" />
          <span className="truncate">{host}</span>
        </div>
      </div>
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="block h-auto w-full select-none"
      />
    </div>
  )
}

function Devices({
  visual,
  clientName,
  proof,
  lang,
}: {
  visual: Extract<HeroVisual, { kind: 'devices' }>
  clientName: string
  proof?: Proof | null
  lang: Locale
}) {
  const en = lang === 'en'
  return (
    <DiagramMotion as="figure" mode="hero" className="relative mx-auto w-full max-w-[480px] lg:max-w-[560px]">
      <div aria-hidden="true" className="rz-halo" />
      <div className={visual.phone ? 'relative aspect-[25/24]' : 'relative'}>
        <div className={visual.phone ? 'absolute left-0 top-[2%] w-[88%]' : ''}>
          <BrowserStill
            src={visual.desktop}
            host={visual.browserUrl}
            alt={en ? `${clientName}: first screen of the website on a computer` : `${clientName} : premier écran du site sur ordinateur`}
          />
        </div>
        {visual.phone && (
          <div className="absolute bottom-0 right-0 w-[31%]">
            <div className="dg-float" style={{ '--dg-loop-start': '1.4s' } as React.CSSProperties}>
              <div className="dg-rise" style={dg(0, 280, { '--dg-y': '28px', '--dg-dur': '850ms' })}>
                <PhoneFrame
                  src={visual.phone}
                  alt={en ? `${clientName} on a phone: first screen` : `${clientName} sur téléphone : premier écran`}
                  eager
                />
              </div>
            </div>
          </div>
        )}
        {proof && <ProofChip proof={proof} lang={lang} className="-left-[3%] top-[56%]" />}
      </div>
    </DiagramMotion>
  )
}

function Stack({ visual, proof, lang }: { visual: Extract<HeroVisual, { kind: 'stack' }>; proof?: Proof | null; lang: Locale }) {
  // La premiere page du livrable passe devant, entiere : c'est elle qu'on lit. La seconde
  // depasse derriere, peinte tout de suite (grand visuel stable) ; la premiere entre en montant.
  const [front, back] = visual.images
  const enter = (children: React.ReactNode) => (
    <div className="dg-float" style={{ '--dg-loop-start': '1.4s' } as React.CSSProperties}>
      <div className="dg-rise" style={dg(0, 200, { '--dg-y': '24px', '--dg-dur': '850ms' })}>
        {children}
      </div>
    </div>
  )
  if (visual.format === 'pages') {
    // Rapport A4 : deux feuilles en eventail, la premiere a gauche par-dessus.
    const sheet = 'overflow-hidden rounded-[6px] bg-white shadow-[var(--shadow-card-xl)] ring-1 ring-black/10'
    return (
      <DiagramMotion as="figure" mode="hero" className="relative mx-auto w-full max-w-[440px] lg:max-w-[520px]">
        <div aria-hidden="true" className="rz-halo" />
        <div className="relative aspect-[10/9]">
          <div className="absolute right-[2%] top-[3%] w-[55%] rotate-[4deg]">
            <div className={sheet}>
              <img src={back.src} alt={back.alt} width={909} height={1287} loading="eager" fetchPriority="high" decoding="async" className="block h-auto w-full" />
            </div>
          </div>
          <div className="absolute left-[4%] top-[8%] w-[55%] -rotate-[3deg]">
            {enter(
              <div className={sheet}>
                <img src={front.src} alt={front.alt} width={909} height={1287} loading="eager" decoding="async" className="block h-auto w-full" />
              </div>,
            )}
          </div>
          {proof && <ProofChip proof={proof} lang={lang} className="-right-[2%] bottom-[2%]" />}
        </div>
      </DiagramMotion>
    )
  }
  // Slides en paysage : la seconde en haut a droite, la premiere en bas a gauche par-dessus.
  const slide = 'overflow-hidden rounded-xl bg-bg-card shadow-[var(--shadow-card-xl)] ring-1 ring-[var(--border-strong)]'
  return (
    <DiagramMotion as="figure" mode="hero" className="relative mx-auto w-full max-w-[480px] lg:max-w-[560px]">
      <div aria-hidden="true" className="rz-halo" />
      <div className="relative aspect-[50/41]">
        <div className="absolute right-0 top-0 w-[86%]">
          <div className={slide}>
            <img src={back.src} alt={back.alt} width={1600} height={900} loading="eager" fetchPriority="high" decoding="async" className="block h-auto w-full" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-[86%]">
          {enter(
            <div className={slide}>
              <img src={front.src} alt={front.alt} width={1600} height={900} loading="eager" decoding="async" className="block h-auto w-full" />
            </div>,
          )}
        </div>
        {proof && <ProofChip proof={proof} lang={lang} className="-right-[2%] bottom-[3%]" />}
      </div>
    </DiagramMotion>
  )
}

type SequenceStep = { label: string; detail?: string; tag?: string; icon?: LucideIcon; strong?: boolean }

/** Flux ou programme en colonne : un rail relie les etapes, une impulsion le parcourt. */
function Sequence({
  icon: HeadIcon,
  title,
  subtitle,
  steps,
}: {
  icon: LucideIcon
  title: string
  subtitle?: string
  steps: SequenceStep[]
}) {
  const n = steps.length
  return (
    <DiagramMotion as="figure" mode="hero" className="dg-tone-violet relative mx-auto w-full max-w-[520px]">
      <div aria-hidden="true" className="rz-halo" />
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-card-lg)]">
        <div className="flex items-start gap-3 border-b border-border px-5 py-4">
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border"
            style={{ background: 'var(--violet-bg)', borderColor: 'var(--violet-border)', color: 'var(--violet-text)' }}
          >
            <HeadIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-text">{title}</p>
            {subtitle && <p className="mt-0.5 text-[13px] leading-[1.45] text-text-muted">{subtitle}</p>}
          </div>
        </div>
        <ol className="px-5 py-5">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={s.label} className="relative flex gap-4 pb-5 last:pb-0">
                {i < n - 1 && (
                  <span aria-hidden="true" className="absolute bottom-0 left-[17px] top-9 w-px bg-[var(--border-strong)]">
                    <span
                      className="dg-travel-y dg-trail"
                      style={{ '--dg-loop': '3.6s', '--dg-loop-at': `${i * 0.7}s`, '--dg-trail': '22px', '--dg-dot': '5px' } as React.CSSProperties}
                    />
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-xl border font-mono text-[12px] font-semibold"
                  style={
                    s.strong
                      ? { background: 'var(--violet-bg)', borderColor: 'var(--violet-border)', color: 'var(--violet-text)' }
                      : { background: 'var(--bg)', borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }
                  }
                >
                  {Icon ? <Icon className="h-4 w-4" /> : String(i + 1).padStart(2, '0')}
                </span>
                <div className="dg-rise min-w-0 pt-0.5" style={dg(i, 200, { '--dg-step': '120ms' })}>
                  {s.tag && (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">{s.tag}</p>
                  )}
                  <p className="text-[15px] font-semibold leading-snug text-text">{s.label}</p>
                  {s.detail && <p className="mt-0.5 text-[13px] leading-[1.45] text-text-secondary">{s.detail}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </DiagramMotion>
  )
}
