import { ProjectTabContent } from './types'

export const mapToParagraphs = ({
  collection,
  topPadding = true,
}: {
  collection: string[]
  topPadding?: boolean
}): ProjectTabContent[] => {
  return collection.map((content) => {
    return {
      content,
      topPadding,
      type: 'paragraph',
    } as ProjectTabContent
  })
}
