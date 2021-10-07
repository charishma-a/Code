import { GetServerSideProps } from 'next'
import React from 'react'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { SocialPostCreateForm } from '@/components/Form/SocialPostCreateForm'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

const SecureChampionShareSocialCreate: React.FC<BaseSecurePageProps> = ({
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
        showSidebar={false}
        showHeader={false}
        title="Champion Create Social Post | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/share/social/create"
      >
        <SocialPostCreateForm me={me} />
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

export default SecureChampionShareSocialCreate
