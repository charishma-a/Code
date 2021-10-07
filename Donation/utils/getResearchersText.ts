import { Reseacher } from '../../../data/projects'

export interface GetResearcherTextProps {
  researchers: Reseacher[]
}
export function getResearchersText({
  researchers,
}: GetResearcherTextProps): string {
  return (
    researchers.reduce((acc, curr) => {
      const text = curr.prefix
        ? `${curr.prefix} ${curr.first_name} ${curr.last_name}`
        : `${curr.first_name} ${curr.last_name}`
      if (!acc) {
        return text
      }
      return `${acc} and ${text}`
    }, '') + "'s"
  )
}
