import styled from 'styled-components'
import { CardSecondary } from '../Card'
import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'

export const baseClass = 'kernls-champion-forward-card'

export const Section = styled.div`
  border-top: 1px solid #e5e5e5;
  margin-top: 1rem;
  padding-top: 1rem;
`

export const ImpactContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ImpactLabel = styled.span`
  color: #565656;
  font-size: 1rem;
`

export const Bubble = styled.div`
  background: #f0f0f0;
  border-radius: 8px;
  color: #565656;
  font-size: 1rem;
  padding: 0.3rem 0.5rem;
  text-align: center;
  width: 100%;
`

export const Content = styled.div`
  padding: 1.5rem 1rem;
`

export const Header = styled.div`
  background: #373737;
  border-radius: 4px 4px 0px 0px;
  color: #ffffff;
  padding: 0.5rem;
  text-align: center;
`

export const OrgMatchingSection = styled.div<
  HTMLAttributes<HTMLDivElement> & { avatar?: string }
>`
  background: #f0f0f0;
  border-radius: 8px;
  margin-top: 1rem;
  padding: 0.5rem;

  ${({ avatar }) => {
    if (avatar) {
      return `
        align-items: center;
        display: flex;
        justify-content: center;
      `
    }
  }}

  p {
    display: block;
    text-align: center;
  }

  img {
    margin-right: 1rem;
    height: 48px;
    width: 48px;
  }

  @media ${device.tablet} {
    img {
      height: 54px;
      width: 54px;
    }
  }
`

export const Motivation = styled.p`
  margin: 0;
`

export const Wrapper = styled.div`
  background: #f8f8f8;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 0.75rem;
  @media ${device.tablet} {
    font-size: 1rem;
  }
`
