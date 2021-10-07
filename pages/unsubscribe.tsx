import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'

/* common */
import { BackLink } from '../common/styled'

/* components */
import { DonorUnsubscribe } from '../components/DonorUnsubscribe'
import { Layout } from '../components/Layout'

/* constants */
import { METATAG_IMAGE, METATAG_TWITTER_IMAGE } from '../constants/config'

const baseClass = 'kernls-dunsubscribe-page'

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

export const DonorUnsubscribePage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { email } = router.query

  const className = ['page', baseClass].join(' ')

  return (
    <Page className={className}>
      <Layout
        backLink="/"
        description=""
        image={METATAG_IMAGE}
        title="Unsubscribe Email | Kernls"
        twitterImage={METATAG_TWITTER_IMAGE}
        url=""
      >
        {email ? <DonorUnsubscribe email={email as string} /> : null}

        <BackLinkWrapper>
          <Link href="/" passHref>
            <BackLink>&#60; Return to Kernls homepage</BackLink>
          </Link>
        </BackLinkWrapper>
      </Layout>
    </Page>
  )
}

export default DonorUnsubscribePage
