import { trackingConfig, isDevelopment } from './tracking-config'

// Types
export interface TrackingEvent {
  event_name: string
  event_category?: string
  event_label?: string
  value?: number
  currency?: string
  content_name?: string
  content_category?: string
  email?: string
  phone?: string
}

// Helper: Check if we should track in current environment
const shouldTrack = (): boolean => {
  if (typeof window === 'undefined') return false
  if (isDevelopment && !trackingConfig.dev.enableTracking) {
    return false
  }
  return true
}

// Helper: Log event in development
const logEvent = (platform: string, event: TrackingEvent) => {
  if (isDevelopment) {
    console.log(`[Tracking ${platform}] ${trackingConfig.dev.enableTracking ? 'Sending' : 'Dev mode'} - event:`, event)
  }
}

// Facebook Pixel
const trackFacebook = (eventName: string, params: Record<string, any> = {}) => {
  if (!shouldTrack()) {
    logEvent('Facebook', { event_name: eventName, ...params })
    return
  }

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params)
    logEvent('Facebook', { event_name: eventName, ...params })
  }
}

// Google Ads
const trackGoogle = (eventName: string, params: Record<string, any> = {}) => {
  if (!shouldTrack()) {
    logEvent('Google', { event_name: eventName, ...params })
    return
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      send_to: trackingConfig.google.adsId,
      ...params,
    })
    logEvent('Google', { event_name: eventName, ...params })
  }
}

// TikTok Pixel
const trackTikTok = (eventName: string, params: Record<string, any> = {}) => {
  if (!shouldTrack()) {
    logEvent('TikTok', { event_name: eventName, ...params })
    return
  }

  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track(eventName, params)
    logEvent('TikTok', { event_name: eventName, ...params })
  }
}

// Server-side tracking (optional, jeśli masz Cloudflare Worker)
const trackServerSide = async (event: TrackingEvent) => {
  if (!trackingConfig.worker.url) return

  try {
    await fetch(trackingConfig.worker.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: trackingConfig.project.id,
        ...event,
      }),
    })
  } catch (error) {
    console.error('[Tracking] Server-side error:', error)
  }
}

// Main Tracking Functions
export const tracking = {
  // PageView - automatyczne przy załadowaniu strony
  pageView: (pagePath?: string) => {
    const path = pagePath || (typeof window !== 'undefined' ? window.location.pathname : '')

    trackFacebook('PageView', { page_path: path })
    trackGoogle('page_view', { page_path: path })
    trackTikTok('PageView', { page_path: path })

    if (trackingConfig.worker.url) {
      trackServerSide({ event_name: 'PageView', content_name: path })
    }
  },

  // ViewContent - oglądanie konkretnego contentu
  viewContent: (contentName: string, contentCategory?: string, value?: number) => {
    const params = {
      content_name: contentName,
      content_category: contentCategory,
      value: value,
      currency: 'PLN',
    }

    trackFacebook('ViewContent', params)
    trackGoogle('view_item', params)
    trackTikTok('ViewContent', params)

    if (trackingConfig.worker.url) {
      trackServerSide({ event_name: 'ViewContent', ...params })
    }
  },

  // Lead - zapisanie się na webinar (NAJWAŻNIEJSZY EVENT)
  lead: (email: string, contentName?: string) => {
    const params = {
      email: email,
      content_name: contentName || 'Webinar Signup',
      value: 0, // Lead bez wartości finansowej
      currency: 'PLN',
    }

    trackFacebook('Lead', params)
    trackGoogle('generate_lead', params)
    trackTikTok('SubmitForm', params)

    if (trackingConfig.worker.url) {
      trackServerSide({ event_name: 'Lead', ...params })
    }
  },

  // InitiateCheckout - rozpoczęcie procesu zakupu (na przyszłość, jeśli będą płatne pakiety)
  initiateCheckout: (contentName: string, value: number) => {
    const params = {
      content_name: contentName,
      value: value,
      currency: 'PLN',
    }

    trackFacebook('InitiateCheckout', params)
    trackGoogle('begin_checkout', params)
    trackTikTok('InitiateCheckout', params)

    if (trackingConfig.worker.url) {
      trackServerSide({ event_name: 'InitiateCheckout', ...params })
    }
  },

  // Purchase - zakończony zakup (na przyszłość)
  purchase: (orderId: string, value: number, contentName?: string) => {
    const params = {
      transaction_id: orderId,
      value: value,
      currency: 'PLN',
      content_name: contentName,
    }

    trackFacebook('Purchase', params)
    trackGoogle('purchase', params)
    trackTikTok('CompletePayment', params)

    if (trackingConfig.worker.url) {
      trackServerSide({ event_name: 'Purchase', ...params })
    }
  },
}
