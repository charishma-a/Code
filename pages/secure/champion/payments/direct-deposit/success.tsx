import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { useAuth } from '@/hooks/useAuth'
import { MainContainer, Ol } from '@/common/styled'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'
import { CardPrimary } from '@/components/Card'
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

const SecureChampionPaymentsDirectDeposit: React.FC<BaseSecurePageProps> = ({
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
        title="Champion Payments Direct Deposit | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/payments/direct-deposit/success"
      >
        <MainContainer>
          <Content>
            <Card>
              <h2>
                {me.firstName} {me.lastName}, your payment was accepted! 🎉
              </h2>
              <div className="content">
                <h3>What happens next</h3>
                <Ol>
                  <li>
                    An email receipt from Stripe is on its way to your inbox.
                  </li>
                  <li>
                    Your payment will be reflected in your bank account in the
                    next 7 business days
                  </li>
                  <li>
                    You’ll receive an email with an official tax receipt in the
                    next 3 weeks.
                  </li>
                </Ol>
              </div>
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

export default SecureChampionPaymentsDirectDeposit
