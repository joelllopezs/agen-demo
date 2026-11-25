import { Mail, Phone, User } from 'lucide-react'

export interface Errors { name?: string; phone?: string; email?: string }
interface Props { name: string; phone: string; email: string; errors: Errors; onChange: (k: 'name' | 'phone' | 'email', v: string) => void }

export const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export const validateCustomer = (name: string, phone: string, email: string): Errors => {
  const e: Errors = {}
  if (name.trim().split(/\s+/).filter(Boolean).length < 2) e.name = 'Informe nome e sobrenome.'
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) e.phone = 'Informe o telefone com DDD, por exemplo (11) 91234-5678.'
  if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = 'Esse e-mail parece incompleto. Confira ou deixe em branco.'
  return e
}

export default function CustomerForm({ name, phone, email, errors, onChange }: Props) {
  return (
    <div className="form">
      <label className={`field ${errors.name ? 'invalid' : ''}`}>
        <span>Nome completo</span>
        <div className="input"><User size={18} /><input value={name} autoComplete="name" placeholder="Ex.: Maria Souza" onChange={e => onChange('name', e.target.value)} aria-invalid={!!errors.name} /></div>
        {errors.name && <em role="alert">{errors.name}</em>}
      </label>
      <label className={`field ${errors.phone ? 'invalid' : ''}`}>
        <span>Telefone</span>
        <div className="input"><Phone size={18} /><input value={phone} inputMode="tel" autoComplete="tel" placeholder="(11) 91234-5678" onChange={e => onChange('phone', maskPhone(e.target.value))} aria-invalid={!!errors.phone} /></div>
        {errors.phone && <em role="alert">{errors.phone}</em>}
      </label>
      <label className={`field ${errors.email ? 'invalid' : ''}`}>
        <span>E-mail <small>(opcional)</small></span>
        <div className="input"><Mail size={18} /><input value={email} type="email" autoComplete="email" placeholder="voce@exemplo.com" onChange={e => onChange('email', e.target.value)} aria-invalid={!!errors.email} /></div>
        {errors.email && <em role="alert">{errors.email}</em>}
      </label>
      <p className="hint-line">Use dados fictícios. Nada é enviado ou armazenado.</p>
    </div>
  )
}
