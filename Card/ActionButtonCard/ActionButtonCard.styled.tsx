import { device } from '@/utils/device'
import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-action-button-card'

export const Tag = styled.span`
  background: #f8f5ff;
  border-radius: 5px;
  font-size: ${pxToRem({ px: 10 })};
  line-height: ${pxToRem({ px: 15 })};
  color: #825eff;
  padding: 0.5rem;
`

export const Wrapper = styled.button`
  align-items: center;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  width: 100%;
  .${baseClass} {
    &__icon {
      align-items: center;
      background: #ffffff;
      border: 0.888889px solid #e5e5e5;
      border-radius: 50%;
      display: none;
      height: 64px;
      justify-content: center;
      width: 64px;
    }
    &__content {
      margin-left: 1rem;
      text-align: left;
      p {
        margin: 0;
        font-size: ${pxToRem({ px: 14 })};
        line-height: ${pxToRem({ px: 21 })};
      }
      &__title {
        align-items: center;
        display: flex;
        justify-content: flex-start;
        p {
          color: #000;
          font-size: ${pxToRem({ px: 16 })};
          line-height: ${pxToRem({ px: 25 })};
          margin-right: 0.5rem;
        }
      }
    }
    &__arrow {
      margin-left: auto;
    }
  }

  @media ${device.tablet} {
    .${baseClass} {
      &__icon {
        display: flex;
      }
    }
  }
`
