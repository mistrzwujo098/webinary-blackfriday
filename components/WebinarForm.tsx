'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState } from 'react'

interface WebinarFormProps {
  type: 'egzamin' | 'matura'
  date: string
  time: string
}

export default function WebinarForm({ type, date, time }: WebinarFormProps) {
  const shouldReduceMotion = useReducedMotion()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: type === 'matura' ? 'podstawowa' : '',
    wantSmsReminder: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/webinar/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.wantSmsReminder && formData.phone ? formData.phone : undefined,
          type: type === 'egzamin' ? 'egzamin' : 'matura',
          level: type === 'matura' ? formData.level : undefined
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Facebook Pixel - Lead Event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: `Webinar ${type === 'egzamin' ? 'Egzamin 8' : 'Matura'}`,
            content_category: 'Webinar Registration',
            value: 0,
            currency: 'PLN'
          })
        }

        // Google Ads - Conversion Event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-405660852/xyz', // Dodaj conversion label jeśli masz
            'value': 0,
            'currency': 'PLN'
          })
        }

        // TikTok Pixel - CompleteRegistration Event
        if (typeof window !== 'undefined' && (window as any).ttq) {
          (window as any).ttq.track('CompleteRegistration', {
            content_name: `Webinar ${type === 'egzamin' ? 'Egzamin 8' : 'Matura'}`,
            value: 0,
            currency: 'PLN'
          })
        }

        // Redirect do strony podziękowania
        window.location.href = '/webinar/dziekujemy'
      } else {
        setError(data.error || 'Coś poszło nie tak. Spróbuj ponownie.')
      }
    } catch (error) {
      console.error('Subscribe error:', error)
      setError('Błąd połączenia. Sprawdź internet i spróbuj ponownie.')
    } finally {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-2 text-center">
            Darmowy webinar
          </h2>
          <p className="text-xl sm:text-2xl text-center text-gray-700 mb-8 font-medium">
            {date} o {time}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Imię
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-paulina-primary focus:border-transparent outline-none transition-all text-base"
                placeholder="Twoje imię"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-paulina-primary focus:border-transparent outline-none transition-all text-base"
                placeholder="twoj@email.pl"
              />
            </div>

            <div>
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.wantSmsReminder}
                  onChange={(e) => setFormData({ ...formData, wantSmsReminder: e.target.checked, phone: e.target.checked ? formData.phone : '' })}
                  className="w-5 h-5 mt-1 text-paulina-primary focus:ring-paulina-primary rounded"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Chcę przypomnienie SMS godzinę przed webinarem (opcjonalnie)
                </span>
              </label>
            </div>

            {formData.wantSmsReminder && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Numer telefonu
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-paulina-primary focus:border-transparent outline-none transition-all text-base"
                  placeholder="+48 123 456 789"
                />
              </div>
            )}

            {type === 'matura' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Zapisuję się na:
                </label>
                <div className="space-y-3">
                  {['podstawowa', 'rozszerzona', 'niewiem'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={formData.level === level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-5 h-5 text-paulina-primary focus:ring-paulina-primary"
                      />
                      <span className="ml-3 text-gray-700">
                        {level === 'podstawowa' && 'Podstawowa'}
                        {level === 'rozszerzona' && 'Rozszerzona'}
                        {level === 'niewiem' && 'Nie wiem jeszcze'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="w-full bg-gradient-to-r from-paulina-primary to-pink-600 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Zapisywanie...' : 'Rezerwuję miejsce za darmo'}
            </motion.button>

            {/* Tekst informacyjny RODO */}
            <div className="pt-4">
              <p className="text-center text-xs text-gray-500 leading-relaxed">
                Zapisując się do newslettera, wyrażasz zgodę na otrzymywanie informacji o nowościach, promocjach, produktach i usługach paulinaodmatematyki.com.
                Twoje dane będą przetwarzane do celów związanych z wysyłką newslettera. Administratorem danych osobowych będzie Paulina Miś.
                Szczegóły:{' '}
                <a
                  href="https://paulinaodmatematyki.com/polityka-prywatnosci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paulina-accent hover:text-paulina-primary underline"
                >
                  polityka prywatności
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
