import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { CardSecondary } from '../Card'
import { Paragraph } from '../Paragraph'

export const ChampionsHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

export const Champion = styled.div<
  HTMLAttributes<HTMLDivElement> & { referredId?: string }
>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`

export const Champions = styled.div<
  HTMLAttributes<HTMLDivElement> & { referredId?: string }
>`
  ${Champion}:not(:last-child) {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e5e5;
  }
`

export const Impact = styled.span`
  min-width: 5rem;
  margin: 0;
  border-radius: 100px;
  text-align: center;
  align-self: center;
  height: 1.8rem;
  color: #1c1c1c;
  background: #eaeaea;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.5rem;
  @media ${device.tablet} {
    font-size: 1rem;
    line-height: 1.0625;
  }
  position: relative;
  cursor: pointer;
`

export const ThanksParagraph = styled(Paragraph)`
  color: #1c1c1c;
  font-weight: 600;
`

export const Wrapper = styled(CardSecondary)`
  background: #f8f8f8;
  margin-top: 1rem;

  font-size: 0.75rem;

  @media ${device.tablet} {
    font-size: 1rem;
  }
`
