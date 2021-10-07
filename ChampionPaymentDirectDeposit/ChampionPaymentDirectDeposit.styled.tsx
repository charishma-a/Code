import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'
import { CardPrimary } from '../Card'

export const baseClass = 'kernls-champion-payment-direct-deposit'

export const Card = styled(CardPrimary)`
  padding: 2rem;
  button {
    margin-top: 1rem;
  }
`

export const Wrapper = styled.div`
  h2 {
    font-size: ${pxToRem({ px: 18, base: 14 })};
    line-height: ${pxToRem({ px: 28, base: 14 })};
    text-align: center;
    color: #000000;
    margin: 0;
    margin-bottom: 1rem;
    font-weight: normal;
  }
  h3 {
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #000000;
    margin: 0;
    margin-bottom: 1rem;
  }
`
