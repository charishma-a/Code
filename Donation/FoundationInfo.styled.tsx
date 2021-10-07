import styled from 'styled-components'

/* utils */
import { device } from '../../utils/device'

export const PurpleText = styled.span`
  color: #8256ff;
`

export const Wrapper = styled.div`
  font-size: 1rem;

  p:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media ${device.tablet} {
    font-size: 0.875rem;
    line-height: 1.3125rem;
  }
`
