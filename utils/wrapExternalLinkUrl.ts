// import { LOCAL_STORAGE_KEY_QUERY } from '@/constants/config'

export const wrapExternalLinkUrl = (url: string): string => {
  return url
  // const queryParams = JSON.parse(
  //   window.localStorage.getItem(LOCAL_STORAGE_KEY_QUERY) || ''
  // )
  // const query = queryParams || {}

  // return Object.keys(query)
  //   .filter(
  //     (key) =>
  //       key === 'utm_medium' || key === 'utm_source' || key === 'utm_campaign'
  //   )
  //   .reduce((acc, key) => {
  //     const value = query[key]
  //     if (value && acc === url) {
  //       return `${acc}?${key}=${value}`
  //     }
  //     if (value && acc !== url) {
  //       return `${acc}&${key}=${value}`
  //     }

  //     return acc
  //   }, url)
}
