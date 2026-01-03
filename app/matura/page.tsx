import HeroMatura from '@/components/HeroMatura'
import WhatYouGet from '@/components/WhatYouGet'
import WebinarFormOptimized from '@/components/WebinarFormOptimized'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Próbna Matura Podstawowa Online - 6 stycznia 19:00 | Paulina od Matematyki',
  description: 'Darmowa próbna matura podstawowa online. Otrzymasz arkusz na maila i rozwiążemy go razem na żywo! 6 stycznia 2026, godz. 19:00.',
}

export default function MaturaPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroMatura />
      <WhatYouGet type="matura" />
      <WebinarFormOptimized
        type="matura"
        date="6 stycznia"
        time="19:00"
      />
      <Footer />
    </main>
  )
}
