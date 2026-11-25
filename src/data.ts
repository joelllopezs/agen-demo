export interface Service { id: string; name: string; description: string; duration: number; price: number; icon: 'scissors' | 'beard' | 'combo' | 'drop' }
export interface Professional { id: string; name: string; specialty: string; rating: number; reviews: number; initials: string; hue: number }
export interface BookingState { serviceId: string | null; professionalId: string | null; date: string | null; time: string | null; name: string; phone: string; email: string }

export const SERVICES: Service[] = [
  { id: 'corte', name: 'Corte de cabelo', description: 'Corte personalizado com lavagem e finalização.', duration: 40, price: 45, icon: 'scissors' },
  { id: 'barba', name: 'Barba', description: 'Modelagem com toalha quente e acabamento na navalha.', duration: 30, price: 30, icon: 'beard' },
  { id: 'combo', name: 'Corte + Barba', description: 'O pacote completo com economia no valor final.', duration: 60, price: 65, icon: 'combo' },
  { id: 'hidratacao', name: 'Hidratação', description: 'Tratamento capilar profundo para brilho e maciez.', duration: 45, price: 50, icon: 'drop' }
]

export const PROFESSIONALS: Professional[] = [
  { id: 'rafael', name: 'Rafael Monteiro', specialty: 'Cortes clássicos e degradê', rating: 4.9, reviews: 212, initials: 'RM', hue: 255 },
  { id: 'camila', name: 'Camila Duarte', specialty: 'Tratamentos capilares', rating: 4.8, reviews: 168, initials: 'CD', hue: 285 },
  { id: 'bruno', name: 'Bruno Tavares', specialty: 'Barba e navalha', rating: 5.0, reviews: 134, initials: 'BT', hue: 225 }
]

export const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']

export const EMPTY_BOOKING: BookingState = { serviceId: null, professionalId: null, date: null, time: null, name: '', phone: '', email: '' }

/* ---------- utilitários ---------- */
export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export const pad = (n: number) => String(n).padStart(2, '0')
export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fromISO = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
export const longDate = (s: string) => { const t = fromISO(s).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); return t.charAt(0).toUpperCase() + t.slice(1) }
export const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }

const hash = (s: string) => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 9973; return h }
/** Disponibilidade simulada: domingos fechados e alguns dias lotados. Nenhuma consulta real. */
export const isDateAvailable = (d: Date, proId: string | null) => {
  if (d < today() || d.getDay() === 0) return false
  return hash(toISO(d) + (proId ?? '')) % 7 !== 0
}
export const isTimeAvailable = (iso: string, time: string, proId: string | null) => hash(iso + time + (proId ?? '')) % 5 !== 0
