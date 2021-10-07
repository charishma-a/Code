import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-contacts-import-review'

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

export const EditActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  button {
    font-size: ${pxToRem({ px: 14 })};
    width: auto;
    padding: 1rem;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`

export const EditActionsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  h3,
  .h3 {
    color: #000;
    font-weight: normal;
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
  }
`

export const Container = styled.div`
  max-width: 674px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
`

export const Wrapper = styled.div`
  width: 100%;

  .${baseClass} {
    &__table {
      margin-top: 1rem;
      background: #fff;

      .kernls-table-v2 {
        tr:not(.kernls-table-v2__tbody__row--empty) {
          grid-template-columns:
            minmax(20px, 0.2fr) minmax(70px, 0.8fr) minmax(70px, 0.8fr)
            minmax(110px, 1fr);

          td {
            width: 100%;
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

      &--edit {
        .kernls-table-v2 {
          tr:not(.kernls-table-v2__tbody__row--empty) {
            grid-template-columns: minmax(90px, 1fr) minmax(90px, 1fr) minmax(
                90px,
                1fr
              );
          }

          td:not(:last-child) {
            padding-right: 0.5rem;
          }
          td {
            align-items: flex-start;
            .kernls-formik-input {
              height: 40px;
            }
          }
        }
      }
    }
  }
`
