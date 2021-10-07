import { PartialProjectChampionFragment } from '@/generated/graphql'

export const findReferredProjectChampion = ({
  projectChampions,
  referredId,
}: {
  projectChampions: PartialProjectChampionFragment[]
  referredId: string
}): PartialProjectChampionFragment | undefined => {
  const foundReferredChampion = projectChampions.find(
    ({ profile }) => profile.id === referredId
  )
  return foundReferredChampion
}
