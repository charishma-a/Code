import React from 'react'
import styled from 'styled-components'
import { ProjectCards } from '../ProjectCard/ProjectCards'
import { Title } from '@/common/styled'
import { trackCategory } from '@/utils/analytics'
import { PartialProjectFragment } from '@/generated/graphql'
import { PROJECTS } from '@/data/projects'

const StyledTitle = styled(Title)`
  padding-top: 1rem;
  padding-bottom: 1.3rem;
`

const ProjectCardsContainer = styled.div`
  border-top: 1px solid #c4c4c4;
`

export interface ExploreProjectsProps {
  currentProjectId: string
  projects: PartialProjectFragment[]
}

const ExploreProjectsFn: React.FC<ExploreProjectsProps> = ({
  currentProjectId,
  projects = [],
}) => {
  const currentProject = PROJECTS.find(({ id }) => id === currentProjectId)

  const onClickProjectCard = async (otherProject) => {
    const { clickIDCode, title } = otherProject
    trackCategory({
      eventProps: {
        eventAction: 'Project Card Click',
        eventCategory: 'Project Page Explore',
        clickID: `${currentProject.clickIDCode}-Explore-${clickIDCode}`,
        clickText: title,
      },
    })
  }
  return (
    <ProjectCardsContainer>
      <StyledTitle>Explore Other Projects</StyledTitle>
      <ProjectCards
        onClickProjectCard={onClickProjectCard}
        projects={projects}
        projectIds={projects.map(({ id }) => id)}
      />
    </ProjectCardsContainer>
  )
}

export const ExploreProjects = React.memo(
  ExploreProjectsFn,
  (prevProps, nextProps) =>
    prevProps.currentProjectId === nextProps.currentProjectId
)
