import { orange } from '@/lib/tokens'
import { Users, Clock, CalendarDays } from 'lucide-react'

const OR = orange.color
const ORB = orange.bg
const ORD = orange.border

const HOURLY_RATES = [
  { label: '1 personne', rate: 150, icon: '1' },
  { label: '2 personnes', rate: 200, icon: '2' },
  { label: '3-6 personnes', rate: 250, icon: '3-6' },
  { label: '6-10 personnes', rate: 300, icon: '6-10' },
]

const FORMATS = [
  { label: 'Demi-journée', hours: 4, work: '3h de formation', prep: '1h de préparation' },
  { label: 'Journée entière', hours: 8, work: '6h de formation', prep: '2h de préparation' },
]

export function FormationPricing() {
  return (
    <div>
      {/* Hourly rates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {HOURLY_RATES.map((r) => (
          <div
            key={r.label}
            className="rounded-[14px] border p-5 text-center"
            style={{ background: ORB, borderColor: ORD }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid ${ORD}` }}
            >
              <Users size={15} style={{ color: OR }} />
            </div>
            <p className="text-text-muted text-xs font-medium mb-1">{r.label}</p>
            <p className="text-xl font-bold" style={{ color: OR }}>CHF {r.rate}</p>
            <p className="text-text-muted text-[10px] mt-0.5">par heure</p>
          </div>
        ))}
      </div>

      {/* Format cards with calculated prices */}
      <div className="grid sm:grid-cols-2 gap-4">
        {FORMATS.map((f) => (
          <div
            key={f.label}
            className="rounded-[14px] border p-6"
            style={{ background: ORB, borderColor: ORD }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid ${ORD}` }}
              >
                {f.hours === 4
                  ? <Clock size={15} style={{ color: OR }} />
                  : <CalendarDays size={15} style={{ color: OR }} />
                }
              </div>
              <div>
                <p className="text-white font-bold text-base">{f.label}</p>
                <p className="text-text-muted text-xs">{f.work} + {f.prep}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {HOURLY_RATES.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between py-1.5 border-b last:border-b-0"
                  style={{ borderColor: ORD }}
                >
                  <span className="text-text-secondary text-sm">{r.label}</span>
                  <span className="font-bold text-sm" style={{ color: OR }}>
                    CHF {(r.rate * f.hours).toLocaleString('fr-CH')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-text-muted text-xs mt-4 text-center leading-relaxed">
        Le programme est personnalisé pour chaque entreprise. Devis gratuit sous 48h.
      </p>
    </div>
  )
}
