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
    consent: false
  })

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
    // Tutaj będzie integracja z MailerLite
    console.log('Form submitted:', formData)
    alert('Zapisano! (To tylko demo - integracja MailerLite będzie dodana)')
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon <span className="text-gray-500">(opcjonalnie - przyślemy SMS przypominający godzinę przed)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-paulina-primary focus:border-transparent outline-none transition-all text-base"
                placeholder="+48 123 456 789"
              />
            </div>

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

            <div>
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-5 h-5 mt-1 text-paulina-primary focus:ring-paulina-primary rounded"
                />
                <span className="ml-3 text-sm text-gray-600">
                  Zgadzam się na przetwarzanie danych osobowych zgodnie z polityką prywatności
                </span>
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="w-full bg-gradient-to-r from-paulina-primary to-pink-600 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Rezerwuję miejsce za darmo
            </motion.button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Nagranie dostępne przez 24h po webinarze. Jeśli nie możesz być o {time} — obejrzysz później.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
