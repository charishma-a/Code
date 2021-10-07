import { useRouter } from 'next/router'
import { NextPage } from 'next'
import styled from 'styled-components'

/* components */
import { DonationDetail } from '@/components/DonationDetail'
import { DonationDetailVariant } from '@/components/DonationDetail/types'
import { Layout } from '@/components/Layout'

/* constants */
import { METATAG_IMAGE, METATAG_TWITTER_IMAGE } from '@/constants/config'

const baseClass = 'kernls-project-donation-detail-page'

const Page = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`

export const ProjectDonationDetailPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { donationId, variant = 'default' } = router.query

  const className = ['page', baseClass].join(' ')

  return (
    <Page className={className}>
      <Layout
        backLink="/"
        description=""
        image={METATAG_IMAGE}
        title="Thank you for donating | Kernls"
        twitterImage={METATAG_TWITTER_IMAGE}
        url=""
      >
        {donationId ? (
          <DonationDetail
            donationId={donationId as string}
            variant={variant as DonationDetailVariant}
          />
        ) : null}
      </Layout>
    </Page>
  )
}

export default ProjectDonationDetailPage
