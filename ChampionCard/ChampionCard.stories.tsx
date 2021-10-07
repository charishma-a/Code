import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ChampionCard } from './ChampionCard'
import {
  Gender,
  GoalType,
  ProjectChampionPresenceOnPage,
} from '@/generated/graphql'

const projectChampion = {
  id: '69b03076-768f-4d28-83f5-67b7990000a2',
  donationsMatchedTotal: 200,
  active: true,
  avatar: 'avatar-mike.png',
  openMatchCommitment: 1800,
  openMatchCommitmentCad: 2100,
  profile: {
    id: '69b03076-768f-4d28-83f5-67b7990000a2',
    firstName: 'Mike',
    lastName: 'Haughton',
    email: 'mike@kernls.com',
    avatar: 'avatar-mike.png',
    anonymous: false,
    gender: Gender.Male,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  project: {
    id: '123',
    active: true,
    title: 'example title',
    video: null,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    deletedAt: null,
    goal: 200000,
    isActive: true,
    embeddedCode: 'YV562SD',
    slug: 'example-title',
    description: 'example desc',
    disease: 'breast cancer',
    mainImage: '',
    goalType: GoalType.Flexible,
  },
  dedicatedNote: 'Dedicated to Maggie',
  matchCommitment: 2000,
  donationsAttributedTotal: 200,
  bio: 'CEO and Father',
  presenceOnPage: ProjectChampionPresenceOnPage.FullName,
  isArchived: false,
  isActiveAndMatching: true,
  quote: `"I'm supporting this project because my mother Rosa died of pancreatic cancer in 2009. It's a deadly disease that requires some innovating thinking, and I believe Dr. Keating's approach brings that to the table."`,
}

export default {
  title: 'ChampionCard',
  component: ChampionCard,
} as Meta

const Template: Story = (args) => (
  <ChampionCard id={args.id} {...projectChampion} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  ...projectChampion,
}

export const NoQuote = Template.bind({})
NoQuote.args = {
  ...projectChampion,
  quote: undefined,
}

export const NoRole = Template.bind({})
NoRole.args = {
  ...projectChampion,
  quote: undefined,
  profile: {
    ...projectChampion.profile,
    bio: undefined,
  },
}
