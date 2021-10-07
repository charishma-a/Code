import { GetServerSideProps } from 'next'
import React from 'react'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { LayoutAuth } from '@/components/LayoutAuth'
import { AuthPageCard, PageBreadcrumbs } from '@/common/styled'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { Paragraph } from '@/components/Paragraph'
import { ChampionOnboardingStepThreeForm } from '@/components/Form/ChampionOnboardingStepThreeForm'
import {
  Maybe,
  PageOnboardingStepThreeDocument,
  Profile,
} from '@/generated/graphql'
import {
  tellThreeFriendsBreadcrumb1,
  tellThreeFriendsBreadcrumbs,
} from '@/constants/breadcrumbs/tellThreeFriends'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

interface PageFetchResult {
  me: Maybe<Profile>
}

const SecureChampionOnboardingStepThree: React.FC<
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
        url="https://kernls.com/secure/champion/onboarding/tell-3-friends"
      >
        <PageBreadcrumbs justifyCenter>
          <Breadcrumb
            items={tellThreeFriendsBreadcrumbs}
            currentItemName={tellThreeFriendsBreadcrumb1.name}
          />
        </PageBreadcrumbs>
        <AuthPageCard maxWidth="816px">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>
              Tell 3 of your closest friends
            </h2>
            <Paragraph>
              Sharing your goal with close family and friends makes you
              accountable to it and keeps you motivated. You’ll be able to send
              more emails from your dashboard!
            </Paragraph>
          </div>
          <ChampionOnboardingStepThreeForm me={me} />
        </AuthPageCard>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps<{ me: Maybe<Profile> }>({
      context,
      requestDocument: PageOnboardingStepThreeDocument,
      shouldRedirectOnboardingUrl: false,
    })
  return { props: { accessToken, ...fetchResult, redirectUrl } }
}

export default SecureChampionOnboardingStepThree
