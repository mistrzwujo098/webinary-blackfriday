import HeroMatura from '@/components/HeroMatura'
import SimpleQuestion from '@/components/SimpleQuestion'
import WhatYouGet from '@/components/WhatYouGet'
import ForWho from '@/components/ForWho'
import WhyNovember from '@/components/WhyNovember'
import RealNumbers from '@/components/RealNumbers'
import AboutMe from '@/components/AboutMe'
import WebinarFormOptimized from '@/components/WebinarFormOptimized'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Webinar: Matura z Matematyki - 13 listopada 19:30 | Paulina od Matematyki',
  description: 'Darmowy webinar dla maturzystów. System 20 minut dziennie. Poziom podstawowy i rozszerzony. Zapisz się za darmo!',
}

export default function MaturaPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroMatura />
      <SimpleQuestion />
      <WhatYouGet type="matura" />
      <ForWho />
      <WhyNovember />
      <RealNumbers />
      <AboutMe />
      <WebinarFormOptimized
        type="matura"
        date="13 listopada"
        time="19:30"
      />
      <Footer />
    </main>
  )
}
