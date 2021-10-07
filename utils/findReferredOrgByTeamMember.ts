import { PartialProjectOrganizationFragment } from '@/generated/graphql'

export const findReferredOrgByTeamMember = ({
  projectOrganizations,
  referredId,
}: {
  projectOrganizations: PartialProjectOrganizationFragment[]
  referredId: string
}): PartialProjectOrganizationFragment | undefined => {
  const foundReferredOrgOwner = projectOrganizations.find(
    ({ projectOrganizationMembers }) => {
      const foundMember = projectOrganizationMembers.find(
        (projectOrganizationMember) => {
          return (
            projectOrganizationMember.organizationMember.profile.id ===
            referredId
          )
        }
      )

      return foundMember
    }
  )
  return foundReferredOrgOwner
}
