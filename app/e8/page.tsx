import HeroEgzamin from '@/components/HeroEgzamin'
import WhatYouGet from '@/components/WhatYouGet'
import WebinarFormOptimized from '@/components/WebinarFormOptimized'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Próbny Egzamin Ósmoklasisty Online - 6 stycznia 17:15 | Paulina od Matematyki',
  description: 'Darmowy próbny egzamin ósmoklasisty online. Otrzymasz arkusz na maila i rozwiążemy go razem na żywo! 6 stycznia 2026, godz. 17:15.',
}

export default function Egzamin8Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeroEgzamin />
      <WhatYouGet type="egzamin" />
      <WebinarFormOptimized
        type="egzamin"
        date="6 stycznia"
        time="17:15"
      />
      <Footer />
    </main>
  )
}
