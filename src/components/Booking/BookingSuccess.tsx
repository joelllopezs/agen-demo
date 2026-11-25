import { useState } from 'react'
import { Check, Info, RotateCcw } from 'lucide-react'
import { BookingState } from '../../data'
import BookingSummary from './BookingSummary'

const makeCode = () => 'AF-' + Math.random().toString(36).slice(2, 7).toUpperCase() + '-DEMO'

export default function BookingSuccess({ booking, onReset }: { booking: BookingState; onReset: () => void }) {
  const [code] = useState(makeCode)
  return (
    <div className="success">
      <div className="burst"><span className="ring" /><span className="badge"><Check size={34} strokeWidth={3} /></span></div>
      <h2>Agendamento realizado com sucesso!</h2>
      <p className="sub">Veja como o cliente receberia a confirmação.</p>
      <div className="code"><small>Código do agendamento</small><strong>{code}</strong></div>
      <div className="card"><BookingSummary booking={booking} /></div>
      <div className="demo-banner"><Info size={18} /><p><strong>Isto é uma demonstração.</strong> Nenhum agendamento real foi registrado e nenhuma informação foi enviada ou salva.</p></div>
      <button className="btn btn-primary btn-lg" onClick={onReset}><RotateCcw size={18} /> Novo agendamento</button>
    </div>
  )
}
