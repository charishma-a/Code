import { device } from '@/utils/device'
import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #f8f8f8;
  padding: 1rem;
  button {
    background-color: transparent;
    border: 1px solid #8256ff;
    color: #8256ff;
    height: 50px;
    font-size: 0.75rem;
  }
  margin-top: 1rem;

  @media ${device.tablet} {
    button {
      font-size: 1rem;
    }
  }
`
