import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-paulina-bg-purple via-white to-paulina-bg-yellow flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-paulina-primary mb-6">
          Darmowe Webinary Black Friday
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 mb-12">
          13 listopada 2025 — Paulina od Matematyki
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Egzamin 8-klasisty */}
          <Link href="/e8">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-paulina-primary to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-paulina-primary mb-4">
                Egzamin 8-klasisty
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                13 listopada, 18:00
              </p>
              <p className="text-gray-600 mb-6">
                System 15 minut dziennie dla rodziców ósmoklasistów
              </p>
              <div className="flex items-center justify-center gap-2 text-paulina-accent font-bold">
                Zapisz się <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Matura */}
          <Link href="/matura">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-paulina-primary to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-paulina-primary mb-4">
                Matura z Matematyki
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                13 listopada, 19:30
              </p>
              <p className="text-gray-600 mb-6">
                System 20 minut dziennie. Podstawowa i rozszerzona
              </p>
              <div className="flex items-center justify-center gap-2 text-paulina-accent font-bold">
                Zapisz się <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>

        <p className="mt-12 text-gray-600">
          Webinary prowadzi <strong>Paulina</strong> — 16 lat doświadczenia, 24 000+ kursantów
        </p>
      </div>
    </main>
  )
}
