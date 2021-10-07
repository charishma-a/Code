import React, { useState } from 'react'

import { PartialProjectChampionFragment } from '@/generated/graphql'

import * as sc from './ProjectChampions.styled'
import { ChampionCard } from '../ChampionCard'
import { ButtonLink } from '@/common/styled'
import { AnonymousChampionsCard } from './AnonymousChampionsCard'

export interface ProjectChampionsProps {
  projectChampions?: PartialProjectChampionFragment[]
  referredId?: string
}

export const ProjectChampions: React.FC<ProjectChampionsProps> = ({
  projectChampions,
  referredId,
}) => {
  if (projectChampions.length === 0) {
    return null
  }
  const [toggleMoreChampions, setToggleMoreChampions] = useState(false)

  const allChampionsAnonymous =
    projectChampions.length > 0 &&
    projectChampions.every(
      (projectChampion) => projectChampion.profile.anonymous
    )

  if (allChampionsAnonymous) {
    return (
      <sc.Wrapper>
        <sc.Champions>
          <AnonymousChampionsCard projectChampions={projectChampions} />
        </sc.Champions>
      </sc.Wrapper>
    )
  }

  const filteredChampions = projectChampions.filter(
    (projectChampion) => !projectChampion.profile.anonymous
  )
  const championsSortedByActive = filteredChampions.sort(
    (a, b) =>
      parseInt(b.profile?.createdAt, 10) - parseInt(a.profile?.createdAt, 10)
  )

  const mainChampion = referredId
    ? projectChampions.find(({ profile }) => profile.id === referredId) ||
      championsSortedByActive[0]
    : championsSortedByActive[0]

  const filteredOutMainChampion = championsSortedByActive.filter(
    ({ profile }) => profile.id !== mainChampion?.profile?.id
  )

  // finding first champion that is not the main champion
  const shownChampions = [mainChampion]
    .concat(filteredOutMainChampion)
    .filter(Boolean)

  if (!projectChampions.length || !mainChampion) {
    return null
  }

  const toggledChampions = championsSortedByActive.filter(
    (champion) =>
      !shownChampions.find(({ profile }) => profile.id === champion.profile.id)
  )

  const anonymousChampions = projectChampions.filter(
    (champion) => champion.profile.anonymous
  )

  const toggledChampionsLength =
    toggledChampions.length + anonymousChampions.length

  return (
    <sc.Wrapper>
      <sc.Champions referredId={referredId}>
        {shownChampions.map((projectChampion) => {
          return (
            <ChampionCard
              key={projectChampion.profile.id}
              {...projectChampion}
            />
          )
        })}
        {toggledChampionsLength && toggleMoreChampions ? (
          <>
            {toggledChampions.map((projectChampion) => {
              return (
                <ChampionCard
                  key={projectChampion.profile.id}
                  {...projectChampion}
                />
              )
            })}
            {anonymousChampions.length ? (
              <AnonymousChampionsCard projectChampions={anonymousChampions} />
            ) : null}
          </>
        ) : null}
        {toggledChampionsLength ? (
          <ButtonLink
            onClick={() => {
              setToggleMoreChampions((prev) => !prev)
            }}
          >
            {toggleMoreChampions
              ? 'View less'
              : `View ${toggledChampionsLength} other ${
                  toggledChampionsLength > 1 ? 'Champions' : 'Champion'
                }`}
          </ButtonLink>
        ) : null}
      </sc.Champions>
    </sc.Wrapper>
  )
}
