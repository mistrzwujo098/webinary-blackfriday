# Create Landing Page for Cloudflare Pages

Stwórz kompletną stronę landing page w Next.js zoptymalizowaną pod deployment na Cloudflare Pages z integracją MailerLite i multi-platform tracking.

## Argumenty

Wymagane informacje od użytkownika:
- $ARGUMENTS - opis strony (np. "strona do zapisów na webinar o matematyce")

---

## KROK 1: Zbierz informacje od użytkownika

Zapytaj użytkownika o:

1. **Nazwa projektu** (np. `webinar-matematyka`)
2. **Cel strony** (webinar, kurs, ebook, newsletter)
3. **Domena docelowa** (np. `paulinaodmatematyki.com`)
4. **basePath** - jeśli strona ma być pod subdirectory (np. `/webinar` = domena.com/webinar)
5. **Kolory brandu** (primary, accent, background)
6. **Pixel IDs** (opcjonalnie):
   - Facebook Pixel ID
   - Google Ads ID
   - TikTok Pixel ID
7. **MailerLite integration**:
   - Worker URL (Cloudflare Worker dla MailerLite API)
   - Group IDs dla różnych typów zapisów

---

## KROK 2: Utwórz strukturę projektu

```bash
npx create-next-app@latest NAZWA_PROJEKTU --typescript --tailwind --app --src-dir=false --import-alias "@/*"
cd NAZWA_PROJEKTU
npm install framer-motion lucide-react
```

### Struktura katalogów:

```
/app
  /api
    /subscribe
      route.ts       # API endpoint dla zapisów
    /update-phone
      route.ts       # Opcjonalny endpoint dla aktualizacji telefonu
  /dziekujemy
    page.tsx         # Thank you page
  /[product-pages]   # Strony produktowe
    page.tsx
  layout.tsx         # Root layout z fontami i tracking
  page.tsx           # Strona główna
  globals.css        # Tailwind + custom styles

/components
  /tracking
    TrackingScripts.tsx  # FB, Google, TikTok pixels
  Hero.tsx               # Hero section z CTA
  SignupForm.tsx         # Formularz zapisu
  Benefits.tsx           # Sekcja korzyści
  Footer.tsx             # Stopka

/hooks
  useReducedMotion.ts    # Accessibility hook

/lib
  tracking.ts            # Funkcje trackingowe
  tracking-config.ts     # Konfiguracja pixeli

/public
  favicon.ico
  icon.png
```

---

## KROK 3: Konfiguracja - KRYTYCZNE USTAWIENIA

### 3.1 next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // WAŻNE: Ustaw basePath jeśli strona będzie pod subdirectory
  // np. domena.com/webinar wymaga basePath: '/webinar'
  basePath: '/BASEPATH',

  // WAŻNE: Skonfiguruj zewnętrzne obrazy
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'DOMENA_Z_OBRAZAMI.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```

### 3.2 tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#KOLOR_PRIMARY',    // Główny kolor
        'brand-accent': '#KOLOR_ACCENT',      // Kolor akcentowy
        'brand-bg-light': '#KOLOR_JASNY_BG',  // Jasne tło
        'brand-bg-dark': '#KOLOR_CIEMNY_BG',  // Ciemne tło
      },
      fontFamily: {
        'heading': ['var(--font-heading)', 'sans-serif'],
        'body': ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### 3.3 .env.local (NIGDY nie commituj!)

```bash
# MailerLite Configuration
MAILERLITE_WORKER_URL=https://your-worker.workers.dev
MAILERLITE_GROUP_ID_DEFAULT=123456789

# Tracking (publiczne ID - można commitować)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_PROJECT_ID=nazwa-projektu

# Development
NEXT_PUBLIC_ENABLE_DEV_TRACKING=false
```

### 3.4 .env.example (commituj jako wzór)

```bash
# MailerLite Configuration
MAILERLITE_WORKER_URL=
MAILERLITE_GROUP_ID_DEFAULT=

# Tracking
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_PROJECT_ID=
```

---

## KROK 4: KRYTYCZNE BŁĘDY DO UNIKNIĘCIA

### BŁĄD 1: Brak Edge Runtime w API Routes

**Problem:** Cloudflare Pages wymaga Edge Runtime dla API routes.

**Rozwiązanie:** W KAŻDYM pliku route.ts dodaj:

```typescript
// OBOWIĄZKOWE dla Cloudflare Pages!
export const runtime = 'edge'
```

### BŁĄD 2: Podwójny basePath w redirectach

**Problem:** `router.push('/webinar/dziekujemy')` przy basePath `/webinar` = `/webinar/webinar/dziekujemy`

**Rozwiązanie:** NIE dodawaj basePath ręcznie - Next.js robi to automatycznie:

```typescript
// ŹLE - podwójny basePath
router.push('/webinar/dziekujemy')
window.location.href = '/webinar/dziekujemy'

// DOBRZE - Next.js doda basePath automatycznie
router.push('/dziekujemy')
```

### BŁĄD 3: Obrazy lokalne na Cloudflare Pages

**Problem:** Obrazy z `/public` mogą nie działać poprawnie po deployu.

**Rozwiązanie:** Używaj zewnętrznych URL i next/image z remotePatterns:

```typescript
// next.config.mjs
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'twoja-domena.com',
      pathname: '/wp-content/uploads/**',
    },
  ],
},
```

### BŁĄD 4: Favicon i ikony z basePath

**Problem:** Favicon nie ładuje się gdy jest basePath.

**Rozwiązanie:** W metadata dodaj basePath:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  icons: {
    icon: '/BASEPATH/favicon.ico',      // Dodaj basePath!
    apple: '/BASEPATH/icon.png',
  },
}
```

### BŁĄD 5: Fetch do API bez basePath

**Problem:** `fetch('/api/subscribe')` nie działa przy basePath.

**Rozwiązanie:** Dodaj basePath do fetch URL:

```typescript
// DOBRZE
const response = await fetch('/BASEPATH/api/subscribe', {...})

