import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { LayoutAuth } from '@/components/LayoutAuth'
import { AuthPageCard } from '@/common/styled'
import { Paragraph } from '@/components/Paragraph'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'

const SecureChampionTest: React.FC<BaseSecurePageProps> = ({
  accessToken,
  redirectUrl,
}) => {
  useSetAccessToken({ accessToken, redirectUrl })
  if (!accessToken) {
    return null
  }
  return (
    <LayoutAuth
      description=""
      image=""
      title="Champion Dashboard | Kernls"
      twitterImage=""
      url="https://kernls.com/secure/champion/test"
    >
      <AuthPageCard>
        <Paragraph>This is a test page</Paragraph>
        <Link href="/secure/champion/dashboard">
          <a>dashboard</a>
        </Link>
      </AuthPageCard>
    </LayoutAuth>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps({
      context,
    })
  return { props: { ...fetchResult, accessToken, redirectUrl } }
}

export default SecureChampionTest
