import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-resource-table'

export const Wrapper = styled.div`
  text-align: center;
  overflow-x: auto;

  .kernls-table-v2 {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;

    thead tr {
      padding: 1rem 2rem;
      border-bottom: 1px solid #e5e5e5;
    }

    tbody tr {
      border-bottom: 0;
      &:first-child {
        padding-top: 1rem;
      }
      padding-bottom: 1rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    tr {
      th {
        padding: 0;
        color: #000000;
        font-size: ${pxToRem({ px: 14 })};
        line-height: ${pxToRem({ px: 21 })};
        font-weight: normal;
      }
      td {
        align-items: center;
        display: flex;
        justify-content: flex-start;
        padding: 0;
        font-size: ${pxToRem({ px: 14 })};
        line-height: ${pxToRem({ px: 21 })};
        font-weight: normal;
        a {
          color: #825eff;
        }
      }
    }
  }
`
