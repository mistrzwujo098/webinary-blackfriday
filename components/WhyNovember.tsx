'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function WhyNovember() {
  const shouldReduceMotion = useReducedMotion()

  const fadeInUp = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
      }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-paulina-primary mb-8"
        >
          Czemu listopad?
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-xl sm:text-2xl text-center text-gray-600 mb-8 italic"
        >
          "Matura dopiero w maju. Czemu webinar już teraz?"
        </motion.p>

        <motion.div
          {...fadeInUp}
          className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed"
        >
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8">
            <p className="font-semibold text-green-800 mb-2">
              Matura w maju = 6 miesięcy spokojnej nauki
            </p>
            <p className="text-green-700">
              20 minut dziennie. Systematycznie.
            </p>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8">
            <p className="font-semibold text-red-800 mb-2">
              Jeśli zaczniesz w marcu?
            </p>
            <p className="text-red-700">
              2 miesiące. 60 minut dziennie żeby nadrobić. Panika.
            </p>
          </div>

          <p className="text-center">
            Widziałam setki osób które zaczynały w marcu.<br />
            Większość nie wytrzymuje tego tempa. Stres rośnie. Efekty? Gorsze.
          </p>

          <p className="text-center font-bold text-paulina-primary text-2xl">
            Listopad daje ci czas. 6 miesięcy to minimum na spokojne fundamenty.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
