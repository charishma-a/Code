import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const Step = styled.div`
  &:not(:last-child) {
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e5e5;
  }

  &:not(:first-child) {
    padding-top: 1rem;
  }
`

export const Steps = styled.div`
  font-size: 0.875rem;
  line-height: 1.225rem;

  p {
    margin: 0;
  }
`

export const StepDescription = styled.p`
  padding-top: 1rem;
`

export const StepTitle = styled.p<
  HTMLAttributes<HTMLParagraphElement> & { active?: boolean }
>`
  ${({ active }) => (active ? 'color: #8256FF;' : '')}
`

export const StepTitleWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  > *:first-child {
    margin-right: 0.5rem;
  }
`
