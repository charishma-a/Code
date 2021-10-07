import styled from 'styled-components'

import { CardPrimary } from '../Card'

/* common */
import { PurpleBorderBox } from '@/common/styled'

export const Summary = styled(CardPrimary)`
  display: flex;
  flex-direction: column;
  min-height: 232px;
`

export const TaxReceiptNote = styled(PurpleBorderBox)`
  text-align: left;

  strong {
    font-size: 1.125rem;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

export const Total = styled.div`
  border-top: 1px solid #e5e5e5;
  color: #8256ff;
  font-size: 1rem;
  margin-top: auto;
  padding-top: 0.5rem;
`

export const Wrapper = styled.div``
