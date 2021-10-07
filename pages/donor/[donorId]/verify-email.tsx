import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'

/* common */
import { BackLink } from '@/common/styled'

/* components */
import { DonorVerifyEmail } from '@/components/DonorVerifyEmail'
import { Layout } from '@/components/Layout'

const baseClass = 'kernls-donor-detail-verify-email-page'

const Page = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`

const BackLinkWrapper = styled.div`
  margin: 1rem;
  text-align: center;
`

export const DonorVerifyEmailPage: NextPage = (): JSX.Element => {
  const router = useRouter()

  const { code, email, donorId } = router.query

  const className = ['page', baseClass].join(' ')

  return (
    <Page className={className}>
      <Layout
        backLink="/"
        description=""
        image=""
        title="Verify Donor Email | Kernls"
        twitterImage=""
        url=""
      >
        {donorId ? (
          <DonorVerifyEmail
            code={code as string}
            email={email as string}
            donorId={donorId as string}
          />
        ) : null}

        <BackLinkWrapper>
          <Link href="/" passHref>
            <BackLink>&#60; Return to Kernls homepage</BackLink>
          </Link>
        </BackLinkWrapper>
      </Layout>
    </Page>
  )
}

export default DonorVerifyEmailPage
