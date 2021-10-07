import styled from 'styled-components'
import { ButtonLink } from '@/common/styled'
import { pxToRem } from '@/utils/pxToRem'
import { device } from '@/utils/device'

export const baseClass = 'kernls-dashboard-campaign-actions'

export const ActionButtons = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media ${device.tablet} {
    flex-direction: row;
  }
`

export const ActionButton = styled(ButtonLink)`
  && {
    background: #ffffff;
    border-radius: 4px;
    padding: 1rem;
    max-width: 100%;
    width: 100%;
    margin: 0;
    color: #565656;
    font-size: ${pxToRem({ px: 14 })};
    &:not(:first-child) {
      margin-left: 0;
      margin-top: 1rem;
    }
    svg {
      color: #dadada;
      path {
        fill: #dadada;
      }
    }

    :focus {
      color: #825eff;
      svg {
        color: #825eff;
        path {
          fill: #825eff;
        }
      }
    }
    :hover {
      background-color: #825eff;
      color: #fff;
      svg {
        color: #fff;
        path {
          fill: #fff;
        }
      }
    }
    @media ${device.tablet} {
      max-width: 202px;
      &:not(:first-child) {
        margin-left: 2rem;
        margin-top: 0;
      }
    }
  }
`
export const ActionButtonIconWrapper = styled.div`
  margin-bottom: 1rem;
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`
export const ActionButtonTextWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
