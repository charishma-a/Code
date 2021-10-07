import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { WhatIsAChampion } from './WhatIsAChampion'

export default {
  title: 'WhatIsAChampion',
  component: WhatIsAChampion,
} as Meta

const Template: Story = (args) => <WhatIsAChampion {...args} />

export const Default = Template.bind({})
Default.args = {}
