import { GetServerSideProps } from 'next'
import React from 'react'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { PageBreadcrumbs } from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  socialBreadcrumb1,
  socialBreadcrumb2,
} from '@/constants/breadcrumbs/socialBreadcrumbs'
import { SocialActivity } from '@/components/SocialActivity'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

const maxWidth = '669px'

const SecureChampionShareSocial: React.FC<BaseSecurePageProps> = ({
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
        url="https://kernls.com/secure/champion/share/social"
      >
        <PageBreadcrumbs>
          <Breadcrumb
            items={[socialBreadcrumb1, socialBreadcrumb2]}
            currentItemName={socialBreadcrumb2.name}
            style={{ justifyContent: 'flex-start' }}
          />
        </PageBreadcrumbs>
        <SocialActivity
          style={{ marginTop: '2rem', marginBottom: '2rem', maxWidth }}
        />
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

export default SecureChampionShareSocial
