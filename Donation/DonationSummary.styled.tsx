import styled from 'styled-components'

/* components */
import { CardPrimary } from '../Card'

/* utils */
import { device } from '../../utils/device'

export const Total = styled.div`
  border-top: 1px solid #c4c4c4;
  color: #1c1c1c;
  font-weight: 800;
  font-size: 1rem;
  margin-top: auto;
  padding-top: 0.5rem;

  @media ${device.tablet} {
    font-size: 18px;
  }
`

export const Wrapper = styled(CardPrimary)`
  color: #565656;
  display: flex;
  flex-direction: column;
  min-height: 245px;

  @media ${device.tablet} {
    border: 1px solid #e5e5e5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h2 {
    color: #1c1c1c;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 1rem;
  }
`
