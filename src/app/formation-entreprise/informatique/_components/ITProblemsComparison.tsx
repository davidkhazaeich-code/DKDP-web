import { CheckCircle2, XCircle } from 'lucide-react'

export function ITProblemsComparison() {
  const before = [
    'Ordinateur lent, performance dégradée',
    'Fichiers perdus ou mal organisés',
    'Imprimante / réseau bloqué',
    'Boîte mail en désordre',
    'Mots de passe oubliés régulièrement',
  ]
  const after = [
    'Ordinateur optimisé et rapide',
    'Sauvegarde automatique OneDrive',
    'Réseau et imprimante maîtrisés',
    'Boîte mail organisée avec règles',
    'Gestionnaire de mots de passe actif',
  ]
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--red-text)' }}>Problèmes courants</p>
        <div className="space-y-2">
          {before.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <XCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--red-text)' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-border)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--green-text)' }}>Après formation DKDP</p>
        <div className="space-y-2">
          {after.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle2 size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--green-text)' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
