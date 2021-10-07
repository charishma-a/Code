import styled from 'styled-components'

/* common */
import { PurpleBorderBox, PurpleBox } from '@/common/styled'

/* components */
import { CardPrimary } from '../Card'

/* utils */
import { device } from '@/utils/device'

export const NextSteps = styled.div`
  ol {
    padding-left: 1rem;
    li:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`

export const KernlsOptinContainer = styled(PurpleBorderBox)`
  margin-top: 0;
  text-align: left;

  *:last-child {
    margin-bottom: 0;
  }
`

export const ThankYouBox = styled(PurpleBox)`
  color: #8256ff;
  font-weight: 600;
  text-align: center;
`

export const Wrapper = styled(CardPrimary)`
  color: #565656;
  padding: 2rem;
  border-radius: 0;

  strong {
    font-weight: 600;
    &.heading {
      margin-bottom: 1rem;
    }
  }

  a {
    color: #8256ff;
  }

  @media ${device.tablet} {
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
`
