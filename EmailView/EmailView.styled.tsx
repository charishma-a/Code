import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-email-view'

export const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin: 0 auto;
  width: 100%;

  p,
  button {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
  }

  button,
  a {
    margin: 0;
    padding: 0;
    color: #006acb;
    font-weight: 600;
  }

  .${baseClass} {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};

    &__header {
      border-bottom: 1px solid #e5e5e5;
      padding: 1rem 2rem;
      color: #565656;
    }
    &__meta {
      border-bottom: 1px solid #e5e5e5;
      padding: 2rem;
      color: #828282;
      > div:not(:first-child) {
        margin-top: 1rem;
      }
    }
    &__body {
      padding: 2rem;
      color: #565656;
    }
  }
`
