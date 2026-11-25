import { useState } from 'react'
import { ArrowRight, CalendarDays, Check, ShieldCheck } from 'lucide-react'
import { TIMES, today, isTimeAvailable, toISO } from '../data'

export default function Hero({ onBook }: { onBook: () => void }) {
  const [picked, setPicked] = useState('10:00')
  const iso = toISO(today())
  const slots = TIMES.slice(0, 9)
  const d = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="pill"><ShieldCheck size={14} /> Demonstração de produto</span>
          <h1>Sua rotina organizada. Seus horários sob controle.</h1>
          <p className="lead">Seus clientes escolhem serviço, profissional e horário em menos de um minuto, sem ligação e sem troca de mensagens. Você só atende.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onBook}>Agendar agora <ArrowRight size={18} /></button>
            <span className="hint">Leva cerca de 1 minuto</span>
          </div>
          <ul className="trust">
            <li><Check size={16} /> Barbearias e salões</li>
            <li><Check size={16} /> Clínicas e consultórios</li>
            <li><Check size={16} /> Autônomos</li>
          </ul>
        </div>

        <div className="hero-visual" aria-label="Exemplo de horários disponíveis">
          <div className="float-note"><span className="dot" /> Marcado agora: Corte + Barba, 14:30</div>
          <div className="slot-card">
            <div className="slot-head">
              <span className="icon-chip"><CalendarDays size={18} /></span>
              <div><strong>Horários de hoje</strong><small>{d}</small></div>
            </div>
            <div className="slot-grid">
              {slots.map(t => {
                const ok = isTimeAvailable(iso, t, null)
                return (
                  <button key={t} disabled={!ok} className={`slot ${picked === t ? 'selected' : ''}`} onClick={() => setPicked(t)} aria-pressed={picked === t}>{t}</button>
                )
              })}
            </div>
            <button className="btn btn-dark btn-block" onClick={onBook}>Reservar às {picked}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
