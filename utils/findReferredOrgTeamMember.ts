import {
  PartialProjectOrganizationFragment,
  PartialProjectOrganizationMemberFragment,
} from '@/generated/graphql'

export const findReferredOrgTeamMember = ({
  projectOrganizations,
  referredId,
}: {
  projectOrganizations: PartialProjectOrganizationFragment[]
  referredId: string
}): PartialProjectOrganizationMemberFragment | undefined => {
  return projectOrganizations.reduce((acc, { projectOrganizationMembers }) => {
    if (acc) {
      return acc
    }
    const foundMember = projectOrganizationMembers.find(
      (projectOrganizationMember) => {
        return (
          projectOrganizationMember.organizationMember.profile.id === referredId
        )
      }
    )

    if (foundMember) {
      return foundMember
    }

    return acc
  }, undefined as PartialProjectOrganizationMemberFragment | undefined)
}
