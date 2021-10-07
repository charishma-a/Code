import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { MainContainer } from '@/common/styled'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'
import { CardPrimary } from '@/components/Card'
import {
  ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN,
  ROUTE_SECURE_CHAMPION_SETTINGS_PROFILE,
} from '@/constants/config'

export const Tabs = styled.div`
  align-items: center;
  background: #fcfcfc;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`

export const LinkData = styled.a<
  HTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }
>`
  padding: 1rem;
  ${({ isActive }) => (isActive ? 'border-bottom: 3px solid #8256FF;' : '')}
`

const Content = styled.div`
  max-width: 587px;
  margin: 0 auto;
  margin-top: 2rem;
`

const Card = styled(CardPrimary)`
  max-width: 587px;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 2rem;

  h2 {
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #825eff;
    margin: 0;
    margin-bottom: 1rem;
  }
  h3 {
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    color: #000000;
    margin: 0;
  }
`

const SecureChampionSettingsProfile: React.FC<BaseSecurePageProps> = ({
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
        title="Champion Payments Settings Profile Campaign | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/settings/profile"
      >
        <Tabs>
          <Link href={ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN} passHref>
            <LinkData>Campaign</LinkData>
          </Link>
          <Link href={ROUTE_SECURE_CHAMPION_SETTINGS_PROFILE} passHref>
            <LinkData isActive>Profile</LinkData>
          </Link>
        </Tabs>
        <MainContainer>
          <Content>
            <Card>
              <h2>Profile</h2>
            </Card>
          </Content>
        </MainContainer>
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

export default SecureChampionSettingsProfile
