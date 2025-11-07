'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, CheckCircle } from 'lucide-react'
import { tracking } from '@/lib/tracking'

interface WebinarFormProps {
  type: 'egzamin' | 'matura'
  date: string
  time: string
}

export default function WebinarFormOptimized({ type, date, time }: WebinarFormProps) {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fadeInUp = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
      }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Walidacja
    if (!email || !email.includes('@')) {
      setError('Podaj prawidłowy adres e-mail')
      return
    }

    if (!consent) {
      setError('Musisz zaakceptować politykę prywatności')
      return
    }

    setIsSubmitting(true)

    try {
      // Tutaj będzie integracja z MailerLite
      // Na razie symulacja opóźnienia
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Tracking Lead Event - WAŻNE: trackuje na wszystkich platformach
      // (Facebook Pixel, Google Ads, TikTok Pixel)
      tracking.lead(email, `Webinar ${type === 'egzamin' ? 'Egzamin 8-klasisty' : 'Matura'}`)

      // Przekierowanie na thank you page
      router.push('/dziekujemy')
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.')
      setIsSubmitting(false)
    }
  }

  return (
    <section id="webinar-form" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-paulina-bg-yellow via-white to-paulina-bg-purple">
      <div className="max-w-2xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10"
        >
          {/* Nagłówek */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-2">
              Darmowy webinar
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 font-medium mb-4">
              {date} o {time}
            </p>

            {/* Social Proof */}
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Już 1 247 osób się zapisało</span>
            </div>
          </div>

          {/* Formularz */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pole Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Wpisz swój e-mail, aby otrzymać dostęp:
              </label>
              <input
                type="email"
                id="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.pl"
                className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-paulina-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Zgoda RODO */}
            <div>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-5 h-5 mt-1 text-paulina-primary focus:ring-paulina-primary rounded flex-shrink-0"
                />
                <span className="ml-3 text-sm text-gray-600 leading-relaxed">
                  Zgadzam się na przetwarzanie danych osobowych zgodnie z{' '}
                  <a
                    href="https://paulinaodmatematyki.com/polityka-prywatnosci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paulina-accent hover:text-paulina-primary underline"
                  >
                    polityką prywatności
                  </a>
                </span>
              </label>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Przycisk CTA */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="w-full bg-gradient-to-r from-paulina-primary to-pink-600 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Zapisuję...' : 'Rezerwuję miejsce za darmo'}
            </motion.button>

            {/* Tekst pod przyciskiem */}
            <div className="space-y-2">
              <p className="text-center text-sm text-gray-600">
                <strong>Natychmiastowy dostęp.</strong> Link na e-mail w ciągu 2 minut.
              </p>
              <p className="text-center text-sm text-gray-600">
                Nagranie dostępne przez 24h po webinarze. Jeśli nie możesz być o {time} — obejrzysz później.
              </p>

              {/* Zapewnienie o prywatności */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-2">
                <Lock className="w-4 h-4" />
                <span>Szanujemy Twoją prywatność. Bez spamu, gwarantujemy.</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
