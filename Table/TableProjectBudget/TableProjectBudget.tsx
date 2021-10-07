import React from 'react'

import { BaseComponentProps } from '@/common/types'
import { TableV2 } from '../TableV2'
import { device } from '@/utils/device'

export type TableProjectBudgetItem = {
  category: JSX.Element | string
  description: JSX.Element | string
  totalCostUsd: JSX.Element | string
  highlightBg?: boolean
  highlightText?: boolean
  removeEmptyCells?: boolean
  style?: string
}

export interface TableProjectBudgetProps extends BaseComponentProps {
  data: TableProjectBudgetItem[]
  topPadding?: boolean
}

export const TableProjectBudget: React.FC<TableProjectBudgetProps> = ({
  data,
  topPadding,
}) => {
  const columns = [
    {
      accessor: 'category',
      Header: 'Category',
    },
    { accessor: 'description', Header: 'Description' },
    { accessor: 'totalCostUsd', Header: 'Total Cost ($USD)' },
  ]

  const updatedData = data.map(
    ({
      category,
      description,
      totalCostUsd,
      highlightBg,
      highlightText,
      removeEmptyCells,
      style,
    }) => {
      const rowStyles = `
      @media ${device.tablet} {
        tr {
          grid-template-columns:
          minmax(100px, 1fr)
          minmax(150px, 2fr)
          minmax(50px, 1fr);
        }
      }
      ${highlightBg ? 'background: #F6F3FF;' : ''}

      ${highlightText ? 'td { color: #8256FF; }' : ''}

      ${style || ''}
      `
      return {
        category,
        description,
        totalCostUsd,
        removeEmptyCells,
        rowStyles,
      }
    }
  )

  return (
    <TableV2
      columns={columns}
      data={updatedData}
      showHeaderRow={true}
      topPadding={topPadding}
    />
  )
}
