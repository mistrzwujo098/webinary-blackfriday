'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FileText, MessageCircle, Clock, HelpCircle } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

interface WhatYouGetProps {
  type: 'egzamin' | 'matura'
}

export default function WhatYouGet({ type }: WhatYouGetProps) {
  const shouldReduceMotion = useReducedMotion()

  const benefitsEgzamin: Benefit[] = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'PDF "Plan 6 miesięcy"',
      description: 'Konkretny harmonogram listopada do maja, moduł po module'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: '3 techniki motywacji dziecka',
      description: 'Nie "chwal więcej", ale konkretne zdania i reakcje na konkretne sytuacje'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'System 15 minut dziennie',
      description: 'O której godzinie, jak zacząć, co robić, gdy dziecko się opiera'
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'Pytania i odpowiedzi na żywo',
      description: 'Masz konkretny problem? Pytaj, odpowiem wszystkim'
    }
  ]

  const benefitsMatura: Benefit[] = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'PDF "Mapa 15 modułów"',
      description: 'Wszystkie tematy z matury, w kolejności od najważniejszych (dla podstawy i rozszerzenia)'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Checklista "Co umieć na 80%"',
      description: 'Konkretne umiejętności, które dają najwięcej punktów'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'System 20 minut dziennie',
      description: 'Jak organizować naukę, aby nie marnować czasu'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: '3 techniki zarządzania stresem',
      description: 'Nie "wierz w siebie", konkretne ćwiczenia, które działają'
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'Pytania i odpowiedzi na żywo',
      description: 'Pytania o twoje konkretne problemy, odpowiedzi dla wszystkich'
    }
  ]

  const benefits = type === 'egzamin' ? benefitsEgzamin : benefitsMatura
  const duration = type === 'egzamin' ? '45 minut' : '60 minut'

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
          Co dostaniesz
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-xl text-center text-gray-600 mb-12"
        >
          Na webinarze ({duration}):
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const itemAnimation = shouldReduceMotion
              ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: index * 0.1 }
                }

            return (
              <motion.div
                key={index}
                {...itemAnimation}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-paulina-primary to-paulina-accent rounded-full flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-paulina-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          {...fadeInUp}
          className="text-lg sm:text-xl text-center text-gray-700 mt-12 font-medium max-w-2xl mx-auto"
        >
          To nie będzie gadanie o niczym. Konkretne narzędzia, które możesz wdrożyć już od piątku.
        </motion.p>
      </div>
    </section>
  )
}
