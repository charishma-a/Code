import { HTMLAttributes } from 'react'
import styled from 'styled-components'

/* utils */
import { device } from '@/utils/device'

export const Image = styled.img<
  HTMLAttributes<HTMLImageElement> & { topPadding?: boolean }
>`
  padding-top: ${({ topPadding }) => (topPadding ? '1rem' : 0)};
`

export const Link = styled.a<
  HTMLAttributes<HTMLAnchorElement> & { topPadding?: boolean }
>`
  color: #8256ff;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  padding-top: ${({ topPadding }) => (topPadding ? '1rem' : 0)};

  @media ${device.laptop} {
    font-size: 1rem;
  }
`
