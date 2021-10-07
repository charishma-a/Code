import styled from 'styled-components'
import { pxToRem } from '@/utils/pxToRem'

export const baseClass = 'kernls-modal-add-contacts'

export const AddContactsButton = styled.button`
  align-items: center;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;

  .${baseClass}__button {
    &__content {
      text-align: left;
      &__main {
        font-size: ${pxToRem({ px: 16 })};
        line-height: ${pxToRem({ px: 25 })};
        color: #000000;
      }
    }
  }
`

export const Wrapper = styled.div`
  > button:not(:last-child) {
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
    color: #565656;
  }
`