// Lub użyj zmiennej środowiskowej
const API_BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''
const response = await fetch(`${API_BASE}/api/subscribe`, {...})
```

### BŁĄD 6: Brak 'use client' w komponentach z hooks

**Problem:** useState, useEffect, useRouter wymagają 'use client'.

**Rozwiązanie:** Dodaj na początku pliku:

```typescript
'use client'

import { useState, useEffect } from 'react'
```

### BŁĄD 7: Tracking Worker 404

**Problem:** Tracking worker jest opcjonalny, ale kod wyrzuca błędy 404.

**Rozwiązanie:** Ignoruj błędy 404 dla opcjonalnego workera:

```typescript
if (!response.ok && response.status !== 404) {
  console.warn('[Tracking] Server-side warning:', response.status)
}
```

### BŁĄD 8: Brak walidacji w API

**Problem:** Błędy 400 z powodu brakujących pól.

**Rozwiązanie:** Minimalna wymagana walidacja + fallback:

```typescript
const { email, name, type } = body

if (!email || !type) {
  return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 })
}

// Fallback dla name
const subscriberName = name || email.split('@')[0]
```

### BŁĄD 9: Preconnect dla zewnętrznych zasobów

**Problem:** Wolne ładowanie obrazów i skryptów.

**Rozwiązanie:** Dodaj preconnect w layout.tsx:

```tsx
<head>
  <link rel="preconnect" href="https://twoja-domena.com" />
  <link rel="preconnect" href="https://assets.mailerlite.com" />
</head>
```

---

## KROK 5: Szablony komponentów

### 5.1 API Route - /app/api/subscribe/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server'

// OBOWIĄZKOWE dla Cloudflare Pages!
export const runtime = 'edge'

const MAILERLITE_WORKER_URL = process.env.MAILERLITE_WORKER_URL
const GROUP_ID = process.env.MAILERLITE_GROUP_ID_DEFAULT

interface SubscribeRequest {
  email: string
  name?: string
  phone?: string
  type?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json()
    const { email, name, phone, type } = body

    // Walidacja
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Brak adresu e-mail' },
        { status: 400 }
      )
    }

    if (!MAILERLITE_WORKER_URL) {
      console.error('MAILERLITE_WORKER_URL not configured')
      return NextResponse.json(
        { success: false, error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      )
    }

    // Przygotuj dane dla Workera
    const workerData = {
      email,
      name: name || email.split('@')[0],
      groupId: GROUP_ID,
      fields: phone ? { phone } : {}
    }

    // Wyślij do Cloudflare Worker
    const response = await fetch(MAILERLITE_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workerData)
    })

    const responseData = await response.json()

    if (!response.ok) {
      if (responseData.code === 'ALREADY_SUBSCRIBED') {
        return NextResponse.json({
          success: true,
          message: 'Jesteś już zapisany/a!'
        })
      }
      return NextResponse.json(
        { success: false, error: responseData.error || 'Coś poszło nie tak.' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: responseData.message || 'Zapisano pomyślnie!'
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Coś poszło nie tak.' },
      { status: 500 }
    )
  }
}
```

### 5.2 Tracking Config - /lib/tracking-config.ts

