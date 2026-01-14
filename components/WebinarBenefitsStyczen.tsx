'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BarChart3, Calendar, Target, Brain, CheckCircle } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

export default function WebinarBenefitsStyczen() {
  const shouldReduceMotion = useReducedMotion()

  const benefits: Benefit[] = [
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'Wyniki z poprzednich lat',
      description: 'Zobaczysz wyniki uczniów z poprzednich edycji egzaminu. Bez straszenia — same liczby.'
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: 'Matematyka 120 dni',
      description: 'Pokażę Ci ile materiału da się przerobić przy 25-30 minutach dziennie. I dlaczego warto zacząć wcześniej — bufor na choroby i klasówki.'
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: '5 tematów = 80% punktów',
      description: 'Dowiesz się które 5 działów daje najwięcej punktów na egzaminie. I jak je rozłożyć na 5 miesięcy.'
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: 'Plan dla Twojego dziecka',
      description: 'Czy ma 3 czy 5 z matmy — pokażę co realistycznie może osiągnąć. Bez obietnic cudów, z konkretnym harmonogramem.'
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
          Na webinarze dowiesz się
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-lg sm:text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Konkretne informacje, które pomogą Ci zaplanować przygotowania do egzaminu:
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

        {/* Dodatkowa sekcja - dla kogo */}
        <motion.div
          {...fadeInUp}
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-paulina-primary mb-6 text-center">
            Ten webinar jest dla Ciebie, jeśli:
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Twoje dziecko jest w 8 klasie i ma egzamin w maju',
              'Chcesz wiedzieć, ile czasu realnie potrzeba na przygotowania',
              'Zastanawiasz się, czy jeszcze nie jest za późno',
              'Szukasz konkretnego planu, nie ogólników'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Urgency - reason why */}
        <motion.div
          {...fadeInUp}
          className="mt-12 text-center"
        >
          <p className="text-lg sm:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            Webinar jest <strong>bezpłatny</strong>. Po prostu chcę, żebyś mogła/mógł
            podjąć świadomą decyzję — z danymi, nie z domysłami.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
