import React from 'react'
import { GetServerSideProps } from 'next'

import { ChampionResetPasswordForm } from '@/components/Form/ChampionResetPasswordForm'
import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchAccessToken } from '@/utils/fetchAccessToken'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { AuthPageCard, MainContainer } from '@/common/styled'
import { useRouter } from 'next/router'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

export interface ResetPasswordPageProps {
  accessToken?: string
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  accessToken = '',
}) => {
  useSetAccessToken({ accessToken })
  const router = useRouter()

  const { code, email } = router.query
  return (
    <>
      <ChampionGlobalPageStyles />
      <LayoutAuth
        description=""
        image=""
        nonAuthHeaderRightCTA="signup"
        title="Champion reset password | Kernls"
        twitterImage=""
        url="https://kernls.com/champion/reset-password"
      >
        <MainContainer>
          <AuthPageCard>
            <ChampionResetPasswordForm
              code={code as string}
              email={email as string}
            />
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

export default ResetPasswordPage
