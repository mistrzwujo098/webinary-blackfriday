'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Users, TrendingUp, Award, Star } from 'lucide-react'

export default function RealNumbers() {
  const shouldReduceMotion = useReducedMotion()

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '24 000',
      label: 'kursantów łącznie przez 8 lat'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '80%+',
      label: 'średnia na maturze (przy średniej krajowej 50%)'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '99,9%',
      label: 'zdawalność wśród tych co ukończyli program'
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: '4,9/5',
      label: 'średnia ocena kursu'
    }
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
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-paulina-bg-purple to-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-paulina-primary mb-4"
        >
          Liczby
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-xl text-center text-gray-600 mb-12"
        >
          Realne dane z ostatnich lat:
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const itemAnimation = shouldReduceMotion
              ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
              : {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: index * 0.1 }
                }

            return (
              <motion.div
                key={index}
                {...itemAnimation}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-paulina-primary to-paulina-accent rounded-full text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          {...fadeInUp}
          className="text-center space-y-4"
        >
          <p className="text-xl sm:text-2xl font-bold text-gray-800">
            To nie przypadek. To system który działa.
          </p>
          <p className="text-lg sm:text-xl text-gray-600">
            Na webinarze pokażę go dokładnie.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
