import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { LabeledAvatar } from '../libraries/LabeledAvatar'

import { device } from '@/utils/device'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'

import * as sc from './ChampionCard.styled'
import { PartialProjectChampionFragment } from '@/generated/graphql'
import {
  TooltipIcon,
  TooltipText,
  TooltipBottomCenter,
  Impact,
} from '@/common/styled'
import { Paragraph } from '../Paragraph'

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

const ImpactTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  > *:first-child {
    margin-right: 0.2rem;
  }
`

const baseClass = 'kernls-champion-card'

export interface ChampionCardProps extends HTMLAttributes<HTMLDivElement> {
  classNames?: string
}

export const ChampionCard: React.FC<
  ChampionCardProps & PartialProjectChampionFragment
> = ({
  id: _,
  avatar,
  classNames,
  bio,
  dedicatedNote,
  donationsAttributedTotal = 0,
  donationsMatchedTotal = 0,
  matchCommitment = 0,
  quote,
  profile,
}) => {
  const className = [baseClass, classNames].join(' ')

  const { anonymous, firstName, lastName } = profile
  const fullName = anonymous ? 'Anonymous' : `${firstName} ${lastName}`
  const tooltipText = (
    <TooltipText>
      This amount combines what {firstName} has donated + donations from their
      network.
    </TooltipText>
  )
  return (
    <sc.Wrapper className={className}>
      <LabeledAvatar
        avatar={avatar}
        avatarStyles={styles.avatar}
        label={fullName}
        labelStyles={styles.label}
        containerStyles={styles.container}
      >
        {bio ? <p>{bio}</p> : null}
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
        <div style={{ marginTop: '1rem' }}>
          <sc.Bubble>
            <Paragraph>
              Matching funds:{' '}
              {formatAmountForDisplay({
                amount: matchCommitment,
                round: true,
              })}
            </Paragraph>
          </sc.Bubble>
        </div>
      </sc.Section>
      {quote ? (
        <sc.Section>
          <Paragraph>{quote}</Paragraph>
        </sc.Section>
      ) : null}
    </sc.Wrapper>
  )
}
