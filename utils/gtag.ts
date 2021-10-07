// https://medium.com/frontend-digest/using-nextjs-with-google-analytics-and-typescript-620ba2359dea

import { GA_TRACKING_ID, __prod__ } from '@/constants/config'

declare global {
  interface Window {
    gtag: SegmentAnalytics.AnalyticsJS
    _hsq: [any]
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  if (__prod__) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (__prod__) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
