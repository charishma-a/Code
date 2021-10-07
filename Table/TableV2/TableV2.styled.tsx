import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { device } from '@/utils/device'

export const baseClass = 'kernls-table-v2'

export const Table = styled.table<
  HTMLAttributes<HTMLTableElement> & { styles?: string; topMargin?: boolean }
>`
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  min-width: 100%;
  color: #565656;
  margin-top: ${(props) => (props.topMargin ? '1rem' : 0)};

  th {
    padding: 0.75rem 1rem;
  }
  td {
    padding: 0.75rem 1rem;
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */

    p:first-child {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  th {
    /* position: sticky; */
    /* top: 0; */
    /* background: #6c7ae0; */
    text-align: left;
    font-weight: 600;
    font-size: 0.75rem;
  }

  th:last-child {
    border: 0;
  }

  td {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 0.75rem;
    text-align: left;

    strong {
      color: #202020;
      font-weight: 600;
    }
  }

  tr:not(:last-child),
  thead tr {
    border-bottom: 1px solid #e5e5e5;
  }

  @media ${device.tablet} {
    th {
      font-size: 1rem;
    }
    td {
      font-size: 1rem;
    }
  }

  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`

export const TableBody = styled.tbody<
  HTMLAttributes<HTMLTableSectionElement> & { styles?: string }
>`
  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`

export const TableHeadCell = styled.th<
  HTMLAttributes<HTMLTableCellElement> & { styles?: string }
>`
  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`

export const TableCell = styled.td<
  HTMLAttributes<HTMLTableCellElement> & { styles?: string }
>`
  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`

export const TableHead = styled.thead<
  HTMLAttributes<HTMLTableSectionElement> & { styles?: string }
>`
  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`

export const TableRow = styled.tr<
  HTMLAttributes<HTMLTableRowElement> & { isEmpty?: boolean; styles?: string }
>`
  display: grid;
  grid-template-columns: ${({ isEmpty }) => {
    if (isEmpty) {
      return `minmax(1fr, 1fr)`
    }
    return `minmax(90px, 1fr) minmax(90px, 1fr) minmax(90px, 1fr)`
  }};

  ${({ styles }) => styles || ''}
`

export const TableHeadRow = styled(TableRow)``
