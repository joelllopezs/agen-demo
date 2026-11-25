import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fromISO, isDateAvailable, toISO, today } from '../../data'

const WEEK = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MAX_MONTHS_AHEAD = 3

export default function DateSelection({ value, professionalId, onChange }: { value: string | null; professionalId: string | null; onChange: (iso: string) => void }) {
  const now = today()
  const start = value ? fromISO(value) : now
  const [view, setView] = useState(new Date(start.getFullYear(), start.getMonth(), 1))
  const diff = (view.getFullYear() - now.getFullYear()) * 12 + view.getMonth() - now.getMonth()

  const first = view.getDay()
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))]
  const title = view.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const move = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1))

  return (
    <div className="calendar card">
      <div className="cal-head">
        <button className="icon-btn" onClick={() => move(-1)} disabled={diff <= 0} aria-label="Mês anterior"><ChevronLeft size={20} /></button>
        <strong className="cal-title">{title}</strong>
        <button className="icon-btn" onClick={() => move(1)} disabled={diff >= MAX_MONTHS_AHEAD} aria-label="Próximo mês"><ChevronRight size={20} /></button>
      </div>
      <div className="cal-grid" role="grid">
        {WEEK.map((w, i) => <span key={i} className="cal-dow" aria-hidden>{w}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />
          const iso = toISO(d)
          const ok = isDateAvailable(d, professionalId)
          const sel = value === iso
          const isToday = iso === toISO(now)
          return (
            <button key={iso} disabled={!ok} aria-pressed={sel} aria-label={d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) + (ok ? '' : ', indisponível')}
              className={`cal-day ${ok ? 'avail' : 'off'} ${sel ? 'selected' : ''} ${isToday ? 'today' : ''}`} onClick={() => onChange(iso)}>
              {d.getDate()}
            </button>
          )
        })}
      </div>
      <div className="legend">
        <span><i className="lg avail" /> Disponível</span>
        <span><i className="lg off" /> Indisponível</span>
        <span><i className="lg sel" /> Selecionado</span>
      </div>
    </div>
  )
}
