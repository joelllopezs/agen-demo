import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { BookingState, EMPTY_BOOKING } from '../../data'
import ServiceSelection from './ServiceSelection'
import ProfessionalSelection from './ProfessionalSelection'
import DateSelection from './DateSelection'
import TimeSelection from './TimeSelection'
import CustomerForm, { Errors, validateCustomer } from './CustomerForm'
import BookingSummary from './BookingSummary'
import BookingSuccess from './BookingSuccess'

const STEPS = [
  { label: 'Serviço', title: 'Qual serviço você quer?', sub: 'Escolha um serviço para este agendamento.' },
  { label: 'Profissional', title: 'Com quem você quer ser atendido?', sub: 'Cada profissional tem sua própria agenda.' },
  { label: 'Data', title: 'Escolha o dia', sub: 'Dias em cinza não têm horários livres.' },
  { label: 'Horário', title: 'Escolha o horário', sub: 'Toque em um horário livre.' },
  { label: 'Seus dados', title: 'Como podemos te chamar?', sub: 'Precisamos só do básico para confirmar.' },
  { label: 'Confirmação', title: 'Confira e confirme', sub: 'Revise as informações antes de finalizar.' }
]
const KEY = 'agenda-flow-demo-draft'

const load = (): { b: BookingState; s: number } => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) { const p = JSON.parse(raw); return { b: { ...EMPTY_BOOKING, ...p.b }, s: Math.min(Number(p.s) || 0, 5) } }
  } catch { /* sem persistência: segue com estado vazio */ }
  return { b: EMPTY_BOOKING, s: 0 }
}

export default function BookingWizard({ onExit }: { onExit: () => void }) {
  const [init] = useState(load)
  const [booking, setBooking] = useState<BookingState>(init.b)
  const [step, setStep] = useState(init.s)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd')

  useEffect(() => {
    try { done ? sessionStorage.removeItem(KEY) : sessionStorage.setItem(KEY, JSON.stringify({ b: booking, s: step })) } catch { /* ignora */ }
  }, [booking, step, done])

  const set = (patch: Partial<BookingState>) => setBooking(b => ({ ...b, ...patch }))
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const go = (n: number, d: 'fwd' | 'back') => { setDir(d); setStep(n); scrollTop() }

  const canNext = [!!booking.serviceId, !!booking.professionalId, !!booking.date, !!booking.time, true, true][step]

  const next = () => {
    if (step === 4) {
      const e = validateCustomer(booking.name, booking.phone, booking.email)
      setErrors(e)
      if (Object.keys(e).length) return
    }
    if (step === 5) { setDone(true); scrollTop(); return }
    go(step + 1, 'fwd')
  }
  const reset = () => { setBooking(EMPTY_BOOKING); setErrors({}); setDone(false); setStep(0); scrollTop() }
  const changeField = (k: 'name' | 'phone' | 'email', v: string) => {
    set({ [k]: v })
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
  }

  if (done) return <section className="wizard"><div className="container narrow"><BookingSuccess booking={booking} onReset={reset} /></div></section>

  const s = STEPS[step]
  const pct = ((step + 1) / STEPS.length) * 100

  return (
    <section className="wizard">
      <div className="container">
        <div className="wizard-top">
          <button className="btn btn-ghost" onClick={onExit}><X size={16} /> Sair da demonstração</button>
          <span className="demo-tag">Demonstração</span>
        </div>

        <div className="progress" aria-label={`Etapa ${step + 1} de ${STEPS.length}`}>
          <div className="progress-bar"><div style={{ width: `${pct}%` }} /></div>
          <ol className="progress-steps">
            {STEPS.map((x, i) => (
              <li key={x.label} className={i < step ? 'done' : i === step ? 'current' : ''} aria-current={i === step ? 'step' : undefined}>
                <span className="dot">{i < step ? <Check size={13} strokeWidth={3} /> : i + 1}</span>
                <span className="lbl">{x.label}</span>
              </li>
            ))}
          </ol>
          <p className="progress-mobile">Etapa {step + 1} de {STEPS.length} · {s.label}</p>
        </div>

        <div className="wizard-grid">
          <div className="panel">
            <div key={step} className={`step-view ${dir}`}>
              <h2>{s.title}</h2>
              <p className="sub">{s.sub}</p>
              {step === 0 && <ServiceSelection value={booking.serviceId} onChange={id => set({ serviceId: id })} />}
              {step === 1 && <ProfessionalSelection value={booking.professionalId} onChange={id => set({ professionalId: id, date: null, time: null })} />}
              {step === 2 && <DateSelection value={booking.date} professionalId={booking.professionalId} onChange={iso => set({ date: iso, time: null })} />}
              {step === 3 && booking.date && <TimeSelection date={booking.date} professionalId={booking.professionalId} value={booking.time} onChange={t => set({ time: t })} />}
              {step === 4 && <CustomerForm name={booking.name} phone={booking.phone} email={booking.email} errors={errors} onChange={changeField} />}
              {step === 5 && <div className="card"><BookingSummary booking={booking} /></div>}
            </div>
            <div className="actions">
              <button className="btn btn-ghost" onClick={() => go(step - 1, 'back')} disabled={step === 0}><ArrowLeft size={18} /> Voltar</button>
              <button className="btn btn-primary" onClick={next} disabled={!canNext}>
                {step === 5 ? <>Confirmar agendamento <Check size={18} /></> : <>Continuar <ArrowRight size={18} /></>}
              </button>
            </div>
          </div>
          <aside className="aside">
            <h3>Seu agendamento</h3>
            <BookingSummary booking={booking} compact />
          </aside>
        </div>
      </div>
    </section>
  )
}
