import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { TableProjectBudget } from './TableProjectBudget'

export default {
  title: 'TableProjectBudget',
  component: TableProjectBudget,
} as Meta

const defaultProps = {
  data: [
    {
      category: 'Materials and supplies',
      description: 'Lab consumables (i.e., globes, pipet tips)',
      totalCostUsd: '$5,000',
    },
    {
      category: 'Animal models',
      description:
        '100 cages for animal models; viruses, antibodies, small implants for behavior',
      totalCostUsd: '$15,000',
    },
    {
      category: 'Facilities & admin',
      description: 'Core Facilities',
      totalCostUsd: '$5,000',
    },
    {
      category: 'Total',
      description: '',
      totalCostUsd: '$25,000',
      highlightBg: true,
      highlightText: true,
    },
  ],
  topPadding: false,
}

const Template: Story = (args) => (
  <TableProjectBudget {...defaultProps} {...args} />
)

export const Default = Template.bind({})
Default.args = defaultProps
