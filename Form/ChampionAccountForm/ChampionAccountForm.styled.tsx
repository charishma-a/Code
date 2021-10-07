import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-champion-account-form'

export const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;

  label,
  p {
    font-weight: normal;
  }
  label {
    color: #000000;
  }
  p {
    color: #565656;
  }
  button.kernls-secondary-button {
    width: auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  h2,
  .h2 {
    margin: 0;
    margin-bottom: 2rem;
    color: #000000;
    font-weight: normal;
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
  }
`
