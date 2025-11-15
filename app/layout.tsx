import type { Metadata } from 'next'
import { Varela_Round, Montserrat } from 'next/font/google'
import './globals.css'
import TrackingScripts from '@/components/tracking/TrackingScripts'

const varelaRound = Varela_Round({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-varela',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Darmowe Webinary Black Friday - Paulina od Matematyki',
  description: 'Zapisz się na darmowe webinary 20 listopada 2025',
  icons: {
    icon: '/webinar/favicon.ico',
    apple: '/webinar/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${varelaRound.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://paulinaodmatematyki.com" />
        <link rel="preconnect" href="https://assets.mailerlite.com" />
      </head>
      <body>
        <TrackingScripts />
        {children}
      </body>
    </html>
  )
}
