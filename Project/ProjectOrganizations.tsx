import React from 'react'
import { PartialProjectOrganizationFragment } from '@/generated/graphql'

import * as sc from './ProjectOrganizations.styled'
import { ProjectOrganizationCard } from '../ProjectOrganizationCard'
import { ProjectChampionForwardCard } from '../ProjectChampionForwardCard'

export interface ProjectOrganizationsProps {
  projectOrganizations?: PartialProjectOrganizationFragment[]
  referredId?: string
}

export const ProjectOrganizations: React.FC<ProjectOrganizationsProps> = ({
  referredId,
  projectOrganizations = [],
}) => {
  if (projectOrganizations.length === 0) {
    return null
  }
  const defaultFirstOrganization = projectOrganizations[0]
  const firstOrganization = referredId
    ? projectOrganizations.find(({ projectOrganizationMembers }) => {
        const foundMember = projectOrganizationMembers.find(
          (projectOrganizationMember) => {
            return (
              projectOrganizationMember.organizationMember.profile.id ===
              referredId
            )
          }
        )

        return foundMember
      }) || defaultFirstOrganization
    : defaultFirstOrganization

  const filteredOutFirstOranization = projectOrganizations.filter(
    ({ id }) => id !== firstOrganization.id
  )

  const sortedOrganizations = [firstOrganization].concat(
    filteredOutFirstOranization
  )

  return (
    <sc.Wrapper>
      {sortedOrganizations.map((projectOrganization) => {
        return (
          <div style={{ marginTop: '1rem' }} key={projectOrganization.id}>
            {projectOrganization.isMemberForward ? (
              <ProjectChampionForwardCard {...projectOrganization} />
            ) : (
              <ProjectOrganizationCard {...projectOrganization} />
            )}
          </div>
        )
      })}
    </sc.Wrapper>
  )
}
