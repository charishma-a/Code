import { projectTabResearch } from './research'
import { projectTabSummary } from './summary'
import { projectTabProject } from './project'
import { ProjectSlugs, ProjectTabName, ProjectTabs } from './types'
import { projectTabTeam } from './team'
import { projectTabDisease } from './diease'

const commonUpdatesTab = {
  clickID: 'project-page-click-updates',
  tabName: ProjectTabName.Updates,
}

const commonActivityTab = {
  clickID: 'project-page-click-activity',
  tabName: ProjectTabName.Activity,
}

export const projectTabs: ProjectTabs = {
  [ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS]: [
    projectTabProject[ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS],
    projectTabResearch[ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS],
    projectTabTeam[ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS],
    {
      ...commonActivityTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
  [ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION]: [
    projectTabProject[ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION],
    projectTabResearch[ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION],
    projectTabTeam[ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION],
    {
      ...commonActivityTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
  [ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH]: [
    projectTabProject[ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH],
    projectTabResearch[ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH],
    projectTabTeam[ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH],
    {
      ...commonActivityTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
  [ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS]: [
    projectTabSummary[ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS],
    projectTabResearch[ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS],
    projectTabTeam[ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS],
    projectTabDisease[ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS],
    {
      ...commonUpdatesTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
  [ProjectSlugs.BREAST_CANCER_RELAPSE]: [
    projectTabSummary[ProjectSlugs.BREAST_CANCER_RELAPSE],
    projectTabResearch[ProjectSlugs.BREAST_CANCER_RELAPSE],
    projectTabTeam[ProjectSlugs.BREAST_CANCER_RELAPSE],
    // projectTabDisease[ProjectSlugs.BREAST_CANCER_RELAPSE],
    {
      ...commonUpdatesTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
  [ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT]: [
    projectTabSummary[ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT],
    projectTabResearch[ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT],
    projectTabTeam[ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT],
    projectTabDisease[ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT],
    {
      ...commonUpdatesTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
  [ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION]: [
    projectTabProject[ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION],
    projectTabResearch[ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION],
    projectTabTeam[ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION],
    {
      ...commonActivityTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
  [ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME]: [
    projectTabSummary[ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME],
    projectTabResearch[ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME],
    projectTabTeam[ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME],
    projectTabDisease[ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME],
    {
      ...commonUpdatesTab,
      content: [
        {
          content: 'There is currently no updates.',
          type: 'paragraph',
        },
      ],
    },
  ],
}
