import React from 'react'
import { GetServerSideProps } from 'next'

import { LayoutAuth } from '@/components/LayoutAuth'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { AuthPageCard } from '@/common/styled'
import { useMeQuery, useResendVerifyEmailMutation } from '@/generated/graphql'
import { Paragraph } from '@/components/Paragraph'
import { Button } from '@/components/Form/SubmitButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'

const SecureChampionVerifyEmailSentPage: React.FC<BaseSecurePageProps> = ({
  accessToken = '',
}) => {
  // should set access token or redirect if not authenticated
  useSetAccessToken({
    accessToken,
  })
  if (!accessToken) {
    return null
  }

  const { data: dataMe } = useMeQuery({
    fetchPolicy: 'network-only',
  })
  const [resendVerifyEmail, { loading, error }] = useResendVerifyEmailMutation()

  const email = dataMe?.me?.email

  const onClickResendEmail = async () => {
    if (email) {
      await resendVerifyEmail({ variables: { input: { email } } })
    }
  }
  return (
    <LayoutAuth
      description=""
      image=""
      title="Champion verify email sent | Kernls"
      twitterImage=""
      url="https://kernls.com/champion/signup"
    >
      <AuthPageCard>
        <h2>Verify your email</h2>
        <Paragraph>
          Please open the link in the email we’ve sent you to verify your email
          address.
        </Paragraph>
        <Button disabled={loading} topMargin onClick={onClickResendEmail}>
          {loading ? 'Resend email...' : 'Resend email'}
        </Button>
        {error ? <ErrorMessage error={{ message: error }} /> : null}
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

export default SecureChampionVerifyEmailSentPage
