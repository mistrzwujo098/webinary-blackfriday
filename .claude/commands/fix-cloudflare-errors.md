# Fix Cloudflare Pages Errors

Diagnozuj i naprawiaj typowe błędy przy deploymencie Next.js na Cloudflare Pages.

## Argumenty
- $ARGUMENTS - opis błędu lub komunikat z konsoli (opcjonalnie)

---

## AUTOMATYCZNA DIAGNOZA

Uruchom te komendy aby zdiagnozować problemy:

```bash
# 1. Sprawdź Edge Runtime
echo "=== Checking Edge Runtime ==="
for file in app/api/*/route.ts; do
  if [ -f "$file" ]; then
    if ! grep -q "export const runtime" "$file"; then
      echo "MISSING runtime in: $file"
    fi
  fi
done

# 2. Sprawdź basePath
echo "=== Checking basePath ==="
grep "basePath" next.config.mjs || echo "No basePath configured"

# 3. Sprawdź problematyczne fetche
echo "=== Checking fetch URLs ==="
grep -rn "fetch('/api" components/ app/ 2>/dev/null

# 4. Sprawdź redirecty
echo "=== Checking redirects ==="
grep -rn "router.push\|location.href" components/ 2>/dev/null | grep -v node_modules

# 5. Test build
echo "=== Testing build ==="
npm run build 2>&1 | tail -20
```

---

## BŁĘDY I ROZWIĄZANIA

### BŁĄD: "Edge Runtime is required"

**Komunikat:**
```
The following routes were not configured to run with the Edge Runtime
```

**Przyczyna:** Cloudflare Pages wymaga Edge Runtime dla wszystkich API routes.

**Rozwiązanie:**
```typescript
// Dodaj na początku każdego app/api/*/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'  // <-- DODAJ TO!

export async function POST(request: NextRequest) {
  // ...
}
```

---

### BŁĄD: Podwójny basePath w URL

**Objaw:** URL wygląda jak `/webinar/webinar/dziekujemy`

**Przyczyna:** Ręczne dodawanie basePath gdy Next.js robi to automatycznie.

**Rozwiązanie:**

```typescript
// W komponencie - NIE dodawaj basePath ręcznie!

// ŹLE
router.push('/webinar/dziekujemy')
window.location.href = '/webinar/dziekujemy'

// DOBRZE
router.push('/dziekujemy')

// Dla window.location - też bez basePath
// Next.js automatycznie obsłuży routing
```

**Znajdź i napraw:**
```bash
grep -rn "router.push.*webinar\|location.href.*webinar" components/
```

---

### BŁĄD: API returns 404

**Objaw:** `POST /api/subscribe 404`

**Przyczyna 1:** Brak basePath w fetch URL

**Rozwiązanie:**
```typescript
// Jeśli basePath = '/webinar', fetch musi zawierać basePath:

// ŹLE (bez basePath)
fetch('/api/subscribe', {...})

// DOBRZE (z basePath)
fetch('/webinar/api/subscribe', {...})
```

**Przyczyna 2:** Plik route.ts w złej lokalizacji

**Sprawdź:** Plik musi być w `app/api/subscribe/route.ts` (nie `route.tsx`!)

---

### BŁĄD: 400 Bad Request z API

**Objaw:** API zwraca 400 przy submitcie formularza

**Przyczyna:** Brakujące lub niepoprawne pola w request body.

**Diagnoza:**
```typescript
// W API route - dodaj logi
export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log('Received body:', body)  // <-- Debug
  // ...
}
```

**Rozwiązanie:**
```typescript
// W formularzu - upewnij się że wysyłasz wymagane pola
const response = await fetch('/webinar/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,           // WYMAGANE
    type: 'webinar',        // WYMAGANE jeśli API tego wymaga
    phone: phone || undefined,
  }),
})
```

---

### BŁĄD: Obrazy 404

**Objaw:** `GET /webinar/avatar.jpg 404`

**Przyczyna 1:** Obrazy z /public nie działają z basePath

**Rozwiązanie:** Użyj zewnętrznego URL i next/image:
```typescript
// next.config.mjs
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'twoja-domena.com',
      pathname: '/**',
    },
  ],
}

// W komponencie
<Image
  src="https://twoja-domena.com/obrazek.jpg"
  alt="..."
  width={100}
  height={100}
/>
```

**Przyczyna 2:** Brak remotePatterns dla zewnętrznej domeny

**Rozwiązanie:** Dodaj domenę do next.config.mjs remotePatterns.

---

