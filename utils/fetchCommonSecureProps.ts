import { GetServerSidePropsContext } from 'next'
import { DocumentNode } from 'graphql'
import { request } from 'graphql-request'
import { ParsedUrlQuery } from 'querystring'

import { fetchAccessToken } from './fetchAccessToken'
import {
  getAuthRedirect,
  ProfileChampionOnboardingStepSlug,
} from './getAuthRedirect'
import { isServer } from './isServer'

import { ROUTE_CHAMPION_LOGIN } from '@/constants/config'
import { getFetchOnServerConfig } from '@/lib/getFetchOnServerConfig'
import { Maybe, MeDocument, Profile } from '@/generated/graphql'

export interface FetchCommonSecurePropsFetchResult {
  me: Maybe<Profile>
}
export const fetchCommonSecureProps = async <
  T extends FetchCommonSecurePropsFetchResult
>({
  context,
  requestDocument = MeDocument,
  requestVariables = null,
  shouldFetchRequest = true,
  shouldRedirectOnboardingUrl,
}: {
  context: GetServerSidePropsContext<ParsedUrlQuery>
  requestDocument?: DocumentNode
  requestVariables?: { [key: string]: any }
  shouldFetchRequest?: boolean
  shouldRedirectOnboardingUrl?: boolean
}): Promise<{
  accessToken: string
  fetchResult: T
  redirectUrl: string
}> => {
  const accessToken = await fetchAccessToken(context)
  if (!accessToken) {
    return { accessToken, fetchResult: null, redirectUrl: ROUTE_CHAMPION_LOGIN }
  }
  let redirectUrl = ''
  let fetchResult: T = null
  // fetch user data if logged in and on server
  if (shouldFetchRequest && isServer()) {
    const { req } = context
    const { baseServerUrl, ...restConfig } = getFetchOnServerConfig({
      accessToken,
      cookie: req.headers.cookie,
    })
    fetchResult = await request(
      baseServerUrl,
      requestDocument,
      requestVariables,
      {
        ...restConfig.headers,
      }
    )
    if (!fetchResult.me) {
      redirectUrl = ROUTE_CHAMPION_LOGIN
    } else {
      const onboardingStep = fetchResult.me.profileChampion.onboardingStep
        ?.slug as ProfileChampionOnboardingStepSlug
      redirectUrl = getAuthRedirect({
        accessToken,
        onboardingStep,
        isSalesRequired: fetchResult.me.isSalesRequired,
        isVerified: !!fetchResult.me.verifiedAt,
        shouldRedirectOnboardingUrl,
        shouldRedirectAuthUrl: false,
      })
    }
  }
  if (!isServer()) {
    if (redirectUrl === window.location.pathname) {
      redirectUrl = ''
    }
  }

  return { accessToken, fetchResult, redirectUrl }
}
