import React from 'react'

import { BaseComponentProps } from '@/common/types'
import { TableV2 } from '../TableV2'
import { device } from '@/utils/device'
import {
  SVG_PROPS_PROJECT_GOAL,
  SVG_PROPS_PROJECT_LENGTH,
  SVG_PROPS_PROJECT_RESEARCH_TYPE,
} from '@/constants/svgs'

export enum TableProjectSummaryIcons {
  PROJECT_LENGTH = 'project-length',
  PROJECT_GOAL = 'project-goal',
  PROJECT_RESEARCH_TYPE = 'project-research-type',
}

export interface TableProjectSummaryProps extends BaseComponentProps {
  projectLength: JSX.Element | string
  projectGoal: JSX.Element | string
  projectResearchType: JSX.Element | string
  topPadding?: boolean
}

export const TableProjectSummary: React.FC<TableProjectSummaryProps> = ({
  projectLength,
  projectGoal,
  projectResearchType,
  topPadding,
}) => {
  const mapper: { [key: string]: string } = {
    [TableProjectSummaryIcons.PROJECT_LENGTH]:
      SVG_PROPS_PROJECT_LENGTH.getSrc(),
    [TableProjectSummaryIcons.PROJECT_GOAL]: SVG_PROPS_PROJECT_GOAL.getSrc(),
    [TableProjectSummaryIcons.PROJECT_RESEARCH_TYPE]:
      SVG_PROPS_PROJECT_RESEARCH_TYPE.getSrc(),
  }

  const columns = [
    { accessor: 'icon', Header: 'Icon', styles: 'flex: none;' },
    {
      accessor: 'heading',
      Header: 'Heading',
    },
    { accessor: 'content', Header: 'Content' },
  ]
  const data = [
    {
      icon: (
        <img alt="time" src={mapper[TableProjectSummaryIcons.PROJECT_LENGTH]} />
      ),
      heading: <strong>Project Length</strong>,
      content: projectLength,
    },
    {
      icon: (
        <img alt="target" src={mapper[TableProjectSummaryIcons.PROJECT_GOAL]} />
      ),
      heading: <strong>Goal</strong>,
      content: projectGoal,
    },
    {
      icon: (
        <img
          alt="bottle"
          src={mapper[TableProjectSummaryIcons.PROJECT_RESEARCH_TYPE]}
        />
      ),
      heading: <strong>Research Type</strong>,
      content: projectResearchType,
    },
  ]

  const tableStyles = `
  border: none;
    
  tr {
    grid-template-columns:
    minmax(30px, auto)
    minmax(70px, 0.7fr)
    minmax(100px, 1.3fr);

    td {
      padding: 0.5rem 0.3rem;

      &:first-child {
        img {
          margin-top: 0.3rem;
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
  `
  return (
    <TableV2
      columns={columns}
      data={data}
      showHeaderRow={false}
      tableStyles={tableStyles}
      topPadding={topPadding}
    />
  )
}
