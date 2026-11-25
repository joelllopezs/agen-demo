import { Check, Star } from 'lucide-react'
import { PROFESSIONALS } from '../../data'

export default function ProfessionalSelection({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <div className="options pros" role="radiogroup" aria-label="Profissionais">
      {PROFESSIONALS.map((p, i) => {
        const on = value === p.id
        return (
          <button key={p.id} role="radio" aria-checked={on} className={`card option pro ${on ? 'selected' : ''}`} onClick={() => onChange(p.id)} style={{ animationDelay: `${i * 50}ms` }}>
            <span className="avatar" style={{ background: `linear-gradient(135deg, hsl(${p.hue} 70% 55%), hsl(${p.hue - 30} 65% 28%))` }}>{p.initials}</span>
            <span className="option-body">
              <strong>{p.name}</strong>
              <span>{p.specialty}</span>
              <small className="rating"><Star size={13} fill="currentColor" /> {p.rating.toFixed(1)} · {p.reviews} avaliações (exemplo)</small>
            </span>
            <span className="check"><Check size={14} /></span>
          </button>
        )
      })}
    </div>
  )
}
