import { violet } from '@/lib/tokens'
import { PRIX, chfMois } from '@/data/pricing'

const V = violet.color
const VD = violet.border

// 25/09/2026 : maquette importée nulle part à cette date. Taux d'engagement
// (8.7 %, 12.4 %), likes, commentaires, partages, courbe « Followers 6 mois »
// et légende « on a triplé le trafic de ce client en 3 mois » retirés, aucune
// source. La maquette montre un calendrier éditorial et les faits de l'offre.
export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Social Feed mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            {[
              { name: 'IG', color: '#E4405F', active: true },
              { name: 'LI', color: '#0A66C2', active: false },
              { name: 'TK', color: '#fff', active: false },
              { name: 'YT', color: '#FF0000', active: false },
            ].map((p) => (
              <div
                key={p.name}
                className="px-2.5 py-1 rounded-full text-[9px] font-bold"
                style={{
                  background: p.active ? `${p.color}20` : 'rgba(255,255,255,0.03)',
                  color: p.active ? p.color : '#71717a',
                  border: `1px solid ${p.active ? `${p.color}40` : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {p.name}
              </div>
            ))}
          </div>
          <span className="text-[9px] text-zinc-500 ml-auto">Calendrier éditorial</span>
        </div>

        <div className="p-4 space-y-3">
          {/* Post preview cards : statut de publication, sans métriques */}
          {[
            {
              type: 'Carousel',
              caption: '5 erreurs SEO fréquentes chez les PME',
              platform: 'Instagram',
              status: 'Publié',
              time: 'Hier',
            },
            {
              type: 'Reel',
              caption: 'Coulisses : une journée de tournage à Genève',
              platform: 'Instagram',
              status: 'Validé',
              time: 'Jeudi',
            },
          ].map((post) => (
            <div
              key={post.caption}
              className="rounded-lg p-3 flex gap-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(255,107,0,0.15))' }}>
                <span className="text-[9px] font-bold text-zinc-400">{post.type}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-zinc-300 leading-tight line-clamp-2">{post.caption}</p>
                <p className="text-[9px] text-zinc-500 mt-1.5">{post.platform}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[10px] font-bold text-green-400">{post.status}</span>
                <p className="text-[8px] text-zinc-600">{post.time}</p>
              </div>
            </div>
          ))}

          {/* Upcoming scheduled */}
          <div className="pt-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-2">À venir cette semaine</p>
            <div className="flex gap-2">
              {[
                { day: 'Mar', type: 'Story', color: '#E4405F' },
                { day: 'Mer', type: 'Article', color: '#0A66C2' },
                { day: 'Ven', type: 'Reel', color: '#E4405F' },
              ].map((s) => (
                <div key={s.day} className="flex-1 rounded-md p-2 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                  <p className="text-[8px] text-zinc-500">{s.day}</p>
                  <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge : calendrier tenu (plus de courbe de followers) */}
      <div className="absolute -right-2 top-6 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-2.5"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 mb-1">Calendrier du mois</p>
          <p className="text-[8px] font-bold text-green-400">Validé par vous</p>
        </div>
      </div>

      {/* Mini stats : faits de l'offre (prix de base, plateformes, posts du forfait Starter) */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: chfMois(PRIX.socialFrom), l: 'Forfait de base', c: '#4ade80' },
          { v: '5', l: 'Plateformes gérées', c: V },
          { v: '12/mois', l: 'Publications', c: '#FF8C00' },
        ].map((s) => (
          <div
            key={s.l}
            className="text-center py-3 rounded-[10px]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
