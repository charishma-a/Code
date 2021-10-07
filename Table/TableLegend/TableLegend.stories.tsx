import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { TableLegend, TableLegendCircle } from './TableLegend'

export default {
  title: 'TableLegend',
  component: TableLegend,
} as Meta

const defaultProps = {
  data: [
    {
      code: <TableLegendCircle style={{ background: '#B8E8EB' }} />,
      name: 'Lab consumables',
      description: '$5,000',
    },
    {
      code: <TableLegendCircle style={{ background: '#00C0CC' }} />,
      name: 'Animal models',
      description: '$15,000',
    },
    {
      code: <TableLegendCircle style={{ background: '#004549' }} />,
      name: 'Facilities & admin',
      description: '$5,000',
    },
  ],
  topPadding: false,
}

const Template: Story = (args) => <TableLegend {...defaultProps} {...args} />

export const Default = Template.bind({})
Default.args = defaultProps
