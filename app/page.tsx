import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-paulina-bg-purple via-white to-paulina-bg-yellow flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-paulina-primary mb-6">
          Ogólnopolskie Próbne Egzaminy Online
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 mb-4">
          5-6 stycznia 2026 — Paulina od Matematyki
        </p>
        <p className="text-lg text-paulina-accent font-semibold mb-12">
          Otrzymasz arkusz na maila. Rozwiązujemy razem na żywo!
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Egzamin 8-klasisty */}
          <Link href="/e8">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-paulina-primary to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-5">
                <Calendar className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-paulina-primary mb-3">
                Egzamin Ósmoklasisty
              </h2>
              <p className="text-lg text-gray-700 mb-3 font-semibold">
                6 stycznia, 17:15
              </p>
              <p className="text-gray-600 mb-5 text-sm">
                Próbny egzamin dla ósmoklasistów
              </p>
              <div className="flex items-center justify-center gap-2 text-paulina-accent font-bold">
                Zapisz się <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Matura Rozszerzona - pierwszy dzień */}
          <Link href="/rozszerzenie">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-paulina-primary to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-5">
                <Calendar className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-paulina-primary mb-3">
                Matura Rozszerzona
              </h2>
              <p className="text-lg text-gray-700 mb-3 font-semibold">
                5 stycznia, 18:00
              </p>
              <p className="text-gray-600 mb-5 text-sm">
                Próbna matura rozszerzona z matematyki
              </p>
              <div className="flex items-center justify-center gap-2 text-paulina-accent font-bold">
                Zapisz się <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Matura Podstawowa */}
          <Link href="/matura">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-paulina-primary to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-5">
                <Calendar className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-paulina-primary mb-3">
                Matura Podstawowa
              </h2>
              <p className="text-lg text-gray-700 mb-3 font-semibold">
                6 stycznia, 19:00
              </p>
              <p className="text-gray-600 mb-5 text-sm">
                Próbna matura podstawowa z matematyki
              </p>
              <div className="flex items-center justify-center gap-2 text-paulina-accent font-bold">
                Zapisz się <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>

        <p className="mt-12 text-gray-600">
          Prowadzi <strong>Paulina od Matematyki</strong> — 16 lat doświadczenia, 24 000+ kursantów
        </p>
      </div>
    </main>
  )
}
