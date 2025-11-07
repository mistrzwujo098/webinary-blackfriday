# Deployment Guide - Webinary Black Friday

## Pre-Deployment Checklist

- [x] ✅ Projekt zbudowany bez błędów (`npm run build`)
- [ ] 📝 Zmienne środowiskowe przygotowane
- [ ] 🎨 Favicon i Open Graph images w `/public`
- [ ] ✉️ MailerLite Account ID i Group IDs
- [ ] 📊 Tracking pixels (Facebook, Google, TikTok) - opcjonalne
- [ ] 🧪 Przetestowane na local (desktop + mobile)

## Opcja 1: Cloudflare Pages (Zalecane)

### Dlaczego Cloudflare Pages?
- ✅ Darmowy tier z unlimited bandwidth
- ✅ Global CDN
- ✅ Automatyczne deployments z GitHub
- ✅ Świetna performance dla Next.js
- ✅ Zero cold starts

### Krok 1: Przygotuj Repository

```bash
# Initialize git (jeśli nie zrobione)
git init
git add .
git commit -m "Initial commit: Webinary Black Friday"

# Utwórz repo na GitHub
# Push do GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/webinary-blackfriday.git
git push -u origin main
```

### Krok 2: Setup Cloudflare Pages

1. Zaloguj się do [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Przejdź do **Workers & Pages**
3. Kliknij **Create** → **Pages** → **Connect to Git**
4. Połącz z GitHub i wybierz repository

### Krok 3: Build Configuration

**Framework preset:** Next.js (automatic detection)

**Build settings:**
```
Build command:       npm run build
Build output:        .next
Root directory:      /
Node version:        20.x
```

### Krok 4: Environment Variables

W Cloudflare Pages → Settings → Environment Variables dodaj:

```bash
# MailerLite (required)
NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID=581975

# Tracking (optional)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=328860071729858
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-405660852
NEXT_PUBLIC_TIKTOK_PIXEL_ID=CQ762UBC77U6L0AM30HG
```

### Krok 5: Deploy

1. Kliknij **Save and Deploy**
2. Poczekaj ~2-3 minuty
3. URL: `https://webinary-blackfriday-xxx.pages.dev`

### Krok 6: Custom Domain (opcjonalnie)

1. W Cloudflare Pages → **Custom domains**
2. Kliknij **Set up a custom domain**
3. Wpisz: `webinar-bf.paulinaodmatematyki.com`
4. Dodaj CNAME record w DNS:
   ```
   CNAME  webinar-bf  webinary-blackfriday-xxx.pages.dev
   ```
5. Poczekaj na aktywację SSL (automatyczne, ~1-5 min)

---

## Opcja 2: Vercel

### Krok 1: Połącz z GitHub

1. Zaloguj się do [Vercel](https://vercel.com)
2. Kliknij **Add New** → **Project**
3. Import z GitHub

### Krok 2: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
.next
```

**Install Command:**
```bash
npm install
```

### Krok 3: Environment Variables

```bash
NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID=581975
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=328860071729858
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-405660852
NEXT_PUBLIC_TIKTOK_PIXEL_ID=CQ762UBC77U6L0AM30HG
```

### Krok 4: Deploy

1. Kliknij **Deploy**
2. Poczekaj ~2 minuty
3. URL: `https://webinary-blackfriday.vercel.app`

### Krok 5: Custom Domain

1. Settings → Domains
2. Dodaj domenę
3. Skonfiguruj DNS (CNAME lub A record)

---

## Opcja 3: Netlify

### Krok 1: Connect Repository

1. Zaloguj się do [Netlify](https://netlify.com)
2. **Add new site** → **Import from Git**
3. Połącz GitHub repository

### Krok 2: Build Settings

```
Base directory:     /
Build command:      npm run build
Publish directory:  .next
```

### Krok 3: Environment Variables

Site settings → Environment variables:

```bash
NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID=581975
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=328860071729858
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-405660852
NEXT_PUBLIC_TIKTOK_PIXEL_ID=CQ762UBC77U6L0AM30HG
```

### Krok 4: Deploy

1. **Deploy site**
2. URL: `https://webinary-blackfriday.netlify.app`

---

## Post-Deployment Checklist

### Functionality Tests

- [ ] ✅ Strona główna (`/`) ładuje się poprawnie
- [ ] ✅ Strona egzaminu (`/egzamin-8`) działa
- [ ] ✅ Strona matury (`/matura`) działa
- [ ] ✅ Nawigacja między stronami
- [ ] ✅ Formularze wyświetlają się poprawnie
- [ ] ✅ Animacje działają (desktop)
- [ ] ✅ Animacje wyłączone (mobile <768px)

### Mobile Tests (Real Devices)

- [ ] 📱 iPhone Safari - strona ładuje się
- [ ] 📱 Android Chrome - strona ładuje się
- [ ] 📱 Text widoczny (no opacity bug)
- [ ] 📱 Ikony nie ucięte
- [ ] 📱 Przyciski tappable (min 44x44px)
- [ ] 📱 Formularz działa

### Performance Tests

Użyj [PageSpeed Insights](https://pagespeed.web.dev/):

**Target Metrics (Mobile):**
- FCP: <1.8s
- LCP: <2.5s
- TBT: <200ms
- CLS: <0.1

**Jeśli metryki gorsze:**
1. Sprawdź preconnect hints w `app/layout.tsx`
2. Upewnij się że używasz `next/font/google`
3. Sprawdź czy external images mają `unoptimized` flag

### SEO Tests

- [ ] 🔍 Meta title wyświetla się poprawnie
- [ ] 🔍 Meta description w source
- [ ] 🔍 Favicon pojawia się w karcie
- [ ] 🔍 Open Graph działa ([FB Debugger](https://developers.facebook.com/tools/debug/))
- [ ] 🔍 Twitter Card działa

### Analytics Tests

Jeśli masz tracking:

- [ ] 📊 Facebook Pixel fires (użyj Pixel Helper extension)
- [ ] 📊 Google Ads conversion tracks
- [ ] 📊 TikTok pixel works
- [ ] 📊 Console nie ma błędów tracking

### Form Tests

- [ ] ✉️ Formularz wysyła dane
- [ ] ✉️ MailerLite otrzymuje subscribers
- [ ] ✉️ Email potwierdzenia wysyłany
- [ ] ✉️ Thank you page działa (jeśli zintegrowane)
- [ ] ✉️ Błędna walidacja działa
- [ ] ✉️ Loading state podczas submit

---

## Continuous Deployment

### Automatyczne Deploymenty

Wszystkie platformy (Cloudflare, Vercel, Netlify) automatycznie deployują przy push do `main`:

```bash
git add .
git commit -m "Update: [opis zmian]"
git push origin main
```

Deployment automatycznie się rozpocznie (~2-3 minuty).

### Preview Deployments

**Pull Request = Preview URL**

Gdy tworzysz PR, automatycznie dostaniesz preview URL do testowania.

### Rollback

**Cloudflare Pages:**
1. Deployments → Historia
2. Kliknij na poprzedni deployment
3. **Rollback to this deployment**

**Vercel:**
1. Deployments
2. Poprzedni deployment → "⋮" → **Promote to Production**

**Netlify:**
1. Deploys
2. Poprzedni deployment → **Publish deploy**

---

## Domain Setup - Szczegóły

### Subdomena: webinar-bf.paulinaodmatematyki.com

**Option A: Cloudflare Managed DNS**

W Cloudflare DNS:
```
Type:   CNAME
Name:   webinar-bf
Target: webinary-blackfriday-xxx.pages.dev
Proxy:  Yes (orange cloud)
TTL:    Auto
```

**Option B: External DNS Provider**

W twoim DNS provider (np. nazwa.pl):
```
Type:   CNAME
Name:   webinar-bf
Target: webinary-blackfriday-xxx.pages.dev
TTL:    300
```

### Główna Domena: paulinaodmatematyki.com/webinar-bf

Jeśli chcesz używać path zamiast subdomain, potrzebujesz Cloudflare Worker do routing:

```javascript
// _worker.js w głównej domenie
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/webinar-bf')) {
      const pagesUrl = new URL(request.url);
      pagesUrl.hostname = 'webinary-blackfriday-xxx.pages.dev';
      return fetch(pagesUrl, request);
    }

    // Default: serve WordPress
    return env.ASSETS.fetch(request);
  },
};
```

**Wymagane:** `basePath` w `next.config.mjs`:
```javascript
const nextConfig = {
  basePath: '/webinar-bf',
  // ... rest of config
};
```

---

## Monitoring & Analytics

### Performance Monitoring

**Cloudflare Pages:**
- Analytics → Web Analytics (automatyczne)
- Core Web Vitals tracking

**Google Analytics 4:**
1. Utwórz property dla webinaru
2. Dodaj Measurement ID do tracking
3. Monitoruj:
   - Page views
   - Form submissions
   - Conversion rate (visits → signups)

### Error Monitoring

**Sentry (opcjonalnie):**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Uptime Monitoring

**UptimeRobot (darmowe):**
1. Monitor typu HTTP(s)
2. Interval: 5 minutes
3. Alerty: Email/SMS

---

## Security Best Practices

- [x] ✅ HTTPS enforced (automatyczne na Cloudflare/Vercel)
- [x] ✅ Environment variables nie w repo (.gitignore)
- [x] ✅ API keys w environment variables, nie w kodzie
- [x] ✅ Form validation po stronie serwera (jeśli API route)
- [x] ✅ Rate limiting dla API endpoints (jeśli używane)

---

## Troubleshooting

### Build Fails

**Problem:** `Module not found` error
**Rozwiązanie:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Problem:** TypeScript errors
**Rozwiązanie:** Sprawdź `tsconfig.json`, upewnij się że ma `jsx: "react-jsx"`

### 404 na Routes

**Problem:** `/egzamin-8` zwraca 404
**Rozwiązanie:** Sprawdź czy masz `app/egzamin-8/page.tsx`

### Images nie ładują się

**Problem:** External images 404
**Rozwiązanie:** Dodaj `unoptimized` prop do `<Image>`

### Fonty nie ładują się

**Problem:** Fonts nie wyświetlają się
**Rozwiązanie:** Sprawdź czy używasz `next/font/google`, NIE CSS @import

---

## Backup & Disaster Recovery

### Backup Strategy

1. **Code:** GitHub repository (automatic)
2. **Environment Variables:** Zapisz lokalnie w bezpiecznym miejscu
3. **MailerLite Data:** Export subscribers regularly

### Disaster Recovery Plan

**Jeśli strona nie działa:**
1. Sprawdź Cloudflare Status
2. Check deployment logs
3. Rollback do previous deployment
4. Contact support jeśli persistent issue

**Jeśli formularz nie działa:**
1. Test MailerLite API status
2. Check environment variables
3. Sprawdź browser console errors
4. Verify Group IDs w MailerLite

---

## Kontakt & Support

**Cloudflare Pages:** https://community.cloudflare.com/
**Vercel:** https://vercel.com/support
**MailerLite:** https://www.mailerlite.com/help

**Dokumentacja:**
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

**Dokument utworzony:** 7 listopada 2025
**Ostatnia aktualizacja:** 7 listopada 2025
