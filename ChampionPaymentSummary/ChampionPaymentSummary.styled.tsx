import styled from 'styled-components'

export const baseClass = 'kernls-champion-payment-summary'

export const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 2rem;
  width: 100%;

  .color-black {
    color: #000;
  }

  .${baseClass} {
    &__group:not(:first-child) {
      margin-top: 1rem;
    }
  }
`
