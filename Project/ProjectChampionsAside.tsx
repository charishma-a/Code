import { CircularProgress } from '@material-ui/core'
import React from 'react'

import * as sc from './ProjectChampionsAside.styled'

import { Title } from '@/common/styled'
import {
  PartialProjectChampionFragment,
  PartialProjectOrganizationFragment,
} from '@/generated/graphql'
import { WhatIsAChampion } from '../WhatIsAChampion'
import { ProjectChampions } from './ProjectChampions'
import { ProjectPreviousChampions } from './ProjectPreviousChampions'
import { ProjectOrganizations } from './ProjectOrganizations'
import { findReferredProjectChampion } from '@/utils/findReferredProjectChampion'
import { findReferredOrgByTeamMember } from '@/utils/findReferredOrgByTeamMember'

export interface ProjectChampionsAsideProps {
  loading?: boolean
  projectChampions?: PartialProjectChampionFragment[]
  projectOrganizations?: PartialProjectOrganizationFragment[]
  referredId?: string
}

export const ProjectChampionsAside: React.FC<ProjectChampionsAsideProps> = ({
  loading,
  referredId,
  projectChampions = [],
  projectOrganizations = [],
}) => {
  if (loading) {
    return (
      <sc.Wrapper
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </sc.Wrapper>
    )
  }
  const archivedChampions = projectChampions.filter(
    ({ isArchived }) => isArchived
  )
  const archivedOrganizations = projectOrganizations.filter(
    ({ isArchived }) => isArchived
  )
  const currentChampions = projectChampions.filter(
    ({ active, isArchived }) => !isArchived && active
  )
  const currentOrganizations = projectOrganizations.filter(
    ({ active, isArchived }) => !isArchived && active
  )

  // this needs to show unless doubling champions is showing needing a champion
  const showWhatIsAChampion =
    (currentChampions.length > 0 || currentOrganizations.length > 0) &&
    referredId

  const renderChampions = () => {
    const foundReferredChampion = findReferredProjectChampion({
      projectChampions: currentChampions,
      referredId,
    })
    const foundReferredOrgByTeamMember = findReferredOrgByTeamMember({
      projectOrganizations: currentOrganizations,
      referredId,
    })
    const foundReferredOrgByOrgId = currentOrganizations.find(
      ({ organization }) => organization.id === referredId
    )

    const renderedProjectChampions = (
      <ProjectChampions
        projectChampions={currentChampions}
        referredId={referredId}
      />
    )

    const renderedProjectOrganizations = (
      <ProjectOrganizations
        projectOrganizations={currentOrganizations}
        referredId={referredId}
      />
    )

    // switch the order depending on found referred id
    if (
      foundReferredChampion ||
      foundReferredOrgByTeamMember ||
      foundReferredOrgByOrgId
    ) {
      if (foundReferredChampion) {
        return (
          <>
            {renderedProjectChampions}
            {renderedProjectOrganizations}
          </>
        )
      }
      return (
        <>
          {renderedProjectOrganizations}
          {renderedProjectChampions}
        </>
      )
    }

    return (
      <>
        {currentOrganizations.length > 0 ? renderedProjectOrganizations : null}
        {currentChampions.length > 0 ? renderedProjectChampions : null}
      </>
    )
  }

  return (
    <sc.Wrapper>
      {showWhatIsAChampion ? <WhatIsAChampion /> : null}
      {currentChampions.length > 0 || currentOrganizations.length > 0 ? (
        <div style={{ marginTop: '1rem' }}>
          <Title
            style={
              referredId
                ? null
                : {
                    paddingTop: '3rem',
                    marginTop: '-2rem',
                  }
            }
            id="current-champions"
          >
            Current Champions
          </Title>
          {renderChampions()}
        </div>
      ) : null}
      {archivedChampions.length > 0 ? (
        <div style={{ marginTop: '1rem' }}>
          <Title
            style={
              referredId
                ? null
                : {
                    paddingTop: '3rem',
                    marginTop: '-2rem',
                  }
            }
            id="previous-champions"
          >
            Previous Champions
          </Title>
          <ProjectPreviousChampions
            projectOrganizations={archivedOrganizations}
            projectChampions={archivedChampions}
            referredId={referredId}
          />
        </div>
      ) : null}
    </sc.Wrapper>
  )
}
