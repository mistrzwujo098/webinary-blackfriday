import { CheckCircle, Mail, Calendar, Bell } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Dziękujemy za zapis! - Webinar Paulina od Matematyki',
  description: 'Potwierdzenie zapisu na webinar. Sprawdź swoją skrzynkę email.',
  robots: 'noindex, nofollow', // Nie indeksuj thank you page
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-paulina-bg-purple via-white to-paulina-bg-yellow flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section - Potwierdzenie */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-paulina-primary mb-4">
            Gotowe! Jesteś zapisana/y! 🎉
          </h1>

          <p className="text-xl sm:text-2xl text-gray-700 mb-2">
            Za chwilę dostaniesz email z potwierdzeniem
          </p>

          <p className="text-lg text-gray-600">
            (Sprawdź też folder SPAM, na wszelki wypadek)
          </p>
        </div>

        {/* Instrukcje - Co dalej */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-paulina-primary mb-8 text-center">
            Co teraz? 3 proste kroki:
          </h2>

          <div className="space-y-6">
            {/* Krok 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-paulina-primary to-paulina-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-paulina-accent" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Sprawdź swoją skrzynkę e-mail
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Za 2-5 minut otrzymasz wiadomość z <strong>linkiem do webinaru</strong> i szczegółami.
                  Jeśli nie widzisz emaila, sprawdź folder SPAM lub Oferty.
                </p>
              </div>
            </div>

            {/* Krok 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-paulina-primary to-paulina-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-paulina-accent" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Dodaj do kalendarza
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Webinar: <strong>13 listopada 2025</strong>. Link do dodania znajdziesz w emailu.
                  Nie zapomnij — to może zmienić przyszłość Twojego dziecka!
                </p>
              </div>
            </div>

            {/* Krok 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-paulina-primary to-paulina-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-5 h-5 text-paulina-accent" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Przygotuj kartkę i długopis
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To nie będzie teoria — dostaniesz <strong>konkretny plan działania</strong>.
                  Przygotuj się na notowanie praktycznych wskazówek!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media - Dołącz do społeczności */}
        <div className="bg-paulina-bg-yellow rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-paulina-primary mb-4 text-center">
            Podczas gdy czekasz...
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Dołącz do społeczności Pauliny od Matematyki:
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://facebook.com/paulinaodmatematyki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Obserwuj na Facebook
            </a>

            <a
              href="https://instagram.com/paulinaodmatematyki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Obserwuj na Instagram
            </a>
          </div>
        </div>

        {/* Prośba o udostępnienie */}
        <div className="text-center bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Znasz kogoś, komu to pomoże?
          </h3>
          <p className="text-gray-600 mb-6">
            Webinar jest <strong>darmowy</strong>. Udostępnij z rodzicami, którym może się przydać!
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://paulinaodmatematyki.com/webinar/')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors text-sm"
            >
              Udostępnij
            </a>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-paulina-accent hover:text-paulina-primary transition-colors font-medium"
          >
            ← Powrót do strony głównej
          </Link>
        </div>
      </div>
    </main>
  )
}
