import { device } from '@/utils/device'
import styled from 'styled-components'

export const baseClass = 'kernls-credit-card-images'

export const Wrapper = styled.div`
  margin-bottom: 0.5rem;

  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media ${device.tablet} {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 0;
  }

  > img:not(:last-child) {
    margin-right: 0.5rem;
  }
`
