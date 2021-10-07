import { getFetchOnServerConfig } from '@/lib/getFetchOnServerConfig'
import { getAccessToken } from '@/store/accessToken'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { isServer } from './isServer'

export const fetchAccessToken = async ({
  req,
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<string> => {
  // getAccessToken, will not be set on page ssr
  // meaning will refresh token every page visit
  let accessToken = getAccessToken()
  if (!accessToken) {
    if (isServer()) {
      const { baseServerUrl, ...restConfig } = getFetchOnServerConfig({
        accessToken,
        cookie: req.headers.cookie,
      })
      const res = await fetch(`${baseServerUrl}/auth/refresh_token`, {
        ...restConfig,
        method: 'POST',
      })
      const body = await res.json()
      accessToken = body.accessToken

      return body.accessToken
    }
  }
  // client
  return accessToken
}
