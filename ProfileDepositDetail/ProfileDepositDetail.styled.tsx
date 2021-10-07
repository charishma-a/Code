import styled from 'styled-components'

/* common */
import { PurpleBorderBox } from '@/common/styled'
import { device } from '@/utils/device'

export const ToppingUp = styled(PurpleBorderBox)`
  text-align: left;
`

export const Wrapper = styled.div`
  padding: 0 1rem;

  img {
    margin: 0 auto;
  }

  @media ${device.tablet} {
    max-width: 60%;
    margin: 0 auto;
  }
`
