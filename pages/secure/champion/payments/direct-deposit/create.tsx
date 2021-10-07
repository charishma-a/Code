import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { MainContainer, PageBreadcrumbs } from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  paymentsBreadcrumb,
  paymentsDepositBreadcrumb,
  paymentsDepositCreateBreadcrumb,
} from '@/constants/breadcrumbs/paymentsBreadcrumbs'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'
import { ChampionPaymentDirectDepositForm } from '@/components/Form/ChampionPaymentDirectDepositForm'

const Content = styled.div`
  max-width: 587px;
  margin: 0 auto;
  margin-top: 2rem;
`

const SecureChampionPaymentsDirectDepositCreate: React.FC<BaseSecurePageProps> =
  ({ accessToken: accessTokenServer, me, redirectUrl }) => {
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
          title="Champion Payments Direct Deposit | Kernls"
          twitterImage=""
          url="https://kernls.com/secure/champion/payments/direct-deposit"
        >
          <PageBreadcrumbs>
            <Breadcrumb
              items={[
                paymentsBreadcrumb,
                paymentsDepositBreadcrumb,
                paymentsDepositCreateBreadcrumb,
              ]}
              currentItemName={paymentsDepositCreateBreadcrumb.name}
              style={{ justifyContent: 'flex-start' }}
            />
          </PageBreadcrumbs>
          <MainContainer>
            <Content>
              <ChampionPaymentDirectDepositForm />
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

export default SecureChampionPaymentsDirectDepositCreate
