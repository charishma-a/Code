import { device } from '@/utils/device'
import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-email-activity'

export const EmptyView = styled.div`
  color: #565656;
  text-align: center;
  width: 100%;

  padding: 2rem;

  p,
  button {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
  }
  button {
    width: auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

export const Status = styled.div`
  align-items: center;
  background: #f4f4f4;
  border-radius: 5px;
  color: #565656;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  height: 32px;
  width: 64px;

  &.sent {
    background: rgba(0, 153, 163, 0.06);
    color: #0099a3;
  }
`

export const Container = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin-top: 2rem;
`

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;

  .${baseClass} {
    &__header {
      border-bottom: 1px solid #e5e5e5;
      color: #000000;
      padding: 1rem;
      text-align: center;
    }
    &__body {
      padding: 1rem;

      .kernls-table-v2 {
        border: 0;

        thead {
          display: none;
        }

        tr:not(.kernls-table-v2__tbody__row--empty) {
          grid-template-columns: minmax(110px, 1fr) minmax(110px, 1fr);

          td:last-child {
            justify-content: flex-end;
          }
        }

        thead tr {
          padding: 0;
        }
        tbody tr {
          padding-top: 1rem;
          td:first-child {
            font-weight: bold;
          }
        }
        tr:nth-child(4n + 4) {
          margin-top: 1rem;
          border-top: 1px solid #e5e5e5;
        }
        tr {
          border-bottom: 0;
          padding: 0;
          td {
            padding-top: 0;
          }
        }

        @media ${device.tablet} {
          padding: 2rem;
          thead {
            display: table-row-group;
          }

          tbody tr {
            td:first-child {
              font-weight: normal;
            }
          }
          tr:not(.kernls-table-v2__tbody__row--empty) {
            grid-template-columns:
              minmax(20px, 0.2fr) minmax(110px, 1fr) minmax(70px, 0.8fr) minmax(
                70px,
                0.8fr
              )
              minmax(70px, 0.8fr);
            td:last-child {
              justify-content: flex-start;
            }
          }
          tr:nth-child(4n + 4) {
            margin-top: 0;
            border-top: 0;
          }
        }

        .kernls-formik-checkbox {
          label:not(.kernls-formik-checkbox__label) {
            margin-bottom: 0.5rem;
            display: block;
          }
          label.kernls-formik-checkbox__label:before {
            height: 18px;
            width: 18px;
            margin-top: 0;
            margin-left: 0;
            margin-right: 0;
          }
          input:checked + label.kernls-formik-checkbox__label:after {
            top: 3px;
            left: 7px;
          }
        }
      }
    }
  }
`
