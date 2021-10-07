import React from 'react'
import styled from 'styled-components'

import { Stats } from './projectTabContentTypes/Stats'
import { Image, Link } from './projectTabContentTypes/styles'

import { Table, TableV2 } from '../Table'
import { Title, TopTitle } from '@/common/styled'

/* constants */
import {
  ProjectTab,
  ProjectTabContent,
  ProjectTabContentIconTextAlert,
  ProjectTabContentImage,
  ProjectTabContentLink,
  ProjectTabContentSingleFocusedTabs,
  ProjectTabContentStats,
  ProjectTabContentTable,
  ProjectTabContentTableProjectBudget,
  ProjectTabContentTableProjectSummary,
  ProjectTabContentTableV2,
  ProjectTabContentTeamMember,
  ProjectTabContentTimeline,
  ProjectTabContentUnorderedList,
  ProjectTabName,
} from '@/constants/projectTabs/types'
import { TeamMember } from './projectTabContentTypes/TeamMember'
import { UnorderedList } from './projectTabContentTypes/UnorderedList'
import { OrderedList } from './projectTabContentTypes/OrderedList'
import { ProjectTabContentOrderedList } from '@/constants/projectTabs/types'
import { Paragraph } from '../Paragraph'
import { IconTextAlert } from '../IconTextAlert'
import { SingleFocusedTabs } from '../SingleFocusedTabs'
import { Timeline } from '../Timeline'
import { useScrollTopContainer } from '../../hooks/useScrollTopContainer'
import { TableProjectBudget, TableProjectSummary } from '../Table'
import { ProjectRequestBanner } from '../IconTextAlert/ProjectRequestBanner'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

interface TabContentProps {
  onClickTab: (tab: string) => void
  projectTab: ProjectTab
  projectId?: string
}

export const TabContent: React.FC<TabContentProps> = ({
  onClickTab,
  projectTab,
}) => {
  const { tabName } = projectTab

  const ref = useScrollTopContainer({ conditions: [tabName] })

  const mappedContent = projectTab.content
    .map((item, index) => {
      const { topPadding, type } = item

      const key = `${type}-${index}`

      if (type === 'heading') {
        const { content } = item as ProjectTabContent
        return (
          <Title key={key} topPadding={topPadding}>
            {content}
          </Title>
        )
      }

      if (type === 'topHeading') {
        const { content } = item as ProjectTabContent
        return (
          <TopTitle key={key} topPadding={topPadding}>
            {content}
          </TopTitle>
        )
      }

      if (type === 'paragraph') {
        const { content } = item as ProjectTabContent
        return (
          <Paragraph key={key} topPadding={topPadding}>
            {content}
          </Paragraph>
        )
      }

      if (type === 'iconTextAlert') {
        const { properties } = item as ProjectTabContentIconTextAlert
        return (
          <IconTextAlert
            key={key}
            style={topPadding ? { paddingTop: '1rem' } : {}}
            {...properties}
          />
        )
      }

      if (type === 'image') {
        const { properties } = item as ProjectTabContentImage
        return <Image key={key} topPadding={topPadding} {...properties} />
      }

      if (type === 'stats') {
        const { properties } = item as ProjectTabContentStats
        return <Stats key={key} topPadding={topPadding} {...properties} />
      }

      if (type === 'link') {
        const { content, properties } = item as ProjectTabContentLink
        const { tabToSet, ...restProperties } = properties
        const onClick = tabToSet ? () => onClickTab(tabToSet) : () => null
        return (
          <Link
            key={key}
            topPadding={topPadding}
            onClick={onClick}
            {...restProperties}
          >
            {content}
          </Link>
        )
      }

      if (type === 'orderedList') {
        const { properties } = item as ProjectTabContentOrderedList
        return <OrderedList key={key} topPadding={topPadding} {...properties} />
      }

      if (type === 'singleFocusedTabs') {
        const { getProperties } = item as ProjectTabContentSingleFocusedTabs
        const properties = getProperties({ onClickTab })
        return <SingleFocusedTabs key={key} {...properties} />
      }

      if (type === 'table') {
        const { properties } = item as ProjectTabContentTable
        return <Table key={key} {...properties} />
      }

      if (type === 'tableV2') {
        const { properties } = item as ProjectTabContentTableV2
        return <TableV2 key={key} {...properties} />
      }

      if (type === 'tabletProjectBudget') {
        const { properties } = item as ProjectTabContentTableProjectBudget
        return <TableProjectBudget key={key} {...properties} />
      }

      if (type === 'tabletProjectSummary') {
        const { properties } = item as ProjectTabContentTableProjectSummary
        return <TableProjectSummary key={key} {...properties} />
      }

      if (type === 'timeline') {
        const { properties } = item as ProjectTabContentTimeline
        return <Timeline key={key} {...properties} />
      }

      if (type === 'teamMember') {
        const { properties } = item as ProjectTabContentTeamMember
        return <TeamMember key={key} topPadding={topPadding} {...properties} />
      }

      if (type === 'unorderedList') {
        const { properties } = item as ProjectTabContentUnorderedList
        return (
          <UnorderedList key={key} topPadding={topPadding} {...properties} />
        )
      }

      return null
    })
    .filter(Boolean)

  const bottomTeamTab =
    ProjectTabName.Team === tabName ? (
      <ProjectRequestBanner style={{ marginTop: '1rem' }} />
    ) : null

  return (
    <Container ref={ref}>
      {mappedContent}
      {bottomTeamTab}
    </Container>
  )
}
