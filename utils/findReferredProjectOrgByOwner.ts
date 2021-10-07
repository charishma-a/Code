import { PartialProjectOrganizationFragment } from '@/generated/graphql'

export const findReferredProjectOrgByOwner = ({
  projectOrganizations,
  referredId,
}: {
  projectOrganizations: PartialProjectOrganizationFragment[]
  referredId: string
}): PartialProjectOrganizationFragment | undefined => {
  const foundReferredOrgOwner = projectOrganizations.find(
    ({ organization }) => {
      const foundMember = organization.profile?.email === referredId
      return foundMember
    }
  )
  return foundReferredOrgOwner
}
