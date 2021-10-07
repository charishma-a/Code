import { GetServerSideProps } from 'next'
import React from 'react'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { LayoutAuth } from '@/components/LayoutAuth'
import { AuthPageCard, PageBreadcrumbs } from '@/common/styled'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { Maybe, Profile } from '@/generated/graphql'
import { Paragraph } from '@/components/Paragraph'
import { Button } from '@/components/Form/SubmitButton'
import { useRouter } from 'next/router'
import { ROUTE_SECURE_CHAMPION_DASHBOARD } from '@/constants/config'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  tellThreeFriendsBreadcrumbs,
  tellThreeFriendsBreadcrumb2,
} from '@/constants/breadcrumbs/tellThreeFriends'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

interface PageFetchResult {
  me: Maybe<Profile>
}

const SecureChampionOnboardingStepThreeSuccess: React.FC<
  BaseSecurePageProps & PageFetchResult
> = ({ accessToken, me, redirectUrl }) => {
  useSetAccessToken({ accessToken, redirectUrl })
  if (!accessToken) {
    return null
  }
  const router = useRouter()
  const goToDashboard = () => {
    router.push(ROUTE_SECURE_CHAMPION_DASHBOARD)
  }
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        title="Champion onboarding share | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/onboarding/tell-3-friends/success"
      >
        <PageBreadcrumbs justifyCenter>
          <Breadcrumb
            items={tellThreeFriendsBreadcrumbs}
            currentItemName={tellThreeFriendsBreadcrumb2.name}
          />
        </PageBreadcrumbs>
        <AuthPageCard maxWidth="596px">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>
              Congratulations, {me.firstName}! You sent your first email!
            </h2>
            <Paragraph>
              Don’t stop now! Having an impact means getting the word out. Go to
              your dashboard to send out more emails, share posts on social
              media and monitor the progress of your campaign.{' '}
            </Paragraph>
            <Button
              onClick={goToDashboard}
              type="button"
              style={{ marginTop: '1rem' }}
            >
              Go to dashboard
            </Button>
          </div>
        </AuthPageCard>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps({
      context,
      shouldRedirectOnboardingUrl: false,
    })
  return { props: { accessToken, ...fetchResult, redirectUrl } }
}

export default SecureChampionOnboardingStepThreeSuccess
