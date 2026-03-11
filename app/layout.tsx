import type { Metadata } from 'next'
import { Varela_Round, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

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
  title: 'Darmowe Webinary - Paulina od Matematyki',
  description: 'Darmowe webinary z matematyki od Pauliny od Matematyki.',
  robots: { index: false, follow: false },
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
        {children}
        <Script
          id="paulina-analytics-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: `
            (function(){
              var s=sessionStorage,k='pa_sid',sid=s.getItem(k);
              if(!sid){sid=Math.random().toString(36).slice(2)+Date.now().toString(36);s.setItem(k,sid);}
              var p=new URLSearchParams(location.search);
              var q='sid='+sid+'&url='+encodeURIComponent(location.href)
                +'&type=view'
                +(p.get('utm_source')?'&src='+encodeURIComponent(p.get('utm_source')):'')
                +(p.get('utm_medium')?'&med='+encodeURIComponent(p.get('utm_medium')):'')
                +(p.get('utm_campaign')?'&cmp='+encodeURIComponent(p.get('utm_campaign')):'')
                +(document.referrer?'&ref='+encodeURIComponent(document.referrer):'');
              new Image().src='https://paulina-analytics-api.kacperczaczyk.workers.dev/api/track/pixel?'+q;
            })();
          ` }}
        />
      </body>
    </html>
  )
}
