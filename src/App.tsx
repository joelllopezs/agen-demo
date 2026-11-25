import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import { Benefits, HowItWorks, Testimonials, FinalCTA, Footer } from './components/Sections'
import BookingWizard from './components/Booking/BookingWizard'

export default function App() {
  const [view, setView] = useState<'home' | 'booking'>('home')
  const open = () => { setView('booking'); window.scrollTo({ top: 0 }) }
  const home = () => { setView('home'); window.scrollTo({ top: 0 }) }

  return (
    <>
      <Header onBook={open} onHome={home} inBooking={view === 'booking'} />
      <main>
        {view === 'home' ? (
          <>
            <Hero onBook={open} />
            <Benefits />
            <HowItWorks />
            <Testimonials />
            <FinalCTA onBook={open} />
          </>
        ) : (
          <BookingWizard onExit={home} />
        )}
      </main>
      <Footer onBook={open} onHome={home} />
    </>
  )
}
