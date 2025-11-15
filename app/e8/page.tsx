import HeroEgzamin from '@/components/HeroEgzamin'
import TwoOptions from '@/components/TwoOptions'
import WhatYouGet from '@/components/WhatYouGet'
import WhyFree from '@/components/WhyFree'
import AboutMe from '@/components/AboutMe'
import WebinarFormOptimized from '@/components/WebinarFormOptimized'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Webinar: Egzamin 8-klasisty - 20 listopada 18:00 | Paulina od Matematyki',
  description: 'Darmowy webinar dla rodziców 8-klasisty. System 15 minut dziennie od listopada do maja. Zapisz się za darmo!',
}

export default function Egzamin8Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeroEgzamin />
      <TwoOptions />
      <WhatYouGet type="egzamin" />
      <WhyFree />
      <AboutMe />
      <WebinarFormOptimized
        type="egzamin"
        date="20 listopada"
        time="18:00"
      />
      <Footer />
    </main>
  )
}
