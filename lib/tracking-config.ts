// Tracking Configuration
// Wszystkie ID są publiczne (widoczne w source code)

export const trackingConfig = {
  facebook: {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '328860071729858',
  },
  google: {
    adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-405660852',
  },
  tiktok: {
    pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || 'CQ762UBC77U6L0AM30HG',
  },
  project: {
    id: process.env.NEXT_PUBLIC_PROJECT_ID || 'webinary-blackfriday',
  },
  worker: {
    url: process.env.NEXT_PUBLIC_TRACKING_WORKER_URL || '',
  },
  dev: {
    enableTracking: process.env.NEXT_PUBLIC_ENABLE_DEV_TRACKING === 'true',
  },
}

export const isDevelopment = process.env.NODE_ENV === 'development'
