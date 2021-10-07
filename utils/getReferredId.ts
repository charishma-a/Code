import { ParsedUrlQuery } from 'querystring'
import { isServer } from './isServer'
import { getQueryParams } from '@/store/queryParams'

export const getReferredId = ({ query }: { query: ParsedUrlQuery }): string => {
  const { referredId: referredIdParams } = query

  let referredId = Array.isArray(referredIdParams)
    ? referredIdParams[0]
    : referredIdParams

  if (!referredId && !isServer()) {
    const localQueryParams = getQueryParams()
    referredId = localQueryParams.referredId
  }
  return referredId
}
