import styled from 'styled-components'
import { device } from '@/utils/device'

export const Page = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`

export const Body = styled.div`
  position: relative;
  width: 100%;
  .kernls-sidebar {
    display: none;
  }
  @media ${device.tablet} {
    .kernls-sidebar {
      display: flex;
    }
  }
`

export const BodyMain = styled.main`
  margin-left: 0;
  @media ${device.tablet} {
    margin-left: 235px;
  }
`
