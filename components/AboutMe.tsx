'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'
import { Award, Users, TrendingUp, Heart } from 'lucide-react'

export default function AboutMe() {
  const shouldReduceMotion = useReducedMotion()

  const fadeInUp = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
      }

  const stats = [
    {
      icon: <Award className="w-6 h-6" />,
      value: '8 lat',
      label: 'doświadczenia'
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: '20 000+',
      label: 'rodzin'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: '84%',
      label: 'średnia wynik'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: '4.9/5',
      label: 'ocena'
    }
  ]

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-paulina-bg-purple to-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-paulina-primary mb-12"
        >
          Kto prowadzi webinar?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Avatar */}
          <motion.div
            {...fadeInUp}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-paulina-primary to-paulina-accent rounded-full blur-2xl opacity-20"></div>
              <Image
                src="/webinar/avatar.jpg"
                alt="Paulina od Matematyki"
                width={300}
                height={300}
                className="relative rounded-full shadow-2xl border-4 border-white"
                priority
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            {...fadeInUp}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-paulina-primary mb-2">
                Paulina
              </h3>
              <p className="text-lg text-paulina-accent font-medium">
                Ekspertka od Matematyki
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Od 8 lat pomagam uczniom i ich rodzicom w przygotowaniach do egzaminów.
              Przekonałam się, że <strong>systematyczność bije korepetycje</strong>.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Stworzyłam system który działa — bez wieczornych kłótni, bez stresu,
              bez przepłacania za korepetycje. <strong>15-20 minut dziennie</strong> wystarczy.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
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
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-paulina-primary to-paulina-accent rounded-full text-white mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-paulina-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
