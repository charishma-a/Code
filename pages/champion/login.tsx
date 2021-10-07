import React from 'react'
import { GetServerSideProps } from 'next'

import { ChampionLoginForm } from '@/components/Form/ChampionLoginForm'
import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchAccessToken } from '@/utils/fetchAccessToken'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { AuthPageCard, MainContainer } from '@/common/styled'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

export interface LoginPageProps {
  accessToken?: string
}

const LoginPage: React.FC<LoginPageProps> = ({ accessToken = '' }) => {
  useSetAccessToken({ accessToken })
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        nonAuthHeaderRightCTA="signup"
        title="Champion Login | Kernls"
        twitterImage=""
        url="https://kernls.com/champion/login"
      >
        <MainContainer>
          <AuthPageCard>
            <ChampionLoginForm />
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

export default LoginPage
