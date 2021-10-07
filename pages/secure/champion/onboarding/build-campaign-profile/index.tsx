import { GetServerSideProps } from 'next'
import React from 'react'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { LayoutAuth } from '@/components/LayoutAuth'
import { AuthPageCard, PageBreadcrumbs } from '@/common/styled'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { Paragraph } from '@/components/Paragraph'
import { ChampionOnboardingStepTwoForm } from '@/components/Form/ChampionOnboardingStepTwoForm'
import {
  Maybe,
  PageOnboardingStepTwoDocument,
  Profile,
} from '@/generated/graphql'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  onboardingChampionBreadcrumbs,
  onboardingChampionBreadcrumb2,
} from '@/constants/breadcrumbs/onboardingChampionBreadcrumbs'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

interface PageFetchResult {
  me: Maybe<Profile>
}

const SecureChampionOnboardingStepTwo: React.FC<
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
        title="Champion onboarding | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/onboarding/build-campaign-profile"
      >
        <PageBreadcrumbs justifyCenter>
          <Breadcrumb
            items={onboardingChampionBreadcrumbs}
            currentItemName={onboardingChampionBreadcrumb2.name}
          />
        </PageBreadcrumbs>
        <AuthPageCard maxWidth="596px">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>
              Build your campaign profile
            </h2>
            <Paragraph>
              Your profile will appear on the project page, but don’t worry you
              can make edits in your profile settings.
            </Paragraph>
          </div>
          <ChampionOnboardingStepTwoForm me={me} />
        </AuthPageCard>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps<{ me: Maybe<Profile> }>({
      context,
      requestDocument: PageOnboardingStepTwoDocument,
      requestVariables: { relations: ['files'] },
      shouldRedirectOnboardingUrl: false,
    })
  return { props: { accessToken, ...fetchResult, redirectUrl } }
}

export default SecureChampionOnboardingStepTwo
