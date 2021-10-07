import { GetServerSideProps } from 'next'
import React from 'react'

import { LayoutAuth } from '@/components/LayoutAuth'
import { fetchCommonSecureProps } from '@/utils/fetchCommonSecureProps'
import { BaseSecurePageProps } from '@/common/types'
import { Dashboard } from '@/components/Dashboard/Dashboard'
import {
  Maybe,
  PageDashboardDocument,
  Profile,
  ProjectCampaign,
} from '@/generated/graphql'
import { useAuth } from '@/hooks/useAuth'
import { ChampionGlobalPageStyles } from '@/components/ChampionGlobalPageStyles'
import { MainContainer } from '@/common/styled'

interface ISecureChampionDashboardProps extends BaseSecurePageProps {
  myActiveProjectCampaign?: ProjectCampaign
}

const SecureChampionDashboard: React.FC<ISecureChampionDashboardProps> = ({
  accessToken: accessTokenServer,
  me,
  myActiveProjectCampaign,
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
        title="Champion Dashboard | Kernls"
        twitterImage=""
        url="https://kernls.com/secure/champion/dashboard"
      >
        <MainContainer>
          <Dashboard me={me} projectCampaign={myActiveProjectCampaign} />
        </MainContainer>
      </LayoutAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, fetchResult, redirectUrl } =
    await fetchCommonSecureProps<{
      me: Maybe<Profile>
      myActiveProjectCampaign: ProjectCampaign
    }>({
      context,
      requestDocument: PageDashboardDocument,
    })
  return { props: { ...fetchResult, accessToken, redirectUrl } }
}

export default SecureChampionDashboard
