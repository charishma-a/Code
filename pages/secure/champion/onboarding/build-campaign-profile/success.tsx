import { GetServerSideProps } from 'next'
import React from 'react'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { LayoutAuth } from '@/components/LayoutAuth'
import { AuthPageCard, PageBreadcrumbs } from '@/common/styled'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { Paragraph } from '@/components/Paragraph'
import {
  Maybe,
  PageOnboardingStepTwoSuccessDocument,
  Profile,
} from '@/generated/graphql'
import { ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3 } from '@/constants/config'
import styled from 'styled-components'
import { ChampionCard } from '@/components/ChampionCard'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { useRouter } from 'next/router'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  onboardingChampionBreadcrumbs,
  onboardingChampionBreadcrumb3,
} from '@/constants/breadcrumbs/onboardingChampionBreadcrumbs'
import { genProjectPageUrl } from '@/utils/getProjectPageUrl'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'
import { trackCategory } from '@/utils/analytics'
export const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const Wrapper = styled.div`
  a {
    color: blue !important;
  }
`

interface PageFetchResult {
  me: Maybe<Profile>
}

const SecureChampionOnboardingStepTwoSuccess: React.FC<
  BaseSecurePageProps & PageFetchResult
> = ({ accessToken, me, redirectUrl }) => {
  useSetAccessToken({ accessToken, redirectUrl })
  if (!accessToken) {
    return null
  }
  const router = useRouter()

  const onClick = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Tell 3 Friends Review And Send',
        eventCategory: 'Tell 3 Friends',
        clickID: 'review-and-send-tell-3-friends-button-click',
      },
    })
    router.push(ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3)
  }
  const projectUrl = me
    ? genProjectPageUrl({
        profileId: me.id,
        projectSlug: me.projectChampion.project.slug,
        isWithReferred: true,
      })
    : ''
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        title="Champion onboarding | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/onboarding/build-campaign-profile/success"
      >
        <PageBreadcrumbs justifyCenter>
          <Breadcrumb
            items={onboardingChampionBreadcrumbs}
            currentItemName={onboardingChampionBreadcrumb3.name}
          />
        </PageBreadcrumbs>
        <AuthPageCard maxWidth="596px">
          <Wrapper>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>
                Your profile is{' '}
                <a href={projectUrl} target="_blank" rel="noreferrer">
                  live on the project page!
                </a>
              </h2>
              <Paragraph>
                Your profile will appear on the project page, but don’t worry
                you can make edits in your profile settings.
              </Paragraph>
            </div>
            <Container>
              <ChampionCard {...me.projectChampion} profile={me} />

              <SubmitButton
                onClick={onClick}
                type="button"
                style={{ marginTop: '2rem' }}
              >
                Next: Tell 3 friends
              </SubmitButton>
            </Container>
          </Wrapper>
        </AuthPageCard>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps<{ me: Maybe<Profile> }>({
      context,
      requestDocument: PageOnboardingStepTwoSuccessDocument,
      shouldRedirectOnboardingUrl: false,
    })
  return { props: { accessToken, ...fetchResult, redirectUrl } }
}

export default SecureChampionOnboardingStepTwoSuccess
