'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FileText, Video, Target, AlertTriangle } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

interface WhatYouGetProps {
  type: 'egzamin' | 'matura' | 'rozszerzenie'
}

export default function WhatYouGet({ type }: WhatYouGetProps) {
  const shouldReduceMotion = useReducedMotion()

  const benefitsE8: Benefit[] = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Arkusz próbny na maila',
      description: 'Otrzymasz pełny arkusz zgodny z wymaganiami CKE — jak na prawdziwym egzaminie'
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Rozwiązywanie na żywo z Pauliną',
      description: 'Razem przejdziemy przez każde zadanie, krok po kroku'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Omówienie każdego zadania',
      description: 'Zobaczysz jak zdobywać punkty i unikać typowych błędów'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Wskazówki jak unikać pułapek',
      description: 'Pokażę najczęstsze błędy i jak ich unikać na prawdziwym egzaminie'
    }
  ]

  const benefitsMatura: Benefit[] = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Arkusz próbny na maila',
      description: 'Pełny arkusz matury podstawowej zgodny z wymaganiami CKE'
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Rozwiązywanie na żywo',
      description: 'Wspólnie przejdziemy przez cały arkusz, zadanie po zadaniu'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Strategie punktacji',
      description: 'Dowiesz się jak zdobywać maksimum punktów za każde zadanie'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Analiza typowych pułapek',
      description: 'Poznasz najczęstsze błędy maturzystów i jak ich unikać'
    }
  ]

  const benefitsRozszerzenie: Benefit[] = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Arkusz rozszerzenia na maila',
      description: 'Pełny arkusz matury rozszerzonej zgodny z wymaganiami CKE'
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Rozwiązywanie zadań z omówieniem',
      description: 'Przejdziemy przez najtrudniejsze zadania rozszerzenia'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Strategie czasowe',
      description: 'Jak rozplanować czas na egzaminie, żeby zdążyć z wszystkim'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Typowe pułapki w zadaniach',
      description: 'Gdzie najczęściej tracisz punkty i jak tego unikać'
    }
  ]

  let benefits: Benefit[]
  if (type === 'egzamin') {
    benefits = benefitsE8
  } else if (type === 'matura') {
    benefits = benefitsMatura
  } else {
    benefits = benefitsRozszerzenie
  }

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
          Co otrzymasz
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-xl text-center text-gray-600 mb-12"
        >
          Na próbnym egzaminie online:
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
          className="text-lg sm:text-xl text-center text-gray-700 mt-12 font-semibold max-w-2xl mx-auto"
        >
          Sprawdź swoją wiedzę przed prawdziwym egzaminem!
        </motion.p>
      </div>
    </section>
  )
}
