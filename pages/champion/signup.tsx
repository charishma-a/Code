import React from 'react'
import { GetServerSideProps } from 'next'

import { ChampionSignupForm } from '@/components/Form/ChampionSignupForm'
import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchAccessToken } from '@/utils/fetchAccessToken'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { AuthPageCard, MainContainer } from '@/common/styled'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

export interface SignupPageProps {
  accessToken?: string
}

const SignupPage: React.FC<SignupPageProps> = ({ accessToken = '' }) => {
  useSetAccessToken({ accessToken })
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        nonAuthHeaderRightCTA="login"
        title="Champion Signup | Kernls"
        twitterImage=""
        url="https://kernls.com/champion/signup"
      >
        <MainContainer>
          <AuthPageCard>
            <ChampionSignupForm />
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

export default SignupPage
