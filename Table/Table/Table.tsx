import React, { HTMLAttributes, useMemo } from 'react'
import { Column, useTable } from 'react-table'
import styled, { css } from 'styled-components'

import { device } from '@/utils/device'

const Styles = styled.div<
  HTMLAttributes<HTMLDivElement> & { topPadding?: boolean }
>`
  padding-top: ${(props) => (props.topPadding ? '1rem' : 0)};
`

const TableContainer = styled.table`
  display: flex;
  flex-direction: column;
  background-color: #fff;

  padding: 0.21rem 0.75rem;

  @media ${device.tablet} {
    padding: 0.5rem 1rem;
  }

  @media ${device.laptop} {
    padding: 1rem 1rem;
  }

  .kernls-labeled-avatar {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__avatar {
      color: #8256ff;
      margin-right: 0.3rem;
      width: 0.72rem;
      height: 0.72rem;
    }

    &__label-container {
      &__label {
        margin: 0;
        font-weight: normal;
        font-size: 0.75rem;
        line-height: 1.125rem;

        @media ${device.tablet} {
          font-size: 1rem;
          line-height: 1.5625rem;
        }
        @media ${device.laptop} {
          font-size: 1rem;
          line-height: 1.5625rem;
        }
      }
    }
  }
`

const Body = styled.tbody`
  display: flex;
  flex-direction: column;
`

const Head = styled.thead`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const Row = styled.tr<
  HTMLAttributes<HTMLTableRowElement> & {
    header?: boolean
    highlighted?: boolean
  }
>`
  display: flex;
  justify-content: row;
  border: 0;
  padding: 0.25rem 0;
  @media ${device.tablet} {
    padding: 1rem 0;
  }
  border-bottom: 1px solid #c4c4c4;
  &:last-child {
    ${({ header }) => (header ? '' : 'border-bottom: none;')}
  }

  background-color: ${(param) => (param.highlighted ? '#F6F3FF' : '#fff')};
  color: ${(param) => (param.highlighted ? '#8256FF' : '#000')};
`

const SubRow = styled(Row)`
  border-bottom: none;
  padding: 0;
  &.sub-row--last {
    border-bottom: 1px solid #c4c4c4;
    padding-bottom: 0.25rem;
    @media ${device.tablet} {
      padding-bottom: 1rem;
    }
  }
`

const Cell = styled.td<
  HTMLAttributes<HTMLTableCellElement> & { styles?: string }
>`
  margin: 0;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  @media ${device.mobileM} {
    padding: 0.5rem;
  }
  @media ${device.tablet} {
    font-size: 1rem;
    line-height: 1.5625rem;
    padding: 1rem;
  }

  @media ${device.laptop} {
    padding: 0 1rem;
  }

  ${(props) =>
    props.styles &&
    css`
      ${props.styles}
    `}
`

const HeadCell = styled.th<
  HTMLAttributes<HTMLTableCellElement> & { styles?: string }
>`
  margin: 0;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.125rem;
  @media ${device.mobileM} {
    padding: 0.5rem;
  }
  @media ${device.tablet} {
    font-size: 1rem;
    line-height: 1.5625rem;
    padding: 1rem;
  }

  @media ${device.laptop} {
    padding: 0 1rem;
  }

  ${(props) =>
    props.styles &&
    css`
      ${props.styles}
    `}
`

export interface TableProps {
  columns: Array<Column<object>>
  data: object[]
  highlightedDataRows?: number[]
  cellStyles?: string
  showHeaderRow?: boolean
  topPadding?: boolean
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  highlightedDataRows,
  cellStyles,
  showHeaderRow = true,
  topPadding,
}) => {
  const columnsMemo = useMemo(() => columns, [])
  const dataMemo = useMemo(() => data, [])
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnsMemo,
      data: dataMemo,
    })

  // Render the UI for your table
  return (
    <Styles topPadding={topPadding}>
      <TableContainer {...getTableProps()}>
        {showHeaderRow ? (
          <Head>
            {headerGroups.map((headerGroup) => {
              return (
                <Row
                  key={headerGroup.id}
                  header
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <HeadCell
                      key={column.id}
                      styles={cellStyles}
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </HeadCell>
                  ))}
                </Row>
              )
            })}
          </Head>
        ) : null}
        <Body {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)

            const highlighted = highlightedDataRows.includes(i)

            const rowStyle = row.subRows.length
              ? { borderBottom: 0, paddingBottom: 0 }
              : {}

            return (
              <>
                <Row
                  key={row.id}
                  highlighted={highlighted}
                  style={rowStyle}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <Cell
                        key={index}
                        styles={cellStyles}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </Cell>
                    )
                  })}
                </Row>

                {row.subRows.map((subRow, i2) => {
                  prepareRow(subRow)

                  const subRowClassName =
                    row.subRows.length === i2 + 1
                      ? 'sub-row sub-row--last'
                      : 'sub-row'
                  return (
                    <SubRow
                      className={subRowClassName}
                      key={subRow.id}
                      {...subRow.getRowProps()}
                    >
                      {subRow.cells.map((cell, index) => {
                        return (
                          <Cell
                            key={index}
                            styles={cellStyles}
                            {...cell.getCellProps()}
                          >
                            {cell.render('Cell')}
                          </Cell>
                        )
                      })}
                    </SubRow>
                  )
                })}
              </>
            )
          })}
        </Body>
      </TableContainer>
    </Styles>
  )
}
