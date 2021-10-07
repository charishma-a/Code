import styled from 'styled-components'
import { pxToRem } from '@/utils/pxToRem'

export const baseClass = 'kernls-modal-delete'

export const Actions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;

  button {
    font-size: ${pxToRem({ px: 16 })};
    line-height: ${pxToRem({ px: 25 })};
    width: auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  button:not(:last-child) {
    margin-right: 1rem;
  }
`

export const Wrapper = styled.div`
  p {
    margin: 0;
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
    color: #565656;
  }
`
