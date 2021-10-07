import { NextPage } from 'next'
import styled from 'styled-components'

/* components */
import { FoundationLoginForm } from '../../components/Form/FoundationLoginForm'
import { Layout } from '../../components/Layout'

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
  const className = ['page', baseClass].join(' ')

  return (
    <Page className={className}>
      <Layout
        backLink="/"
        description=""
        image=""
        title="Foundation Login | Kernls"
        twitterImage=""
        url="https://kernls.com/foundation/login"
      >
        <FoundationLoginForm />
      </Layout>
    </Page>
  )
}

export default ProjectDonationDetailPage
