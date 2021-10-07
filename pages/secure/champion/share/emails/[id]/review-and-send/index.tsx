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
  emailBuilderBreadcrumb4,
} from '@/constants/breadcrumbs/emailBuilder'
import { EmailReview } from '@/components/EmailReview'
import { CancelButton } from '@/components/Form/SubmitButton'
import { useRouter } from 'next/router'
import { ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW } from '@/constants/config'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

const maxWidth = '816px'

const SecureChampionShareEmailReviewAndSend: React.FC<BaseSecurePageProps> = ({
  accessToken: accessTokenServer,
  me,
  redirectUrl,
}) => {
  const { accessToken } = useAuth({ accessTokenServer, redirectUrl })
  if (!accessToken || !me) {
    return null
  }
  const router = useRouter()
  const { id: idQuery } = router.query
  const id = Array.isArray(idQuery) ? idQuery[0] : idQuery
  const onClickCancelEmail = () => {
    router.push(ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW.replace('[id]', id))
  }
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
        url={`https://kernls.com/secure/champion/share/emails/${id}/review-and-send`}
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
              {
                ...emailBuilderBreadcrumb4,
                linkUrl: emailBuilderBreadcrumb4.linkUrl.replace('[id]', id),
              },
            ]}
            currentItemName={emailBuilderBreadcrumb4.name}
            style={{ justifyContent: 'flex-start' }}
          />
          <PageBreadcumbsActionItems>
            <CancelButton onClick={onClickCancelEmail} role="button">
              Cancel
            </CancelButton>
          </PageBreadcumbsActionItems>
        </PageBreadcrumbs>
        <EmailReview id={id} me={me} style={{ marginTop: '2rem', maxWidth }} />
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

export default SecureChampionShareEmailReviewAndSend
