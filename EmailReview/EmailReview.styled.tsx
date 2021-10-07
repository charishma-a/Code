import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-email-review'

export const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0 auto;
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

  h2 {
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
    color: #000;
  }

  strong {
    color: #000000;
    font-weight: normal;
  }
  font-size: ${pxToRem({ px: 14 })};
  line-height: ${pxToRem({ px: 21 })};

  .${baseClass} {
    &__header {
      text-align: center;
    }
    &__contacts {
      padding-bottom: 2rem;
      border-bottom: 1px solid #e5e5e5;
    }
    &__actions {
      padding-top: 2rem;
    }
  }
`
