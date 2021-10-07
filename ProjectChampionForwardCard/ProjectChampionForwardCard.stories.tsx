import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ProjectChampionForwardCard } from './ProjectChampionForwardCard'
import {
  Gender,
  PartialProjectOrganizationFragment,
  PartialProjectOrganizationMemberFragment,
  ProjectChampionPresenceOnPage,
} from '@/generated/graphql'

const ben: PartialProjectOrganizationMemberFragment = {
  id: '1',
  avatar: 'avatar-sandy-gibson.png',
  presenceOnPage: ProjectChampionPresenceOnPage.FullName,
  quote: `"I'm supporting this project because my mother Rosa died of pancreatic cancer in 2009. It's a deadly disease that requires some innovating thinking, and I believe Dr. Keating's approach brings that to the table."`,
  dedicatedNote: 'Dedicated to Maggie',
  organizationMember: {
    id: '1',
    organizationRole: 'CEO of Wilco',
    profile: {
      id: '1',
      firstName: 'Ben',
      lastName: 'Kom',
      email: 'benkom@wilco.com',
    },
  },
}
const projectOrganization: PartialProjectOrganizationFragment = {
  id: '1',
  donationsMatchedTotal: 200,
  active: true,
  avatar: 'avatar-better-place-forests.png',
  organization: {
    avatar: 'avatar-better-place-forests.png',
    id: '1',
    name: 'Wilco',
    profile: {
      id: '1',
      avatar: '',
      gender: Gender.Male,
      firstName: 'Yves',
      lastName: 'Matta',
      email: 'test@hotmail.com',
    },
  },
  forwardProjectOrganizationMember: ben,
  openMatchCommitment: 1800,
  openMatchCommitmentCad: 2100,
  dedicatedNote: 'from org dedication nte',
  matchCommitment: 2000,
  donationsAttributedTotal: 200,
  isArchived: false,
  isActiveAndMatching: true,
  quote: `From org quote`,
}

export default {
  title: 'ProjectChampionForwardCard',
  component: ProjectChampionForwardCard,
} as Meta

const Template: Story = (args) => (
  <ProjectChampionForwardCard id={args.id} {...projectOrganization} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  ...projectOrganization,
}

export const NoQuote = Template.bind({})
NoQuote.args = {
  ...projectOrganization,
  forwardProjectOrganizationMember: {
    ...projectOrganization.forwardProjectOrganizationMember,
    quote: undefined,
  },
}

export const NoRole = Template.bind({})
NoRole.args = {
  ...projectOrganization,
  forwardProjectOrganizationMember: {
    ...projectOrganization.forwardProjectOrganizationMember,
    quote: undefined,
    organizationMember: {
      ...projectOrganization.forwardProjectOrganizationMember
        .organizationMember,
      organizationRole: undefined,
    },
  },
}

export const NoAvatar = Template.bind({})
NoAvatar.args = {
  ...projectOrganization,
  organization: {
    ...projectOrganization.organization,
    avatar: undefined,
  },
}
