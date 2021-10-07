import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { TableProjectSummary } from './TableProjectSummary'

export default {
  title: 'TableProjectSummary',
  component: TableProjectSummary,
} as Meta

const defaultProps = {
  projectLength: '1 year',
  projectGoal:
    'Identify how stress impacts a mother’s brain circuitry and how that brain function affects parental behaviors.',
  projectResearchType: <div>Exploratory</div>,
  topPadding: false,
}

const Template: Story = (args) => (
  <TableProjectSummary {...defaultProps} {...args} />
)

export const Default = Template.bind({})
Default.args = defaultProps
