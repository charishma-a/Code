import styled from 'styled-components'

/* utils */
import { device } from '../../utils/device'

export const ThankYouContainer = styled.div`
  margin: 2rem;
  margin-top: 0;
  text-align: center;

  h2 {
    color: #8256ff;
    font-weight: 600;
    font-size: 20px;
    line-height: 31px;
  }

  p {
    font-weight: 600;
  }

  h2,
  p {
    margin: 0;
  }
`

export const Wrapper = styled.div`
  .kernls-project-share {
    padding: 2rem;
  }

  @media ${device.tablet} {
    .kernls-project-share {
      padding: 2rem;
    }
  }
`
