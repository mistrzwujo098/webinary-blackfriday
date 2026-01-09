import HeroStyczenMatura from '@/components/HeroStyczenMatura'
import WebinarBenefitsStyczenMatura from '@/components/WebinarBenefitsStyczenMatura'
import WebinarFormStyczenMatura from '@/components/WebinarFormStyczenMatura'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Styczeń vs. Marzec: Dlaczego 8 tygodni różnicy to nawet 25 punktów na maturze | Paulina od Matematyki',
  description: 'Darmowy webinar dla maturzystów. Dowiesz się ile punktów "kosztuje" każdy tydzień zwłoki i jak zaplanować przygotowania do matury z matematyki. 19 stycznia 2026, godz. 20:00.',
  openGraph: {
    title: 'Styczeń vs. Marzec: Dlaczego 8 tygodni różnicy to nawet 25 punktów na maturze',
    description: 'Darmowy webinar dla maturzystów. Twarde dane z poprzednich lat - ile naprawdę kosztuje zwłoka.',
    type: 'website',
  },
}

export default function MaturaStyczenPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroStyczenMatura />
      <WebinarBenefitsStyczenMatura />
      <WebinarFormStyczenMatura />
      <Footer />
    </main>
  )
}
