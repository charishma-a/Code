import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

/* components */
import { BackerDeposit } from '@/components/BackerDeposit'
import { Layout } from '@/components/Layout'

const Page = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`
const baseClass = 'secure-backer-deposit-page'

const SecureBackerDepositPage: NextPage = () => {
  const router = useRouter()
  const { accessCode, profileId } = router.query

  if (!accessCode || !profileId) {
    return null
  }

  const className = ['page', baseClass].join(' ')

  const profileIdString = Array.isArray(profileId) ? profileId[0] : profileId

  const accessCodeString = Array.isArray(accessCode)
    ? accessCode[0]
    : accessCode

  return (
    <Page className={className}>
      <Layout
        description="Deposit to project"
        image=""
        title="Deposit to project"
        twitterImage=""
        url=""
      >
        <BackerDeposit
          accessCode={accessCodeString}
          profileId={profileIdString}
        />
      </Layout>
    </Page>
  )
}

export default SecureBackerDepositPage
