import { HTMLAttributes } from 'react'

import { StatsProps } from '@/components/Project/projectTabContentTypes/Stats'
import { TeamMemberProps } from '@/components/Project/projectTabContentTypes/TeamMember'
import { UnorderedListProps } from '@/components/Project/projectTabContentTypes/UnorderedList'
import {
  TableProps,
  TableV2Props,
  TableProjectBudgetProps,
  TableProjectSummaryProps,
} from '@/components/Table'
import { OrderedListProps } from '@/components/Project/projectTabContentTypes/OrderedList'
import { IconTextAlertProps } from '@/components/IconTextAlert'
import { SingleFocusedTabsProps } from '@/components/SingleFocusedTabs'
import { TimelineProps } from '@/components/Timeline'

export enum ProjectSlugs {
  OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS = 'optimize-cell-activity-non-hodgkins',
  UNTANGLING_POSTPARTUM_DEPRESSION = 'untangling-postpartum-depression',
  SLOW_PANCREATIC_CANCER_GROWTH = 'slow-pancreatic-cancer-growth',
  SEQUENCING_BILIARY_TRACT_CANCERS = 'sequencing-biliary-tract-cancers',
  BREAST_CANCER_RELAPSE = 'breast-cancer-relapse',
  PERSONALIZED_BREAST_CANCER_TREATMENT = 'personalized-breast-cancer-treatment',
  ALZHEIMERS_DISEASE_DETECTION = 'alzheimers-disease-detection',
  ALZHEIMERS_DISEASE_DOWN_SYNDROME = 'alzheimers-disease-down-syndrome',
}

export interface ProjectTabContent {
  className?: string
  content: JSX.Element | string
  properties?: Record<string, any>
  topPadding?: boolean
  type: 'topHeading' | 'heading' | 'paragraph'
}

export interface ProjectTabContentIconTextAlertProps {
  href: string
  tabToSet?: string
}

export interface ProjectTabContentIconTextAlert
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: IconTextAlertProps
  type: 'iconTextAlert'
}

export interface ProjectTabContentImage
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: HTMLAttributes<HTMLImageElement>
  type: 'image'
}

export interface ProjectTabContentLinkProps {
  href: string
  tabToSet?: string
}

export interface ProjectTabContentLink
  extends Omit<ProjectTabContent, 'properties' | 'type'> {
  properties?: ProjectTabContentLinkProps
  type: 'link'
}

export interface ProjectTabContentStats
  extends Omit<ProjectTabContent, 'properties' | 'type'> {
  properties?: StatsProps
  type: 'stats'
}

export interface ProjectTabContentSingleFocusedTabs
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  getProperties?: ({
    onClickTab,
  }: {
    onClickTab: (tabToSet: string) => void
  }) => SingleFocusedTabsProps
  type: 'singleFocusedTabs'
}

export interface ProjectTabContentTable
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: TableProps
  type: 'table'
}

export interface ProjectTabContentTableV2
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: TableV2Props
  type: 'tableV2'
}

export interface ProjectTabContentTableProjectSummary
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: TableProjectSummaryProps
  type: 'tabletProjectSummary'
}

export interface ProjectTabContentTableProjectBudget
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: TableProjectBudgetProps
  type: 'tabletProjectBudget'
}

export interface ProjectTabContentTeamMember
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: TeamMemberProps
  type: 'teamMember'
}

export interface ProjectTabContentUnorderedList
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: UnorderedListProps
  type: 'unorderedList'
}

export interface ProjectTabContentOrderedList
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: OrderedListProps
  type: 'orderedList'
}

export interface ProjectTabContentTimeline
  extends Omit<ProjectTabContent, 'properties' | 'type' | 'content'> {
  properties?: TimelineProps
  type: 'timeline'
}

export enum ProjectTabName {
  Project = 'Project',
  Summary = 'Summary',
  Research = 'Research',
  Team = 'Team',
  Activity = 'Activity',
  Disease = 'Disease',
  Updates = 'Updates',
  More = 'More',
}

export type ProjectTab = {
  clickID: string
  content: (
    | ProjectTabContent
    | ProjectTabContentStats
    | ProjectTabContentLink
    | ProjectTabContentSingleFocusedTabs
    | ProjectTabContentTable
    | ProjectTabContentTableV2
    | ProjectTabContentTableProjectSummary
    | ProjectTabContentTableProjectBudget
    | ProjectTabContentImage
    | ProjectTabContentTeamMember
    | ProjectTabContentTimeline
    | ProjectTabContentUnorderedList
    | ProjectTabContentOrderedList
    | ProjectTabContentIconTextAlert
  )[]
  tabName: ProjectTabName
}

export type ProjectTabSection = {
  [key: string]: ProjectTab
}

export type ProjectTabs = {
  [key: string]: ProjectTab[]
}
