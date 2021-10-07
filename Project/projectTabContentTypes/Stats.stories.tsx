import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Stats } from './Stats'

export default {
  title: 'Stats',
  component: Stats,
} as Meta

const Template: Story = (args) => <Stats stats={[]} {...args} />

export const Default = Template.bind({})
Default.args = {
  stats: [
    {
      description:
        'The number of people who are diagnosed and die from pancreatic cancer in the U.S. every year.',
      title: '40,000+',
    },
    {
      description:
        'The 5-year survival rate after being diagnosed with pancreatic cancer is less than 10%.',
      title: '< 10%',
    },
    {
      description:
        'The approximate percentage of non-cancerous cells in a pancreatic cancer tumor.',
      title: '90%',
    },
  ],
}

export const TwoItems = Template.bind({})
TwoItems.args = {
  stats: [
    {
      description:
        'of mothers experience postpartum depression and 10% of fathers',
      title: '15%',
    },
    {
      description:
        'Suicide is the 7th leading cause of maternal death in the U.S.',
      title: '7th',
    },
  ],
}

export const V2 = Template.bind({})
V2.args = {
  v2: true,
  stats: [
    {
      description:
        'of mothers experience postpartum depression and 10% of fathers',
      title: '15%',
    },
    {
      description:
        'Suicide is the 7th leading cause of maternal death in the U.S.',
      title: '7th',
    },
    {
      description:
        'Suicide is the 7th leading cause of maternal death in the U.S.',
      title: '7th',
    },
  ],
}

export const TwoItemsV2 = Template.bind({})
TwoItemsV2.args = {
  v2: true,
  stats: [
    {
      description:
        'of mothers experience postpartum depression and 10% of fathers',
      title: '15%',
    },
    {
      description:
        'Suicide is the 7th leading cause of maternal death in the U.S.',
      title: '7th',
    },
  ],
}
