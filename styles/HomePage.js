import styled from 'styled-components'
import { device } from '../../utils/device'

export const HeaderTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.6rem;
  padding-top: 3rem;
  padding-bottom: 2rem;

  @media ${device.tablet} {
    font-size: 1.33rem;
    line-height: 1.89rem;
  }

  @media ${device.laptop} {
    font-size: 1.78rem;
    line-height: 2.72rem;
  }
`
