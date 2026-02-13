/**
 * Tracking via Cloudflare Zaraz
 *
 * Zaraz handles loading FB Pixel, Google Ads, TikTok and Conversion API.
 * We only fire custom events through zaraz.track().
 * PageView is handled automatically by Zaraz.
 */

declare global {
  interface Window {
    zaraz?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void
      ecommerce: (eventName: string, properties?: Record<string, unknown>) => void
    }
  }
}

function zarazTrack(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.zaraz) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Zaraz] Dev mode - event:', eventName, properties)
    }
    return
  }
  try {
    window.zaraz.track(eventName, properties)
  } catch (error) {
    console.error('[Zaraz] Tracking error:', error)
  }
}

export const tracking = {
  pageView: (pagePath?: string) => {
    // PageView is handled automatically by Zaraz
  },

  viewContent: (contentName: string, contentCategory?: string, value?: number) => {
    zarazTrack('ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value,
      currency: 'PLN',
    })
  },

  lead: (email: string, contentName?: string) => {
    zarazTrack('Lead', {
      content_name: contentName || 'Webinar Signup',
      currency: 'PLN',
    })
  },

  initiateCheckout: (contentName: string, value: number) => {
    zarazTrack('InitiateCheckout', {
      content_name: contentName,
      value,
      currency: 'PLN',
    })
  },

  purchase: (orderId: string, value: number, contentName?: string) => {
    zarazTrack('Purchase', {
      content_name: contentName,
      value,
      currency: 'PLN',
      order_id: orderId,
    })
  },
}
