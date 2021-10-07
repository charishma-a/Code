import styled from 'styled-components'
import { pxToRem } from '@/utils/pxToRem'
import { device } from '@/utils/device'

export const baseClass = 'kernls-dashboard-main'

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 672px;
  padding: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  section:first-child {
    margin-top: 2rem;
  }
  section:not(:first-child) {
    margin-top: 0;
  }

  @media ${device.tablet} {
    flex-direction: column;
    section:first-child {
      margin-top: 0;
    }
    section:not(:first-child) {
      margin-top: 2rem;
    }
  }

  section {
    h3 {
      font-size: 1rem;
      margin: 0;
      margin-bottom: 1rem;
      color: #000;
      font-weight: normal;
    }
  }
  @media ${device.tablet} {
    section {
      h3 {
        font-size: ${pxToRem({ px: 18 })};
      }
    }
  }
`
