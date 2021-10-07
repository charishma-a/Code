import { device } from '../../utils/device'
import styled from 'styled-components'

export const DonationText = styled.p`
  margin: 0;
  color: ${(props) => props.color};
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.0625;
  padding-top: 0.4rem;

  cursor: ${(props) => props.pointer};

  @media ${device.tablet} {
    font-size: 0.875rem;
    line-height: 1.22rem;
  }
`
