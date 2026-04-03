import { CheckCircle2, XCircle } from 'lucide-react'
import { green } from '@/lib/tokens'

export function ComplianceGap() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Risques actuels</p>
        <div className="space-y-2.5">
          {[
            'Cookies sans consentement valide',
            'Politique de confidentialité absente ou incomplète',
            'Formulaires non conformes',
            'Sous-traitants sans contrats DPA',
            'Registre des traitements manquant',
            "Amende jusqu'à CHF 50'000",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <XCircle size={12} className="flex-shrink-0 mt-0.5 text-red-400" />
              <span className="text-red-300 text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: green.bg, border: `1px solid ${green.border}` }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: green.color }}>Situation corrigée</p>
        <div className="space-y-2.5">
          {[
            'Banner cookies conforme (Axeptio / Cookiebot)',
            'Politique vie privée complète et à jour',
            'Formulaires avec mentions légales',
            'Contrats DPA signés avec sous-traitants',
            'Registre des traitements complet',
            'Certificat de conformité DKDP remis',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle2 size={12} className="flex-shrink-0 mt-0.5" style={{ color: green.color }} />
              <span className="text-[11px] leading-snug" style={{ color: '#86efac' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
