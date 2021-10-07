import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ProjectChampionsAside } from './ProjectChampionsAside'
import { Gender } from '@/generated/graphql'
import {
  projectOrganizations,
  projectOrganizationsArchived,
} from '@/fixtures/projectOrganizations'

const projectChampions = [
  {
    id: '1',
    avatar: 'avatar-mike.png',
    donationsMatchedTotal: 200,
    active: true,
    openMatchCommitment: 1800,
    profile: {
      id: '1',
      firstName: 'Mike',
      lastName: 'Haughton',
      email: 'mike@kernls.com',
      companyRole: 'CEO and Father',
      anonymous: false,
      gender: Gender.Male,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: 'Dedicated to Maggie',
    matchCommitment: 2000,
    donationsAttributedTotal: 200,
    quote: `"I'm supporting this project because my mother Rosa died of pancreatic cancer in 2009. It's a deadly disease that requires some innovating thinking, and I believe Dr. Keating's approach brings that to the table."`,
  },
  {
    id: '2',
    avatar: 'avatar-anonymous.png',
    openMatchCommitment: 5000,
    active: true,
    profile: {
      id: '2',
      firstName: '',
      lastName: '',
      email: '',
      companyRole: '',
      anonymous: true,
      gender: undefined,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: '',
    matchCommitment: 5000,
    donationsAttributedTotal: 0,
    quote: ``,
  },
  {
    id: '3',
    avatar: 'avatar-ross-blum.png',
    openMatchCommitment: 7900,
    active: true,
    profile: {
      id: '3',
      firstName: 'Ross',
      lastName: 'Blum',
      email: '',
      companyRole: '',
      anonymous: false,
      gender: Gender.Male,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: 'Dedicated to Abbey Blum',
    matchCommitment: 8000,
    donationsAttributedTotal: 100,
    quote: ``,
  },
  {
    id: '4',
    avatar: 'avatar-russel-browne.png',
    openMatchCommitment: 1500,
    active: true,
    profile: {
      id: '4',
      firstName: 'Russ',
      lastName: 'Browne',
      email: '',
      companyRole: '',
      anonymous: false,
      gender: Gender.Male,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: 'Dedicated to Dr. Phyllis Browne',
    matchCommitment: 2000,
    donationsAttributedTotal: 500,
    quote: ``,
  },
  {
    id: '5',
    avatar: 'avatar-anonymous.png',
    openMatchCommitment: 3000,
    active: true,
    profile: {
      id: '5',
      firstName: '',
      lastName: '',
      email: '',
      companyRole: '',
      anonymous: true,
      gender: undefined,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: '',
    matchCommitment: 3000,
    donationsAttributedTotal: 0,
    quote: ``,
  },
]

const projectPreviousChampions = [
  {
    id: '1',
    avatar: 'avatar-mike.png',
    donationsMatchedTotal: 200,
    active: false,
    isArchived: true,
    openMatchCommitment: 1800,
    profile: {
      id: '1',
      firstName: 'Mike',
      lastName: 'Haughton',
      email: 'mike@kernls.com',
      companyRole: 'CEO and Father',
      anonymous: false,
      gender: Gender.Male,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: 'Dedicated to Maggie',
    matchCommitment: 2000,
    donationsAttributedTotal: 200,
    quote: `"I'm supporting this project because my mother Rosa died of pancreatic cancer in 2009. It's a deadly disease that requires some innovating thinking, and I believe Dr. Keating's approach brings that to the table."`,
  },
  {
    id: '2',
    avatar: 'avatar-anonymous.png',
    openMatchCommitment: 5000,
    active: false,
    isArchived: true,
    profile: {
      id: '2',
      firstName: '',
      lastName: '',
      email: '',
      companyRole: '',
      anonymous: true,
      gender: undefined,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: '',
    matchCommitment: 5000,
    donationsAttributedTotal: 0,
    quote: ``,
  },
  {
    id: '3',
    avatar: 'avatar-ross-blum.png',
    openMatchCommitment: 7900,
    active: false,
    isArchived: true,
    profile: {
      id: '3',
      firstName: 'Ross',
      lastName: 'Blum',
      email: '',
      companyRole: '',
      anonymous: false,
      gender: Gender.Male,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: 'Dedicated to Abbey Blum',
    matchCommitment: 8000,
    donationsAttributedTotal: 100,
    quote: ``,
  },
  {
    id: '4',
    avatar: 'avatar-russel-browne.png',
    openMatchCommitment: 1500,
    active: false,
    isArchived: true,
    profile: {
      id: '4',
      firstName: 'Russ',
      lastName: 'Browne',
      email: '',
      companyRole: '',
      anonymous: false,
      gender: Gender.Male,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: 'Dedicated to Dr. Phyllis Browne',
    matchCommitment: 2000,
    donationsAttributedTotal: 500,
    quote: ``,
  },
  {
    id: '5',
    avatar: 'avatar-anonymous.png',
    openMatchCommitment: 3000,
    active: false,
    isArchived: true,
    profile: {
      id: '5',
      firstName: '',
      lastName: '',
      email: '',
      companyRole: '',
      anonymous: true,
      gender: undefined,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
    dedicatedNote: '',
    matchCommitment: 3000,
    donationsAttributedTotal: 0,
    quote: ``,
  },
]

export default {
  title: 'ProjectChampionsAside',
  component: ProjectChampionsAside,
} as Meta

const Template: Story = (args) => <ProjectChampionsAside {...args} />

export const NoChampions = Template.bind({})
NoChampions.args = {
  projectChampions: [],
}

export const OneChampion = Template.bind({})
OneChampion.args = {
  projectChampions: [projectChampions[0]],
}

export const OneAnonymousChampion = Template.bind({})
OneAnonymousChampion.args = {
  projectChampions: [projectChampions[1]],
}

export const OneChampionWithReferred = Template.bind({})
OneChampionWithReferred.args = {
  projectChampions: [projectChampions[0]],
  referredId: '1',
}

export const OneChampionWithReferredNoOpenMatch = Template.bind({})
OneChampionWithReferredNoOpenMatch.args = {
  projectChampions: [
    {
      ...projectChampions[0],
      openMatchCommitment: 0,
    },
  ],
  referredId: '1',
}

export const OneAnonymousChampionWithReferred = Template.bind({})
OneAnonymousChampionWithReferred.args = {
  projectChampions: [projectChampions[1]],
  referredId: '2',
}

export const TwoChampions = Template.bind({})
TwoChampions.args = {
  projectChampions: [projectChampions[2], projectChampions[3]],
}

export const TwoChampionsWithAnonymous = Template.bind({})
TwoChampionsWithAnonymous.args = {
  projectChampions: [projectChampions[0], projectChampions[1]],
}

export const TwoChampionsWithReferred = Template.bind({})
TwoChampionsWithReferred.args = {
  projectChampions: [projectChampions[2], projectChampions[3]],
  referredId: '4',
}

export const TwoChampionsWithReferredNoMatch = Template.bind({})
TwoChampionsWithReferredNoMatch.args = {
  projectChampions: [
    {
      ...projectChampions[0],
      openMatchCommitment: 0,
    },
    projectChampions[1],
  ],
  referredId: '1',
}

export const MultipleChampions = Template.bind({})
MultipleChampions.args = {
  projectChampions,
}

export const MultipleChampionsWithReferred = Template.bind({})
MultipleChampionsWithReferred.args = {
  projectChampions,
  referredId: '1',
}

export const MultipleChampionsWithReferredNoMatch = Template.bind({})
MultipleChampionsWithReferredNoMatch.args = {
  projectChampions: projectChampions.map((projectChampion) => {
    if (projectChampion.id === '1') {
      return {
        ...projectChampions[0],
        openMatchCommitment: 0,
      }
    }
    return projectChampion
  }),
  referredId: '1',
}
export const AllAnonymousChampionsWithReferred = Template.bind({})
AllAnonymousChampionsWithReferred.args = {
  projectChampions: [projectChampions[1], projectChampions[4]],
  referredId: '2',
}

export const OnePreviousChampion = Template.bind({})
OnePreviousChampion.args = {
  projectChampions: [projectPreviousChampions[0]],
}

export const MultiplePreviousChampions = Template.bind({})
MultiplePreviousChampions.args = {
  projectChampions: projectPreviousChampions,
}

export const MultiplePreviousChampionsWithReferred = Template.bind({})
MultiplePreviousChampionsWithReferred.args = {
  projectChampions: projectPreviousChampions,
  referredId: '3',
}

export const OneOrganization = Template.bind({})
OneOrganization.args = {
  projectOrganizations: [projectOrganizations[0]],
}

export const MultipleOrganizations = Template.bind({})
MultipleOrganizations.args = {
  projectOrganizations,
}

export const MultipleOrganizationsWithReferred = Template.bind({})
MultipleOrganizationsWithReferred.args = {
  projectOrganizations,
  referredId: '3',
}

export const MultipleOrganizationsChampions = Template.bind({})
MultipleOrganizationsChampions.args = {
  projectChampions,
  projectOrganizations,
}

export const MultipleOrganizationsChampionsWithReferred = Template.bind({})
MultipleOrganizationsChampionsWithReferred.args = {
  projectChampions,
  projectOrganizations,
  referredId: '3',
}

export const MultipleOrganizationsChampionsPrevious = Template.bind({})
MultipleOrganizationsChampionsPrevious.args = {
  projectChampions: [
    projectPreviousChampions[0],
    projectPreviousChampions[2],
    projectChampions[3],
  ],
  projectOrganizations: [
    projectOrganizations[0],
    projectOrganizationsArchived[1],
  ],
}
