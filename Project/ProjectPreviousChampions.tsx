import React from 'react'

import {
  PartialProjectChampionFragment,
  PartialProjectOrganizationFragment,
} from '@/generated/graphql'

import * as sc from './ProjectPreviousChampions.styled'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import { LabeledAvatar } from '../libraries/LabeledAvatar'
import { device } from '@/utils/device'
import { getDisplayName } from '@/utils/getDisplayName'

const styles = {
  avatar: `
    margin-right: 1rem;
    height: 45px;
    width: 45px;
  `,
  label: `
    color: #1C1C1C;
    margin: 0;
    font-weight: 600;
    font-size: 0.75rem;

    @media ${device.tablet} {
      font-size: 1rem;
    }
  `,
  container: `
    color: #565656;
    flex: 0 0 70%;
    align-items: center;
    p {
      margin: 0;
    }
    font-size: 0.75rem;

    @media ${device.tablet} {
      flex: 1 1 70%;
      font-size: 1rem;
    }
  `,
}

export interface ProjectPreviousChampionsProps {
  projectChampions?: PartialProjectChampionFragment[]
  projectOrganizations?: PartialProjectOrganizationFragment[]
  referredId?: string
}

export const ProjectPreviousChampions: React.FC<ProjectPreviousChampionsProps> =
  ({ projectChampions = [], projectOrganizations = [], referredId }) => {
    const filteredChampions = projectChampions.filter(
      ({ profile }) => !profile.anonymous
    )
    const championsSortedByActive = filteredChampions.sort(
      (a, b) =>
        parseInt(b.profile?.createdAt, 10) - parseInt(a.profile?.createdAt, 10)
    )

    const mainChampion = referredId
      ? projectChampions.find(({ profile }) => profile.id === referredId) ||
        championsSortedByActive[0]
      : championsSortedByActive[0]

    const filteredOutMainChampion = projectChampions.filter(
      ({ profile }) => profile.id !== mainChampion.profile.id
    )

    // finding first champion that is not the main champion
    const shownChampions = [mainChampion]
      .concat(filteredOutMainChampion)
      .filter(Boolean)

    if (!shownChampions.length || !mainChampion) {
      return null
    }

    return (
      <sc.Wrapper>
        <sc.ThanksParagraph>
          A heartfelt thanks to all of the Champions who have helped support
          this research!
        </sc.ThanksParagraph>
        <sc.ChampionsHeader>
          <span>Champions</span>
          <span>Total impact</span>
        </sc.ChampionsHeader>
        <sc.Champions referredId={referredId}>
          {projectOrganizations.map(
            ({
              avatar,
              dedicatedNote,
              donationsAttributedTotal,
              donationsMatchedTotal,
              id,
              organization,
            }) => {
              const displayName = organization.name
              return (
                <sc.Champion key={id}>
                  <LabeledAvatar
                    avatar={avatar}
                    avatarStyles={styles.avatar}
                    label={displayName}
                    labelStyles={styles.label}
                    containerStyles={styles.container}
                  >
                    {dedicatedNote ? <p>{dedicatedNote}</p> : null}
                  </LabeledAvatar>
                  <sc.Impact>
                    {formatAmountForDisplay({
                      amount: donationsAttributedTotal + donationsMatchedTotal,
                      round: true,
                    })}
                  </sc.Impact>
                </sc.Champion>
              )
            }
          )}
          {shownChampions.map(
            ({
              id,
              avatar,
              dedicatedNote,
              donationsAttributedTotal,
              donationsMatchedTotal,
              presenceOnPage,
              profile,
            }) => {
              const displayName = getDisplayName({
                firstName: profile.firstName,
                lastName: profile.lastName,
                presenceOnPage,
              })
              return (
                <sc.Champion key={id}>
                  <LabeledAvatar
                    avatar={avatar}
                    avatarStyles={styles.avatar}
                    label={displayName}
                    labelStyles={styles.label}
                    containerStyles={styles.container}
                  >
                    {dedicatedNote ? <p>{dedicatedNote}</p> : null}
                  </LabeledAvatar>
                  <sc.Impact>
                    {formatAmountForDisplay({
                      amount: donationsAttributedTotal + donationsMatchedTotal,
                      round: true,
                    })}
                  </sc.Impact>
                </sc.Champion>
              )
            }
          )}
        </sc.Champions>
      </sc.Wrapper>
    )
  }
