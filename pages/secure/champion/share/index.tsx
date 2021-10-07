import { GetServerSideProps } from 'next'
import React from 'react'
import { trackCategory } from '@/utils/analytics'
import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { AuthPageCard, MainContainer, PageBreadcrumbs } from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS,
  ROUTE_SECURE_CHAMPION_SHARE_SOCIAL,
} from '@/constants/config'
import { Paragraph } from '@/components/Paragraph'
import { ActionButtonCard } from '@/components/Card/ActionButtonCard'
import {
  CreateEmail as SvgCreateEmail,
  CreateSocialPost as SvgCreateSocialPost,
} from '@/generated/svgs'
import { emailBuilderBreadcrumb1 } from '@/constants/breadcrumbs/emailBuilder'
import { useRouter } from 'next/router'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

const SecureChampionShare: React.FC<BaseSecurePageProps> = ({
  accessToken: accessTokenServer,
  me,
  redirectUrl,
}) => {
  const { accessToken } = useAuth({ accessTokenServer, redirectUrl })
  if (!accessToken || !me) {
    return null
  }
  const router = useRouter()
  const onClickCreateEmail = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Share Your Story Build An Email',
        eventCategory: 'Share Your Story',
        clickID: 'share-your-story-build-an-email-selected',
      },
    })
    router.push(ROUTE_SECURE_CHAMPION_SHARE_EMAILS)
  }
  const onClickCreateSocial = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Share Your Story Build A Social Media Post',
        eventCategory: 'Share Your Story',
        clickID: 'share-your-story-build-a-social-media-post-selected',
      },
    })
    router.push(ROUTE_SECURE_CHAMPION_SHARE_SOCIAL)
  }
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        isFullWidth
        me={me}
        showSidebar
        title="Champion Share | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/share"
      >
        <PageBreadcrumbs>
          <Breadcrumb
            items={[emailBuilderBreadcrumb1]}
            currentItemName={emailBuilderBreadcrumb1.name}
            style={{ justifyContent: 'flex-start' }}
          />
        </PageBreadcrumbs>
        <MainContainer>
          <AuthPageCard maxWidth="555px">
            <div style={{ textAlign: 'center' }}>
              <h2>Share your story</h2>
              <Paragraph>
                Use our existing tempate or edit it to make it your own
              </Paragraph>
            </div>
            <ActionButtonCard
              renderIcon={(p) => <SvgCreateEmail {...p} />}
              onClick={onClickCreateEmail}
              shortDescription="Personalized, direct messages to your network"
              style={{ marginBottom: '1rem', marginTop: '1rem' }}
              title="Build an email"
              titleTag="Most effective!"
            />
            <ActionButtonCard
              renderIcon={(p) => <SvgCreateSocialPost {...p} />}
              onClick={onClickCreateSocial}
              shortDescription="Get support from a wider audience on social media"
              style={{ marginTop: '1rem' }}
              title="Build a social media post"
            />
          </AuthPageCard>
        </MainContainer>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps({
      context,
    })
  return { props: { ...fetchResult, accessToken, redirectUrl } }
}

export default SecureChampionShare