```typescript
export const trackingConfig = {
  facebook: {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '',
  },
  google: {
    adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
  },
  tiktok: {
    pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '',
  },
  project: {
    id: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  },
  worker: {
    url: process.env.NEXT_PUBLIC_TRACKING_WORKER_URL || '',
  },
  dev: {
    enableTracking: process.env.NEXT_PUBLIC_ENABLE_DEV_TRACKING === 'true',
  },
}

export const isDevelopment = process.env.NODE_ENV === 'development'
```

### 5.3 Tracking Scripts - /components/tracking/TrackingScripts.tsx

```typescript
'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { trackingConfig } from '@/lib/tracking-config'

export default function TrackingScripts() {
  useEffect(() => {
    // Auto PageView tracking
    if (typeof window !== 'undefined') {
      // PageView event fires automatically from pixel init
    }
  }, [])

  return (
    <>
      {/* Facebook Pixel */}
      {trackingConfig.facebook.pixelId && (
        <>
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${trackingConfig.facebook.pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${trackingConfig.facebook.pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Google Ads (gtag.js) */}
      {trackingConfig.google.adsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingConfig.google.adsId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${trackingConfig.google.adsId}');
              `,
            }}
          />
        </>
      )}

      {/* TikTok Pixel */}
      {trackingConfig.tiktok.pixelId && (
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${trackingConfig.tiktok.pixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      )}
    </>
  )
}
```

### 5.4 Layout - /app/layout.tsx

```typescript
import type { Metadata } from 'next'
import { Varela_Round, Montserrat } from 'next/font/google'
import './globals.css'
import TrackingScripts from '@/components/tracking/TrackingScripts'

const headingFont = Varela_Round({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const bodyFont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Tytuł strony',
  description: 'Opis strony',
  icons: {
    icon: '/BASEPATH/favicon.ico',    // WAŻNE: Dodaj basePath!
    apple: '/BASEPATH/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://DOMENA_Z_OBRAZAMI.com" />
      </head>
      <body>
        <TrackingScripts />
        {children}
      </body>
    </html>
  )
}
```

### 5.5 useReducedMotion Hook - /hooks/useReducedMotion.ts

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = () => {
      const isMobile = window.innerWidth < 768
      setShouldReduceMotion(mediaQuery.matches || isMobile)
    }

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return shouldReduceMotion
}
```

---

## KROK 6: Deployment na Cloudflare Pages

### 6.1 Przygotowanie

1. Upewnij się że wszystkie API routes mają `export const runtime = 'edge'`
2. Sprawdź czy basePath jest poprawny
3. Zweryfikuj .gitignore zawiera .env.local

### 6.2 GitHub + Cloudflare Pages

1. Push do GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. W Cloudflare Pages Dashboard:
   - Create Project → Connect to Git
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`

3. Environment Variables w Cloudflare:
```
MAILERLITE_WORKER_URL=https://your-worker.workers.dev
MAILERLITE_GROUP_ID_DEFAULT=123456789
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123...
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123...
NEXT_PUBLIC_TIKTOK_PIXEL_ID=ABC...
NEXT_PUBLIC_PROJECT_ID=nazwa-projektu
```

### 6.3 Custom Domain

1. Cloudflare Pages → Custom Domains
2. Dodaj subdomain (np. `webinar.domena.com`) lub ścieżkę
3. Jeśli używasz basePath, skonfiguruj redirect rule w Cloudflare

---

## KROK 7: Checklist przed deploymentem

- [ ] `export const runtime = 'edge'` w wszystkich API routes
- [ ] basePath poprawnie ustawiony w next.config.mjs
- [ ] basePath w metadata.icons
- [ ] basePath w fetch URL do API
- [ ] remotePatterns dla zewnętrznych obrazów
- [ ] 'use client' w komponentach z hooks
- [ ] .env.local w .gitignore
- [ ] Zmienne środowiskowe dodane do Cloudflare Pages
- [ ] Preconnect dla zewnętrznych domen
- [ ] Testowy build lokalnie: `npm run build`

---

## KROK 8: Post-deployment verification

1. Sprawdź czy strona ładuje się poprawnie
2. Sprawdź czy favicon się wyświetla
3. Przetestuj formularz zapisu
4. Sprawdź Network tab - czy tracking pixels się ładują
5. Facebook Pixel Helper - czy wykrywa pixel
6. Sprawdź Console - czy nie ma błędów 404
7. Test na mobile - responsive design

---

## Wsparcie

Jeśli pojawią się błędy, sprawdź:
1. Cloudflare Pages Build Logs
2. Browser Console
3. Network Tab (czy API calls działają)
4. MailerLite Dashboard (czy zapisy przychodzą)
5. Facebook Events Manager (czy eventy się rejestrują)
