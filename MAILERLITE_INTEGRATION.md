# Integracja MailerLite - Instrukcja

## Krok 1: Przygotowanie MailerLite

### Utwórz Grupy
Zaloguj się do MailerLite i utwórz dwie grupy dla uczestników webinarów:

1. **Webinar Egzamin 8 - Black Friday 2025**
   - Dla rodziców ósmoklasistów
   - Zapisz Group ID

2. **Webinar Matura - Black Friday 2025**
   - Dla maturzystów i ich rodziców
   - Zapisz Group ID

### Znajdź Account ID
1. Zaloguj się do MailerLite
2. Przejdź do **Websites → Embedded forms**
3. Znajdź **Universal Script**
4. Skopiuj Account ID z kodu: `ml('account', 'XXXXXX')`

## Krok 2: Konfiguracja Formularzy

W MailerLite utwórz custom fields dla formularzy:

**Wspólne dla obu:**
- `name` (text) - Imię
- `email` (email) - Email (domyślne pole)
- `phone` (text) - Telefon

**Dodatkowe dla Matury:**
- `level` (text) - Poziom: podstawowa/rozszerzona/niewiem

## Krok 3: Integracja w Projekcie

### Opcja A: MailerLite Universal Script (Zalecane)

Dodaj do `app/layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Preconnect dla MailerLite */}
        <link rel="preconnect" href="https://assets.mailerlite.com" />
      </head>
      <body>
        {children}

        {/* MailerLite Universal Script */}
        <Script
          id="mailerlite-universal"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
              .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
              n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
              (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
              ml('account', 'TU_ACCOUNT_ID');
            `,
          }}
        />
      </body>
    </html>
  )
}
```

### Opcja B: MailerLite API (Bardziej zaawansowane)

1. **Zainstaluj SDK:**
```bash
npm install @mailerlite/mailerlite-nodejs
```

2. **Utwórz API Route:**
```typescript
// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const GROUP_IDS = {
  egzamin: process.env.MAILERLITE_GROUP_ID_EGZAMIN,
  matura: process.env.MAILERLITE_GROUP_ID_MATURA
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, type, level } = body

    // Wybierz grupę na podstawie typu webinaru
    const groupId = type === 'egzamin' ? GROUP_IDS.egzamin : GROUP_IDS.matura

    const response = await fetch(
      `https://connect.mailerlite.com/api/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`
        },
        body: JSON.stringify({
          email,
          fields: {
            name,
            phone: phone || '',
            level: level || ''
          },
          groups: [groupId]
        })
      }
    )

    if (!response.ok) {
      throw new Error('MailerLite API error')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Subscription failed' },
      { status: 500 }
    )
  }
}
```

3. **Aktualizuj WebinarForm.tsx:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError(null)

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        type: type, // 'egzamin' or 'matura'
        level: formData.level
      }),
    })

    const data = await response.json()

    if (data.success) {
      // Redirect do thank you page
      window.location.href = '/thank-you'
    } else {
      setError('Coś poszło nie tak. Spróbuj ponownie.')
    }
  } catch (error) {
    setError('Błąd połączenia. Sprawdź internet i spróbuj ponownie.')
  } finally {
    setIsSubmitting(false)
  }
}
```

4. **Dodaj zmienne środowiskowe:**
```bash
# .env.local
MAILERLITE_API_KEY=twoj_api_key
MAILERLITE_GROUP_ID_EGZAMIN=group_id_dla_egzaminu
MAILERLITE_GROUP_ID_MATURA=group_id_dla_matury
```

## Krok 4: Email Automation w MailerLite

### Workflow 1: Potwierdzenie Zapisu
**Trigger:** Subscriber dodany do grupy
**Delay:** Immediate

**Email:**
- Subject: "✅ Zapisałeś się na webinar [Egzamin 8/Matura] - 20 listopada"
- Content:
  - Potwierdzenie zapisu
  - Data i godzina webinaru
  - Link do dodania do kalendarza (.ics file)
  - Co przygotować przed webinarem

### Workflow 2: Reminder #1 (24h przed)
**Trigger:** 24h przed webinarem
**Delay:** Wysłany 12 listopada

