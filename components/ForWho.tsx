'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Check } from 'lucide-react'

export default function ForWho() {
  const shouldReduceMotion = useReducedMotion()

  const points = [
    'Piszesz maturę podstawową albo rozszerzoną za 6 miesięcy',
    'Czujesz stres "dam radę czy nie?"',
    'Chcesz przekroczyć 60%, 70%, 80% albo więcej',
    'Nie wiesz, jak organizować naukę, aby nie tracić czasu',
    'Patrzysz na zadania i myślisz "od czego zacząć?"'
  ]

  const also = [
    'Jesteś rodzicem maturzysty i chcesz wiedzieć jak wspierać bez presji'
  ]

  const fadeInUp = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
      }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-paulina-bg-yellow to-white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-paulina-primary mb-12"
        >
          Dla kogo
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Ten webinar jest dla ciebie jeśli:
          </h3>
          <ul className="space-y-4">
            {points.map((point, index) => {
              const itemAnimation = shouldReduceMotion
                ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
                : {
                    initial: { opacity: 0, x: -20 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.5, delay: index * 0.1 }
                  }

              return (
                <motion.li
                  key={index}
                  {...itemAnimation}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-paulina-accent flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-lg text-gray-700">{point}</span>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="bg-paulina-bg-purple rounded-3xl shadow-lg p-6 sm:p-10"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            I również jeśli:
          </h3>
          <ul className="space-y-4">
            {also.map((point, index) => (
              <motion.li
                key={index}
                {...fadeInUp}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-paulina-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-lg text-gray-700">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
