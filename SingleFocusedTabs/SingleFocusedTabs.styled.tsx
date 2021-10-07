import { device } from '@/utils/device'
import styled from 'styled-components'

export const baseClass = 'kernls-single-focused-tabs'

export const Content = styled.div`
  padding: 0.75rem 1rem;

  @media ${device.tablet} {
    padding: 1rem 2rem;
  }
`

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  font-weight: 600;
  font-size: 0.75rem;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  .${baseClass}__header__title {
    margin: 0 0.5rem;
  }

  @media ${device.tablet} {
    font-size: 1rem;
    justify-content: center;
    padding: 1rem 2rem;

    .${baseClass}__header__title {
      margin: 0 1.5rem;
    }
  }
`

export const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #565656;
  font-size: 0.75rem;

  @media ${device.tablet} {
    font-size: 1rem;
  }
`
