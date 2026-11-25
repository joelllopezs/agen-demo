import { useState } from 'react'
import { CalendarCheck, Menu, X } from 'lucide-react'

interface Props { onBook: () => void; onHome: () => void; inBooking: boolean }

export const goTo = (id: string, ensureHome: () => void, inBooking: boolean) => {
  if (inBooking) ensureHome()
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), inBooking ? 60 : 0)
}

export default function Header({ onBook, onHome, inBooking }: Props) {
  const [open, setOpen] = useState(false)
  const links = [['beneficios', 'Benefícios'], ['como-funciona', 'Como funciona'], ['depoimentos', 'Depoimentos']]
  const nav = (id: string) => { setOpen(false); goTo(id, onHome, inBooking) }

  return (
    <header className="header">
      <div className="container header-inner">
        <button className="logo" onClick={() => { setOpen(false); onHome() }} aria-label="Agenda Flow — página inicial">
          <span className="logo-mark"><CalendarCheck size={18} /></span>
          <span>AGENDA <b>FLOW</b></span>
        </button>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Principal">
          {links.map(([id, label]) => <button key={id} className="nav-link" onClick={() => nav(id)}>{label}</button>)}
          <button className="btn btn-primary nav-cta" onClick={() => { setOpen(false); onBook() }}>Agendar agora</button>
        </nav>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
