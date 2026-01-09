# Deploy to Cloudflare Pages

Deploy istniejącego projektu Next.js na Cloudflare Pages z pełną weryfikacją.

## Argumenty
- $ARGUMENTS - nazwa projektu w Cloudflare (opcjonalnie)

---

## PRE-FLIGHT CHECK

Przed deploymentem wykonaj automatyczne sprawdzenie:

### 1. Sprawdź Edge Runtime w API routes

```bash
# Znajdź wszystkie route.ts bez 'export const runtime'
grep -rL "export const runtime" app/api/*/route.ts 2>/dev/null
```

**Jeśli znaleziono pliki bez Edge Runtime:**

Dodaj na początku każdego pliku:
```typescript
export const runtime = 'edge'
```

### 2. Sprawdź basePath

```bash
# Wyświetl aktualny basePath
grep -A2 "basePath" next.config.mjs
```

**Weryfikacja:**
- [ ] basePath jest ustawiony (jeśli strona pod subdirectory)
- [ ] basePath NIE kończy się na `/`
- [ ] basePath zaczyna się od `/`

### 3. Sprawdź fetch URL w komponentach

```bash
# Znajdź fetche do /api bez basePath
grep -r "fetch('/api" components/ app/
```

**Jeśli znaleziono - napraw:**
```typescript
// ŹLE
fetch('/api/subscribe')

// DOBRZE (z basePath)
fetch('/BASEPATH/api/subscribe')
```

### 4. Sprawdź redirecty

```bash
# Znajdź potencjalnie złe redirecty
grep -r "router.push.*basePath" components/
grep -r "location.href.*basePath" components/
```

**Upewnij się że NIE ma podwójnego basePath!**

### 5. Sprawdź metadata icons

```bash
grep -A4 "icons:" app/layout.tsx
```

**Weryfikacja:** Icon paths muszą zawierać basePath.

### 6. Sprawdź .gitignore

```bash
grep ".env.local" .gitignore
```

**Jeśli nie znaleziono - dodaj!**

### 7. Test build lokalnie

```bash
npm run build
```

**Jeśli build FAILED - napraw błędy przed deploymentem!**

---

## DEPLOYMENT

### Opcja A: Przez GitHub (Zalecane)

1. **Commit i push:**
```bash
git add .
git commit -m "Prepare for Cloudflare deployment"
git push origin main
```

2. **W Cloudflare Dashboard:**
   - Workers & Pages → Create application
   - Pages → Connect to Git
   - Select repository
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Build output directory: `.next`

3. **Environment Variables:**
   Dodaj wszystkie zmienne z .env.local (oprócz deweloperskich):

   | Variable | Value |
   |----------|-------|
   | MAILERLITE_WORKER_URL | https://your-worker.workers.dev |
   | MAILERLITE_GROUP_ID_* | (group IDs) |
   | NEXT_PUBLIC_FACEBOOK_PIXEL_ID | (pixel ID) |
   | NEXT_PUBLIC_GOOGLE_ADS_ID | (ads ID) |
   | NEXT_PUBLIC_TIKTOK_PIXEL_ID | (pixel ID) |
   | NEXT_PUBLIC_PROJECT_ID | (project name) |

4. **Deploy:**
   - Save and Deploy
   - Poczekaj na build (~2-5 min)

### Opcja B: Przez Wrangler CLI

1. **Zainstaluj Wrangler:**
```bash
npm install -g wrangler
wrangler login
```

2. **Build:**
```bash
npm run build
```

3. **Deploy:**
```bash
wrangler pages deploy .next --project-name=NAZWA_PROJEKTU
```

---

## POST-DEPLOYMENT VERIFICATION

### 1. Podstawowe sprawdzenie

- [ ] Strona ładuje się bez błędów
- [ ] Favicon wyświetla się
- [ ] Obrazy ładują się
- [ ] Fonty ładują się poprawnie

### 2. Formularz

- [ ] Formularz się wyświetla
- [ ] Submit działa (sprawdź Network tab)
- [ ] Redirect na thank you page działa
- [ ] Dane trafiają do MailerLite

### 3. Tracking

- [ ] Facebook Pixel Helper wykrywa pixel
- [ ] Google Tag Assistant wykrywa tag
- [ ] Console nie pokazuje błędów tracking

### 4. Mobile

- [ ] Strona jest responsive
- [ ] Formularz działa na mobile
- [ ] Animacje nie lagują

---

## CZĘSTE PROBLEMY PO DEPLOYMENCIE

### Problem: "The following routes were not configured to run with the Edge Runtime"

**Rozwiązanie:**
```typescript
// Dodaj w każdym app/api/*/route.ts
export const runtime = 'edge'
```

### Problem: 404 na API routes

**Rozwiązanie:**
1. Sprawdź czy fetch URL zawiera basePath
2. Sprawdź czy route.ts jest w prawidłowej lokalizacji

### Problem: Podwójny basePath w URL

**Rozwiązanie:**
```typescript
// NIE dodawaj basePath ręcznie
router.push('/dziekujemy')  // DOBRZE
router.push('/webinar/dziekujemy')  // ŹLE (jeśli basePath='/webinar')
```

### Problem: Obrazy 404

**Rozwiązanie:**
1. Sprawdź remotePatterns w next.config.mjs
2. Użyj zewnętrznego URL zamiast /public

### Problem: Tracking nie działa

**Rozwiązanie:**
1. Sprawdź czy zmienne NEXT_PUBLIC_* są ustawione w Cloudflare
2. Redeploy po dodaniu zmiennych

---

## CUSTOM DOMAIN

### Subdomain (np. webinar.domena.com)

1. Cloudflare Pages → Custom domains → Add
2. Wpisz subdomain
3. DNS zostanie automatycznie skonfigurowany

### Ścieżka (np. domena.com/webinar)

1. Użyj basePath w next.config.mjs
2. Skonfiguruj Transform Rules w Cloudflare:
   - URI Path matches `/webinar/*`
   - Rewrite to: Pages deployment URL

---

## ROLLBACK

Jeśli coś poszło nie tak:

1. Cloudflare Pages → Deployments
2. Znajdź poprzedni działający deployment
3. Click "Rollback to this deployment"

---

## MONITORING

### Build Logs
Cloudflare Pages → Deployments → (wybierz deployment) → View logs

### Runtime Logs
Cloudflare Pages → Functions → Logs

### Analytics
Cloudflare Pages → Analytics
