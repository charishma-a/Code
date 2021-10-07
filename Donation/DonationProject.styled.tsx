import styled, { css, keyframes } from 'styled-components'

/* components */
import { CardPrimary, CardPrimaryProps } from '../Card'

/* utils */
import { device } from '../../utils/device'

const highlighting = keyframes`
  from {
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
  }

  to {
    box-shadow: 0px 4px 20px 5px rgba(130, 86, 255, 0.15);
  }
`

export interface WrapperProps extends CardPrimaryProps {
  highlight: boolean
}

export const Wrapper = styled(CardPrimary)<WrapperProps>`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border-radius: 5px;
  border: 1.5px solid #fff;
  padding: 1.5rem 1rem;

  @media ${device.tablet} {
    padding: 1rem;
  }

  p {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  ${({ highlight }) => {
    if (highlight) {
      return css`
        border: 1.5px solid #8256ff;
        animation: ${highlighting} 1s alternate infinite;
      `
    }
  }}
`
