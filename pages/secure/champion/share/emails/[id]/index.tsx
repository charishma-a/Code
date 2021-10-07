import { GetServerSideProps } from 'next'
import React from 'react'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { PageBreadcrumbs, PageBreadcumbsActionItems } from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  emailBuilderBreadcrumb1,
  emailBuilderBreadcrumb2,
  emailBuilderBreadcrumb3,
} from '@/constants/breadcrumbs/emailBuilder'
import { EmailView } from '@/components/EmailView'
import { Button, SecondaryButton } from '@/components/Form/SubmitButton'
import { useRouter } from 'next/router'
import {
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_EDIT,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW,
} from '@/constants/config'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'
import { SizeRestrict } from '@/components/SizeRestrict'
import { useWindowSize } from '@/hooks/useWindowSize'
import { device } from '@/utils/device'

const maxWidth = '672px'

const SecureChampionShareEmail: React.FC<BaseSecurePageProps> = ({
  accessToken: accessTokenServer,
  me,
  redirectUrl,
}) => {
  const { accessToken } = useAuth({ accessTokenServer, redirectUrl })
  const windowSize = useWindowSize()
  if (!accessToken || !me) {
    return null
  }

  const router = useRouter()
  const { id: idQuery } = router.query
  const id = Array.isArray(idQuery) ? idQuery[0] : idQuery
  const onClickEditEmail = () => {
    router.push(ROUTE_SECURE_CHAMPION_SHARE_EMAILS_EDIT.replace('[id]', id))
  }
  const onClickReviewEmail = () => {
    router.push(ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW.replace('[id]', id))
  }
  const actionItemsDisplay =
    windowSize.width >= parseInt(device.tablet.replace('px', ''), 10)
      ? 'flex'
      : 'none'
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        isFullWidth
        me={me}
        showHeader={false}
        showSidebar={false}
        title="Champion Share Email | Kernls"
        twitterImage=""
        url={`https://kernls.com/secure/champion/share/emails/${id}`}
      >
        <PageBreadcrumbs>
          <Breadcrumb
            items={[
              emailBuilderBreadcrumb1,
              emailBuilderBreadcrumb2,
              {
                ...emailBuilderBreadcrumb3,
                linkUrl: emailBuilderBreadcrumb3.linkUrl.replace('[id]', id),
              },
            ]}
            currentItemName={emailBuilderBreadcrumb3.name}
            style={{ justifyContent: 'flex-start' }}
          />
          <PageBreadcumbsActionItems style={{ display: actionItemsDisplay }}>
            <SecondaryButton onClick={onClickEditEmail} role="button">
              Edit email
            </SecondaryButton>
            <Button onClick={onClickReviewEmail} role="button">
              Review and send
            </Button>
          </PageBreadcumbsActionItems>
        </PageBreadcrumbs>
        <SizeRestrict>
          <EmailView id={id} me={me} style={{ marginTop: '2rem', maxWidth }} />
        </SizeRestrict>
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

export default SecureChampionShareEmail
