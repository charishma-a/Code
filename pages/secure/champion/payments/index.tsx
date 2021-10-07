import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { MainContainer, PageBreadcrumbs } from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import { paymentsBreadcrumb } from '@/constants/breadcrumbs/paymentsBreadcrumbs'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'
import { ChampionPaymentOptions } from '@/components/ChampionPaymentOptions/ChampionPaymentOptions'
import { ChampionPaymentSummary } from '@/components/ChampionPaymentSummary'
import { device } from '@/utils/device'

const Content = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 2rem;

  > *:first-child {
    margin-right: 0;
    flex: 1;
  }
  > *:last-child {
    margin-top: 1rem;
    flex: 1;
  }

  @media ${device.tablet} {
    flex-direction: row;
    > *:first-child {
      margin-right: 1rem;
      flex: 2;
    }
    > *:last-child {
      margin-top: 0;
    }
  }
`

const SecureChampionPayments: React.FC<BaseSecurePageProps> = ({
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
        title="Champion Payments | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/payments"
      >
        <PageBreadcrumbs>
          <Breadcrumb
            items={[paymentsBreadcrumb]}
            currentItemName={paymentsBreadcrumb.name}
            style={{ justifyContent: 'flex-start' }}
          />
        </PageBreadcrumbs>
        <MainContainer>
          <Content>
            <ChampionPaymentOptions />
            <ChampionPaymentSummary />
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

export default SecureChampionPayments
