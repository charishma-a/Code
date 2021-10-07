import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { SingleFocusedTabs } from './SingleFocusedTabs'
import { Paragraph } from '../Paragraph'
import styled from 'styled-components'
import { InfoBox } from '@/common/styled'

export default {
  title: 'SingleFocusedTabs',
  component: SingleFocusedTabs,
} as Meta

const InfoBoxLocked = styled(InfoBox)`
  background: #8f8f8f;
  p {
    color: #ffffff;
  }
`

const defaultTabs = [
  {
    content: (
      <>
        <Paragraph>
          In the start-up phase, Dr. Autry and Brenda will use an animal model
          of postpartum depression to uncover the impact of stress on the brain
          circuits that control maternal behavior.{' '}
        </Paragraph>
      </>
    ),
    renderFooter: () => (
      <InfoBox>
        <a>$200,000 is needed to launch this project. See what comes next</a>
      </InfoBox>
    ),
    id: 'one',
    title: 'PROJECT START-UP 2021',
  },
  {
    content: (
      <>
        <Paragraph>
          In the start-up phase, Dr. Autry and Brenda will use an animal model
          of postpartum depression to uncover the impact of stress on the brain
          circuits that control maternal behavior.{' '}
        </Paragraph>
      </>
    ),
    renderFooter: () => (
      <InfoBoxLocked>
        <Paragraph>
          This Funding Goal will be unlocked if Project Start-Up is successful
        </Paragraph>
      </InfoBoxLocked>
    ),
    id: 'two',
    title: "WHAT'S NEXT: 2022",
  },
]

const Template: Story = (args) => (
  <SingleFocusedTabs tabs={defaultTabs} {...args} />
)

export const Default = Template.bind({})
Default.args = {}
