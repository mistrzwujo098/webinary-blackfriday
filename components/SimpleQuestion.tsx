'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function SimpleQuestion() {
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
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-paulina-primary mb-8"
        >
          Pytanie na szybko.
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed"
        >
          <p>
            Średnia krajowa z matury podstawowej to <strong className="text-paulina-accent">50%</strong>.<br />
            Połowa osób nie przekracza 50%.
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-paulina-primary">
            Czy ty będziesz w tej połowie? Czy w drugiej?
          </p>

          <p>
            Bo <em>"spokojnie dam radę"</em> to nie plan. To nadzieja.
          </p>

          <p className="font-semibold text-gray-800">
            Na webinarze pokażę system który sprawia że moi kursanci mają średnią powyżej 80%.
          </p>

          <p>
            Nie bo są geniuszami. Bo mają <strong>plan</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
