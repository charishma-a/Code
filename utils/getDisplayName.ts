import { ProjectChampionPresenceOnPage } from '@/generated/graphql'

export const getDisplayName = ({
  firstName,
  lastName,
  presenceOnPage,
}: {
  firstName: string
  lastName: string
  presenceOnPage?: ProjectChampionPresenceOnPage
}): string => {
  if (presenceOnPage === ProjectChampionPresenceOnPage.FirstAndLastInitial) {
    return `${firstName} ${lastName[0].toUpperCase()}`
  }

  return `${firstName} ${lastName}`
}
