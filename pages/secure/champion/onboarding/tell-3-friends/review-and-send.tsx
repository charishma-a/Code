import { GetServerSideProps } from 'next'
import React from 'react'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { LayoutAuth } from '@/components/LayoutAuth'
import { AuthPageCard, PageBreadcrumbs } from '@/common/styled'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { ChampionOnboardingStepThreeReviewForm } from '@/components/Form/ChampionOnboardingStepThreeReviewForm'
import {
  Maybe,
  PageOnboardingStepThreeReviewDocument,
  Profile,
} from '@/generated/graphql'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  tellThreeFriendsBreadcrumbs,
  tellThreeFriendsBreadcrumb2,
} from '@/constants/breadcrumbs/tellThreeFriends'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

interface PageFetchResult {
  me: Maybe<Profile>
}

const SecureChampionOnboardingStepThreeReview: React.FC<
  BaseSecurePageProps & PageFetchResult
> = ({ accessToken, me, redirectUrl }) => {
  useSetAccessToken({ accessToken, redirectUrl })
  if (!accessToken) {
    return null
  }
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        title="Champion onboarding share | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/onboarding/tell-3-friends/review-and-send"
      >
        <PageBreadcrumbs justifyCenter>
          <Breadcrumb
            items={tellThreeFriendsBreadcrumbs}
            currentItemName={tellThreeFriendsBreadcrumb2.name}
          />
        </PageBreadcrumbs>
        <AuthPageCard maxWidth="816px">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Review and send</h2>
          </div>
          <ChampionOnboardingStepThreeReviewForm me={me} />
        </AuthPageCard>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps<{ me: Maybe<Profile> }>({
      context,
      requestDocument: PageOnboardingStepThreeReviewDocument,
      shouldRedirectOnboardingUrl: false,
    })
  return { props: { accessToken, ...fetchResult, redirectUrl } }
}

export default SecureChampionOnboardingStepThreeReview
