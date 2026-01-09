import HeroStyczen from '@/components/HeroStyczen'
import WebinarBenefitsStyczen from '@/components/WebinarBenefitsStyczen'
import WebinarFormStyczen from '@/components/WebinarFormStyczen'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Styczeń vs. Marzec: Dlaczego 8 tygodni różnicy to 25 punktów | Paulina od Matematyki',
  description: 'Darmowy webinar dla rodziców ósmoklasistów. Dowiesz się ile punktów "kosztuje" każdy tydzień zwłoki i jak zaplanować przygotowania do egzaminu. 19 stycznia 2026, godz. 18:00.',
  openGraph: {
    title: 'Styczeń vs. Marzec: Dlaczego 8 tygodni różnicy to 25 punktów na egzaminie',
    description: 'Darmowy webinar dla rodziców ósmoklasistów. Twarde dane z poprzednich lat - ile naprawdę kosztuje zwłoka.',
    type: 'website',
  },
}

export default function E8StyczenPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroStyczen />
      <WebinarBenefitsStyczen />
      <WebinarFormStyczen />
      <Footer />
    </main>
  )
}
