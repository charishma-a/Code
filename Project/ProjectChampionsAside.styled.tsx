import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const Wrapper = styled.aside<
  HTMLAttributes<HTMLDivElement> & { referredId?: string }
>`
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  @media ${device.laptop} {
    overflow: scroll;
    max-height: 100vh;
  }
`
