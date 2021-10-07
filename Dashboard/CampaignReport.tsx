import * as React from 'react'
import * as sc from './CampaignReport.styled'
import { format } from 'date-fns'

import { ProgressBarContainer } from '../ProgressBar'
import { FlexRowSpaceBetween } from '@/common/styled'
import { BaseComponentProps } from '@/common/types'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import { Paragraph } from '../Paragraph'
import { ROUTE_SECURE_CHAMPION_SHARE } from '@/constants/config'
import { useRouter } from 'next/router'
import { Donation } from '@/generated/graphql'

interface CampaignReportProps extends BaseComponentProps {
  campaignDateRange: string
  moneyRaised: number
  daysLeftInCampaign: number
  donationMatchRemaining: number
  goal: number
  donations: Donation[]
}
export const CampaignReport: React.FC<CampaignReportProps> = ({
  campaignDateRange = '',
  moneyRaised = 0,
  classNames,
  daysLeftInCampaign = 0,
  donationMatchRemaining = 0,
  goal = 50000,
  donations = [],
  ...restProps
}) => {
  const router = useRouter()
  const className = [sc.baseClass, classNames].join(' ')
  function refreshPage() {
    window.location.reload()
  }
  const onClickGetStarted = () => {
    router.push(ROUTE_SECURE_CHAMPION_SHARE)
  }

  const renderDonations = () => {
    if (donations.length > 0) {
      return (
        <sc.Donations>
          {donations.map(({ id, createdAt, donor }) => {
            const fullName = `${donor.firstName} ${donor.lastName}`
            const createdAtFormat = format(Number(createdAt), 'yyyy-MM-dd')
            return (
              <React.Fragment key={id}>
                <div>
                  <p>{fullName}</p>
                </div>
                <div>
                  <p>{donor.email}</p>
                </div>
                <div>
                  <p>{createdAtFormat}</p>
                </div>
              </React.Fragment>
            )
          })}
        </sc.Donations>
      )
    }

    return (
      <sc.DonationsEmpty>
        <Paragraph>
          Donations to your campaign will appear here. Start spreading the word
          through email and social media!
        </Paragraph>
        <sc.DonationsGetStartedButton onClick={onClickGetStarted} role="button">
          Start Sharing
        </sc.DonationsGetStartedButton>
      </sc.DonationsEmpty>
    )
  }
  return (
    <sc.Wrapper className={className} {...restProps}>
      <FlexRowSpaceBetween>
        <h3>Campaign report</h3>
        <sc.RefreshButton onClick={refreshPage}>Refresh</sc.RefreshButton>
      </FlexRowSpaceBetween>
      <sc.Content>
        <sc.CampaignDateRangeWrapper>
          <p>Campaign date range: {campaignDateRange}</p>
        </sc.CampaignDateRangeWrapper>
        <sc.Line isHiddenOnMobile />
        <sc.ProgressBarWrapper>
          <ProgressBarContainer moneyRaised={moneyRaised} goal={goal} />
        </sc.ProgressBarWrapper>
        <sc.CampaignInfoWrapper>
          <sc.CampaignInfoItem>
            <p>Days left until end of campaign</p>
            <p>{daysLeftInCampaign}</p>
          </sc.CampaignInfoItem>
          <sc.CampaignInfoItem>
            <p>Donation match remaining</p>
            <p>{formatAmountForDisplay({ amount: donationMatchRemaining })}</p>
          </sc.CampaignInfoItem>
        </sc.CampaignInfoWrapper>
        <sc.Line />
        <sc.DonationsWrapper>
          <p className="title">Donations</p>
          {renderDonations()}
        </sc.DonationsWrapper>
      </sc.Content>
    </sc.Wrapper>
  )
}
export default CampaignReport
