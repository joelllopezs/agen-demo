import { BookingState, PROFESSIONALS, SERVICES, brl, longDate } from '../../data'

export const pick = (b: BookingState) => ({
  service: SERVICES.find(s => s.id === b.serviceId),
  pro: PROFESSIONALS.find(p => p.id === b.professionalId)
})

export default function BookingSummary({ booking, compact = false }: { booking: BookingState; compact?: boolean }) {
  const { service, pro } = pick(booking)
  const rows: [string, string][] = [
    ['Serviço', service ? `${service.name} (${service.duration} min)` : '—'],
    ['Profissional', pro?.name ?? '—'],
    ['Data', booking.date ? longDate(booking.date) : '—'],
    ['Horário', booking.time ?? '—']
  ]
  if (!compact) rows.push(['Cliente', booking.name || '—'], ['Telefone', booking.phone || '—'])
  return (
    <dl className="summary">
      {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      <div className="total"><dt>Valor total</dt><dd>{service ? brl(service.price) : '—'}</dd></div>
    </dl>
  )
}
