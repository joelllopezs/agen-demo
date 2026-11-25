import { Check, Clock, Droplets, Scissors, Sparkles, UserRound } from 'lucide-react'
import { SERVICES, brl } from '../../data'

const icons = { scissors: Scissors, beard: UserRound, combo: Sparkles, drop: Droplets }

export default function ServiceSelection({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <div className="options" role="radiogroup" aria-label="Serviços">
      {SERVICES.map((s, i) => {
        const I = icons[s.icon]
        const on = value === s.id
        return (
          <button key={s.id} role="radio" aria-checked={on} className={`card option ${on ? 'selected' : ''}`} onClick={() => onChange(s.id)} style={{ animationDelay: `${i * 50}ms` }}>
            <span className="icon-chip"><I size={20} /></span>
            <span className="option-body">
              <strong>{s.name}</strong>
              <span>{s.description}</span>
              <small><Clock size={13} /> {s.duration} min</small>
            </span>
            <span className="price">{brl(s.price)}</span>
            <span className="check"><Check size={14} /></span>
          </button>
        )
      })}
    </div>
  )
}
