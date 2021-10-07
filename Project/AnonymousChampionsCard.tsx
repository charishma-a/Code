import { Impact } from '@/common/styled'
import { PartialProjectChampionFragment } from '@/generated/graphql'
import { device } from '@/utils/device'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import React from 'react'
import styled from 'styled-components'
import { LabeledAvatar } from '../libraries/LabeledAvatar'

import * as sc from './AnonymousChampionsCard.styled'

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

const baseClass = 'kernls-anonymous-champions-card'

export interface AnonymousChampionsCardCardProps {
  classNames?: string
  projectChampions: PartialProjectChampionFragment[]
}

export const AnonymousChampionsCard: React.FC<AnonymousChampionsCardCardProps> =
  ({ classNames, projectChampions }) => {
    const className = [baseClass, classNames].join(' ')
    const totalImpact = projectChampions.reduce((acc, curr) => {
      const { donationsAttributedTotal } = curr
      return acc + donationsAttributedTotal * 2
    }, 0)
    return (
      <sc.Wrapper className={className}>
        <LabeledAvatar
          avatar={`/assets/images/champions/avatar-anonymous.png`}
          avatarStyles={styles.avatar}
          label={`${projectChampions.length} Anonymous`}
          labelStyles={styles.label}
          containerStyles={styles.container}
        >
          <p>Champion</p>
        </LabeledAvatar>
        <sc.Section>
          <sc.ImpactContainer>
            <ImpactTextContainer>
              <span>Funds donated for matching</span>
            </ImpactTextContainer>
            <Impact>
              {formatAmountForDisplay({
                amount: totalImpact,
                round: true,
              })}
            </Impact>
          </sc.ImpactContainer>
        </sc.Section>
      </sc.Wrapper>
    )
  }
