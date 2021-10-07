import { getQueryParams } from '@/store/queryParams'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import { __prod__ } from '../constants/config'
import { getQueryParam } from './getQueryParam'
import * as gtag from './gtag'

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS
    _hsq: [any]
  }
}

interface IdentifyProps {
  userId?: string
  traits?: { email: string; [key: string]: any }
}

function setCampaignParams() {
  const campaign_keywords =
    'utm_source utm_medium utm_campaign utm_content utm_term'.split(' ')
  let kw = ''
  const params = {}
  const first_params = {}
  let index: number
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index])
    if (kw.length) {
      params[campaign_keywords[index] + ' [last touch]'] = kw
    }
  }
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index])
    if (kw.length) {
      first_params[campaign_keywords[index] + ' [first touch]'] = kw
    }
  }
  mixpanel.people.set(params)
  mixpanel.people.set_once(first_params)
  mixpanel.register(params)
}

const logAnalytics = (prefix: string, mixpanel: Mixpanel) => {
  if (!__prod__) {
    console.error(
      `${prefix} mixpanel.get_distinct_id()`,
      mixpanel.get_distinct_id()
    )
    console.error(
      `${prefix} mixpanel.get_property($user_id)`,
      mixpanel.get_property('$user_id')
    )
    console.error(
      `${prefix} mixpanel.get_property($firstname)`,
      mixpanel.get_property('$firstname')
    )
    console.error(
      `${prefix} mixpanel.get_property(firstname)`,
      mixpanel.get_property('firstname')
    )
    console.error(
      `${prefix} mixpanel.get_property($lastname)`,
      mixpanel.get_property('$lastname')
    )
    console.error(
      `${prefix} mixpanel.get_property(lastname)`,
      mixpanel.get_property('lastname')
    )
    console.error(
      `${prefix} mixpanel.get_property($email)`,
      mixpanel.get_property('$email')
    )
    console.error(
      `${prefix} mixpanel.get_property(email)`,
      mixpanel.get_property('email')
    )
    console.error(
      `${prefix} mixpanel.get_property(verified)`,
      mixpanel.get_property('verified')
    )
  }
}

export const init = (): void => {
  try {
    if (typeof window !== 'undefined') {
      mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN, {
        loaded: function (mixpanel) {
          logAnalytics('init', mixpanel)
        },
      })
      setCampaignParams()
    }
  } catch (err) {
    console.error('analytics identify err: ', err.message)
  }
}

export const identify = (props: IdentifyProps): void => {
  try {
    const { userId, traits } = props

    if (typeof window !== 'undefined') {
      if (traits?.email) {
        const { firstName, lastName, email, ...restTraits } = traits
        mixpanel.people.set({
          $first_name: firstName,
          $last_name: lastName,
          $email: email,
          ...restTraits,
        })
      }
      if (userId) {
        mixpanel.identify(userId)
      }

      if (__prod__) {
        if (window._hsq && Array.isArray(window._hsq) && traits?.email) {
          if (userId && traits?.email) {
            window._hsq.push([
              'identify',
              {
                ...traits,
                id: userId,
              },
            ])
          } else if (traits?.email) {
            window._hsq.push(['identify', traits])
          } else if (userId) {
            window._hsq.push(['identify', { id: userId }])
          }
        }
      }
    }
  } catch (err) {
    console.error('analytics identify err: ', err.message)
  }
}

export const hotspotPage = (): void => {
  try {
    if (
      typeof window !== 'undefined' &&
      window.location &&
      window._hsq &&
      Array.isArray(window._hsq) &&
      __prod__
    ) {
      window._hsq.push(['setPath', window.location.pathname])
      window._hsq.push(['trackPageView'])
    }
  } catch (err) {
    console.error('analytics hotspotPage err: ', err.message)
  }
}

export const page = ({
  trackGa = true,
  url,
}: {
  trackGa?: boolean
  url?: URL
}): void => {
  try {
    if (typeof window !== 'undefined') {
      const queryParams = getQueryParams()
      // google analytics
      if (trackGa) {
        gtag.pageview(url)
      }

      // mixpanel
      const { href, pathname, search } = window.location
      mixpanel.track('Loaded a Page', {
        name: href,
        path: pathname,
        referrer: document.referrer,
        search,
        title: document.title,
        url: href,
        ...queryParams,
      })

      // hotspot
      hotspotPage()
    }
  } catch (err) {
    console.error('analytics page err: ', err.message)
  }
}

export interface TrackProperties {
  event: string
  properties?: { [key: string]: any }
}

// DO NOT AWAIT UNTIL DONE, DUCKDUCKGO BLOCKS THIS FROM EVER RESOLVING
export const track = (props: TrackProperties): void => {
  try {
    if (typeof window !== 'undefined') {
      const { event, properties } = props
      const queryParams = getQueryParams()
      logAnalytics('track', mixpanel)
      mixpanel.track(event, {
        ...queryParams,
        ...properties,
      })
    }
  } catch (err) {
    console.error('analytics track err: ', err.message)
  }
}

export interface EventProperties {
  eventAction: string
  eventCategory: string
  clickID: string
  clickText?: string
}

export interface TrackComposedProperties {
  eventProps: EventProperties
  extra?: {
    [key: string]: any
  }
}

export const trackCategory = (props: TrackComposedProperties): void => {
  const { eventProps, extra = {} } = props
  const { eventAction, eventCategory, clickID, clickText } = eventProps

  return track({
    event: eventAction,
    properties: {
      ...extra,
      eventAction,
      eventCategory,
      clickID,
      clickText,
    },
  })
}
