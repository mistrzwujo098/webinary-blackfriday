'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export default function PhoneUpdateForm() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/webinar/api/update-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setPhone('')
        setEmail('')
      } else {
        setError(data.error || 'Coś poszło nie tak. Spróbuj ponownie.')
      }
    } catch (error) {
      console.error('Update phone error:', error)
      setError('Błąd połączenia. Sprawdź internet i spróbuj ponownie.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-4">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <p className="text-green-800 font-semibold mb-2">
          Świetnie! Numer telefonu został dodany.
        </p>
        <p className="text-green-700">
          Wyślę Ci przypomnienie SMS godzinę przed webinarem.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Chcesz przypomnienie SMS?
        </h3>
      </div>

      <p className="text-gray-600 mb-6">
        Wyślę Ci SMS godzinę przed webinarem, abyś nie zapomniał/a!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Twój email (użyty przy zapisie)
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base"
            placeholder="twoj@email.pl"
          />
        </div>

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
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base"
            placeholder="+48 123 456 789"
          />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Zapisywanie...' : 'Dodaj numer telefonu'}
        </button>
      </form>
    </div>
  )
}
