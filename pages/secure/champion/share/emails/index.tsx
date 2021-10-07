import { GetServerSideProps } from 'next'
import React from 'react'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { MainContainer, PageBreadcrumbs } from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  emailBuilderBreadcrumb1,
  emailBuilderBreadcrumb2,
} from '@/constants/breadcrumbs/emailBuilder'
import { EmailActivity } from '@/components/EmailActivity'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

const maxWidth = '909px'

const SecureChampionShareEmails: React.FC<BaseSecurePageProps> = ({
  accessToken: accessTokenServer,
  me,
  redirectUrl,
}) => {
  const { accessToken } = useAuth({ accessTokenServer, redirectUrl })
  if (!accessToken || !me) {
    return null
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
        title="Champion Share Email | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/share/emails"
      >
        <PageBreadcrumbs>
          <Breadcrumb
            items={[emailBuilderBreadcrumb1, emailBuilderBreadcrumb2]}
            currentItemName={emailBuilderBreadcrumb2.name}
            style={{ justifyContent: 'flex-start' }}
          />
        </PageBreadcrumbs>
        <MainContainer>
          <EmailActivity
            style={{ marginTop: '2rem', marginBottom: '2rem', maxWidth }}
          />
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

export default SecureChampionShareEmails
