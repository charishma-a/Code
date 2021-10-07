import React, { HTMLAttributes } from 'react'
import { LabeledAvatar } from '../libraries/LabeledAvatar'

import { device } from '@/utils/device'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'

import * as sc from './ProjectChampionForwardCard.styled'
import { PartialProjectOrganizationFragment } from '@/generated/graphql'
import {
  Impact,
  ImpactTextContainer,
  TooltipIcon,
  TooltipText,
  TooltipBottomCenter,
} from '@/common/styled'
import { Paragraph } from '../Paragraph'
import { getDisplayName } from '@/utils/getDisplayName'
import { Image } from '../Image'

const styles = {
  avatar: `
    margin-right: 1rem;
    height: 67px;
    width: 70px;
    @media ${device.tablet} {
      height: 112px;
      width: 116px;
    }
  `,
  label: `
    color: #1C1C1C;
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
    @media ${device.tablet} {
      font-size: 1.5rem;
    }
  `,
  container: `
    color: #565656;
    flex: 0 0 70%;
    align-items: flex-start;
    p {
      margin: 0;
      margin-top: 0.2rem;
    }

    @media ${device.tablet} {
      flex: 1 1 70%;
    }
  `,
}

const orgStyles = {
  avatar: `
    margin-right: 1rem;
    height: 54px;
    width: 54px;
    @media ${device.tablet} {
      height: 54px;
      width: 54px;
    }
  `,
  label: `
    color: #1C1C1C;
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
    @media ${device.tablet} {
      font-size: 1.5rem;
    }
  `,
  container: `
    color: #565656;
    flex: 0 0 70%;
    align-items: center;
    p {
      margin: 0;
      margin-top: 0.2rem;
    }

    @media ${device.tablet} {
      flex: 1 1 70%;
    }
  `,
}

export interface ProjectChampionForwardCardProps
  extends HTMLAttributes<HTMLDivElement> {
  classNames?: string
}

export const ProjectChampionForwardCard: React.FC<
  ProjectChampionForwardCardProps & PartialProjectOrganizationFragment
> = ({
  id: _,
  activeCampaign,
  classNames,
  donationsAttributedTotal = 0,
  donationsMatchedTotal = 0,
  forwardProjectOrganizationMember,
  organization,
  matchCommitment = 0,
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  if (!forwardProjectOrganizationMember) {
    return null
  }

  const { avatar, dedicatedNote, presenceOnPage, organizationMember, quote } =
    forwardProjectOrganizationMember
  const { profile, organizationRole } = organizationMember
  const { firstName, lastName } = profile
  const raiseAmount = activeCampaign
    ? activeCampaign.goalAmount
    : matchCommitment * 2

  const displayName = getDisplayName({ firstName, lastName, presenceOnPage })
  const tooltipText = (
    <TooltipText>
      This amount combines what {displayName} has donated + donations from their
      network.
    </TooltipText>
  )
  return (
    <sc.Wrapper className={className}>
      <sc.Header>
        Help {firstName} Raise{' '}
        {formatAmountForDisplay({ amount: raiseAmount, round: true })}
      </sc.Header>
      <sc.Content>
        <LabeledAvatar
          avatar={avatar}
          avatarStyles={styles.avatar}
          label={displayName}
          labelStyles={styles.label}
          containerStyles={styles.container}
        >
          {organizationRole ? <p>{organizationRole}</p> : null}
          {dedicatedNote ? <p>{dedicatedNote}</p> : null}
        </LabeledAvatar>
        <sc.Section>
          <sc.ImpactContainer>
            <ImpactTextContainer>
              <Paragraph>
                <strong>Total impact</strong>
              </Paragraph>
              <TooltipBottomCenter className="kernls-tooltip">
                <TooltipIcon
                  src={'/assets/images/tooltip-purple.png'}
                  alt="Avatar Image"
                />
                {tooltipText}
              </TooltipBottomCenter>
            </ImpactTextContainer>
            <Impact>
              {formatAmountForDisplay({
                amount: donationsAttributedTotal + donationsMatchedTotal,
                round: true,
              })}
              {tooltipText}
            </Impact>
          </sc.ImpactContainer>
          <sc.OrgMatchingSection avatar={organization.avatar}>
            {organization.avatar ? (
              <div>
                <Image src={organization.avatar} width="54" height="54" />
              </div>
            ) : null}
            <Paragraph>
              Matching funds:{' '}
              {formatAmountForDisplay({
                amount: matchCommitment,
                round: true,
              })}
              <br />
              Supported by <strong>{organization.name}</strong>
            </Paragraph>
          </sc.OrgMatchingSection>
        </sc.Section>
        {quote ? (
          <sc.Section>
            <Paragraph>{quote}</Paragraph>
          </sc.Section>
        ) : null}
      </sc.Content>
    </sc.Wrapper>
  )
}
