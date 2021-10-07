import React from 'react'

import * as sc from './Dashboard.styled'

import { BaseComponentProps } from '@/common/types'
import { Maybe, Profile, ProjectCampaign } from '@/generated/graphql'
import CampaignReport from './CampaignReport'
import { CampaignActions } from './CampaignActions'

export interface IDashboardProps extends BaseComponentProps {
  me: Maybe<Profile>
  projectCampaign?: ProjectCampaign
}

export const Dashboard: React.FC<IDashboardProps> = ({
  classNames,
  projectCampaign,
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  return (
    <sc.Wrapper className={className}>
      <CampaignActions />
      {projectCampaign ? (
        <CampaignReport
          campaignDateRange={projectCampaign.campaignDateRange}
          donations={projectCampaign.projectChampion?.attributedDonations}
          moneyRaised={projectCampaign.projectChampion?.totalImpact}
          daysLeftInCampaign={projectCampaign.daysLeftInCampaign}
          donationMatchRemaining={
            projectCampaign.projectChampion?.openMatchCommitment
          }
          goal={projectCampaign.goalAmount}
        />
      ) : null}
    </sc.Wrapper>
  )
}
