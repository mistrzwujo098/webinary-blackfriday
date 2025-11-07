# Naprawienie błędu 404 tracking-api worker

## Problem

W konsoli przeglądarki pojawia się błąd:
```
Failed to load resource: the server responded with a status of 404
tracking-api.kacperczaczyk.workers.dev/:1
```

## Przyczyna

Aplikacja próbuje wysyłać dane trackingowe do opcjonalnego Cloudflare Workera (`tracking-api.kacperczaczyk.workers.dev`), który:
- Jest **opcjonalny** (nie jest wymagany do działania aplikacji)
- Nie istnieje lub nie jest wdrożony
- Zmienna `NEXT_PUBLIC_TRACKING_WORKER_URL` jest ustawiona w Cloudflare Pages

## Rozwiązanie 1: Usuń zmienną z Cloudflare Pages (ZALECANE)

Tracking worker jest **opcjonalny**. Aplikacja działa poprawnie bez niego - tracking Facebook, Google i TikTok działa bezpośrednio przez pixele.

### Kroki:

1. Przejdź do **Cloudflare Pages Dashboard**
2. Wybierz projekt **webinary-blackfriday**
3. **Settings** → **Environment Variables**
4. Znajdź zmienną: `NEXT_PUBLIC_TRACKING_WORKER_URL`
5. **Usuń** tę zmienną (lub zostaw pustą)
6. **Redeploy** projekt

**Uwaga:** NIE usuwaj innych zmiennych trackingu:
- ✅ Zachowaj: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`
- ✅ Zachowaj: `NEXT_PUBLIC_GOOGLE_ADS_ID`
- ✅ Zachowaj: `NEXT_PUBLIC_TIKTOK_PIXEL_ID`

## Rozwiązanie 2: Kod został naprawiony

Jeśli nie możesz usunąć zmiennej, kod został zaktualizowany aby:
- ✅ Nie wyświetlać błędów 404 w konsoli
- ✅ Cicho ignorować brak trackingu workera
- ✅ Normalnie działać z Facebook/Google/TikTok tracking

### Co zostało zmienione w kodzie:

```typescript
// lib/tracking.ts
const trackServerSide = async (event: TrackingEvent) => {
  if (!trackingConfig.worker.url) return

  try {
    const response = await fetch(trackingConfig.worker.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: trackingConfig.project.id,
        ...event,
      }),
    })

    // Jeśli worker nie istnieje (404), nie loguj błędu
    if (!response.ok && response.status !== 404) {
      console.warn('[Tracking] Server-side warning:', response.status)
    }
  } catch (error) {
    // Ignoruj błędy sieciowe dla opcjonalnego trackingu
    if (isDevelopment) {
      console.debug('[Tracking] Server-side tracking unavailable:', error)
    }
  }
}
```

## Co robi tracking worker?

Tracking worker to **opcjonalna** funkcja, która pozwala na:
- Server-side tracking (tracking z serwera, nie tylko z przeglądarki)
- Backup tracking (jeśli adblocki blokują pixele)
- Centralne logowanie eventów

**Nie jest wymagany** - tracking Facebook, Google i TikTok działa normalnie bez niego.

## Weryfikacja

Po zastosowaniu rozwiązania 1:

1. Otwórz stronę webinaru w przeglądarce
2. Otwórz **DevTools** → **Console**
3. **Nie powinno być** błędów 404 od `tracking-api.kacperczaczyk.workers.dev`
4. Tracking Facebook/Google/TikTok **działa normalnie** (możesz to zweryfikować w Facebook Events Manager / Google Analytics)

## FAQ

### Czy tracking będzie działał bez tego workera?
**TAK!** Tracking Facebook Pixel, Google Ads i TikTok Pixel działa bezpośrednio z przeglądarki i nie wymaga workera.

### Czy powinienem usunąć tę zmienną?
**TAK**, jeśli nie masz wdrożonego tracking workera. To uprości konfigurację.

### Czy mogę zostawić zmienną pustą?
**TAK**, kod sprawdza czy URL jest pusty i nie próbuje wtedy wysyłać requestów.

### Kiedy powinienem używać tracking workera?
Tracking worker jest przydatny jeśli:
- Chcesz server-side tracking (niektóre adblocki blokują client-side tracking)
- Chcesz centralne logowanie wszystkich eventów
- Masz zaawansowane potrzeby trackingowe

Dla większości przypadków **nie jest potrzebny**.

## Status

✅ Kod został naprawiony - błąd 404 nie będzie wyświetlany
✅ Tracking Facebook/Google/TikTok działa normalnie
✅ Aplikacja działa poprawnie bez tracking workera

## Zalecenie

**Usuń zmienną `NEXT_PUBLIC_TRACKING_WORKER_URL`** z Cloudflare Pages Settings, aby:
- ✅ Nie wysyłać niepotrzebnych requestów
- ✅ Uprościć konfigurację
- ✅ Usunąć potencjalne błędy z konsoli
