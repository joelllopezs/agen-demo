import { TIMES, isTimeAvailable, longDate } from '../../data'

export default function TimeSelection({ date, professionalId, value, onChange }: { date: string; professionalId: string | null; value: string | null; onChange: (t: string) => void }) {
  return (
    <div>
      <p className="sub">{longDate(date)}</p>
      <div className="times">
        {TIMES.map(t => {
          const ok = isTimeAvailable(date, t, professionalId)
          return <button key={t} disabled={!ok} aria-pressed={value === t} className={`slot ${value === t ? 'selected' : ''}`} onClick={() => onChange(t)}>{t}</button>
        })}
      </div>
      <p className="hint-line">Horários riscados já estão ocupados (simulação).</p>
    </div>
  )
}
