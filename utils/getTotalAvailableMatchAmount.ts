import { PartialProjectChampionFragment } from '@/generated/graphql'

export interface GetTotalAvailableMatchAmountProps {
  projectChampions: PartialProjectChampionFragment[]
}

export const getTotalAvailableMatchAmount = ({
  projectChampions = [],
}: GetTotalAvailableMatchAmountProps): number => {
  let totalMatched = 0
  let totalMatching = 0

  projectChampions.forEach((projectChampion) => {
    totalMatched += projectChampion.donationsMatchedTotal
    totalMatching += projectChampion.matchCommitment
  })

  const totalAvailableMatchAmount = totalMatching - totalMatched

  if (totalAvailableMatchAmount < 0) {
    return 0
  }
  return totalAvailableMatchAmount
}
