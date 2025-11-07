'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ArrowDown } from 'lucide-react'

export default function HeroEgzamin() {
  const shouldReduceMotion = useReducedMotion()

  const fadeIn = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
      }

  const scaleIn = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, delay: 0.2 }
      }

  const scrollToForm = () => {
    const formElement = document.getElementById('webinar-form')
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-paulina-bg-purple via-white to-paulina-bg-yellow px-4 sm:px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          {...fadeIn}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-paulina-primary mb-6 leading-tight"
        >
          Egzamin ósmoklasisty za 6 miesięcy.<br />
          <span className="text-paulina-accent">Bez wieczornych kłótni o matematykę.</span>
        </motion.h1>

        <motion.div
          {...scaleIn}
          className="mb-8"
        >
          <p className="text-xl sm:text-2xl text-gray-700 mb-4 font-medium">
            Darmowy webinar: <span className="text-paulina-primary font-bold">13 listopada, 18:00</span>
          </p>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Pokażę konkretny system <strong>15 minut dziennie</strong> — od listopada do maja.
          </p>
        </motion.div>

        <motion.button
          onClick={scrollToForm}
          {...scaleIn}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-paulina-primary to-pink-600 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 mb-6"
        >
          Zapisz się za darmo
        </motion.button>

        <motion.p
          {...fadeIn}
          className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto"
        >
          Webinar prowadzi <strong>Paulina</strong> — 8 lat uczenia matematyki, 20 000+ rodzin przez lata
        </motion.p>

        <motion.div
          {...fadeIn}
          className="mt-12 flex justify-center"
        >
          <ArrowDown className="w-8 h-8 text-paulina-accent animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
