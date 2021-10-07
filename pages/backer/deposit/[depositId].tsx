import { useRouter } from 'next/router'
import { NextPage } from 'next'
import styled from 'styled-components'

/* components */
import { ProfileDepositDetail } from '@/components/ProfileDepositDetail'
import { Layout } from '@/components/Layout'

/* constants */
import { METATAG_IMAGE, METATAG_TWITTER_IMAGE } from '@/constants/config'

const baseClass = 'kernls-backer-deposit-detail-page'

const Page = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`

export const ProfileDepositDetailPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { depositId } = router.query

  const className = ['page', baseClass].join(' ')

  return (
    <Page className={className}>
      <Layout
        backLink="/"
        description=""
        image={METATAG_IMAGE}
        title="Deposit detail | Kernls"
        twitterImage={METATAG_TWITTER_IMAGE}
        url=""
      >
        {depositId ? (
          <ProfileDepositDetail depositId={depositId as string} />
        ) : null}
      </Layout>
    </Page>
  )
}

export default ProfileDepositDetailPage
