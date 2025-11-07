'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { X, Check } from 'lucide-react'

export default function TwoOptions() {
  const shouldReduceMotion = useReducedMotion()

  const fadeInUp = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
      }

  const staggerDelay = (index: number) => shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: index * 0.2 }
      }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-paulina-primary mb-12"
        >
          Masz dwie opcje przed sobą.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Opcja A */}
          <motion.div
            {...staggerDelay(0)}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 relative"
          >
            <div className="absolute -top-4 -left-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-red-700 mb-4">Opcja A:</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Czekasz. "Może jakoś będzie." Marzec przychodzi — dziecko w panice, ty w panice.
              Gonienie programu w ostatniej chwili.
            </p>
          </motion.div>

          {/* Opcja B */}
          <motion.div
            {...staggerDelay(1)}
            className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8 relative"
          >
            <div className="absolute -top-4 -left-4 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">Opcja B:</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Listopad. Plan na 6 miesięcy. 15 minut dziennie. Maj przychodzi — dziecko idzie na egzamin spokojne.
            </p>
          </motion.div>
        </div>

        <motion.p
          {...fadeInUp}
          className="text-xl sm:text-2xl text-center text-gray-800 mt-12 font-medium"
        >
          Na webinarze pokażę dokładnie jak przejść ze scenariusza A do B.
        </motion.p>
      </div>
    </section>
  )
}
