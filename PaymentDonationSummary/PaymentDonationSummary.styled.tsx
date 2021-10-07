import styled from 'styled-components'

/* components */
import { CardPrimary } from '@/components/Card'

/* utils */
import { device } from '@/utils/device'

export const LineItems = styled.div`
  > * {
    margin-top: 0.5rem;
  }
`

export const Total = styled.div`
  border-top: 1px solid #c4c4c4;
  color: #1c1c1c;
  font-weight: 800;
  font-size: 1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  color: #8256ff;

  @media ${device.tablet} {
    font-size: 18px;
  }
`

export const Wrapper = styled(CardPrimary)`
  color: #565656;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  @media ${device.tablet} {
    border: 1px solid #e5e5e5;
  }

  h2 {
    margin: 0;
    color: #000;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    text-align: left;
  }
`
