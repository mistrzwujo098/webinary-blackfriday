import HeroRozszerzenie from '@/components/HeroRozszerzenie'
import WhatYouGet from '@/components/WhatYouGet'
import WebinarFormOptimized from '@/components/WebinarFormOptimized'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Próbna Matura Rozszerzona Online - 5 stycznia 18:00 | Paulina od Matematyki',
  description: 'Darmowa próbna matura rozszerzona online. Otrzymasz arkusz na maila i rozwiążemy go razem na żywo! 5 stycznia 2026, godz. 18:00.',
}

export default function RozszerzeniePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroRozszerzenie />
      <WhatYouGet type="rozszerzenie" />
      <WebinarFormOptimized
        type="rozszerzenie"
        date="5 stycznia"
        time="18:00"
      />
      <Footer />
    </main>
  )
}
