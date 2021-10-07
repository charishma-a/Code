import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-resource-actions'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  .${baseClass} {
    &__actions {
      margin-left: auto;
      align-items: center;
      display: flex;
      justify-content: flex-end;

      &__button {
        padding-left: 2rem;
        padding-right: 2rem;
      }

      &__dropdown {
        margin-right: 1rem;
      }
    }
  }

  &&,
  span,
  p,
  button {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
  }

  h3,
  .h3 {
    color: #000;
    font-weight: normal;
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
  }
`
