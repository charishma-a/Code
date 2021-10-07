import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const Champions = styled.div<
  HTMLAttributes<HTMLDivElement> & { referredId?: string }
>`
  margin-top: 1rem;
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  margin-top: 1rem;
`
