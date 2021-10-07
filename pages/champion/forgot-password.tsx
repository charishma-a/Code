import React from 'react'
import { GetServerSideProps } from 'next'

import { ChampionForgotPasswordForm } from '@/components/Form/ChampionForgotPasswordForm'
import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchAccessToken } from '@/utils/fetchAccessToken'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { AuthPageCard, MainContainer } from '@/common/styled'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

export interface ForgotPasswordPageProps {
  accessToken?: string
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  accessToken = '',
}) => {
  useSetAccessToken({ accessToken })
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        nonAuthHeaderRightCTA="signup"
        title="Champion forgot password | Kernls"
        twitterImage=""
        url="https://kernls.com/champion/forgot-password"
      >
        <MainContainer>
          <AuthPageCard>
            <ChampionForgotPasswordForm />
          </AuthPageCard>
        </MainContainer>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await fetchAccessToken(context)
  return { props: { accessToken } }
}

export default ForgotPasswordPage
