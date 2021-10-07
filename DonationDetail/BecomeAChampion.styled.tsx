import styled from 'styled-components'

/* components */
import { CardPrimary } from '../Card'

/* utils */
import { device } from '@/utils/device'

export const Wrapper = styled(CardPrimary)`
  background-color: transparent;
  padding: 2rem 2rem 0 2rem;

  @media ${device.tablet} {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: 0;

    .kernls-become-a-backer {
      &__body {
        padding: 2rem;
      }
    }
  }

  .kernls-become-a-backer {
    &__body {
      padding-top: 2rem;

      h3 {
        color: #565656;
        font-weight: 600;
        font-size: 20px;
        line-height: 31px;
        margin: 0;
      }
    }
  }
`
