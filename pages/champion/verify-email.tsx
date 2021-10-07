import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import React from 'react'
import { LayoutAuth } from '@/components/LayoutAuth'
import { ChampionVerifyEmail } from '@/components/ChampionVerifyEmail'
import { AuthPageCard, MainContainer } from '@/common/styled'
import { fetchAccessToken } from '@/utils/fetchAccessToken'
import { useSetAccessToken } from '@/hooks/useSetAccessToken'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'

export interface ChampionVerifyEmailPageProps {
  accessToken?: string
}

const ChampionVerifyEmailPage: React.FC<ChampionVerifyEmailPageProps> = ({
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
        title="Champion verify email | Kernls"
        twitterImage=""
        url="https://kernls.com/champion/verify-email"
      >
        <MainContainer>
          <AuthPageCard>
            <ChampionVerifyEmail
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

export default ChampionVerifyEmailPage
