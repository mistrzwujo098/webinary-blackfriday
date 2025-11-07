'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function WhyFree() {
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
          Czemu darmowy webinar?
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-xl sm:text-2xl text-gray-700 mb-6 font-medium"
        >
          Szczerze?
        </motion.p>

        <motion.div
          {...fadeInUp}
          className="space-y-6 text-lg sm:text-xl text-gray-600 leading-relaxed"
        >
          <p>
            Chcę, żebyś poznała sposób, w jaki uczę. Zanim wydasz złotówkę.
          </p>

          <p className="font-semibold text-gray-800">
            80% webinaru to czysta wartość — system, plan, techniki.<br />
            20% to opcja kupienia kursu dla tych, którzy chcą iść dalej.
          </p>

          <p>
            Nawet jeśli nic nie kupujesz — zyskujesz plan na 6 miesięcy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
