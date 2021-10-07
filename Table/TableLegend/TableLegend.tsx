import React from 'react'

import { BaseComponentProps } from '@/common/types'
import { TableV2 } from '../TableV2'
import styled from 'styled-components'

export const TableLegendCircle = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
`

export type TabletLegendItem = {
  code: JSX.Element | string
  description: JSX.Element | string
  name: JSX.Element | string
}

export interface TableLegendProps extends BaseComponentProps {
  data: TabletLegendItem[]
  topPadding?: boolean
}

export const TableLegend: React.FC<TableLegendProps> = ({
  data,
  topPadding,
}) => {
  const columns = [
    {
      accessor: 'code',
      Header: 'Code',
    },
    { accessor: 'name', Header: 'Name' },
    { accessor: 'description', Header: 'description' },
  ]

  const tableStyles = `
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
