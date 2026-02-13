# Webinary Black Friday - Paulina od Matematyki

Dwie strony zapisu na darmowe webinary Black Friday 2025.

## Webinary

1. **Egzamin 8-klasisty** - 20 listopada 2025, 18:00
   - URL: `/egzamin-8`
   - System 15 minut dziennie

2. **Matura z Matematyki** - 20 listopada 2025, 19:30
   - URL: `/matura`
   - System 20 minut dziennie (podstawowa i rozszerzona)

## Stack Technologiczny

- **Next.js 16** - React framework z App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animacje
- **Lucide React** - Ikony

## Instalacja

```bash
npm install
```

## Konfiguracja

1. Skopiuj `.env.local.example` do `.env.local`
2. Uzupełnij zmienne środowiskowe (opcjonalne dla developmentu)

## Uruchomienie

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

Strona będzie dostępna na `http://localhost:3000`

## Struktura Projektu

```
webinary-blackfriday/
├── app/
│   ├── egzamin-8/      # Strona egzaminu 8-klasisty
│   ├── matura/         # Strona matury
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Strona główna (landing)
│   └── globals.css     # Globalne style
├── components/         # Komponenty React
│   ├── HeroEgzamin.tsx
│   ├── HeroMatura.tsx
│   ├── TwoOptions.tsx
│   ├── WhatYouGet.tsx
│   ├── WebinarForm.tsx
│   └── ...
├── hooks/
│   └── useReducedMotion.ts
└── public/             # Static assets
```

## Komponenty

### Wspólne komponenty
- `TwoOptions` - Porównanie opcja A vs B (egzamin)
- `WhatYouGet` - Lista benefitów webinaru
- `WhyFree` - Sekcja "Czemu darmowy webinar"
- `WebinarForm` - Formularz zapisu
- `Footer` - Stopka

### Komponenty specyficzne dla egzaminu
- `HeroEgzamin` - Hero section dla 8-klasisty

### Komponenty specyficzne dla matury
- `HeroMatura` - Hero section dla matury
- `SimpleQuestion` - Sekcja z pytaniem o średnią
- `ForWho` - Dla kogo jest webinar
- `WhyNovember` - Dlaczego zacząć w listopadzie
- `RealNumbers` - Statystyki (24 000+ kursantów)

## Brand Colors

```css
--paulina-primary: #571A47    (fiolet)
--paulina-accent: #EC9A4F     (pomarańcz)
--paulina-blue: #06AEEF       (błękit)
--paulina-bg-purple: #F7EEF4  (jasny fiolet)
--paulina-bg-yellow: #FEF1D3  (jasny żółty)
```

## Performance Best Practices

- ✅ `useReducedMotion` hook - wyłącza animacje na mobile
- ✅ Next.js Font Optimization - `next/font/google`
- ✅ Lazy loading animations - Framer Motion `whileInView`
- ✅ Preconnect hints - dla external domains
- ✅ Responsive images - Next.js Image component
- ✅ TypeScript strict mode

## Integracja MailerLite

Formularz jest przygotowany do integracji z MailerLite (wymaga dodania konfiguracji).

## Deployment

Projekt jest gotowy do wdrożenia na:
- **Cloudflare Pages** (zalecane)
- Vercel
- Netlify

### Cloudflare Pages

```bash
npm run build
```

Konfiguracja w Cloudflare:
- Build command: `npm run build`
- Build output: `.next`
- Framework preset: Next.js

## License

© 2025 Paulina od Matematyki. Wszystkie prawa zastrzeżone.

## Kontakt

kontakt@paulinaodmatematyki.com
