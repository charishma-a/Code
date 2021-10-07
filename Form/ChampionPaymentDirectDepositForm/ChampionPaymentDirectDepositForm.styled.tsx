import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-champion-payment-direct-deposit-form'

export const Wrapper = styled.div`
  h2 {
    font-size: ${pxToRem({ px: 18, base: 14 })};
    line-height: ${pxToRem({ px: 28, base: 14 })};
    text-align: center;
    color: #000000;
    margin: 0;
    font-weight: normal;
  }
  a {
    text-decoration: underline;
  }
`