**Email:**
- Subject: "⏰ Jutro webinar! Co dostaniesz?"
- Content:
  - Przypomnienie o czasie
  - Teasery: co będzie na webinarze
  - Link do webinaru
  - FAQ

### Workflow 3: Reminder #2 (1h przed)
**Trigger:** 1h przed webinarem
**Delay:** 20 listopada, 17:00 (egzamin) / 18:30 (matura)

**Email + SMS (opcjonalnie):**
- Subject: "🔴 Za godzinę rozpoczynamy!"
- Content:
  - Link do webinaru (główny CTA)
  - Krótkie przypomnienie co dostaniesz
  - Support contact

### Workflow 4: Thank You + Replay (po webinarze)
**Trigger:** 20 listopada, 20:00 (egzamin) / 21:30 (matura)

**Email:**
- Subject: "🎁 Nagranie z webinaru + Materiały"
- Content:
  - Link do nagrania (dostępne 24h)
  - PDF-y z webinaru
  - Oferta kursu (CTA)
  - FAQ
  - Deadline 24h

## Krok 5: SMS Reminders (opcjonalnie)

Jeśli zbierasz numery telefonów, możesz skonfigurować SMS reminders:

**1h przed webinarem:**
```
Cześć [NAME]! Za godzinę startujemy webinar. Link: [URL]
PS. Miej kartkę i długopis! - Paulina
```

## Krok 6: Thank You Page

Utwórz stronę podziękowania:

```typescript
// app/thank-you/page.tsx
export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-paulina-bg-purple to-paulina-bg-yellow px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-paulina-primary mb-6">
          🎉 Świetnie! Jesteś zapisana/y!
        </h1>
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <p className="text-xl text-gray-700 mb-6">
            Za chwilę dostaniesz email z potwierdzeniem i szczegółami.
          </p>
          <div className="bg-paulina-bg-yellow rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-paulina-primary mb-4">
              Co dalej?
            </h2>
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <span>Sprawdź email (sprawdź też spam!)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <span>Dodaj webinar do kalendarza</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📝</span>
                <span>Przygotuj kartkę i długopis na notatki</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-gray-600">
            Do zobaczenia 20 listopada! 👋
          </p>
        </div>
      </div>
    </main>
  )
}
```

## Krok 7: Testing

### Test Checklist:
- [ ] Formularz wysyła dane do MailerLite
- [ ] Subscriber pojawia się w odpowiedniej grupie
- [ ] Email potwierdzenia wysłany natychmiast
- [ ] Custom fields (name, phone, level) zapisane poprawnie
- [ ] Thank you page działa
- [ ] Automation workflows skonfigurowane
- [ ] Test SMS reminders (jeśli używane)

## Krok 8: Analytics & Tracking

Dodaj tracking dla form submissions:

```typescript
// W WebinarForm.tsx po sukcesie
if (data.success) {
  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: `Webinar ${type}`,
      value: 0,
      currency: 'PLN'
    })
  }

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Webinar',
      event_label: type
    })
  }

  // Redirect
  window.location.href = '/thank-you'
}
```

## Troubleshooting

### Problem: Subscribers nie trafiają do grupy
**Rozwiązanie:** Sprawdź Group ID w `.env.local`

### Problem: Email confirmation nie wysłany
**Rozwiązanie:** Sprawdź workflow w MailerLite (czy jest aktywny?)

### Problem: Custom fields puste
**Rozwiązanie:** Upewnij się że pola są utworzone w MailerLite z takimi samymi nazwami

### Problem: CORS error
**Rozwiązanie:** Użyj API Route zamiast direct API call z frontendu

## Monitoring

### MailerLite Dashboard:
- Sprawdzaj Conversion Rate (visits → signups)
- Show-up Rate (signups → attendees)
- Email Open Rates (powinny być >40%)
- Click-through Rates na linki do webinaru

### Target Metrics:
- **Conversion Rate:** >25%
- **Show-up Rate:** >40%
- **Email Open Rate:** >45%
- **Click-through Rate:** >60%

## Dokument utworzony: 7 listopada 2025
