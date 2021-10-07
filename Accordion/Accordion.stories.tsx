import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Accordion } from './Accordion'
import { TableV2 } from '../Table'
import styled from 'styled-components'

const defaultData = [
  {
    content: (
      <p>
        Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat
        ut occaecat consequat est minim minim esse tempor laborum consequat esse
        adipisicing eu reprehenderit enim.
      </p>
    ),
    heading: 'What harsh truths do you prefer to ignore?',
    id: 'harsh-truths',
  },
  {
    content: (
      <p>
        In ad velit in ex nostrud dolore cupidatat consectetur ea in ut nostrud
        velit in irure cillum tempor laboris sed adipisicing eu esse duis nulla
        non.
      </p>
    ),
    heading: 'Is free will real or just an illusion?',
    id: 'free-will-vs-illusion',
  },
]

export default {
  title: 'Accordion',
  component: Accordion,
} as Meta

const Template: Story = (args) => <Accordion data={defaultData} {...args} />

export const Default = Template.bind({})
Default.args = {
  data: defaultData,
}

const Circle = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
`

export const WithTable = Template.bind({})
WithTable.args = {
  data: [
    {
      content: (
        <TableV2
          columns={[
            {
              accessor: 'code',
              Header: 'Code',
            },
            { accessor: 'name', Header: 'Name' },
            { accessor: 'price', Header: 'price' },
          ]}
          data={[
            {
              code: <Circle style={{ background: '#B8E8EB' }} />,
              name: 'Personnel',
              price: '$20,000',
            },
            {
              code: <Circle style={{ background: '#00C0CC' }} />,
              name: 'Equipment',
              price: '$20,000',
            },
            {
              code: <Circle style={{ background: '#004549' }} />,
              name: 'Materials and supplies',
              price: '$20,000',
            },
          ]}
          showHeaderRow={false}
          tableStyles={`
      border: none;
      
      tr {
        grid-template-columns:
        minmax(30px, auto)
        minmax(150px, 1fr)
        minmax(50px, 1fr);
  
        td {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0.5rem 0.3rem;
        }
        td:last-child {
          align-items: flex-end;
        }
      }
  
      tr:not(:last-child),
      thead tr {
        border-bottom: none;
      }
    `}
        />
      ),
      id: 'with-table',
      heading: 'View Details',
    },
  ],
}
