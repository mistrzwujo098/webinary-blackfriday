'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Users, Clock } from 'lucide-react'
import { tracking } from '@/lib/tracking'

export default function WebinarFormStyczen() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [wantSmsReminder, setWantSmsReminder] = useState(false)
  const [phone, setPhone] = useState('')
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

    if (!email || !email.includes('@')) {
      setError('Podaj prawidłowy adres e-mail')
      return
    }

    if (wantSmsReminder && !phone) {
      setError('Podaj numer telefonu, aby otrzymać przypomnienie SMS')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/webinar/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          phone: wantSmsReminder && phone ? phone : undefined,
          type: 'e8styczen',
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Coś poszło nie tak. Spróbuj ponownie.')
        setIsSubmitting(false)
        return
      }

      // Tracking Lead Event
      tracking.lead(email, 'Webinar Styczeń vs Marzec E8')

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
          {/* Nagłówek formularza */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-paulina-primary mb-2">
              Zapisz się na darmowy webinar
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 font-medium mb-4">
              19 stycznia o 18:00
            </p>

            {/* Wartościowa obietnica */}
            <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
              Dowiesz się ile naprawdę kosztuje każdy tydzień zwłoki
              i co możesz z tym zrobić.
            </p>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                <span>Już 847 rodziców się zapisało</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                <span>ok. 45 minut</span>
              </div>
            </div>
          </div>

          {/* Formularz */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pole Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Twój adres e-mail:
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

            {/* Checkbox SMS Reminder */}
            <div>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={wantSmsReminder}
                  onChange={(e) => {
                    setWantSmsReminder(e.target.checked)
                    if (!e.target.checked) setPhone('')
                  }}
                  className="w-5 h-5 mt-1 text-paulina-primary focus:ring-paulina-primary rounded flex-shrink-0"
                />
                <span className="ml-3 text-sm text-gray-700 leading-relaxed font-medium">
                  Chcę przypomnienie SMS godzinę przed webinarem (opcjonalnie)
                </span>
              </label>
            </div>

            {/* Pole telefonu */}
            {wantSmsReminder && (
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Numer telefonu
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+48 123 456 789"
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-paulina-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            )}

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
              {isSubmitting ? 'Zapisuję...' : 'Zapisz mnie na webinar'}
            </motion.button>

            {/* Co dostaniesz */}
            <div className="pt-4 space-y-2">
              <p className="text-center text-sm text-gray-600 font-medium">
                Po zapisaniu otrzymasz:
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-sm text-gray-500">
                <span className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Link do webinaru
                </span>
                <span className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Przypomnienie mailowe
                </span>
              </div>
            </div>

            {/* RODO */}
            <div className="pt-2">
              <p className="text-center text-xs text-gray-500 leading-relaxed">
                Zapisując się, wyrażasz zgodę na otrzymywanie informacji o webinarze i nowościach paulinaodmatematyki.com.
                Twoje dane będą przetwarzane zgodnie z{' '}
                <a
                  href="https://paulinaodmatematyki.com/polityka-prywatnosci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paulina-accent hover:text-paulina-primary underline"
                >
                  polityką prywatności
                </a>.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
