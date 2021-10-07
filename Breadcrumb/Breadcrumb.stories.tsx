import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
} as Meta

const item1: BreadcrumbItem = {
  name: 'project-and-donation-match',
  label: '1. Project and donation match',
  linkUrl: '#',
}
const item2: BreadcrumbItem = {
  name: 'build-campaign-profile',
  label: '2. Build your campaign profile',
  linkUrl: '#',
}
const item3: BreadcrumbItem = {
  name: 'review-push-live',
  label: '3. Review and push your campaign live',
  linkUrl: '#',
}
const items = [item1, item2, item3]

const Template: Story = (args) => (
  <Breadcrumb items={items} currentItemName={item1.name} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  items,
  currentItemName: item1.name,
}

export const TwoItems = Template.bind({})
TwoItems.args = {
  items: [item1, item2],
  currentItemName: item2.name,
}

export const OnClick = Template.bind({})
OnClick.args = {
  items: items.map((item) => ({
    name: item.name,
    label: item.label,
    onClick: (name) => console.warn('clicked ' + name),
  })),
  currentItemName: item1.name,
}