### BŁĄD: Favicon nie wyświetla się

**Objaw:** Brak ikony w zakładce przeglądarki

**Przyczyna:** Metadata icons nie zawiera basePath

**Rozwiązanie:**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  icons: {
    icon: '/webinar/favicon.ico',    // DODAJ basePath!
    apple: '/webinar/icon.png',
  },
}
```

---

### BŁĄD: Tracking Worker 404

**Objaw:** `GET tracking-api.workers.dev 404` w konsoli

**Przyczyna:** Tracking worker jest opcjonalny i może nie istnieć.

**Rozwiązanie 1:** Usuń zmienną NEXT_PUBLIC_TRACKING_WORKER_URL

**Rozwiązanie 2:** Zignoruj błąd 404 w kodzie:
```typescript
// lib/tracking.ts
const trackServerSide = async (event: TrackingEvent) => {
  if (!trackingConfig.worker.url) return

  try {
    const response = await fetch(trackingConfig.worker.url, {...})

    // Ignoruj 404 - worker jest opcjonalny
    if (!response.ok && response.status !== 404) {
      console.warn('[Tracking] Warning:', response.status)
    }
  } catch (error) {
    // Cicho ignoruj błędy sieciowe
  }
}
```

---

### BŁĄD: "Module not found" przy buildzie

**Objaw:** Build error z "Cannot find module..."

**Diagnoza:**
```bash
npm run build 2>&1 | grep -i "module not found\|cannot find"
```

**Rozwiązania:**

1. **Brak zależności:**
```bash
npm install
```

2. **Zły import path:**
```typescript
// Sprawdź czy używasz @ alias poprawnie
import Component from '@/components/Component'  // Powinno działać
import Component from '../components/Component'  // Alternatywa
```

3. **Brak pliku:**
```bash
# Sprawdź czy plik istnieje
ls -la components/
```

---

### BŁĄD: "Hydration mismatch"

**Objaw:** React hydration error w konsoli

**Przyczyna:** Server render różni się od client render (np. z powodu Date, Math.random)

**Rozwiązanie:**
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null  // lub placeholder

  return <div>{/* content that differs */}</div>
}
```

---

### BŁĄD: CORS error przy API call

**Objaw:** "Access-Control-Allow-Origin" error

**Przyczyna:** Zewnętrzne API blokuje requesty z innej domeny.

**Rozwiązanie:** Użyj API route jako proxy:
```typescript
// app/api/proxy/route.ts
export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await fetch('https://zewnetrzne-api.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return NextResponse.json(await response.json())
}
```

---

### BŁĄD: Environment variables undefined

**Objaw:** `process.env.VARIABLE` zwraca undefined

**Przyczyna 1:** Zmienna nie jest w Cloudflare Pages Environment Variables

**Rozwiązanie:** Dodaj zmienną w Cloudflare Dashboard → Settings → Environment Variables

**Przyczyna 2:** Zmienna client-side bez NEXT_PUBLIC_ prefix

**Rozwiązanie:**
```bash
# Zmienne dostępne w przeglądarce MUSZĄ mieć prefix NEXT_PUBLIC_
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123...  # Działa w client
MAILERLITE_API_KEY=secret...          # Tylko server-side
```

---

## SZYBKA NAPRAWA - WSZYSTKIE TYPOWE BŁĘDY

```bash
# 1. Dodaj Edge Runtime do wszystkich API routes
for file in app/api/*/route.ts; do
  if [ -f "$file" ]; then
    if ! grep -q "export const runtime" "$file"; then
      sed -i '' '1a\
export const runtime = '\''edge'\''
' "$file"
      echo "Added runtime to: $file"
    fi
  fi
done

# 2. Rebuild
npm run build

# 3. Jeśli build OK - commit i redeploy
git add .
git commit -m "fix: Add Edge Runtime to API routes"
git push origin main
```

---

## DEBUGGING TIPS

### 1. Sprawdź build logs w Cloudflare
Cloudflare Pages → Deployments → (wybierz) → View logs

### 2. Sprawdź runtime logs
Cloudflare Pages → Functions → Logs

### 3. Local debugging
```bash
# Uruchom produkcyjny build lokalnie
npm run build && npm run start
# Otwórz http://localhost:3000/BASEPATH
```

### 4. Network tab debugging
- Otwórz DevTools → Network
- Filtruj: `/api`
- Sprawdź Request/Response

### 5. Console errors
- Otwórz DevTools → Console
- Szukaj czerwonych błędów
- Sprawdź czy tracking pixels się ładują
