import { MessageSquare, FileText, BrainCircuit, Zap, Shield, BarChart2 } from 'lucide-react'
import { orange } from '@/lib/tokens'

const color = orange.color
const bg = orange.bg
const border = orange.border

const SKILLS = [
  {
    Icon: MessageSquare,
    title: 'Prompting avance',
    desc: 'Techniques de chain-of-thought, few-shot, role-playing et meta-prompting. Vos instructions deviennent precises, vos résultats fiables.',
    span: 'md:col-span-2',
    visual: (
      <div className="mt-4 space-y-2 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-orange-400">{'>'}</span>
          <span className="text-zinc-400">Agis comme un expert RH senior. Analyse ce CV...</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">{'✓'}</span>
          <span className="text-zinc-300">Synthese structuree en 30s au lieu de 15min</span>
        </div>
      </div>
    ),
  },
  {
    Icon: FileText,
    title: 'Documents longs',
    desc: "Analyse de rapports 50-200 pages, contrats, audits. Extraction d'insights en quelques secondes.",
    span: '',
    visual: (
      <div className="mt-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          {[80, 120, 200].map((p) => (
            <div
              key={p}
              className="w-8 h-10 rounded border flex items-center justify-center text-[8px] font-bold"
              style={{ background: 'rgba(255,107,0,0.08)', borderColor: 'rgba(255,107,0,0.2)', color: '#FF8C00' }}
            >
              {p}p
            </div>
          ))}
        </div>
        <span className="text-[10px] text-zinc-500">Analyses en secondes</span>
      </div>
    ),
  },
  {
    Icon: BrainCircuit,
    title: 'ChatGPT vs Claude vs Copilot',
    desc: "Savoir quel outil utiliser pour quelle tache. Forces, limites, cas d'usage optimaux de chaque plateforme.",
    span: '',
    visual: (
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { name: 'ChatGPT', pct: 85 },
          { name: 'Claude', pct: 92 },
          { name: 'Copilot', pct: 78 },
        ].map((t) => (
          <div key={t.name} className="text-center">
            <div className="h-12 rounded-md overflow-hidden flex flex-col justify-end" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div
                className="rounded-t-sm transition-all"
                style={{ height: `${t.pct}%`, background: `linear-gradient(to top, rgba(255,107,0,0.4), rgba(255,107,0,0.15))` }}
              />
            </div>
            <span className="text-[9px] text-zinc-500 mt-1 block">{t.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: Zap,
    title: 'Automatisations quotidiennes',
    desc: 'Emails, comptes-rendus, syntheses, traductions, reponses clients. Les taches repetitives passent de 15 minutes a 30 secondes.',
    span: '',
    visual: (
      <div className="mt-4 flex flex-col gap-1.5">
        {[
          { task: 'Email client complexe', before: '15 min', after: '45s' },
          { task: 'Compte-rendu reunion', before: '25 min', after: '2 min' },
          { task: 'Synthese de rapport', before: '45 min', after: '1 min' },
        ].map((r) => (
          <div key={r.task} className="flex items-center justify-between text-[10px]">
            <span className="text-zinc-400">{r.task}</span>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 line-through">{r.before}</span>
              <span className="font-bold" style={{ color: '#FF8C00' }}>{r.after}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: Shield,
    title: 'Confidentialite et bonnes pratiques',
    desc: 'Ce qu\'on peut envoyer, ce qu\'on ne doit jamais partager. Configuration securisee des espaces d\'équipe.',
    span: '',
    visual: (
      <div className="mt-4 flex gap-2">
        <div className="flex-1 rounded-lg p-2 text-center" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)' }}>
          <span className="text-[10px] text-green-400 font-medium">A envoyer</span>
        </div>
        <div className="flex-1 rounded-lg p-2 text-center" style={{ background: 'rgba(252,165,165,0.06)', border: '1px solid rgba(252,165,165,0.15)' }}>
          <span className="text-[10px] text-red-300 font-medium">A ne pas envoyer</span>
        </div>
      </div>
    ),
  },
  {
    Icon: BarChart2,
    title: 'Templates personnels',
    desc: 'Chaque participant repart avec une bibliotheque de prompts testes et valides, adaptés a son poste et ses taches quotidiennes.',
    span: 'md:col-span-2',
    visual: (
      <div className="mt-4 flex flex-wrap gap-2">
        {['Email formel', 'Synthese PDF', 'Analyse données', 'Brief creatif', 'Compte-rendu', 'Traduction pro'].map((t) => (
          <span
            key={t}
            className="text-[10px] font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,107,0,0.08)', color: '#FF8C00', border: '1px solid rgba(255,107,0,0.2)' }}
          >
            {t}
          </span>
        ))}
      </div>
    ),
  },
]

export function SkillsBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {SKILLS.map((s) => (
        <div
          key={s.title}
          className={`group rounded-[16px] p-6 border transition-all duration-300 hover:translate-y-[-2px] ${s.span}`}
          style={{ background: bg, borderColor: border }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
              style={{ background: 'rgba(255,107,0,0.12)', border: `1px solid rgba(255,107,0,0.25)` }}
            >
              <s.Icon size={18} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-[15px] mb-1">{s.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
            </div>
          </div>
          {s.visual}
        </div>
      ))}
    </div>
  )
}
