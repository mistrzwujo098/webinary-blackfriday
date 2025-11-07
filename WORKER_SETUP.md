# Konfiguracja Cloudflare Worker dla MailerLite

## Co zostało zmienione

Projekt został zaktualizowany aby używać centralnego Cloudflare Workera (`mailerlite-api.kacperczaczyk.workers.dev`) do integracji z MailerLite.

### Zalety:
- ✅ Jeden klucz API w jednym miejscu
- ✅ Łatwiejsze zarządzanie
- ✅ Współdzielone między wszystkimi projektami
- ✅ Worker obsługuje CORS i walidację

## Wymagane zmiany w Workerze

Aby projekt webinary-blackfriday działał poprawnie, musisz dodać domenę webinar do allowed origins w workerze:

### 1. Otwórz plik workera i znajdź sekcję ALLOWED_ORIGINS:

```javascript
const ALLOWED_ORIGINS = [
  'https://paulinaodmatematyki.com',
  'https://paulina-math-nextjs.pages.dev',
  'http://localhost:3000',
  'http://localhost:3001',
  // Dodaj tutaj swoje domeny
];
```

### 2. Dodaj domeny dla webinary-blackfriday:

```javascript
const ALLOWED_ORIGINS = [
  'https://paulinaodmatematyki.com',
  'https://paulina-math-nextjs.pages.dev',
  'http://localhost:3000',
  'http://localhost:3001',
  // Webinary Black Friday
  'https://paulinaodmatematyki.com', // już jest (webinar ma basePath /webinar)
  // Jeśli masz osobną domenę:
  // 'https://webinar.paulinaodmatematyki.com',
];
```

**Uwaga:** Jeśli projekt jest hostowany na `paulinaodmatematyki.com/webinar`, to origin jest `https://paulinaodmatematyki.com`, więc prawdopodobnie nie musisz nic dodawać (jeśli już masz tę domenę w allowed origins).

### 3. Jeśli hostujesz na Cloudflare Pages:

Dodaj również URL preview:

```javascript
const ALLOWED_ORIGINS = [
  // ... poprzednie domeny
  'https://webinary-blackfriday.pages.dev',
  // Worker automatycznie akceptuje wszystkie *.pages.dev origins
];
```

### 4. Deploy workera:

```bash
wrangler deploy
```

## Zmienne środowiskowe w Next.js

Utwórz plik `.env.local` w projekcie webinary-blackfriday:

```bash
# MailerLite Worker URL
MAILERLITE_WORKER_URL=https://mailerlite-api.kacperczaczyk.workers.dev

# MailerLite Group IDs
MAILERLITE_GROUP_ID_E8=170420137559590025
MAILERLITE_GROUP_ID_MATURA=170420144046081367

# MailerLite Account ID (dla Universal Script)
NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID=581975

# Tracking (jeśli używasz)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=twoj_pixel_id
NEXT_PUBLIC_GOOGLE_ADS_ID=twoj_google_ads_id
NEXT_PUBLIC_TIKTOK_PIXEL_ID=twoj_tiktok_pixel_id
NEXT_PUBLIC_PROJECT_ID=webinary-blackfriday
```

## Zmienne środowiskowe w Cloudflare Pages

Dodaj te same zmienne w Cloudflare Pages Settings → Environment Variables:

1. `MAILERLITE_WORKER_URL` = `https://mailerlite-api.kacperczaczyk.workers.dev`
2. `MAILERLITE_GROUP_ID_E8` = `170420137559590025`
3. `MAILERLITE_GROUP_ID_MATURA` = `170420144046081367`
4. `NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID` = `581975`
5. Tracking variables (jeśli używasz)

## Testowanie

### 1. Test lokalny:

```bash
npm run dev
```

Przejdź do `http://localhost:3000/webinar/e8` i wypróbuj formularz zapisu.

### 2. Sprawdź logi workera:

```bash
wrangler tail
```

Powinieneś zobaczyć requesty przychodzące z twojej aplikacji.

### 3. Sprawdź MailerLite:

Sprawdź czy nowy subscriber pojawił się w odpowiedniej grupie (E8 lub Matura).

## Rozwiązywanie problemów

### CORS Error

Jeśli widzisz błąd CORS w konsoli przeglądarki:
- Upewnij się, że dodałeś domenę do `ALLOWED_ORIGINS` w workerze
- Sprawdź czy worker jest wdrożony (`wrangler deploy`)
- Worker automatycznie akceptuje wszystkie `*.pages.dev` origins

### Worker nie odpowiada

- Sprawdź czy `MAILERLITE_WORKER_URL` jest poprawny w `.env.local`
- Sprawdź logi workera: `wrangler tail`
- Upewnij się, że `MAILERLITE_API_KEY` jest ustawiony w workerze (wrangler secret)

### Subscriber nie pojawia się w MailerLite

- Sprawdź logi workera czy request dochodzi
- Sprawdź czy `MAILERLITE_GROUP_ID_E8` i `MAILERLITE_GROUP_ID_MATURA` są poprawne
- Sprawdź czy klucz API w workerze ma odpowiednie uprawnienia

## Struktura requestu do Workera

### Zapis na webinar (subscribe):

```json
{
  "email": "user@example.com",
  "name": "Jan Kowalski",
  "groupId": "170420137559590025",
  "fields": {
    "phone": "+48123456789",
    "level": "podstawowa"
  }
}
```

### Aktualizacja numeru telefonu (update-phone):

```json
{
  "email": "user@example.com",
  "fields": {
    "phone": "+48123456789"
  }
}
```

Worker automatycznie zaktualizuje użytkownika jeśli email już istnieje w bazie (używa tego samego endpointu POST).

## Więcej informacji

- [MailerLite API Docs](https://developers.mailerlite.com/docs)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
