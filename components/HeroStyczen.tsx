'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ArrowDown, Calendar, Clock } from 'lucide-react'

export default function HeroStyczen() {
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-paulina-bg-purple via-white to-paulina-bg-yellow px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Pre-headline - budowanie ciekawości */}
        <motion.p
          {...fadeIn}
          className="text-base sm:text-lg text-paulina-accent font-semibold mb-4 uppercase tracking-wide"
        >
          Darmowy webinar dla rodziców ósmoklasistów
        </motion.p>

        {/* Główny nagłówek - wybrany nr 7 */}
        <motion.h1
          {...fadeIn}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-paulina-primary mb-6 leading-tight"
        >
          Styczeń vs. marzec:<br />
          <span className="text-paulina-accent">Dlaczego 8 tygodni różnicy</span><br />
          to nawet 25 punktów na egzaminie
        </motion.h1>

        {/* Subheadline - konkretna obietnica */}
        <motion.div
          {...scaleIn}
          className="mb-8"
        >
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-6 leading-relaxed">
            Pokażę Ci <strong>twarde dane</strong> z poprzednich lat. Zobaczysz ile punktów
            "kosztuje" każdy tydzień zwłoki — i co zrobić, żeby Twoje dziecko
            zdało na spokojnie egzamin.
          </p>

          {/* Data i czas - wyraźnie widoczne */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
              <Calendar className="w-5 h-5 text-paulina-primary" />
              <span className="text-paulina-primary font-bold text-lg">19 stycznia 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
              <Clock className="w-5 h-5 text-paulina-primary" />
              <span className="text-paulina-primary font-bold text-lg">godz. 18:00</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToForm}
          {...scaleIn}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-paulina-primary to-pink-600 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 mb-6"
        >
          Zapisz się na webinar
        </motion.button>

        {/* Social proof + autorka */}
        <motion.div
          {...fadeIn}
          className="space-y-3"
        >
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Prowadzi <strong>Paulina od Matematyki</strong> — 16 lat doświadczenia, 24 000+ kursantów
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Dane na podstawie ankiet wśród kursantów z lat 2023-2025
          </p>
        </motion.div>

        {/* Scroll indicator */}
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
