import { GetServerSideProps } from 'next'
import React from 'react'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { LayoutAuth } from '@/components/LayoutAuth'
import { AuthPageCard, PageBreadcrumbs } from '@/common/styled'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { Paragraph } from '@/components/Paragraph'
import { ChampionOnboardingStepOneForm } from '@/components/Form/ChampionOnboardingStepOneForm'
import {
  Maybe,
  PageOnboardingStepOneDocument,
  Profile,
  Project,
} from '@/generated/graphql'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  onboardingChampionBreadcrumb1,
  onboardingChampionBreadcrumbs,
} from '@/constants/breadcrumbs/onboardingChampionBreadcrumbs'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

interface PageFetchResult {
  me: Maybe<Profile>
  projects: Project[]
}

const SecureChampionOnboardingStepOne: React.FC<
  BaseSecurePageProps & PageFetchResult
> = ({ accessToken, me, projects, redirectUrl }) => {
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
        url="https://kernls.com/secure/champion/onboarding/project-donation-match"
      >
        <PageBreadcrumbs justifyCenter>
          <Breadcrumb
            items={onboardingChampionBreadcrumbs}
            currentItemName={onboardingChampionBreadcrumb1.name}
          />
        </PageBreadcrumbs>
        <AuthPageCard maxWidth="596px">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>
              Project selection and donation match
            </h2>
            <Paragraph>Confirm or edit the details below.</Paragraph>
          </div>
          <ChampionOnboardingStepOneForm me={me} projects={projects} />
        </AuthPageCard>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps<{ me: Maybe<Profile>; projects: Project[] }>({
      context,
      requestDocument: PageOnboardingStepOneDocument,
      requestVariables: { projectIds: [] },
      shouldRedirectOnboardingUrl: false,
    })
  return { props: { accessToken, ...fetchResult, redirectUrl } }
}

export default SecureChampionOnboardingStepOne
