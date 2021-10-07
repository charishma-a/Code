import { Project } from '../data/projects'

export interface GetProjectIdPathProps {
  dataProject: Project
  urlId: string
}
export const getProjectIdPath = ({
  dataProject,
  urlId,
}: GetProjectIdPathProps): string => {
  if (dataProject.embeddedCode === urlId) {
    return dataProject.embeddedCode
  }
  if (dataProject.slug === urlId) {
    return dataProject.slug
  }

  return dataProject.id
}
