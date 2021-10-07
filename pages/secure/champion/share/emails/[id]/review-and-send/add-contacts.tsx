import { GetServerSideProps } from 'next'
import React from 'react'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { EmailAddContactsForm } from '@/components/Form/EmailAddContactsForm'
import { useRouter } from 'next/router'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

const SecureChampionShareEmailAddContacts: React.FC<BaseSecurePageProps> = ({
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
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        isFullWidth
        showHeader={false}
        showSidebar={false}
        me={me}
        title="Champion Share Email Add Contacts | Kernls"
        twitterImage=""
        url={`https://kernls.com/secure/champion/share/emails/${id}/review-and-send/add-contacts`}
      >
        <EmailAddContactsForm id={id} />
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps({
      context,
      shouldRedirectOnboardingUrl: false,
    })
  return { props: { accessToken, ...fetchResult, redirectUrl } }
}

export default SecureChampionShareEmailAddContacts
