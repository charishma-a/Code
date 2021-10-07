import { GetServerSideProps } from 'next'
import React from 'react'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { PageBreadcrumbs } from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import { contactsBreadcrumb } from '@/constants/breadcrumbs/contactsBreadcrumbs'
import { Contacts } from '@/components/Contacts'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

const SecureChampionContacts: React.FC<BaseSecurePageProps> = ({
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
        title="Champion Contacts | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/contacts"
      >
        <PageBreadcrumbs>
          <Breadcrumb
            items={[contactsBreadcrumb]}
            currentItemName={contactsBreadcrumb.name}
            style={{ justifyContent: 'flex-start' }}
          />
        </PageBreadcrumbs>
        <Contacts me={me} />
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

export default SecureChampionContacts
