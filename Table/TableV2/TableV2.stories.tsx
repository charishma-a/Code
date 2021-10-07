import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { TableV2 } from './TableV2'
import { device } from '@/utils/device'
import styled from 'styled-components'
import { Tooltip, TooltipIcon, TooltipText } from '@/common/styled'
import { IMAGE_PROPS_INFO_PURPLE } from '@/constants/images'

export default {
  title: 'TableV2',
  component: TableV2,
} as Meta

const defaultProps = {
  columns: [
    {
      accessor: 'category',
      Header: 'Category',
    },
    { accessor: 'description', Header: 'Description' },
    { accessor: 'totalCostUsd', Header: 'Total Cost ($USD)' },
  ],
  data: [
    {
      category: 'Salaries & Benefits',
      description: 'Post-doctoral Fellow',
      totalCostUsd: '$40,000',
    },
    {
      category: 'Materials and Supplies',
      description: (
        <>
          <p style={{ marginTop: 0 }}>
            Flowcytometry, secretome, miRNA seq, mass spectrometry analyses
          </p>
          <p style={{ marginBottom: 0 }}>
            Tissue culture media, Plasticware & cytokines, Antibodies, Cell
            lines
          </p>
        </>
      ),
      totalCostUsd: '$20,000',
    },
    {
      category: 'Travel',
      description: 'Travel to conference for PDF',
      totalCostUsd: '$1,500',
    },
    {
      category: 'Knowledge Translation',
      description: 'Publication costs',
      totalCostUsd: '$3,850',
    },
    {
      category: 'Total Funds',
      description: '',
      totalCostUsd: '$122,350',
      removeEmptyCells: true,
      rowStyles: `
        grid-template-columns:
        minmax(150px, 2fr)
        minmax(150px, 1fr); td { color: #8256FF; }
      `,
    },
    {
      category: 'Research Institute Salaries & Administrative Support – 15%',
      description: '',
      totalCostUsd: '$18,350',
      removeEmptyCells: true,
      rowStyles: `
        grid-template-columns:
        minmax(150px, 2fr)
        minmax(150px, 1fr);
      `,
    },
    {
      category: 'Space – 15%',
      description: '',
      totalCostUsd: '$18,350',
      removeEmptyCells: true,
      rowStyles: `
        grid-template-columns:
        minmax(150px, 2fr)
        minmax(150px, 1fr);
      `,
    },
    {
      category: 'Research Institute Operations - 10%',
      description: '',
      totalCostUsd: '$12,250',
      removeEmptyCells: true,
      rowStyles: `
        grid-template-columns:
        minmax(150px, 2fr)
        minmax(150px, 1fr);
      `,
    },
    {
      category: 'Total',
      description: '',
      totalCostUsd: '$171,300',
      removeEmptyCells: true,
      rowStyles: `
        background: #F6F3FF;
        td { color: #8256FF; }
        grid-template-columns:
        minmax(150px, 2fr)
        minmax(150px, 1fr);
      `,
    },
  ],
  showHeaderRow: true,
  topPadding: true,
}

const Template: Story = (args) => <TableV2 {...defaultProps} {...args} />

export const Default = Template.bind({})
Default.args = {
  ...defaultProps,
  tableBodyStyles: `
    tr td:first-child,
    tr td: last-child {
      font-weight: 600;
    }
  `,
}

const Circle = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
`

export const Legend = Template.bind({})
Legend.args = {
  columns: [
    {
      accessor: 'code',
      Header: 'Code',
    },
    { accessor: 'name', Header: 'Name' },
    { accessor: 'price', Header: 'price' },
  ],
  data: [
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
  ],
  tableStyles: `
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
    }

    tr:not(:last-child),
    thead tr {
      border-bottom: none;
    }
  `,
  showHeaderRow: false,
  topPadding: false,
}

const TextIconContainer = styled.div`
  align-items: center;
  display: flex;
  > *:not(:last-child) {
    margin-right: 0.3rem;
  }
`
const StyledIcon = styled(TooltipIcon)`
  @media ${device.laptop} {
    width: 1rem;
    height: 1rem;
  }
`

export const ProjectSummary = Template.bind({})
ProjectSummary.args = {
  columns: [
    {
      accessor: 'icon',
      Header: 'Icon',
    },
    { accessor: 'name', Header: 'Name' },
    { accessor: 'description', Header: 'Description' },
  ],
  data: [
    {
      icon: <img src="/assets/svgs/project-length.svg" />,
      name: 'Project Length',
      description: '1 year',
    },
    {
      icon: <img src="/assets/svgs/project-goal.svg" />,
      name: 'Goal',
      description:
        'Identify how stress impacts a mother’s brain circuitry and how that brain function affects parental behaviors.',
    },
    {
      icon: <img src="/assets/svgs/project-research-type.svg" />,
      name: 'Research Type',
      description: (
        <TextIconContainer>
          <p>Exploratory</p>
          <Tooltip>
            <StyledIcon
              alt={IMAGE_PROPS_INFO_PURPLE.getAlt()}
              src={IMAGE_PROPS_INFO_PURPLE.getSrc()}
            />
            <TooltipText>
              This amount combines what Aaron has donated + donations from his
              network
            </TooltipText>
          </Tooltip>
        </TextIconContainer>
      ),
    },
  ],
  tableStyles: `
    border: none;
    
    tr {
      grid-template-columns:
      minmax(30px, auto)
      minmax(100px, 1fr)
      minmax(100px, 1fr);

      td {
        padding: 0.5rem 0.3rem;

        &:first-child {
          img {
            height: 14px;
            width: 14px;
          }
        }
      }
    }

    @media ${device.tablet} {
      td {
        &:first-child img {
          margin-top: 0.3rem;
          height: 17px;
          width: 17px;
        }
      }
    }
  `,
  showHeaderRow: false,
  topPadding: false,
}
