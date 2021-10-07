import styled from 'styled-components'
import { CardSecondary } from '../Card'
import { TooltipText } from '@/common/styled'
import { device } from '@/utils/device'

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

export const Motivation = styled.p`
  color: #8256ff;
  margin: 0;
`

export const Wrapper = styled(CardSecondary)`
  background-color: #f8f8f8;
  font-size: 0.75rem;
  @media ${device.tablet} {
    font-size: 1rem;
  }
`
