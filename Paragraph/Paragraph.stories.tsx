import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { DEFAULT_CHARACTER_LENGTH, Paragraph } from './Paragraph'

export default {
  title: 'Paragraph',
  component: Paragraph,
} as Meta

const text =
  'Caring for a new baby often feels overwhelming and can lead to feelings of inadequacy or experiences of extreme distress. These feelings are normal and have a biological basis that can be understood by decoding the brain. Our research holds promise in informing the most effective therapeutics for postpartum depression so more mothers can experience the joys of caring for their newborn.'
const Template: Story = (args) => <Paragraph {...args} />

export const Default = Template.bind({})
Default.args = {
  children: text,
}

export const Ellipsis = Template.bind({})
Ellipsis.args = {
  characterLength: DEFAULT_CHARACTER_LENGTH,
  children: text,
}
