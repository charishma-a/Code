import React, { useMemo } from 'react'
import { Column, useTable } from 'react-table'

import * as sc from './TableV2.styled'

import { BaseComponentProps } from '@/common/types'

export interface CustomBaseColumn {
  removeEmptyCells?: boolean
  rowStyles?: string
}

export interface TableV2Props extends BaseComponentProps {
  columns: Array<Column<Record<string, unknown>>>
  data: Record<string, unknown>[]
  renderEmptyView?: () => React.ReactNode
  showHeaderRow?: boolean
  topPadding?: boolean
  tableBodyStyles?: string
  tableHeadStyles?: string
  tableStyles?: string
}

export const TableV2: React.FC<TableV2Props> = ({
  classNames,
  columns,
  data,
  renderEmptyView = () => null,
  showHeaderRow = true,
  topPadding,
  tableBodyStyles,
  tableHeadStyles,
  tableStyles,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const columnsMemo = useMemo(() => columns, [columns])
  const dataMemo = useMemo(() => data, [data])
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnsMemo,
      data: dataMemo,
    })

  // Render the UI for your table
  return (
    <sc.Table
      className={className}
      {...getTableProps()}
      styles={tableStyles}
      topMargin={topPadding}
      {...restProps}
    >
      {showHeaderRow ? (
        <sc.TableHead
          className={`${sc.baseClass}__thead`}
          styles={tableHeadStyles}
        >
          {headerGroups.map((headerGroup) => {
            return (
              <sc.TableHeadRow
                className={`${sc.baseClass}__row ${sc.baseClass}__thead__row`}
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <sc.TableHeadCell
                      className={`${sc.baseClass}__cell ${sc.baseClass}__thead__row__cell`}
                      key={column.id}
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </sc.TableHeadCell>
                  )
                })}
              </sc.TableHeadRow>
            )
          })}
        </sc.TableHead>
      ) : null}
      <sc.TableBody
        className={`${sc.baseClass}__tbody`}
        {...getTableBodyProps()}
        styles={tableBodyStyles}
      >
        {rows.length === 0 ? (
          <sc.TableRow
            className={`${sc.baseClass}__row ${sc.baseClass}__tbody__row--empty`}
            isEmpty
          >
            <sc.TableCell
              className={`${sc.baseClass}__cell ${sc.baseClass}__tbody__row__cell`}
            >
              {renderEmptyView()}
            </sc.TableCell>
          </sc.TableRow>
        ) : (
          rows.map((row) => {
            prepareRow(row)

            const { original } = row
            const { removeEmptyCells, rowStyles } = original as CustomBaseColumn

            return (
              <sc.TableRow
                className={`${sc.baseClass}__row ${sc.baseClass}__tbody__row`}
                key={row.id}
                styles={rowStyles}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  // const column: ColumnInstance<D> & CustomColumn = cell.column
                  if (removeEmptyCells && !cell.value) {
                    return null
                  }
                  return (
                    <sc.TableCell
                      className={`${sc.baseClass}__cell ${sc.baseClass}__tbody__row__cell`}
                      key={index}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </sc.TableCell>
                  )
                })}
              </sc.TableRow>
            )
          })
        )}
      </sc.TableBody>
    </sc.Table>
  )
}
