import { ArrowRight, Bell, CalendarCheck, Clock, Scissors, Smartphone, Star, Users, Zap } from 'lucide-react'
import { goTo } from './Header'

export function Benefits() {
  const items = [
    { icon: Clock, t: 'Agenda aberta 24 horas', d: 'Seus clientes marcam a qualquer hora, inclusive quando o balcão está fechado.' },
    { icon: Bell, t: 'Menos faltas', d: 'Confirmação e lembrete antes do horário reduzem os furos na agenda.' },
    { icon: Users, t: 'Equipe organizada', d: 'Cada profissional tem sua própria disponibilidade, sem conflitos de horário.' },
    { icon: Smartphone, t: 'Feito para o celular', d: 'O cliente agenda com o polegar, em poucos toques.' },
    { icon: Zap, t: 'Rápido de configurar', d: 'Cadastre serviços e preços e compartilhe o link de agendamento.' },
    { icon: Scissors, t: 'Serve para vários negócios', d: 'Barbearias, estética, salões, consultórios e autônomos.' }
  ]
  return (
    <section id="beneficios" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Menos tempo no telefone, mais tempo atendendo</h2>
          <p>Tudo que um negócio de serviços precisa para receber agendamentos sem atrito.</p>
        </div>
        <div className="grid-3">
          {items.map(({ icon: I, t, d }, i) => (
            <article className="card benefit" key={t} style={{ animationDelay: `${i * 60}ms` }}>
              <span className="icon-chip"><I size={20} /></span>
              <h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks() {
  const steps = [
    ['Escolha o serviço e o profissional', 'Preços e durações claros desde o primeiro toque.'],
    ['Selecione data e horário', 'O calendário mostra só o que está disponível.'],
    ['Confirme seus dados', 'Nome e telefone bastam. O resumo aparece antes de finalizar.']
  ]
  return (
    <section id="como-funciona" className="section section-tint">
      <div className="container">
        <div className="section-head">
          <h2>Como funciona</h2>
          <p>Três etapas, do primeiro toque à confirmação.</p>
        </div>
        <ol className="steps">
          {steps.map(([t, d], i) => (
            <li key={t} className="step-item">
              <span className="step-num">{i + 1}</span>
              <h3>{t}</h3><p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Testimonials() {
  const list = [
    { n: 'Diego A.', r: 'Dono de barbearia', t: 'Parei de responder mensagem o dia inteiro. A agenda se enche sozinha.' },
    { n: 'Patrícia L.', r: 'Esteticista', t: 'Meus clientes elogiam a facilidade. Em dois toques já está marcado.' },
    { n: 'Dr. Marcos V.', r: 'Consultório', t: 'A recepção ganhou tempo e as faltas diminuíram bastante.' }
  ]
  return (
    <section id="depoimentos" className="section">
      <div className="container">
        <div className="section-head">
          <h2>O que dizem os negócios</h2>
          <p className="demo-note">Depoimentos fictícios, criados apenas para esta demonstração.</p>
        </div>
        <div className="grid-3">
          {list.map(x => (
            <figure className="card quote" key={x.n}>
              <div className="stars" aria-label="5 de 5 estrelas">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={16} fill="currentColor" />)}</div>
              <blockquote>“{x.t}”</blockquote>
              <figcaption><span className="avatar sm">{x.n[0]}</span><span><strong>{x.n}</strong><small>{x.r} · exemplo</small></span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCTA({ onBook }: { onBook: () => void }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cta">
          <h2>Experimente como seu cliente agendaria</h2>
          <p>Percorra o fluxo completo. É uma demonstração: nada é salvo ou enviado.</p>
          <button className="btn btn-light btn-lg" onClick={onBook}>Agendar agora <ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  )
}

export function Footer({ onBook, onHome }: { onBook: () => void; onHome: () => void }) {
  const go = (id: string) => goTo(id, onHome, document.querySelector('.wizard') !== null)
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo static"><span className="logo-mark"><CalendarCheck size={18} /></span><span>AGENDA <b>FLOW</b></span></div>
          <p>Sua rotina organizada. Seus horários sob controle.</p>
        </div>
        <div>
          <h4>Plataforma</h4>
          <button onClick={() => go('beneficios')}>Benefícios</button>
          <button onClick={() => go('como-funciona')}>Como funciona</button>
          <button onClick={() => go('depoimentos')}>Depoimentos</button>
        </div>
        <div>
          <h4>Experimente</h4>
          <button onClick={onBook}>Agendar agora</button>
          <button onClick={onHome}>Página inicial</button>
        </div>
        <div>
          <h4>Sobre esta demo</h4>
          <p className="small">Projeto fictício de portfólio, feito com React, TypeScript e Vite. Sem backend e sem dados reais.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Agenda Flow · Demonstração, nenhum serviço real é oferecido.</span>
        <span className="dev-by">Desenvolvido por <img src="/lopex-logo.png" alt="LOPEX" /></span>
      </div>
    </footer>
  )
}
